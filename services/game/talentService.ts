import { Talent, FisikAttributes, IntimAttributes, Rarity, Tariff, SkillCard, BaseTalent, EquipmentItem, SetBonus } from "../../types";
import { YEARLY_XP_TO_NEXT_AGE, REINCARNATION_STAT_BONUS, EQUIPMENT_SETS } from "../../constants";
import { average } from "./utils";
import { baseTalents } from "./talents";

const getAgeModifier = (age: number): number => {
    // Usia 17 adalah baseline dengan multiplier 1.0
    if (age === 17) {
        return 1.0;
    }
    // Fase Puncak (22-28 tahun), bonus 20%
    if (age >= 22 && age <= 28) {
        return 1.2;
    }
    // Fase Pertumbuhan (18-21 tahun), naik linear dari 1.0 ke 1.2
    if (age > 17 && age < 22) {
        // Kenaikan 0.2 poin selama 4 tahun (18, 19, 20, 21), jadi 0.05 per tahun.
        return 1.0 + (age - 17) * 0.05;
    }
    // Fase Penurunan (29+ tahun), turun dari 1.2
    return Math.max(0.6, 1.2 - (age - 28) * 0.02);
};


export const applyAgeAttributeModifiers = (talent: Talent): Talent => {
    const modifier = getAgeModifier(talent.age);
    
    const modifiedFisik: FisikAttributes = { ...talent.fisik };
    for (const key in modifiedFisik) {
        modifiedFisik[key] = Math.round(modifiedFisik[key] * modifier);
    }

    const modifiedPayudara: IntimAttributes['payudara'] = { ...talent.intim.payudara };
    for (const key in modifiedPayudara) {
        modifiedPayudara[key] = Math.round(modifiedPayudara[key] * modifier);
    }
    
    const modifiedVagina: IntimAttributes['vagina'] = { ...talent.intim.vagina };
    for (const key in modifiedVagina) {
        modifiedVagina[key] = Math.round(modifiedVagina[key] * modifier);
    }

    const modifiedKlitoris: IntimAttributes['klitoris'] = { ...talent.intim.klitoris };
    for (const key in modifiedKlitoris) {
        modifiedKlitoris[key] = Math.round(modifiedKlitoris[key] * modifier);
    }

    const modifiedAnal: IntimAttributes['anal'] = { ...talent.intim.anal };
    for (const key in modifiedAnal) {
        modifiedAnal[key] = Math.round(modifiedAnal[key] * modifier);
    }
    
    const modifiedMulut: IntimAttributes['mulut'] = { ...talent.intim.mulut };
    for (const key in modifiedMulut) {
        modifiedMulut[key] = Math.round(modifiedMulut[key] * modifier);
    }

    const modifiedBokong: IntimAttributes['bokong'] = { ...talent.intim.bokong };
    for (const key in modifiedBokong) {
        modifiedBokong[key] = Math.round(modifiedBokong[key] * modifier);
    }


    return {
        ...talent,
        kecantikan: Math.round(talent.kecantikan * modifier),
        stamina: Math.round(talent.stamina * modifier), // This should modify the base/max stamina
        fisik: modifiedFisik,
        intim: {
            payudara: modifiedPayudara,
            vagina: modifiedVagina,
            klitoris: modifiedKlitoris,
            anal: modifiedAnal,
            mulut: modifiedMulut,
            bokong: modifiedBokong,
        }
    };
};


export const calculateAverageFisik = (fisik: FisikAttributes): number => {
    const values = Object.values(fisik);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / values.length);
};

const RARITY_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.1,
  Epic: 1.2,
  Legendary: 1.3,
  Event: 1.45,
  Khusus: 1.6,
  Special: 1.8,
  Mystic: 2.0,
};

const TARIFF_RARITY_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.15,
  Epic: 1.35,
  Legendary: 1.6,
  Event: 1.9,
  Khusus: 2.2,
  Special: 2.6,
  Mystic: 3.0,
};


export const calculateDayaPikat = (talent: Omit<Talent, 'dayaPikat' | 'tariffs'>): number => {
    // Apply age modifiers first to get current stats
    const currentStats = applyAgeAttributeModifiers(talent as Talent);

    // 1. Calculate base scores from attribute categories using current (modified) stats
    const baseStatsScore = (currentStats.kecantikan * 1.5) + (currentStats.popularitas * 1.2) + currentStats.stamina + currentStats.mental;
    
    const fisikScore = average(currentStats.fisik) * 1.1;

    const intimPayudaraScore = average(currentStats.intim.payudara);
    const intimVaginaScore = average(currentStats.intim.vagina);
    const intimKlitorisScore = average(currentStats.intim.klitoris);
    const intimAnalScore = average(currentStats.intim.anal);
    const intimMulutScore = average(currentStats.intim.mulut);
    const intimBokongScore = average(currentStats.intim.bokong);
    const intimScore = ((intimPayudaraScore + intimVaginaScore + intimKlitorisScore + intimAnalScore + intimMulutScore + intimBokongScore) / 6) * 1.8;

    const totalBase = baseStatsScore + fisikScore + intimScore;

    // 2. Calculate modifiers from conditions (using original, non-modified stats)
    const healthModifier = 1 + ((talent.kesehatan - 50) / 100); // 100 health = 1.5x, 50 health = 1.0x
    const riskModifier = 1 - (talent.potensiHIVAIDS / 150); // 50 HIV = 0.66x
    const loveModifier = 1 + (talent.jatuhCinta / 500); // Slight bonus for passion (Max 20%)
    const pregnancyModifier = 1 - (talent.potensiHamil / 250); // Slight penalty for business risk

    // 3. Add bonus from skills, equipment, and new persistent stats
    const skillBonus = talent.skills.length * 5;
    const equipmentBonus = Object.values(talent.equipment).filter(item => item !== null).length * 10; // 10 points per equipped item
    
    // Logarithmic scaling for followers (diminishing returns)
    const followersBonus = Math.log10((talent.followers || 0) + 1) * 20;
    // Square root scaling for experience (diminishing returns)
    const sessionsServedBonus = Math.sqrt(talent.sessionsServed || 0) * 5;

    const subTotal = totalBase * healthModifier * riskModifier * loveModifier * pregnancyModifier + skillBonus + equipmentBonus + followersBonus + sessionsServedBonus;

    // 4. Apply rarity multiplier
    const finalDayaPikat = Math.round(subTotal * RARITY_MULTIPLIER[talent.rarity]);

    return finalDayaPikat;
};

export const calculateTariffs = (dayaPikat: number, kesehatan: number, potensiHamil: number, rarity: Rarity): Tariff => {
    const MIN_DP = 250;
    const MAX_DP = 5000;
    const MIN_TARIFF = 150000;
    const MAX_TARIFF_BASE = 60000000; 
    const EXPONENT = 3.0;

    const normalizedDp = Math.max(0, Math.min(1, (dayaPikat - MIN_DP) / (MAX_DP - MIN_DP)));
    const curvedValue = Math.pow(normalizedDp, EXPONENT);
    let tarifLayanan = MIN_TARIFF + curvedValue * (MAX_TARIFF_BASE - MIN_TARIFF);

    tarifLayanan *= TARIFF_RARITY_MULTIPLIER[rarity];
    tarifLayanan = Math.min(tarifLayanan, 175000000);

    const tarifPerawatan = Math.floor(tarifLayanan * 0.15);
    // HIV risk is no longer part of this calculation. It's now a general health cost with a penalty for low health.
    const tarifKesehatan = Math.floor((tarifLayanan * 0.02) + (kesehatan < 50 ? 50000 : 0));
    const tarifKB = Math.floor((tarifLayanan * 0.01) + (potensiHamil * 800));

    return {
        layanan: Math.floor(tarifLayanan),
        perawatan: tarifPerawatan,
        kesehatan: tarifKesehatan,
        kb: tarifKB,
    };
};

// --- Leveling System Helpers ---
export const calculateExpToNextLevel = (level: number): number => {
    // New exponential formula: XP_Required = Base_XP * (Multiplier ^ (Level - 1))
    const baseXP = 1000;
    const multiplier = 1.15; // Adjusted for a smoother curve than 1.5
    if (level >= 100) return Infinity;
    return Math.floor(baseXP * Math.pow(multiplier, level - 1));
};

export const initializeNewTalent = (baseTalent: BaseTalent): Talent => {
    const initialLevel = 1;
    const bonus = (baseTalent.reincarnationCount || 0) * REINCARNATION_STAT_BONUS;

    const partialTalent: Omit<Talent, 'dayaPikat' | 'tariffs'> = {
        ...baseTalent,
        stamina: baseTalent.stamina + bonus,
        kecantikan: baseTalent.kecantikan + bonus,
        age: 17,
        level: initialLevel,
        experience: 0,
        experienceToNextLevel: calculateExpToNextLevel(initialLevel),
        yearlyExperience: 0,
        yearlyExperienceToNextAge: YEARLY_XP_TO_NEXT_AGE,
        currentEnergy: baseTalent.stamina + bonus,
        skills: [],
        earnings: 0,
        reincarnationCount: baseTalent.reincarnationCount || 0,
        followers: 0,
        sessionsServed: 0,
        photoInventory: [],
        videoInventory: [],
        isDeceased: false,
        isOnContraceptives: false,
    };
    const dayaPikat = calculateDayaPikat(partialTalent);
    const tariffs = calculateTariffs(dayaPikat, partialTalent.kesehatan, partialTalent.potensiHamil, partialTalent.rarity);
    
    return {
        ...partialTalent,
        dayaPikat,
        tariffs
    };
};

export const reincarnateExistingTalent = (hibernatedTalent: Talent): Talent => {
    const base = baseTalents.find(bt => bt.id.startsWith(hibernatedTalent.id.substring(0, hibernatedTalent.id.lastIndexOf('-'))));
    if (!base) {
        console.error("Base talent not found for reincarnation!");
        return hibernatedTalent;
    }

    const newReincarnationCount = hibernatedTalent.reincarnationCount + 1;
    
    const reincarnated = initializeNewTalent({
        ...base,
        reincarnationCount: newReincarnationCount,
    });

    reincarnated.earnings = hibernatedTalent.earnings;

    return reincarnated;
}


export const generateTalents = (): Talent[] => {
    return baseTalents.map(initializeNewTalent);
};

// --- NEW EQUIPMENT SYSTEM LOGIC ---

export interface ActiveBonusInfo {
    setName: string;
    bonus: SetBonus;
}

interface CalculatedEquipmentEffects {
    stats: Partial<Talent>;
    effects: Record<string, number>; // For multipliers and special effects
    activeBonuses: ActiveBonusInfo[];
}

/**
 * Calculates the total stat modifications and active set bonuses from a talent's equipped items.
 */
export const getEquipmentEffects = (talent: Talent): CalculatedEquipmentEffects => {
    const equippedItems = Object.values(talent.equipment).filter(item => item && 'setName' in item) as EquipmentItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalStats: Partial<Talent> | any = {};
    const finalEffects: Record<string, number> = {};
    const activeBonuses: ActiveBonusInfo[] = [];

    // 1. Count pieces from each set
    const setCounts: Record<string, number> = {};
    for (const item of equippedItems) {
        setCounts[item.setName] = (setCounts[item.setName] || 0) + 1;
    }

    // 2. Determine active set bonuses
    for (const setName in setCounts) {
        const count = setCounts[setName];
        const equipmentSet = EQUIPMENT_SETS.find(s => s.setName === setName);
        if (equipmentSet) {
            equipmentSet.bonuses.forEach(bonus => {
                if (count >= bonus.threshold) {
                    activeBonuses.push({ setName, bonus });
                }
            });
        }
    }

    // 3. Aggregate stats and effects from individual items
    for (const item of equippedItems) {
        for (const statKey in item.stats) {
            const value = item.stats[statKey as keyof typeof item.stats]!;
            if (['kecantikan', 'stamina', 'mental', 'popularitas', 'dayaPikat'].includes(statKey)) {
                finalStats[statKey] = (finalStats[statKey] || 0) + value;
            } else {
                finalEffects[statKey] = (finalEffects[statKey] || 0) + value;
            }
        }
    }

    // 4. Aggregate effects from active set bonuses
    for (const { bonus } of activeBonuses) {
        for (const effectKey in bonus.effects) {
            const value = bonus.effects[effectKey as keyof typeof bonus.effects]!;
             if (['satisfactionBonus', 'contentProductionQuality'].includes(effectKey)) { // flat bonuses
                finalEffects[effectKey] = (finalEffects[effectKey] || 0) + value;
            } else { // multipliers
                finalEffects[effectKey] = (finalEffects[effectKey] || 0) + value;
            }
        }
    }
    
    return { stats: finalStats, effects: finalEffects, activeBonuses };
};

/**
 * Calculates the final, effective stats of a talent including age and equipment modifiers.
 * This should be used for all gameplay calculations (matches, livestreams, etc.).
 * @param talent The base talent object from the store.
 * @returns An object containing the fully calculated talent stats and any active equipment effects (multipliers, etc.).
 */
export const calculateEffectiveTalent = (talent: Talent) => {
    // 1. Apply age modifiers first as the base
    const ageModifiedTalent = applyAgeAttributeModifiers(talent);

    // 2. Get equipment effects
    const { stats: equipmentStats, effects: equipmentEffects, activeBonuses } = getEquipmentEffects(talent);

    // 3. Create a new talent object to modify
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const effectiveTalent: Talent | any = { ...ageModifiedTalent };

    // 4. Apply direct stat boosts from equipment
    for (const key in equipmentStats) {
        const statKey = key as keyof typeof equipmentStats;
        if (typeof effectiveTalent[statKey] === 'number') {
            effectiveTalent[statKey] += equipmentStats[statKey]!;
        }
    }
    
    return { effectiveTalent, equipmentEffects, activeBonuses };
};