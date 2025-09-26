import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { WarningIcon, MoneyIcon, SavingsIcon } from './icons';
import { SATPOLPP_FINE_PERCENTAGE, SATPOLPP_SEAL_DURATION_DAYS_BASE, SATPOLPP_SEAL_DURATION_DAYS_WITH_FINE } from '../constants';

const SatpolPpRaidModal: React.FC = () => {
  const { resolveSatpolPpRaid } = useGameStore.getState();
  const savings = useGameStore((state) => state.gameState.savings);

  const fineAmount = Math.floor(savings * SATPOLPP_FINE_PERCENTAGE);
  const canAffordFine = savings >= fineAmount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md p-4 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-yellow-500/50"
      >
        <div className="text-center">
          <WarningIcon className="w-12 h-12 mx-auto text-yellow-500" />
          <h2 className="mt-2 text-xl font-serif font-bold text-yellow-300">
            RAZIA KETERTIBAN UMUM
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Berdasarkan laporan warga, Satpol-PP telah melakukan investigasi dan menyatakan asrama Anda melanggar ketertiban umum. Operasi Anda akan dihentikan sementara.
          </p>
        </div>
        <div className="p-2 mt-3 text-xs text-left text-yellow-200 bg-yellow-900/40 rounded-lg">
            <h3 className='font-bold text-center'>Konsekuensi:</h3>
            <ul className='list-disc list-inside'>
                <li>Asrama akan disegel dan tidak bisa beroperasi.</li>
                <li>Reputasi agensi akan anjlok.</li>
                <li>Agensi akan berada di bawah "Pengawasan Ketat" selama 30 hari.</li>
                <li>Kasus ini akan dilimpahkan ke Kepolisian untuk investigasi lebih lanjut.</li>
            </ul>
        </div>
        <div className="mt-4 space-y-3">
          <button
            onClick={() => resolveSatpolPpRaid(true)}
            disabled={!canAffordFine}
            className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50"
          >
            <p className="font-bold text-green-300">Bayar Denda & Kooperatif</p>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <SavingsIcon className="w-4 h-4"/> Bayar {formatRupiah(fineAmount)} dari Tabungan.
            </p>
            <p className="text-xs text-gray-400">
              Asrama disegel selama <span className="font-bold">{SATPOLPP_SEAL_DURATION_DAYS_BASE} hari</span>.
            </p>
          </button>
          <button
            onClick={() => resolveSatpolPpRaid(false)}
            className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50"
          >
            <p className="font-bold text-red-300">Terima Konsekuensi Penuh</p>
            <p className="text-xs text-gray-400">
              Tidak membayar denda. Asrama disegel selama <span className="font-bold">{SATPOLPP_SEAL_DURATION_DAYS_WITH_FINE} hari</span>.
            </p>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SatpolPpRaidModal;