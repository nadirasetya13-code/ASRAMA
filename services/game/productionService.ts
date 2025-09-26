import {
  Talent,
  PhoneItem,
  ActiveBuff,
  Rarity,
  ContentItem,
} from '../../types';
import {
  PRODUCTION_THEMES,
  BASE_PHOTO_PRODUCTION_COST,
  BASE_VIDEO_PRODUCTION_COST,
  BASE_PHOTO_EARNINGS_POTENTIAL,
  BASE_VIDEO_EARNINGS_POTENTIAL,
} from '../../constants';
import { getRandomNumber } from './utils';
import { calculateEffectiveTalent } from './talentService';

const RARITY_COST_MULTIPLIER: Record<Rarity, number> = {
  Biasa: 1.0,
  Rare: 1.1,
  Epic: 1.25,
  Legendary: 1.4,
  Event: 1.6,
  Khusus: 1.8,
  Special: 2.0,
  Mystic: 2.5,
};

export const calculateProductionCost = (
  talent: Talent,
  contentType: 'Foto' | 'Video',
  batchSize: number
): number => {
  const baseCost =
    contentType === 'Foto'
      ? BASE_PHOTO_PRODUCTION_COST
      : BASE_VIDEO_PRODUCTION_COST;

  const camera = talent.equipment.kameraDsr || talent.equipment.handycam;
  const laptop = talent.equipment.laptop;

  // 1. Base Cost per Item
  let costPerItem = baseCost;

  // 2. Talent Professionalism Modifier
  const levelModifier = 1 + talent.level / 100; // +1% per level
  const popularityModifier = 1 + talent.popularitas / 200; // +0.5% per pop point
  const rarityModifier = RARITY_COST_MULTIPLIER[talent.rarity];
  costPerItem *= levelModifier * popularityModifier * rarityModifier;

  // 3. Equipment Operational Cost Modifier
  const cameraCostModifier = camera ? 1 + camera.level / 200 : 1; // +0.5% per camera level
  const laptopCostModifier = laptop ? 1 + laptop.level / 200 : 1; // +0.5% per laptop level
  costPerItem *= cameraCostModifier * laptopCostModifier;

  // 4. Total Batch Cost
  const totalCost = Math.floor(costPerItem * batchSize);

  return totalCost;
};

export const generateProductionScandal = (
  talent: Talent,
  laptop: PhoneItem | null,
  equipmentEffects: Record<string, number>,
  batchSize: number
): ActiveBuff | null => {
  if (!laptop) return null;

  let riskChance = 0.05; // Base 5% risk
  riskChance += (100 - talent.mental) * 0.001; // Risk increases as mental drops
  const laptopRiskMultiplier =
    laptop.buff.baseValue + (laptop.level - 1) * laptop.buff.upgradeValue;
  riskChance *= laptopRiskMultiplier;

  // Apply reduction from equipment set bonus
  riskChance *= 1 - (equipmentEffects.scandalChanceReduction || 0);

  // Apply multiplier for batch size
  riskChance *= 1 + (batchSize - 1) * 0.02; // Each additional item adds 2% to the base risk.

  if (Math.random() > riskChance) {
    return null;
  }

  const isMajorScandal = Math.random() < 0.3;
  if (isMajorScandal) {
    return {
      id: `scandal-doxxing-${Date.now()}`,
      sourceRoomId: 'production',
      sourceRoomName: 'Produksi Konten',
      description: `[DOXXING] Data pribadi ${talent.name} bocor! Mentalnya hancur.`,
      durationDays: 4, // Changed from 7 to 4
      target: 'SPECIFIC_TALENT',
      effect: 'MENTAL_LOCK',
      value: 40, // Changed from 50 to 40
      condition: 'NONE',
    };
  } else {
    return {
      id: `scandal-leak-${Date.now()}`,
      sourceRoomId: 'production',
      sourceRoomName: 'Produksi Konten',
      description: `[KONTEN BOCOR] Beberapa konten ${talent.name} bocor, merusak citranya.`,
      durationDays: 4, // Changed from 3 to 4
      target: 'SPECIFIC_TALENT',
      effect: 'POPULARITY_PENALTY',
      value: -0.3, // Changed from -0.15 to -0.30
      condition: 'NONE',
    };
  }
};

export const calculateProductionBatchResult = (
  talent: Talent,
  contentType: 'Foto' | 'Video',
  theme: string,
  batchSize: number
): {
  newContent: ContentItem[];
  averageQuality: number;
  scandal: ActiveBuff | null;
  xpGained: number;
} => {
  const { effectiveTalent, equipmentEffects } = calculateEffectiveTalent(talent);
  const camera =
    effectiveTalent.equipment.kameraDsr || effectiveTalent.equipment.handycam;
  const laptop = effectiveTalent.equipment.laptop;
  if (!camera || !laptop) throw new Error('Missing equipment');

  const themeConfig = PRODUCTION_THEMES[theme];
  const newContent: ContentItem[] = [];
  let totalQuality = 0;

  for (let i = 0; i < batchSize; i++) {
    // 1. Calculate Quality (1-100) for this specific item
    const cameraQuality =
      camera.buff.baseValue + (camera.level - 1) * camera.buff.upgradeValue;
    const statCheckValue = effectiveTalent[themeConfig.statCheck];

    let quality =
      cameraQuality * 0.5 + // 50% from camera
      statCheckValue * 0.2 + // 20% from main stat
      effectiveTalent.kecantikan * 0.1 + // 10% from beauty
      effectiveTalent.stamina * 0.1 + // 10% from stamina
      effectiveTalent.mental * 0.1; // 10% from mental

    // Apply flat bonus from equipment
    quality += equipmentEffects.contentProductionQuality || 0;

    quality += getRandomNumber(-5, 5); // Add randomness
    quality = Math.max(1, Math.min(100, Math.round(quality)));

    // 2. Calculate Potential Earnings based on Quality
    const baseEarnings =
      contentType === 'Foto'
        ? BASE_PHOTO_EARNINGS_POTENTIAL
        : BASE_VIDEO_EARNINGS_POTENTIAL;

    const qualityMultiplier = 1 + Math.pow(quality / 50, 2.5); // Exponential bonus from quality
    const popularityMultiplier = 1 + effectiveTalent.popularitas / 150;
    const followersMultiplier =
      1 + Math.log10((effectiveTalent.followers || 0) + 1) / 5;

    const potentialEarnings = Math.floor(
      baseEarnings *
        qualityMultiplier *
        popularityMultiplier *
        followersMultiplier
    );

    newContent.push({
      id: `content-${talent.id}-${Date.now()}-${i}`,
      quality,
      potentialEarnings,
    });
    totalQuality += quality;
  }

  const averageQuality = Math.round(totalQuality / batchSize);
  const scandal = generateProductionScandal(
    effectiveTalent,
    laptop,
    equipmentEffects,
    batchSize
  );

  return { newContent, averageQuality, scandal, xpGained: getRandomNumber(200, 500) };
};