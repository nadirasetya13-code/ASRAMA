import { Rarity } from '../types';
import { RarityVisualConfig } from './rarities/types';
import { biasaConfig } from './rarities/biasa';
import { rareConfig } from './rarities/rare';
import { epicConfig } from './rarities/epic';
import { legendaryConfig } from './rarities/legendary';
import { eventConfig } from './rarities/event';
import { khususConfig } from './rarities/khusus';
import { specialConfig } from './rarities/special';
import { mysticConfig } from './rarities/mystic';

export const RARITY_CONFIG: Record<Rarity, RarityVisualConfig> = {
  Biasa: biasaConfig,
  Rare: rareConfig,
  Epic: epicConfig,
  Legendary: legendaryConfig,
  Event: eventConfig,
  Khusus: khususConfig,
  Special: specialConfig,
  Mystic: mysticConfig,
};
