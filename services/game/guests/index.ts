import { baseGuests } from './baseGuests';
import { narratives } from './guestNarratives';
import { wants, kinks, personalityTraits } from './preferences';

/**
 * An aggregated object containing all the data pools for dynamic guest generation.
 * This simplifies importing guest data into the `guestService` and keeps the
 * data sources modular and easy to manage for developers.
 */
export const guestDataPools = {
    baseGuests,
    narratives,
    wants,
    kinks,
    personalityTraits,
};