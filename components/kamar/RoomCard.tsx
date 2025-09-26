import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../controllers/gameController';
import { Room, RoomRarity, RoomUpgrade, RarityRoom, RoomType } from '../../types';
import { formatRupiah } from '../../services/localDataService';
import {
  MAX_ROOM_LEVEL,
  ROOM_UPGRADE_COST_BASE,
  ROOM_UPGRADE_COST_MULTIPLIER,
  ROOM_TYPE_CONFIG,
  RARITY_ROOM_CONFIG,
  REPAIR_COST_PER_POINT,
  RARITY_CONFIG,
} from '../../constants';
import {
  RoomIcon,
  WrenchIcon,
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
  LoadingSpinner,
  WarningIcon,
} from '../icons';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const getRoomTypeIcon = (type: RoomRarity | string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Romantis: <HeartIcon className="w-6 h-6 text-white" />,
    Dominasi: <DominanceRoomIcon className="w-6 h-6 text-white" />,
    Penyembuhan: <HealingRoomIcon className="w-6 h-6 text-white" />,
    Pelatihan: <TrainingRoomIcon className="w-6 h-6 text-white" />,
    Hiburan: <EntertainmentRoomIcon className="w-6 h-6 text-white" />,
    Brankas: <VaultRoomIcon className="w-6 h-6 text-white" />,
    Event: <EventRoomIcon className="w-6 h-6 text-white" />,
    Khusus: <KhususRoomIcon className="w-6 h-6 text-white" />,
    Special: <SpecialRoomIcon className="w-6 h-6 text-white" />,
    Mystic: <MysticRoomIcon className="w-6 h-6 text-white" />,
  };
  return iconMap[type] || <RoomIcon className="w-6 h-6 text-white" />;
};

const isRarityRoom = (r: Room): r is RarityRoom => 'rarity' in r;

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = React.memo(({ room }) => {
  const { upgradeRoom, repairRoom, cleanRoom } = useGameStore.getState();
  const money = useGameStore((state) => state.gameState.money);
  const isProcessing = useGameStore((state) => state.isProcessing);

  const [timeLeft, setTimeLeft] = useState('00:00');

  useEffect(() => {
    if (room.status === 'cleaning' && room.cleaningCompleteTime) {
      const updateTimer = () => {
        const remaining = room.cleaningCompleteTime! - Date.now();
        if (remaining <= 0) {
          setTimeLeft('00:00');
        } else {
          const minutes = Math.floor(remaining / 1000 / 60);
          const seconds = Math.floor((remaining / 1000) % 60);
          setTimeLeft(
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
              2,
              '0'
            )}`
          );
        }
      };
      updateTimer();
      const timerId = setInterval(updateTimer, 1000);
      return () => clearInterval(timerId);
    }
  }, [room.status, room.cleaningCompleteTime]);

  const roomIsRarity = isRarityRoom(room);
  const config = roomIsRarity
    ? RARITY_ROOM_CONFIG[room.rarity]
    : ROOM_TYPE_CONFIG[room.type];
  
  const headerBgClass = roomIsRarity ? RARITY_CONFIG[room.rarity].nameOverlayBg : config.color;
  const headerBorderClass = roomIsRarity ? RARITY_CONFIG[room.rarity].border : config.color.replace('bg-', 'border-');


  const clampedLevel = Math.min(room.level, MAX_ROOM_LEVEL);
  const isMaxLevel = clampedLevel >= MAX_ROOM_LEVEL;
  const upgradeCost = Math.floor(
    ROOM_UPGRADE_COST_BASE *
      Math.pow(ROOM_UPGRADE_COST_MULTIPLIER, clampedLevel - 1)
  );
  const canAffordUpgrade = money >= upgradeCost;

  const damage = 100 - room.condition;
  const repairCost = damage * REPAIR_COST_PER_POINT;
  const canAffordRepair = money >= repairCost;

  const isActionable =
    (room.status === 'available' || room.status === 'needs_cleaning') &&
    room.condition > 0;
  const showUpgradeWarning = room.status === 'needs_cleaning';

  const allBuffs: RoomUpgrade = {};
  if (!isRarityRoom(room)) {
    const baseBuffs = ROOM_TYPE_CONFIG[room.type].getBuffs(room.level);
    const allKeys = new Set([
      ...Object.keys(baseBuffs),
      ...Object.keys(room.upgrades),
    ]);
    allKeys.forEach((key) => {
      const baseValue = baseBuffs[key as keyof RoomUpgrade] || 0;
      const upgradeValue = room.upgrades[key as keyof RoomUpgrade] || 0;
      allBuffs[key as keyof RoomUpgrade] = baseValue + upgradeValue;
    });
  }

  const renderStatusSection = () => {
    if (room.condition === 0) {
      return (
        <div
          className="p-2 font-bold text-center text-red-300 bg-red-900/50"
          role="status"
          aria-label="Kamar rusak total"
        >
          Rusak Total
        </div>
      );
    }
    switch (room.status) {
      case 'available':
        return (
          <div
            className="p-2 font-bold text-center text-green-300 bg-green-900/40"
            role="status"
            aria-label="Kamar tersedia"
          >
            Tersedia
          </div>
        );
      case 'occupied':
        return (
          <div
            className="p-2 font-bold text-center text-yellow-300 bg-yellow-900/40"
            role="status"
            aria-label="Kamar sedang digunakan"
          >
            Sedang Digunakan
          </div>
        );
      case 'cleaning':
        return (
          <div
            className="flex items-center justify-center gap-2 p-2 font-bold text-center text-blue-300 bg-blue-900/40"
            role="status"
            aria-label={`Kamar sedang dibersihkan, sisa waktu: ${timeLeft}`}
          >
            <LoadingSpinner className="w-4 h-4" />
            <span className="text-sm">{room.cleaningCompleteTime ? `(${timeLeft})` : 'Sedang diproses...'}</span>
          </div>
        );
      case 'needs_cleaning':
        return (
          <div
            className="p-2 bg-orange-900/40"
            role="status"
            aria-label="Kamar perlu dibersihkan"
          >
            <button
              type="button"
              onClick={() => cleanRoom(room.id)}
              disabled={isProcessing}
              className="w-full px-3 py-2 text-xs font-bold text-white rounded-md shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              aria-label={`Bersihkan kamar ${room.name}`}
            >
              Bersihkan Kamar
            </button>
          </div>
        );
      default:
        return (
          <div
            className="p-2 font-bold text-center text-gray-300 bg-gray-900/40"
            role="status"
            aria-label="Status kamar tidak diketahui"
          >
            Tidak Diketahui
          </div>
        );
    }
  };

  const renderNumericalBuff = (key: string, value: number) => {
    if (value === 0) return null;
    const isMalus = /Increase|Damage/.test(key) && !/Reduction/.test(key);
    const displayName = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    const displayValue = `${(value * 100).toFixed(1)}%`;
    return (
      <li key={key}>
        {displayName}:{' '}
        <span
          className={`font-bold ${
            isMalus ? 'text-red-400' : 'text-green-400'
          }`}
        >
          {value > 0 && !isMalus ? '+' : ''}
          {displayValue}
        </span>
      </li>
    );
  };

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col overflow-hidden rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10"
    >
      <div
        className={`flex items-center justify-between p-2 border-b-4 ${headerBgClass} ${headerBorderClass}`}
      >
        <div className="flex items-center gap-2">
          {getRoomTypeIcon(isRarityRoom(room) ? room.rarity : room.type)}
          <h3 className="text-base font-serif font-bold text-white truncate drop-shadow-sm">
            {room.name}
          </h3>
        </div>
        <div className="text-center">
          <span className="text-base font-bold text-white">
            Lv. {clampedLevel}
            {isMaxLevel && (
              <span className="text-xs text-amber-300"> (MAX)</span>
            )}
          </span>
        </div>
      </div>

      <div className="p-1.5 bg-black/30">
        <div className="w-full h-2 bg-gray-700 rounded-full shadow-inner">
          <motion.div
            className={`h-2 rounded-full transition-all duration-500 ${
              room.condition > 50
                ? 'bg-green-500'
                : room.condition > 20
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${room.condition}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] font-semibold text-center text-subtle-text">
          Kondisi: {room.condition}/100
        </p>
      </div>

      <div className="flex-grow p-2 space-y-2 text-xs">
        <p className="text-[11px] italic text-subtle-text">
          {'description' in config ? config.description : config.effect}
        </p>

        <h4
          className="pt-2 mt-2 font-bold border-t border-white/10 text-light-text"
          id={`buffs-${room.id}`}
        >
          Buff Efektif:
        </h4>
        <ul
          className="space-y-1 text-[11px] text-gray-300 list-disc list-inside"
          aria-describedby={`buffs-${room.id}`}
        >
          {roomIsRarity ? (
            <>
              {Object.entries(room.upgrades).map(([key, value]) => renderNumericalBuff(key, value))}
              {Object.keys(room.upgrades).length === 0 && <li className="text-gray-500 italic ml-[-1em]">Tidak ada buff dari upgrade</li>}
            </>
          ) : (
            <>
              {Object.entries(allBuffs).map(([key, value]) => renderNumericalBuff(key, value))}
              {Object.values(allBuffs).every(v => v === 0) && <li className="text-gray-500">Tidak ada buff aktif</li>}
            </>
          )}
        </ul>
      </div>

      <div className="mt-auto">{renderStatusSection()}</div>

      <div className="grid grid-cols-2 gap-2 p-2.5 bg-black/30">
        <button
          type="button"
          onClick={() => repairRoom(room.id)}
          disabled={
            !canAffordRepair ||
            damage === 0 ||
            isProcessing ||
            room.condition === 0
          }
          className={`flex flex-col items-center justify-center px-2.5 py-1.5 text-xs font-bold text-white rounded-md shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 ${
            canAffordRepair && damage > 0
              ? 'bg-gradient-to-r from-blue-500 to-sky-500'
              : 'bg-gray-400'
          }`}
          aria-label={`Perbaiki kamar ${room.name}, biaya ${formatRupiah(
            repairCost
          )}`}
        >
          <WrenchIcon className="w-4 h-4 mb-0.5" />
          Perbaiki
          <span className="block text-[10px] font-normal opacity-90">
            {formatRupiah(repairCost)}
          </span>
        </button>

        {isMaxLevel ? (
          <div
            className="flex items-center justify-center col-span-1 py-2 font-bold text-center rounded-md text-amber-300 bg-amber-900/50"
            role="status"
            aria-label="Kamar sudah level maksimal"
          >
            MAX
          </div>
        ) : (
          <button
            type="button"
            onClick={() => upgradeRoom(room.id)}
            disabled={!canAffordUpgrade || isProcessing || !isActionable}
            className={`flex flex-col items-center justify-center px-2.5 py-1.5 text-xs font-bold text-white rounded-md shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 relative ${
              canAffordUpgrade && isActionable
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gray-400'
            } ${showUpgradeWarning ? 'ring-2 ring-yellow-500/50' : ''}`}
            aria-label={`Upgrade kamar ${room.name} ke level ${
              clampedLevel + 1
            }, biaya ${formatRupiah(upgradeCost)}${
              showUpgradeWarning ? ' (kamar perlu dibersihkan setelahnya)' : ''
            }`}
            title={
              showUpgradeWarning
                ? 'Kamar perlu dibersihkan setelah upgrade'
                : undefined
            }
          >
            {showUpgradeWarning && (
              <WarningIcon className="absolute w-4 h-4 -top-1 -right-1 text-yellow-400" />
            )}
            Upgrade
            <span className="block text-[10px] font-normal opacity-90">
              {formatRupiah(upgradeCost)}
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
});

RoomCard.displayName = 'RoomCard';

export default RoomCard;
