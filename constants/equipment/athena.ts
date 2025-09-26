import { EquipmentSet, EquipmentItem } from '../../types';

// --- SET 8: ATHENA (The Divine Architect) ---
// Focus: Aesthetics Clinic & Attribute Modification
export const ATHENA_SET: EquipmentSet = {
    setName: "Athena",
    bonuses: [
        {
            threshold: 2,
            description: "Mengurangi biaya semua operasi plastik di Klinik sebesar 10%.",
            // Note: Custom logic to be implemented in clinicService
            effects: { }
        },
        {
            threshold: 4,
            description: "Mengurangi durasi pemulihan setelah operasi sebesar 25%.",
            // Note: Custom logic to be implemented in clinicService
            effects: { }
        },
        {
            threshold: 8,
            description: "Setiap kali melakukan operasi, ada 15% peluang untuk 'Sukses Kritis', memberikan +1 hingga +3 poin atribut tambahan secara acak tanpa biaya tambahan.",
            // Note: Custom logic to be implemented in clinicService
            effects: { }
        }
    ]
};

export const ATHENA_ITEMS: EquipmentItem[] = [
    { id: 'athena-makeup-1', name: "Divine Canvas Foundation Makeup - Athena", setName: "Athena", rarity: 'Mystic', type: 'makeup', slot: 'makeup', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Divine%20Canvas%20Foundation.png', description: '', stats: { kecantikan: 5, mental: 3 } },
    { id: 'athena-lingerie-1', name: "Golden Ratio Gown Lingerie - Athena", setName: "Athena", rarity: 'Mystic', type: 'lingerie', slot: 'lingerie', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Golden%20Ratio%20Gown.png', description: '', stats: { kecantikan: 8 } },
    { id: 'athena-sepatu-1', name: "Blueprint Stilettos High Heels - Athena", setName: "Athena", rarity: 'Mystic', type: 'sepatu', slot: 'sepatu', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Blueprint%20Stilettos.png', description: '', stats: { popularitas: 5, mental: 2 } },
    { id: 'athena-bra-1', name: "Symmetry Harness Bra - Athena", setName: "Athena", rarity: 'Mystic', type: 'bra', slot: 'bra', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Symmetry%20Harness.png', description: '', stats: { kecantikan: 5 } },
    { id: 'athena-celanaDalam-1', name: "Flawless Form Celana Dalam - Athena", setName: "Athena", rarity: 'Mystic', type: 'celanaDalam', slot: 'celanaDalam', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Flawless%20Form.png', description: '', stats: { kecantikan: 5 } },
    { id: 'athena-obatBirahi-1', name: "Metamorphosis Serum Obat Birahi - Athena", setName: "Athena", rarity: 'Mystic', type: 'obatBirahi', slot: 'obatBirahi', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Metamorphosis%20Serum.png', description: '', stats: { mental: 8 } },
    { id: 'athena-parfum-1', name: "Aesthetica Elixir Parfum - Athena", setName: "Athena", rarity: 'Mystic', type: 'parfum', slot: 'parfum', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Aesthetica%20Elixir.png', description: '', stats: { popularitas: 8 } },
    { id: 'athena-stocking-1', name: "Precision Silk Stocking - Athena", setName: "Athena", rarity: 'Mystic', type: 'stocking', slot: 'stocking', imageUrl: 'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Card/Athena/Precision%20Silk.png', description: '', stats: { kecantikan: 3, mental: 3 } },
];
