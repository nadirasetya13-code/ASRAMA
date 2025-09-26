import React from 'react';

// --- Talent Stats ---
export const StaminaIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export const PopularityIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const BeautyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export const MentalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8.5c0-1.93-1.57-3.5-3.5-3.5S5 6.57 5 8.5c0 .73.22 1.42.6 2s.87 1.05 1.4 1.5c1.43 1.22 3.5 2.5 3.5 2.5s2.07-1.28 3.5-2.5c.53-.45 1.02-.92 1.4-1.5.38-.58.6-1.27.6-2C15.5 6.57 13.93 5 12 5s-3.5 1.57-3.5 3.5"/>
    <path d="M5.5 12.5c-1.13 1.5-1.5 3.5-1.5 5 0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4 0-1.5-.37-3.5-1.5-5"/>
    <path d="M12 15.5v-2.5"/>
  </svg>
);

export const FisikIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3"></circle>
        <path d="M6.5 21a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H8.5a2 2 0 0 0-2 2v3z"></path>
        <path d="M9 16V8a3 3 0 0 1 6 0v8"></path>
    </svg>
);

export const TalentCoinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3h8" />
        <path d="M12 3v18" />
    </svg>
);

// --- Personal Info Icons ---
export const CityIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 21h20"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/><path d="M3 11h2"/><path d="M19 11h2"/><path d="M12 5V3"/>
    </svg>
);

export const ReligionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

export const SocialStatusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
);

// --- Potensi & Kondisi Icons ---
export const HIVIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

export const HealthIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path d="M12 9v6m-3-3h6"/>
    </svg>
);

export const FallInLoveIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <circle cx="12" cy="11" r="1.5"/>
        <path d="M12 12.5v2"/>
    </svg>
);

export const PregnancyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="3"/>
        <path d="M9 20v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2"/>
        <path d="M9 12.5c0-2 1.5-4.5 3-4.5s3 2.5 3 4.5c0 3-1.5 5.5-3 5.5s-3-2.5-3-5.5z"/>
    </svg>
);

// --- Guest Penis Stats ---
export const PenisIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 13.5c-1.5 1.5-3.5 2.5-5.5 2.5s-4-1-5.5-2.5L2 15l4 4 4-4-1.5-1.5zM9 2a5 5 0 0 0-5 5c0 2.8 2.2 5 5 5s5-2.2 5-5a5 5 0 0 0-5-5z"/></svg>
);
export const LengthIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16"/><path d="M4 12l4-4m12 4l-4-4"/><path d="M4 12l4 4m12-4l-4 4"/></svg>
);
export const DiameterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
);
export const AggressionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a1.4 1.4 0 0 1 2.6 0l2.5 4.5a1.4 1.4 0 0 1-1.2 2.1H2.4a1.4 1.4 0 0 1-1.2-2.1l2.5-4.5a1.4 1.4 0 0 1 2.6 0l2.4 4.3 2.4-4.3a1.4 1.4 0 0 1 2.6 0l2.4 4.3 2.4-4.3z"/></svg>
);
export const ErectionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M8 10h8"/><path d="M8 14h8"/><path d="M8 6h8"/></svg>
);
export const SensitivityIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7-1 5 6-2 7 7-3 4 6 1-7 6-4-7-1-3-7z"/></svg>
);
export const SpermVolumeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-3.5-4-1.5 2.5-3.5 4S5 13 5 15a7 7 0 0 0 7 7z"/><path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M14 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
);
export const HeadTypeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 3.31 1.68 6.29 4.26 8.11.5.34.94.74 1.32 1.18.38.44.73.93 1.05 1.45.32.52.6 1.08.83 1.68.23.6.42 1.25.54 1.94.12.69.19 1.43.2 2.22h0a2 2 0 0 0 4 0h0c.01-.79.08-1.53.2-2.22.12-.69.3-1.34.54-1.94.23-.6.5-1.16.83-1.68.32-.52.67-1.01 1.05-1.45.38-.44.82-.84 1.32-1.18C20.32 18.29 22 15.31 22 12A10 10 0 0 0 12 2z"/></svg>
);
export const VeinTextureIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><path d="M12 12c-4 0-8-2-8-2s4-2 8-2 8 2 8 2-4 2-8 2z"/><path d="M12 12v4c0 2-4 2-4 2s4 0 4-2z"/><path d="M12 12v4c0 2 4 2 4 2s-4 0-4-2z"/></svg>
);
