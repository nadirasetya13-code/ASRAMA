import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { WarningIcon, LoadingSpinner } from './icons';
import { RAID_BRIBE_COST_PERCENTAGE } from '../constants';

const RaidModal: React.FC = () => {
  const { handleRaidChoice, resolveRaid } = useGameStore.getState();
  const event = useGameStore((state) => state.activeRaidEvent);
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);

  if (!event) return null;

  const bribeCost = Math.floor(money * RAID_BRIBE_COST_PERCENTAGE);

  const renderDecisionView = () => (
    <>
      <div className="text-center">
        <WarningIcon className="w-12 h-12 mx-auto text-red-500" />
        <h2
          id="raid-modal-title"
          className="mt-2 text-xl font-serif font-bold text-red-300"
        >
          PENGGEREBEKAN!
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Pintu gerbang asramamu digedor! Puluhan warga yang dipimpin oleh ketua
          RW setempat menuntut asrama ditutup karena dianggap meresahkan.
          Tindakanmu selanjutnya akan menentukan nasib agensimu malam ini!
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <button
          onClick={() => handleRaidChoice('bribe')}
          disabled={isProcessing}
          className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50"
        >
          <p className="font-bold text-yellow-300">Sogok Ketua RW</p>
          <p className="text-xs text-gray-400">
            Coba selesaikan masalah dengan uang. Biaya:{' '}
            <span className="font-semibold">{formatRupiah(bribeCost)}</span>.
            Peluang berhasil bergantung pada level agensi.
          </p>
        </button>
        <button
          onClick={() => handleRaidChoice('negotiate')}
          disabled={isProcessing}
          className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50"
        >
          <p className="font-bold text-blue-300">Negosiasi</p>
          <p className="text-xs text-gray-400">
            Kirim talenta dengan Mental tertinggi untuk menenangkan massa.
            Berisiko tinggi, tapi bisa menyelesaikan masalah tanpa biaya.
          </p>
        </button>
        <button
          onClick={() => handleRaidChoice('hide')}
          disabled={isProcessing}
          className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50"
        >
          <p className="font-bold text-gray-300">Bersembunyi</p>
          <p className="text-xs text-gray-400">
            Peluang berhasil sangat rendah, kegagalan akan berakibat fatal.
          </p>
        </button>
      </div>
    </>
  );

  const renderResultView = () => {
    // Refactored logic: Branch directly on the 'success' flag for clarity and robustness.
    if (event.success) {
      // Success Case
      return (
        <div className="text-center">
          <h2
            id="raid-modal-title"
            className="text-xl font-serif font-bold text-green-400"
          >
            BERHASIL!
          </h2>
          {event.negotiatingTalent && (
            <p className="text-sm text-gray-300">
              {event.negotiatingTalent.name} (Mental{' '}
              {event.negotiatingTalent.mental})
            </p>
          )}
          {event.message && (
            <p className="mt-2 text-sm text-gray-300">{event.message}</p>
          )}
          <p className="p-2 mt-3 text-xs font-semibold text-green-200 bg-green-900/40 rounded-lg">
            Operasi aman untuk malam ini. Kecurigaan warga telah mereda.
          </p>
        </div>
      );
    } else {
      // Failure Case
      return (
        <div className="text-center">
          <h2
            id="raid-modal-title"
            className="text-xl font-serif font-bold text-red-400"
          >
            GAGAL!
          </h2>
          {event.negotiatingTalent && (
            <p className="text-sm text-gray-300">
              {event.negotiatingTalent.name} (Mental{' '}
              {event.negotiatingTalent.mental})
            </p>
          )}
          {event.message && (
            <p className="mt-2 text-sm text-gray-300">{event.message}</p>
          )}
          <div className="p-2 mt-3 text-xs text-left text-red-200 bg-red-900/40 rounded-lg">
            <h3 className="font-bold text-center">Konsekuensi:</h3>
            <ul className="list-disc list-inside">
              <li>Asrama disegel selama beberapa hari.</li>
              <li>Reputasi anjlok.</li>
              <li>Denda dari kas warga.</li>
              <li>Semua talenta mengalami trauma.</li>
              <li>Operasi diawasi lebih ketat.</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raid-modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md p-4 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-red-500/50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={event.status}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {event.status === 'decision' && renderDecisionView()}
            {event.status === 'result' && renderResultView()}
          </motion.div>
        </AnimatePresence>

        {event.status === 'result' && (
          <button
            onClick={resolveRaid}
            className="w-full py-2 mt-4 font-bold text-white rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Lanjutkan
          </button>
        )}
        {isProcessing && event.status === 'decision' && (
          <div className="flex justify-center mt-4">
            <LoadingSpinner className="w-8 h-8" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RaidModal;
