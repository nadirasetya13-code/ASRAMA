import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 2: FENOMENAL (The Star's Masterpiece) ---
// Focus: Content Production
export const FENOMENAL_SET: EquipmentSet = {
    setName: "Fenomenal",
    bonuses: [
        {
            threshold: 2,
            description: "+15 Poin Kualitas Konten dasar dari Produksi.",
            effects: { contentProductionQuality: 15 }
        },
        {
            threshold: 4,
            description: "Mengurangi kemungkinan Skandal saat Produksi Konten sebesar 20%.",
            effects: { scandalChanceReduction: 0.20 }
        },
        {
            threshold: 8,
            description: "+15 Poin Kualitas Konten & -15% Peluang Skandal tambahan.",
            effects: { contentProductionQuality: 15, scandalChanceReduction: 0.15 }
        }
    ]
};

export const FENOMENAL_ITEMS: EquipmentItem[] = [
    { id: 'msb-makeup-1', name: "Frame Eternal Lip Makeup - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Frame%20Eternal%20Lip%20Makeup.png', description: '', stats: { kecantikan: 5, contentProductionQuality: 2 } },
    { id: 'msb-lingerie-1', name: "Mystic Frame Gown Lingerie - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Mystic%20Frame%20Gown%20Lingerie.png', description: '', stats: { mental: 5, scandalChanceReduction: 0.03 } },
    { id: 'msb-sepatu-1', name: "Snapshot Stilettos High Heels - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Snapshot%20Stilettos%20High%20Heels.png', description: '', stats: { mental: 3, contentProductionQuality: 1 } },
    { id: 'msb-bra-1', name: "Lace Frame Bra - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Lace%20Frame%20Bra.png', description: '', stats: { kecantikan: 3, contentProductionQuality: 3 } },
    { id: 'msb-celanaDalam-1', name: "privacy veil Celana Dalam - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/privacy%20veil%20Celana%20Dalam.png', description: '', stats: { mental: 3, scandalChanceReduction: 0.05 } },
    { id: 'msb-obatBirahi-1', name: "Fame Infusion Obat Birahi - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Fame%20Infusion%20Obat%20Birahi.png', description: '', stats: { mental: 7 } },
    { id: 'msb-parfum-1', name: "Capture Aura Parfum - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Capture%20Aura%20Parfum.png', description: '', stats: { kecantikan: 7 } },
    { id: 'msb-stocking-1', name: "Pixel Silk Stocking - Fenomenal", setName: "Fenomenal", rarity: 'Rare', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Fenomenal/Pixel%20Silk%20Stocking.png', description: '', stats: { mental: 5, scandalChanceReduction: 0.02 } },
];
