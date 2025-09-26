import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import {
  calculateProductionBatchResult,
  calculateProductionCost,
  calculateExpToNextLevel,
} from '../services/localDataService';
import { PRODUCTION_ENERGY_COST, PRODUCTION_MENTAL_COST, PENYELIDIKAN_FROM_DOXXING } from '../constants';
import { SkillCard } from '../types';

type ProductionActions = Pick<
  GameStoreActions,
  'prepareProduction' | 'startProduction'
>;

export const createProductionActionsSlice: StoreSlice<ProductionActions> = (
  set,
  get
) => ({
  prepareProduction: (talentId) => {
    const { talents } = get();
    const talent = talents.find((t) => t.id === talentId);
    if (!talent) return;

    // Check for equipment
    const hasCamera =
      !!talent.equipment.kameraDsr || !!talent.equipment.handycam;
    const hasLaptop = !!talent.equipment.laptop;
    if (!hasCamera || !hasLaptop) return;

    set({ productionSetup: { talentId } });
  },
  startProduction: async (batchSize, contentType, theme) => {
    const { productionSetup, talents, gameState } = get();
    if (!productionSetup?.talentId) return;

    set({ isProcessing: true, productionSetup: null, viewingTalent: null });

    try {
      const talent = talents.find((t) => t.id === productionSetup.talentId);
      if (!talent) return;

      const energyCost = PRODUCTION_ENERGY_COST[contentType] * batchSize;
      const mentalCost = PRODUCTION_MENTAL_COST[contentType] * batchSize;
      const cashCost = calculateProductionCost(talent, contentType, batchSize);

      if (
        talent.currentEnergy < energyCost ||
        talent.mental < mentalCost ||
        gameState.money < cashCost
      ) {
        set({ isProcessing: false });
        return;
      }

      const result = calculateProductionBatchResult(
        talent,
        contentType,
        theme,
        batchSize
      );

      const updatedTalents = talents.map((t) => {
        if (t.id === talent.id) {
          const updatedTalent = {
            ...t,
            currentEnergy: t.currentEnergy - energyCost,
            mental: t.mental - mentalCost,
            photoInventory:
              contentType === 'Foto'
                ? [...t.photoInventory, ...result.newContent]
                : t.photoInventory,
            videoInventory:
              contentType === 'Video'
                ? [...t.videoInventory, ...result.newContent]
                : t.videoInventory,
          };

          // --- Apply XP and Level Up ---
          if (updatedTalent.level < 100) {
            let xpToAdd = result.xpGained;
            if (updatedTalent.hasMastery) {
              xpToAdd = Math.floor(xpToAdd * 1.2);
            }
            updatedTalent.experience += xpToAdd;

            while (
              updatedTalent.experience >= updatedTalent.experienceToNextLevel &&
              updatedTalent.level < 100
            ) {
              updatedTalent.experience -= updatedTalent.experienceToNextLevel;
              updatedTalent.level += 1;
              updatedTalent.experienceToNextLevel = calculateExpToNextLevel(
                updatedTalent.level
              );
              // Milestone checks
              if (updatedTalent.level === 20) {
                updatedTalent.stamina = Math.round(updatedTalent.stamina * 1.05);
                updatedTalent.kecantikan = Math.round(updatedTalent.kecantikan * 1.05);
                updatedTalent.popularitas = Math.round(updatedTalent.popularitas * 1.05);
                updatedTalent.mental = Math.round(updatedTalent.mental * 1.05);
              }
              if (updatedTalent.level === 50) {
                updatedTalent.hasMastery = true;
              }
            }
          }
          return updatedTalent;
        }
        return t;
      });

      const newGameState = {
        ...gameState,
        money: gameState.money - cashCost,
        activeBuffs: result.scandal
          ? [...gameState.activeBuffs, result.scandal]
          : gameState.activeBuffs,
      };

      if (result.scandal?.effect === 'MENTAL_LOCK' && newGameState.penyelidikanPolisiActive) {
        newGameState.penyelidikanPolisi += PENYELIDIKAN_FROM_DOXXING;
      }

      set({
        talents: updatedTalents,
        gameState: newGameState,
        productionResult: {
          talentId: talent.id,
          contentType,
          producedItemsCount: batchSize,
          averageQuality: result.averageQuality,
          totalCost: cashCost,
          scandal: result.scandal,
          xpGained: result.xpGained,
        },
      });

      await db.saveTalents(updatedTalents);
      const { rooms: _r, ...gss } = newGameState;
      await db.saveGameState(gss);
    } finally {
      set({ isProcessing: false });
    }
  },
});