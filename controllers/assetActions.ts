import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import {
  GameState,
  PhoneItem,
  Room,
  RoomType,
  ItemType,
  ConsumableItem,
  EquipmentItem,
} from '../types';
import {
  FLOWER_ROOM_NAMES,
  MAX_PHONE_LEVEL,
  MAX_ROOM_LEVEL,
  MAX_STANDARD_ROOMS,
  PHONE_UPGRADE_COST_BASE,
  PHONE_UPGRADE_COST_MULTIPLIER,
  REPAIR_COST_PER_POINT,
  ROOM_BUILD_COST_BASE,
  ROOM_BUILD_COST_MULTIPLIER,
  ROOM_UPGRADE_COST_BASE,
  ROOM_UPGRADE_COST_MULTIPLIER,
  UPGRADE_MILESTONES,
  ADVANCEMENT_REWARDS,
} from '../constants';
import { calculateCleaningDuration } from '../services/localDataService';
import { PHONE_CATALOG } from '../constants/phones';

type AssetActions = Pick<
  GameStoreActions,
  | 'buildNewRoom'
  | 'upgradeRoom'
  | 'repairRoom'
  | 'cleanRoom'
  | 'buyPhone'
  | 'buyConsumable'
  | 'upgradePhone'
  | 'equipPhone'
  | 'equipProductionItem'
  | 'unequipProductionItem'
  | 'claimAdvancementReward'
>;

export const createAssetActionsSlice: StoreSlice<AssetActions> = (set, get) => ({
  buildNewRoom: async (roomType: RoomType) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState } = get();
      const standardRooms = gameState.rooms.filter(
        (r) => 'type' in r && r.isAcquired
      );
      const currentRoomCount = standardRooms.length;
      if (currentRoomCount >= MAX_STANDARD_ROOMS) return;

      const cost = Math.floor(
        ROOM_BUILD_COST_BASE *
          Math.pow(ROOM_BUILD_COST_MULTIPLIER, currentRoomCount)
      );
      if (gameState.money < cost) return;

      const newRoomName =
        FLOWER_ROOM_NAMES[currentRoomCount] || `Kamar ${currentRoomCount + 1}`;

      const newRoom: Room = {
        id: `room-standard-${Date.now()}`,
        name: `Kamar ${newRoomName}`,
        type: roomType,
        level: 1,
        status: 'available',
        condition: 100,
        upgrades: {},
        isAcquired: true,
      };

      const newGameState: GameState = {
        ...gameState,
        money: gameState.money - cost,
        rooms: [...gameState.rooms, newRoom],
      };

      set({ gameState: newGameState });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveRooms(newGameState.rooms);
    } finally {
      set({ isProcessing: false });
    }
  },
  upgradeRoom: async (roomId: string) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState } = get();
      const roomToUpgrade = gameState.rooms.find((r) => r.id === roomId);
      if (!roomToUpgrade || roomToUpgrade.level >= MAX_ROOM_LEVEL) return;

      const cost = Math.floor(
        ROOM_UPGRADE_COST_BASE *
          Math.pow(ROOM_UPGRADE_COST_MULTIPLIER, roomToUpgrade.level - 1)
      );

      if (gameState.money < cost) return;

      const newLevel = roomToUpgrade.level + 1;
      const newUpgrades = { ...roomToUpgrade.upgrades };

      const milestone = UPGRADE_MILESTONES[newLevel];
      if (milestone) {
        for (const key in milestone.buff) {
          newUpgrades[key] =
            (newUpgrades[key] || 0) + milestone.buff[key];
        }
      }

      const updatedRooms = gameState.rooms.map((r) =>
        r.id === roomId ? { ...r, level: newLevel, upgrades: newUpgrades } : r
      );

      const newGameState: GameState = {
        ...gameState,
        money: gameState.money - cost,
        rooms: updatedRooms,
      };

      set({ gameState: newGameState });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveRooms(newGameState.rooms);
    } finally {
      set({ isProcessing: false });
    }
  },
  repairRoom: async (roomId: string) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState } = get();
      const roomToRepair = gameState.rooms.find((r) => r.id === roomId);
      if (!roomToRepair) return;

      const damage = 100 - roomToRepair.condition;
      if (damage === 0) return;

      const repairCost = damage * REPAIR_COST_PER_POINT;
      if (gameState.money < repairCost) return;

      const repairedRooms = gameState.rooms.map((r) =>
        r.id === roomId ? { ...r, condition: 100 } : r
      );

      const newGameState = {
        ...gameState,
        money: gameState.money - repairCost,
        rooms: repairedRooms,
      };

      set({ gameState: newGameState });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveRooms(newGameState.rooms);
    } finally {
      set({ isProcessing: false });
    }
  },
  cleanRoom: async (roomId: string) => {
    if (get().isProcessing) return;
    const roomToClean = get().gameState.rooms.find((r) => r.id === roomId);
    if (
      !roomToClean ||
      roomToClean.status !== 'needs_cleaning' ||
      roomToClean.condition === 0
    )
      return;

    set({ isProcessing: true });
    try {
      const { lastSessionInfo } = roomToClean;
      if (!lastSessionInfo) {
        console.error('Missing last session info for cleaning calculation.');
        set({ isProcessing: false });
        return;
      }

      const duration = calculateCleaningDuration(
        lastSessionInfo.talentRarity,
        lastSessionInfo.guestTier
      );
      const completeTime = Date.now() + duration;

      const updatedRooms = get().gameState.rooms.map((r) =>
        r.id === roomId
          ? { ...r, status: 'cleaning' as const, cleaningCompleteTime: completeTime }
          : r
      );

      const timerId = window.setTimeout(() => {
        const latestRooms = get().gameState.rooms;
        const finalRooms = latestRooms.map((r) =>
          r.id === roomId
            ? {
                ...r,
                status: 'available' as const,
                cleaningCompleteTime: undefined,
                lastSessionInfo: undefined,
              }
            : r
        );

        const latestTimers = { ...get().cleaningTimers };
        delete latestTimers[roomId];

        set((state) => ({
          gameState: { ...state.gameState, rooms: finalRooms },
          cleaningTimers: latestTimers,
        }));
        db.saveRooms(finalRooms);
      }, duration);

      set((state) => ({
        gameState: { ...state.gameState, rooms: updatedRooms },
        cleaningTimers: { ...state.cleaningTimers, [roomId]: timerId },
      }));

      await db.saveRooms(updatedRooms);
    } finally {
      set({ isProcessing: false });
    }
  },
  buyPhone: async (phoneData) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState } = get();
      if (gameState.money < phoneData.basePrice) {
        set({ isProcessing: false });
        return;
      }

      const newItem: PhoneItem = {
        ...phoneData,
        id: `${phoneData.type}-${Date.now()}`,
        level: 1,
        equippedTo: null,
      };

      const newGameState = {
        ...gameState,
        money: gameState.money - phoneData.basePrice,
        playerPhones: [...gameState.playerPhones, newItem],
      };
      set({ gameState: newGameState });

      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
    } finally {
      set({ isProcessing: false });
    }
  },
  buyConsumable: async (itemData) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
        const { gameState } = get();
        if (gameState.money < itemData.basePrice) {
            set({ isProcessing: false });
            return;
        }

        const newMoney = gameState.money - itemData.basePrice;
        const newConsumables = { ...gameState.playerConsumables };
        const existingItem = newConsumables[itemData.name];

        if (existingItem) {
            newConsumables[itemData.name] = { ...existingItem, quantity: existingItem.quantity + 1 };
        } else {
            newConsumables[itemData.name] = { item: itemData, quantity: 1 };
        }

        const newGameState = { ...gameState, money: newMoney, playerConsumables: newConsumables };
        set({ gameState: newGameState });

        const { rooms: _rooms, ...gameStateToSave } = newGameState;
        await db.saveGameState(gameStateToSave);
    } finally {
        set({ isProcessing: false });
    }
  },
  upgradePhone: async (phoneId) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState, talents } = get();
      const phoneToUpgrade = gameState.playerPhones.find((p) => p.id === phoneId);

      if (!phoneToUpgrade || phoneToUpgrade.level >= MAX_PHONE_LEVEL) {
        set({ isProcessing: false });
        return;
      }

      const cost = Math.floor(
        PHONE_UPGRADE_COST_BASE *
          Math.pow(PHONE_UPGRADE_COST_MULTIPLIER, phoneToUpgrade.level - 1)
      );
      if (gameState.money < cost) {
        set({ isProcessing: false });
        return;
      }

      const newMoney = gameState.money - cost;
      const updatedPhones = gameState.playerPhones.map((p) =>
        p.id === phoneId ? { ...p, level: p.level + 1 } : p
      );

      const updatedTalents = talents.map((t) => {
          const equipment = t.equipment;
          let needsUpdate = false;
          const newEquipment = { ...equipment };

          for (const key in newEquipment) {
              const slot = key as keyof typeof newEquipment;
              if (equipment[slot]?.id === phoneId) {
                  // @ts-ignore
                  newEquipment[slot] = { ...equipment[slot], level: equipment[slot]!.level + 1 };
                  needsUpdate = true;
              }
          }

          if (needsUpdate) {
              return { ...t, equipment: newEquipment };
          }
          return t;
      });


      const newGameState = {
        ...gameState,
        money: newMoney,
        playerPhones: updatedPhones,
      };

      set({ gameState: newGameState, talents: updatedTalents });

      await db.saveTalents(updatedTalents);
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
    } finally {
      set({ isProcessing: false });
    }
  },
  equipPhone: async (phoneId, talentId) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { talents, gameState, viewingTalent } = get();
      const talentIndex = talents.findIndex((t) => t.id === talentId);
      const phoneIndex = gameState.playerPhones.findIndex((p) => p.id === phoneId);

      if (talentIndex === -1 || phoneIndex === -1) {
        console.error('Talent or Phone not found for equipping.');
        set({ isProcessing: false });
        return;
      }

      const talentToUpdate = { ...talents[talentIndex] };
      const phoneToEquip = { ...gameState.playerPhones[phoneIndex] };

      if (talentToUpdate.equipment.ponsel || phoneToEquip.equippedTo) {
        console.warn('Cannot equip phone: slot is full or phone is already in use.');
        set({ isProcessing: false });
        return;
      }

      phoneToEquip.equippedTo = talentId;
      talentToUpdate.equipment = {
        ...talentToUpdate.equipment,
        ponsel: phoneToEquip,
      };

      const updatedTalents = [...talents];
      updatedTalents[talentIndex] = talentToUpdate;

      const updatedPhones = [...gameState.playerPhones];
      updatedPhones[phoneIndex] = phoneToEquip;

      const newGameState = { ...gameState, playerPhones: updatedPhones };
      const newViewingTalent =
        viewingTalent?.id === talentId ? talentToUpdate : viewingTalent;

      set({
        talents: updatedTalents,
        gameState: newGameState,
        viewingPhoneInventoryFor: null,
        viewingTalent: newViewingTalent,
      });

      await db.saveTalents(updatedTalents);
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
    } finally {
      set({ isProcessing: false });
    }
  },
  equipProductionItem: async (itemId, talentId, slotType) => {
    // Guard against non-production item types
    if (!['kameraDsr', 'handycam', 'laptop'].includes(slotType)) {
      console.error('Invalid slot type for production item.');
      return;
    }

    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { talents, gameState, viewingTalent } = get();
      const talentIndex = talents.findIndex((t) => t.id === talentId);
      const itemIndex = gameState.playerPhones.findIndex((p) => p.id === itemId);

      if (talentIndex === -1 || itemIndex === -1) return;

      const talentToUpdate = { ...talents[talentIndex] };
      const itemToEquip = { ...gameState.playerPhones[itemIndex] };

      // Prevent equipping if slot is already filled or item is already equipped
      if (
        talentToUpdate.equipment[slotType as keyof typeof talentToUpdate.equipment] ||
        itemToEquip.equippedTo
      ) {
        set({ isProcessing: false });
        return;
      }

      // FIX: Use immutable update pattern by creating a new equipment object.
      // This ensures React detects the state change and re-renders the UI.
      talentToUpdate.equipment = {
        ...talentToUpdate.equipment,
        [slotType]: itemToEquip,
      };

      const updatedTalents = [...talents];
      updatedTalents[talentIndex] = talentToUpdate;

      const updatedPlayerItems = [...gameState.playerPhones];
      updatedPlayerItems[itemIndex] = itemToEquip;

      const newGameState = { ...gameState, playerPhones: updatedPlayerItems };
      const newViewingTalent =
        viewingTalent?.id === talentId ? talentToUpdate : viewingTalent;

      set({
        talents: updatedTalents,
        gameState: newGameState,
        viewingEquipmentInventoryFor: null,
        viewingTalent: newViewingTalent,
      });

      await db.saveTalents(updatedTalents);
      const { rooms: _r, ...gss } = newGameState;
      await db.saveGameState(gss);
    } finally {
      set({ isProcessing: false });
    }
  },
  unequipProductionItem: async (talentId, slotType) => {
    // This action is now disabled as per the new requirement.
    console.log('Unequipping production items is no longer allowed.');
  },
  claimAdvancementReward: (level: number) => {
    const { gameState, talents, performGachaPull } = get();

    let rewardInfo;
    for (const tier in ADVANCEMENT_REWARDS) {
      const found = ADVANCEMENT_REWARDS[
        tier as keyof typeof ADVANCEMENT_REWARDS
      ].find((r) => r.level === level);
      if (found) {
        rewardInfo = found;
        break;
      }
    }

    if (
      !rewardInfo ||
      gameState.level < level ||
      gameState.claimedAdvancementLevels.includes(level)
    ) {
      return;
    }

    const newGameState = { ...gameState };
    const newTalents = [...talents];

    rewardInfo.rewards.forEach((reward) => {
      switch (reward.type) {
        case 'money':
          newGameState.money += reward.amount || 0;
          break;
        case 'savings':
          newGameState.savings += reward.amount || 0;
          break;
        case 'item':
          if (reward.itemName === 'Kondom Sutra Premium' || reward.itemName === 'Kondom Lokal') {
            const current = newGameState.playerConsumables[reward.itemName] || {
              item: {
                name: reward.itemName,
                type: 'kondom',
                description: '',
                basePrice: 0,
                protectionLevel: reward.itemName === 'Kondom Sutra Premium' ? 0.999 : 0.95,
                category: 'Konsumsi',
              },
              quantity: 0,
            };
            current.quantity += reward.amount || 0;
            newGameState.playerConsumables[reward.itemName] = current;
          } else {
            const phoneData = PHONE_CATALOG.find(
              (p) => p.name === reward.itemName
            );
            if (phoneData) {
              const newPhone: PhoneItem = {
                ...phoneData,
                id: `${phoneData.type}-${Date.now()}`,
                level: 1,
                equippedTo: null,
              };
              newGameState.playerPhones.push(newPhone);
            }
          }
          break;
        case 'equipment':
          // Menambahkan satu item equipment ke inventori talenta pertama yang tersedia
          if (newTalents.length > 0 && reward.itemObject) {
            newTalents[0].equipmentInventory.push(
              reward.itemObject as EquipmentItem
            );
          }
          break;
        case 'gachaTicket':
          if (reward.amount === 10) {
            performGachaPull(10, true);
          } else {
            performGachaPull(1, true);
          }
          break;
      }
    });

    newGameState.claimedAdvancementLevels.push(level);

    set({ gameState: newGameState, talents: newTalents });
    const { rooms: _r, ...gss } = newGameState;
    db.saveGameState(gss);
    db.saveTalents(newTalents);
  },
});