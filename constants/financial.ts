// --- FINANCIAL SYSTEM ---
export const ATM_TAX_BRACKETS: { upto: number; rate: number }[] = [
  { upto: 1000000, rate: 0.02 }, // 2%
  { upto: 10000000, rate: 0.05 }, // 5%
  { upto: 100000000, rate: 0.1 }, // 10%
  { upto: Infinity, rate: 0.15 }, // 15%
];
