import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { Talent } from '../types';
import {
  formatRupiah,
  calculateOutcallResult,
} from '../services/localDataService';
import { OUTCALL_CONFIG, OutcallType } from '../constants';
import {
  MoneyIcon,
  StaminaIcon,
  MentalIcon,
  HeartIcon,
  LoadingSpinner,
} from './icons';

interface OutcallModalProps {
  talent: Talent;
}

const OutcallModal: React.FC<OutcallModalProps> = ({ talent }) => {
  const { closeOutcallModal, handleOutcall } = useGameStore.getState();
  const guest = useGameStore((state) => state.guests[0]);
  const isProcessing = useGameStore((state) => state.isProcessing);

  if (!talent || !guest) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeOutcallModal}
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
          Tawaran Tugas Luar
        </h2>
        <p className="text-sm text-center text-subtle-text">
          {talent.name} untuk {guest.name}
        </p>

        <div className="mt-4 space-y-3">
          {(Object.keys(OUTCALL_CONFIG) as OutcallType[]).map((type) => {
            const config = OUTCALL_CONFIG[type];
            const { result } = calculateOutcallResult(talent, guest, type);
            
            // Refactor for clarity: Use positive numbers for costs
            const energyCost = result.talentImpact.energyChange; // This is already a positive value representing cost
            const mentalCost = -result.talentImpact.mentalChange; // Convert negative change to positive cost
            const canAfford =
              talent.currentEnergy >= energyCost && talent.mental >= mentalCost;

            return (
              <div
                key={type}
                className={`p-2 rounded-lg ${
                  canAfford ? 'bg-black/30' : 'bg-red-900/40'
                }`}
              >
                <h3 className="font-bold text-brand-gold">{config.label}</h3>
                <p className="text-[11px] text-gray-400">
                  Tidak tersedia selama {config.unavailabilityDays} hari.
                </p>
                <div className="grid grid-cols-2 gap-x-2 text-xs mt-1">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-green-400">
                      <MoneyIcon className="w-3 h-3" />
                      Laba Agensi:
                    </span>
                    <span className="font-bold">
                      {formatRupiah(result.labaBersih)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-purple-400">
                      <HeartIcon className="w-3 h-3" />
                      Dana Talenta:
                    </span>
                    <span className="font-bold">
                      {formatRupiah(result.talentEarnings)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-red-400">
                      <StaminaIcon className="w-3 h-3" />
                      Energi:
                    </span>
                    <span className="font-bold">-{energyCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-blue-400">
                      <MentalIcon className="w-3 h-3" />
                      Mental:
                    </span>
                    <span className="font-bold">-{mentalCost}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleOutcall(type)}
                  disabled={!canAfford || isProcessing}
                  className="w-full py-1 mt-2 text-sm font-bold text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <LoadingSpinner className="w-4 h-4 mx-auto" />
                  ) : canAfford ? (
                    'Terima Tawaran'
                  ) : (
                    'Sumber Daya Kurang'
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={closeOutcallModal}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
        >
          Batal
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OutcallModal;
