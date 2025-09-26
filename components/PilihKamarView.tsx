import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { Room, RarityRoom, RoomRarity } from '../types';
import { ROOM_TYPE_CONFIG, RARITY_ROOM_CONFIG, RARITY_CONFIG } from '../constants';
import {
  LoadingSpinner,
  RoomIcon,
  HeartIcon,
  DominanceRoomIcon,
  HealingRoomIcon,
  TrainingRoomIcon,
  EntertainmentRoomIcon,
  VaultRoomIcon,
  EventRoomIcon,
  KhususRoomIcon,
  SpecialRoomIcon,
  MysticRoomIcon,
  HIVIcon,
} from './icons';

const getRoomTypeIcon = (type: RoomRarity | string) => {
  switch (type) {
    case 'Romantis':
      return <HeartIcon className="w-6 h-6 text-white" />;
    case 'Dominasi':
      return <DominanceRoomIcon className="w-6 h-6 text-white" />;
    case 'Penyembuhan':
      return <HealingRoomIcon className="w-6 h-6 text-white" />;
    case 'Pelatihan':
      return <TrainingRoomIcon className="w-6 h-6 text-white" />;
    case 'Hiburan':
      return <EntertainmentRoomIcon className="w-6 h-6 text-white" />;
    case 'Brankas':
      return <VaultRoomIcon className="w-6 h-6 text-white" />;
    case 'Event':
      return <EventRoomIcon className="w-6 h-6 text-white" />;
    case 'Khusus':
      return <KhususRoomIcon className="w-6 h-6 text-white" />;
    case 'Special':
      return <SpecialRoomIcon className="w-6 h-6 text-white" />;
    case 'Mystic':
      return <MysticRoomIcon className="w-6 h-6 text-white" />;
    default:
      return <RoomIcon className="w-6 h-6 text-white" />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface SelectableRoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: () => void;
}

const SelectableRoomCard = React.memo(
  ({ room, isSelected, onSelect }: SelectableRoomCardProps) => {
    const isRarityRoom = (r: Room): r is RarityRoom => 'rarity' in r;
    const roomIsRarity = isRarityRoom(room);
    const config = roomIsRarity
      ? RARITY_ROOM_CONFIG[room.rarity]
      : ROOM_TYPE_CONFIG[room.type];
    const borderClass = isSelected
      ? 'border-4 border-brand-gold shadow-lg'
      : 'border-2 border-gray-700';
    
    // FIX: Use the correct configuration object (RARITY_CONFIG) for visual styles of rarity rooms.
    const headerBgClass = roomIsRarity
      ? RARITY_CONFIG[room.rarity].nameOverlayBg
      : config.color;

    return (
      <motion.button
        type="button"
        variants={itemVariants}
        onClick={onSelect}
        className={`w-full text-left overflow-hidden rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg bg-black/20 backdrop-blur-md ${borderClass}`}
      >
        <div className={`flex items-center gap-2 p-2 ${headerBgClass}`}>
          {getRoomTypeIcon(isRarityRoom(room) ? room.rarity : room.type)}
          <h4 className="text-sm font-serif font-bold text-white truncate">
            {room.name}
          </h4>
        </div>
        <div className="p-1.5 text-[11px]">
          <p className="font-semibold text-light-text">
            Level {room.level} - Kondisi: {room.condition}%
          </p>
          <p className="h-8 overflow-hidden text-subtle-text">
            {'description' in config ? config.description : config.effect}
          </p>
        </div>
      </motion.button>
    );
  }
);
SelectableRoomCard.displayName = 'SelectableRoomCard';

const PilihKamarView: React.FC = () => {
  const { handleMatch, cancelSelection, selectRoom } = useGameStore.getState();

  const selectedTalent = useGameStore((state) => state.selectedTalent);
  const guests = useGameStore((state) => state.guests);
  const rooms = useGameStore((state) => state.gameState.rooms);
  const selectedRoomId = useGameStore((state) => state.selectedRoomId);
  const isProcessing = useGameStore((state) => state.isProcessing);
  const playerConsumables = useGameStore(
    (state) => state.gameState.playerConsumables
  );
  
  const [selectedCondomName, setSelectedCondomName] = useState<string | null>(null);

  const currentGuest = guests.length > 0 ? guests[0] : null;

  if (!selectedTalent || !currentGuest) {
    return (
      <div className="p-4 text-center">
        <LoadingSpinner className="w-8 h-8 mx-auto text-brand-purple" />
        <p>Mengalihkan...</p>
      </div>
    );
  }

  const availableRooms = rooms.filter(
    (r) => r.status === 'available' && r.isAcquired && r.condition > 0
  );

  const availableCondoms = Object.values(playerConsumables);

  return (
    <div className="p-1.5 pb-36 md:p-2">
      {/* Selection Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-2 mb-3 text-center rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
      >
        <h2 className="mb-2 text-base font-serif font-bold text-light-text">
          Pilih Kamar untuk Sesi
        </h2>
        <div className="flex items-center justify-center gap-4 text-light-text">
          <div className="flex flex-col items-center">
            <img
              src={currentGuest.imageUrl}
              alt={currentGuest.name}
              className="object-cover w-14 h-14 border-2 rounded-full shadow-md border-pink-300"
            />
            <span className="mt-1 text-xs font-bold">{currentGuest.name}</span>
          </div>
          <HeartIcon className="w-8 h-8 text-pink-400 animate-pulse" />
          <div className="flex flex-col items-center">
            <img
              src={selectedTalent.imageUrl}
              alt={selectedTalent.name}
              className="object-cover w-14 h-14 border-2 rounded-full shadow-md border-purple-300"
            />
            <span className="mt-1 text-xs font-bold">{selectedTalent.name}</span>
          </div>
        </div>
      </motion.div>

      {/* Room List */}
      {availableRooms.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {availableRooms.map((room) => (
            <SelectableRoomCard
              key={room.id}
              room={room}
              isSelected={selectedRoomId === room.id}
              onSelect={() => selectRoom(room.id)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="py-12 text-center rounded-lg bg-black/20">
          <RoomIcon className="w-12 h-12 mx-auto mb-2 text-gray-600" />
          <p className="font-bold text-light-text">
            Tidak ada kamar yang tersedia.
          </p>
          <p className="text-sm text-subtle-text">
            Semua kamar sedang digunakan atau perlu dibersihkan.
          </p>
        </div>
      )}

      {/* Condom Selection UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-2 mt-4 space-y-2 rounded-xl shadow-inner bg-black/20 border border-white/10"
      >
        <h3 className="flex items-center justify-center gap-2 pb-1 text-sm font-serif font-bold text-center text-light-text border-b border-brand-pink/50">
          <HIVIcon className="w-4 h-4 text-yellow-400" /> Perlindungan (Opsional)
        </h3>
        {availableCondoms.length > 0 ? (
          availableCondoms.map(({ item, quantity }) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedCondomName(prev => prev === item.name ? null : item.name)}
              className={`w-full p-2 text-left rounded-lg transition-all ${selectedCondomName === item.name ? 'bg-green-800/60 ring-2 ring-green-400' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-light-text">{item.name}</p>
                  <p className="text-xs text-yellow-300">Proteksi: {(item.protectionLevel * 100).toFixed(1)}%</p>
                </div>
                <p className="text-sm font-bold text-light-text">Stok: {quantity}</p>
              </div>
            </button>
          ))
        ) : (
          <p className="py-2 text-xs text-center text-subtle-text">Tidak ada kondom di inventaris. Beli di Toko.</p>
        )}
        <button
          type="button"
          onClick={() => setSelectedCondomName(null)}
          className={`w-full p-2 mt-1 text-center rounded-lg transition-all ${!selectedCondomName ? 'bg-red-800/60 ring-2 ring-red-400' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
        >
          <p className="font-bold text-red-300">Gunakan Tanpa Perlindungan (Risiko Tinggi)</p>
        </button>
      </motion.div>


      {/* Action Buttons Footer */}
      <div className="fixed bottom-14 left-0 right-0 z-20 p-2 bg-dark-secondary/80 backdrop-blur-lg shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.2)] border-t border-white/10">
        <div className="container flex items-center gap-3 mx-auto">
          <button
            type="button"
            onClick={cancelSelection}
            disabled={isProcessing}
            className="w-1/3 px-3 py-2.5 text-xs font-bold text-gray-200 bg-gray-700 rounded-full shadow-md transform transition-colors hover:bg-gray-600 disabled:bg-gray-500/50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => handleMatch(selectedCondomName)}
            disabled={!selectedRoomId || isProcessing}
            className="flex items-center justify-center w-2/3 gap-2 px-4 py-2.5 text-base font-bold text-white transform transition-transform bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <LoadingSpinner className="w-6 h-6" />
            ) : (
              'Mulai Sesi'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PilihKamarView;