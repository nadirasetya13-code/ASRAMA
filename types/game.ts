import type { Room } from './room';
import type { ActiveBuff } from './buff';
import type { PhoneItem, ConsumableItem, EquipmentItem } from './item';
import type { BaseTalent, SkillCard } from './talent';
import type { ProductionSetup, ProductionResult } from './production';

export interface GameTime {
  day: number;
  phase: 'Siang' | 'Malam';
}

export interface LivestreamSetup {
  talentId: string | null;
  selectedPackage?: { scenarios: number; cost: number };
  topicOptions?: string[];
}

export interface EquipmentGachaResultItem {
  item: EquipmentItem;
  isNew: boolean;
}

export interface GameState {
  money: number;
  reputation: number;
  savings: number;
  level: number;
  reputationToNextLevel: number;
  gameTime: GameTime;
  rooms: Room[];
  activeBuffs: ActiveBuff[];
  unpaidSessions: MatchResult[];
  playerPhones: PhoneItem[];
  playerConsumables: Record<string, { item: ConsumableItem; quantity: number }>;
  eventHistory: Record<string, number>; // Maps eventId to the day it was last seen
  devOptionsUnlocked: boolean;
  cheats: {
    unlimitedMoney: boolean;
    unlimitedTalentMoney: boolean;
  };
  // Risk Management System
  kecurigaanWarga: number;
  raidPending: boolean;
  asramaSealedUntil: number | null;
  laporanResmi: number;
  penyelidikanPolisi: number;
  penyelidikanPolisiActive: boolean;
  supervisionDebuffUntil: number | null;
  hasCriminalRecord: boolean;
  // Advancement Rewards
  claimedAdvancementLevels: number[];
}

export interface TalentImpact {
  kesehatanChange: number;
  mentalChange: number;
  energyChange: number;
  hivRiskIncrease: number;
  pregnancyRiskIncrease: number;
}

export interface MatchBonus {
  description: string;
  value: string;
}

export interface MatchResult {
  sessionId: string;
  talentId: string;
  talentName: string;
  talentImageUrl: string;
  guestName: string;
  guestImageUrl: string;
  success: boolean;
  message: string;
  pendapatanKotor: number;
  biayaPerawatan: number;
  labaBersih: number;
  reputationChange: number;
  xpGained?: number;
  levelUp?: boolean;
  ageUp?: boolean;
  playerLevelUp?: boolean;
  playerLevelUpTo?: number;
  talentImpact: TalentImpact;
  satisfactionScore: number;
  talentEarnings: number;
  roomBonuses: MatchBonus[];
  usedRoomId: string;
  newBuff?: ActiveBuff;
  newSkillUnlocked?: SkillCard;
  talentInfected?: boolean;
  unavailabilityMessage?: string;
  talentCurrentXp?: number;
  talentXpToNextLevel?: number;
}

export interface EndDayResult {
  operationalCost: number;
  roomMaintenanceCost: number;
  unservedGuests: number;
  reputationPenalty: number;
  netMoneyChange: number;
  activeBuffs: ActiveBuff[];
  passiveIncome: number;
  talentRecoveryInfo: {
    talentName: string;
    healthRecovered: number;
  }[];
}

export interface GachaResultItem extends BaseTalent {
  isNew: boolean;
  xpGained: number;
}

export type RaidStatus = 'decision' | 'result';
export interface RaidEvent {
  status: RaidStatus;
  success?: boolean;
  message?: string;
  negotiatingTalent?: {
    name: string;
    mental: number;
  };
  choice?: 'bribe' | 'negotiate' | 'hide';
}

export interface SatpolPpEvent {
  status: 'decision' | 'result';
  paidFine?: boolean;
}

export interface PoliceRaidEvent {
  status: 'result';
  seizedMoney: number;
  seizedSavings: number;
  arrestedTalents: { name: string; rarity: string }[];
}
