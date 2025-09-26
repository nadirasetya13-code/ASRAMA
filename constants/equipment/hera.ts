import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 6: HERA (The Sovereign) ---
// Focus: Outcall Missions
export const HERA_SET: EquipmentSet = {
    setName: "Hera",
    bonuses: [
        {
            threshold: 2,
            description: "+25% Pendapatan Kotor dari semua jenis Tawaran Luar.",
            // Note: Logic must apply this only to outcalls.
            effects: { sessionEarningsMultiplier: 0.25 }
        },
        {
            threshold: 4,
            description: "Mengurangi kerusakan Kesehatan & Mental yang diterima dari Tawaran Luar sebesar 30%.",
            effects: { healthDamageReduction: 0.15, mentalDamageReduction: 0.15 }
        },
        {
            threshold: 8,
            description: "Setelah menyelesaikan Tawaran Luar, ada 50% peluang untuk mengurangi durasi ketidaktersediaan sebanyak 1 hari.",
            // Note: Custom logic to be implemented in outcallService.ts
            effects: { }
        }
    ]
};

export const HERA_ITEMS: EquipmentItem[] = [
    { id: 'hera-makeup-1', name: "Incognito Veil Makeup - Hera", setName: "Hera", rarity: 'Legendary', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Incognito%20Veil.png', description: '', stats: { mental: 5, sessionEarningsMultiplier: 0.02 } },
    { id: 'hera-lingerie-1', name: "Silk Cipher Lingerie - Hera", setName: "Hera", rarity: 'Legendary', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Silk%20Cipher.png', description: '', stats: { kecantikan: 5, healthDamageReduction: 0.03 } },
    { id: 'hera-sepatu-1', name: "Confidential Step High Heels - Hera", setName: "Hera", rarity: 'Legendary', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Confidential%20Step.png', description: '', stats: { popularitas: 5, sessionEarningsMultiplier: 0.01 } },
    { id: 'hera-bra-1', name: "Secret Pact Harness Bra - Hera", setName: "Hera", rarity: 'Legendary', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Secret%20Pact%20Harness.png', description: '', stats: { mental: 3, mentalDamageReduction: 0.03 } },
    { id: 'hera-celanaDalam-1', name: "Whispered Contract Celana Dalam - Hera", setName: "Hera", rarity: 'Legendary', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Whispered%20Contract.png', description: '', stats: { mental: 5, sessionEarningsMultiplier: 0.01 } },
    { id: 'hera-obatBirahi-1', name: "Bold Venture Brew Obat Birahi - Hera", setName: "Hera", rarity: 'Legendary', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Bold%20Venture%20Brew.png', description: '', stats: { mental: 7 } },
    { id: 'hera-parfum-1', name: "Anonymous Scent Parfum - Hera", setName: "Hera", rarity: 'Legendary', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/Anonymous%20Scent.png', description: '', stats: { popularitas: 5, mentalDamageReduction: 0.02 } },
    { id: 'hera-stocking-1', name: "First Class Garters Stocking - Hera", setName: "Hera", rarity: 'Legendary', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Hera/First%20Class%20Garters.png', description: '', stats: { kecantikan: 5, healthDamageReduction: 0.02 } },
];
