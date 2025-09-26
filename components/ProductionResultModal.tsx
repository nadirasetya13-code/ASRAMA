import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import {
  MoneyIcon,
  HIVIcon as ScandalIcon,
  CameraIcon,
  PopularityIcon,
} from './icons';

const ProductionResultModal: React.FC = () => {
  const { closeProductionResult } = useGameStore.getState();
  const result = useGameStore((state) => state.productionResult);
  const talent = useGameStore((state) =>
    state.talents.find((t) => t.id === result?.talentId)
  );

  if (!result || !talent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeProductionResult}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-sm p-3 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-serif font-bold text-center text-light-text">
          Produksi Selesai!
        </h2>
        <p className="text-sm text-center text-subtle-text">{talent.name}</p>

        {result.scandal && (
          <div className="p-2 mt-3 text-xs text-center border rounded-lg shadow-inner bg-red-900/40 border-red-700/50">
            <h4 className="flex items-center justify-center gap-1.5 pb-1 mb-1 text-sm font-bold text-center border-b text-red-300 border-red-600/50">
              <ScandalIcon className="w-4 h-4" /> SKANDAL TERJADI!
            </h4>
            <p className="font-semibold text-red-200">
              {result.scandal.description}
            </p>
          </div>
        )}

        <div className="p-3 mt-4 space-y-2 rounded-lg shadow-inner bg-black/20">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-semibold text-green-400">
              <CameraIcon className="w-4 h-4" /> Konten Diproduksi
            </span>
            <span className="font-bold text-green-300">
              {result.producedItemsCount} {result.contentType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-semibold text-yellow-400">
              <PopularityIcon className="w-4 h-4" /> Kualitas Rata-rata
            </span>
            <span className="font-bold text-yellow-300">
              {result.averageQuality} / 100
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-semibold text-red-400">
              <MoneyIcon className="w-4 h-4" /> Total Biaya
            </span>
            <span className="font-bold text-red-300">
              {formatRupiah(result.totalCost)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeProductionResult}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
        >
          Tutup
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductionResultModal;
