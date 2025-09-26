import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { Talent, Rarity } from '../types';
import {
  calculateSurgeryCost,
  calculateRecoveryDays,
  formatRupiah,
} from '../services/localDataService';
import { RARITY_CONFIG } from '../constants';
import {
  // Main
  BeautyIcon,
  // Fisik
  HairStyleIcon,
  FaceShapeIcon,
  EyeShapeIcon,
  LipShapeIcon,
  NoseShapeIcon,
  HandShapeIcon,
  BodyWeightIcon,
  LegShapeIcon,
  // Payudara
  PayudaraIcon,
  UkuranPayudaraIcon,
  BentukPayudaraIcon,
  KekenyalanPayudaraIcon,
  SensitivitasPutingIcon,
  UkuranAreolaIcon,
  WarnaPutingIcon,
  JarakPayudaraIcon,
  BentukPutingIcon,
  WarnaAreolaIcon,
  KelembutanKulitIcon,
  // Vagina
  VaginaIcon,
  KedalamanVaginaIcon,
  KekencanganVaginaIcon,
  PelumasanVaginaIcon,
  GSpotIcon,
  ElastisitasVaginaIcon,
  AromaVaginaIcon,
  LabiaIcon,
  TipeHymenIcon,
  KondisiDindingIcon,
  OtotPCIcon,
  OrgasmeMultipleIcon,
  EjakulasiWanitaIcon,
  // Klitoris
  KlitorisIcon,
  UkuranKlitorisIcon,
  SensitivitasKlitorisIcon,
  AksesibilitasKlitorisIcon,
  KecepatanResponKlitorisIcon,
  TipeTudungKlitorisIcon,
  PembengkakanKlitorisIcon,
  DayaTahanKlitorisIcon,
  PosisiKlitorisIcon,
  // Anal
  AnalIcon,
  KekencanganAnusIcon,
  ElastisitasAnusIcon,
  WarnaAnusIcon,
  KebersihanAnusIcon,
  SensitivitasAnalIcon,
  // Mulut
  MulutIcon,
  KeterampilanLidahIcon,
  KedalamanTenggorokanIcon,
  ProduksiSalivaIcon,
  // Bokong
  BokongIcon,
  ButtShapeIcon,
  KekencanganBokongIcon,
  KehalusanKulitBokongIcon,
  ResponSpankIcon,
  // UI
  ChevronDownIcon,
  LoadingSpinner,
  MoneyIcon,
  ClinicIcon,
} from './icons';

// --- Static Attribute Group Definitions (Refactored for cleaner code) ---
const mainAttributes = [
  {
    path: 'kecantikan',
    label: 'Kecantikan Wajah',
    icon: <BeautyIcon className="w-4 h-4 text-pink-400" />,
  },
];

const fisikAttributes = [
  {
    path: 'fisik.gayaRambut',
    label: 'Gaya Rambut',
    icon: <HairStyleIcon className="w-4 h-4 text-orange-400" />,
  },
  {
    path: 'fisik.bentukWajah',
    label: 'Bentuk Wajah',
    icon: <FaceShapeIcon className="w-4 h-4 text-lime-400" />,
  },
  {
    path: 'fisik.bentukMata',
    label: 'Bentuk Mata',
    icon: <EyeShapeIcon className="w-4 h-4 text-cyan-400" />,
  },
  {
    path: 'fisik.bentukBibir',
    label: 'Bentuk Bibir',
    icon: <LipShapeIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'fisik.bentukHidung',
    label: 'Bentuk Hidung',
    icon: <NoseShapeIcon className="w-4 h-4 text-stone-400" />,
  },
  {
    path: 'fisik.bentukTangan',
    label: 'Bentuk Tangan',
    icon: <HandShapeIcon className="w-4 h-4 text-amber-400" />,
  },
  {
    path: 'fisik.beratBadan',
    label: 'Distribusi Lemak (Berat Badan)',
    icon: <BodyWeightIcon className="w-4 h-4 text-teal-400" />,
  },
  {
    path: 'fisik.bentukKaki',
    label: 'Bentuk Kaki',
    icon: <LegShapeIcon className="w-4 h-4 text-indigo-400" />,
  },
];

const payudaraAttributes = [
  {
    path: 'intim.payudara.ukuran',
    label: 'Ukuran Payudara',
    icon: <UkuranPayudaraIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.bentuk',
    label: 'Bentuk Payudara',
    icon: <BentukPayudaraIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.kekenyalan',
    label: 'Kekenyalan Payudara',
    icon: <KekenyalanPayudaraIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.sensitivitasPuting',
    label: 'Sensitivitas Puting',
    icon: <SensitivitasPutingIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.ukuranAreola',
    label: 'Ukuran Areola',
    icon: <UkuranAreolaIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.warnaPuting',
    label: 'Warna Puting',
    icon: <WarnaPutingIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.jarak',
    label: 'Jarak Antar Payudara',
    icon: <JarakPayudaraIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.bentukPuting',
    label: 'Bentuk Puting',
    icon: <BentukPutingIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.warnaAreola',
    label: 'Warna Areola',
    icon: <WarnaAreolaIcon className="w-4 h-4 text-pink-400" />,
  },
  {
    path: 'intim.payudara.kelembutanKulit',
    label: 'Kelembutan Kulit Payudara',
    icon: <KelembutanKulitIcon className="w-4 h-4 text-pink-400" />,
  },
];

const vaginaAttributes = [
  {
    path: 'intim.vagina.kedalaman',
    label: 'Kedalaman Vagina',
    icon: <KedalamanVaginaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.kekencangan',
    label: 'Kekencangan Vagina',
    icon: <KekencanganVaginaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.pelumasan',
    label: 'Tingkat Pelumasan',
    icon: <PelumasanVaginaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.sensitivitasGSpot',
    label: 'Sensitivitas G-Spot',
    icon: <GSpotIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.elastisitas',
    label: 'Elastisitas Vagina',
    icon: <ElastisitasVaginaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.aroma',
    label: 'Aroma Alami Vagina',
    icon: <AromaVaginaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.labia',
    label: 'Bentuk Labia',
    icon: <LabiaIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.tipeHymen',
    label: 'Rekonstruksi Hymen',
    icon: <TipeHymenIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.kondisiDindingVagina',
    label: 'Tekstur Dinding Vagina',
    icon: <KondisiDindingIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.kekuatanOtotPC',
    label: 'Kekuatan Otot PC',
    icon: <OtotPCIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.potensiOrgasmeMultiple',
    label: 'Potensi Orgasme Ganda',
    icon: <OrgasmeMultipleIcon className="w-4 h-4 text-rose-400" />,
  },
  {
    path: 'intim.vagina.volumeEjakulasiWanita',
    label: 'Volume Ejakulasi Wanita',
    icon: <EjakulasiWanitaIcon className="w-4 h-4 text-rose-400" />,
  },
];

const klitorisAttributes = [
  {
    path: 'intim.klitoris.ukuran',
    label: 'Ukuran Klitoris',
    icon: <UkuranKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.sensitivitas',
    label: 'Sensitivitas Klitoris',
    icon: <SensitivitasKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.aksesibilitas',
    label: 'Aksesibilitas Klitoris',
    icon: <AksesibilitasKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.kecepatanRespon',
    label: 'Kecepatan Respon',
    icon: <KecepatanResponKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.tipeTudung',
    label: 'Bentuk Tudung Klitoris',
    icon: <TipeTudungKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.pembengkakan',
    label: 'Potensi Pembengkakan',
    icon: <PembengkakanKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.dayaTahan',
    label: 'Daya Tahan Stimulasi',
    icon: <DayaTahanKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
  {
    path: 'intim.klitoris.posisi',
    label: 'Posisi Klitoris',
    icon: <PosisiKlitorisIcon className="w-4 h-4 text-purple-400" />,
  },
];

const bokongAttributes = [
  {
    path: 'intim.bokong.bentukPantat',
    label: 'Bentuk Pantat',
    icon: <ButtShapeIcon className="w-4 h-4 text-fuchsia-400" />,
  },
  {
    path: 'intim.bokong.kekencangan',
    label: 'Kekencangan Bokong',
    icon: <KekencanganBokongIcon className="w-4 h-4 text-fuchsia-400" />,
  },
  {
    path: 'intim.bokong.kehalusanKulit',
    label: 'Kehalusan Kulit Bokong',
    icon: <KehalusanKulitBokongIcon className="w-4 h-4 text-fuchsia-400" />,
  },
  {
    path: 'intim.bokong.responSpank',
    label: 'Respon Spank',
    icon: <ResponSpankIcon className="w-4 h-4 text-fuchsia-400" />,
  },
];

const analAttributes = [
  {
    path: 'intim.anal.kekencanganAnus',
    label: 'Kekencangan Anus',
    icon: <KekencanganAnusIcon className="w-4 h-4 text-orange-400" />,
  },
  {
    path: 'intim.anal.elastisitasAnus',
    label: 'Elastisitas Anus',
    icon: <ElastisitasAnusIcon className="w-4 h-4 text-orange-400" />,
  },
  {
    path: 'intim.anal.warnaAnus',
    label: 'Warna Anus',
    icon: <WarnaAnusIcon className="w-4 h-4 text-orange-400" />,
  },
  {
    path: 'intim.anal.kebersihan',
    label: 'Kebersihan Anal',
    icon: <KebersihanAnusIcon className="w-4 h-4 text-orange-400" />,
  },
  {
    path: 'intim.anal.sensitivitasAnal',
    label: 'Sensitivitas Anal',
    icon: <SensitivitasAnalIcon className="w-4 h-4 text-orange-400" />,
  },
];

const mulutAttributes = [
  {
    path: 'intim.mulut.keterampilanLidah',
    label: 'Keterampilan Lidah',
    icon: <KeterampilanLidahIcon className="w-4 h-4 text-red-400" />,
  },
  {
    path: 'intim.mulut.kedalamanTenggorokan',
    label: 'Kedalaman Tenggorokan',
    icon: <KedalamanTenggorokanIcon className="w-4 h-4 text-red-400" />,
  },
  {
    path: 'intim.mulut.produksiSaliva',
    label: 'Produksi Saliva',
    icon: <ProduksiSalivaIcon className="w-4 h-4 text-red-400" />,
  },
];

// --- Attribute Row Component ---
interface AttributeRowProps {
  talent: Talent;
  attributePath: string;
  label: string;
  icon: React.ReactNode;
  lockedAttribute: string | null;
  setLockedAttribute: (path: string | null) => void;
}

const AttributeRow: React.FC<AttributeRowProps> = ({
  talent,
  attributePath,
  label,
  icon,
  lockedAttribute,
  setLockedAttribute,
}) => {
  const { performSurgery } = useGameStore.getState();
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);

  const getAttributeValue = (obj: object, path: string) =>
    path.split('.').reduce((o, k) => (o as any)?.[k], obj);
  const initialValue = getAttributeValue(talent, attributePath) as number;

  const [targetValue, setTargetValue] = useState(initialValue);

  // Reset target value if the underlying talent data changes
  useEffect(() => {
    setTargetValue(initialValue);
  }, [initialValue]);

  const cost = useMemo(
    () =>
      calculateSurgeryCost(talent, attributePath, initialValue, targetValue),
    [talent, attributePath, initialValue, targetValue]
  );
  const recoveryDays = useMemo(
    () =>
      calculateRecoveryDays(
        talent,
        attributePath,
        initialValue,
        targetValue
      ),
    [talent, attributePath, initialValue, targetValue]
  );

  const canAfford = money >= cost;
  const hasChanged = targetValue > initialValue;
  const isEditing = lockedAttribute === attributePath;
  const isLockedByOther = lockedAttribute !== null && !isEditing;

  const handleValueChange = (newValue: number) => {
    const clampedValue = Math.max(initialValue, Math.min(100, newValue));
    setTargetValue(clampedValue);
  };

  const handleSurgery = () => {
    if (canAfford && hasChanged && !isProcessing) {
      performSurgery(talent.id, attributePath, targetValue);
    }
  };

  const handleCancel = () => {
    setTargetValue(initialValue);
    setLockedAttribute(null);
  };

  return (
    <div
      className={`p-1.5 bg-black/20 rounded-lg transition-all duration-300 ${
        isLockedByOther ? 'opacity-50 pointer-events-none' : ''
      } ${isEditing ? 'shadow-lg shadow-purple-500/20' : ''}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-5">{icon}</div>
        <span className="flex-1 text-xs font-semibold">{label}</span>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleValueChange(targetValue - 1)}
              disabled={targetValue <= initialValue}
              className="px-2 py-0.5 bg-gray-600 rounded disabled:opacity-50"
            >
              -
            </button>
            <span className="w-16 text-center font-mono font-bold">
              {initialValue} &rarr; {targetValue}
            </span>
            <button
              onClick={() => handleValueChange(targetValue + 1)}
              disabled={targetValue >= 100}
              className="px-2 py-0.5 bg-gray-600 rounded disabled:opacity-50"
            >
              +
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold">{initialValue}</span>
            <button
              onClick={() => setLockedAttribute(attributePath)}
              disabled={isProcessing}
              className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Ubah
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 pt-1.5 border-t border-white/10 overflow-hidden"
          >
            <div className="flex justify-between items-center text-xs">
              <div className="text-gray-400">
                Biaya:{' '}
                <span
                  className={canAfford ? 'text-yellow-400' : 'text-red-500'}
                >
                  {formatRupiah(cost)}
                </span>
                <span className="ml-2">| Pulih:</span>
                <span className="text-blue-400"> {recoveryDays} hari</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleSurgery}
                  disabled={!canAfford || isProcessing || !hasChanged}
                  className="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-500 w-20 text-center"
                >
                  {isProcessing ? (
                    <LoadingSpinner className="w-4 h-4 mx-auto" />
                  ) : (
                    'Operasi'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Accordion Component ---
const Accordion: React.FC<{
  title: string;
  titleIcon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, titleIcon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-dark-tertiary/50 rounded-lg">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 text-left"
      >
        <div className="flex items-center gap-2">
          {titleIcon}
          <h4 className="font-semibold text-light-text">{title}</h4>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-2 pt-0 space-y-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Talent List Item Component (New) ---
const TalentListItem: React.FC<{
  talent: Talent;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ talent, isSelected, onSelect }) => {
  const rarityConfig = RARITY_CONFIG[talent.rarity];
  const isUnavailable =
    talent.unavailableUntil && talent.unavailableUntil > Date.now();
  let unavailableMessage = '';
  if (isUnavailable) {
    const daysLeft = Math.ceil(
      (talent.unavailableUntil! - Date.now()) / (1000 * 60 * 60 * 24)
    );
    unavailableMessage = `${talent.unavailabilityReason} (${daysLeft} hari)`;
  }

  const baseClasses =
    'w-full flex items-center gap-3 p-2 text-left rounded-lg transition-colors duration-200';
  const stateClasses = isSelected
    ? 'bg-purple-900/50 ring-2 ring-purple-500'
    : isUnavailable
    ? 'bg-black/30 opacity-60 cursor-not-allowed'
    : 'bg-dark-tertiary/60 hover:bg-dark-tertiary';

  return (
    <button
      onClick={onSelect}
      disabled={isUnavailable}
      className={`${baseClasses} ${stateClasses}`}
    >
      <img
        src={talent.imageUrl}
        alt={talent.name}
        className={`w-10 h-10 object-cover rounded-full border-2 ${
          isSelected ? rarityConfig.border : 'border-gray-600'
        }`}
      />
      <div className="flex-1">
        <p className="text-sm font-bold text-light-text">{talent.name}</p>
        {isUnavailable ? (
          <p className="text-xs font-semibold text-yellow-400">
            {unavailableMessage}
          </p>
        ) : (
          <p className={`text-xs font-bold ${rarityConfig.color}`}>
            {talent.rarity}
          </p>
        )}
      </div>
    </button>
  );
};

// --- Main Klinik View Component (Refactored) ---
const KlinikView: React.FC = () => {
  const talents = useGameStore((state) => state.talents);
  const gamePhase = useGameStore((state) => state.gameState.gameTime.phase);
  const money = useGameStore((state) => state.gameState.money);
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(
    null
  );
  const [lockedAttribute, setLockedAttribute] = useState<string | null>(null);

  const rarityOrder: Rarity[] = useMemo(
    () => [
      'Biasa',
      'Rare',
      'Epic',
      'Legendary',
      'Event',
      'Khusus',
      'Special',
      'Mystic',
    ],
    []
  );

  const allSortedTalents = useMemo(
    () =>
      [...talents].sort(
        (a, b) =>
          rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      ),
    [talents, rarityOrder]
  );

  const availableTalents = useMemo(
    () =>
      allSortedTalents.filter(
        (t) => !t.unavailableUntil || t.unavailableUntil <= Date.now()
      ),
    [allSortedTalents]
  );

  const unavailableTalents = useMemo(
    () =>
      allSortedTalents.filter(
        (t) => t.unavailableUntil && t.unavailableUntil > Date.now()
      ),
    [allSortedTalents]
  );

  const selectedTalent = useMemo(
    () => talents.find((t) => t.id === selectedTalentId),
    [talents, selectedTalentId]
  );

  useEffect(() => {
    if (!selectedTalentId && availableTalents.length > 0) {
      setSelectedTalentId(availableTalents[0].id);
    }
  }, [availableTalents, selectedTalentId]);

  useEffect(() => {
    if (
      selectedTalent &&
      (selectedTalent.unavailableUntil &&
        selectedTalent.unavailableUntil > Date.now())
    ) {
      setSelectedTalentId(null);
    }
  }, [selectedTalent]);

  useEffect(() => {
    setLockedAttribute(null);
  }, [selectedTalent]);

  if (gamePhase === 'Malam') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center h-[50vh]">
        <h2 className="text-xl font-serif text-light-text">Klinik Tutup</h2>
        <p className="mt-2 text-sm text-subtle-text">
          Klinik hanya buka pada siang hari.
        </p>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-2 pb-16">
      <h2 className="mb-3 text-xl font-serif text-center text-light-text">
        Klinik Estetika
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Talent List Column */}
        <div className="md:col-span-1 p-2 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
          <h3 className="mb-2 text-base font-serif font-bold text-center text-light-text">
            Daftar Pasien
          </h3>
          <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
            {availableTalents.map((talent) => (
              <TalentListItem
                key={talent.id}
                talent={talent}
                isSelected={selectedTalentId === talent.id}
                onSelect={() => setSelectedTalentId(talent.id)}
              />
            ))}
            {unavailableTalents.map((talent) => (
              <TalentListItem
                key={talent.id}
                talent={talent}
                isSelected={false}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Surgery Panel Column */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {selectedTalent ? (
              <motion.div
                key={selectedTalent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-2 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-serif font-bold">
                    Panel Operasi: {selectedTalent.name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-1 text-sm font-bold rounded-full bg-black/30">
                    <MoneyIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300">
                      {formatRupiah(money)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 max-h-[58vh] overflow-y-auto pr-1">
                  <Accordion
                    title="Operasi Wajah & Fisik"
                    titleIcon={<BeautyIcon className="w-5 h-5" />}
                  >
                    {[...mainAttributes, ...fisikAttributes].map(
                      ({ path, ...rest }) => (
                        <AttributeRow
                          key={path}
                          talent={selectedTalent}
                          attributePath={path}
                          lockedAttribute={lockedAttribute}
                          setLockedAttribute={setLockedAttribute}
                          {...rest}
                        />
                      )
                    )}
                  </Accordion>
                  <Accordion
                    title="Operasi Payudara"
                    titleIcon={<PayudaraIcon className="w-5 h-5" />}
                  >
                    {payudaraAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                  <Accordion
                    title="Operasi Vagina"
                    titleIcon={<VaginaIcon className="w-5 h-5" />}
                  >
                    {vaginaAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                  <Accordion
                    title="Operasi Klitoris"
                    titleIcon={<KlitorisIcon className="w-5 h-5" />}
                  >
                    {klitorisAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                  <Accordion
                    title="Operasi Bokong"
                    titleIcon={<BokongIcon className="w-5 h-5" />}
                  >
                    {bokongAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                  <Accordion
                    title="Operasi Anal"
                    titleIcon={<AnalIcon className="w-5 h-5" />}
                  >
                    {analAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                  <Accordion
                    title="Operasi Mulut"
                    titleIcon={<MulutIcon className="w-5 h-5" />}
                  >
                    {mulutAttributes.map(({ path, ...rest }) => (
                      <AttributeRow
                        key={path}
                        talent={selectedTalent}
                        attributePath={path}
                        lockedAttribute={lockedAttribute}
                        setLockedAttribute={setLockedAttribute}
                        {...rest}
                      />
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full min-h-[50vh] p-4 text-center rounded-xl bg-black/20"
              >
                <ClinicIcon className="w-12 h-12 mb-4 text-gray-600" />
                <h3 className="text-lg font-serif text-light-text">
                  Selamat Datang di Klinik
                </h3>
                <p className="mt-1 text-sm text-subtle-text">
                  Pilih talenta yang tersedia dari daftar di sebelah kiri untuk
                  memulai konsultasi operasi.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default KlinikView;
