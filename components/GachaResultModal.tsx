import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { RARITY_CONFIG } from '../constants';
import { baseTalents } from '../services/localDataService';
import { GachaResultItem } from '../types';

// Type for the animation state machine
type AnimationState = 'spinning' | 'revealed' | 'grid' | 'finished';

// Animation Variants for the grid
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Delay between each card appearing
    },
  },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// --- Tooltip Card Component for Grid View ---
const TooltipTalentCard: React.FC<{ result: GachaResultItem }> = ({
  result,
}) => {
  const rarityConfig = RARITY_CONFIG[result.rarity];
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      variants={gridItemVariants} // Apply item variants
      className="relative w-full aspect-[3/5]"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* The visible card */}
      <div
        className={`w-full h-full text-white rounded-lg overflow-hidden border-2 ${rarityConfig.border}`}
      >
        <div className={`absolute inset-0 ${rarityConfig.bg}`} />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${result.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full p-1.5 text-[10px] sm:text-xs">
          <h4 className="font-bold truncate">{result.name}</h4>
          <p className={`font-semibold ${rarityConfig.color}`}>
            {result.rarity}
          </p>
        </div>
        {result.isNew ? (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold bg-green-500 rounded-full shadow-md">
            BARU!
          </div>
        ) : (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold bg-gray-500 rounded-full shadow-md">
            DUPLIKAT
          </div>
        )}
        {!result.isNew && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold bg-yellow-500 text-black rounded-full shadow-md">
            +{result.xpGained} XP
          </div>
        )}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max p-2 bg-black/80 backdrop-blur-sm rounded-lg text-xs z-10 pointer-events-none shadow-lg border border-white/10"
          >
            <div className="space-y-1 font-semibold text-white">
              <p>
                Kecantikan:{' '}
                <span className="font-bold text-pink-400">
                  {result.kecantikan}
                </span>
              </p>
              <p>
                Stamina:{' '}
                <span className="font-bold text-red-400">{result.stamina}</span>
              </p>
              <p>
                Popularitas:{' '}
                <span className="font-bold text-yellow-400">
                  {result.popularitas}
                </span>
              </p>
              <p>
                Mental:{' '}
                <span className="font-bold text-blue-400">{result.mental}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GachaResultModal: React.FC = () => {
  const gachaResult = useGameStore((state) => state.gachaResult);
  const { closeGachaResult } = useGameStore.getState();

  const isMultiPull = useMemo(
    () => gachaResult && gachaResult.length > 1,
    [gachaResult]
  );
  const [animationState, setAnimationState] =
    useState<AnimationState>('spinning');
  const [spunTalentIndex, setSpunTalentIndex] = useState(0);

  const primaryResult = gachaResult ? gachaResult[0] : null;

  // --- Animation Effect ---
  useEffect(() => {
    if (!gachaResult) return;

    setAnimationState('spinning');
    setSpunTalentIndex(0);

    const spinInterval = setInterval(() => {
      setSpunTalentIndex((prev) => (prev + 1) % baseTalents.length);
    }, 75);

    const revealTimeout = setTimeout(() => {
      clearInterval(spinInterval);
      setAnimationState('revealed');
    }, 5500);

    const gridTimeout = setTimeout(() => {
      if (isMultiPull) {
        setAnimationState('grid');
      } else {
        setAnimationState('finished');
      }
    }, 6500);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(revealTimeout);
      clearTimeout(gridTimeout);
    };
  }, [gachaResult, isMultiPull]);

  if (!gachaResult || !primaryResult) return null;

  const SpunCard = ({ talent }: { talent: (typeof baseTalents)[0] }) => (
    <motion.div
      key={talent.id}
      className="absolute w-full h-full"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.05 } }}
      transition={{ duration: 0.1 }}
    >
      <div
        className="w-full h-full bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${talent.imageUrl})` }}
      />
    </motion.div>
  );

  const RevealedCard = ({
    talent,
    layoutId,
  }: {
    talent: GachaResultItem;
    layoutId?: string;
  }) => {
    const rarityConfig = RARITY_CONFIG[talent.rarity];
    return (
      <motion.div
        layoutId={layoutId}
        className={`relative w-full h-full text-white rounded-lg overflow-hidden border-4 shadow-2xl ${rarityConfig.border} ${rarityConfig.shadow}`}
      >
        <div className={`absolute inset-0 ${rarityConfig.bg}`} />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${talent.imageUrl})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 flex flex-col justify-end h-full p-2 text-sm sm:p-3 sm:text-base">
          <h4 className="font-bold truncate">{talent.name}</h4>
          <p className={`font-semibold ${rarityConfig.color}`}>
            {talent.rarity}
          </p>
        </div>
        {talent.isNew ? (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold bg-green-500 rounded-full shadow-md">
            BARU!
          </div>
        ) : (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold bg-gray-500 rounded-full shadow-md">
            DUPLIKAT
          </div>
        )}
        {!talent.isNew && (
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-bold bg-yellow-500 text-black rounded-full shadow-md">
            +{talent.xpGained} XP
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-2 bg-black/80 backdrop-blur-sm"
    >
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {(animationState === 'spinning' ||
            animationState === 'revealed' ||
            (animationState === 'finished' && !isMultiPull)) && (
            <motion.div
              key="spinner"
              className="w-48 h-80 sm:w-56 sm:h-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="relative w-full h-full">
                {animationState === 'spinning' && (
                  <>
                    <div className="absolute inset-0 bg-black rounded-lg opacity-50"></div>
                    <AnimatePresence>
                      <SpunCard talent={baseTalents[spunTalentIndex]} />
                    </AnimatePresence>
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-white pointer-events-none">
                      Mencari Talenta...
                    </div>
                  </>
                )}
                {(animationState === 'revealed' ||
                  (animationState === 'finished' && !isMultiPull)) && (
                  <RevealedCard
                    talent={primaryResult}
                    layoutId={isMultiPull ? 'primary-card' : undefined}
                  />
                )}
              </div>
            </motion.div>
          )}

          {isMultiPull && animationState === 'grid' && (
            <motion.div
              key="grid"
              className="w-full max-w-md mx-auto"
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-2 text-xl font-serif font-bold text-center text-light-text">
                Hasil Panggilan x10
              </h2>
              <motion.div
                className="grid grid-cols-5 gap-1 sm:gap-1.5"
                variants={gridContainerVariants}
              >
                {gachaResult.map((talent, index) => (
                  <TooltipTalentCard
                    key={talent.id + index}
                    result={talent}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <AnimatePresence>
        {((animationState === 'finished' && !isMultiPull) ||
          (isMultiPull && animationState === 'grid')) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={closeGachaResult}
              className="px-6 py-2.5 mt-4 text-sm font-bold text-white transform transition-transform bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-romantic hover:scale-105"
            >
              Lanjutkan
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GachaResultModal;
