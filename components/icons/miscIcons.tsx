import React from 'react';

// --- Skill Card Icon ---
export const PositionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

// --- Match Icon ---
export const MatchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.9l-1.4-1.4C5.4 14.3 2 11.2 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 3.7-3.4 6.8-8.6 12l-1.4 1.4z"/>
        <path d="m16 10 2 2-2 2"/>
        <path d="m8 14-2-2 2-2"/>
    </svg>
);

// --- Payment Icons ---
export const QrCodeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h1v1" />
        <path d="M14 17h1v1" />
        <path d="M17 14h1v1" />
        <path d="M17 17h1v1" />
        <path d="M19 14h2v2" />
        <path d="M14 19h2v2" />
        <path d="M17 19h3v3h-3z" />
    </svg>
);

export const CashPaymentIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M2 6h20" />
        <path d="M2 18h20" />
        <path d="M12 2v20" />
        <path d="M6 2v20" />
        <path d="M18 2v20" />
    </svg>
);

export const TombstoneIcon = ({ className }: { className?: string }) => (
  <img
    src="https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/makam.png"
    alt="Makam Talenta Icon"
    className={className}
  />
);

export const ViewersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const DevIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        <path d="M15.5 16.5a5.5 5.5 0 0 0-7 0" />
        <path d="M8.5 12.5a3.5 3.5 0 0 1 7 0" />
        <path d="M12 8.5a1.5 1.5 0 0 1 3 0" />
        <path d="M8.5 12.5a3.5 3.5 0 0 0 7 0" />
    </svg>
);

export const ConsumableIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 1 0 0 14A7 7 0 0 0 12 2Z"/>
        <path d="m14.5 6.5-5 5"/>
        <path d="m9.5 11.5 5-5"/>
    </svg>
);

export const WarningIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

export const PoliceIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);