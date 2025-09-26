import { describe, it, expect } from 'vitest';
import { Talent, Guest, Room } from '../types';
import { calculateGuestSatisfaction, calculateTalentImpact } from './localDataService';

// --- MOCK DATA SETUP ---

// A standard, well-rounded Epic talent for testing.
const mockTalent: Talent = {
  id: 'test-talent-1',
  name: "Test Talent",
  age: 25, // Prime age for bonus
  level: 10,
  experience: 0,
  experienceToNextLevel: 1000,
  yearlyExperience: 0,
  yearlyExperienceToNextAge: 1000,
  kotaAsal: "Jakarta",
  agama: "Islam",
  statusSosial: "Anak Magang",
  cerita: "A test talent.",
  imageUrl: ``,
  rarity: 'Epic',
  stamina: 80,
  currentEnergy: 80,
  popularitas: 70,
  kecantikan: 85,
  mental: 75,
  fisik: { gayaRambut: 70, bentukWajah: 70, bentukMata: 70, bentukBibir: 70, bentukHidung: 70, bentukTangan: 70, beratBadan: 60, bentukKaki: 70, bentukPantat: 80 },
  intim: {
    // FIX: Added missing properties `bentukPuting`, `warnaAreola`, `kelembutanKulit` to `payudara` to satisfy the PayudaraAttributes type.
    payudara: { ukuran: 75, bentuk: 75, kekenyalan: 75, sensitivitasPuting: 80, ukuranAreola: 50, warnaPuting: 50, jarak: 50, bentukPuting: 70, warnaAreola: 60, kelembutanKulit: 80 },
    // FIX: Added missing properties `tipeHymen`, `kondisiDindingVagina`, `kekuatanOtotPC`, `potensiOrgasmeMultiple`, `volumeEjakulasiWanita` to `vagina` to satisfy the VaginaAttributes type.
    vagina: { kedalaman: 70, kekencangan: 84, pelumasan: 80, sensitivitasGSpot: 85, elastisitas: 80, aroma: 80, labia: 60, tipeHymen: 50, kondisiDindingVagina: 70, kekuatanOtotPC: 70, potensiOrgasmeMultiple: 50, volumeEjakulasiWanita: 50 },
    // FIX: Added missing `posisi` property to `klitoris` to satisfy the KlitorisAttributes type.
    klitoris: { ukuran: 50, sensitivitas: 90, aksesibilitas: 80, kecepatanRespon: 80, tipeTudung: 60, pembengkakan: 70, dayaTahan: 70, posisi: 75 },
    // FIX: Added missing `anal` property to `intim` to satisfy the IntimAttributes type.
    anal: { kekencanganAnus: 60, elastisitasAnus: 60, warnaAnus: 50, kebersihan: 85, sensitivitasAnal: 40 },
    // FIX: Added missing `mulut` and `bokong` properties to satisfy the IntimAttributes type.
    mulut: { keterampilanLidah: 70, kedalamanTenggorokan: 50, produksiSaliva: 75 },
    bokong: { bentukPantat: 80, kekencangan: 75, kehalusanKulit: 80, responSpank: 60 },
  },
  // FIX: Add missing `parfum`, `stocking`, and `kondom` properties to satisfy the EquipmentSlots type.
  equipment: { makeup: null, lingerie: null, sepatu: null, bra: null, celanaDalam: null, obatBirahi: null, ponsel: null, kameraDsr: null, handycam: null, laptop: null, parfum: null, stocking: null, kondom: null },
  // FIX: Added missing property 'equipmentInventory' to satisfy the Talent type.
  equipmentInventory: [],
  potensiHIVAIDS: 5,
  kesehatan: 95,
  jatuhCinta: 20,
  potensiHamil: 10,
  skills: [],
  dayaPikat: 1000,
  tariffs: { layanan: 1000000, perawatan: 150000, kesehatan: 25000, kb: 18000 },
  earnings: 0,
  reincarnationCount: 0,
  followers: 0,
  sessionsServed: 0,
  photoInventory: [],
  videoInventory: [],
  // FIX: Added missing 'isOnContraceptives' property to satisfy the Talent type.
  isOnContraceptives: false,
};

// A guest with specific wants that the mock talent can fulfill.
const mockGuestGoodMatch: Guest = {
  id: 'test-guest-1',
  name: "Good Match Guest",
  age: 40,
  kotaAsal: "Jakarta", // Match
  agama: "Islam", // Match
  statusSosial: "CEO Perusahaan Tbk",
  cerita: "A test guest.",
  bio: "Looking for a good time.",
  imageUrl: ``,
  patience: 100,
  tier: 6,
  fisik: { gayaRambut: 70, bentukWajah: 70, bentukMata: 70, bentukBibir: 70, bentukHidung: 70, bentukTangan: 70, beratBadan: 80, bentukKaki: 70, bentukPantat: 80 },
  penis: { panjang: 16, diameter: 4.5, dayaTahan: 70, agresivitas: 50, kekerasanEreksi: 90, sensitivitas: 60, volumeSperma: 60, tipeKepala: 'Bulat', teksturUrat: 'Halus', bau: 20 },
  wants: [
    { category: 'vagina', attribute: 'kekencangan', label: 'Kekencangan Vagina', operator: '>=', value: 80, importance: 1.5 },
    { category: 'main', attribute: 'kecantikan', label: 'Kecantikan', operator: '>=', value: 80, importance: 1.0 },
  ],
  kinks: [],
  personalityTraits: ['Romantis', 'Royal']
};

// A guest with a kink the talent cannot easily fulfill.
const mockGuestKinkMismatch: Guest = {
    ...mockGuestGoodMatch,
    id: 'test-guest-2',
    name: "Kink Mismatch Guest",
    kinks: [{ type: 'Dominasi', description: 'Wants to be dominated.' }],
    personalityTraits: ['Kritis']
};


const mockRoomGood: Room = {
    id: 'room-good',
    name: 'Suite Romantis Bagus',
    type: 'Romantis',
    level: 20,
    condition: 100,
    status: 'available',
    upgrades: {},
    isAcquired: true,
};

const mockRoomBadCondition: Room = {
    ...mockRoomGood,
    id: 'room-bad',
    name: 'Suite Romantis Rusak',
    condition: 20, // Very bad condition
};


describe('Gameplay Calculation Service', () => {

    it('should calculate HIGH satisfaction for a perfect match in a good room', () => {
        // FIX: Added the missing `isSubstitute` argument (false).
        const { score } = calculateGuestSatisfaction(mockTalent, mockGuestGoodMatch, mockRoomGood, false);

        // EXPECTATIONS:
        // - Wants fulfillment should be near 100%. A 25yo talent gets 1.2x age modifier.
        // - Kecantikan: 85 * 1.2 = 102 (meets >= 80 want)
        // - Kekencangan: 84 * 1.2 = 100.8 (meets >= 80 want)
        // - Social bonus: Same city (+4), same religion (+2).
        // - Social dynamics: CEO + Intern (+6).
        // - Personality: Guest is 'Romantis' and room is 'Romantis' (bonus).
        // - Room condition is perfect (no penalty).
        expect(score).toBeGreaterThan(90);
    });

    it('should calculate LOW satisfaction for a kink mismatch', () => {
        // The Dominasi kink requires talent.mental >= 85. Our talent has 75.
        // It will fail, triggering the KINK_UNFULFILLED_MULTIPLIER (0.6).
        // FIX: Added the missing `isSubstitute` argument (false).
        const { score } = calculateGuestSatisfaction(mockTalent, mockGuestKinkMismatch, mockRoomGood, false);

        // Also has 'Kritis' personality penalty.
        expect(score).toBeLessThan(60);
    });

    it('should apply a significant penalty for bad room condition', () => {
        // FIX: Added the missing `isSubstitute` argument (false).
        const goodRoomResult = calculateGuestSatisfaction(mockTalent, mockGuestGoodMatch, mockRoomGood, false);
        // FIX: Added the missing `isSubstitute` argument (false).
        const badRoomResult = calculateGuestSatisfaction(mockTalent, mockGuestGoodMatch, mockRoomBadCondition, false);

        // Penalty = (50 - 20) * 0.5 = 15% reduction.
        expect(badRoomResult.score).toBeLessThan(goodRoomResult.score);
        // Check if the score is roughly 15% lower, allowing for rounding.
        expect(badRoomResult.score).toBeCloseTo(goodRoomResult.score * 0.85, 0); 
    });

    it('should calculate higher talent impact for an aggressive guest', () => {
        const aggressiveGuest: Guest = {
            ...mockGuestGoodMatch,
            penis: { ...mockGuestGoodMatch.penis, agresivitas: 95 },
            personalityTraits: ['Kasar']
        };

        // FIX: Added null for the missing condomUsed argument.
        const normalImpact = calculateTalentImpact(mockTalent, mockGuestGoodMatch, mockRoomGood, null);
        // FIX: Added null for the missing condomUsed argument.
        const highImpact = calculateTalentImpact(mockTalent, aggressiveGuest, mockRoomGood, null);
        
        // Negative changes, so a more negative number is higher impact.
        expect(highImpact.kesehatanChange).toBeLessThan(normalImpact.kesehatanChange);
        expect(highImpact.mentalChange).toBeLessThan(normalImpact.mentalChange);
    });

    it('should calculate correct talent impact considering room damage reduction', () => {
        const healingRoom: Room = {
            id: 'room-healing',
            name: 'Klinik Penyembuhan',
            type: 'Penyembuhan',
            level: 10, // Gives healthDamageReduction: 10 * 0.003 = 3%
            condition: 100,
            status: 'available',
            upgrades: {},
            isAcquired: true,
        };

        // FIX: Added null for the missing condomUsed argument.
        const standardRoomImpact = calculateTalentImpact(mockTalent, mockGuestGoodMatch, mockRoomGood, null);
        // FIX: Added null for the missing condomUsed argument.
        const healingRoomImpact = calculateTalentImpact(mockTalent, mockGuestGoodMatch, healingRoom, null);
        
        // healthChange is negative, so a smaller negative number means less damage.
        expect(healingRoomImpact.kesehatanChange).toBeGreaterThan(standardRoomImpact.kesehatanChange);
    });
});