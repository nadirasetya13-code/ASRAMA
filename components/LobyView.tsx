import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';
import GuestCard from './GuestCard';
import { LoadingSpinner, LobyIcon, TargetIcon } from './icons';
import { ENERGY_COST_PER_SESSION } from '../constants';

const LobyView: React.FC = () => {
  const isProcessing = useGameStore((state) => state.isProcessing);
  const guests = useGameStore((state) => state.guests);
  const talents = useGameStore((state) => state.talents);
  const gamePhase = useGameStore((state) => state.gameState.gameTime.phase);
  const asramaSealedUntil = useGameStore(
    (state) => state.gameState.asramaSealedUntil
  );
  const { setActiveView, startNight, endDay, setViewingGuest, confirmSelection } =
    useGameStore.getState();
  
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (asramaSealedUntil) {
      const updateTimer = () => {
        const remaining = asramaSealedUntil - Date.now();
        if (remaining <= 0) {
          setTimeLeft('');
        } else {
          const hours = Math.floor((remaining / (1000 * 60 * 60)));
          const minutes = Math.floor((remaining / (1000 * 60)) % 60);
          const seconds = Math.floor((remaining / 1000) % 60);
          setTimeLeft(
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
              2,
              '0'
            )}:${String(seconds).padStart(2, '0')}`
          );
        }
      };

      updateTimer(); // Initial call
      const timerId = setInterval(updateTimer, 1000);
      return () => clearInterval(timerId);
    }
  }, [asramaSealedUntil]);

  const currentGuest = guests.length > 0 ? guests[0] : null;

  const renderNightActionButtons = () => {
    if (!currentGuest) {
      return null;
    }

    if (currentGuest.requestedTalentId) {
      const requestedTalent = talents.find(
        (t) => t.id === currentGuest.requestedTalentId
      );

      if (!requestedTalent) {
        return (
          <button
            type="button"
            onClick={() => setActiveView(View.TALENTA)}
            disabled={isProcessing}
            className="w-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
          >
            Talent Diminta Tidak Ditemukan (Pilih Lain)
          </button>
        );
      }

      const isTalentAvailable =
        requestedTalent.currentEnergy >= ENERGY_COST_PER_SESSION &&
        !(
          requestedTalent.unavailableUntil &&
          requestedTalent.unavailableUntil > Date.now()
        );
        
      const buttonText = isTalentAvailable
        ? `Panggil ${requestedTalent.name}`
        : requestedTalent.unavailabilityReason || `${requestedTalent.name} Tidak Tersedia`;

      return (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => confirmSelection(requestedTalent)}
            disabled={isProcessing || !isTalentAvailable}
            title={!isTalentAvailable ? `Alasan: ${requestedTalent.unavailabilityReason}` : ''}
            className="w-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 animate-pulse disabled:animate-none"
          >
            {buttonText}
          </button>
          <button
            type="button"
            onClick={() => setActiveView(View.TALENTA)}
            disabled={isProcessing}
            className="w-full px-5 py-2 text-xs font-bold text-gray-200 bg-gray-700/80 rounded-full shadow-md transform transition-transform hover:scale-105 disabled:bg-gray-500/50"
          >
            Tawarkan Pengganti
          </button>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          onClick={() => setActiveView(View.TALENTA)}
          disabled={isProcessing}
          className="w-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 animate-pulse disabled:animate-none"
        >
          Pilihkan Talent
        </button>
      );
    }
  };

  const renderNightView = () => (
    <LayoutGroup>
      <div className="p-2 space-y-4">
        <div className="flex flex-col p-4 border rounded-xl shadow-lg bg-black/20 backdrop-blur-md border-white/10 min-h-[320px]">
          <h2 className="pb-2 mb-4 text-base font-serif font-bold text-center text-gray-200 border-b border-brand-pink/50">
            Meja Resepsionis
          </h2>
          <div className="relative flex flex-col items-center justify-center flex-grow w-full">
            <AnimatePresence mode="wait">
              {currentGuest ? (
                <motion.div
                  key={currentGuest.id}
                  layoutId="current-guest-card"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="w-full max-w-xs"
                >
                  <GuestCard guest={currentGuest} />
                </motion.div>
              ) : (
                <motion.div
                  key="no-guest"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <LobyIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <h3 className="text-lg font-serif text-gray-200">
                    Semua tamu telah dilayani.
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Waktunya menutup asrama dan beristirahat.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="pt-4 mt-auto">
            {currentGuest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderNightActionButtons()}
              </motion.div>
            )}
          </div>
        </div>
        <div className="p-3 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
          <h2 className="pb-2 mb-4 text-base font-serif font-bold text-center border-b-2 text-gray-200 border-brand-pink">
            Ruang Tunggu
          </h2>
          <div className="relative flex items-end justify-center w-full h-24 max-w-xs p-2 mx-auto">
            <svg
              className="absolute bottom-0 left-0 z-0 w-full"
              viewBox="0 0 280 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 58C4.47715 58 0 53.5228 0 48V20C0 14.4772 4.47715 10 10 10H270C275.523 10 280 14.4772 280 20V48C280 53.5228 275.523 58 270 58H10Z"
                fill="url(#paint0_linear_1_2)"
              />
              <path
                d="M20 15H260C265.523 15 270 19.4772 270 25V40H10V25C10 19.4772 14.4772 15 20 15Z"
                className="fill-purple-300"
              />
              <rect
                x="15"
                y="58"
                width="15"
                height="4"
                rx="2"
                className="fill-purple-600"
              />
              <rect
                x="250"
                y="58"
                width="15"
                height="4"
                rx="2"
                className="fill-purple-600"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_2"
                  x1="140"
                  y1="10"
                  x2="140"
                  y2="58"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#c084fc" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative z-10 flex items-end justify-center w-full gap-3">
              <AnimatePresence>
                {guests.slice(1).length > 0 ? (
                  guests.slice(1).map((guest, index) => (
                    <motion.div
                      key={guest.id}
                      layoutId={index === 0 ? 'current-guest-card' : undefined}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.2,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setViewingGuest(guest)}
                        className="relative text-center transition-transform transform rounded-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                        title={`Lihat profil ${guest.name}`}
                      >
                        <img
                          src={guest.imageUrl}
                          alt={guest.name}
                          className="object-cover w-12 h-12 mx-auto border-2 border-white rounded-full shadow-md"
                        />
                         {guest.requestedTalentId && (
                            <div className="absolute -top-1 -right-1 p-0.5 bg-amber-500 rounded-full shadow-md border border-white">
                                <TargetIcon className="w-2.5 h-2.5 text-white" />
                            </div>
                        )}
                        <p className="w-12 mt-1 text-[11px] font-sans font-semibold text-gray-300 truncate">
                          {guest.name.split(' ')[0]}
                        </p>
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="mb-2 text-sm italic font-serif text-gray-400/90">
                    Sofa kosong...
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={endDay}
            disabled={isProcessing}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
          >
            {isProcessing ? (
              <LoadingSpinner className="w-5 h-5" />
            ) : (
              'Akhiri Malam & Tutup Asrama'
            )}
          </button>
        </div>
      </div>
    </LayoutGroup>
  );

  const renderDayView = () => {
    const isSealed = asramaSealedUntil && asramaSealedUntil > Date.now();
    return (
      <div className="p-2 space-y-4">
        <div className="p-3 text-center rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
          <h2 className="text-lg font-serif font-bold text-gray-200">
            Asrama Sedang Tutup
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Para talenta sedang beristirahat dan memulihkan energi untuk malam
            nanti. Gunakan waktu ini untuk mengatur strategi, melakukan livestream, atau melihat profil
            talenta.
          </p>
          <button
            type="button"
            onClick={startNight}
            disabled={isProcessing || isSealed}
            className="px-6 py-2.5 mt-4 text-sm font-bold text-white transform transition-transform bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-romantic hover:scale-105 disabled:bg-red-800 disabled:scale-100 disabled:cursor-not-allowed disabled:animate-none animate-pulse"
          >
            {isProcessing ? (
              <LoadingSpinner className="w-6 h-6" />
            ) : isSealed ? (
              `Disegel (${timeLeft})`
            ) : (
              'Buka Asrama Untuk Malam Ini'
            )}
          </button>
        </div>
      </div>
    );
  };
  
  if (gamePhase === 'Siang') {
    return renderDayView();
  }
  return renderNightView();
};

export default LobyView;