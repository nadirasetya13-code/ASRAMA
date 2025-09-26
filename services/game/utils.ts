import { ATM_TAX_BRACKETS } from "../../constants";

// --- Helper Functions ---
export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount).replace('\u00A0', ' '); // Replace non-breaking space with a regular space
};

export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const average = (obj: Record<string, number>): number => {
    const values = Object.values(obj);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
};

// --- New Financial System ---
export const calculateAtmTax = (amount: number): { tax: number; netAmount: number } => {
    if (amount <= 0) {
        return { tax: 0, netAmount: 0 };
    }
    
    const bracket = ATM_TAX_BRACKETS.find(b => amount <= b.upto);
    const rate = bracket ? bracket.rate : ATM_TAX_BRACKETS[ATM_TAX_BRACKETS.length - 1].rate;
    
    const tax = Math.floor(amount * rate);
    const netAmount = amount - tax;

    return { tax, netAmount };
};