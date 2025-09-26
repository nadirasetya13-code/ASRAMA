import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah, calculateAtmTax } from '../services/localDataService';
import {
  CashierIcon,
  HeartIcon,
  MoneyIcon,
  SavingsIcon,
} from './icons';

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

const KasirView: React.FC = () => {
  const unpaidSessions = useGameStore((state) => state.gameState.unpaidSessions);
  const money = useGameStore((state) => state.gameState.money);
  const savings = useGameStore((state) => state.gameState.savings);
  const { setViewingReceipt, transferFunds, isProcessing } =
    useGameStore.getState();

  const [transferAmount, setTransferAmount] = useState('');

  const numericAmount = Number(transferAmount) || 0;
  const { tax, netAmount } = useMemo(
    () => calculateAtmTax(numericAmount),
    [numericAmount]
  );

  const unpaidSummary = useMemo(() => {
    if (unpaidSessions.length === 0) {
      return { count: 0, total: 0 };
    }
    const total = unpaidSessions.reduce(
      (sum, session) => sum + session.pendapatanKotor,
      0
    );
    return { count: unpaidSessions.length, total };
  }, [unpaidSessions]);

  const handleTransfer = (direction: 'savingsToCash' | 'cashToSavings') => {
    if (numericAmount > 0) {
      transferFunds(numericAmount, direction);
      setTransferAmount('');
    }
  };

  const handleSetMax = (source: 'money' | 'savings') => {
    setTransferAmount(String(source === 'money' ? money : savings));
  };

  const canAffordCashToSavings = money >= numericAmount;
  const canAffordSavingsToCash = savings >= numericAmount;

  return (
    <div className="p-1 md:p-2">
      <h2 className="mb-4 text-xl font-serif text-center text-light-text">
        Meja Kasir
      </h2>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* ATM Section */}
        <motion.div
          className="p-3 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="mb-3 text-base font-serif font-bold text-center text-light-text">
            ATM Agensi
          </h3>
          {/* Balances */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 text-center rounded-lg bg-yellow-900/30">
              <p className="text-[11px] font-bold text-yellow-300">UANG KAS</p>
              <p className="font-bold text-yellow-200">{formatRupiah(money)}</p>
            </div>
            <div className="p-2 text-center rounded-lg bg-blue-900/30">
              <p className="text-[11px] font-bold text-blue-300">TABUNGAN</p>
              <p className="font-bold text-blue-200">{formatRupiah(savings)}</p>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                Rp
              </span>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Masukkan Jumlah Transfer"
                aria-label="Jumlah Transfer"
                className="w-full py-1.5 pl-8 pr-4 text-sm transition bg-black/30 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent text-light-text"
              />
            </div>
            {numericAmount > 0 && (
              <div className="p-2 text-xs text-center bg-gray-800/50 rounded-md">
                <p>
                  Pajak Transfer:{' '}
                  <span className="font-bold text-red-400">
                    {formatRupiah(tax)}
                  </span>
                </p>
                <p>
                  Jumlah Diterima:{' '}
                  <span className="font-bold text-green-400">
                    {formatRupiah(netAmount)}
                  </span>
                </p>
              </div>
            )}
            <div className="space-y-2">
              {/* Savings to Cash */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTransfer('savingsToCash')}
                  disabled={
                    isProcessing || !canAffordSavingsToCash || numericAmount === 0
                  }
                  className="flex-grow flex items-center justify-center gap-2 p-2.5 text-sm font-bold text-white transition transform bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg shadow-md hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <MoneyIcon className="h-5" /> Tarik Tunai
                </button>
                <button
                  type="button"
                  onClick={() => handleSetMax('savings')}
                  disabled={isProcessing || savings === 0}
                  className="w-20 px-3 text-xs font-bold text-white transition-colors bg-blue-800/70 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
                  aria-label="Atur jumlah ke total tabungan"
                >
                  Semua
                </button>
              </div>

              {/* Cash to Savings */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTransfer('cashToSavings')}
                  disabled={
                    isProcessing || !canAffordCashToSavings || numericAmount === 0
                  }
                  className="flex-grow flex items-center justify-center gap-2 p-2.5 text-sm font-bold text-white transition transform bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <SavingsIcon className="h-5" /> Setor Tunai
                </button>
                <button
                  type="button"
                  onClick={() => handleSetMax('money')}
                  disabled={isProcessing || money === 0}
                  className="w-20 px-3 text-xs font-bold text-white transition-colors bg-purple-800/70 rounded-lg hover:bg-purple-700 disabled:bg-gray-500"
                  aria-label="Atur jumlah ke total uang kas"
                >
                  Semua
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unpaid Sessions Section */}
        <motion.div
          className="p-2.5 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="mb-3 text-base font-serif font-bold text-center text-light-text">
            Tagihan Tertunda
          </h3>
          {unpaidSessions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2 mb-3 text-sm text-center bg-gray-800/50 rounded-md"
            >
              Total{' '}
              <span className="font-bold text-white">
                {unpaidSummary.count}
              </span>{' '}
              tagihan sejumlah{' '}
              <span className="font-bold text-green-400">
                {formatRupiah(unpaidSummary.total)}
              </span>
            </motion.div>
          )}
          <AnimatePresence>
            {unpaidSessions.length > 0 ? (
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {unpaidSessions.map((session) => (
                  <motion.button
                    type="button"
                    key={session.sessionId}
                    variants={itemVariants}
                    layout
                    onClick={() => setViewingReceipt(session)}
                    className="w-full p-2 text-left transition-transform transform rounded-xl shadow-lg cursor-pointer bg-dark-tertiary/60 hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-4">
                          <img
                            src={session.guestImageUrl}
                            alt={session.guestName}
                            className="object-cover w-10 h-10 border-2 border-dark-secondary rounded-full shadow-sm"
                          />
                          <img
                            src={session.talentImageUrl}
                            alt={session.talentName}
                            className="object-cover w-10 h-10 border-2 border-dark-secondary rounded-full shadow-sm"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-light-text">
                            {session.guestName}
                          </p>
                          <div className="flex items-center gap-1">
                            <HeartIcon className="w-3 h-3 text-pink-500" />
                            <p className="text-[11px] font-semibold text-subtle-text">
                              {session.talentName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400">
                          Tagihan
                        </span>
                        <p className="text-base font-bold text-green-400">
                          {formatRupiah(session.pendapatanKotor)}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <CashierIcon className="w-12 h-12 mb-3 text-gray-600" />
                <h3 className="text-lg font-serif text-light-text">
                  Tidak Ada Tagihan
                </h3>
                <p className="max-w-xs mt-1 text-sm text-subtle-text">
                  Selesaikan sesi di malam hari untuk membuat tagihan baru.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default KasirView;