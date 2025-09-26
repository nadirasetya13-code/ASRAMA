import React, { useState } from 'react';
import { Guest } from '../../types';
import { useGameStore } from '../../controllers/gameController';
import { GUEST_TIER_CONFIG } from '../../constants';

interface GuestHeaderProps {
  guest: Guest;
}

const GuestHeader: React.FC<GuestHeaderProps> = React.memo(({ guest }) => {
  const { closeViewingGuest } = useGameStore();
  // FIX: Use state to handle image loading errors properly in React.
  const [imageError, setImageError] = useState(false);
  
  const tierConfig = GUEST_TIER_CONFIG[guest.tier];
  if (!tierConfig && process.env.NODE_ENV === 'development') {
    console.warn(`[GuestHeader] Invalid guest tier: "${guest.tier}". Falling back to tier 1.`);
  }
  const fallbackTierConfig = GUEST_TIER_CONFIG[1] || { color: 'border-gray-500', name: 'Unknown' };
  const config = tierConfig || fallbackTierConfig;

  const imageSrc = guest.imageUrl || undefined;
  const isValidSrc = imageSrc && imageSrc.trim() !== '';
  const showFallback = imageError || !isValidSrc;

  return (
    <div className="sticky top-0 z-20 shadow-sm bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container flex items-center justify-between p-2 mx-auto" aria-labelledby="guest-header-title">
        <div className="flex items-center gap-3">
          {showFallback ? (
            <div 
              role="img" 
              aria-label={`Foto profil ${guest.name} tidak tersedia`} 
              className="object-cover w-10 h-10 border-2 border-dark-secondary rounded-full shadow-md bg-gray-700 flex items-center justify-center"
              style={{ fontSize: '1.5rem' }}
            >
              ?
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={`Foto profil ${guest.name}`}
              role="img"
              className="object-cover w-10 h-10 border-2 border-dark-secondary rounded-full shadow-md"
              loading="lazy"
              // FIX: Update state on error instead of directly manipulating the DOM. This resolves the appendChild type error.
              onError={() => setImageError(true)}
            />
          )}
          <div>
            <h2 
              id="guest-header-title"
              className="text-lg font-serif font-bold leading-tight text-light-text"
            >
              {guest.name}, {guest.age}thn
            </h2>
            <span
              className={`inline-block mt-1 px-2 py-0.5 text-[11px] font-bold text-white rounded-full border ${config.color} ${config.color.replace('border-', 'bg-')}`}
              aria-label={`Tier tamu: ${config.name}`}
            >
              {config.name}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={closeViewingGuest}
          aria-label={`Tutup profil tamu ${guest.name}`}
          className="flex-shrink-0 p-2 transition-colors rounded-full bg-black/20 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-light-text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

GuestHeader.displayName = 'GuestHeader';

export default GuestHeader;