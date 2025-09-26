import { describe, it, expect } from 'vitest';
import { formatRupiah, calculateAverageFisik } from './localDataService';
import { FisikAttributes } from '../types';

describe('localDataService', () => {
  describe('formatRupiah', () => {
    it('should format a number into IDR currency format without decimals', () => {
      expect(formatRupiah(1000)).toBe('Rp1.000');
    });

    it('should format a large number with correct separators', () => {
      expect(formatRupiah(123456789)).toBe('Rp123.456.789');
    });

    it('should format zero correctly', () => {
      expect(formatRupiah(0)).toBe('Rp0');
    });
  });

  describe('calculateAverageFisik', () => {
    it('should calculate the average of fisik attributes correctly and round it', () => {
      const fisik: FisikAttributes = {
        gayaRambut: 80,
        bentukWajah: 70,
        bentukMata: 90,
        bentukBibir: 75,
        bentukHidung: 65,
        bentukTangan: 85,
        beratBadan: 60,
        bentukKaki: 88,
        bentukPantat: 92,
      };
      // Sum = 705, Count = 9, Average = 78.333... -> 78
      expect(calculateAverageFisik(fisik)).toBe(78);
    });

    it('should return 0 if there are no attributes', () => {
      const emptyFisik = {} as FisikAttributes;
      expect(calculateAverageFisik(emptyFisik)).toBe(0);
    });

    it('should handle attributes with value 0', () => {
      const fisik: FisikAttributes = {
        gayaRambut: 0,
        bentukWajah: 0,
        bentukMata: 0,
        bentukBibir: 0,
        bentukHidung: 0,
        bentukTangan: 0,
        beratBadan: 0,
        bentukKaki: 0,
        bentukPantat: 0,
      };
      expect(calculateAverageFisik(fisik)).toBe(0);
    });
  });
});
