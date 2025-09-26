// --- LIVESTREAM SYSTEM ---
export const LIVESTREAM_EVENT_COOLDOWN_DAYS = 3;
export const LIVESTREAM_BASE_MENTAL_COST = 25;
export const LIVESTREAM_BASE_ENERGY_COST = 20;

export const LIVESTREAM_PACKAGES = [
  { id: 'paket-10', scenarios: 10, data: '10 GB', cost: 250000 },
  { id: 'paket-15', scenarios: 15, data: '15 GB', cost: 500000 },
  { id: 'paket-20', scenarios: 20, data: '20 GB', cost: 1000000 },
  { id: 'paket-25', scenarios: 25, data: '25 GB', cost: 2000000 },
  { id: 'paket-30', scenarios: 30, data: '30 GB', cost: 3500000 },
];

// New dynamic topics for livestream
export const LIVESTREAM_TOPICS: Record<
  string,
  {
    label: string;
    group: 'fisik' | 'intim.payudara' | 'main' | 'intim.vagina';
    attribute: string;
    tag: string;
    statChallenge: string[];
  }
> = {
  BUTT_CHALLENGE: {
    label: 'Tantangan Goyang Pantat',
    group: 'fisik',
    attribute: 'bentukPantat',
    tag: 'pantat',
    statChallenge: ['Stamina', 'Kecantikan'],
  },
  LEGS_FOCUS: {
    label: 'Fokus Kaki & Paha',
    group: 'fisik',
    attribute: 'bentukKaki',
    tag: 'kaki',
    statChallenge: ['Kecantikan'],
  },
  ASMR: {
    label: 'ASMR Bisikan Sensual',
    group: 'main',
    attribute: 'mental',
    tag: 'asmr',
    statChallenge: ['Mental', 'Kecantikan'],
  },
  DEEP_TALK: {
    label: 'Curhat & Deep Talk',
    group: 'main',
    attribute: 'mental',
    tag: 'interaksi',
    statChallenge: ['Mental'],
  },
  CLEAVAGE_SHOW: {
    label: 'Pamer Belahan Dada',
    group: 'intim.payudara',
    attribute: 'ukuran',
    tag: 'dada',
    statChallenge: ['Kecantikan', 'Popularitas'],
  },
  DOMINANCE_SESSION: {
    label: 'Sesi Dominasi & Hukuman',
    group: 'main',
    attribute: 'mental',
    tag: 'dominasi',
    statChallenge: ['Mental', 'Stamina'],
  },
  COSPLAY_REQUEST: {
    label: 'Request Cosplay',
    group: 'main',
    attribute: 'popularitas',
    tag: 'kostum',
    statChallenge: ['Popularitas', 'Kecantikan'],
  },
  PUBLIC_RISK: {
    label: 'Fantasi Publik & Risiko',
    group: 'main',
    attribute: 'mental',
    tag: 'publik',
    statChallenge: ['Mental'],
  },
};
