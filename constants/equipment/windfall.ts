import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 5: WINDFALL (The Director's Covenant) ---
// Focus: Agency Profit
export const WINDFALL_SET: EquipmentSet = {
    setName: "Windfall",
    bonuses: [
        {
            threshold: 2,
            description: "+10% Laba Bersih Agensi dari setiap sesi.",
            effects: { sessionEarningsMultiplier: 0.10 }
        },
        {
            threshold: 4,
            description: "+15% Laba Bersih Agensi tambahan (Total +25%).",
            effects: { sessionEarningsMultiplier: 0.15 }
        },
        {
            threshold: 8,
            description: "Bonus finansial dari tamu dengan sifat 'Royal' meningkat sebesar 50%.",
            effects: { /* Diterapkan di logic matchService */ }
        }
    ]
};

export const WINDFALL_ITEMS: EquipmentItem[] = [
    { id: 'pd-makeup-1', name: "Golden Harvest Makeup - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Golden%20Harvest.png', description: '', stats: { sessionEarningsMultiplier: 0.02, mental: 3 } },
    { id: 'pd-lingerie-1', name: "Prosperity Veil Lingerie - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Prosperity%20Veil.png', description: '', stats: { sessionEarningsMultiplier: 0.01, kecantikan: 5 } },
    { id: 'pd-sepatu-1', name: "Fortune Tread High Heels - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Fortune%20Tread.png', description: '', stats: { sessionEarningsMultiplier: 0.02, popularitas: 3 } },
    { id: 'pd-bra-1', name: "Treasure Chest Harness Bra - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Treasure%20Chest%20Harness.png', description: '', stats: { sessionEarningsMultiplier: 0.03, kecantikan: 2 } },
    { id: 'pd-celanaDalam-1', name: "Wealth Whisper Celana Dalam - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Wealth%20Whisper.png', description: '', stats: { sessionEarningsMultiplier: 0.01, mental: 5 } },
    { id: 'pd-obatBirahi-1', name: "Fortune Elixir Obat Birahi - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Fortune%20Elixir.png', description: '', stats: { sessionEarningsMultiplier: 0.02, mental: 3 } },
    { id: 'pd-parfum-1', name: "Windfall Aura Parfum - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Windfall%20Aura.png', description: '', stats: { sessionEarningsMultiplier: 0.01, popularitas: 5 } },
    { id: 'pd-stocking-1', name: "Golden Thread Stocking - Windfall", setName: "Windfall", rarity: 'Legendary', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Windfall/Golden%20Thread.png', description: '', stats: { sessionEarningsMultiplier: 0.03, kecantikan: 2 } },
];
