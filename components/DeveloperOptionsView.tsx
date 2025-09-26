import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';
import { MoneyIcon, TalentCoinIcon } from './icons';

const DeveloperOptionsView: React.FC = () => {
  const setActiveView = useGameStore((state) => state.setActiveView);
  const toggleUnlimitedMoney = useGameStore(
    (state) => state.toggleUnlimitedMoney
  );
  const toggleUnlimitedTalentMoney = useGameStore(
    (state) => state.toggleUnlimitedTalentMoney
  );
  const unlimitedMoney = useGameStore(
    (state) => state.gameState.cheats.unlimitedMoney
  );
  const unlimitedTalentMoney = useGameStore(
    (state) => state.gameState.cheats.unlimitedTalentMoney
  );

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveView(View.PENGATURAN)}
          className="px-3 py-1 text-xs text-subtle-text bg-black/20 rounded-full shadow-md"
        >
          &larr; Kembali
        </button>
        <h2 className="flex-1 text-xl font-serif text-center text-yellow-300">
          Opsi Developer
        </h2>
      </div>

      <div className="max-w-2xl p-3 mx-auto space-y-3 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
        {/* --- Unlimited Agency Money Toggle --- */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
            <MoneyIcon className="w-6 h-6 text-yellow-400" />
            <div>
              <p
                id="unlimited-money-label"
                className="font-bold text-light-text"
              >
                Uang Kas Tak Terbatas
              </p>
              <p className="text-xs text-subtle-text">
                Mengatur Uang Kas agensi menjadi 999 Triliun.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleUnlimitedMoney}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              unlimitedMoney ? 'bg-green-500' : 'bg-gray-600'
            }`}
            role="switch"
            aria-checked={unlimitedMoney}
            aria-labelledby="unlimited-money-label"
          >
            <motion.span
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              className="absolute w-4 h-4 my-auto bg-white rounded-full top-0 bottom-0"
              animate={{ x: unlimitedMoney ? '1.5rem' : '0.25rem' }}
            />
          </button>
        </div>

        {/* --- Unlimited Talent Money Toggle --- */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
            <TalentCoinIcon className="w-6 h-6 text-purple-400" />
            <div>
              <p
                id="unlimited-talent-money-label"
                className="font-bold text-light-text"
              >
                Uang Talenta Tak Terbatas
              </p>
              <p className="text-xs text-subtle-text">
                Mengatur Dana Pribadi semua talenta menjadi 999 Triliun.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleUnlimitedTalentMoney}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              unlimitedTalentMoney ? 'bg-green-500' : 'bg-gray-600'
            }`}
            role="switch"
            aria-checked={unlimitedTalentMoney}
            aria-labelledby="unlimited-talent-money-label"
          >
            <motion.span
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              className="absolute w-4 h-4 my-auto bg-white rounded-full top-0 bottom-0"
              animate={{ x: unlimitedTalentMoney ? '1.5rem' : '0.25rem' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperOptionsView;
