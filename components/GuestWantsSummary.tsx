import React from 'react';
import { Guest, GuestWant } from '../types';
import {
  // Main Stats
  BeautyIcon,
  MentalIcon,
  StaminaIcon,
  PopularityIcon,
  // Fisik
  ButtShapeIcon,
  LipShapeIcon,
  HairStyleIcon,
  FaceShapeIcon,
  EyeShapeIcon,
  NoseShapeIcon,
  HandShapeIcon,
  BodyWeightIcon,
  LegShapeIcon,
  // Payudara
  UkuranPayudaraIcon,
  BentukPayudaraIcon,
  KekenyalanPayudaraIcon,
  SensitivitasPutingIcon,
  // Vagina
  KekencanganVaginaIcon,
  PelumasanVaginaIcon,
  GSpotIcon,
  KedalamanVaginaIcon,
  ElastisitasVaginaIcon,
  AromaVaginaIcon,
  // Klitoris
  SensitivitasKlitorisIcon,
  UkuranKlitorisIcon,
  KecepatanResponKlitorisIcon,
  // Mulut
  KeterampilanLidahIcon,
  // Anal
  KekencanganAnusIcon,
  // Bokong
  KekencanganBokongIcon,
  // Misc
  TargetIcon,
  PositionIcon,
} from './icons';

interface GuestWantsSummaryProps {
  guest: Guest;
}

// A comprehensive, nested map to avoid attribute name collisions between categories.
const detailsMap: {
  [category: string]: {
    [attribute: string]: {
      icon: React.FC<{ className?: string }>;
      label: string;
    };
  };
} = {
  main: {
    kecantikan: { icon: BeautyIcon, label: 'Kecantikan' },
    mental: { icon: MentalIcon, label: 'Mental' },
    stamina: { icon: StaminaIcon, label: 'Stamina' },
    popularitas: { icon: PopularityIcon, label: 'Popularitas' },
  },
  fisik: {
    gayaRambut: { icon: HairStyleIcon, label: 'Gaya Rambut' },
    bentukWajah: { icon: FaceShapeIcon, label: 'Bentuk Wajah' },
    bentukMata: { icon: EyeShapeIcon, label: 'Bentuk Mata' },
    bentukBibir: { icon: LipShapeIcon, label: 'Bentuk Bibir' },
    bentukHidung: { icon: NoseShapeIcon, label: 'Bentuk Hidung' },
    bentukTangan: { icon: HandShapeIcon, label: 'Bentuk Tangan' },
    beratBadan: { icon: BodyWeightIcon, label: 'Berat Badan' },
    bentukKaki: { icon: LegShapeIcon, label: 'Bentuk Kaki' },
    bentukPantat: { icon: ButtShapeIcon, label: 'Bentuk Pantat' },
  },
  payudara: {
    ukuran: { icon: UkuranPayudaraIcon, label: 'Ukuran Payudara' },
    bentuk: { icon: BentukPayudaraIcon, label: 'Bentuk Payudara' },
    kekenyalan: { icon: KekenyalanPayudaraIcon, label: 'Kekenyalan Payudara' },
    sensitivitasPuting: {
      icon: SensitivitasPutingIcon,
      label: 'Sensitivitas Puting',
    },
  },
  vagina: {
    kedalaman: { icon: KedalamanVaginaIcon, label: 'Kedalaman Vagina' },
    kekencangan: { icon: KekencanganVaginaIcon, label: 'Kekencangan Vagina' },
    pelumasan: { icon: PelumasanVaginaIcon, label: 'Pelumasan Vagina' },
    sensitivitasGSpot: { icon: GSpotIcon, label: 'Sensitivitas G-Spot' },
    elastisitas: { icon: ElastisitasVaginaIcon, label: 'Elastisitas Vagina' },
    aroma: { icon: AromaVaginaIcon, label: 'Aroma Vagina' },
  },
  klitoris: {
    ukuran: { icon: UkuranKlitorisIcon, label: 'Ukuran Klitoris' },
    sensitivitas: {
      icon: SensitivitasKlitorisIcon,
      label: 'Sensitivitas Klitoris',
    },
    kecepatanRespon: {
      icon: KecepatanResponKlitorisIcon,
      label: 'Kecepatan Respon Klitoris',
    },
  },
  mulut: {
    keterampilanLidah: {
      icon: KeterampilanLidahIcon,
      label: 'Keterampilan Lidah',
    },
  },
  anal: {
    kekencanganAnus: { icon: KekencanganAnusIcon, label: 'Kekencangan Anus' },
  },
  bokong: {
    kekencangan: { icon: KekencanganBokongIcon, label: 'Kekencangan Bokong' },
  },
};

const getWantDetails = (
  want: GuestWant
): { icon: React.FC<{ className?: string }>; label: string } => {
  if (want.category === 'position') {
    return { icon: PositionIcon, label: want.label };
  }

  // Use the nested map for precise matching
  const categoryMap = detailsMap[want.category];
  if (categoryMap) {
    const detail = categoryMap[want.attribute];
    if (detail) {
      return detail;
    }
  }
  // Fallback: If category specific search fails, try to find attribute in any category
  for (const cat in detailsMap) {
    if (detailsMap[cat][want.attribute]) {
      return detailsMap[cat][want.attribute];
    }
  }

  // Fallback for any unmapped attributes
  return { icon: TargetIcon, label: want.label };
};

const GuestWantsSummary: React.FC<GuestWantsSummaryProps> = ({ guest }) => {
  if (!guest.wants || guest.wants.length === 0) {
    return (
      <div className="p-3 text-center rounded-xl bg-black/20">
        <p className="text-sm font-serif text-light-text">
          Tamu ini tidak punya permintaan khusus.
        </p>
        <p className="mt-1 text-xs text-subtle-text">
          Pilih talenta terbaikmu secara umum.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 text-sm font-serif font-bold text-center border-b text-light-text border-brand-pink/50">
        Permintaan Tamu
      </h3>
      {guest.wants.map((want, index) => {
        const { icon: Icon, label } = getWantDetails(want);
        const isImportant = want.importance > 1.2;
        return (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              isImportant ? 'bg-amber-900/40' : 'bg-gray-800/50'
            }`}
          >
            <Icon
              className={`flex-shrink-0 w-7 h-7 ${
                isImportant ? 'text-amber-400' : 'text-purple-400'
              }`}
            />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-light-text">
                  {label}
                </span>
                {isImportant && (
                  <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    PENTING
                  </span>
                )}
              </div>
              {want.category === 'position' ? (
                <p className="text-xs text-subtle-text">
                  Menginginkan keahlian ini.
                </p>
              ) : (
                <p className="text-xs text-subtle-text">
                  Harus{' '}
                  <span className="text-lg font-bold text-white">
                    {want.operator} {want.value}
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(GuestWantsSummary);