import React from 'react';
import { motion } from 'framer-motion';
import { Talent } from '../types';
import { RARITY_CONFIG } from '../constants';
import { HeartIcon, LockIcon } from './icons';

interface TalentCardProps {
  talent: Talent;
  isActive: boolean;
  onClick: () => void;
}

const TalentCard: React.FC<TalentCardProps> = ({
  talent,
  isActive,
  onClick,
}) => {
  const rarityConfig = RARITY_CONFIG[talent.rarity];
  const experiencePercentage =
    (talent.experience / talent.experienceToNextLevel) * 100;
  
  const isUnavailable = talent.unavailableUntil && talent.unavailableUntil > Date.now();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isUnavailable}
      className={`relative flex-shrink-0 w-[6.5rem] h-60 text-white transition-all duration-300 transform rounded-lg overflow-hidden outline-none focus:outline-none backdrop-blur-sm ${
        rarityConfig.cardBg
      } ${
        isActive && !isUnavailable
          ? `opacity-100 border-2 ${rarityConfig.border} ${rarityConfig.glowAnimation}`
          : 'opacity-80 hover:opacity-100 filter grayscale-[50%] hover:grayscale-0 border-2 border-white shadow-md'
      } ${isUnavailable ? 'cursor-not-allowed' : ''}`}
      whileHover={!isUnavailable ? { y: -5, scale: 1.03 } : {}}
      whileTap={!isUnavailable ? { scale: 0.97 } : {}}
    >
      {/* Talent Image */}
      <img
        src={talent.imageUrl}
        alt={talent.name}
        className="absolute inset-0 object-cover object-top w-full h-full"
      />

      {/* Unavailable Overlay */}
      {isUnavailable && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center bg-black/80">
          <LockIcon className="w-10 h-10 text-yellow-400" />
          <p className="mt-2 text-sm font-bold text-white">{talent.unavailabilityReason || 'Tidak Tersedia'}</p>
        </div>
      )}

      {/* Overlays Container */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* TOP: Name Overlay */}
        <div className="flex justify-center p-0.5">
          <div
            className={`px-1.5 py-0.5 ${rarityConfig.nameOverlayBg} backdrop-blur-md rounded-full shadow-lg`}
          >
            <h4 className="text-[10px] font-bold text-center text-white truncate drop-shadow-lg">
              {talent.name}
            </h4>
          </div>
        </div>

        {/* BOTTOM: Info capsule */}
        <div
          className={`p-1 m-0.5 ${rarityConfig.infoCapsuleBg} backdrop-blur-md rounded-md shadow-inner`}
        >
          {/* Rarity & Level */}
          <div className="flex items-baseline justify-between text-[9px] px-0.5">
            <p
              className={`font-semibold drop-shadow-sm ${rarityConfig.color}`}
            >
              {talent.rarity}
            </p>
            <p className="font-bold drop-shadow-sm">Lvl. {talent.level}</p>
          </div>
          
          {/* Daya Pikat */}
          <div className="flex items-center justify-center gap-1 mt-0.5 text-[10px]">
            <HeartIcon className="w-2.5 h-2.5 text-red-400" />
            <span className="font-bold drop-shadow-sm">{talent.dayaPikat}</span>
          </div>

          {/* XP Progress */}
          <div
            title={`XP: ${talent.experience} / ${talent.experienceToNextLevel}`}
            className="mt-0.5"
          >
            {/* XP Bar */}
            <div
              className={`w-full h-1 ${rarityConfig.xpBarTrack} rounded-full`}
            >
              <motion.div
                className={`h-full ${rarityConfig.xpBarFill} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${experiencePercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              ></motion.div>
            </div>
             {/* XP Text */}
            <p className="text-center text-[8px] font-semibold opacity-80 leading-tight mt-0.5">
              {talent.experience}/{talent.experienceToNextLevel}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default React.memo(TalentCard);
