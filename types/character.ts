export interface FisikAttributes {
  [key: string]: number;
  gayaRambut: number;
  bentukWajah: number;
  bentukMata: number;
  bentukBibir: number;
  bentukHidung: number;
  bentukTangan: number;
  beratBadan: number;
  bentukKaki: number;
  bentukPantat: number;
}

export interface PayudaraAttributes {
  [key: string]: number;
  ukuran: number;
  bentuk: number;
  kekenyalan: number;
  sensitivitasPuting: number;
  ukuranAreola: number;
  warnaPuting: number;
  jarak: number;
  bentukPuting: number;
  warnaAreola: number;
  kelembutanKulit: number;
}

export interface VaginaAttributes {
  [key: string]: number;
  kedalaman: number;
  kekencangan: number;
  pelumasan: number;
  sensitivitasGSpot: number;
  elastisitas: number;
  aroma: number;
  labia: number;
  tipeHymen: number;
  kondisiDindingVagina: number;
  kekuatanOtotPC: number;
  potensiOrgasmeMultiple: number;
  volumeEjakulasiWanita: number;
}

export interface KlitorisAttributes {
  [key: string]: number;
  ukuran: number;
  sensitivitas: number;
  aksesibilitas: number;
  kecepatanRespon: number;
  tipeTudung: number;
  pembengkakan: number;
  dayaTahan: number;
  posisi: number;
}

export interface AnalAttributes {
  [key: string]: number;
  kekencanganAnus: number;
  elastisitasAnus: number;
  warnaAnus: number;
  kebersihan: number;
  sensitivitasAnal: number;
}

export interface MulutAttributes {
  [key: string]: number;
  keterampilanLidah: number;
  kedalamanTenggorokan: number;
  produksiSaliva: number;
}

export interface BokongAttributes {
  [key: string]: number;
  bentukPantat: number;
  kekencangan: number;
  kehalusanKulit: number;
  responSpank: number;
}

export interface IntimAttributes {
  payudara: PayudaraAttributes;
  vagina: VaginaAttributes;
  klitoris: KlitorisAttributes;
  anal: AnalAttributes;
  mulut: MulutAttributes;
  bokong: BokongAttributes;
}