import type { FisikAttributes } from './character';

export interface PenisAttributes {
  // FIX: Added index signature to allow this type to be used as a generic record in components.
  [key: string]: number | string;
  panjang: number; // cm
  diameter: number; // cm
  dayaTahan: number; // 1-100
  agresivitas: number; // 1-100
  kekerasanEreksi: number; // 1-100
  sensitivitas: number; // 1-100
  volumeSperma: number; // 1-100
  tipeKepala: string; // 'Runcing', 'Bulat', 'Lebar'
  teksturUrat: string; // 'Berurat', 'Halus'
  bau: number; // 1-100
}

export interface GuestWant {
  category: 'fisik' | 'payudara' | 'vagina' | 'klitoris' | 'main' | 'position';
  attribute: string; // Can be an attribute key or a skill ID
  label: string;
  operator: '>=' | '<=' | '==';
  value: number | string; // Can be a number for stats or a string for skill ID
  importance: number; // multiplier e.g., 1.0 for normal, 1.5 for very important
}

export type KinkType =
  | 'Dominasi'
  | 'Sadisme Ringan'
  | 'Masokisme'
  | 'Fertility'
  | 'Virginity Complex';

export interface GuestKink {
  type: KinkType;
  description: string;
}

export type PersonalityTraitType =
  | 'Royal'
  | 'Pelit'
  | 'Kasar'
  | 'Romantis'
  | 'Tidak Sabaran'
  | 'Kritis'
  | 'Setia'
  | 'Penyebar Penyakit';

export interface Guest {
  id: string;
  name: string;
  age: number;
  kotaAsal: string;
  agama: string;
  statusSosial: string;
  cerita: string;
  bio: string;
  imageUrl: string;
  patience: number;
  tier: number;
  fisik: FisikAttributes;
  penis: PenisAttributes;
  wants: GuestWant[];
  kinks: GuestKink[];
  personalityTraits: PersonalityTraitType[];
  requestedTalentId?: string;
  requestedTalentName?: string;
}