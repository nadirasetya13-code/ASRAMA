import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoneyIcon,
  ReputationIcon,
  LevelIcon,
  SavingsIcon,
  BuffIcon,
  PoliceIcon,
} from './icons';
import { formatRupiah } from '../services/localDataService';
import { useGameStore } from '../controllers/gameController';

const Header: React.FC = () => {
  // --- State Hooks ---
  const [showBuffs, setShowBuffs] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [devOptionsJustUnlocked, setDevOptionsJustUnlocked] = useState(false); // New state for visual feedback
  const tapTimeoutRef = useRef<number | null>(null);
  const { unlockDevOptions } = useGameStore.getState();

  // --- Performance Optimization: Select state slices individually to prevent re-renders ---
  const money = useGameStore((state) => state.gameState.money);
  const reputation = useGameStore((state) => state.gameState.reputation);
  const level = useGameStore((state) => state.gameState.level);
  const savings = useGameStore((state) => state.gameState.savings);
  const day = useGameStore((state) => state.gameState.gameTime.day);
  const phase = useGameStore((state) => state.gameState.gameTime.phase);
  const reputationToNextLevel = useGameStore(
    (state) => state.gameState.reputationToNextLevel
  );
  const activeBuffs = useGameStore((state) => state.gameState.activeBuffs);
  const supervisionDebuffUntil = useGameStore(state => state.gameState.supervisionDebuffUntil);
  const hasCriminalRecord = useGameStore(state => state.gameState.hasCriminalRecord);
  
  const isUnderSupervision = supervisionDebuffUntil && supervisionDebuffUntil > Date.now();

  const phaseText = phase === 'Siang' ? '☀️' : '🌙';
  const reputationPercentage =
    reputationToNextLevel === Infinity
      ? 100
      : Math.min((reputation / reputationToNextLevel) * 100, 100);

  const handleTitleTap = () => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 5) {
      unlockDevOptions();
      setTapCount(0); // Reset after unlocking
      // Trigger visual feedback
      setDevOptionsJustUnlocked(true);
      setTimeout(() => setDevOptionsJustUnlocked(false), 2500);
    }

    tapTimeoutRef.current = window.setTimeout(() => {
      setTapCount(0);
    }, 1500); // Reset taps if there's a 1.5s pause
  };

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 px-2 py-1 bg-black/20 backdrop-blur-md rounded-b-xl shadow-lg border-b border-white/10">
      <div className="container flex items-center justify-between gap-2 mx-auto">
        {/* Left Side: Title & Buffs */}
        <div className="flex items-center flex-shrink-0 gap-2">
           {/* Risk Indicators - Refactored to show both if active */}
          {hasCriminalRecord && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              title="CATATAN KRIMINAL (Operasional Lebih Mahal)"
              className="relative p-1 rounded-full bg-red-500/30"
            >
              <PoliceIcon className="w-4 h-4 text-red-500" />
            </motion.div>
          )}
          {isUnderSupervision && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              title="DALAM PENGAWASAN (Peningkatan Risiko)"
              className="relative p-1 rounded-full bg-yellow-400/30 animate-pulse"
            >
              <PoliceIcon className="w-4 h-4 text-yellow-500" />
            </motion.div>
          )}

          {/* Buffs display */}
          {activeBuffs.length > 0 && (
            <div className="relative">
              <motion.button
                type="button"
                onClick={() => setShowBuffs(!showBuffs)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-1 rounded-full bg-yellow-400/30"
                aria-label={`Lihat buff aktif (${activeBuffs.length})`}
              >
                <BuffIcon className="w-4 h-4 text-yellow-500 animate-pulse" />
                <div className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-3 h-3 text-[8px] font-bold text-white bg-red-500 border border-white rounded-full">
                  {activeBuffs.length}
                </div>
              </motion.button>

              <AnimatePresence>
                {showBuffs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 p-2 rounded-xl shadow-lg bg-dark-secondary/80 backdrop-blur-lg z-30 border border-white/10"
                  >
                    <h4 className="pb-1 mb-2 text-xs font-bold text-center border-b text-light-text border-brand-pink/50">
                      Buff Aktif
                    </h4>
                    <ul className="space-y-2 text-[11px] max-h-48 overflow-y-auto">
                      {activeBuffs.map((buff) => (
                        <li
                          key={buff.id}
                          className="p-1.5 rounded-md shadow-sm bg-yellow-900/40"
                        >
                          <p className="font-semibold text-yellow-300">
                            {buff.description}
                          </p>
                          <p className="mt-1 text-right font-bold text-yellow-400">
                            Durasi: {buff.durationDays} hari
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div
            className={`transition-all duration-300 rounded-sm cursor-pointer ${devOptionsJustUnlocked ? 'animate-glow-gold' : ''}`}
            onClick={handleTitleTap}
            role="button"
            aria-label="ASRAMA BIRAHI"
          >
            <img
              src="https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/Tittle.jpg"
              alt=""
              className="h-5 object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Center: Reputation Bar with integrated info */}
        <div
          title={`Reputasi: ${reputation} / ${
            reputationToNextLevel === Infinity ? 'MAX' : reputationToNextLevel
          }`}
          className="relative flex-grow h-4 overflow-hidden rounded-full shadow-inner bg-black/30"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-pink to-brand-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${reputationPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-1.5 text-white drop-shadow-sm">
            {/* Level */}
            <div
              title={`Level Agensi: ${level}`}
              className="flex items-center gap-0.5"
            >
              <LevelIcon className="w-[9px] h-[9px]" />
              <span className="text-[9px] font-bold">{level}</span>
            </div>

            {/* Day & Phase */}
            <div
              className="text-[9px] font-bold text-center"
              title={`Hari ke-${day}, ${phase}`}
            >
              H-{day} {phaseText}
            </div>

            {/* Reputation Value */}
            <div className="flex items-center gap-0.5" title={`${reputation} Reputasi`}>
              <ReputationIcon className="w-[9px] h-[9px]" />
              <span className="text-[9px] font-bold">{reputation}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Finances (Stacked) */}
        <div className="flex flex-col items-end flex-shrink-0 text-[9px] font-bold font-sans">
          <div
            title={`Uang Kas: ${formatRupiah(money)}`}
            className="flex items-center gap-0.5"
          >
            <MoneyIcon className="h-[9px] text-yellow-400" />
            <span className="text-yellow-300">{formatRupiah(money)}</span>
          </div>
          <div
            title={`Tabungan: ${formatRupiah(savings)}`}
            className="flex items-center gap-0.5"
          >
            <SavingsIcon className="h-[9px] text-blue-400" />
            <span className="text-blue-300">{formatRupiah(savings)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;