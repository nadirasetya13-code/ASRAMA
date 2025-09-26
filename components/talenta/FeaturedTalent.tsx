import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Talent } from '../../types';
import { useGameStore } from '../../controllers/gameController';
import { RARITY_CONFIG } from '../../constants';
import {
  StaminaIcon,
  BeautyIcon,
  PopularityIcon,
  MentalIcon,
} from '../icons';

interface FeaturedTalentProps {
  talent: Talent;
}

const FeaturedTalent: React.FC<FeaturedTalentProps> = ({ talent }) => {
  const { setViewingTalent } = useGameStore.getState();
  const rarityConfig = RARITY_CONFIG[talent.rarity];

  const mainStats = [
    {
      Icon: StaminaIcon,
      label: 'Stamina',
      value: talent.stamina,
      color: 'text-red-400',
    },
    {
      Icon: BeautyIcon,
      label: 'Kecantikan',
      value: talent.kecantikan,
      color: 'text-pink-400',
    },
    {
      Icon: PopularityIcon,
      label: 'Popularitas',
      value: talent.popularitas,
      color: 'text-yellow-400',
    },
    {
      Icon: MentalIcon,
      label: 'Mental',
      value: talent.mental,
      color: 'text-blue-400',
    },
  ];

  const hasShimmer = ['Event', 'Khusus', 'Special', 'Mystic'].includes(
    talent.rarity
  );

  return (
    <div
      className={`relative flex-grow my-2 overflow-hidden rounded-lg shadow-lg ${rarityConfig.cardBg} border-2 ${rarityConfig.border}`}
    >
      <AnimatePresence>
        <motion.img
          key={talent.id}
          src={talent.imageUrl}
          alt={talent.name}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`absolute inset-0 object-cover object-top w-full h-full ${
            hasShimmer
              ? '[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_60%,transparent_100%)]'
              : ''
          }`}
        />
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-between h-full p-4 text-white">
        <motion.div
          key={`${talent.id}-name`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
            {talent.name}
          </h2>
          <p
            className={`inline-block mt-1 px-3 py-0.5 text-xs font-bold ${rarityConfig.color} bg-black/30 backdrop-blur-sm border ${rarityConfig.border} rounded-full`}
          >
            {talent.rarity} - Lvl. {talent.level}
          </p>
        </motion.div>

        <motion.div
          key={`${talent.id}-content`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
            {mainStats.map(({ Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="font-medium">{label}</span>
                <span className={`font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setViewingTalent(talent)}
            className="w-full py-2 mt-4 text-sm font-bold bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 drop-shadow-md"
          >
            Lihat Profil Lengkap
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedTalent;