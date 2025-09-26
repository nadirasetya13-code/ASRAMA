import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 1: KYMA (Wave/Stream) ---
// Focus: Livestreaming
export const KYMA_SET: EquipmentSet = {
    setName: "Kyma",
    bonuses: [
        {
            threshold: 2,
            description: "+20% Pendapatan dari Livestream.",
            effects: { livestreamEarningsMultiplier: 0.20 }
        },
        {
            threshold: 4,
            description: "+15% Pendapatan dari Livestream tambahan (Total +35%).",
            effects: { livestreamEarningsMultiplier: 0.15 }
        },
        {
            threshold: 8,
            description: "Meningkatkan nilai semua gift dari penonton sebesar 15%.", // Diterjemahkan sebagai pendapatan
            effects: { livestreamEarningsMultiplier: 0.15 }
        }
    ]
};

export const KYMA_ITEMS: EquipmentItem[] = [
    { id: 'gp-makeup-1', name: "Stream Tint Makeup - Kyma", setName: "Kyma", rarity: 'Rare', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Stream%20Tint%20Makeup.png', description: '', stats: { kecantikan: 5, livestreamEarningsMultiplier: 0.02 } },
    { id: 'gp-lingerie-1', name: "Cam Lingerie - Kyma", setName: "Kyma", rarity: 'Rare', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Cam%20Lingerie.png', description: '', stats: { kecantikan: 5, mental: 5 } },
    { id: 'gp-sepatu-1', name: "Platform Heels Heels - Kyma", setName: "Kyma", rarity: 'Rare', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Platform%20Heels%20Heels.png', description: '', stats: { popularitas: 3, livestreamEarningsMultiplier: 0.01 } },
    { id: 'gp-bra-1', name: "Hype Harness - Kyma", setName: "Kyma", rarity: 'Rare', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Hype%20Harness.png', description: '', stats: { kecantikan: 3, livestreamEarningsMultiplier: 0.03 } },
    { id: 'gp-celanaDalam-1', name: "Whisper Celana Dalam - Kyma", setName: "Kyma", rarity: 'Rare', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Whisper%20Celana%20Dalam.png', description: '', stats: { mental: 5, popularitas: 3 } },
    { id: 'gp-obatBirahi-1', name: "Viral Spark Obat Birahi - Kyma", setName: "Kyma", rarity: 'Rare', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Viral%20Spark%20Obat%20Birahi.png', description: '', stats: { stamina: 5, livestreamEarningsMultiplier: 0.02 } },
    { id: 'gp-parfum-1', name: "Broadcast Essence Parfum - Kyma", setName: "Kyma", rarity: 'Rare', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Broadcast%20Essence%20Parfum.png', description: '', stats: { popularitas: 7 } },
    { id: 'gp-stocking-1', name: "Luminous Stream Stocking - Kyma", setName: "Kyma", rarity: 'Rare', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Kyma/Luminous%20Stream%20Stocking.png', description: '', stats: { kecantikan: 7 } },
];
