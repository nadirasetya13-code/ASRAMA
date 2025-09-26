export type BuffTargetId =
  | 'ALL_SESSIONS_TODAY'
  | 'NEXT_SESSION'
  | 'ALL_TALENTS_TODAY'
  | 'LOWEST_PIQUE_TALENT'
  | 'SPECIFIC_ROOM_TYPE_ROMANTIS'
  | 'SPECIFIC_TALENT';
export type BuffEffectId =
  | 'EARNINGS_BONUS'
  | 'XP_BONUS'
  | 'REPUTATION_BONUS'
  | 'ZERO_ENERGY_COST'
  | 'FREE_REPAIRS_TODAY'
  | 'GUARANTEE_ROYAL_GUEST'
  | 'PERMANENT_STAT_UP_BEAUTY'
  | 'MENTAL_LOCK'
  | 'POPULARITY_PENALTY';
export type BuffConditionId =
  | 'NONE'
  | 'IF_SATISFACTION_ABOVE_90'
  | 'IF_TALENT_GUEST_SAME_CITY'
  | 'IF_KINK_FULFILLED';

export interface ActiveBuff {
  id: string;
  sourceRoomId: string;
  sourceRoomName: string;
  description: string;
  durationDays: number;

  // Dynamic components
  target: BuffTargetId;
  effect: BuffEffectId;
  value: number; // Can be percentage (0.25) or absolute value (50)
  condition: BuffConditionId;

  // For tracking 'NEXT_SESSION' type buffs
  isTriggered?: boolean;
}
