import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import { Rarity, GachaResultItem, EquipmentItem, EquipmentGachaResultItem } from '../types';
import {
  initializeNewTalent,
  calculateExpToNextLevel,
} from '../services/localDataService';
import {
  GACHA_COST_MULTI,
  GACHA_COST_SINGLE,
  GACHA_DUPLICATE_XP,
  GACHA_RARITY_CHANCES,
  EQUIPMENT_GACHA_CONFIG,
  EQUIPMENT_GACHA_RARITY_MULTIPLIER,
  ALL_EQUIPMENT_ITEMS,
  EQUIPMENT_GACHA_RARITY_CHANCES,
} from '../constants';

type GachaActions = Pick<
  GameStoreActions,
  | 'performGachaPull'
  | 'closeGachaResult'
  | 'performEquipmentGacha'
  | 'closeEquipmentGachaResult'
>;

export const createGachaActionsSlice: StoreSlice<GachaActions> = (
  set,
  get
) => ({
  performGachaPull: async (count) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });

    try {
      const { gameState, talents, gachaTalentPool } = get();
      const cost = count === 10 ? GACHA_COST_MULTI : GACHA_COST_SINGLE;

      if (gameState.money < cost) {
        set({ isProcessing: false });
        return;
      }

      const newMoney = gameState.money - cost;

      const hibernatingIds = talents
        .filter((t) => t.hibernationEndTime && t.hibernationEndTime > Date.now())
        .map((t) => t.id);
      const availableBaseTalents = gachaTalentPool.filter(
        (bt) => !hibernatingIds.includes(bt.id)
      );

      const pulledTalents: GachaResultItem[] = [];
      const rarityKeys = Object.keys(GACHA_RARITY_CHANCES) as Rarity[];

      for (let i = 0; i < count; i++) {
        let random = Math.random();
        let determinedRarity: Rarity = 'Biasa';

        if (
          count === 10 &&
          i === 9 &&
          !pulledTalents.some((p) => p.rarity !== 'Biasa')
        ) {
          random = GACHA_RARITY_CHANCES.Biasa + 0.01;
        }

        let cumulative = 0;
        for (const rarity of rarityKeys) {
          cumulative += GACHA_RARITY_CHANCES[rarity];
          if (random < cumulative) {
            determinedRarity = rarity;
            break;
          }
        }

        let possiblePulls = availableBaseTalents.filter(
          (t) => t.rarity === determinedRarity
        );

        if (possiblePulls.length === 0) {
          const currentRarityIndex = rarityKeys.indexOf(determinedRarity);
          for (let j = currentRarityIndex - 1; j >= 0; j--) {
            const fallbackRarity = rarityKeys[j];
            possiblePulls = availableBaseTalents.filter(
              (t) => t.rarity === fallbackRarity
            );
            if (possiblePulls.length > 0) break;
          }
        }
        
        if (possiblePulls.length === 0) {
             possiblePulls = availableBaseTalents.filter(t => t.rarity === 'Biasa');
        }

        if (possiblePulls.length === 0) {
          console.warn('Gacha pull skipped: No available talents found.');
          continue;
        }

        const pulledBaseTalent =
          possiblePulls[Math.floor(Math.random() * possiblePulls.length)];
        pulledTalents.push({
          ...pulledBaseTalent,
          isNew: false,
          xpGained: 0,
        });
      }

      let updatedTalents = [...talents];
      const finalResults: GachaResultItem[] = [];

      for (const pulled of pulledTalents) {
        const existingTalentIndex = updatedTalents.findIndex(
          (t) => t.id === pulled.id
        );

        if (existingTalentIndex !== -1) {
          const existingTalent = updatedTalents[existingTalentIndex];
          const xpGained = GACHA_DUPLICATE_XP[pulled.rarity];
          existingTalent.experience += xpGained;
          while (
            existingTalent.experience >= existingTalent.experienceToNextLevel
          ) {
            existingTalent.experience -= existingTalent.experienceToNextLevel;
            existingTalent.level += 1;
            existingTalent.experienceToNextLevel = calculateExpToNextLevel(
              existingTalent.level
            );
          }
          finalResults.push({ ...pulled, isNew: false, xpGained });
        } else {
          const newTalent = initializeNewTalent(pulled);
          updatedTalents.push(newTalent);
          finalResults.push({ ...pulled, isNew: true, xpGained: 0 });
        }
      }

      const newGameState = { ...gameState, money: newMoney };

      set({
        gachaResult: finalResults,
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
  closeGachaResult: () => set({ gachaResult: null }),
  
  performEquipmentGacha: async (talentId, count) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    
    try {
        const { talents } = get();
        const talent = talents.find(t => t.id === talentId);
        if (!talent) {
            set({ isProcessing: false });
            return;
        }

        const config = count === 10 ? EQUIPMENT_GACHA_CONFIG.MULTI_PULL : EQUIPMENT_GACHA_CONFIG.STANDARD_PULL;
        const rarityMultiplier = EQUIPMENT_GACHA_RARITY_MULTIPLIER[talent.rarity];
        const baseCost = (config.BASE_COST + (talent.dayaPikat * config.DAYA_PIKAT_MULTIPLIER));
        const totalCost = Math.floor(baseCost * config.COST_MULTIPLIER * rarityMultiplier);

        if (talent.earnings < totalCost) {
            set({ isProcessing: false });
            return;
        }
        
        const finalResults: EquipmentGachaResultItem[] = [];
        const rarityKeys = Object.keys(EQUIPMENT_GACHA_RARITY_CHANCES) as Rarity[];

        for (let i = 0; i < count; i++) {
            let random = Math.random();
            let determinedRarity: Rarity | null = null;
            let cumulative = 0;

            for (const rarity of rarityKeys) {
                cumulative += EQUIPMENT_GACHA_RARITY_CHANCES[rarity];
                if (random < cumulative) {
                    determinedRarity = rarity;
                    break;
                }
            }

            if (!determinedRarity) {
                determinedRarity = 'Rare'; // Fallback
            }

            let possiblePulls = ALL_EQUIPMENT_ITEMS.filter(item => item.rarity === determinedRarity);
            if (possiblePulls.length === 0) {
                 console.warn(`No equipment found for rarity ${determinedRarity}, falling back to Rare.`);
                 possiblePulls = ALL_EQUIPMENT_ITEMS.filter(item => item.rarity === 'Rare');
                 if (possiblePulls.length === 0) continue; // Skip if even fallback is empty
            }
            
            const pulledItem = possiblePulls[Math.floor(Math.random() * possiblePulls.length)];
            const isNew = !talent.equipmentInventory.some(invItem => invItem.id === pulledItem.id);
            finalResults.push({ item: pulledItem, isNew });
        }
        
        const updatedTalents = talents.map(t => {
            if (t.id === talentId) {
                const newItems = finalResults.map(result => result.item);
                return {
                    ...t,
                    earnings: t.earnings - totalCost,
                    equipmentInventory: [...t.equipmentInventory, ...newItems],
                };
            }
            return t;
        });

        set({ 
            talents: updatedTalents, 
            equipmentGachaResult: finalResults 
        });
        
        await db.saveTalents(updatedTalents);

    } finally {
        set({ isProcessing: false });
    }
  },
  closeEquipmentGachaResult: () => set({ equipmentGachaResult: null }),
});
