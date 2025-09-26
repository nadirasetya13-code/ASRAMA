import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { Talent, View } from '../types';
import { formatRupiah } from '../services/localDataService';
import { RARITY_CONFIG, REINCARNATION_COST } from '../constants';
import { LoadingSpinner, MoneyIcon, TombstoneIcon } from './icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const formatTimeLeft = (ms: number) => {
  if (ms <= 0) return 'Siap';
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`;
};

const HibernatingTalentCard: React.FC<{ talent: Talent }> = ({ talent }) => {
  const { reincarnateTalent } = useGameStore.getState();
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);
  const [timeLeft, setTimeLeft] = useState(
    (talent.hibernationEndTime as number) - Date.now()
  );

  // More robust timer effect that recalculates from Date.now() to prevent drift
  useEffect(() => {
    const endTime = talent.hibernationEndTime as number;
    if (endTime <= Date.now()) {
      setTimeLeft(0);
      return; // No interval needed
    }

    const timer = setInterval(() => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [talent.hibernationEndTime]);

  const rarityConfig = RARITY_CONFIG[talent.rarity];
  const canAfford = money >= REINCARNATION_COST;
  const isReady = timeLeft <= 0;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col overflow-hidden rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
    >
      <div className="relative">
        <img
          src={talent.imageUrl}
          alt={talent.name}
          className="object-cover w-full h-32 opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white">
          <h3 className="font-serif font-bold">{talent.name}</h3>
          <p className={`text-xs font-semibold ${rarityConfig.color}`}>
            {talent.rarity} - Pensiun di Lvl. {talent.level}
          </p>
          {talent.reincarnationCount > 0 && (
             <p className="px-2 mt-1 text-xs font-bold bg-yellow-400 rounded-full text-yellow-900">
               Reinkarnasi x{talent.reincarnationCount}
             </p>
          )}
        </div>
      </div>
      <div className="p-3">
        {isReady ? (
          <button
            type="button"
            onClick={() => reincarnateTalent(talent.id)}
            disabled={!canAfford || isProcessing}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 ${
              canAfford
                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                : 'bg-gray-400'
            }`}
            aria-label={`Reinkarnasi ${talent.name}, biaya ${formatRupiah(REINCARNATION_COST)}`}
          >
            Reinkarnasi
            <div className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-black/20">
              <MoneyIcon className="h-4" />
              <span>{formatRupiah(REINCARNATION_COST)}</span>
            </div>
          </button>
        ) : (
          <div className="py-2 text-center text-gray-300 bg-gray-800/50 rounded-lg">
            <p className="text-xs font-semibold">Mati Suri hingga:</p>
            <p className="font-mono text-lg font-bold">
              {formatTimeLeft(timeLeft)}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MakamTalentaView: React.FC = () => {
  const { setActiveView } = useGameStore.getState();
  const allTalents = useGameStore((state) => state.talents);

  const hibernatingTalents = useMemo(
    () => allTalents.filter((t) => t.hibernationEndTime),
    [allTalents]
  );

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setActiveView(View.PENGATURAN)}
          className="px-3 py-1 text-xs text-subtle-text bg-black/20 rounded-full shadow-md"
        >
          &larr; Kembali
        </button>
        <h2 className="flex-1 text-xl font-serif text-center text-light-text -ml-12">
          Makam Talenta
        </h2>
      </div>

      <AnimatePresence>
        {hibernatingTalents.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {hibernatingTalents.map((talent) => (
              <HibernatingTalentCard key={talent.id} talent={talent} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center text-subtle-text"
          >
            <TombstoneIcon className="w-16 h-16 mx-auto mb-4 text-gray-700" />
            <h3 className="text-lg font-serif">Makam masih kosong...</h3>
            <p className="mt-1 text-sm">
              Talenta yang mencapai usia senja akan beristirahat di sini.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MakamTalentaView;