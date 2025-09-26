import { BaseGuest } from './types';
import { tier1Guests } from './tiers/tier1';
import { tier2Guests } from './tiers/tier2';
import { tier3Guests } from './tiers/tier3';
import { tier4Guests } from './tiers/tier4';
import { tier5Guests } from './tiers/tier5';
import { tier6Guests } from './tiers/tier6';
import { tier7Guests } from './tiers/tier7';
import { tier8Guests } from './tiers/tier8';

/**
 * An array containing all base guests, aggregated from individual tier files.
 * This structure makes it easy for developers to add or remove guests by simply
 * modifying the corresponding tier file, without touching this aggregation logic.
 */
export const baseGuests: BaseGuest[] = [
    ...tier1Guests,
    ...tier2Guests,
    ...tier3Guests,
    ...tier4Guests,
    ...tier5Guests,
    ...tier6Guests,
    ...tier7Guests,
    ...tier8Guests,
];
