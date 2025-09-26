import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '../icons';

const TalentStatBar: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  baseValue?: number;
}> = ({ icon, label, value, color, baseValue }) => {
  // Clamp the progress bar value to a maximum of 100% to prevent visual overflow,
  // as talent stats can exceed 100 due to modifiers.
  const progressWidth = `${Math.min(value, 100)}%`;

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-4">{icon}</div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-0">
          <span className="text-[10px] font-semibold text-light-text">
            {label}
          </span>
          <div className="flex items-center gap-1">
            <span className={`text-[11px] font-bold ${color}`}>{value}</span>
            {typeof baseValue === 'number' && (
              <span className="text-[9px] font-normal text-gray-500">
                ({baseValue})
              </span>
            )}
            {typeof baseValue === 'number' && value > baseValue && (
              <ArrowUpIcon className="w-2.5 h-2.5 text-green-500" />
            )}
            {typeof baseValue === 'number' && value < baseValue && (
              <ArrowDownIcon className="w-2.5 h-2.5 text-red-500" />
            )}
          </div>
        </div>
        <div className="w-full h-1 bg-black/10 rounded-full">
          <div
            className={`h-1 ${color.replace(
              'text-',
              'bg-'
            )} rounded-full transition-all duration-500`}
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TalentStatBar);
