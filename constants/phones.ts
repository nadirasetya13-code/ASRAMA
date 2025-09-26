import { PhoneItem } from '../types';

// --- PHONE SHOP SYSTEM ---
export const PHONE_UPGRADE_COST_BASE = 150000;
export const PHONE_UPGRADE_COST_MULTIPLIER = 1.25; // Increased for more meaningful progression
export const MAX_PHONE_LEVEL = 100;

export const PHONE_CATALOG: Omit<PhoneItem, 'id' | 'level' | 'equippedTo'>[] = [
  // --- KATEGORI: PONSEL ---
  {
    name: 'Nokia 3310',
    brand: 'Nokia',
    type: 'ponsel',
    category: 'Ponsel',
    imageUrl: '',
    basePrice: 1500000,
    description: 'Ponsel legendaris. Mengurangi tingkat kelelahan mental per detik saat siaran.',
    buff: {
      effectId: 'mentalDrainReduction',
      name: 'Beban Mental',
      baseValue: 0.2,
      upgradeValue: 0.003,
    },
  },
  {
    name: 'Xiaomi C-Series',
    brand: 'Xiaomi',
    type: 'ponsel',
    category: 'Ponsel',
    imageUrl: '',
    basePrice: 2500000,
    description: 'Ponsel serbaguna. Memberikan bonus kecil pada total pendapatan dan perolehan popularitas.',
    buff: {
      effectId: 'allRounderBonus',
      name: 'Serbaguna',
      baseValue: 0.05,
      upgradeValue: 0.0015,
    },
  },
  {
    name: 'Infinix Note',
    brand: 'Infinix',
    type: 'ponsel',
    category: 'Ponsel',
    imageUrl: '',
    basePrice: 3000000,
    description: 'Biaya upgrade ponsel ini jauh lebih rendah dan memberi sedikit bonus pada nilai gift.',
    buff: {
      effectId: 'metaUpgradeDiscount',
      name: 'Biaya Upgrade',
      baseValue: 0.15,
      upgradeValue: 0.0015,
    },
  },
  {
    name: 'iPhone Pro Max',
    brand: 'Iphone',
    type: 'ponsel',
    category: 'Ponsel',
    imageUrl: '',
    basePrice: 30000000,
    description: "Simbol status. Meningkatkan kemungkinan munculnya penonton 'Sultan' yang royal.",
    buff: {
      effectId: 'sultanViewerChance',
      name: 'Peluang Sultan',
      baseValue: 0.1,
      upgradeValue: 0.002,
    },
  },
  // --- KATEGORI: PRODUKSI ---
  {
    name: 'Kamera DSR Jadul',
    brand: 'Nikon',
    type: 'kameraDsr',
    category: 'Produksi',
    imageUrl: '',
    basePrice: 4000000,
    description: 'Kamera DSR bekas namun fungsional. Kunci untuk memulai produksi foto berkualitas.',
    buff: {
      effectId: 'productionQuality',
      name: 'Kualitas Produksi',
      baseValue: 40,
      upgradeValue: 0.5,
    },
  },
  {
    name: 'Handycam Keluarga',
    brand: 'Sony',
    type: 'handycam',
    category: 'Produksi',
    imageUrl: '',
    basePrice: 6500000,
    description: 'Handycam standar untuk merekam video. Kualitasnya cukup untuk memulai.',
    buff: {
      effectId: 'videoQualityBonus',
      name: 'Kualitas Video',
      baseValue: 35,
      upgradeValue: 0.6,
    },
  },
   {
    name: 'Laptop Kentang',
    brand: 'Lain-lain',
    type: 'laptop',
    category: 'Produksi',
    imageUrl: '',
    basePrice: 7000000,
    description: 'Laptop lambat dengan keamanan seadanya. Diperlukan untuk mengedit dan mengunggah, namun memiliki risiko skandal yang tinggi.',
    buff: {
      effectId: 'processingPower',
      name: 'Risiko Skandal',
      baseValue: 1.5, // Actually a multiplier for risk
      upgradeValue: -0.01, // Upgrade reduces risk
    },
  },
  {
    name: 'Sony A7 III',
    brand: 'Sony',
    type: 'kameraDsr',
    category: 'Produksi',
    imageUrl: '',
    basePrice: 32000000,
    description: 'Kamera mirrorless profesional. Menghasilkan foto dengan kualitas tajam dan jernih yang memukau.',
    buff: {
      effectId: 'productionQuality',
      name: 'Kualitas Produksi',
      baseValue: 85,
      upgradeValue: 0.5,
    },
  },
  {
    name: 'ROG Zephyrus',
    brand: 'ASUS',
    type: 'laptop',
    category: 'Produksi',
    imageUrl: '',
    basePrice: 45000000,
    description: 'Laptop gaming monster. Mengedit video 4K dengan lancar dan memiliki sistem keamanan canggih yang meminimalisir risiko skandal.',
    buff: {
      effectId: 'processingPower',
      name: 'Risiko Skandal',
      baseValue: 0.5, // Low risk
      upgradeValue: -0.005,
    },
  },
];
