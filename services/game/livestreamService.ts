import { Talent, PhoneItem, LivestreamResult, LivestreamEvent, LivestreamChoice } from "../../types";
import { LIVESTREAM_BASE_ENERGY_COST, LIVESTREAM_BASE_MENTAL_COST, LIVESTREAM_TOPICS, LIVESTREAM_EVENT_COOLDOWN_DAYS } from "../../constants";
import { livestreamEvents } from "./events";
import { getRandomNumber } from "./utils";
import { calculateEffectiveTalent } from "./talentService";

/**
 * Generates a sequence of events for a livestream using a smart, themed pool system.
 * It prioritizes events matching the chosen topic's tag while respecting cooldowns.
 * @param eventHistory A record of event IDs and the day they were last seen.
 * @param currentDay The current day in the game.
 * @param count The number of events to generate.
 * @param topicTag The tag associated with the chosen livestream topic.
 * @returns An array of LivestreamEvent objects for the session.
 */
export const generateLivestreamEvents = (
  eventHistory: Record<string, number>,
  currentDay: number,
  count: number,
  topicTag: string
): LivestreamEvent[] => {
  const allEvents = [...livestreamEvents];
  
  // 1. Separate events into themed and general pools
  const themedPool: LivestreamEvent[] = [];
  const generalPool: LivestreamEvent[] = [];

  allEvents.forEach(event => {
    if (event.tags?.includes(topicTag)) {
      themedPool.push(event);
    } else {
      generalPool.push(event);
    }
  });

  // 2. Filter both pools based on cooldown
  const isAvailable = (event: LivestreamEvent) => {
    const lastSeenDay = eventHistory[event.id];
    if (!lastSeenDay) return true;
    return currentDay - lastSeenDay >= LIVESTREAM_EVENT_COOLDOWN_DAYS;
  };

  let availableThemed = themedPool.filter(isAvailable);
  let availableGeneral = generalPool.filter(isAvailable);

  // 3. Build the final event list
  const selectedEvents: LivestreamEvent[] = [];
  const themedCount = Math.ceil(count * 0.7); // Aim for 70% themed events

  // 4. Prioritize filling with available themed events
  const shuffledThemed = availableThemed.sort(() => 0.5 - Math.random());
  selectedEvents.push(...shuffledThemed.slice(0, themedCount));

  // 5. Fill the rest with available general events
  const remainingCount = count - selectedEvents.length;
  if (remainingCount > 0) {
    const shuffledGeneral = availableGeneral.sort(() => 0.5 - Math.random());
    selectedEvents.push(...shuffledGeneral.slice(0, remainingCount));
  }
  
  // 6. If still not enough, use fallback (oldest cooldown events)
  if (selectedEvents.length < count) {
    const needed = count - selectedEvents.length;
    const usedEventIds = new Set(selectedEvents.map(e => e.id));
    
    const cooldownEvents = allEvents
      .filter(event => !usedEventIds.has(event.id) && !isAvailable(event))
      .sort((a, b) => (eventHistory[a.id] || 0) - (eventHistory[b.id] || 0));
      
    selectedEvents.push(...cooldownEvents.slice(0, needed));
  }

  // 7. Final shuffle to ensure order is random
  return selectedEvents.sort(() => 0.5 - Math.random());
};


/**
 * NEW: Resolves the outcome of a livestream choice with dynamic consequences.
 * This function makes memorization ineffective by introducing variability and context.
 * @returns An object with the resolved outcome.
 */
export const resolveLivestreamChoice = (
  talent: Talent,
  choice: LivestreamChoice,
  topic: string
): { success: boolean; hypeChange: number; viewersChange: number; message: string } => {
  
  // 1. Resolve Dynamic Threshold
  const threshold = Array.isArray(choice.threshold)
    ? getRandomNumber(choice.threshold[0], choice.threshold[1])
    : choice.threshold;

  // 2. Calculate Effective Stat with Modifiers (including equipment)
  const { effectiveTalent } = calculateEffectiveTalent(talent);
  let effectiveStat = effectiveTalent[choice.stat];

  if (choice.modifiers) {
    // Apply skill-based modifier
    if (choice.modifiers.skill && effectiveTalent.skills.some(s => s.id === choice.modifiers.skill?.id)) {
      effectiveStat += choice.modifiers.skill.bonus;
    }
    // Apply topic-based modifier
    if (choice.modifiers.topic && topic === choice.modifiers.topic.id) {
      effectiveStat += choice.modifiers.topic.bonus;
    }
  }

  // 3. Determine Success or Failure
  const isSuccess = effectiveStat >= threshold;
  const outcome = isSuccess ? choice.success : choice.failure;

  // 4. Resolve Dynamic Rewards/Penalties
  const hypeChange = Array.isArray(outcome.hype)
    ? getRandomNumber(outcome.hype[0], outcome.hype[1])
    : outcome.hype;
    
  const viewersChange = Array.isArray(outcome.viewers)
    ? getRandomNumber(outcome.viewers[0], outcome.viewers[1])
    : outcome.viewers;

  return {
    success: isSuccess,
    hypeChange,
    viewersChange,
    message: outcome.message,
  };
};


/**
 * Calculates the final results of a livestream minigame based on its final state using a complex, multi-faceted formula.
 * @param finalHype The final hype score (0-100).
 * @param peakViewers The maximum number of concurrent viewers.
 * @param talent The talent who performed the stream.
 * @param phone The phone used for the stream.
 * @param topic The topic chosen for the livestream.
 * @returns A LivestreamResult object.
 */
export const calculateFinalLivestreamResult = (
    finalHype: number,
    peakViewers: number,
    talent: Talent,
    phone: PhoneItem,
    topic: string
): Omit<LivestreamResult, 'talentId' | 'mentalChange' | 'energyChange' | 'topic' | 'topicLabel'> => {
    
    const { effectiveTalent, equipmentEffects } = calculateEffectiveTalent(talent);

    // --- CONSTANTS FOR BALANCING ---
    const BASE_GIFT_RATE_PER_VIEWER = 2.5;
    const PREMIUM_GIFT_BASE_RATE = 500;
    const LOYALTY_BONUS_RATE = 40;
    
    // --- BUFF CALCULATION ---
    const getBuffValue = (p: PhoneItem) => p.buff.baseValue + (p.level - 1) * p.buff.upgradeValue;
    const buffValue = getBuffValue(phone);

    // =================================================
    // --- PENDAPATAN (EARNINGS) CALCULATION ---
    // =================================================
    // Pendapatan dihitung dari 3 pilar: Dasar, Premium, dan Loyalitas.

    // 1. PENDAPATAN DASAR (Gift dari Penonton Umum)
    // Dipengaruhi oleh Hype, Penonton, dan Kecantikan.
    let baseGiftValue = (finalHype / 100) * peakViewers * BASE_GIFT_RATE_PER_VIEWER * (1 + effectiveTalent.kecantikan / 200);
    if (phone.buff.effectId === 'beautyMultiplier') { // Buff Vivo
        baseGiftValue *= (1 + buffValue);
    }

    // 2. PENDAPATAN PREMIUM (Gift dari "Whales" / Fetish)
    // Dipengaruhi oleh Daya Pikat dan Atribut Intim yang relevan dengan Topik.
    let premiumGiftValue = 0;
    const topicConfig = LIVESTREAM_TOPICS[topic];
    if (topicConfig) {
        let relevantAttributeValue = 0;
        switch (topicConfig.group) {
            case 'fisik':
                relevantAttributeValue = effectiveTalent.fisik[topicConfig.attribute as keyof typeof effectiveTalent.fisik] || 50;
                break;
            case 'intim.payudara':
                relevantAttributeValue = effectiveTalent.intim.payudara[topicConfig.attribute as keyof typeof effectiveTalent.intim.payudara] || 50;
                break;
            // Add other intim groups if new topics are created
        }
        
        // Atribut yang relevan memberikan bonus EKSponensial, dan Daya Pikat adalah pengali utamanya.
        premiumGiftValue = Math.pow(relevantAttributeValue, 1.25) * effectiveTalent.dayaPikat * (PREMIUM_GIFT_BASE_RATE / 1000);
    }
    if (phone.buff.effectId === 'sultanViewerChance') { // Buff iPhone
        premiumGiftValue *= (1 + buffValue);
    }

    // 3. BONUS LOYALITAS (Gift dari Penggemar Setia)
    // Dipengaruhi oleh Popularitas (basis fans) dan Mental (koneksi).
    const loyaltyBonusValue = (effectiveTalent.popularitas * effectiveTalent.mental) * LOYALTY_BONUS_RATE;

    // --- TOTAL PENDAPATAN ---
    let totalEarnings = baseGiftValue + premiumGiftValue + loyaltyBonusValue;

    // Apply global multipliers from phone
    if (phone.buff.effectId === 'giftValueMultiplier' || phone.buff.effectId === 'allRounderBonus') {
        totalEarnings *= (1 + buffValue);
    }
     // Infinix has a small secondary buff
    if (phone.buff.effectId === 'metaUpgradeDiscount') {
         totalEarnings *= (1 + buffValue / 2);
    }
    // Apply equipment set multipliers
    totalEarnings *= (1 + (equipmentEffects.livestreamEarningsMultiplier || 0));


    // ===================================================================
    // --- PEROLEHAN PENGIKUT (FOLLOWER GAIN) COMPLEX CALCULATION V2 ---
    // ===================================================================

    // LANGKAH 1: POTENSI JANGKAUAN (Potential Reach) - Audiens mentah yang bisa dikonversi.
    const potentialReach = peakViewers * (finalHype / 100);

    // LANGKAH 2: TINGKAT KONVERSI DASAR (Base Conversion Rate) - Daya tarik inheren talenta.
    const baseConversionRate = (effectiveTalent.kecantikan + (effectiveTalent.dayaPikat / 50)) / 1000; // e.g., (90 + 1500/50)/1000 = 12%

    // LANGKAH 3: PENGALI DINAMIS (Dynamic Multipliers) - Inti dari kompleksitas.
    
    // a. Faktor Kebaruan (Novelty Factor) - Bonus besar untuk talenta baru, berkurang cepat.
    const noveltyFactor = 1 + (2000 / ((effectiveTalent.followers || 0) + 500)); // Starts high (e.g., 5x bonus at 0 followers)

    // b. Faktor Kejenuhan Pasar (Market Saturation Factor) - Menekan pertumbuhan saat popularitas tinggi.
    const marketSaturationFactor = Math.max(0.1, 1 - (effectiveTalent.popularitas / 250)); // Semakin populer, semakin kecil pengalinya.

    // c. Faktor Manajemen Reputasi (Reputation Management Factor) - Duel antara Mental vs Popularitas.
    // Jika Mental > Popularitas, talenta karismatik (bonus).
    // Jika Popularitas > Mental, talenta kewalahan oleh drama/haters (penalti).
    const reputationManagementFactor = 1 + ((effectiveTalent.mental - effectiveTalent.popularitas) / 300);

    // LANGKAH 4: KALKULASI FINAL - Menggabungkan semua faktor.
    const newFollowers = potentialReach * baseConversionRate * noveltyFactor * marketSaturationFactor * reputationManagementFactor;
    
    let totalPopularityGain = Math.floor(newFollowers);
    
    // Terapkan buff ponsel jika ada.
    if (phone.buff.effectId === 'allRounderBonus') {
        totalPopularityGain *= (1 + buffValue);
    }
    
    return {
        earnings: Math.floor(totalEarnings),
        peakViewers: Math.floor(peakViewers),
        popularityGain: Math.max(1, Math.floor(totalPopularityGain)),
        finalHype,
        xpGained: getRandomNumber(200, 500),
    };
};

/**
 * Calculates the mental and energy costs of a livestream session.
 * @param talent The talent who performed the stream.
 * @param phone The phone used for the stream.
 * @returns An object with mentalChange and energyChange.
 */
export const calculateLivestreamCosts = (talent: Talent, phone: PhoneItem): { mentalChange: number, energyChange: number } => {
    const getBuffValue = (p: PhoneItem) => p.buff.baseValue + (p.level - 1) * p.buff.upgradeValue;
    const buffValue = getBuffValue(phone);

    let mentalDrain = LIVESTREAM_BASE_MENTAL_COST;
    if (phone.buff.effectId === 'mentalDrainReduction') {
        mentalDrain *= (1 - buffValue);
    }

    return {
        mentalChange: -Math.floor(mentalDrain),
        energyChange: -LIVESTREAM_BASE_ENERGY_COST,
    };
};