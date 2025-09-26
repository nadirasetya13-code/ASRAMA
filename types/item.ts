import { Rarity } from './core';

export type ItemType =
  | 'makeup'
  | 'lingerie'
  | 'sepatu'
  | 'bra'
  | 'celanaDalam'
  | 'obatBirahi'
  | 'ponsel'
  | 'kameraDsr'
  | 'handycam'
  | 'laptop'
  | 'kondom'
  | 'parfum'
  | 'stocking';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  imageUrl: string;
  description: string;
}

// Stats can be direct talent attributes or custom identifiers for multipliers
export type EquipmentStatEffect =
  | 'kecantikan'
  | 'stamina'
  | 'mental'
  | 'popularitas' // Direct stats
  | 'dayaPikat'
  | 'xpGainMultiplier' // e.g., 0.1 for +10%
  | 'livestreamEarningsMultiplier'
  | 'contentProductionQuality'
  | 'scandalChanceReduction'
  | 'sessionEarningsMultiplier'
  | 'healthDamageReduction'
  | 'mentalDamageReduction'
  | 'satisfactionBonus'; // flat bonus points

export interface EquipmentItem extends Item {
  type:
    | 'makeup'
    | 'lingerie'
    | 'sepatu'
    | 'bra'
    | 'celanaDalam'
    | 'obatBirahi'
    | 'parfum'
    | 'stocking';
  slot:
    | 'makeup'
    | 'lingerie'
    | 'sepatu'
    | 'bra'
    | 'celanaDalam'
    | 'obatBirahi'
    | 'parfum'
    | 'stocking';
  setName: string;
  rarity: Rarity;
  stats: Partial<Record<EquipmentStatEffect, number>>;
}

export interface ConsumableItem extends Omit<Item, 'id' | 'imageUrl'> {
  type: 'kondom';
  basePrice: number;
  protectionLevel: number; // 0.0 to 1.0 (e.g., 0.95 for 95% protection)
  category: 'Konsumsi';
}

export interface PhoneItem extends Item {
  type: 'ponsel' | 'kameraDsr' | 'handycam' | 'laptop';
  brand: string;
  level: number;
  basePrice: number;
  buff: {
    effectId: string;
    name: string;
    baseValue: number;
    upgradeValue: number;
  };
  equippedTo?: string | null; // talentId
  category?: 'Ponsel' | 'Produksi';
}

export interface EquipmentSlots {
  makeup: EquipmentItem | null;
  lingerie: EquipmentItem | null;
  sepatu: EquipmentItem | null;
  bra: EquipmentItem | null;
  celanaDalam: EquipmentItem | null;
  obatBirahi: EquipmentItem | null;
  ponsel: PhoneItem | null;
  kameraDsr: PhoneItem | null;
  handycam: PhoneItem | null;
  laptop: PhoneItem | null;
  parfum: EquipmentItem | null;
  stocking: EquipmentItem | null;
  kondom: EquipmentItem | null; // Display-only slot
}
