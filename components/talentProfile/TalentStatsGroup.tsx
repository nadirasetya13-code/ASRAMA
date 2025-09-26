import React from 'react';
import TalentStatBar from './StatBar';

interface Stat {
  id: string;
  label: string;
  value: number;
  baseValue?: number;
  icon: React.ReactNode;
  color: string;
}

interface TalentStatsGroupProps {
  title: string;
  titleIcon?: React.ReactNode;
  stats: Stat[];
  isSubgroup?: boolean;
}

const TalentStatsGroup: React.FC<TalentStatsGroupProps> = ({
  title,
  titleIcon,
  stats,
  isSubgroup = false,
}) => {
  const containerClasses = isSubgroup
    ? 'space-y-1.5 pt-1.5'
    : 'p-2 bg-black/20 border border-white/10 rounded-xl shadow-inner space-y-1.5';

  const titleClasses = isSubgroup
    ? 'flex items-center gap-2 text-xs font-semibold text-light-text'
    : 'font-serif text-xs font-bold text-center border-b-2 border-brand-purple/50 pb-1 -mt-1';

  return (
    <div className={containerClasses}>
      <h3 className={titleClasses}>
        {titleIcon}
        {title}
      </h3>
      {stats.map((stat) => (
        <TalentStatBar
          key={stat.id}
          label={stat.label}
          value={stat.value}
          baseValue={stat.baseValue}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default TalentStatsGroup;
