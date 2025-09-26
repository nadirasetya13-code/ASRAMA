import { Rarity } from '../types';

// --- CLINIC MECHANICS V2 - BALANCED & COMPLEX FORMULA ---

/**
 * Defines how much a specific attribute's upgrade should cost relative to others.
 * Higher weight = more expensive. This reflects gameplay importance.
 */
export const SURGERY_STAT_IMPORTANCE_WEIGHT: Record<string, number> = {
  // Main Stats
  kecantikan: 1.8,
  // Fisik (Cosmetic have lower importance)
  gayaRambut: 1.0,
  bentukWajah: 1.2,
  bentukMata: 1.2,
  bentukBibir: 1.4,
  bentukHidung: 1.0,
  bentukTangan: 1.0,
  beratBadan: 1.1,
  bentukKaki: 1.3,
  bentukPantat: 1.9,
  // Payudara (Core Intimate Stats)
  'intim.payudara.ukuran': 2.0,
  'intim.payudara.bentuk': 1.6,
  'intim.payudara.kekenyalan': 1.5,
  // Vagina (Core Intimate Stats)
  'intim.vagina.kekencangan': 2.0,
  'intim.vagina.kedalaman': 1.7,
  'intim.vagina.elastisitas': 1.5,
  // Default fallback
  default: 1.0,
};

/**
 * Multiplier based on talent rarity. Higher rarity talents are more "complex" to operate on.
 */
export const SURGERY_RARITY_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.1,
  Epic: 1.25,
  Legendary: 1.4,
  Event: 1.5,
  Khusus: 1.6,
  Special: 1.75,
  Mystic: 2.0,
};

// --- Cost Formula Components ---
// Cost = ((Change * Weight * C1) + (Target^1.8 * C2)) * Rarity * Risk * (1 - Discount)
export const SURGERY_BASE_CHANGE_COST_PER_POINT = 500000;
export const SURGERY_TARGET_LEVEL_COST_MULTIPLIER = 30000;
export const SURGERY_TARGET_LEVEL_EXPONENT = 1.8;

// --- Recovery Formula Components ---
// Recovery = Base + (Change * Weight * (1 + Age/100))
export const RECOVERY_BASE_DAYS = 1;
