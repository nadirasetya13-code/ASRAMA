import { BaseTalent } from "../../../types";
import { biasaTalents } from './biasa';
import { rareTalents } from './rare';
import { epicTalents } from './epic';
import { legendaryTalents } from './legendary';
import { eventTalents } from './event';
import { khususTalents } from './khusus';
import { specialTalents } from './special';
import { mysticTalents } from './mystic';

/**
 * An array containing all base talents, aggregated from individual rarity files.
 * This structure makes it easy for developers to add or remove talents by simply
 * modifying the corresponding rarity file, without touching this aggregation logic.
 */
export const baseTalents: BaseTalent[] = [
    ...biasaTalents,
    ...rareTalents,
    ...epicTalents,
    ...legendaryTalents,
    ...eventTalents,
    ...khususTalents,
    ...specialTalents,
    ...mysticTalents,
];
