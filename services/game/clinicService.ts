import { Talent } from '../../types';
import {
  SURGERY_STAT_IMPORTANCE_WEIGHT,
  SURGERY_RARITY_MULTIPLIER,
  SURGERY_BASE_CHANGE_COST_PER_POINT,
  SURGERY_TARGET_LEVEL_COST_MULTIPLIER,
  SURGERY_TARGET_LEVEL_EXPONENT,
  RECOVERY_BASE_DAYS,
} from '../../constants';

/**
 * Calculates the cost of surgery based on a complex, multi-factor formula.
 * @param talent The talent undergoing surgery.
 * @param attributePath The nested path to the attribute, e.g., 'intim.payudara.ukuran'.
 * @param currentValue The current value of the attribute.
 * @param targetValue The desired new value of the attribute.
 * @returns The calculated cost in Rupiah.
 */
export const calculateSurgeryCost = (
  talent: Talent,
  attributePath: string,
  currentValue: number,
  targetValue: number
): number => {
  if (targetValue <= currentValue) return 0;

  // 1. Get Base Multipliers
  const statImportanceWeight =
    SURGERY_STAT_IMPORTANCE_WEIGHT[attributePath] ||
    SURGERY_STAT_IMPORTANCE_WEIGHT.default;
  const rarityMultiplier = SURGERY_RARITY_MULTIPLIER[talent.rarity];
  const changeAmount = targetValue - currentValue;

  // 2. Calculate Cost Components
  const baseChangeCost =
    changeAmount * statImportanceWeight * SURGERY_BASE_CHANGE_COST_PER_POINT;
  const targetLevelCost =
    Math.pow(targetValue, SURGERY_TARGET_LEVEL_EXPONENT) *
    SURGERY_TARGET_LEVEL_COST_MULTIPLIER;

  // 3. Calculate Character Risk Factor (Age, Health, Mental)
  const ageModifier = 1 + (talent.age - 17) / 50; // Increases cost by 2% per year after 17
  const healthModifier = 1 + (100 - talent.kesehatan) / 100; // Up to 2x cost at 0 health
  const mentalModifier = 1 + (100 - talent.mental) / 100; // Up to 2x cost at 0 mental
  const characterRisk = ageModifier * healthModifier * mentalModifier;

  // 4. Calculate Gross Cost
  const grossCost =
    (baseChangeCost + targetLevelCost) * rarityMultiplier * characterRisk;

  // 5. Calculate Discount Factor (Daya Pikat & Popularity)
  const discount = Math.min(
    0.3, // Max 30% discount
    talent.dayaPikat / 20000 + talent.popularitas / 2000
  );

  // 6. Final Cost Calculation
  const finalCost = Math.floor(grossCost * (1 - discount));

  return finalCost;
};

/**
 * Calculates the recovery duration in days for a surgery.
 * @param talent The talent undergoing surgery.
 * @param attributePath The nested path to the attribute.
 * @param currentValue The current value of the attribute.
 * @param targetValue The desired new value of the attribute.
 * @returns The number of days the talent will be unavailable.
 */
export const calculateRecoveryDays = (
  talent: Talent,
  attributePath: string,
  currentValue: number,
  targetValue: number
): number => {
  if (targetValue <= currentValue) return 0;

  const changeAmount = targetValue - currentValue;
  const statImportanceWeight =
    SURGERY_STAT_IMPORTANCE_WEIGHT[attributePath] ||
    SURGERY_STAT_IMPORTANCE_WEIGHT.default;
  const ageModifier = 1 + talent.age / 100; // Older talents recover slower

  const recovery =
    RECOVERY_BASE_DAYS + changeAmount * statImportanceWeight * ageModifier;

  return Math.ceil(recovery);
};

/**
 * Updates a nested property in an object immutably.
 * @param obj The original object.
 * @param path A string representing the path, e.g., 'intim.payudara.ukuran'.
 * @param value The new value.
 * @returns A new object with the updated value.
 */
export const updateNestedAttribute = <T extends object>(
  obj: T,
  path: string,
  value: number
): T => {
  const keys = path.split('.');
  // Create a deep copy to ensure immutability
  const newObj = JSON.parse(JSON.stringify(obj)) as T;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newObj;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;

  return newObj;
};
