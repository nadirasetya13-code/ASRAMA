import React, { useMemo } from 'react';
import { Talent } from '../types';
import { RARITY_CONFIG } from '../constants';
import { applyAgeAttributeModifiers } from '../services/localDataService';
import { useGameStore } from '../controllers/gameController';

// Import new sub-components
import TalentHeader from './talentProfile/TalentHeader';
import TalentInfoBlock from './talentProfile/TalentInfoBlock';
import TalentTariffs from './talentProfile/TalentTariffs';
import TalentEquipment from './talentProfile/TalentEquipment';
import TalentSkills from './talentProfile/TalentSkills';
import TalentStatsGroup from './talentProfile/TalentStatsGroup';
import TalentStory from './talentProfile/TalentStory';
import TalentActions from './talentProfile/TalentActions';

// Import ALL icons needed for the stats groups
import {
  StaminaIcon,
  PopularityIcon,
  BeautyIcon,
  MentalIcon,
  HIVIcon,
  HealthIcon,
  FallInLoveIcon,
  PregnancyIcon,
  HairStyleIcon,
  FaceShapeIcon,
  EyeShapeIcon,
  LipShapeIcon,
  NoseShapeIcon,
  HandShapeIcon,
  BodyWeightIcon,
  LegShapeIcon,
  ButtShapeIcon,
  PayudaraIcon,
  UkuranPayudaraIcon,
  BentukPayudaraIcon,
  KekenyalanPayudaraIcon,
  SensitivitasPutingIcon,
  UkuranAreolaIcon,
  WarnaPutingIcon,
  JarakPayudaraIcon,
  VaginaIcon,
  KedalamanVaginaIcon,
  KekencanganVaginaIcon,
  PelumasanVaginaIcon,
  GSpotIcon,
  ElastisitasVaginaIcon,
  AromaVaginaIcon,
  LabiaIcon,
  KlitorisIcon,
  UkuranKlitorisIcon,
  SensitivitasKlitorisIcon,
  AksesibilitasKlitorisIcon,
  KecepatanResponKlitorisIcon,
  TipeTudungKlitorisIcon,
  PembengkakanKlitorisIcon,
  DayaTahanKlitorisIcon,
} from './icons';

interface TalentProfileProps {
  talent: Talent;
}

const TalentProfile: React.FC<TalentProfileProps> = ({ talent }) => {
  const { closeViewingTalent } = useGameStore();
  const rarityConfig = RARITY_CONFIG[talent.rarity];

  // Performance Optimization: Memoize the expensive calculation
  const displayTalent = useMemo(() => applyAgeAttributeModifiers(talent), [
    talent,
  ]);

  // Prepare data arrays for each stats group
  const mainStats = [
    {
      id: 'stamina',
      label: 'Stamina',
      value: displayTalent.stamina,
      baseValue: talent.stamina,
      icon: <StaminaIcon className="w-4 h-4 text-red-400" />,
      color: 'text-red-400',
    },
    {
      id: 'popularitas',
      label: 'Popularitas',
      value: displayTalent.popularitas,
      baseValue: talent.popularitas,
      icon: <PopularityIcon className="w-4 h-4 text-yellow-400" />,
      color: 'text-yellow-400',
    },
    {
      id: 'kecantikan',
      label: 'Kecantikan',
      value: displayTalent.kecantikan,
      baseValue: talent.kecantikan,
      icon: <BeautyIcon className="w-4 h-4 text-pink-400" />,
      color: 'text-pink-400',
    },
    {
      id: 'mental',
      label: 'Mental',
      value: displayTalent.mental,
      baseValue: talent.mental,
      icon: <MentalIcon className="w-4 h-4 text-blue-400" />,
      color: 'text-blue-400',
    },
  ];

  const potensiStats = [
    {
      id: 'kesehatan',
      label: 'Kesehatan',
      value: talent.kesehatan,
      icon: <HealthIcon className="w-4 h-4 text-green-400" />,
      color: 'text-green-400',
    },
    {
      id: 'hiv',
      label: 'Potensi HIV/AIDS',
      value: talent.potensiHIVAIDS,
      icon: <HIVIcon className="w-4 h-4 text-yellow-500" />,
      color: 'text-yellow-500',
    },
    {
      id: 'love',
      label: 'Jatuh Cinta',
      value: talent.jatuhCinta,
      icon: <FallInLoveIcon className="w-4 h-4 text-rose-400" />,
      color: 'text-rose-400',
    },
    {
      id: 'pregnancy',
      label: 'Potensi Hamil',
      value: talent.potensiHamil,
      icon: <PregnancyIcon className="w-4 h-4 text-sky-400" />,
      color: 'text-sky-400',
    },
  ];

  const fisikStats = Object.entries(displayTalent.fisik).map(
    ([key, value]) => {
      const iconMap: {
        [key: string]: { icon: React.ReactNode; color: string; label: string };
      } = {
        gayaRambut: {
          icon: <HairStyleIcon className="w-4 h-4 text-orange-400" />,
          color: 'text-orange-400',
          label: 'Gaya Rambut',
        },
        bentukWajah: {
          icon: <FaceShapeIcon className="w-4 h-4 text-lime-400" />,
          color: 'text-lime-400',
          label: 'Bentuk Wajah',
        },
        bentukMata: {
          icon: <EyeShapeIcon className="w-4 h-4 text-cyan-400" />,
          color: 'text-cyan-400',
          label: 'Bentuk Mata',
        },
        bentukBibir: {
          icon: <LipShapeIcon className="w-4 h-4 text-rose-400" />,
          color: 'text-rose-400',
          label: 'Bentuk Bibir',
        },
        bentukHidung: {
          icon: <NoseShapeIcon className="w-4 h-4 text-stone-400" />,
          color: 'text-stone-400',
          label: 'Bentuk Hidung',
        },
        bentukTangan: {
          icon: <HandShapeIcon className="w-4 h-4 text-amber-400" />,
          color: 'text-amber-400',
          label: 'Bentuk Tangan',
        },
        beratBadan: {
          icon: <BodyWeightIcon className="w-4 h-4 text-teal-400" />,
          color: 'text-teal-400',
          label: 'Berat Badan',
        },
        bentukKaki: {
          icon: <LegShapeIcon className="w-4 h-4 text-indigo-400" />,
          color: 'text-indigo-400',
          label: 'Bentuk Kaki',
        },
        bentukPantat: {
          icon: <ButtShapeIcon className="w-4 h-4 text-fuchsia-400" />,
          color: 'text-fuchsia-400',
          label: 'Bentuk Pantat',
        },
      };
      return {
        id: key,
        label: iconMap[key].label,
        value,
        baseValue: talent.fisik[key as keyof typeof talent.fisik],
        icon: iconMap[key].icon,
        color: iconMap[key].color,
      };
    }
  );

  const payudaraStats = Object.entries(displayTalent.intim.payudara).map(
    ([key, value]) => {
      const iconMap: { [key: string]: { icon: React.ReactNode; label: string } } =
        {
          ukuran: {
            icon: <UkuranPayudaraIcon className="w-4 h-4 text-pink-400" />,
            label: 'Ukuran',
          },
          bentuk: {
            icon: <BentukPayudaraIcon className="w-4 h-4 text-pink-400" />,
            label: 'Bentuk',
          },
          kekenyalan: {
            icon: <KekenyalanPayudaraIcon className="w-4 h-4 text-pink-400" />,
            label: 'Kekenyalan',
          },
          sensitivitasPuting: {
            icon: <SensitivitasPutingIcon className="w-4 h-4 text-pink-400" />,
            label: 'Sensitivitas Puting',
          },
          ukuranAreola: {
            icon: <UkuranAreolaIcon className="w-4 h-4 text-pink-400" />,
            label: 'Ukuran Areola',
          },
          warnaPuting: {
            icon: <WarnaPutingIcon className="w-4 h-4 text-pink-400" />,
            label: 'Warna Puting',
          },
          jarak: {
            icon: <JarakPayudaraIcon className="w-4 h-4 text-pink-400" />,
            label: 'Jarak',
          },
        };
      return {
        id: key,
        label: iconMap[key].label,
        value,
        baseValue:
          talent.intim.payudara[key as keyof typeof talent.intim.payudara],
        icon: iconMap[key].icon,
        color: 'text-pink-400',
      };
    }
  );

  const vaginaStats = Object.entries(displayTalent.intim.vagina).map(
    ([key, value]) => {
      const iconMap: { [key: string]: { icon: React.ReactNode; label: string } } =
        {
          kedalaman: {
            icon: <KedalamanVaginaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Kedalaman',
          },
          kekencangan: {
            icon: <KekencanganVaginaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Kekencangan',
          },
          pelumasan: {
            icon: <PelumasanVaginaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Pelumasan',
          },
          sensitivitasGSpot: {
            icon: <GSpotIcon className="w-4 h-4 text-rose-400" />,
            label: 'Sensitivitas G-Spot',
          },
          elastisitas: {
            icon: <ElastisitasVaginaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Elastisitas',
          },
          aroma: {
            icon: <AromaVaginaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Aroma',
          },
          labia: {
            icon: <LabiaIcon className="w-4 h-4 text-rose-400" />,
            label: 'Bentuk Labia',
          },
        };
      return {
        id: key,
        label: iconMap[key].label,
        value,
        baseValue: talent.intim.vagina[key as keyof typeof talent.intim.vagina],
        icon: iconMap[key].icon,
        color: 'text-rose-400',
      };
    }
  );

  const klitorisStats = Object.entries(displayTalent.intim.klitoris).map(
    ([key, value]) => {
      const iconMap: { [key: string]: { icon: React.ReactNode; label: string } } =
        {
          ukuran: {
            icon: <UkuranKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Ukuran',
          },
          sensitivitas: {
            icon: <SensitivitasKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Sensitivitas',
          },
          aksesibilitas: {
            icon: <AksesibilitasKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Aksesibilitas',
          },
          kecepatanRespon: {
            icon: <KecepatanResponKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Kecepatan Respon',
          },
          tipeTudung: {
            icon: <TipeTudungKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Tipe Tudung',
          },
          pembengkakan: {
            icon: <PembengkakanKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Potensi Pembengkakan',
          },
          dayaTahan: {
            icon: <DayaTahanKlitorisIcon className="w-4 h-4 text-purple-400" />,
            label: 'Daya Tahan',
          },
        };
      return {
        id: key,
        label: iconMap[key].label,
        value,
        baseValue:
          talent.intim.klitoris[key as keyof typeof talent.intim.klitoris],
        icon: iconMap[key].icon,
        color: 'text-purple-400',
      };
    }
  );

  return (
    <>
      <TalentHeader
        talent={talent}
        rarityConfig={rarityConfig}
        onClose={closeViewingTalent}
      />

      <div className="flex-grow p-1.5 overflow-y-auto text-light-text">
        <TalentInfoBlock talent={talent} />
        <TalentTariffs talent={talent} />
        <TalentEquipment talent={talent} />
        <TalentStory story={talent.cerita} />
        <TalentSkills talent={talent} />

        <div className="mt-2">
          <TalentStatsGroup title="Statistik Utama" stats={mainStats} />
        </div>
        <div className="mt-2">
          <TalentStatsGroup title="Potensi & Kondisi" stats={potensiStats} />
        </div>
        <div className="mt-2">
          <TalentStatsGroup title="Atribut Fisik" stats={fisikStats} />
        </div>

        {/* Intim Attributes Container */}
        <div className="p-2 mt-2 space-y-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
          <h3 className="pb-1 -mt-1 text-xs font-serif font-bold text-center border-b-2 border-brand-pink/50">
            Atribut Intim
          </h3>
          <TalentStatsGroup
            title="Payudara"
            titleIcon={<PayudaraIcon className="w-3.5 h-3.5" />}
            stats={payudaraStats}
            isSubgroup={true}
          />
          <TalentStatsGroup
            title="Vagina"
            titleIcon={<VaginaIcon className="w-3.5 h-3.5" />}
            stats={vaginaStats}
            isSubgroup={true}
          />
          <TalentStatsGroup
            title="Klitoris"
            titleIcon={<KlitorisIcon className="w-3.5 h-3.5" />}
            stats={klitorisStats}
            isSubgroup={true}
          />
        </div>
      </div>
      <TalentActions talent={talent} />
    </>
  );
};

export default React.memo(TalentProfile);
