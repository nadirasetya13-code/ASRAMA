import React from 'react';
import { Guest, GuestWant } from '../../types';
import { TargetIcon, PositionIcon } from '../icons';

interface GuestWantsBlockProps {
  guest: Guest;
}

const getWantIcon = (want: GuestWant) => {
  if (want.category === 'position') {
    return (
      <PositionIcon className="flex-shrink-0 w-6 h-6 mr-3 text-purple-400" />
    );
  }
  return <TargetIcon className="flex-shrink-0 w-6 h-6 mr-3 text-purple-400" />;
};

const GuestWantsBlock: React.FC<GuestWantsBlockProps> = ({ guest }) => {
  return (
    <div className="p-3 my-4 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 mb-3 text-base font-serif font-bold text-center border-b-2 border-brand-pink/50">
        Preferensi & Sifat
      </h3>
      <div className="space-y-3">
        {guest.wants.map((want, index) => (
          <div
            key={index}
            className="flex items-center p-1.5 text-xs text-left rounded-lg shadow-sm bg-purple-900/30"
          >
            {getWantIcon(want)}
            <div>
              {want.category === 'position' ? (
                <>
                  Menginginkan <span className="font-bold">{want.label}</span>
                </>
              ) : (
                <>
                  Mencari <span className="font-bold">{want.label}</span> dengan
                  nilai{' '}
                  <span className="font-bold text-purple-300">
                    {want.operator} {want.value}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          {guest.personalityTraits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 text-[11px] font-bold text-red-200 bg-red-800/50 rounded-full"
            >
              {trait}
            </span>
          ))}
          {guest.kinks.map((kink) => (
            <span
              key={kink.type}
              className="px-3 py-1 text-[11px] font-bold text-indigo-200 bg-indigo-800/50 rounded-full"
            >
              {kink.type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestWantsBlock;