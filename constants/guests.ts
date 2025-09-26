// Guest Tier System
export const GUEST_TIER_CONFIG: Record<
  number,
  { name: string; color: string; multiplier: number }
> = {
  1: { name: 'Biasa', color: 'border-slate-400', multiplier: 1.0 },
  2: { name: 'Menengah', color: 'border-sky-500', multiplier: 1.5 },
  3: { name: 'Berada', color: 'border-emerald-500', multiplier: 2.0 },
  4: { name: 'VIP', color: 'border-amber-500', multiplier: 2.75 },
  5: { name: 'Prioritas', color: 'border-rose-500', multiplier: 4.0 },
  6: { name: 'Elit', color: 'border-indigo-600', multiplier: 6.0 },
  7: { name: 'Sultan', color: 'border-fuchsia-600', multiplier: 9.0 },
  8: { name: 'Dewa', color: 'border-red-700', multiplier: 15.0 },
};

// Reputation thresholds for unlocking better guest tiers
export const GUEST_TIER_REPUTATION_THRESHOLDS = {
  2: 501,
  3: 1501,
  4: 3001,
  5: 5001,
  6: 8001,
  7: 12001,
  8: 20001,
  softCap: 30001, // After this, distribution is at its best
};
