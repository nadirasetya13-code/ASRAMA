import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import {
  PRODUCTION_THEMES,
  PRODUCTION_ENERGY_COST,
  PRODUCTION_MENTAL_COST,
  PRODUCTION_BATCH_SIZES,
} from '../constants';
import {
  MoneyIcon,
  MentalIcon,
  StaminaIcon,
  ChevronDownIcon,
} from './icons';
import { calculateProductionCost, formatRupiah } from '../services/localDataService';

const ProductionSetupModal: React.FC = () => {
  const { cancelProduction, startProduction } = useGameStore.getState();
  const setup = useGameStore((state) => state.productionSetup);
  const money = useGameStore((state) => state.gameState.money);
  const talent = useGameStore((state) =>
    state.talents.find((t) => t.id === setup?.talentId)
  );

  const [step, setStep] = useState(1);
  const [batchSize, setBatchSize] = useState(PRODUCTION_BATCH_SIZES[0]);
  const [contentType, setContentType] = useState<'Foto' | 'Video'>('Foto');

  const estimatedCost = useMemo(() => {
    if (!talent) return 0;
    return calculateProductionCost(talent, contentType, batchSize);
  }, [talent, contentType, batchSize]);

  if (!talent || !setup) return null;

  const energyCost = PRODUCTION_ENERGY_COST[contentType] * batchSize;
  const mentalCost = PRODUCTION_MENTAL_COST[contentType] * batchSize;

  const canAfford =
    money >= estimatedCost &&
    talent.currentEnergy >= energyCost &&
    talent.mental >= mentalCost;

  const handleStartProduction = (theme: string) => {
    if (!canAfford) return;
    startProduction(batchSize, contentType, theme);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Batch Size & Content Type
        return (
          <>
            <h2 className="text-lg font-serif font-bold text-center text-light-text">
              Atur Produksi
            </h2>
            <p className="text-sm text-center text-subtle-text">
              Untuk {talent.name}
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="batch-size-select" className="block mb-1 text-sm font-bold text-gray-300">
                  Jumlah Produksi
                </label>
                <div className="relative">
                  <select
                    id="batch-size-select"
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-white bg-black/30 border border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  >
                    {PRODUCTION_BATCH_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size} file
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 right-3 top-1/2" />
                </div>
              </div>
              <fieldset>
                 <legend className="block mb-1 text-sm font-bold text-gray-300">
                  Jenis Konten
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setContentType('Foto')}
                    className={`p-2 rounded-lg border-2 ${
                      contentType === 'Foto'
                        ? 'bg-purple-600 border-purple-400'
                        : 'bg-black/30 border-gray-600'
                    }`}
                  >
                    Foto
                  </button>
                  <button
                    onClick={() => setContentType('Video')}
                    className={`p-2 rounded-lg border-2 ${
                      contentType === 'Video'
                        ? 'bg-purple-600 border-purple-400'
                        : 'bg-black/30 border-gray-600'
                    }`}
                  >
                    Video
                  </button>
                </div>
              </fieldset>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-2 mt-6 font-bold text-white rounded-lg bg-brand-purple"
            >
              Lanjut Pilih Tema
            </button>
          </>
        );
      case 2: // Theme & Confirmation
        return (
          <>
            <h2 className="text-lg font-serif font-bold text-center text-light-text">
              Pilih Tema Produksi
            </h2>
             <p className="text-sm text-center text-subtle-text">
              Memproduksi: <span className="font-bold text-white">{batchSize} {contentType}</span>
            </p>
            <div className="pr-2 mt-2 space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(PRODUCTION_THEMES).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleStartProduction(key)}
                  disabled={!canAfford}
                  className="w-full p-2 text-left transition-colors bg-black/30 rounded-lg hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="font-bold">{theme.label}</p>
                  <p className="text-xs text-subtle-text">{theme.description}</p>
                </button>
              ))}
            </div>
            <div className="p-2 mt-3 space-y-1 text-xs text-center border-t border-b border-gray-700">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-red-400">
                  <StaminaIcon className="w-3 h-3" />-{energyCost}
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <MentalIcon className="w-3 h-3" />-{mentalCost}
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-yellow-300">
                <MoneyIcon className="w-3 h-3" />
                <span>Biaya: {formatRupiah(estimatedCost)}</span>
              </div>
               <AnimatePresence>
                {!canAfford && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 space-y-0.5"
                  >
                    {money < estimatedCost && (
                      <p className="font-bold text-red-500">
                        Uang Kas Tidak Cukup!
                      </p>
                    )}
                    {talent.currentEnergy < energyCost && (
                      <p className="font-bold text-red-500">
                        Energi Talenta Tidak Cukup!
                      </p>
                    )}
                    {talent.mental < mentalCost && (
                      <p className="font-bold text-red-500">
                        Mental Talenta Tidak Cukup!
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={cancelProduction}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-sm p-3 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {renderStepContent()}
        <button
          type="button"
          onClick={step === 1 ? cancelProduction : () => setStep(1)}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
        >
          {step === 1 ? 'Batal' : 'Kembali'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductionSetupModal;
