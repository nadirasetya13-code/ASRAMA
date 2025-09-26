import React from 'react';
import { motion } from 'framer-motion';
import { MatchResult } from '../types';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { EventRoomIcon, TalentCoinIcon } from './icons';

interface MatchResultModalProps {
  result: MatchResult;
}

const MatchResultModal: React.FC<MatchResultModalProps> = ({ result }) => {
  const { closeMatchResult } = useGameStore.getState();
  const experiencePercentage =
    result.talentXpToNextLevel && result.talentCurrentXp
      ? (result.talentCurrentXp / result.talentXpToNextLevel) * 100
      : 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="matchResultTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="p-3 overflow-y-auto rounded-xl shadow-lg bg-dark-secondary/90 backdrop-blur-lg w-72 max-h-[90vh] border border-white/10">
        <h2
          id="matchResultTitle"
          className="text-lg font-serif font-bold text-light-text"
        >
          {result.message}
        </h2>
        <p className="mt-1 text-xs font-semibold text-light-text">
          Skor Kepuasan:{' '}
          <span
            className={`font-bold text-lg ${
              result.satisfactionScore > 70
                ? 'text-purple-400'
                : 'text-orange-400'
            }`}
          >
            {result.satisfactionScore}%
          </span>
        </p>

        {result.newBuff && (
          <div className="p-2 mt-2 text-xs text-center border rounded-lg shadow-inner bg-yellow-900/40 border-yellow-700/50">
            <h4 className="flex items-center justify-center gap-1.5 pb-1 mb-1 text-sm font-bold text-center border-b text-yellow-300 border-yellow-600/50">
              <EventRoomIcon className="w-4 h-4" /> Buff Baru Aktif!
            </h4>
            <p className="font-semibold text-yellow-200">
              {result.newBuff.description}
            </p>
          </div>
        )}

        {result.roomBonuses.length > 0 && (
          <div className="p-2 mt-2 text-[11px] text-left rounded-lg shadow-inner bg-green-900/20">
            <h4 className="pb-1 mb-1 text-xs font-bold text-center border-b text-green-300 border-green-700/50">
              Bonus Sesi
            </h4>
            {result.roomBonuses.map((bonus, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-green-300"
              >
                <span>{bonus.description}</span>
                <span className="font-bold">{bonus.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="p-2 mt-3 rounded-lg shadow-inner bg-blue-900/20">
          <h3 className="pb-1 mb-2 text-sm font-serif font-bold text-center border-b text-blue-300 border-blue-700/50">
            Hasil Agensi
          </h3>
          <div className="space-y-1 text-xs font-sans">
            <div
              className={`flex items-center justify-between font-bold text-blue-300`}
            >
              <span>Potensi Laba:</span>
              <span>{formatRupiah(result.labaBersih)}</span>
            </div>
            <div
              className={`flex items-center justify-between text-xs font-semibold ${
                result.reputationChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>Reputasi:</span>
              <span>
                {result.reputationChange >= 0
                  ? `+${result.reputationChange}`
                  : result.reputationChange}
              </span>
            </div>
          </div>
        </div>

        {result.talentEarnings > 0 && (
          <div className="p-2 mt-2 rounded-lg shadow-inner bg-purple-900/20">
            <h3 className="pb-1 mb-2 text-sm font-serif font-bold text-center border-b text-purple-300 border-purple-700/50">
              Hasil Talenta
            </h3>
            <div className="flex items-center justify-between text-xs font-bold text-purple-300">
              <div className="flex items-center gap-2">
                <TalentCoinIcon className="w-4 h-4" />
                <span>Potensi Dana:</span>
              </div>
              <span>{formatRupiah(result.talentEarnings)}</span>
            </div>
          </div>
        )}

        <div className="p-2 mt-2 rounded-lg shadow-inner bg-red-900/20">
          <h3 className="pb-1 mb-2 text-sm font-serif font-bold text-center border-b text-red-300 border-red-700/50">
            Dampak pada Talenta
          </h3>
          <div className="space-y-1 text-xs font-sans text-gray-300">
            <div className="flex justify-between">
              <span>Energi Terpakai:</span>
              <span className="font-bold text-red-400">
                -{result.talentImpact.energyChange}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Kesehatan:</span>
              <span className="font-bold text-red-400">
                {result.talentImpact.kesehatanChange}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mental:</span>
              <span className="font-bold text-red-400">
                {result.talentImpact.mentalChange}
              </span>
            </div>
            <div className="flex justify-between text-purple-400">
              <span>XP Didapat:</span>
              <span className="font-bold">+{result.xpGained}</span>
            </div>
            {result.talentXpToNextLevel && (
              <div
                className="relative w-full h-3 mt-2 bg-black/30 rounded-full shadow-inner overflow-hidden"
                title={`XP: ${result.talentCurrentXp} / ${result.talentXpToNextLevel}`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full"
                  initial={{ width: `0%` }}
                  animate={{ width: `${experiencePercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white drop-shadow-sm">
                    {result.talentCurrentXp} / {result.talentXpToNextLevel}
                  </span>
                </div>
              </div>
            )}
            {result.unavailabilityMessage && (
              <div className="pt-2 mt-2 font-bold text-center text-yellow-300 border-t border-yellow-700/50">
                {result.unavailabilityMessage}
              </div>
            )}
          </div>
        </div>

        {(result.levelUp ||
          result.ageUp ||
          result.playerLevelUp ||
          result.newSkillUnlocked) && (
          <div className="mt-3 space-y-1 text-center animate-pulse">
            {result.levelUp && (
              <p className="text-base font-bold text-green-400">
                TALENT NAIK LEVEL!
              </p>
            )}
            {result.newSkillUnlocked && (
              <p className="text-base font-bold text-cyan-400">
                KEAHLIAN BARU: {result.newSkillUnlocked.name}!
              </p>
            )}
            {result.ageUp && (
              <p className="text-base font-bold text-blue-400">
                TALENT BERTAMBAH UMUR!
              </p>
            )}
            {result.playerLevelUp && (
              <p className="text-lg font-bold text-amber-400">
                AGENCY LEVEL UP! (Lvl. {result.playerLevelUpTo})
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={closeMatchResult}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
        >
          Lanjutkan
        </button>
      </div>
    </motion.div>
  );
};

export default MatchResultModal;