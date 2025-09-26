import { GameState, GameTime } from '../types';
import { INITIAL_ROOMS } from './rooms';

export const INITIAL_GAME_TIME: GameTime = {
  day: 1,
  phase: 'Siang',
};

// Agency Level Up System
export const PLAYER_MAX_LEVEL = 100;
export const PLAYER_LEVEL_EXP_BASE = 100;
export const PLAYER_LEVEL_EXP_POWER = 1.5;

export const INITIAL_GAME_STATE: GameState = {
  money: 10000000,
  reputation: 10,
  savings: 5000000,
  level: 1,
  reputationToNextLevel: Math.floor(
    PLAYER_LEVEL_EXP_BASE * Math.pow(2, PLAYER_LEVEL_EXP_POWER)
  ),
  gameTime: INITIAL_GAME_TIME,
  rooms: INITIAL_ROOMS,
  activeBuffs: [],
  unpaidSessions: [],
  playerPhones: [],
  playerConsumables: {},
  eventHistory: {},
  devOptionsUnlocked: false,
  cheats: {
    unlimitedMoney: false,
    unlimitedTalentMoney: false,
  },
  kecurigaanWarga: 0,
  raidPending: false,
  asramaSealedUntil: null,
  laporanResmi: 0,
  penyelidikanPolisi: 0,
  penyelidikanPolisiActive: false,
  supervisionDebuffUntil: null,
  hasCriminalRecord: false,
  // FIX: Added missing property 'claimedAdvancementLevels' to satisfy the GameState type.
  claimedAdvancementLevels: [],
};

export const YEARLY_XP_TO_NEXT_AGE = 1000;
export const DAILY_OPERATIONAL_COST = 50000;
export const ENERGY_COST_PER_SESSION = 35; // How much energy a session costs
export const ENERGY_RECOVERY_PER_DAY = 100; // How much energy is recovered at the end of the day
export const REPUTATION_PENALTY_PER_UNSERVED_GUEST = -2;

// --- HIV Mechanic ---
export const HIV_INFECTION_THRESHOLD = 100;
export const HIV_RISK_BASE_UNPROTECTED = 5; // Increased from 1
export const HIV_RISK_INFECTED_GUEST = 15;

export const MATCH_REWARDS = {
  PERFECT_MATCH_MONEY: 500,
  GOOD_MATCH_MONEY: 250,
  OK_MATCH_MONEY: 100,
  MINIMAL_MATCH_MONEY: 50,
  BAD_MATCH_MONEY: 0,
  PERFECT_MATCH_REP: 10,
  GOOD_MATCH_REP: 5,
  OK_MATCH_REP: 2,
  MINIMAL_MATCH_REP: 1,
  BAD_MATCH_REP: -5,
};

// --- Satisfaction Calculation Modifiers ---
export const SATISFACTION_MODIFIERS = {
  SAME_CITY: 4,
  SAME_RELIGION: 2,
  STATUS_DYNAMICS_BONUS_HIGH: 6, // e.g., Exec with Intern
  STATUS_DYNAMICS_BONUS_MID: 4, // e.g., Official with Schoolgirl
  STATUS_DYNAMICS_BONUS_LOW: 5, // e.g., Professional with Village Girl
  STATUS_DYNAMICS_PENALTY: -8, // e.g., Oligarch with TikTok Star
  PHYSICAL_COMPATIBILITY_BASE: 5,
  PHYSICAL_COMPATIBILITY_DIVISOR: 10,
  KINK_FULFILLED_MULTIPLIER: 1.5,
  KINK_UNFULFILLED_MULTIPLIER: 0.6,
  PERSONALITY_KRITIS_PENALTY: -15,
  PERSONALITY_SABAR_PENALTY: -10,
  PERSONALITY_ROMANTIS_BONUS: 10,
  PERSONALITY_ROMANTIS_PUTING_BONUS: 5,
  PERSONALITY_SETIA_DIVISOR: 10,
  STAMINA_MISMATCH_PENALTY_CAP: 10,
  STAMINA_MISMATCH_MULTIPLIER: 0.2,
  SCENT_CHEMISTRY_DIVISOR: 10,
  SENSITIVITY_SYNERGY_MULTIPLIER: 0.1, // Multiplies the synergy score by 10%
  ROOM_CONDITION_PENALTY_MULTIPLIER: 0.5, // 0.5% satisfaction loss per point of damage below 50
};