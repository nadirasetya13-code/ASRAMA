// --- CITIZEN RAID MECHANISM ---
export const RAID_SUSPICION_THRESHOLD = 100;

// Suspicion Points Gain
export const SUSPICION_FROM_LOW_SATISFACTION = 5; // For satisfaction < 40
export const SUSPICION_FROM_KASAR_TRAIT = 8;
export const SUSPICION_FROM_DOMINASI_KINK = 10;
export const SUSPICION_FROM_LOW_REPUTATION = 3; // For reputation < 30

// Raid Event Choices & Probabilities
export const RAID_BRIBE_COST_PERCENTAGE = 0.25; // 25% of current cash
export const RAID_BRIBE_BASE_SUCCESS_CHANCE = 0.4; // 40%
export const RAID_BRIBE_LEVEL_BONUS = 0.02; // +2% chance per agency level

export const RAID_NEGOTIATE_BASE_SUCCESS_CHANCE = 0.1; // 10%
export const RAID_NEGOTIATE_MENTAL_MODIFIER = 0.008; // +0.8% chance per mental point

export const RAID_HIDE_SUCCESS_CHANCE = 0.15; // 15%

// Raid Consequences (Failure)
export const RAID_REPUTATION_PENALTY = -100;
export const RAID_SEAL_DURATION_DAYS_MIN = 3;
export const RAID_SEAL_DURATION_DAYS_MAX = 7;
export const RAID_MONEY_FINE_PERCENTAGE = 0.1; // 10% of current cash
export const RAID_TALENT_TRAUMA_DURATION_DAYS = 2;
export const RAID_SUSPICION_RESET_VALUE_FAIL = 60; // Reset to 60 after failure
export const RAID_LAPORAN_RESMI_INCREASE = 50; // Points towards Satpol-PP raid
// --- NEW: Heavier penalties for failing a 'hide' attempt ---
export const RAID_HIDE_FAIL_SEAL_MULTIPLIER = 1.5; // Seal duration is 50% longer
export const RAID_HIDE_FAIL_REPUTATION_MULTIPLIER = 1.5; // Rep penalty is 50% bigger
export const RAID_HIDE_FAIL_FINE_MULTIPLIER = 2.0; // Fine is 2x bigger

// Raid Consequences (Success)
export const RAID_SUSPICION_RESET_VALUE_SUCCESS = 30; // Reset to 30 after success

// --- SATPOL-PP RAID MECHANISM ---
export const SATPOLPP_LAPORAN_RESMI_THRESHOLD = 100;

// Suspicion Points Gain
export const LAPORAN_RESMI_FROM_KASAR_TRAIT = 3;
export const LAPORAN_RESMI_FROM_DOMINASI_KINK = 5;
export const LAPORAN_RESMI_FROM_PENYEBAR_PENYAKIT = 15;

// Consequences
export const SATPOLPP_SEAL_DURATION_DAYS_BASE = 3; // Reduced from 7
export const SATPOLPP_SEAL_DURATION_DAYS_WITH_FINE = 5; // Reduced from 14
export const SATPOLPP_FINE_PERCENTAGE = 0.5; // 50% of SAVINGS
export const SATPOLPP_SUPERVISION_DEBUFF_DAYS = 14; // Reduced from 30
export const SATPOLPP_SUPERVISION_MULTIPLIER = 2.0;
export const SATPOLPP_LAPORAN_RESET_VALUE = 20;
export const POLICE_INVESTIGATION_ACTIVATION_INCREASE = 25; // Points towards Police raid

// --- POLICE RAID MECHANISM ---
export const POLICE_PENYELIDIKAN_THRESHOLD = 100;

// Suspicion Points Gain
export const PENYELIDIKAN_FROM_DOXXING = 30;
export const PENYELIDIKAN_FROM_PENYEBAR_PENYAKIT = 10;
export const PENYELIDIKAN_FROM_SUPERVISION = 1; // Extra point per session while under supervision

// Consequences (Catastrophic)
export const POLICE_MONEY_SEIZURE_PERCENTAGE = 0.75; // 75% of current cash
export const POLICE_SAVINGS_SEIZURE_PERCENTAGE = 0.5; // 50% of savings
export const POLICE_TALENT_ARREST_COUNT = 3;
export const POLICE_CRIMINAL_RECORD_COST_INCREASE = 1.25; // 25% permanent increase in operational costs
export const POLICE_CRIMINAL_RECORD_REP_DECREASE = 0.5; // 50% permanent decrease in reputation gain
export const POLICE_PENYELIDIKAN_RESET_VALUE = 0;