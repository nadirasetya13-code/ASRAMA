import type { Rarity } from './core';
import type { FisikAttributes, IntimAttributes } from './character';
import type { EquipmentItem, EquipmentSlots } from './item';

export interface SkillCard {
  id: string;
  name: string;
  description: string[];
}

export interface Tariff {
  layanan: number;
  perawatan: number;
  kesehatan: number;
  kb: number;
}

export interface ContentItem {
  id: string;
  quality: number; // 1-100
  potentialEarnings: number;
}

export interface Talent {
  id: string;
  name: string;
  age: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  yearlyExperience: number;
  yearlyExperienceToNextAge: number;
  kotaAsal: string;
  agama: string;
  statusSosial: string;
  cerita: string;
  imageUrl: string;
  rarity: Rarity;
  stamina: number; // Max Energy
  currentEnergy: number; // Current Energy
  popularitas: number;
  kecantikan: number;
  mental: number;
  fisik: FisikAttributes;
  intim: IntimAttributes;
  equipment: EquipmentSlots;
  equipmentInventory: EquipmentItem[];
  potensiHIVAIDS: number;
  kesehatan: number;
  jatuhCinta: number;
  potensiHamil: number;
  skills: SkillCard[];
  dayaPikat: number;
  tariffs: Tariff;
  earnings: number;
  reincarnationCount: number;
  hibernationEndTime?: number;
  followers: number;
  sessionsServed: number;
  photoInventory: ContentItem[];
  videoInventory: ContentItem[];
  isDeceased?: boolean;
  unavailableUntil?: number;
  unavailabilityReason?: 'Tugas Luar' | 'Haid' | 'Pemulihan Operasi' | 'Trauma Penggerebekan';
  isOnContraceptives: boolean;
  hasMastery?: boolean;
}

export type BaseTalent = Omit<
  Talent,
  | 'dayaPikat'
  | 'tariffs'
  | 'skills'
  | 'level'
  | 'experience'
  | 'experienceToNextLevel'
  | 'age'
  | 'yearlyExperience'
  | 'yearlyExperienceToNextAge'
  | 'currentEnergy'
  | 'earnings'
  | 'hibernationEndTime'
  | 'followers'
  | 'sessionsServed'
  | 'photoInventory'
  | 'videoInventory'
  | 'isDeceased'
  | 'unavailableUntil'
  | 'unavailabilityReason'
  | 'isOnContraceptives'
  | 'hasMastery'
> & { reincarnationCount: number };