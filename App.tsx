import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './controllers/gameController';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ViewRenderer from './components/ViewRenderer';
import ModalManager from './components/ModalManager';
import SideMenu from './components/SideMenu';
import { View } from './types';

const App: React.FC = () => {
  const loading = useGameStore((state) => state.loading);
  const loadingProgress = useGameStore((state) => state.loadingProgress);
  const loadingMessage = useGameStore((state) => state.loadingMessage);
  const loadingError = useGameStore((state) => state.loadingError);
  const activeView = useGameStore((state) => state.activeView);
  const { loadGameData } = useGameStore.getState();

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  if (loading) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-dark-primary">
        <video
          src="https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/vidio/loading-animation.webm"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ objectFit: 'cover' }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center text-white bg-black/60 backdrop-blur-sm rounded-2xl w-full max-w-sm">
          {loadingError ? (
            <div className="text-red-400">
              <h2 className="text-lg font-bold">Terjadi Kesalahan</h2>
              <p className="mt-2 text-sm">{loadingError}</p>
            </div>
          ) : (
            <>
              <img
                src="https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/Tittle.jpg"
                alt="ASRAMA BIRAHI"
                className="object-contain h-12 mb-6 shadow-lg animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              <div className="w-full h-4 mt-4 rounded-full shadow-inner bg-black/50">
                <motion.div
                  className="h-4 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
              <p
                className="mt-2 text-sm font-semibold text-white"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {loadingProgress < 100
                  ? `Memuat Aset... ${Math.round(loadingProgress)}%`
                  : 'Selesai!'}
              </p>
              <p
                className="mt-1 text-xs text-gray-300 truncate w-full max-w-xs px-2"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {loadingMessage}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  const backgroundClass =
    activeView === View.MAIN_MENU
      ? ''
      : 'bg-gradient-to-br from-dark-tertiary via-dark-secondary to-dark-primary bg-[size:200%_200%] animate-gradient-pulse';

  return (
    <div className={`pb-20 min-h-screen font-sans ${backgroundClass}`}>
      <Header />
      <main className="container p-1 mx-auto md:p-2">
        <ViewRenderer />
        <AnimatePresence>
          {activeView === View.MAIN_MENU && <SideMenu />}
        </AnimatePresence>
        <ModalManager />
      </main>
      <BottomNav />
    </div>
  );
};

export default App;
