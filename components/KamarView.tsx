import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { StandardRoom, RarityRoom } from '../types';
import { formatRupiah } from '../services/localDataService';
import {
  MAX_STANDARD_ROOMS,
  ROOM_BUILD_COST_BASE,
  ROOM_BUILD_COST_MULTIPLIER,
  FLOWER_ROOM_NAMES,
} from '../constants';
import { RoomIcon, MoneyIcon, LoadingSpinner } from './icons';
import RoomCard from './kamar/RoomCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const KamarView: React.FC = () => {
  const { buildNewRoom } = useGameStore.getState();
  const rooms = useGameStore((state) => state.gameState.rooms);
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);

  const standardRooms = rooms.filter(
    (r): r is StandardRoom => 'type' in r && r.isAcquired !== false
  );
  // IMPROVEMENT: Filter for acquired rooms here to simplify render logic.
  const rarityRooms = rooms.filter(
    (r): r is RarityRoom => 'rarity' in r && r.isAcquired !== false
  );

  const canBuildMore = standardRooms.length < MAX_STANDARD_ROOMS;
  const buildCost = canBuildMore
    ? Math.floor(
        ROOM_BUILD_COST_BASE *
          Math.pow(ROOM_BUILD_COST_MULTIPLIER, standardRooms.length)
      )
    : 0;
  const canAffordBuild = money >= buildCost;
  
  // IMPROVEMENT: Added a more descriptive fallback name if FLOWER_ROOM_NAMES runs out.
  const nextRoomName =
    FLOWER_ROOM_NAMES[standardRooms.length] ||
    `Standar #${standardRooms.length + 1}`;

  return (
    <div className="p-1 md:p-2">
      <h2 className="mb-3 text-xl font-serif text-center text-light-text">
        Manajemen Kamar
      </h2>

      {/* Build New Room Section */}
      <div className="p-3 mb-4 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
        <h3 className="mb-3 text-base font-serif font-bold text-center text-light-text">
          Bangun Kamar Standar Baru
        </h3>
        <div className="flex items-center justify-between mb-3 text-light-text">
          <span className="text-sm font-semibold">Slot Kamar Saat Ini:</span>
          <span className="text-lg font-bold">
            {standardRooms.length} / {MAX_STANDARD_ROOMS}
          </span>
        </div>
        {canBuildMore ? (
          <button
            type="button"
            onClick={() => buildNewRoom('Standar')}
            disabled={!canAffordBuild || isProcessing}
            className={`flex w-full items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 ${
              canAffordBuild
                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                : 'bg-gray-400'
            }`}
          >
            {isProcessing ? (
              <LoadingSpinner className="w-5 h-5" />
            ) : (
              <RoomIcon className="w-5 h-5" />
            )}
            Bangun: Kamar {nextRoomName}
            <div className="flex items-center gap-1 px-2 py-0.5 ml-2 text-xs rounded-full bg-black/20">
              <MoneyIcon className="h-4" />
              <span>{formatRupiah(buildCost)}</span>
            </div>
          </button>
        ) : (
          <div className="py-2 font-bold text-center rounded-md text-amber-300 bg-amber-900/50">
            KAPASITAS MAKSIMAL
          </div>
        )}
      </div>

      {/* Rarity Rooms List */}
      <div className="mb-6">
        <h3 className="mb-1.5 text-base font-serif font-bold text-light-text">
          Kamar Rarity
        </h3>
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* SIMPLIFICATION: No need for ternary check here anymore */}
          {rarityRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </motion.div>
      </div>

      {/* Standard Rooms List */}
      <div>
        <h3 className="mb-1.5 text-base font-serif font-bold text-light-text">
          Kamar Standar
        </h3>
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {standardRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default KamarView;