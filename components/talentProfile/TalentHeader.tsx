import React from 'react';
import { motion } from 'framer-motion';
import { Talent } from '../../types';
import { RarityVisualConfig } from '../../constants/rarities/types';

interface TalentHeaderProps {
  talent: Talent;
  rarityConfig: RarityVisualConfig;
  onClose: () => void;
}

const TalentHeader: React.FC<TalentHeaderProps> = ({
  talent,
  rarityConfig,
  onClose,
}) => {
  const experiencePercentage =
    (talent.experience / talent.experienceToNextLevel) * 100;

  return (
    <div className="sticky top-0 z-20 p-1.5 shadow-sm bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container relative flex flex-col mx-auto">
        {/* Top section with name and close button */}
        <div className="flex items-center gap-3">
          <motion.img
            src={talent.imageUrl}
            alt={talent.name}
            className="object-cover w-12 h-12 border-2 border-dark-secondary rounded-full shadow-md"
          />
          <div className="flex-1 text-left">
            <h2 className="text-lg font-serif font-bold leading-tight text-light-text">
              {talent.name}
            </h2>
            <span
              className={`inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold ${rarityConfig.color} ${rarityConfig.bg} border ${rarityConfig.border} rounded-full`}
            >
              {talent.rarity} - Lvl. {talent.level}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup profil talenta"
          className="absolute top-0 right-0 flex-shrink-0 p-1.5 transition-colors rounded-full bg-black/20 hover:bg-black/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-light-text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Experience Bar */}
        <div
          className="relative w-full h-3 mt-2 bg-black/30 rounded-full shadow-inner overflow-hidden"
          title={`XP: ${talent.experience} / ${talent.experienceToNextLevel}`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${experiencePercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white drop-shadow-sm">
              XP: {talent.experience} / {talent.experienceToNextLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentHeader;
