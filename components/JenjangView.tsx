import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { ADVANCEMENT_REWARDS, AdvancementTier } from '../constants';
import { formatRupiah } from '../services/localDataService';
import {
  MoneyIcon,
  SavingsIcon,
  ConsumableIcon,
  RekrutIcon,
  JenjangIcon,
} from './icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tierLabels: Record<AdvancementTier, string> = {
  mudah: 'Mudah',
  sedang: 'Sedang',
  sulit: 'Sulit',
  sangatSulit: 'Sangat Sulit',
};

const getRewardIcon = (type: string) => {
  switch (type) {
    case 'money':
      return <MoneyIcon className="w-5 h-5 text-yellow-400" />;
    case 'savings':
      return <SavingsIcon className="w-5 h-5 text-blue-400" />;
    case 'gachaTicket':
      return <RekrutIcon className="w-5 h-5 text-purple-400" />;
    default:
      return <ConsumableIcon className="w-5 h-5 text-green-400" />;
  }
};

const JenjangView: React.FC = () => {
  const level = useGameStore((state) => state.gameState.level);
  const claimedLevels = useGameStore(
    (state) => state.gameState.claimedAdvancementLevels
  );
  const { claimAdvancementReward } = useGameStore.getState();
  const isProcessing = useGameStore((state) => state.isProcessing);

  return (
    <div className="p-1 md:p-2">
      <h2 className="mb-3 text-xl font-serif text-center text-light-text">
        Jenjang Karir Agensi
      </h2>

      <motion.div
        className="max-w-2xl mx-auto space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(ADVANCEMENT_REWARDS).map(
          ([tier, rewardsInTier]) => (
            <motion.div key={tier} variants={itemVariants}>
              <h3 className="mt-4 mb-2 text-lg font-serif font-bold text-center text-brand-gold border-b-2 border-brand-gold/20 pb-1">
                Jenjang {tierLabels[tier as AdvancementTier]}
              </h3>
              <div className="space-y-3">
                {rewardsInTier.map((reward) => {
                  const isClaimed = claimedLevels.includes(reward.level);
                  const canClaim = level >= reward.level && !isClaimed;
                  const isLocked = level < reward.level;

                  return (
                    <motion.div
                      key={reward.level}
                      variants={itemVariants}
                      className={`p-3 rounded-xl shadow-lg border-2 transition-all duration-300 ${
                        canClaim
                          ? 'bg-gradient-to-r from-purple-900/50 to-amber-900/50 border-amber-400 animate-pulse'
                          : isClaimed
                          ? 'bg-green-900/30 border-green-700/50'
                          : 'bg-black/20 border-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className={`text-base font-serif font-bold ${
                              isLocked ? 'text-gray-500' : 'text-light-text'
                            }`}
                          >
                            Level {reward.level}: {reward.description}
                          </h3>
                          <div className="mt-2 space-y-1">
                            {reward.rewards.map((r, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-xs"
                              >
                                {getRewardIcon(r.type)}
                                <span
                                  className={`font-semibold ${
                                    isLocked
                                      ? 'text-gray-600'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  {r.amount && r.type !== 'money' && r.type !== 'savings' ? `${r.amount}x ` : ''}
                                  {r.type === 'money' || r.type === 'savings' ? formatRupiah(r.amount || 0) : ''}
                                  {' '}
                                  {/* FIX: The reward object does not have an 'itemSetName' property. It should be 'itemName'. */}
                                  {r.itemName}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {canClaim ? (
                            <button
                              onClick={() =>
                                claimAdvancementReward(reward.level)
                              }
                              disabled={isProcessing}
                              className="px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-amber-300 to-yellow-400 rounded-lg shadow-md hover:scale-105"
                            >
                              Klaim
                            </button>
                          ) : isClaimed ? (
                            <div className="px-4 py-2 text-sm font-bold text-green-300 bg-black/30 rounded-lg">
                              ✓ Diklaim
                            </div>
                          ) : (
                            <div className="px-4 py-2 text-sm font-bold text-gray-500 bg-black/30 rounded-lg">
                              Terkunci
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default JenjangView;