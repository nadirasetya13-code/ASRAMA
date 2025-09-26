import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View } from '../types';
import TalentCard from './TalentCard';
import TalentProfile from './TalentProfile';
import { useGameStore } from '../controllers/gameController';
import { SearchIcon } from './icons';
import GuestWantsSummary from './GuestWantsSummary';
import FeaturedTalent from './talenta/FeaturedTalent';

const TalentaView: React.FC = () => {
  const allTalents = useGameStore((state) => state.talents);
  const viewingTalent = useGameStore((state) => state.viewingTalent);
  const gamePhase = useGameStore((state) => state.gameState.gameTime.phase);
  const guests = useGameStore((state) => state.guests);
  const { setActiveView, closeViewingTalent } = useGameStore.getState();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter out hibernating talents first
  const activeTalents = useMemo(
    () => allTalents.filter((t) => !t.hibernationEndTime),
    [allTalents]
  );
  
  const availableTalents = useMemo(
    () => activeTalents.filter(t => !(t.unavailableUntil && t.unavailableUntil > Date.now())),
    [activeTalents]
  );

  const filteredTalents = useMemo(
    () =>
      activeTalents.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [activeTalents, searchQuery]
  );
  
  const filteredAvailableTalents = useMemo(
    () =>
      availableTalents.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [availableTalents, searchQuery]
  );

  const [featuredTalentId, setFeaturedTalentId] = useState(
    filteredAvailableTalents[0]?.id || null
  );

  // Effect to update featured talent if it's filtered out or if the list is empty
  useEffect(() => {
    if (
      !filteredAvailableTalents.find((t) => t.id === featuredTalentId) &&
      filteredAvailableTalents.length > 0
    ) {
      setFeaturedTalentId(filteredAvailableTalents[0].id);
    } else if (filteredAvailableTalents.length === 0) {
      setFeaturedTalentId(null);
    }
  }, [filteredAvailableTalents, featuredTalentId]);

  const featuredTalent = activeTalents.find((t) => t.id === featuredTalentId);
  const currentGuest = guests.length > 0 ? guests[0] : null;
  const isSubstituteOffer =
    !!currentGuest?.requestedTalentId && !!featuredTalent;

  if (gamePhase === 'Malam' && !currentGuest) {
    return (
      <div className="flex flex-col items-center justify-center py-16 h-[50vh]">
        <h2 className="text-xl font-serif text-light-text">
          Sesi Malam Telah Berakhir
        </h2>
        <p className="mt-2 text-sm text-subtle-text">
          Kembali ke lobi untuk menutup asrama.
        </p>
        <button
          type="button"
          onClick={() => setActiveView(View.LOBY)}
          className="px-4 py-2 mt-4 text-white rounded-lg bg-brand-purple"
        >
          Kembali ke Lobi
        </button>
      </div>
    );
  }

  const renderEmptyState = () => (
    <div className="flex flex-col h-[calc(100vh_-_96px)]">
      <div className="flex flex-col items-center justify-center flex-grow py-16 text-center">
        <h2 className="text-xl font-serif text-light-text">
          Tidak ada talenta yang ditemukan.
        </h2>
        <p className="mt-1 text-sm text-subtle-text">
          Coba kata kunci pencarian yang berbeda.
        </p>
      </div>
      <div className="flex-shrink-0 p-2 pt-4">
        <div className="relative">
          <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Cari talenta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-sm bg-black/20 text-light-text border border-gray-700 rounded-full shadow-inner focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  if (!featuredTalent) {
    return renderEmptyState();
  }

  return (
    <div className="flex flex-col h-[calc(100vh_-_96px)]">
      {/* Guest Wants Summary */}
      {gamePhase === 'Malam' && currentGuest && (
        <motion.div
          className="flex-shrink-0 p-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GuestWantsSummary guest={currentGuest} />
        </motion.div>
      )}

      {/* Substitute Warning */}
      {isSubstituteOffer && (
        <motion.div
          className="p-2 mx-1.5 my-1 text-xs font-bold text-center text-yellow-200 bg-yellow-800/50 rounded-lg border border-yellow-600/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          PERHATIAN: Tamu meminta{' '}
          <strong>{currentGuest.requestedTalentName}</strong>. Menawarkan
          pengganti akan mengurangi kepuasan awal secara signifikan!
        </motion.div>
      )}

      {/* Featured Talent Area */}
      <FeaturedTalent talent={featuredTalent} />

      {/* Search and Horizontal Talent List */}
      <div className="flex-shrink-0 pt-2">
        <div className="px-2 pb-1">
          <div className="relative">
            <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Cari talenta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm text-light-text bg-black/20 border border-gray-700 rounded-full shadow-inner focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            />
          </div>
        </div>
        <div className="h-64 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex p-2 space-x-3">
            {filteredTalents.map((talent) => {
              const isActive = featuredTalentId === talent.id;
              const isUnavailable = talent.unavailableUntil && talent.unavailableUntil > Date.now();

              return (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  isActive={isActive}
                  onClick={() => !isUnavailable && setFeaturedTalentId(talent.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewingTalent && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewingTalent}
          >
            <motion.div
              className="w-full bg-dark-secondary rounded-t-2xl max-h-[95vh] overflow-hidden flex flex-col border-t border-white/10"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TalentProfile talent={viewingTalent} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalentaView;