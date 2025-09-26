import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseTalent } from '../types';
import { RARITY_CONFIG } from '../constants';

interface TalentShowcaseProps {
  talents: BaseTalent[];
}

const cardVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.8,
    }),
};

const TalentShowcase: React.FC<TalentShowcaseProps> = ({ talents }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    if (!talents || talents.length < 2) return;

    const interval = setInterval(() => {
        setPage(prev => [prev[0] === talents.length - 1 ? 0 : prev[0] + 1, 1]);
    }, 4000); // Change talent every 4 seconds

    return () => clearInterval(interval);
  }, [talents]);

  if (!talents || talents.length === 0) {
    return <div className="h-56 sm:h-64" />; // Placeholder
  }

  const talentIndex = page % talents.length;
  const talent = talents[talentIndex];
  const rarityConfig = RARITY_CONFIG[talent.rarity];

  const backgroundEffectClass = useMemo(() => {
    // If the config is a gradient, use it but add opacity for the blur effect
    if (rarityConfig.bg.includes('gradient')) {
      return `${rarityConfig.bg} opacity-50`;
    }
    // Otherwise, maintain the old logic for single-color backgrounds
    const fromColor = rarityConfig.bg.replace('bg-', 'from-').replace('/70', '/20');
    return `bg-gradient-to-br ${fromColor} to-transparent`;
  }, [rarityConfig.bg]);

  return (
    <div className="relative flex items-center justify-center h-56 sm:h-64 my-2 overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute top-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      
        {/* Carousel Container */}
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={page}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                }}
                className="absolute w-36 h-56 sm:w-40 sm:h-64"
            >
                <div className={`absolute inset-0 ${backgroundEffectClass} rounded-xl blur-lg`}></div>
                <img
                    src={talent.imageUrl}
                    alt={talent.name}
                    className="relative object-cover w-full h-full border-2 border-white/10 rounded-xl shadow-2xl"
                />
                <div className="absolute bottom-0 w-full p-2 text-center text-white bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                    <p className="font-bold drop-shadow-md">{talent.name}</p>
                    <p className={`text-sm font-semibold drop-shadow-md ${rarityConfig.color}`}>{talent.rarity}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default TalentShowcase;