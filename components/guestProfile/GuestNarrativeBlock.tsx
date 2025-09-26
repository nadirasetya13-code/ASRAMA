import React from 'react';
import { Guest } from '../../types';

interface GuestNarrativeBlockProps {
  guest: Guest;
}

const GuestNarrativeBlock: React.FC<GuestNarrativeBlockProps> = ({ guest }) => {
  return (
    <>
      {/* Motivation (Dynamic Bio) */}
      <div className="p-3 my-4 rounded-xl shadow-inner bg-blue-900/20 border border-blue-500/20">
        <h3 className="pb-1 mb-2 text-base font-serif font-bold text-center border-b-2 border-blue-400/30">
          Motivasi Kunjungan Malam Ini
        </h3>
        <p className="text-xs italic font-sans text-blue-200 whitespace-pre-line">
          "{guest.bio}"
        </p>
      </div>

      {/* Backstory (Fixed Cerita) */}
      <div className="p-3 my-4 rounded-xl shadow-inner bg-black/20 border border-white/10">
        <h3 className="pb-1 mb-2 text-base font-serif font-bold text-center border-b-2 border-brand-pink/50">
          Cerita Latar Belakang
        </h3>
        <p className="text-xs font-sans text-subtle-text whitespace-pre-line">
          {guest.cerita}
        </p>
      </div>
    </>
  );
};

export default GuestNarrativeBlock;