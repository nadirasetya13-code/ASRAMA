import React from 'react';
import { motion } from 'framer-motion';
import { Guest, KinkType, PersonalityTraitType } from '../types';
import { GUEST_TIER_CONFIG } from '../constants';
import {
  CityIcon,
  SocialStatusIcon,
  HeartIcon,
  DominanceRoomIcon,
  RoyalIcon,
  PelitIcon,
  KasarIcon,
  TidakSabaranIcon,
  KritisIcon,
  SetiaIcon,
  PenyebarPenyakitIcon,
  TargetIcon,
} from './icons';
import { useGameStore } from '../controllers/gameController';

interface GuestCardProps {
  guest: Guest;
  layoutId?: string;
}

const traitIconMap: Record<
  PersonalityTraitType | KinkType,
  { icon: React.FC<{ className?: string }>; color: string }
> = {
  Royal: { icon: RoyalIcon, color: 'text-amber-500' },
  Pelit: { icon: PelitIcon, color: 'text-gray-500' },
  Kasar: { icon: KasarIcon, color: 'text-red-600' },
  Romantis: { icon: HeartIcon, color: 'text-rose-500' },
  'Tidak Sabaran': { icon: TidakSabaranIcon, color: 'text-orange-500' },
  Kritis: { icon: KritisIcon, color: 'text-blue-500' },
  Setia: { icon: SetiaIcon, color: 'text-green-600' },
  'Penyebar Penyakit': {
    icon: PenyebarPenyakitIcon,
    color: 'text-yellow-700',
  },
  Dominasi: { icon: DominanceRoomIcon, color: 'text-red-700' },
  'Sadisme Ringan': { icon: KasarIcon, color: 'text-red-500' }, // Re-use
  Masokisme: { icon: HeartIcon, color: 'text-purple-600' }, // Re-use
  Fertility: { icon: RoyalIcon, color: 'text-sky-500' }, // Re-use
  'Virginity Complex': { icon: SetiaIcon, color: 'text-pink-400' }, // Re-use
};

// Fallback icon for any unmapped traits or kinks to make the component more robust.
const DEFAULT_TRAIT_ICON = { icon: TargetIcon, color: 'text-gray-400' };

const GuestCard: React.FC<GuestCardProps> = ({ guest, layoutId }) => {
  const tierConfig = GUEST_TIER_CONFIG[guest.tier] || GUEST_TIER_CONFIG[1];
  const setViewingGuest = useGameStore((state) => state.setViewingGuest);

  const handleClick = () => {
    setViewingGuest(guest);
  };
  
  const keyTraitOrKink = guest.kinks[0]?.type || guest.personalityTraits[0];

  // Improved logic to handle unmapped traits/kinks gracefully with a fallback icon.
  const { icon: TraitIcon, color: traitIconColor } = keyTraitOrKink
    ? traitIconMap[keyTraitOrKink] || DEFAULT_TRAIT_ICON
    : DEFAULT_TRAIT_ICON; // Always use DEFAULT_TRAIT_ICON if no trait/kink

  return (
    <motion.button
      layoutId={layoutId}
      type="button"
      onClick={handleClick}
      className={`relative w-full max-w-sm text-center transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer pt-12`}
    >
      {/* The image is positioned absolutely to overflow visually */}
      <img
        src={guest.imageUrl}
        alt={guest.name}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 object-cover w-24 h-24 border-4 border-dark-secondary rounded-full shadow-lg"
      />

      {/* This is the card body which handles the background and clipping */}
      <div className={`relative w-full p-3 bg-gradient-to-br from-dark-tertiary/80 to-dark-secondary/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 ${tierConfig.color} overflow-hidden`}>
        {/* Decorative background pattern */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2) rotate(45)"><rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,1)"/><path d="M10-5v20M-5 10h20" stroke-width="1" stroke="hsla(286, 68%, 61%, 0.13)" fill="none"/></pattern></defs><rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)"/></svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Tier Badge */}
          <div
            className={`absolute -top-1 right-0 px-2 text-xs font-bold text-white rounded-bl-lg rounded-tr-xl shadow-lg ${tierConfig.color.replace('border-','bg-')}`}
          >
            {tierConfig.name}
          </div>

          {/* Spacer to account for the absolutely positioned image */}
          <div className="h-12" />

          <h3 className="mt-2 text-xl font-serif font-bold text-light-text">
            {guest.name}, {guest.age}thn
          </h3>

          {/* Personal Info */}
          <div className="flex flex-wrap items-center justify-center mt-2 text-xs text-subtle-text gap-x-3 gap-y-1">
            <div className="flex items-center gap-1">
              <CityIcon className="w-3.5 h-3.5 text-brand-purple" />
              <span className="font-semibold">{guest.kotaAsal}</span>
            </div>
            <div className="flex items-center gap-1">
              <SocialStatusIcon className="w-3.5 h-3.5 text-brand-purple" />
              <span className="font-semibold">{guest.statusSosial}</span>
            </div>
          </div>
          
          {/* Key Trait Icon */}
          {TraitIcon && (
              <div title={keyTraitOrKink} className={`absolute top-0 left-0 p-1.5 bg-black/20 rounded-br-lg rounded-tl-xl ${traitIconColor}`}>
                  <TraitIcon className="w-5 h-5" />
              </div>
          )}

          {guest.requestedTalentName && (
            <div className="flex items-center justify-center gap-2 px-3 py-1 mt-3 text-xs font-semibold text-center border-2 border-dashed rounded-full text-amber-300 border-amber-400/50 bg-amber-900/30">
              <TargetIcon className="w-4 h-4" />
              <span>
                Meminta: <strong>{guest.requestedTalentName}</strong>
              </span>
            </div>
          )}

          <p className="pt-2 mt-3 text-xs font-sans text-subtle-text min-h-14 border-t-2 border-brand-pink/50">
            {guest.bio}
          </p>
          <span className="text-xs font-semibold text-blue-400 hover:underline">
            Lihat profil untuk detail...
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default React.memo(GuestCard);