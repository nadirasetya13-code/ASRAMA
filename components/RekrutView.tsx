import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import {
  GACHA_COST_SINGLE,
  GACHA_COST_MULTI,
  GACHA_RARITY_CHANCES,
  RARITY_CONFIG,
  EQUIPMENT_GACHA_CONFIG,
  EQUIPMENT_GACHA_RARITY_MULTIPLIER,
  EQUIPMENT_SETS,
} from '../constants';
import { formatRupiah } from '../services/localDataService';
import {
  MoneyIcon,
  LoadingSpinner,
  TalentCoinIcon,
  MakeupIcon,
  LingerieIcon,
  ShoesIcon,
  BraIcon,
  PantiesIcon,
  PotionIcon,
  ParfumIcon,
  StockingIcon,
} from './icons';
import { Rarity, Talent, EquipmentSlots } from '../types';
import TalentShowcase from './TalentShowcase';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`w-1/2 py-2.5 text-sm font-bold transition-colors duration-300 relative ${
      isActive ? 'text-white' : 'text-gray-400'
    }`}
  >
    {children}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink"
        layoutId="underline"
      />
    )}
  </button>
);

const TalentGachaView = () => {
  const { performGachaPull } = useGameStore.getState();
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);
  const gachaTalentPool = useGameStore((state) => state.gachaTalentPool);

  const canAffordSingle = money >= GACHA_COST_SINGLE;
  const canAffordMulti = money >= GACHA_COST_MULTI;

  const showcaseTalents = useMemo(
    () =>
      gachaTalentPool.filter((t) =>
        ['Epic', 'Legendary', 'Event', 'Khusus', 'Special', 'Mystic'].includes(
          t.rarity
        )
      ),
    [gachaTalentPool]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col flex-grow"
    >
      {/* Talent Showcase Component */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl animate-slow-pulse" />
        </div>
        <TalentShowcase talents={showcaseTalents} />
      </div>

      {/* Rarity Chances Section */}
      <div className="w-full max-w-sm mx-auto my-2 flex-shrink-0">
        <h3 className="mb-2 text-xs font-semibold text-center text-gray-300">
          Peluang Rekrutmen
        </h3>
        <div className="p-3 text-center text-gray-200 rounded-xl bg-black/20">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-1 text-xs">
            {(Object.keys(GACHA_RARITY_CHANCES) as Rarity[]).map((rarity) => (
              <div
                key={rarity}
                className="flex items-center justify-center gap-1.5"
              >
                <span className={`font-bold ${RARITY_CONFIG[rarity].color}`}>
                  {rarity}:
                </span>
                <span className="font-semibold text-gray-300">
                  {parseFloat(
                    (GACHA_RARITY_CHANCES[rarity] * 100).toFixed(4)
                  )}
                  %
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow" />

      {/* Actions Footer */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex-shrink-0">
        <div className="flex items-center justify-center gap-2 mb-3 text-white">
          <span className="text-sm font-semibold">Uang Kas Anda:</span>
          <div className="flex items-center gap-1 px-3 py-1 text-sm font-bold rounded-full bg-black/30">
            <MoneyIcon className="h-4 text-yellow-400" />
            <span>{formatRupiah(money)}</span>
          </div>
        </div>
        <div className="relative space-y-4">
          <motion.button
            type="button"
            onClick={() => performGachaPull(1)}
            disabled={isProcessing || !canAffordSingle}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex flex-col items-center justify-center p-2 text-white rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transform transition-all animate-glow-purple border-4 border-white"
          >
            <span className="text-base font-bold">Panggilan Tunggal</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold opacity-90">
              <MoneyIcon className="h-4" />
              <span>{formatRupiah(GACHA_COST_SINGLE)}</span>
            </div>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => performGachaPull(10)}
            disabled={isProcessing || !canAffordMulti}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full relative flex flex-col items-center justify-center p-2 text-black rounded-lg shadow-lg bg-gradient-to-r from-brand-gold to-yellow-400 disabled:from-gray-500 disabled:to-gray-600 disabled:text-white disabled:cursor-not-allowed transform transition-all animate-glow-gold border-4 border-white"
          >
            <div className="absolute top-1 right-1 px-2 py-0.5 text-[9px] font-bold bg-red-600 text-white rounded-full shadow-md animate-pulse">
              Jaminan 1x Rare+
            </div>
            <span className="text-base font-bold">Panggilan 10x</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold opacity-90">
              <MoneyIcon className="h-4" />
              <span>{formatRupiah(GACHA_COST_MULTI)}</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// A mapping for dynamic button colors based on talent rarity
const RARITY_BUTTON_STYLES: Record<Rarity, { gradient: string; glow: string }> =
  {
    Biasa: {
      gradient: 'from-gray-600 to-gray-800',
      glow: 'animate-glow-white',
    },
    Rare: { gradient: 'from-blue-500 to-sky-600', glow: 'animate-glow-blue' },
    Epic: {
      gradient: 'from-purple-500 to-fuchsia-600',
      glow: 'animate-glow-purple',
    },
    Legendary: {
      gradient: 'from-amber-400 to-yellow-500',
      glow: 'animate-glow-gold',
    },
    Event: { gradient: 'from-teal-400 to-cyan-500', glow: 'animate-glow-teal' },
    Khusus: {
      gradient: 'from-pink-500 to-rose-600',
      glow: 'animate-glow-pink',
    },
    Special: {
      gradient: 'from-red-500 to-orange-600',
      glow: 'animate-glow-red',
    },
    Mystic: {
      gradient: 'from-indigo-500 via-purple-600 to-pink-500',
      glow: 'animate-glow-mystic',
    },
  };

const EquipmentGachaView = () => {
  const { performEquipmentGacha } = useGameStore.getState();
  const allTalents = useGameStore((state) => state.talents);
  const isProcessing = useGameStore((state) => state.isProcessing);

  const [selectedTalentIndex, setSelectedTalentIndex] = useState(0);

  const availableTalents = useMemo(
    () => allTalents.filter((t) => !t.hibernationEndTime),
    [allTalents]
  );

  const selectedTalent = availableTalents[selectedTalentIndex];

  const rarityConfig = useMemo(() => {
    if (!selectedTalent) return RARITY_CONFIG.Biasa;
    return RARITY_CONFIG[selectedTalent.rarity];
  }, [selectedTalent]);

  const buttonStyle = useMemo(() => {
    if (!selectedTalent) return RARITY_BUTTON_STYLES.Biasa;
    return RARITY_BUTTON_STYLES[selectedTalent.rarity];
  }, [selectedTalent]);

  const { singleCost, multiCost } = useMemo(() => {
    if (!selectedTalent) return { singleCost: 0, multiCost: 0 };
    const configSingle = EQUIPMENT_GACHA_CONFIG.STANDARD_PULL;
    const configMulti = EQUIPMENT_GACHA_CONFIG.MULTI_PULL;
    const rarityMultiplier =
      EQUIPMENT_GACHA_RARITY_MULTIPLIER[selectedTalent.rarity];

    const baseCost =
      configSingle.BASE_COST +
      selectedTalent.dayaPikat * configSingle.DAYA_PIKAT_MULTIPLIER;

    const single = Math.floor(
      baseCost * configSingle.COST_MULTIPLIER * rarityMultiplier
    );
    const multi = Math.floor(
      baseCost * configMulti.COST_MULTIPLIER * rarityMultiplier
    );

    return { singleCost: single, multiCost: multi };
  }, [selectedTalent]);

  if (availableTalents.length === 0) {
    return (
      <div className="flex items-center justify-center flex-grow text-center text-gray-400">
        Tidak ada talenta yang tersedia untuk memanggil equipment.
      </div>
    );
  }

  const canAffordSingle = selectedTalent.earnings >= singleCost;
  const canAffordMulti = selectedTalent.earnings >= multiCost;

  const nextTalent = () =>
    setSelectedTalentIndex((prev) => (prev + 1) % availableTalents.length);
  const prevTalent = () =>
    setSelectedTalentIndex(
      (prev) => (prev - 1 + availableTalents.length) % availableTalents.length
    );

  const equipmentIconMap: Record<string, React.FC<{ className?: string }>> = {
    makeup: MakeupIcon,
    lingerie: LingerieIcon,
    sepatu: ShoesIcon,
    bra: BraIcon,
    celanaDalam: PantiesIcon,
    obatBirahi: PotionIcon,
    parfum: ParfumIcon,
    stocking: StockingIcon,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col flex-grow w-full max-w-sm mx-auto"
    >
      {/* Talent Carousel */}
      <div className="relative h-28 my-2">
        <AnimatePresence>
          <motion.div
            key={selectedTalent.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="absolute inset-0 flex flex-col items-center p-2 text-center bg-black/20 rounded-xl"
          >
            <img
              src={selectedTalent.imageUrl}
              alt={selectedTalent.name}
              className={`object-cover w-16 h-16 rounded-full border-4 shadow-lg transition-all duration-300 ${rarityConfig.border} ${rarityConfig.glowAnimation}`}
            />
            <h4 className="mt-1 font-bold text-white">{selectedTalent.name}</h4>
            <div className="flex items-center gap-1 px-3 py-0.5 mt-1 text-sm font-bold text-purple-200 bg-purple-900/50 rounded-full">
              <TalentCoinIcon className="w-4 h-4" />
              <span>{formatRupiah(selectedTalent.earnings)}</span>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTalent}
          className="absolute left-0 p-1 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full top-1/2"
        >
          &lt;
        </button>
        <button
          onClick={nextTalent}
          className="absolute right-0 p-1 transform translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full top-1/2"
        >
          &gt;
        </button>
      </div>

      {/* Currently Equipped */}
      <div className="mt-1 p-1.5 bg-black/20 rounded-lg">
        <h5 className="text-[10px] font-bold text-center text-gray-400 uppercase tracking-wider">
          Equipment Terpasang
        </h5>
        <div className="grid grid-cols-4 gap-1 mt-1">
          {(
            Object.keys(equipmentIconMap) as (keyof typeof equipmentIconMap)[]
          ).map((slot) => {
            const item = selectedTalent.equipment[slot as keyof EquipmentSlots];
            const Icon = equipmentIconMap[slot];

            return (
              <div
                key={slot}
                className={`relative flex items-center justify-center rounded-md aspect-square overflow-hidden ${
                  item
                    ? 'bg-black/30'
                    : 'bg-black/20 border border-dashed border-white/20'
                }`}
                title={item ? item.name : `Slot ${slot} kosong`}
              >
                {item ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Icon className="w-4/5 h-4/5 text-gray-600" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-2 p-1.5 text-xs text-center bg-black/20 rounded-lg">
        <p className="text-gray-300">
          Dapatkan equipment acak dari semua set untuk meningkatkan performa
          talenta.
        </p>
        <p className="text-gray-400">
          Set Tersedia:{' '}
          <span className="font-semibold text-purple-300">
            {EQUIPMENT_SETS.map((s) => s.setName).join(', ')}
          </span>
        </p>
      </div>

      <div className="flex-grow" />

      {/* Gacha Actions */}
      <div className="space-y-4 mt-4">
        <motion.button
          type="button"
          onClick={() => performEquipmentGacha(selectedTalent.id, 1)}
          disabled={isProcessing || !canAffordSingle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full flex flex-col items-center justify-center p-2 text-white rounded-lg shadow-lg bg-gradient-to-r ${buttonStyle.gradient} disabled:from-gray-500 disabled:to-gray-600 disabled:bg-none disabled:cursor-not-allowed transform transition-all ${buttonStyle.glow} border-4 border-white`}
        >
          <span className="text-base font-bold">Panggil Equipment x1</span>
          <div className="flex items-center gap-1.5 text-xs font-semibold opacity-90">
            <TalentCoinIcon className="w-4 h-4" />
            <span>{formatRupiah(singleCost)}</span>
          </div>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => performEquipmentGacha(selectedTalent.id, 10)}
          disabled={isProcessing || !canAffordMulti}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full relative flex flex-col items-center justify-center p-2 text-white rounded-lg shadow-lg bg-gradient-to-r ${buttonStyle.gradient} disabled:from-gray-500 disabled:to-gray-600 disabled:bg-none disabled:cursor-not-allowed transform transition-all ${buttonStyle.glow} border-4 border-white`}
        >
          <div className="absolute top-1 right-1 px-2 py-0.5 text-[9px] font-bold bg-green-500 text-white rounded-full shadow-md">
            DISKON!
          </div>
          <span className="text-base font-bold">Panggil Equipment x10</span>
          <div className="flex items-center gap-1.5 text-xs font-semibold opacity-90">
            <TalentCoinIcon className="w-4 h-4" />
            <span>{formatRupiah(multiCost)}</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

const RekrutView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Talent' | 'Equipment'>('Talent');
  const isProcessing = useGameStore((state) => state.isProcessing);

  return (
    <div
      className="p-2 sm:p-4 flex flex-col bg-[length:200%_200%] bg-gradient-to-br from-[#2d2a3f] via-[#1e1c2f] to-[#141320] animate-gradient-pulse"
      style={{ minHeight: 'calc(100vh - 116px)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center flex-shrink-0"
      >
        <h2 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-purple-200 bg-[length:200%_auto] animate-shimmer drop-shadow-lg">
          Portal Panggilan
        </h2>
        <p className="text-sm text-gray-300">
          Sentuh takdir untuk mendapatkan kekuatan baru.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="w-full max-w-sm mx-auto my-4 flex bg-black/20 rounded-lg">
        <TabButton
          isActive={activeTab === 'Talent'}
          onClick={() => setActiveTab('Talent')}
        >
          Panggil Talenta
        </TabButton>
        <TabButton
          isActive={activeTab === 'Equipment'}
          onClick={() => setActiveTab('Equipment')}
        >
          Panggil Equipment
        </TabButton>
      </div>

      <div className="flex flex-col flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'Talent' ? (
            <TalentGachaView key="talent-gacha" />
          ) : (
            <EquipmentGachaView key="equip-gacha" />
          )}
        </AnimatePresence>
      </div>

      {isProcessing && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <LoadingSpinner className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
  );
};

export default RekrutView;