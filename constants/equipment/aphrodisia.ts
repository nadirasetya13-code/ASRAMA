import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 3: APHRODISIA ---
// Focus: Guest Satisfaction
export const APHRODISIA_SET: EquipmentSet = {
    setName: "Aphrodisia",
    bonuses: [
        {
            threshold: 2,
            description: "+5 Poin Kepuasan dasar untuk semua tamu.",
            effects: { satisfactionBonus: 5 }
        },
        {
            threshold: 4,
            description: "Menggandakan bonus kepuasan dari tamu dengan sifat 'Romantis' & 'Setia'.",
            effects: { /* Diterapkan di logic matchService */ }
        },
        {
            threshold: 8,
            description: "+10 Poin Kepuasan dasar tambahan (Total +15).",
            effects: { satisfactionBonus: 10 }
        }
    ]
};

export const APHRODISIA_ITEMS: EquipmentItem[] = [
    { id: 'ap-makeup-1', name: "Aphrodite's Kiss Rouge Makeup - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Aphrodite%27s%20Kiss%20Rouge.png', description: '', stats: { kecantikan: 5, satisfactionBonus: 2 } },
    { id: 'ap-lingerie-1', name: "Venus Embrace Gown Lingerie - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Venus%20Embrace%20Gown.png', description: '', stats: { kecantikan: 7 } },
    { id: 'ap-sepatu-1', name: "Siren Stride Pumps High Heels - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Siren%20Stride%20Pumps.png', description: '', stats: { mental: 5, satisfactionBonus: 1 } },
    { id: 'ap-bra-1', name: "Heartfire Harness Bra - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Heartfire%20Harness.png', description: '', stats: { kecantikan: 5, satisfactionBonus: 1 } },
    { id: 'ap-celanaDalam-1', name: "Forbidden Whisper Celana Dalam - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Forbidden%20Whisper.png', description: '', stats: { kecantikan: 7 } },
    { id: 'ap-obatBirahi-1', name: "Eros Nectar Obat Birahi - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Eros%20Nectar.png', description: '', stats: { mental: 5, satisfactionBonus: 2 } },
    { id: 'ap-parfum-1', name: "Aphrodisia Essence Parfum - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Aphrodisia%20Essence.png', description: '', stats: { kecantikan: 3, satisfactionBonus: 3 } },
    { id: 'ap-stocking-1', name: "Lovebind Garters Stocking - Aphrodisia", setName: "Aphrodisia", rarity: 'Epic', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Aphrodisia/Lovebind%20Garters.png', description: '', stats: { kecantikan: 8 } },
];
