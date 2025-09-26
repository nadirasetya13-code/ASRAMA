import { Room, RoomRarity, RoomType, RoomUpgrade } from '../types';

export const FLOWER_ROOM_NAMES: string[] = [
  'Melati',
  'Mawar',
  'Anggrek',
  'Kenanga',
  'Kamboja',
  'Sedap Malam',
  'Cempaka',
  'Dahlia',
  'Teratai',
  'Flamboyan',
  'Bougenville',
  'Edelweiss',
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: `room-initial-1`,
    name: `Kamar ${FLOWER_ROOM_NAMES[0]}`,
    type: 'Standar',
    level: 1,
    status: 'available',
    condition: 100,
    upgrades: {},
    isAcquired: true,
  },
];

// --- New Advanced Room System Constants ---

export const MAX_STANDARD_ROOMS = 12;
export const MAX_ROOM_LEVEL = 100;

// -- Costs --
export const ROOM_BUILD_COST_BASE = 5000000;
export const ROOM_BUILD_COST_MULTIPLIER = 1.75;
export const ROOM_UPGRADE_COST_BASE = 100000;
export const ROOM_UPGRADE_COST_MULTIPLIER = 1.15;

// -- Maintenance --
export const CONDITION_DECAY_PER_SESSION = 5; // Base decay
export const REPAIR_COST_PER_POINT = 25000;

// -- Buffs & Upgrades --
type UpgradeMilestone = {
  description: string;
  buff: RoomUpgrade;
};

export const UPGRADE_MILESTONES: Record<number, UpgradeMilestone> = {
  10: {
    description: 'Efisiensi Energi Sesi',
    buff: { energyCostReduction: 0.05 },
  },
  20: { description: 'Bonus Reputasi', buff: { reputationBonus: 0.1 } },
  30: {
    description: 'Tahan Kerusakan',
    buff: { conditionDecayReduction: 0.2 },
  },
  40: {
    description: 'Bonus Uang Saku Talenta',
    buff: { talentEarningsBonus: 0.1 },
  },
  50: {
    description: 'Daya Tarik Pasif',
    buff: { guestTierChanceBonus: 0.05 },
  },
  60: {
    description: 'Efisiensi Energi Sesi II',
    buff: { energyCostReduction: 0.05 },
  },
  70: { description: 'Bonus Reputasi II', buff: { reputationBonus: 0.05 } },
  80: {
    description: 'Tahan Kerusakan II',
    buff: { conditionDecayReduction: 0.1 },
  },
  90: {
    description: 'Bonus Uang Saku Talenta II',
    buff: { talentEarningsBonus: 0.05 },
  },
  100: {
    description: 'Daya Tarik Pasif II',
    buff: { guestTierChanceBonus: 0.05 },
  },
};

// -- Room Type Configurations --
interface RoomTypeConfig {
  name: string;
  description: string;
  icon: string; // Placeholder for icon component name
  color: string;
  baseBuildCost: number;
  // Function to get buffs based on level
  getBuffs: (level: number) => RoomUpgrade;
}

export const ROOM_TYPE_CONFIG: Record<RoomType, RoomTypeConfig> = {
  Standar: {
    name: 'Kamar Standar',
    description:
      'Kamar serbaguna yang seimbang, tanpa bonus atau malus yang signifikan.',
    icon: 'RoomIcon',
    color: 'bg-slate-500',
    baseBuildCost: 5000000,
    getBuffs: (level) => ({
      satisfactionBonus: level * 0.0012,
      earningsBonus: level * 0.0018,
    }),
  },
  Romantis: {
    name: 'Suite Romantis',
    description:
      'Memberikan bonus pada `Jatuh Cinta` talenta dan kepuasan tamu dengan sifat `Romantis`.',
    icon: 'HeartIcon',
    color: 'bg-rose-500',
    baseBuildCost: 8000000,
    getBuffs: (level) => ({
      satisfactionBonus: level * 0.0018,
      loveBonus: level * 0.0025, // Custom buff for 'Jatuh Cinta'
    }),
  },
  Dominasi: {
    name: 'Ruang Dominasi',
    description:
      'Memberikan bonus kepuasan masif untuk tamu dengan Kink, namun menyebabkan kerusakan `mental` lebih besar.',
    icon: 'DominanceRoomIcon',
    color: 'bg-red-700',
    baseBuildCost: 12000000,
    getBuffs: (level) => ({
      kinkSatisfactionBonus: level * 0.005,
      mentalDamageIncrease: 0.1, // A static malus
    }),
  },
  Penyembuhan: {
    name: 'Klinik Penyembuhan',
    description:
      'Mengurangi kerusakan `kesehatan` dan `mental` yang diterima talenta setelah sesi.',
    icon: 'HealingRoomIcon',
    color: 'bg-sky-500',
    baseBuildCost: 10000000,
    getBuffs: (level) => ({
      healthDamageReduction: level * 0.0035,
      mentalDamageReduction: level * 0.0035,
    }),
  },
  Pelatihan: {
    name: 'Studio Pelatihan',
    description: 'Memberikan bonus XP signifikan bagi talenta yang menggunakannya.',
    icon: 'TrainingRoomIcon',
    color: 'bg-amber-500',
    baseBuildCost: 7500000,
    getBuffs: (level) => ({
      xpBonus: level * 0.004,
    }),
  },
  Hiburan: {
    name: 'Panggung Hiburan',
    description: 'Meningkatkan `Popularitas` talenta dan kepuasan tamu `Kritis`.',
    icon: 'EntertainmentRoomIcon',
    color: 'bg-purple-500',
    baseBuildCost: 9000000,
    getBuffs: (level) => ({
      popularityBonus: level * 0.0025,
      criticalGuestSatisfactionBonus: level * 0.0035,
    }),
  },
  Brankas: {
    name: 'Ruang Brankas Mewah',
    description:
      'Memberikan bonus persentase pada Laba Bersih dan sangat efektif untuk tamu `Royal`.',
    icon: 'VaultRoomIcon',
    color: 'bg-emerald-600',
    baseBuildCost: 15000000,
    getBuffs: (level) => ({
      earningsBonus: level * 0.0035,
      royalGuestBonus: level * 0.0035,
    }),
  },
};

// -- Rarity Room Configurations --
export const RARITY_ROOM_CONFIG: Record<
  RoomRarity,
  { name: string; effect: string; icon: string; color: string }
> = {
  Event: {
    name: 'Panggung Festival',
    effect: 'Dengan talenta [Event], memicu buff acak selama 24 jam.',
    icon: 'EventRoomIcon',
    color: 'bg-teal-500',
  },
  Khusus: {
    name: 'Ruang Resonansi',
    effect:
      'Dengan talenta [Khusus], memicu buff acak yang berlaku untuk SEMUA KAMAR selama 24 jam.',
    icon: 'KhususRoomIcon',
    color: 'bg-pink-500',
  },
  Special: {
    name: 'Ruang Mentorship',
    effect:
      'Dengan talenta [Special], talenta dengan Daya Pikat terendah akan mendapat XP instan.',
    icon: 'SpecialRoomIcon',
    color: 'bg-red-500',
  },
  Mystic: {
    name: 'Nexus Kenikmatan',
    effect:
      'Bonus super dari semua tipe kamar. Sesi tidak mengonsumsi energi & jaminan kepuasan min. 85%.',
    icon: 'MysticRoomIcon',
    color: 'bg-indigo-600',
  },
};
