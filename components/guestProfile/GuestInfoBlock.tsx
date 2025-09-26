import React from 'react';
import { Guest } from '../../types';
import { CityIcon, ReligionIcon, SocialStatusIcon } from '../icons';

interface GuestInfoBlockProps {
  guest: Guest;
}

const GuestInfoBlock: React.FC<GuestInfoBlockProps> = ({ guest }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-gray-300">
      <div className="flex items-center gap-1.5 py-1 px-3 bg-black/20 rounded-full shadow-sm">
        <CityIcon className="w-4 h-4 text-brand-purple" />
        <span className="font-semibold">{guest.kotaAsal}</span>
      </div>
      <div className="flex items-center gap-1.5 py-1 px-3 bg-black/20 rounded-full shadow-sm">
        <ReligionIcon className="w-4 h-4 text-brand-purple" />
        <span className="font-semibold">{guest.agama}</span>
      </div>
      <div className="flex items-center gap-1.5 py-1 px-3 bg-black/20 rounded-full shadow-sm">
        <SocialStatusIcon className="w-4 h-4 text-brand-purple" />
        <span className="font-semibold">{guest.statusSosial}</span>
      </div>
    </div>
  );
};

export default GuestInfoBlock;