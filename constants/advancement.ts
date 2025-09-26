// FIX: Changed imports to point to specific equipment files as the barrel file doesn't export them individually.
import { ARTEMISIA_ITEMS } from './equipment/artemisia';
import { APHRODISIA_ITEMS } from './equipment/aphrodisia';
import { KYMA_ITEMS } from './equipment/kyma';
import { WINDFALL_ITEMS } from './equipment/windfall';
import { DEMETER_ITEMS } from './equipment/demeter';
import { HERA_ITEMS } from './equipment/hera';
import { ATHENA_ITEMS } from './equipment/athena';

// Definisikan tipe untuk hadiah agar konsisten
export interface AdvancementReward {
  level: number;
  description: string;
  rewards: {
    type: 'money' | 'savings' | 'item' | 'equipment' | 'gachaTicket';
    amount?: number;
    itemName?: string;
    itemObject?: object; // Untuk item kompleks seperti equipment tunggal
  }[];
}

export type AdvancementTier = 'mudah' | 'sedang' | 'sulit' | 'sangatSulit';

export const ADVANCEMENT_REWARDS: Record<AdvancementTier, AdvancementReward[]> =
  {
    mudah: [
      {
        level: 2,
        description: 'Langkah Awal',
        rewards: [{ type: 'money', amount: 5_000_000, itemName: 'Uang Kas' }],
      },
      {
        level: 3,
        description: 'Manajemen Risiko Dini',
        rewards: [
          {
            type: 'item',
            itemName: 'Kondom Lokal',
            amount: 5,
          },
        ],
      },
      {
        level: 4,
        description: 'Mulai Menabung',
        rewards: [
          { type: 'savings', amount: 2_500_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 5,
        description: 'Sentuhan Keberuntungan',
        rewards: [
          {
            type: 'gachaTicket',
            amount: 1,
            itemName: 'Tiket Panggilan Talenta',
          },
        ],
      },
      {
        level: 7,
        description: 'Modal Tambahan',
        rewards: [
          { type: 'money', amount: 7_500_000, itemName: 'Uang Kas' },
          {
            type: 'item',
            itemName: 'Kondom Lokal',
            amount: 10,
          },
        ],
      },
      {
        level: 10,
        description: 'Tonggak Pertama',
        rewards: [
          {
            type: 'gachaTicket',
            amount: 2,
            itemName: 'Tiket Panggilan Talenta',
          },
          { type: 'savings', amount: 5_000_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 15,
        description: 'Investasi Jangka Panjang',
        rewards: [
          {
            type: 'item',
            itemName: 'Kondom Sutra Premium',
            amount: 3,
          },
        ],
      },
      {
        level: 20,
        description: 'Siaran Perdana',
        rewards: [{ type: 'item', itemName: 'Nokia 3310' }],
      },
    ],
    sedang: [
      {
        level: 25,
        description: 'Ekspansi Awal',
        rewards: [
          { type: 'money', amount: 15_000_000, itemName: 'Uang Kas' },
          { type: 'savings', amount: 10_000_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 30,
        description: 'Panggilan Besar',
        rewards: [
          {
            type: 'gachaTicket',
            amount: 5,
            itemName: 'Tiket Panggilan Talenta',
          },
        ],
      },
      {
        level: 35,
        description: 'Mulai Berkarya',
        rewards: [
          { type: 'item', itemName: 'Kamera DSR Jadul' },
          {
            type: 'item',
            itemName: 'Kondom Sutra Premium',
            amount: 5,
          },
        ],
      },
      {
        level: 40,
        description: 'Studio Mini',
        rewards: [
          { type: 'item', itemName: 'Laptop Kentang' },
          { type: 'money', amount: 25_000_000, itemName: 'Uang Kas' },
        ],
      },
      {
        level: 45,
        description: 'Perlengkapan Pemanasan',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Aphrodite\'s Kiss Rouge Makeup',
            itemObject: APHRODISIA_ITEMS.find((i) => i.slot === 'makeup'),
          },
        ],
      },
      {
        level: 50,
        description: 'Setengah Jalan Menuju Puncak',
        rewards: [
          {
            type: 'gachaTicket',
            amount: 10,
            itemName: 'Tiket Panggilan Talenta',
          },
        ],
      },
    ],
    sulit: [
      {
        level: 55,
        description: 'Suntikan Dana Besar',
        rewards: [
          { type: 'savings', amount: 100_000_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 60,
        description: 'Perlengkapan Bertahan',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Vitality Cloak Lingerie',
            itemObject: ARTEMISIA_ITEMS.find((i) => i.slot === 'lingerie'),
          },
        ],
      },
      {
        level: 65,
        description: 'Bonus Manajer',
        rewards: [{ type: 'money', amount: 200_000_000, itemName: 'Uang Kas' }],
      },
      {
        level: 70,
        description: 'Perlengkapan Siaran',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Broadcast Essence Parfum',
            itemObject: KYMA_ITEMS.find((i) => i.slot === 'parfum'),
          },
          { type: 'item', itemName: 'Xiaomi C-Series' },
        ],
      },
      {
        level: 75,
        description: 'Dana Pensiun Dini',
        rewards: [
          { type: 'savings', amount: 500_000_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 80,
        description: 'Keberuntungan Sang Manajer',
        rewards: [
          {
            type: 'gachaTicket',
            amount: 10,
            itemName: 'Tiket Panggilan Talenta',
          },
        ],
      },
    ],
    sangatSulit: [
      {
        level: 85,
        description: 'Perlengkapan Finansial',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Golden Thread Stocking',
            itemObject: WINDFALL_ITEMS.find((i) => i.slot === 'stocking'),
          },
        ],
      },
      {
        level: 90,
        description: 'Kekayaan Melimpah',
        rewards: [
          { type: 'money', amount: 1_000_000_000, itemName: 'Uang Kas' },
        ],
      },
      {
        level: 95,
        description: 'Brankas Penuh',
        rewards: [
          { type: 'savings', amount: 2_000_000_000, itemName: 'Tabungan' },
        ],
      },
      {
        level: 100,
        description: 'Puncak Legenda',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Elixir of Potential Obat Birahi',
            itemObject: DEMETER_ITEMS.find((i) => i.slot === 'obatBirahi'),
          },
          { type: 'money', amount: 5_000_000_000, itemName: 'Uang Kas' },
        ],
      },
      {
        level: 110,
        description: 'Hadiah Perjalanan Luar',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Incognito Veil Makeup',
            itemObject: HERA_ITEMS.find((i) => i.slot === 'makeup'),
          },
        ],
      },
      {
        level: 125,
        description: 'Hadiah Sang Arsitek',
        rewards: [
          {
            type: 'equipment',
            itemName: 'Symmetry Harness Bra',
            itemObject: ATHENA_ITEMS.find((i) => i.slot === 'bra'),
          },
        ],
      },
      {
        level: 150,
        description: 'Manajer Abadi',
        rewards: [
          { type: 'savings', amount: 10_000_000_000, itemName: 'Tabungan' },
          {
            type: 'gachaTicket',
            amount: 10,
            itemName: 'Tiket Panggilan Talenta',
          },
        ],
      },
    ],
  };
