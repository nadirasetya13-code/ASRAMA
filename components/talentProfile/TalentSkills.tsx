import React from 'react';
import { Talent } from '../../types';
import { MAX_SKILLS_BY_RARITY, SKILL_UNLOCK_LEVELS } from '../../constants';
import { PositionIcon, LockIcon } from '../icons';

interface TalentSkillsProps {
  talent: Talent;
}

const TalentSkills: React.FC<TalentSkillsProps> = ({ talent }) => {
  const maxSkills = MAX_SKILLS_BY_RARITY[talent.rarity];

  return (
    <div className="p-1.5 my-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 mb-1.5 text-xs font-serif font-bold text-center border-b-2 border-brand-pink/50">
        Keahlian Posisi ({talent.skills.length}/{maxSkills})
      </h3>
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
        {Array.from({ length: maxSkills }).map((_, index) => {
          const skill = talent.skills[index];
          if (skill) {
            return (
              <div
                key={skill.id}
                className="flex items-start gap-2 p-1 rounded-lg bg-black/30"
              >
                <PositionIcon className="flex-shrink-0 w-4 h-4 mt-0.5 text-brand-purple" />
                <div>
                  <h4 className="font-bold text-xs text-light-text">
                    {skill.name}
                  </h4>
                  <p className="text-[9px] text-subtle-text">
                    {skill.description.join(' ')}
                  </p>
                </div>
              </div>
            );
          } else {
            const isNextUnlock = index === talent.skills.length;
            const unlockLevel = SKILL_UNLOCK_LEVELS[index];
            return (
              <div
                key={`locked-${index}`}
                className={`flex items-center gap-2 p-1 text-center rounded-lg bg-black/30 ${
                  isNextUnlock ? 'border-2 border-dashed border-purple-400' : ''
                }`}
              >
                <LockIcon className="flex-shrink-0 w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-gray-500">Terkunci</h4>
                  {isNextUnlock && unlockLevel && (
                    <p className="text-[10px] font-semibold text-purple-400">
                      Terbuka di Lvl. {unlockLevel}
                    </p>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TalentSkills;