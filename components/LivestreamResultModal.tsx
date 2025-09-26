import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { MoneyIcon, PopularityIcon, StaminaIcon, MentalIcon } from './icons';

const LivestreamResultModal: React.FC = () => {
    const { closeLivestreamResult } = useGameStore.getState();
    const result = useGameStore((state) => state.livestreamResult);
    const talent = useGameStore(state => state.talents.find(t => t.id === result?.talentId));

    if (!result || !talent) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeLivestreamResult}
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
                    Laporan Livestream
                </h2>
                <p className="text-sm text-center text-subtle-text">{talent.name}</p>
                 <p className="mt-1 text-xs font-semibold text-center text-brand-purple bg-black/20 rounded-full">
                    Topik: {result.topicLabel}
                </p>

                <div className="p-3 mt-4 space-y-2 rounded-lg shadow-inner bg-black/20">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 font-semibold text-green-400">
                           <MoneyIcon className="w-4 h-4" /> Pendapatan
                        </span>
                        <span className="font-bold text-green-300">
                           {formatRupiah(result.earnings)}
                        </span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 font-semibold text-yellow-400">
                           <PopularityIcon className="w-4 h-4" /> Popularitas Baru
                        </span>
                        <span className="font-bold text-yellow-300">
                           +{result.popularityGain}
                        </span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-subtle-text">
                           Puncak Penonton
                        </span>
                        <span className="font-bold text-light-text">
                           {result.peakViewers.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>

                <div className="p-3 mt-2 space-y-2 rounded-lg shadow-inner bg-black/20">
                     <h3 className="pb-1 text-sm font-serif font-bold text-center border-b text-red-300 border-red-700/50">
                        Dampak pada Talenta
                    </h3>
                     <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 font-semibold text-red-400">
                           <StaminaIcon className="w-4 h-4" /> Energi Terpakai
                        </span>
                        <span className="font-bold text-red-300">
                           {result.energyChange}
                        </span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 font-semibold text-red-400">
                           <MentalIcon className="w-4 h-4" /> Beban Mental
                        </span>
                        <span className="font-bold text-red-300">
                           {result.mentalChange}
                        </span>
                    </div>
                </div>
                

                <button
                    type="button"
                    onClick={closeLivestreamResult}
                    className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
                >
                    Tutup
                </button>
            </motion.div>
        </motion.div>
    );
};

export default LivestreamResultModal;
