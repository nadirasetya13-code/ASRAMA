import { Room, ActiveBuff, RoomUpgrade, MatchBonus, Rarity } from "../../types";
import { ROOM_TYPE_CONFIG, BUFF_TARGETS, BUFF_EFFECTS, BUFF_VALUE_POOLS, BUFF_CONDITIONS } from "../../constants";
import { getRandomElement } from "./utils";

// --- New Dynamic Buff Generator ---
export const generateDynamicBuff = (sourceRoomId: string, sourceRoomName: string): ActiveBuff => {
    const target = getRandomElement(BUFF_TARGETS);
    const effect = getRandomElement(BUFF_EFFECTS);
    const condition = Math.random() < 0.3 ? getRandomElement(BUFF_CONDITIONS.filter(c => c.id !== 'NONE')) : BUFF_CONDITIONS[0];

    let value = 0;
    let valueText = '';
    
    switch(effect.valueType) {
        case 'percentage': {
            const pVal = getRandomElement(BUFF_VALUE_POOLS.percentage);
            value = pVal.value;
            valueText = pVal.text;
            break;
        }
        case 'permanent_points': {
             const ppVal = getRandomElement(BUFF_VALUE_POOLS.permanent_points);
            value = ppVal.value;
            valueText = ppVal.text;
            break;
        }
        case 'absolute':
        case 'guarantee':
            value = 1; // Represents a boolean-like effect
            break;
    }

    let effectText = effect.text;
    if (effect.valueType === 'percentage') {
        effectText = `${effect.text} sebesar ${valueText}`;
    } else if (effect.valueType === 'permanent_points') {
        effectText = effect.text.replace('{value}', value.toString());
    }

    const description = `[${target.text}] ${effectText} ${condition.id !== 'NONE' ? `(${condition.text})` : ''}`.trim();

    return {
        id: `buff-${Date.now()}`,
        sourceRoomId,
        sourceRoomName,
        description,
        durationDays: 1,
        target: target.id,
        effect: effect.id,
        value,
        condition: condition.id,
    };
};

// --- New Calculation Service for Room & Buff Bonuses ---

const BUFF_DESCRIPTIONS: Record<string, (value: number) => string> = {
    satisfactionBonus: v => `+${(v * 100).toFixed(1)}% Kepuasan`,
    earningsBonus: v => `+${(v * 100).toFixed(1)}% Laba Agensi`,
    loveBonus: v => `+${(v * 100).toFixed(1)}% Jatuh Cinta`,
    kinkSatisfactionBonus: v => `+${(v * 100).toFixed(1)}% Kepuasan (Kink)`,
    healthDamageReduction: v => `-${(v * 100).toFixed(1)}% Kerusakan Kesehatan`,
    mentalDamageReduction: v => `-${(v * 100).toFixed(1)}% Kerusakan Mental`,
    xpBonus: v => `+${(v * 100).toFixed(1)}% XP Talenta`,
    popularityBonus: v => `+${(v * 100).toFixed(1)}% Popularitas`,
    criticalGuestSatisfactionBonus: v => `+${(v * 100).toFixed(1)}% Kepuasan (Tamu Kritis)`,
    royalGuestBonus: v => `+${(v * 100).toFixed(1)}% Bonus (Tamu Royal)`,
    energyCostReduction: v => `-${(v * 100).toFixed(1)}% Konsumsi Energi`,
    reputationBonus: v => `+${(v * 100).toFixed(1)}% Reputasi`,
    conditionDecayReduction: v => `-${(v * 100).toFixed(1)}% Kerusakan Kamar`,
    talentEarningsBonus: v => `+${(v * 100).toFixed(1)}% Uang Saku Talenta`,
};


export const getBonusDescriptions = (room: Room, activeBuffs: ActiveBuff[]): MatchBonus[] => {
    const descriptions: MatchBonus[] = [];
    const roomConfig = room.rarity ? null : ROOM_TYPE_CONFIG[room.type];
    
    const allBuffs: RoomUpgrade = {};

    // 1. Get base buffs from room type and level
    if (roomConfig) {
        const baseBuffs = roomConfig.getBuffs(room.level);
        for (const key in baseBuffs) {
            if (baseBuffs[key] !== 0) {
                 allBuffs[key] = (allBuffs[key] || 0) + baseBuffs[key];
            }
        }
    }

    // 2. Get buffs from room upgrades
    for (const key in room.upgrades) {
        allBuffs[key] = (allBuffs[key] || 0) + room.upgrades[key];
    }
    
    // 3. Create descriptions from combined buffs
    for (const key in allBuffs) {
        if (allBuffs[key] !== 0 && BUFF_DESCRIPTIONS[key]) {
             descriptions.push({ description: `${room.name}`, value: BUFF_DESCRIPTIONS[key](allBuffs[key]) });
        }
    }
    
    // 4. Add global active buffs
    activeBuffs.forEach(buff => {
        if (buff.target === 'ALL_SESSIONS_TODAY') {
            descriptions.push({ description: `Buff: ${buff.sourceRoomName}`, value: buff.description.split(']')[1].trim() });
        }
    });

    return descriptions;
};

// --- New Room Cleaning Mechanic ---
export const calculateCleaningDuration = (talentRarity: Rarity, guestTier: number): number => {
    const BASE_DURATION_MS = 30000; // 30 seconds
    let duration = BASE_DURATION_MS;

    const rarityBonus: Record<Rarity, number> = {
        'Biasa': 0,
        'Rare': 2000,
        'Epic': 4000,
        'Legendary': 6000,
        'Event': 8000,
        'Khusus': 10000,
        'Special': 12000,
        'Mystic': 15000,
    };

    duration += rarityBonus[talentRarity] || 0;

    if (guestTier >= 3 && guestTier <= 4) {
        duration += 5000;
    } else if (guestTier >= 5 && guestTier <= 6) {
        duration += 10000;
    } else if (guestTier >= 7) {
        duration += 15000;
    }

    // This ensures the duration is between 30 (30+0+0) and 60 seconds (30+15+15).
    return Math.min(duration, 60000); 
};