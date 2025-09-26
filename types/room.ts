import type { Rarity } from './core';

export type RoomType =
  | 'Standar'
  | 'Romantis'
  | 'Dominasi'
  | 'Penyembuhan'
  | 'Pelatihan'
  | 'Hiburan'
  | 'Brankas';
export type RoomRarity = 'Event' | 'Khusus' | 'Special' | 'Mystic';

export interface RoomUpgrade {
  // Key is the buff type, value is its strength
  [key: string]: number;
}

export interface RoomBase {
  id: string;
  name: string;
  level: number; // 1-100
  condition: number; // 0-100
  status: 'available' | 'occupied' | 'needs_cleaning' | 'cleaning';
  upgrades: RoomUpgrade; // Dynamic object for buffs
  isAcquired?: boolean; // For rarity rooms, to check if player has unlocked it
  cleaningCompleteTime?: number; // Timestamp for when cleaning finishes
  lastSessionInfo?: {
    // Info from the last session for calculations
    talentRarity: Rarity;
    guestTier: number;
  };
}

export interface StandardRoom extends RoomBase {
  type: RoomType;
  rarity?: never;
}

export interface RarityRoom extends RoomBase {
  rarity: RoomRarity;
  type?: never;
}

export type Room = StandardRoom | RarityRoom;
