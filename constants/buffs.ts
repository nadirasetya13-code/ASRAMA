import { BuffConditionId, BuffEffectId, BuffTargetId } from '../types';

// --- DYNAMIC BUFF GENERATOR SYSTEM ---

type BuffComponent<T> = { id: T; text: string };

export const BUFF_TARGETS: BuffComponent<BuffTargetId>[] = [
  { id: 'ALL_SESSIONS_TODAY', text: 'Semua sesi hari ini' },
  { id: 'NEXT_SESSION', text: 'Sesi berikutnya' },
  { id: 'ALL_TALENTS_TODAY', text: 'Semua talenta hari ini' },
  { id: 'LOWEST_PIQUE_TALENT', text: 'Talenta dengan Daya Pikat terendah' },
  {
    id: 'SPECIFIC_ROOM_TYPE_ROMANTIS',
    text: 'Semua kamar tipe Romantis',
  },
];

export const BUFF_EFFECTS: (BuffComponent<BuffEffectId> & {
  valueType: 'percentage' | 'absolute' | 'guarantee' | 'permanent_points';
})[] = [
  {
    id: 'EARNINGS_BONUS',
    text: 'mendapat bonus Laba Bersih',
    valueType: 'percentage',
  },
  { id: 'XP_BONUS', text: 'mendapat bonus XP', valueType: 'percentage' },
  {
    id: 'REPUTATION_BONUS',
    text: 'mendapat bonus Reputasi',
    valueType: 'percentage',
  },
  {
    id: 'ZERO_ENERGY_COST',
    text: 'tidak mengonsumsi energi',
    valueType: 'absolute',
  },
  {
    id: 'FREE_REPAIRS_TODAY',
    text: 'mendapat perbaikan gratis',
    valueType: 'absolute',
  },
  {
    id: 'GUARANTEE_ROYAL_GUEST',
    text: 'dijamin adalah tamu Royal',
    valueType: 'guarantee',
  },
  {
    id: 'PERMANENT_STAT_UP_BEAUTY',
    text: 'mendapat +{value} Kecantikan permanen',
    valueType: 'permanent_points',
  },
];

export const BUFF_VALUE_POOLS = {
  percentage: [
    { value: 0.15, text: '+15%' },
    { value: 0.25, text: '+25%' },
    { value: 0.5, text: '+50%' },
  ],
  permanent_points: [
    { value: 1, text: '+1' },
    { value: 3, text: '+3' },
  ],
};

export const BUFF_CONDITIONS: BuffComponent<BuffConditionId>[] = [
  { id: 'NONE', text: '' },
  { id: 'IF_SATISFACTION_ABOVE_90', text: 'jika kepuasan di atas 90%' },
  {
    id: 'IF_TALENT_GUEST_SAME_CITY',
    text: 'jika talenta & tamu dari kota yang sama',
  },
  { id: 'IF_KINK_FULFILLED', text: 'jika Kink tamu berhasil dipenuhi' },
];
