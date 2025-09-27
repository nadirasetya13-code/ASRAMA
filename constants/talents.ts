import { Rarity } from '../types';

// --- TALENT REINCARNATION SYSTEM ---
export const TALENT_RETIREMENT_AGE = 36;
export const TALENT_HIBERNATION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours in real-time
export const REINCARNATION_COST = 25000000;
export const REINCARNATION_STAT_BONUS = 2; // +2 to base Kecantikan & Stamina per reincarnation

// --- NEW: TALENT CREATOR RARITY STAT CAPS ---
// Maximum value for any single attribute at creation, based on rarity.
export const TALENT_CREATOR_RARITY_STAT_CAP: Record<Rarity, number> = {
  Biasa: 10,
  Rare: 20,
  Epic: 30,
  Legendary: 40,
  Event: 50,
  Khusus: 60,
  Special: 70,
  Mystic: 80,
};


// --- NEW: ACTIVE HEALTH RECOVERY SYSTEM ---
export const BASE_HEALTH_RECOVERY_PER_DAY = 5; // Base points recovered for a full day of rest
export const HEALTH_RECOVERY_STAMINA_MODIFIER = 10; // Stamina / 10 = bonus recovery points

// --- NEW: MENSTRUATION MECHANIC ---
export const MENSTRUATION_BASE_CHANCE = 0.05; // Increased from 0.02
export const MENSTRUATION_HEALTH_PENALTY_MODIFIER = 0.001; // For each point of health below 50, add 0.1% chance
export const MENSTRUATION_YOUNG_AGE_MODIFIER = 0.01; // Flat 1% added chance for talents under 22

export const SKILL_UNLOCK_LEVELS: number[] = [
  5, 10, 15, 20, 30, 40, 50, 60, 75,
];

export const MAX_SKILLS_BY_RARITY: Record<Rarity, number> = {
  Biasa: 4,
  Rare: 5,
  Epic: 6,
  Legendary: 7,
  Event: 7,
  Khusus: 8,
  Special: 8,
  Mystic: 9,
};