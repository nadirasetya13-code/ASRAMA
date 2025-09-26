import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { LIVESTREAM_PACKAGES } from '../constants';
import { formatRupiah } from '../services/localDataService';
import { MoneyIcon } from './icons';

const LivestreamPackageModal: React.FC = () => {
    const { cancelLivestreamSetup, selectLivestreamPackage } = useGameStore.getState();
    const money = useGameStore(state => state.gameState.money);
    const isProcessing = useGameStore(state => state.isProcessing);
    const talentId = useGameStore(state => state.livestreamSetup?.talentId);
    const talent = useGameStore(state => state.talents.find(t => t.id === talentId));

    if (!talent) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={cancelLivestreamSetup}
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
                    Pilih Paket Internet
                </h2>
                <p className="text-sm text-center text-subtle-text">
                    Pilih durasi siaran untuk {talent.name}
                </p>

                <div className="mt-4 space-y-2">
                    {LIVESTREAM_PACKAGES.map(pkg => {
                        const canAfford = money >= pkg.cost;
                        return (
                            <button
                                key={pkg.id}
                                disabled={!canAfford || isProcessing}
                                onClick={() => selectLivestreamPackage(pkg.id)}
                                className="w-full grid grid-cols-3 gap-2 p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="font-bold text-light-text">
                                    <p>{pkg.data}</p>
                                    <p className="text-xs text-brand-purple">{pkg.scenarios} Skenario</p>
                                </div>
                                <div className="col-span-2 flex items-center justify-end">
                                     <div className="flex items-center justify-center gap-1 px-3 py-1 text-sm font-bold text-white rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-blue-500">
                                        <MoneyIcon className="w-4 h-4" />
                                        <span>{formatRupiah(pkg.cost)}</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={cancelLivestreamSetup}
                    className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
                >
                    Batal
                </button>
            </motion.div>
        </motion.div>
    );
};

export default LivestreamPackageModal;