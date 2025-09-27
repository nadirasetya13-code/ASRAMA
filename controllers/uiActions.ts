import { StoreSlice, GameStoreActions } from './types';
import { ENERGY_COST_PER_SESSION } from '../constants';
import { View, ItemType, Talent, Guest, GameState, Room } from '../types';
import * as db from '../services/dbService';
import {
  generateTalents,
  calculateReputationToNextLevel,
  baseTalents,
} from '../services/localDataService';
import { ALL_EQUIPMENT_ITEMS } from '../constants';

/**
 * Preloads an array of image URLs and reports progress.
 * @param urls The array of image URLs to preload.
 * @param onProgress A callback function that receives the loading progress percentage (0-100).
 * @param onAssetLoad A callback function that receives the name of the asset currently being loaded.
 * @returns A promise that resolves when all images are loaded or have failed.
 */
const preloadImages = (
  urls: string[],
  onProgress: (progress: number) => void,
  onAssetLoad: (assetName: string) => void
): Promise<void[]> => {
  const uniqueUrls = [...new Set(urls)];
  const filteredUrls = uniqueUrls.filter(
    (url) => url && typeof url === 'string'
  );
  const totalImages = filteredUrls.length;
  let loadedImages = 0;

  if (totalImages === 0) {
    onProgress(100);
    return Promise.resolve([]);
  }

  const promises = filteredUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const assetName = url.split('/').pop() || url;
      onAssetLoad(`Memuat gambar: ${assetName}`);
      const img = new Image();
      img.src = url;
      const onImageLoad = () => {
        loadedImages++;
        onProgress((loadedImages / totalImages) * 100);
        resolve();
      };
      img.onload = onImageLoad;
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        onImageLoad(); // Still resolve and count progress to not block the app
      };
    });
  });
  return Promise.all(promises);
};

/**
 * Preloads an array of video URLs and reports progress.
 * @param urls The array of video URLs to preload.
 * @param onProgress A callback function that receives the loading progress percentage (0-100).
 * @param onAssetLoad A callback function that receives the name of the asset currently being loaded.
 * @returns A promise that resolves when all videos are loaded or have failed.
 */
const preloadVideos = (
  urls: string[],
  onProgress: (progress: number) => void,
  onAssetLoad: (assetName: string) => void
): Promise<void[]> => {
  const uniqueUrls = [...new Set(urls)];
  const totalVideos = uniqueUrls.length;
  let loadedVideos = 0;

  if (totalVideos === 0) {
    onProgress(100);
    return Promise.resolve([]);
  }

  const promises = uniqueUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const assetName = url.split('/').pop() || url;
      onAssetLoad(`Memuat video: ${assetName}`);
      const video = document.createElement('video');
      video.src = url;
      video.playsInline = true;
      video.muted = true;
      video.preload = 'auto';

      const onVideoLoad = () => {
        loadedVideos++;
        onProgress((loadedVideos / totalVideos) * 100);
        resolve();
      };

      // 'canplaythrough' is a good event to listen for, indicating sufficient data is loaded.
      video.addEventListener('canplaythrough', onVideoLoad, { once: true });
      video.addEventListener(
        'error',
        () => {
          console.warn(`Failed to preload video: ${url}`);
          onVideoLoad(); // Still resolve to not block the app
        },
        { once: true }
      );

      video.load();
    });
  });
  return Promise.all(promises);
};

type UiActions = Pick<
  GameStoreActions,
  | 'loadGameData'
  | 'initializeCleaningTimers'
  | 'setActiveView'
  | 'setViewingTalent'
  | 'closeViewingTalent'
  | 'setViewingGuest'
  | 'closeViewingGuest'
  | 'setViewingReceipt'
  | 'confirmSelection'
  | 'selectRoom'
  | 'cancelSelection'
  | 'acknowledgeSessionNarrative'
  | 'closeMatchResult'
  | 'closeEndDayResult'
  | 'closeGachaResult'
  | 'openPhoneInventory'
  | 'closePhoneInventory'
  | 'openEquipmentInventory'
  | 'closeEquipmentInventory'
  | 'closeLivestreamResult'
  | 'cancelLivestreamSetup'
  | 'cancelProduction'
  | 'closeProductionResult'
  | 'unlockDevOptions'
  | 'toggleUnlimitedMoney'
  | 'toggleUnlimitedTalentMoney'
  | 'openOutcallModal'
  | 'closeOutcallModal'
>;

export const createUiActionsSlice: StoreSlice<UiActions> = (set, get) => ({
  loadGameData: async () => {
    set({ loadingProgress: 0, loadingMessage: 'Mempersiapkan...' });
    try {
      set({
        loadingProgress: 10,
        loadingMessage: 'Mengakses database lokal...',
      });
      const [
        savedGameState,
        savedTalents,
        savedGuests,
        savedRooms,
        userCreatedTalents,
      ] = await Promise.all([
        db.getGameState(),
        db.getTalents(),
        db.getGuests(),
        db.getRooms(),
        db.getUserCreatedTalents(),
      ]);
      set({
        loadingProgress: 20,
        loadingMessage: 'Memvalidasi data tersimpan...',
      });

      const combinedGachaPool = [...baseTalents, ...userCreatedTalents];
      set({ gachaTalentPool: combinedGachaPool });

      let finalTalents: Talent[];
      let finalGuests: Guest[];
      let finalGameState: GameState;

      // Data validation and fallback logic
      const isDataValid =
        savedGameState && savedTalents.length > 0 && savedRooms.length > 0;

      if (isDataValid) {
        set({ loadingMessage: 'Memuat progres tersimpan...' });
        finalTalents = savedTalents;
        finalGuests =
          savedGameState.gameTime.phase === 'Malam' ? savedGuests : [];
        finalGameState = {
          ...savedGameState,
          rooms: savedRooms,
          reputationToNextLevel: calculateReputationToNextLevel(
            savedGameState.level
          ),
        };
      } else {
        if (savedGameState) {
          // If some data exists but is inconsistent
          set({
            loadingMessage: 'Data korup terdeteksi, memulai game baru...',
          });
          console.warn(
            'Inconsistent data found in DB. Resetting to initial state.'
          );
        } else {
          set({ loadingMessage: 'Memulai petualangan baru...' });
        }

        const { INITIAL_GAME_STATE } = await import('../constants');
        finalTalents = generateTalents();
        finalGuests = [];
        finalGameState = {
          ...INITIAL_GAME_STATE,
          reputationToNextLevel: calculateReputationToNextLevel(
            INITIAL_GAME_STATE.level
          ),
        };
        // Save the fresh state to the DB
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { rooms: _rooms, ...gameStateToSave } = finalGameState;
        await db.saveGameState(gameStateToSave);
        await db.saveTalents(finalTalents);
        await db.saveGuests(finalGuests);
        await db.saveRooms(finalGameState.rooms);
      }

      set({
        loadingProgress: 30,
        loadingMessage: 'Mengumpulkan aset visual...',
      });

      // Collect image URLs
      const imageUrlsToLoad = new Set<string>();

      // Preload all UI Icons
      const uiIconUrls = [
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/cash.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Tabungan.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Loby.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Talenta .png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/kamar.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Kasir.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/sumon .png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/gear.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/market.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/klinik.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/advancement.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Makeup.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Lingerie.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Highhiel.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Bra.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/G-string.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Obat birahi.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/parfum .png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/icon/Stoking.png',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/icon/Tittle.jpg',
      ];
      uiIconUrls.forEach((url) => imageUrlsToLoad.add(url));

      finalTalents.forEach((t) => {
        if (t.imageUrl) imageUrlsToLoad.add(t.imageUrl);
      });
      finalGuests.forEach((g) => {
        if (g.imageUrl) imageUrlsToLoad.add(g.imageUrl);
      });
      combinedGachaPool.forEach((t) => {
        if (t.imageUrl) imageUrlsToLoad.add(t.imageUrl);
      });
      // Preload all equipment images
      ALL_EQUIPMENT_ITEMS.forEach((item) => {
        if (item.imageUrl) imageUrlsToLoad.add(item.imageUrl);
      });

      // Collect video URLs
      const videoUrlsToLoad = new Set<string>([
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/vidio/main.webm',
        'https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/vidio/loading-animation.webm',
      ]);

      const onAssetLoad = (assetName: string) => {
        set({ loadingMessage: assetName });
      };

      set({ loadingProgress: 40 });
      // Preload images (scaled to 40% -> 80% of progress bar)
      await preloadImages(
        Array.from(imageUrlsToLoad),
        (progress) => {
          set({ loadingProgress: 40 + progress * 0.4 });
        },
        onAssetLoad
      );

      set({ loadingProgress: 80, loadingMessage: 'Memuat video...' });

      // Preload videos (scaled to 80% -> 95% of progress bar)
      await preloadVideos(
        Array.from(videoUrlsToLoad),
        (progress) => {
          set({ loadingProgress: 80 + progress * 0.15 });
        },
        onAssetLoad
      );

      set({ loadingProgress: 95, loadingMessage: 'Finalisasi...' });

      set({
        gameState: finalGameState,
        talents: finalTalents,
        guests: finalGuests,
      });

      get().initializeCleaningTimers();
      set({ loadingProgress: 100 });
    } catch (error) {
      console.error('Gagal memuat data game dari IndexedDB:', error);
      const errorMessage =
        'Gagal memuat database. Pastikan browser Anda tidak dalam mode private dan izinkan penyimpanan data. Coba muat ulang halaman.';
      set({
        loading: true,
        loadingError: errorMessage,
        loadingMessage: errorMessage,
        loadingProgress: 50,
      });
    } finally {
      // Don't hide loading screen on error.
      if (!get().loadingError) {
        setTimeout(() => {
          set({ loading: false });
        }, 500);
      }
    }
  },
  initializeCleaningTimers: () => {
    const { gameState, cleaningTimers } = get();
    Object.values(cleaningTimers).forEach(clearTimeout);

    const roomsToUpdateImmediately: Room[] = [];
    const newTimers: { [roomId: string]: number } = {};
    const allRooms = [...gameState.rooms];

    allRooms.forEach((room) => {
      if (room.status === 'cleaning' && room.cleaningCompleteTime) {
        const remainingTime = room.cleaningCompleteTime - Date.now();
        if (remainingTime <= 0) {
          roomsToUpdateImmediately.push({
            ...room,
            status: 'available',
            cleaningCompleteTime: undefined,
            lastSessionInfo: undefined,
          });
        } else {
          const timerId = window.setTimeout(() => {
            const latestRooms = get().gameState.rooms;
            const finalRooms = latestRooms.map((r) =>
              r.id === room.id
                ? {
                    ...r,
                    status: 'available' as const,
                    cleaningCompleteTime: undefined,
                    lastSessionInfo: undefined,
                  }
                : r
            );
            const latestTimers = { ...get().cleaningTimers };
            delete latestTimers[room.id];
            set((state) => ({
              gameState: { ...state.gameState, rooms: finalRooms },
              cleaningTimers: latestTimers,
            }));
            db.saveRooms(finalRooms);
          }, remainingTime);
          newTimers[room.id] = timerId;
        }
      }
    });

    if (roomsToUpdateImmediately.length > 0) {
      const updatedRooms = allRooms.map(
        (r) => roomsToUpdateImmediately.find((u) => u.id === r.id) || r
      );
      set((state) => ({
        gameState: { ...state.gameState, rooms: updatedRooms },
      }));
      db.saveRooms(updatedRooms);
    }
    set({ cleaningTimers: newTimers });
  },
  setActiveView: (view) => set({ activeView: view }),
  setViewingTalent: (talent) => set({ viewingTalent: talent }),
  closeViewingTalent: () => set({ viewingTalent: null }),
  setViewingGuest: (guest) => set({ viewingGuest: guest }),
  closeViewingGuest: () => set({ viewingGuest: null }),
  setViewingReceipt: (session) => set({ viewingReceipt: session }),
  confirmSelection: (talent) => {
    const { gameState, isProcessing } = get();
    if (isProcessing) return;
    const isUnavailable =
      talent.unavailableUntil && talent.unavailableUntil > Date.now();
    if (isUnavailable) return;

    const hasAvailableRoom = gameState.rooms.some(
      (r) => r.status === 'available' && r.condition > 0
    );
    if (talent.currentEnergy < ENERGY_COST_PER_SESSION || !hasAvailableRoom)
      return;
    set({
      selectedTalent: talent,
      viewingTalent: null,
      activeView: View.PILIH_KAMAR,
    });
  },
  selectRoom: (roomId) => set({ selectedRoomId: roomId }),
  cancelSelection: () => {
    set({
      selectedTalent: null,
      selectedRoomId: null,
      activeView: View.TALENTA,
    });
  },
  acknowledgeSessionNarrative: () => {
    set({ sessionProgress: null, isSessionProcessingComplete: false });
  },
  closeMatchResult: () => {
    const { matchResult, gameState } = get();
    if (!matchResult) {
      set({ matchResult: null, activeView: View.LOBY, isProcessing: false });
      return;
    }
    const roomUsedId = matchResult.usedRoomId;
    if (!roomUsedId) {
      set({ matchResult: null, activeView: View.LOBY, isProcessing: false });
      return;
    }

    const updatedRooms = gameState.rooms.map((room) => {
      if (room.id === roomUsedId) {
        return { ...room, status: 'needs_cleaning' as const };
      }
      return room;
    });
    set((state) => ({
      matchResult: null,
      activeView: View.LOBY,
      isProcessing: false,
      gameState: {
        ...state.gameState,
        rooms: updatedRooms,
      },
    }));
    db.saveRooms(updatedRooms);
  },
  closeEndDayResult: () => {
    set({ endDayResult: null, activeView: View.LOBY });
  },
  closeGachaResult: () => set({ gachaResult: null }),
  openPhoneInventory: (talent) => set({ viewingPhoneInventoryFor: talent }),
  closePhoneInventory: () => set({ viewingPhoneInventoryFor: null }),
  openEquipmentInventory: (talent, slotType: ItemType) =>
    set({ viewingEquipmentInventoryFor: { talent, slotType } }),
  closeEquipmentInventory: () => set({ viewingEquipmentInventoryFor: null }),
  closeLivestreamResult: () => set({ livestreamResult: null }),
  cancelLivestreamSetup: () => set({ livestreamSetup: null }),
  cancelProduction: () => set({ productionSetup: null }),
  closeProductionResult: () => set({ productionResult: null }),
  openOutcallModal: (talent) => set({ viewingOutcallFor: talent }),
  closeOutcallModal: () => set({ viewingOutcallFor: null }),
  unlockDevOptions: () => {
    const { gameState } = get();
    if (gameState.devOptionsUnlocked) return;
    const newGameState = { ...gameState, devOptionsUnlocked: true };
    set({ gameState: newGameState });
    const { rooms: _r, ...gss } = newGameState;
    db.saveGameState(gss);
  },
  toggleUnlimitedMoney: () => {
    const { gameState, originalMoney } = get();
    const isCheatActive = gameState.cheats.unlimitedMoney;

    let newGameState;
    let newOriginalMoney = originalMoney;

    if (isCheatActive) {
      newGameState = {
        ...gameState,
        money: originalMoney || gameState.money,
        cheats: { ...gameState.cheats, unlimitedMoney: false },
      };
      newOriginalMoney = null;
    } else {
      newOriginalMoney = gameState.money;
      newGameState = {
        ...gameState,
        money: 999999999999,
        cheats: { ...gameState.cheats, unlimitedMoney: true },
      };
    }

    set({ gameState: newGameState, originalMoney: newOriginalMoney });
    const { rooms: _r, ...gss } = newGameState;
    db.saveGameState(gss);
  },
  toggleUnlimitedTalentMoney: () => {
    const { gameState, talents, originalTalentEarnings } = get();
    const isCheatActive = gameState.cheats.unlimitedTalentMoney;

    let newGameState;
    let newTalents;
    let newOriginalTalentEarnings = originalTalentEarnings;

    if (isCheatActive) {
      newTalents = talents.map((t) => {
        if (
          originalTalentEarnings &&
          originalTalentEarnings[t.id] !== undefined
        ) {
          return { ...t, earnings: originalTalentEarnings[t.id] };
        }
        return t;
      });
      newGameState = {
        ...gameState,
        cheats: { ...gameState.cheats, unlimitedTalentMoney: false },
      };
      newOriginalTalentEarnings = null;
    } else {
      newOriginalTalentEarnings = talents.reduce((acc, t) => {
        acc[t.id] = t.earnings;
        return acc;
      }, {} as { [talentId: string]: number });

      newTalents = talents.map((t) => ({ ...t, earnings: 999999999999 }));

      newGameState = {
        ...gameState,
        cheats: { ...gameState.cheats, unlimitedTalentMoney: true },
      };
    }

    set({
      gameState: newGameState,
      talents: newTalents,
      originalTalentEarnings: newOriginalTalentEarnings,
    });

    const { rooms: _r, ...gss } = newGameState;
    db.saveGameState(gss);
    db.saveTalents(newTalents);
  },
});
