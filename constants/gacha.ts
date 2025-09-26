import { Rarity } from '../types';

// --- TALENT GACHA RECRUITMENT SYSTEM ---
export const GACHA_COST_SINGLE = 5000000;
export const GACHA_COST_MULTI = 45000000; // 10 pulls for the price of 9

export const GACHA_RARITY_CHANCES: Record<Rarity, number> = {
  Biasa: 0.65, // 65%
  Rare: 0.23, // 23%
  Epic: 0.08, // 8%
  Legendary: 0.03, // 3%
  Event: 0.005, // 0.5%
  Khusus: 0.003, // 0.3%
  Special: 0.0015, // 0.15%
  Mystic: 0.0005, // 0.05%
};

// XP gained when pulling a duplicate talent
export const GACHA_DUPLICATE_XP: Record<Rarity, number> = {
  Biasa: 500,
  Rare: 750,
  Epic: 1000,
  Legendary: 2000,
  Event: 2500,
  Khusus: 3000,
  Special: 4000,
  Mystic: 5000,
};

// --- EQUIPMENT GACHA SYSTEM ---
export const EQUIPMENT_GACHA_RARITY_CHANCES: Record<Rarity, number> = {
  Biasa: 0, // No common equipment
  Rare: 0.65, // 65%
  Epic: 0.25, // 25%
  Legendary: 0.08, // 8%
  Special: 0.015, // 1.5%
  Mystic: 0.005, // 0.5%
  Event: 0, // Event equipment not in general pool
  Khusus: 0, // Khusus equipment not in general pool
};

export const EQUIPMENT_GACHA_RARITY_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.2,
  Epic: 1.5,
  Legendary: 2.0,
  Event: 2.5,
  Khusus: 3.0,
  Special: 4.0,
  Mystic: 5.0,
};

export const EQUIPMENT_GACHA_CONFIG = {
  STANDARD_PULL: {
    COUNT: 1,
    BASE_COST: 50000,
    DAYA_PIKAT_MULTIPLIER: 50, // Cost += DayaPikat * 50
    COST_MULTIPLIER: 1,
  },
  MULTI_PULL: {
    COUNT: 10,
    BASE_COST: 50000,
    DAYA_PIKAT_MULTIPLIER: 50,
    COST_MULTIPLIER: 9, // 10 pulls for the price of 9
  },
};
