import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 7: DEMETER (The Matron of Growth) ---
// Focus: Talent XP & Progression
export const DEMETER_SET: EquipmentSet = {
    setName: "Demeter",
    bonuses: [
        {
            threshold: 2,
            description: "Meningkatkan perolehan XP dari semua aktivitas sebesar 15%.",
            effects: { xpGainMultiplier: 0.15 }
        },
        {
            threshold: 4,
            description: "Setiap kali talenta naik level, ada 20% peluang untuk mendapatkan bonus XP sebesar 25% dari total XP yang dibutuhkan untuk level berikutnya.",
            // Note: Custom logic to be implemented in gameController
            effects: { }
        },
        {
            threshold: 8,
            description: "Jika talenta 'pensiun' saat mengenakan set lengkap ini, bonus statistik permanen dari Reinkarnasi berikutnya akan digandakan.",
            // Note: Custom logic to be implemented in talentActions
            effects: { }
        }
    ]
};

export const DEMETER_ITEMS: EquipmentItem[] = [
    { id: 'demeter-makeup-1', name: "Sage's Insight Tint Makeup - Demeter", setName: "Demeter", rarity: 'Special', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Sage%27s%20Insight%20Tint.png', description: '', stats: { mental: 5, xpGainMultiplier: 0.02 } },
    { id: 'demeter-lingerie-1', name: "Mentor's Embrace Lingerie - Demeter", setName: "Demeter", rarity: 'Special', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Mentor%27s%20Embrace.png', description: '', stats: { mental: 7 } },
    { id: 'demeter-sepatu-1', name: "Prodigy's Path High Heels - Demeter", setName: "Demeter", rarity: 'Special', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Prodigy%27s%20Path%20High.png', description: '', stats: { popularitas: 5, xpGainMultiplier: 0.01 } },
    { id: 'demeter-bra-1', name: "Epiphany Harness Bra - Demeter", setName: "Demeter", rarity: 'Special', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Epiphany%20Harness.png', description: '', stats: { mental: 3, xpGainMultiplier: 0.01 } },
    { id: 'demeter-celanaDalam-1', name: "Scrollbound Celana Dalam - Demeter", setName: "Demeter", rarity: 'Special', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Scrollbound.png', description: '', stats: { mental: 5 } },
    { id: 'demeter-obatBirahi-1', name: "Elixir of Potential Obat Birahi - Demeter", setName: "Demeter", rarity: 'Special', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Elixir%20of%20Potential.png', description: '', stats: { xpGainMultiplier: 0.03 } },
    { id: 'demeter-parfum-1', name: "Legacy Essence Parfum - Demeter", setName: "Demeter", rarity: 'Special', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Legacy%20Essence.png', description: '', stats: { mental: 5 } },
    { id: 'demeter-stocking-1', name: "Ascendant Path Stocking - Demeter", setName: "Demeter", rarity: 'Special', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Demeter/Ascendant%20Path.png', description: '', stats: { popularitas: 5, xpGainMultiplier: 0.01 } },
];
