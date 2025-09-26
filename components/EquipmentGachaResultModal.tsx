import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { RARITY_CONFIG } from '../constants';
import { EquipmentGachaResultItem, Rarity } from '../types';

const rarityOrder: Rarity[] = [
  'Biasa',
  'Rare',
  'Epic',
  'Legendary',
  'Special',
  'Mystic',
];

// --- Gacha Card Sub-component ---
interface GachaCardProps {
  result: EquipmentGachaResultItem;
  isRevealed: boolean;
  onReveal: () => void;
  isHighestRarity: boolean;
  isRevealingAll: boolean;
}

const GachaCard: React.FC<GachaCardProps> = ({
  result,
  isRevealed,
  onReveal,
  isHighestRarity,
  isRevealingAll,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showRarityFlash, setShowRarityFlash] = useState(false);
  const { item, isNew } = result;
  const rarityConfig = RARITY_CONFIG[item.rarity];

  const handleReveal = () => {
    if (isRevealed || isFlipping) return;

    setIsFlipping(true);
    setShowRarityFlash(true);

    setTimeout(() => {
      onReveal();
    }, 300); // Reveal halfway through the flip

    setTimeout(() => {
      setShowRarityFlash(false);
      setIsFlipping(false);
    }, 600);
  };

  useEffect(() => {
    if (isRevealingAll && !isRevealed) {
      handleReveal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRevealingAll, isRevealed]);


  const flashColorMap: Record<Rarity, string> = {
    Biasa: '#9ca3af',
    Rare: '#60a5fa',
    Epic: '#d946ef',
    Legendary: '#facc15',
    Special: '#ef4444',
    Mystic: '#a855f7',
    Event: '#2dd4bf',
    Khusus: '#f472b6',
  };

  return (
    <motion.div
      className="w-full aspect-[3/5] [perspective:1000px]"
      onClick={handleReveal}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Card Back (Summoning Orb) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg bg-gradient-to-br from-purple-800 via-slate-900 to-pink-800 shadow-lg flex items-center justify-center cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="w-full h-full bg-purple-500/50 rounded-full blur-xl animate-orb-pulse" />
          <span className="absolute text-4xl font-serif text-white drop-shadow-lg">
            ?
          </span>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg overflow-hidden border-2 ${
            rarityConfig.border
          } ${isHighestRarity && isRevealed ? rarityConfig.glowAnimation : ''}`}
          style={
            showRarityFlash
              ? ({
                  '--flash-color': flashColorMap[item.rarity],
                } as React.CSSProperties)
              : {}
          }
        >
          {showRarityFlash && (
            <motion.div className="absolute inset-0 z-20 animate-gacha-rarity-flash" />
          )}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div
            className={`absolute top-1 left-1 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold rounded-full shadow-md z-10 ${
              isNew ? 'bg-green-500' : 'bg-gray-500'
            }`}
          >
            {isNew ? 'BARU!' : 'DUPLIKAT'}
          </div>
          <div className="absolute bottom-1 left-1 right-1 p-1 text-center">
            <p className="text-white text-[9px] font-bold truncate drop-shadow-lg">
              {item.name}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Modal Component ---
const EquipmentGachaResultModal: React.FC = () => {
  const result = useGameStore((state) => state.equipmentGachaResult);
  const { closeEquipmentGachaResult } = useGameStore.getState();

  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [isRevealingAll, setIsRevealingAll] = useState(false);

  const isMultiPull = result && result.length > 1;

  useEffect(() => {
    if (!isMultiPull && result?.length === 1) {
      const timer = setTimeout(() => handleRevealOne(0), 1000);
      return () => clearTimeout(timer);
    }
    // Cleanup on unmount
    return () => {
        setRevealedIndices(new Set<number>());
        setIsRevealingAll(false);
    }
  }, [isMultiPull, result]);

  const highestRarityValue = useMemo(() => {
    if (!result) return -1;
    return Math.max(
      ...result.map((r) => rarityOrder.indexOf(r.item.rarity))
    );
  }, [result]);

  if (!result) return null;

  const handleRevealOne = (index: number) => {
    setRevealedIndices((prev) => new Set(prev).add(index));
  };

  const handleRevealAll = () => {
    if (isRevealingAll) return;
    setIsRevealingAll(true);
    result.forEach((_, index) => {
      setTimeout(() => {
        handleRevealOne(index);
      }, index * 100);
    });
  };

  const allRevealed = revealedIndices.size === result.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-2 bg-black/80 backdrop-blur-sm"
    >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full max-w-md max-h-md bg-purple-600/20 rounded-full blur-3xl animate-summon-pulse" />
        </div>
      <div className="w-full max-w-md">
        <h2 className="mb-2 text-xl font-serif font-bold text-center text-light-text">
          Hasil Panggilan Equipment
        </h2>
        <div
          className={
            isMultiPull
              ? 'grid grid-cols-5 gap-1.5 sm:gap-2'
              : 'w-48 h-80 sm:w-56 sm:h-96 mx-auto'
          }
        >
          {result.map((res, index) => (
            <GachaCard
              key={`${res.item.id}-${index}`}
              result={res}
              isRevealed={revealedIndices.has(index)}
              onReveal={() => handleRevealOne(index)}
              isHighestRarity={
                rarityOrder.indexOf(res.item.rarity) === highestRarityValue
              }
              isRevealingAll={isRevealingAll}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: isMultiPull ? 0.3 : 0 } }}
            exit={{ opacity: 0 }}
            onClick={closeEquipmentGachaResult}
            className="px-6 py-2.5 mt-4 text-sm font-bold text-white transform transition-transform bg-gradient-to-r from-gray-700 to-gray-800 rounded-full shadow-lg hover:scale-105"
          >
            Lanjutkan
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMultiPull && !allRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
            onClick={handleRevealAll}
            className="px-6 py-2.5 mt-4 text-sm font-bold text-black transform transition-transform bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full shadow-lg hover:scale-105"
          >
            Ungkap Semua
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EquipmentGachaResultModal;
