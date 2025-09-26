import React from 'react';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';
import {
  TombstoneIcon,
  DevIcon,
  CreateIcon,
} from './icons';

const PengaturanView: React.FC = () => {
  const { setActiveView } = useGameStore.getState();
  const devOptionsUnlocked = useGameStore(
    (state) => state.gameState.devOptionsUnlocked
  );

  return (
    <div className="p-2 md:p-4">
      <h2 className="mb-3 text-xl font-serif text-center text-gray-200">
        Pengaturan
      </h2>
      <div className="max-w-2xl p-3 mx-auto space-y-3 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
        <button
          type="button"
          onClick={() => setActiveView(View.MAKAM_TALENTA)}
          className="w-full flex items-center gap-3 px-4 py-3 font-bold text-left text-light-text transition-colors bg-black/20 rounded-lg shadow-sm hover:bg-black/40"
        >
          <TombstoneIcon className="w-6 h-6 text-subtle-text" />
          Makam Talenta
        </button>

        <button
          type="button"
          onClick={() => setActiveView(View.BUAT)}
          className="w-full flex items-center gap-3 px-4 py-3 font-bold text-left text-light-text transition-colors bg-black/20 rounded-lg shadow-sm hover:bg-black/40"
        >
          <CreateIcon className="w-6 h-6 text-subtle-text" />
          Buat Talenta Kustom
        </button>

        {devOptionsUnlocked && (
          <button
            type="button"
            onClick={() => setActiveView(View.DEVELOPER_OPTIONS)}
            className="w-full flex items-center gap-3 px-4 py-3 font-bold text-left text-yellow-300 transition-colors bg-black/20 rounded-lg shadow-sm hover:bg-black/40"
          >
            <DevIcon className="w-6 h-6" />
            Opsi Developer
          </button>
        )}

        <div
          className="p-2.5 bg-red-900/40 border-l-4 border-red-500 text-red-200 rounded-md"
          role="alert"
        >
          <p className="text-sm font-bold text-red-100">
            PERHATIAN PENTING (18+)
          </p>
          <p className="text-xs">
            GAME INI HANYA UNTUK 18+ KONTEN DI DALAMNYA DIBUAT DENGAN VULGAR DAN
            EXPLISIT TANPA BATASAN.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PengaturanView;