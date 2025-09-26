import type { Rarity } from './core';

export type LivestreamStatCheck =
  | 'kecantikan'
  | 'mental'
  | 'popularitas'
  | 'stamina';

export interface LivestreamChoiceModifier {
  skill?: { id: string; bonus: number };
  topic?: { id: string; bonus: number };
}

export interface LivestreamChoiceOutcome {
  hype: number | [number, number];
  viewers: number | [number, number];
  message: string;
}

export interface LivestreamChoice {
  text: string;
  stat: LivestreamStatCheck;
  threshold: number | [number, number];
  success: LivestreamChoiceOutcome;
  failure: LivestreamChoiceOutcome;
  modifiers?: LivestreamChoiceModifier;
  exclusiveToRarity?: Rarity[];
}

export interface LivestreamEvent {
  id: string;
  text: string;
  choices: LivestreamChoice[];
  tags?: string[];
}

export interface ActiveLivestreamSession {
  talentId: string;
  phoneId: string;
  hype: number; // 0-100
  currentViewers: number;
  peakViewers: number;
  events: LivestreamEvent[];
  eventProgressIndex: number;
  activeEventIndex: number;
}

export interface LivestreamResult {
  talentId: string;
  earnings: number;
  peakViewers: number;
  popularityGain: number;
  mentalChange: number;
  energyChange: number;
  finalHype: number;
  topic: string;
  topicLabel: string;
  xpGained: number;
}