export const PRODUCTION_ENERGY_COST = {
  Foto: 25,
  Video: 45,
};

export const PRODUCTION_MENTAL_COST = {
  Foto: 20,
  Video: 40,
};

export const PRODUCTION_AGENCY_COMMISSION = 0.4; // 40%

// New constants for passive income from content stock
export const BASE_PHOTO_EARNINGS_POTENTIAL = 250000;
export const BASE_VIDEO_EARNINGS_POTENTIAL = 800000;
export const CONTENT_SELL_THROUGH_CHANCE = 0.35; // 35% chance to sell 1 unit per day

// New constants for batch production
export const PRODUCTION_BATCH_SIZES = [1, 5, 10, 25, 50, 100];
export const BASE_PHOTO_PRODUCTION_COST = 50000; // Per photo
export const BASE_VIDEO_PRODUCTION_COST = 200000; // Per video

export const PRODUCTION_THEMES: Record<
  string,
  {
    label: string;
    statCheck: 'kecantikan' | 'mental' | 'stamina' | 'popularitas';
    description: string;
    statusBonus?: string;
  }
> = {
  'gadis-desa-polos': {
    label: 'Gadis Desa Polos',
    statCheck: 'kecantikan',
    description:
      'Memerankan gadis desa lugu yang pertama kali telanjang di depan kamera. Sangat bergantung pada Kecantikan alami.',
    statusBonus: 'Gadis Desa',
  },
  'milf-dominan': {
    label: 'MILF Dominan',
    statCheck: 'mental',
    description:
      'Memerankan ibu rumah tangga dewasa yang memegang kendali. Membutuhkan Mental yang kuat untuk mendominasi.',
  },
  'cosplay-nakal': {
    label: 'Cosplay Nakal',
    statCheck: 'popularitas',
    description:
      'Sesi foto/video dengan kostum seksi. Popularitas tinggi akan menarik audiens yang lebih besar.',
    statusBonus: 'Seleb TikTok',
  },
  'sesi-bdsm-amatir': {
    label: 'Sesi BDSM Amatir',
    statCheck: 'stamina',
    description:
      'Memerankan adegan bondage atau disiplin ringan. Membutuhkan Stamina tinggi untuk menahan pose sulit. Risiko skandal lebih tinggi.',
  },
  'pasangan-selingkuh-pov': {
    label: 'Pasangan Selingkuh (POV)',
    statCheck: 'mental',
    description:
      'Berakting seolah-olah penonton adalah selingkuhan. Membutuhkan akting dan Mental yang meyakinkan.',
  },
};
