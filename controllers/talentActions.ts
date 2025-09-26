import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import {
  baseTalents,
  initializeNewTalent,
  calculateExpToNextLevel,
  reincarnateExistingTalent,
  updateNestedAttribute,
  calculateSurgeryCost,
  calculateRecoveryDays,
  calculateDayaPikat,
  calculateTariffs,
} from '../services/localDataService';
import {
  REINCARNATION_COST,
} from '../constants';
import { BaseTalent } from '../types';

type TalentActions = Pick<
  GameStoreActions,
  'reincarnateTalent' | 'performSurgery' | 'saveCreatedTalent'
>;

export const createTalentActionsSlice: StoreSlice<TalentActions> = (
  set,
  get
) => ({
  reincarnateTalent: async (talentId: string) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState, talents } = get();
      const talentToReincarnate = talents.find((t) => t.id === talentId);
      if (
        !talentToReincarnate ||
        !talentToReincarnate.hibernationEndTime ||
        talentToReincarnate.hibernationEndTime > Date.now()
      ) {
        set({ isProcessing: false });
        return;
      }

      if (gameState.money < REINCARNATION_COST) {
        set({ isProcessing: false });
        return;
      }

      const newMoney = gameState.money - REINCARNATION_COST;
      const rebornTalent = reincarnateExistingTalent(talentToReincarnate);

      const updatedTalents = talents.map((t) =>
        t.id === talentId ? rebornTalent : t
      );
      const newGameState = { ...gameState, money: newMoney };

      set({
        talents: updatedTalents,
        gameState: newGameState,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveTalents(updatedTalents);
    } finally {
      set({ isProcessing: false });
    }
  },
  performSurgery: async (talentId, attributePath, targetValue) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState, talents } = get();
      const talent = talents.find((t) => t.id === talentId);
      if (!talent) return;

      const pathKeys = attributePath.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentValue = (talent as any)[pathKeys[0]];
      for (let i = 1; i < pathKeys.length; i++) {
        currentValue = currentValue[pathKeys[i]];
      }

      // FIX: Pass the correct arguments (talent, attributePath, currentValue, targetValue) to the function.
      const cost = calculateSurgeryCost(
        talent,
        attributePath,
        currentValue,
        targetValue
      );
      if (gameState.money < cost) {
        set({ isProcessing: false });
        return;
      }

      // FIX: Pass the correct arguments (talent, attributePath, currentValue, targetValue) to the function.
      const recoveryDays = calculateRecoveryDays(
        talent,
        attributePath,
        currentValue,
        targetValue
      );
      const unavailableUntil =
        Date.now() + recoveryDays * 24 * 60 * 60 * 1000;

      // Create a deep copy and update the nested attribute immutably
      let updatedTalent = updateNestedAttribute(talent, attributePath, targetValue);
      
      updatedTalent = {
          ...updatedTalent,
          unavailableUntil,
          unavailabilityReason: 'Pemulihan Operasi',
      };
      
      const newDayaPikat = calculateDayaPikat(updatedTalent);
      updatedTalent.dayaPikat = newDayaPikat;
      updatedTalent.tariffs = calculateTariffs(
        newDayaPikat,
        updatedTalent.kesehatan,
        updatedTalent.potensiHamil,
        updatedTalent.rarity
      );

      const updatedTalents = talents.map((t) => (t.id === talentId ? updatedTalent : t));
      const newGameState = { ...gameState, money: gameState.money - cost };

      set({
          talents: updatedTalents,
          gameState: newGameState
      });
      
      await db.saveTalents(updatedTalents);
      const { rooms: _r, ...gss } = newGameState;
      await db.saveGameState(gss);

    } finally {
      set({ isProcessing: false });
    }
  },
  saveCreatedTalent: async (talentData) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
        const newTalent: BaseTalent = {
            ...talentData,
            id: `talent-user-${Date.now()}`, // Ensure unique ID
        };
        await db.saveUserCreatedTalent(newTalent);
        
        // Update the gacha pool in the current session
        set(state => ({
            gachaTalentPool: [...state.gachaTalentPool, newTalent]
        }));
        
    } catch (error) {
        console.error("Failed to save created talent:", error);
    } finally {
        set({ isProcessing: false });
    }
  },
});