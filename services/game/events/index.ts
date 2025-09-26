import { LivestreamEvent } from '../../../types';
import { viewerInteractionEvents } from './viewerInteraction';
import { sexualActEvents } from './sexualActs';
import { physicalChallengeEvents } from './physicalChallenges';
import { dramaEvents } from './drama';
import { teaseAndRevealEvents } from './teaseAndReveal';
import { roleplayAndPerformanceEvents } from './roleplayAndPerformance';
import { cosplayEvents } from './cosplay';
import { fetishAndObjectsEvents } from './fetishAndObjects';
import { groupAndCuckoldEvents } from './groupAndCuckold';
import { humiliationEvents } from './humiliation';
import { publicAndRiskyEvents } from './publicAndRisky';
import { asmrEvents } from './asmr';
import { legPlayEvents } from './legPlay';

/**
 * An array containing all livestream events, aggregated from individual category files.
 * This structure makes it easy for developers to add or modify scenarios by simply
 * editing the corresponding category file, without touching this aggregation logic.
 */
export const livestreamEvents: LivestreamEvent[] = [
    ...viewerInteractionEvents,
    ...sexualActEvents,
    ...physicalChallengeEvents,
    ...dramaEvents,
    ...teaseAndRevealEvents,
    ...roleplayAndPerformanceEvents,
    ...cosplayEvents,
    ...fetishAndObjectsEvents,
    ...groupAndCuckoldEvents,
    ...humiliationEvents,
    ...publicAndRiskyEvents,
    ...asmrEvents,
    ...legPlayEvents,
];