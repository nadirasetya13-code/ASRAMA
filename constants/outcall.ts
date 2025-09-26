// All values are multipliers of a standard session's potential
export type OutcallType = 'Jam' | 'Hari' | 'Minggu';

export const OUTCALL_CONFIG: Record<
  OutcallType,
  {
    costMultiplier: number;
    earningsMultiplier: number;
    unavailabilityDays: number;
    riskMultiplier: number;
    label: string;
  }
> = {
  Jam: {
    costMultiplier: 1.5, // Energy/Mental cost
    earningsMultiplier: 3, // Gross earnings
    unavailabilityDays: 1, // Becomes available next day
    riskMultiplier: 1.5, // Higher risk for short, anonymous encounters
    label: 'Sewa per Jam',
  },
  Hari: {
    costMultiplier: 2.0,
    earningsMultiplier: 10,
    unavailabilityDays: 2, // Unavailable for tonight and all of tomorrow
    riskMultiplier: 1.0, // Standard risk
    label: 'Sewa Harian',
  },
  Minggu: {
    costMultiplier: 2.5,
    earningsMultiplier: 60,
    unavailabilityDays: 8, // Unavailable for tonight and the next 7 days
    riskMultiplier: 0.7, // Lower risk due to high-value client providing better environment
    label: 'Sewa Mingguan (BO)',
  },
};
