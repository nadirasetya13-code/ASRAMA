import { Guest, GuestWant, FisikAttributes, PayudaraAttributes, VaginaAttributes, KlitorisAttributes, GuestKink, PersonalityTraitType, Talent, PenisAttributes } from "../../types";
import { PLAYER_LEVEL_EXP_BASE, PLAYER_LEVEL_EXP_POWER, GUEST_TIER_REPUTATION_THRESHOLDS } from "../../constants";
import { getRandomElement, getRandomNumber } from "./utils";
import { AVAILABLE_SKILLS } from "./data/skills";
import { applyAgeAttributeModifiers } from "./talentService";
import { guestDataPools } from './guests';

// --- NEW GUEST GENERATION SYSTEM ---
export const calculateReputationToNextLevel = (level: number): number => {
    if (level >= 100) return Infinity;
    const nextLevel = level + 1;
    return Math.floor(PLAYER_LEVEL_EXP_BASE * Math.pow(nextLevel, PLAYER_LEVEL_EXP_POWER));
};

export const calculateWantsFulfillment = (talent: Talent, guest: Guest): number => {
    if (!guest.wants || guest.wants.length === 0) {
        return 50; // Neutral score if guest has no specific wants
    }

    let totalScore = 0;
    let totalImportance = 0;
    
    const currentTalent = applyAgeAttributeModifiers(talent);

    for (const want of guest.wants) {
        let matchScore = 0;

        if (want.category === 'position') {
            // Handle position wants (binary match)
            if (talent.skills.some(skill => skill.id === want.value)) {
                matchScore = 100;
            } else {
                matchScore = 0;
            }
        } else {
            // Handle numeric attribute wants
            let attributeValue = 0;
            if (want.category === 'main') {
                attributeValue = currentTalent[want.attribute as keyof Talent] as number;
            } else if (want.category === 'fisik') {
                attributeValue = currentTalent.fisik[want.attribute as keyof FisikAttributes];
            } else {
                switch (want.category) {
                    case 'payudara':
                        attributeValue = currentTalent.intim.payudara[want.attribute as keyof PayudaraAttributes];
                        break;
                    case 'vagina':
                        attributeValue = currentTalent.intim.vagina[want.attribute as keyof VaginaAttributes];
                        break;
                    case 'klitoris':
                        attributeValue = currentTalent.intim.klitoris[want.attribute as keyof KlitorisAttributes];
                        break;
                }
            }
            
            if (want.operator === '>=' && attributeValue >= (want.value as number)) {
                matchScore = 100; // Requirement fully met
            } else if (want.operator === '>=' && attributeValue < (want.value as number)) {
                // Proportional score based on how close the talent is
                matchScore = Math.max(0, (attributeValue / (want.value as number)) * 100);
            }
        }
        
        totalScore += matchScore * want.importance;
        totalImportance += want.importance;
    }

    if (totalImportance === 0) {
        return 50;
    }

    const fulfillment = totalScore / totalImportance;
    return Math.round(Math.max(0, Math.min(100, fulfillment)));
};

export const generateGuests = (playerLevel: number, playerReputation: number, allTalents: Talent[]): Guest[] => {
    const count = 3 + playerLevel;
    const guests: Guest[] = [];

    // Determine available tiers based on reputation
    const availableTiers = [1];
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[2]) availableTiers.push(2);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[3]) availableTiers.push(3);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[4]) availableTiers.push(4);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[5]) availableTiers.push(5);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[6]) availableTiers.push(6);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[7]) availableTiers.push(7);
    if (playerReputation >= GUEST_TIER_REPUTATION_THRESHOLDS[8]) availableTiers.push(8);
    
    // Helper for generating attributes that increase with tier
    const getTieredStat = (base: number, randomRange: number, tier: number, tierBonus: number, cap: number = 100): number => {
        const value = base + getRandomNumber(0, randomRange) + (tier - 1) * tierBonus;
        return Math.min(cap, Math.round(value));
    };

    const availableBaseGuests = guestDataPools.baseGuests.filter(bg => availableTiers.includes(bg.tier));
    const availableTalentsForRequest = allTalents.filter(t => !t.hibernationEndTime);

    for (let i = 0; i < count; i++) {
        // Select a base guest template from the available pool
        const baseGuest = getRandomElement(availableBaseGuests.length > 0 ? availableBaseGuests : guestDataPools.baseGuests.filter(b => b.tier === 1));
        const tier = baseGuest.tier;
        
        // Generate dynamic attributes
        const fisik: FisikAttributes = {
            gayaRambut: getTieredStat(35, 25, tier, 5),
            bentukWajah: getTieredStat(35, 25, tier, 5),
            bentukMata: getTieredStat(35, 25, tier, 5),
            bentukBibir: getTieredStat(35, 25, tier, 5),
            bentukHidung: getTieredStat(35, 25, tier, 5),
            bentukTangan: getTieredStat(35, 25, tier, 5),
            beratBadan: getTieredStat(50, 20, tier, 4), // Heavier guests can be more challenging
            bentukKaki: getTieredStat(35, 25, tier, 5),
            bentukPantat: getTieredStat(35, 25, tier, 5),
        };

        const penis: PenisAttributes = {
            panjang: parseFloat((12 + Math.random() * 3 + (tier - 1) * 0.7).toFixed(1)),
            diameter: parseFloat((3.5 + Math.random() * 0.7 + (tier - 1) * 0.2).toFixed(1)),
            dayaTahan: getTieredStat(40, 30, tier, 5),
            agresivitas: getTieredStat(20, 20, tier, 8),
            kekerasanEreksi: getTieredStat(60, 25, tier, 2),
            sensitivitas: getRandomNumber(30, 90), // Not tiered for variety
            volumeSperma: getTieredStat(20, 40, tier, 6),
            tipeKepala: getRandomElement(['Runcing', 'Bulat', 'Lebar']),
            teksturUrat: getRandomElement(['Berurat', 'Halus']),
            bau: Math.max(10, 70 - getTieredStat(0, 20, tier, 5, 60)), // Higher tier = less smell
        };

        const wants: GuestWant[] = [];
        const numWants = Math.max(1, Math.floor(tier / 2));
        const shuffledWants = [...guestDataPools.wants].sort(() => 0.5 - Math.random());
        for (let j = 0; j < numWants; j++) {
            const wantTemplate = shuffledWants[j];
            wants.push({
                ...wantTemplate,
                operator: '>=',
                value: Math.floor(50 + Math.random() * 50 + (tier * 3)), // 50-124+, higher tier wants more on the 1-100 scale
            });
        }
        
        if (tier >= 3 && Math.random() < 0.25) {
            const randomSkill = getRandomElement(AVAILABLE_SKILLS);
            wants.push({
                category: 'position',
                attribute: randomSkill.id,
                label: `Posisi: ${randomSkill.name}`,
                operator: '==',
                value: randomSkill.id,
                importance: 1.8,
            });
        }

        const kinks: GuestKink[] = [];
        if (tier >= 4 && Math.random() < 0.20 * (tier - 3)) {
            kinks.push(getRandomElement(guestDataPools.kinks));
        }

        const personalityTraits: PersonalityTraitType[] = [];
        personalityTraits.push(getRandomElement(guestDataPools.personalityTraits));
        if (tier >= 5 && Math.random() > 0.5) {
            personalityTraits.push(getRandomElement(guestDataPools.personalityTraits.filter(p => !personalityTraits.includes(p))));
        }
        
        let requestedTalentId: string | undefined = undefined;
        let requestedTalentName: string | undefined = undefined;

        const requestChance = 0.3 + (tier * 0.05);
        if (availableTalentsForRequest.length > 0 && Math.random() < requestChance) {
            const weightedTalents = availableTalentsForRequest.flatMap(talent => Array(Math.ceil(talent.popularitas / 10)).fill(talent));
            const requestedTalent = getRandomElement(weightedTalents.length > 0 ? weightedTalents : availableTalentsForRequest);
            if (requestedTalent) {
                requestedTalentId = requestedTalent.id;
                requestedTalentName = requestedTalent.name;
            }
        }
        
        guests.push({
            id: `guest-${Date.now()}-${i}`,
            // Fixed data from template
            name: baseGuest.name,
            kotaAsal: baseGuest.kotaAsal,
            agama: baseGuest.agama,
            statusSosial: baseGuest.statusSosial,
            cerita: baseGuest.cerita, // CORRECT: Static backstory from template
            tier: baseGuest.tier,
            // Dynamic data for this session
            bio: getRandomElement(guestDataPools.narratives), // CORRECT: Dynamic motivation for the visit
            age: getRandomNumber(28, 55),
            imageUrl: `https://randomuser.me/api/portraits/men/${i % 100}.jpg`,
            patience: getRandomNumber(30, 100),
            fisik: fisik,
            penis: penis,
            wants: wants,
            kinks: kinks,
            personalityTraits: personalityTraits,
            requestedTalentId,
            requestedTalentName,
        });
    }
    return guests;
};
