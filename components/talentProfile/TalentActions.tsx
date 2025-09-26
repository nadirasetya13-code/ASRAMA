import React from 'react';
import { Talent } from '../../types';
import { useGameStore } from '../../controllers/gameController';
import { HeartIcon, LoadingSpinner, PhoneIcon, CameraIcon } from '../icons';
import {
  ENERGY_COST_PER_SESSION,
  LIVESTREAM_BASE_ENERGY_COST,
  LIVESTREAM_BASE_MENTAL_COST,
} from '../../constants';

interface TalentActionsProps {
  talent: Talent;
}

const TalentActions: React.FC<TalentActionsProps> = ({ talent }) => {
  const isProcessing = useGameStore((state) => state.isProcessing);
  const gamePhase = useGameStore((state) => state.gameState.gameTime.phase);
  const guests = useGameStore((state) => state.guests);
  const {
    confirmSelection,
    prepareLivestream,
    prepareProduction,
    openOutcallModal,
  } = useGameStore.getState();
  const isUnavailable =
    talent.unavailableUntil && talent.unavailableUntil > Date.now();

  if (gamePhase === 'Malam') {
    const isSessionPossible = guests.length > 0;
    if (!isSessionPossible) return null;

    const canPerformIncall =
      talent.currentEnergy >= ENERGY_COST_PER_SESSION && !isUnavailable;
    const canPerformOutcall = !isUnavailable;

    const incallButtonText = () => {
      if (isUnavailable) return talent.unavailabilityReason || 'Tidak Tersedia';
      if (talent.currentEnergy < ENERGY_COST_PER_SESSION) return 'Lelah';
      return 'Sesi (Dalam)';
    };

    const outcallButtonText = () => {
      if (isUnavailable) return talent.unavailabilityReason || 'Tidak Tersedia';
      return 'Tawaran Luar';
    };

    return (
      <div className="sticky bottom-0 z-10 grid grid-cols-2 gap-2 p-1.5 mt-auto bg-black/30 backdrop-blur-md border-t border-white/10">
        <button
          type="button"
          onClick={() => confirmSelection(talent)}
          disabled={isProcessing || !canPerformIncall}
          className="flex items-center justify-center w-full gap-2 px-4 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <LoadingSpinner className="w-4 h-4" />
          ) : (
            <HeartIcon className="w-4 h-4" />
          )}
          {incallButtonText()}
        </button>
        <button
          type="button"
          onClick={() => openOutcallModal(talent)}
          disabled={isProcessing || !canPerformOutcall}
          className="flex items-center justify-center w-full gap-2 px-4 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <HeartIcon className="w-4 h-4" />
          {outcallButtonText()}
        </button>
      </div>
    );
  }

  if (gamePhase === 'Siang') {
    // Livestream Logic
    const hasPhone = !!talent.equipment.ponsel;
    const hasEnergyForStream =
      talent.currentEnergy >= LIVESTREAM_BASE_ENERGY_COST;
    const hasMentalForStream = talent.mental >= LIVESTREAM_BASE_MENTAL_COST;
    const canLivestream =
      hasPhone && hasEnergyForStream && hasMentalForStream && !isUnavailable;

    const getStreamButtonText = () => {
      if (isUnavailable) return talent.unavailabilityReason || 'Tidak Tersedia';
      if (!hasPhone) return 'Butuh Ponsel';
      if (!hasEnergyForStream) return 'Energi Kurang';
      if (!hasMentalForStream) return 'Mental Lelah';
      return 'Mulai Livestream';
    };

    // Production Logic
    const hasCamera =
      !!talent.equipment.kameraDsr || !!talent.equipment.handycam;
    const hasLaptop = !!talent.equipment.laptop;
    const canProduceContent = hasCamera && hasLaptop && !isUnavailable;

    const getProductionButtonText = () => {
      if (isUnavailable) return talent.unavailabilityReason || 'Tidak Tersedia';
      if (!hasCamera || !hasLaptop) return 'Butuh Alat';
      return 'Produksi Konten';
    };

    return (
      <div className="sticky bottom-0 z-10 grid grid-cols-2 gap-2 p-1.5 mt-auto bg-black/30 backdrop-blur-md border-t border-white/10">
        <button
          type="button"
          onClick={() => prepareLivestream(talent.id)}
          disabled={isProcessing || !canLivestream}
          className="flex items-center justify-center w-full gap-2 px-4 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <PhoneIcon className="w-4 h-4" />
          {getStreamButtonText()}
        </button>
        <button
          type="button"
          onClick={() => prepareProduction(talent.id)}
          disabled={isProcessing || !canProduceContent}
          className="flex items-center justify-center w-full gap-2 px-4 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <CameraIcon className="w-4 h-4" />
          {getProductionButtonText()}
        </button>
      </div>
    );
  }

  return null;
};

export default TalentActions;
