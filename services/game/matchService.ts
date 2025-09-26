import { Talent, Guest, Room, BuffConditionId, TalentImpact, FisikAttributes, ConsumableItem, Rarity, EquipmentItem } from "../../types";
import { SATISFACTION_MODIFIERS, ENERGY_COST_PER_SESSION, ROOM_TYPE_CONFIG, HIV_RISK_BASE_UNPROTECTED, HIV_RISK_INFECTED_GUEST, EQUIPMENT_SETS } from "../../constants";
import { calculateEffectiveTalent } from "./talentService";
import { calculateWantsFulfillment } from "./guestService";

const RARITY_RISK_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.1,
  Epic: 1.2,
  Legendary: 1.3,
  Event: 1.4,
  Khusus: 1.5,
  Special: 1.6,
  Mystic: 1.8,
};


export const calculateGuestSatisfaction = (talent: Talent, guest: Guest, room: Room, isSubstitute: boolean): { score: number; conditionMet: { [key in BuffConditionId]?: boolean } } => {
    const { effectiveTalent, equipmentEffects, activeBonuses } = calculateEffectiveTalent(talent);
    
    // Get base room buffs
    const roomConfig = 'type' in room ? ROOM_TYPE_CONFIG[room.type] : null;
    const roomBuffs = roomConfig ? roomConfig.getBuffs(room.level) : {};

    // 1. Calculate base score from fulfilling wants
    const wantsFulfillment = calculateWantsFulfillment(effectiveTalent, guest);
    let satisfaction = wantsFulfillment;
    
    // Apply flat satisfaction bonus from equipment sets
    satisfaction += equipmentEffects.satisfactionBonus || 0;


    // --- NEW: Apply request bonus/penalty ---
    if (guest.requestedTalentId) {
        if (isSubstitute) {
            satisfaction *= 0.5; // 50% penalty for offering a substitute
        } else {
            satisfaction += 20; // 20 points bonus for fulfilling the request
        }
    }

    // Apply specific room type bonuses
    if ('type' in room) {
        if (room.type === 'Romantis' && guest.personalityTraits.includes('Romantis')) {
            satisfaction += (roomBuffs.loveBonus || 0) * 100;
        }
        if (room.type === 'Dominasi' && guest.kinks.length > 0) {
            satisfaction += (roomBuffs.kinkSatisfactionBonus || 0) * 100;
        }
        if (room.type === 'Hiburan' && guest.personalityTraits.includes('Kritis')) {
            satisfaction += (roomBuffs.criticalGuestSatisfactionBonus || 0) * 100;
        }
    }

    // 2. Social & Narrative Chemistry Modifiers
    if (effectiveTalent.kotaAsal === guest.kotaAsal) satisfaction += SATISFACTION_MODIFIERS.SAME_CITY;
    if (effectiveTalent.agama === guest.agama) satisfaction += SATISFACTION_MODIFIERS.SAME_RELIGION;
    
    // Social Status Dynamics
    const { statusSosial: guestStatus } = guest;
    const { statusSosial: talentStatus } = effectiveTalent;
    
    if (/(Direktur|CEO|Komisaris|Jenderal)/.test(guestStatus) && talentStatus === 'Anak Magang') satisfaction += SATISFACTION_MODIFIERS.STATUS_DYNAMICS_BONUS_HIGH;
    if (/(Politisi|Pejabat|Menteri|Konglomerat|Oligark)/.test(guestStatus) && talentStatus === 'Seleb TikTok') satisfaction += SATISFACTION_MODIFIERS.STATUS_DYNAMICS_PENALTY;
    if (/(PNS|Pejabat)/.test(guestStatus) && talentStatus === 'Siswi SMA') satisfaction += SATISFACTION_MODIFIERS.STATUS_DYNAMICS_BONUS_MID;
    if (/(Dokter|Pengacara|Pengusaha)/.test(guestStatus) && talentStatus === 'Gadis Desa') satisfaction += SATISFACTION_MODIFIERS.STATUS_DYNAMICS_BONUS_LOW;

    // 3. Physical Compatibility Modifier (-5 to +5)
    let totalDiff = 0;
    const fisikKeys = Object.keys(guest.fisik) as Array<keyof FisikAttributes>;
    for(const key of fisikKeys) {
        totalDiff += Math.abs(guest.fisik[key] - effectiveTalent.fisik[key]);
    }
    const avgDiff = totalDiff / fisikKeys.length;
    const compatibilityModifier = SATISFACTION_MODIFIERS.PHYSICAL_COMPATIBILITY_BASE - (avgDiff / SATISFACTION_MODIFIERS.PHYSICAL_COMPATIBILITY_DIVISOR);
    satisfaction += compatibilityModifier;
    
    // 4. Kink Modifiers (Huge Bonus/Penalty) - REVISED LOGIC
    let isKinkFulfilled = false; // For buff conditions
    if (guest.kinks.length > 0) {
        let fulfilledKinks = 0;
        for (const kink of guest.kinks) {
            let kinkSatisfied = false;
            switch (kink.type) {
                case 'Dominasi': if(effectiveTalent.mental >= 85) kinkSatisfied = true; break;
                case 'Masokisme': if(guest.penis.agresivitas >= 70 && effectiveTalent.mental >= 60) kinkSatisfied = true; break;
                case 'Sadisme Ringan': if(effectiveTalent.kesehatan >= 80 && talent.mental < 50) kinkSatisfied = true; break;
                case 'Fertility': if(talent.potensiHamil >= 70) kinkSatisfied = true; break;
                case 'Virginity Complex': if(effectiveTalent.intim.vagina.kekencangan >= 90) kinkSatisfied = true; break;
            }
            if (kinkSatisfied) {
                fulfilledKinks++;
            }
        }

        if (fulfilledKinks > 0) {
            isKinkFulfilled = true; // At least one kink was fulfilled
        }
        
        // Apply a single, scaled multiplier based on the proportion of fulfilled kinks.
        const fulfillmentRatio = fulfilledKinks / guest.kinks.length;
        // This creates a linear scale from the penalty (0%) to the bonus (100%).
        const kinkMultiplier = SATISFACTION_MODIFIERS.KINK_UNFULFILLED_MULTIPLIER + 
            ( (SATISFACTION_MODIFIERS.KINK_FULFILLED_MULTIPLIER - SATISFACTION_MODIFIERS.KINK_UNFULFILLED_MULTIPLIER) * fulfillmentRatio );

        satisfaction *= kinkMultiplier;
    }

    // 5. Personality, Attribute & Synergy Modifiers
    let romantisSetiaMultiplier = 1;
    if (activeBonuses.some(b => b.setName === 'Aphrodisia' && b.bonus.threshold === 4)) {
        romantisSetiaMultiplier = 2;
    }

    if (guest.personalityTraits.includes('Kritis')) satisfaction += SATISFACTION_MODIFIERS.PERSONALITY_KRITIS_PENALTY;
    if (guest.personalityTraits.includes('Tidak Sabaran')) satisfaction += SATISFACTION_MODIFIERS.PERSONALITY_SABAR_PENALTY;
    if (guest.personalityTraits.includes('Romantis')) {
        if (talent.jatuhCinta > 50) satisfaction += SATISFACTION_MODIFIERS.PERSONALITY_ROMANTIS_BONUS * romantisSetiaMultiplier;
        if (effectiveTalent.intim.payudara.sensitivitasPuting > 85) satisfaction += SATISFACTION_MODIFIERS.PERSONALITY_ROMANTIS_PUTING_BONUS * romantisSetiaMultiplier;
    }
    if (guest.personalityTraits.includes('Setia')) {
        const loyaltyBonus = (talent.jatuhCinta / SATISFACTION_MODIFIERS.PERSONALITY_SETIA_DIVISOR) * romantisSetiaMultiplier;
        satisfaction += loyaltyBonus;
    }
    if (guest.penis.dayaTahan > effectiveTalent.stamina) {
        satisfaction -= Math.min(SATISFACTION_MODIFIERS.STAMINA_MISMATCH_PENALTY_CAP, (guest.penis.dayaTahan - effectiveTalent.stamina) * SATISFACTION_MODIFIERS.STAMINA_MISMATCH_MULTIPLIER);
    }
    const scentScore = effectiveTalent.intim.vagina.aroma - guest.penis.bau;
    satisfaction += scentScore / SATISFACTION_MODIFIERS.SCENT_CHEMISTRY_DIVISOR;

    if(guest.penis.sensitivitas > 70) {
        const sensitivityBonus = (effectiveTalent.intim.vagina.kekencangan + effectiveTalent.intim.klitoris.kecepatanRespon) / 2;
        satisfaction += (sensitivityBonus / 100) * (100 * SATISFACTION_MODIFIERS.SENSITIVITY_SYNERGY_MULTIPLIER);
    }
    
    // 6. Apply generic satisfaction bonus from room
    satisfaction *= (1 + (roomBuffs.satisfactionBonus || 0));

    // 7. Apply penalty for bad room condition
    if(room.condition < 50) {
        const penalty = (50 - room.condition) * SATISFACTION_MODIFIERS.ROOM_CONDITION_PENALTY_MULTIPLIER; // up to 25% penalty
        satisfaction *= (1 - penalty / 100);
    }
    
    const preliminaryScore = Math.round(Math.max(0, Math.min(100, satisfaction)));
    
    // --- Post-calculation condition check ---
    const conditionMet: { [key in BuffConditionId]?: boolean } = {
        'NONE': true,
        'IF_SATISFACTION_ABOVE_90': preliminaryScore > 90,
        'IF_KINK_FULFILLED': isKinkFulfilled,
        'IF_TALENT_GUEST_SAME_CITY': talent.kotaAsal === guest.kotaAsal,
    };

    return { score: preliminaryScore, conditionMet };
};


export const calculateTalentImpact = (talent: Talent, guest: Guest, room: Room, condomUsed: ConsumableItem | null): TalentImpact => {
    let kesehatanChange = 0;
    let mentalChange = 0;
    let energyChange = ENERGY_COST_PER_SESSION;
    let hivRiskIncrease = 0;
    let pregnancyRiskIncrease = 0;

    const { effectiveTalent, equipmentEffects, activeBonuses } = calculateEffectiveTalent(talent);
    const { intim, fisik, mental } = effectiveTalent;

    const roomConfig = 'type' in room ? ROOM_TYPE_CONFIG[room.type] : null;
    const roomBuffs = roomConfig ? roomConfig.getBuffs(room.level) : {};
    
    // --- Physical Impact ---
    const sizeMismatch = (guest.penis.diameter * guest.penis.panjang) / (intim.vagina.elastisitas * intim.vagina.kedalaman);
    const aggressionFactor = guest.penis.agresivitas / 50;
    const hardnessFactor = guest.penis.kekerasanEreksi / 75;
    const lubricationDefense = 1 - (intim.vagina.pelumasan / 200);
    
    let physicalDamage = (sizeMismatch * aggressionFactor * hardnessFactor * lubricationDefense) * 5;

    if (guest.penis.teksturUrat === 'Berurat') physicalDamage *= 1.1;
    if (guest.penis.tipeKepala !== 'Bulat') physicalDamage *= 1.1;
    
    if (guest.fisik.beratBadan > fisik.beratBadan) {
        const weightDiff = guest.fisik.beratBadan - fisik.beratBadan;
        physicalDamage += weightDiff * 0.1;
        if(energyChange > 0) energyChange += weightDiff * 0.15;
    }
    
    if (guest.personalityTraits.includes('Kasar')) {
        physicalDamage *= 1.5;
    }

    // Artemisia 8pc Bonus: Double set's defensive bonus if health is low
    let healthDamageReductionFromEquip = equipmentEffects.healthDamageReduction || 0;
    if (talent.kesehatan < 50 && activeBonuses.some(b => b.setName === 'Artemisia' && b.bonus.threshold === 8)) {
        const artemisiaSet = EQUIPMENT_SETS.find(s => s.setName === 'Artemisia');
        if (artemisiaSet) {
            const equippedCount = Object.values(talent.equipment).filter(item => item && 'setName' in item && item.setName === 'Artemisia').length;
            if (equippedCount >= 2) {
                healthDamageReductionFromEquip += artemisiaSet.bonuses.find(b => b.threshold === 2)?.effects.healthDamageReduction || 0;
            }
        }
    }
    physicalDamage *= (1 - (roomBuffs.healthDamageReduction || 0));
    physicalDamage *= (1 - healthDamageReductionFromEquip);
    kesehatanChange = -Math.round(Math.max(1, physicalDamage));

    // --- Mental Impact ---
    let mentalDamage = 0;
    if (guest.personalityTraits.includes('Kasar')) mentalDamage += 5;
    if(guest.penis.agresivitas > 85 && mental < 60) mentalDamage += 5;
    if(guest.kinks.some(k => k.type === 'Dominasi') && mental < 80) mentalDamage += 3;

    let mentalDamageReductionFromEquip = equipmentEffects.mentalDamageReduction || 0;
    if (talent.kesehatan < 50 && activeBonuses.some(b => b.setName === 'Artemisia' && b.bonus.threshold === 8)) {
        const artemisiaSet = EQUIPMENT_SETS.find(s => s.setName === 'Artemisia');
        if (artemisiaSet) {
             const equippedCount = Object.values(talent.equipment).filter(item => item && 'setName' in item && item.setName === 'Artemisia').length;
             if (equippedCount >= 4) {
                mentalDamageReductionFromEquip += artemisiaSet.bonuses.find(b => b.threshold === 4)?.effects.mentalDamageReduction || 0;
            }
        }
    }
    mentalDamage *= (1 + (roomBuffs.mentalDamageIncrease || 0));
    mentalDamage *= (1 - (roomBuffs.mentalDamageReduction || 0));
    mentalDamage *= (1 - mentalDamageReductionFromEquip);
    mentalChange = -Math.round(mentalDamage);

    // --- Energy Impact ---
    energyChange *= (1 - (room.upgrades.energyCostReduction || 0));
    energyChange *= (1 - (roomBuffs.energyCostReduction || 0));

    // --- Risk Impact (HIV & Pregnancy) - NEW LOGIC ---
    const protectionLevel = condomUsed ? condomUsed.protectionLevel : 0;
    
    // HIV Risk Calculation
    if (protectionLevel < 1) { // If there's no condom or imperfect condom
        let baseHivRisk = HIV_RISK_BASE_UNPROTECTED;
        if (guest.personalityTraits.includes('Penyebar Penyakit')) {
            baseHivRisk = HIV_RISK_INFECTED_GUEST;
        }
        const guestTierMultiplier = 1 + (guest.tier / 8); // Max 2x multiplier for Tier 8
        const talentRarityMultiplier = RARITY_RISK_MULTIPLIER[talent.rarity];
        
        const totalRisk = baseHivRisk * guestTierMultiplier * talentRarityMultiplier;
        const finalRiskAfterProtection = totalRisk * (1 - protectionLevel); // Apply protection
        hivRiskIncrease = Math.round(finalRiskAfterProtection);
    }

    // Pregnancy Risk Calculation
    const basePregnancyRisk = Math.round(guest.penis.volumeSperma / 20); // 0-5 base risk
    const finalPregnancyRisk = basePregnancyRisk * (1 - protectionLevel);
    pregnancyRiskIncrease = Math.round(finalPregnancyRisk);

    return {
        kesehatanChange,
        mentalChange,
        energyChange: Math.round(energyChange),
        hivRiskIncrease,
        pregnancyRiskIncrease,
    };
};

export const calculateSessionDuration = (talent: Talent, guest: Guest): number => {
    // Apply age modifiers to get current, effective stats for the duel.
    const { effectiveTalent } = calculateEffectiveTalent(talent);

    // --- BASE & LIMITS ---
    const MIN_DURATION = 120000; // 2 minutes
    const MAX_DURATION = 300000; // 5 minutes
    let duration = 180000; // Start with a 3-minute baseline

    // --- DUEL 1: Physical Compatibility (Intensity vs. Resistance) ---
    // How intense/demanding the guest is vs. how well the talent can handle it physically.
    const guestIntensity = (guest.penis.panjang * 0.5) + (guest.penis.diameter * 1.5) + guest.penis.agresivitas + (guest.penis.kekerasanEreksi * 0.5);
    const talentResistance = (effectiveTalent.intim.vagina.elastisitas * 1.2) + effectiveTalent.intim.vagina.kedalaman + (effectiveTalent.intim.vagina.pelumasan * 0.8);
    // A large intensity mismatch prolongs the session.
    // A scaling factor of 100ms per point difference.
    duration += (guestIntensity - talentResistance) * 100;

    // --- DUEL 2: Stamina Battle (Endurance vs. Pace) ---
    // A direct clash of endurance. The bigger the gap, the longer it takes.
    const staminaDifference = guest.penis.dayaTahan - effectiveTalent.stamina;
    // Positive difference (guest > talent) adds time, negative (talent > guest) reduces time.
    // A scaling factor of 500ms per point of difference.
    duration += staminaDifference * 500;
    
    // --- DUEL 3: Mental Fortitude (Pressure vs. Composure) ---
    // How the talent copes with the guest's psychological pressure.
    let guestPressure = guest.penis.agresivitas * 0.5;
    if (guest.kinks.some(k => k.type === 'Dominasi' || k.type === 'Sadisme Ringan')) {
        guestPressure += 50; // Kinks add significant mental pressure.
    }
    if (guest.personalityTraits.includes('Kasar')) {
        guestPressure += 30;
    }
    const mentalDifference = guestPressure - effectiveTalent.mental;
    // If the guest's pressure overwhelms the talent's mental fortitude, the session gets complicated and longer.
    // A scaling factor of 250ms per point.
    if (mentalDifference > 0) {
        duration += mentalDifference * 250;
    }

    // --- DUEL 4: Sensual Synergy (Climax Accelerator/Decelerator) ---
    // High synergy leads to a faster, more efficient climax, shortening the duration.
    const talentSensitivity = (effectiveTalent.intim.klitoris.sensitivitas * 1.5) + effectiveTalent.intim.klitoris.kecepatanRespon + effectiveTalent.intim.payudara.sensitivitasPuting;
    const guestTechnique = (100 - guest.penis.agresivitas) + guest.penis.sensitivitas; // High aggression = poor technique
    
    // We normalize these values to get a synergy score from roughly 0 to 1
    const synergyScore = ((talentSensitivity / 450) * (guestTechnique / 250));
    // A perfect synergy score (around 1.0) can shave off up to 40 seconds.
    duration -= synergyScore * 40000;

    // --- FINAL CALCULATION & CLAMPING ---
    // Ensure the final duration is within the defined gameplay limits.
    const finalDuration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, Math.round(duration)));

    return finalDuration;
};
