import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 4: ARTEMISIA (Set of the Huntress) ---
// Focus: Talent Durability / Defense
export const ARTEMISIA_SET: EquipmentSet = {
    setName: "Artemisia",
    bonuses: [
        {
            threshold: 2,
            description: "-15% Kerusakan Kesehatan yang diterima dari sesi.",
            effects: { healthDamageReduction: 0.15 }
        },
        {
            threshold: 4,
            description: "-15% Kerusakan Mental yang diterima dari sesi.",
            effects: { mentalDamageReduction: 0.15 }
        },
        {
            threshold: 8,
            description: "Saat Kesehatan di bawah 50%, semua bonus pengurangan kerusakan dari set ini digandakan.",
            effects: { /* Diterapkan di logic matchService */ }
        }
    ]
};

export const ARTEMISIA_ITEMS: EquipmentItem[] = [
    { id: 'ar-makeup-1', name: "Artemis Shield Tint Makeup - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Artemis%20Shield%20Tint.png', description: '', stats: { mental: 5, healthDamageReduction: 0.02 } },
    { id: 'ar-lingerie-1', name: "Vitality Cloak Lingerie - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Vitality%20Cloak.png', description: '', stats: { stamina: 5, healthDamageReduction: 0.03 } },
    { id: 'ar-sepatu-1', name: "Agile Resilience High Heels - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Agile%20Resilience.png', description: '', stats: { stamina: 7 } },
    { id: 'ar-bra-1', name: "Heartguard Bra - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Heartguard.png', description: '', stats: { stamina: 5, mentalDamageReduction: 0.03 } },
    { id: 'ar-celanaDalam-1', name: "Inner Sanctuary Celana Dalam - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Inner%20Sanctuary.png', description: '', stats: { healthDamageReduction: 0.04 } },
    { id: 'ar-obatBirahi-1', name: "Regeneration Draught Obat Birahi - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Regeneration%20Draught.png', description: '', stats: { mental: 7 } },
    { id: 'ar-parfum-1', name: "Ward Essence Parfum - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Ward%20Essence.png', description: '', stats: { mental: 5, mentalDamageReduction: 0.02 } },
    { id: 'ar-stocking-1', name: "Legshield Bindings Stocking - Artemisia", setName: "Artemisia", rarity: 'Epic', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Artemisia/Legshield%20Bindings.png', description: '', stats: { stamina: 3, healthDamageReduction: 0.02 } },
];
