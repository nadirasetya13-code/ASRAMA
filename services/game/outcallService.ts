import { Talent, Guest, MatchResult, TalentImpact } from '../../types';
import { GUEST_TIER_CONFIG, ENERGY_COST_PER_SESSION } from '../../constants';
import { OUTCALL_CONFIG, OutcallType } from '../../constants/outcall';
import { calculateTalentImpact } from './matchService';
import { getRandomNumber } from './utils';

/**
 * Calculates the results of an outcall session based on a complex, multi-layered formula.
 * This function embodies the high-risk, high-reward nature of outcalls.
 * @param talent The talent performing the outcall.
 * @param guest The guest hiring the talent.
 * @param type The type of outcall service.
 * @returns A partial MatchResult object and the timestamp until the talent is unavailable.
 */
export const calculateOutcallResult = (
  talent: Talent,
  guest: Guest,
  type: OutcallType
): { result: Omit<MatchResult, 'sessionId' | 'usedRoomId' | 'roomBonuses' | 'newBuff'>, unavailableUntil: number } => {
  
  const config = OUTCALL_CONFIG[type];
  const guestTierMultiplier = GUEST_TIER_CONFIG[guest.tier]?.multiplier || 1.0;

  // STEP 1: Calculate Tariff (Pendapatan Kotor)
  // Assume high satisfaction for outcalls as they are premium services
  const satisfactionScore = 90; 

  let financialMultiplier = 1.0;
  if (guest.personalityTraits.includes('Royal')) financialMultiplier = 1.5;
  if (guest.personalityTraits.includes('Pelit')) financialMultiplier = 0.6;

  // Start with a base session earning potential
  const baseSessionPotential = talent.tariffs.layanan * guestTierMultiplier * (satisfactionScore / 100) * financialMultiplier;
  
  // Add an exponential Daya Pikat premium bonus, making elite talents exceptionally valuable for outcalls
  const dayaPikatPremium = 1 + Math.pow(talent.dayaPikat / 8000, 1.5);
  
  const pendapatanKotor = Math.floor(baseSessionPotential * config.earningsMultiplier * dayaPikatPremium);

  // STEP 2: Calculate Costs for Agency & Talent
  const totalBiaya = talent.tariffs.perawatan + talent.tariffs.kesehatan + talent.tariffs.kb;
  const labaBersih = pendapatanKotor - totalBiaya;
  
  // Talent's share is increased for riskier assignments
  const talentSharePercentage = 0.3 + (config.riskMultiplier - 1) * 0.2; // Base 30%, more risk = more share
  const talentEarnings = labaBersih > 0 ? Math.floor(labaBersih * talentSharePercentage) : 0;
  const agencyProfit = labaBersih - talentEarnings;

  // STEP 3: Calculate Impact on Talent
  // Use the standard talentImpact as a baseline, then apply outcall-specific multipliers.
  // Outcalls are always 'unprotected' (condomUsed = null) by default.
  const baseImpact = calculateTalentImpact(talent, guest, {} as any, null); // Pass empty room as it's not relevant
  
  const talentImpact: TalentImpact = {
      kesehatanChange: Math.round(baseImpact.kesehatanChange * config.riskMultiplier),
      mentalChange: Math.round(baseImpact.mentalChange * config.riskMultiplier),
      energyChange: Math.round(ENERGY_COST_PER_SESSION * config.costMultiplier),
      hivRiskIncrease: Math.round(baseImpact.hivRiskIncrease * config.riskMultiplier),
      pregnancyRiskIncrease: Math.round(baseImpact.pregnancyRiskIncrease * config.riskMultiplier),
  };

  // STEP 4: Calculate Unavailability Period
  const unavailabilityMs = config.unavailabilityDays * 24 * 60 * 60 * 1000;
  const unavailableUntil = Date.now() + unavailabilityMs;
  
  // STEP 5: Compile Final Result Object
  const result: Omit<MatchResult, 'sessionId' | 'usedRoomId' | 'roomBonuses' | 'newBuff'> = {
    talentId: talent.id,
    talentName: talent.name,
    talentImageUrl: talent.imageUrl,
    guestName: guest.name,
    guestImageUrl: guest.imageUrl,
    success: true,
    message: `Sesi Luar: ${config.label}`,
    pendapatanKotor,
    biayaPerawatan: totalBiaya,
    labaBersih: agencyProfit,
    reputationChange: Math.ceil(15 * guestTierMultiplier * (config.unavailabilityDays / 2)),
    xpGained: getRandomNumber(300, 800),
    talentEarnings,
    satisfactionScore,
    talentImpact,
  };

  return { result, unavailableUntil };
};