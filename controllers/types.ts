import {
  GameState,
  Talent,
  Guest,
  MatchResult,
  View,
  EndDayResult,
  GachaResultItem,
  PhoneItem,
  LivestreamResult,
  ActiveLivestreamSession,
  LivestreamSetup,
  ItemType,
  ProductionSetup,
  ProductionResult,
  ConsumableItem,
  RoomType,
  RaidEvent,
  SatpolPpEvent,
  PoliceRaidEvent,
  EquipmentItem,
  BaseTalent,
  EquipmentGachaResultItem,
} from '../types';
import { OutcallType } from '../constants';

export interface GameStoreState {
  loading: boolean;
  loadingProgress: number;
  loadingMessage: string;
  loadingError: string | null;
  isProcessing: boolean;
  sessionProgress: { narrative: string[]; duration: number } | null;
  isSessionProcessingComplete: boolean;
  gameState: GameState;
  talents: Talent[];
  guests: Guest[];
  gachaTalentPool: BaseTalent[];
  selectedTalent: Talent | null;
  selectedRoomId: string | null;
  viewingTalent: Talent | null;
  viewingGuest: Guest | null;
  viewingReceipt: MatchResult | null;
  matchResult: MatchResult | null;
  endDayResult: EndDayResult | null;
  gachaResult: GachaResultItem[] | null;
  equipmentGachaResult: EquipmentGachaResultItem[] | null;
  activeView: View;
  cleaningTimers: { [roomId: string]: number };
  viewingPhoneInventoryFor: Talent | null;
  viewingEquipmentInventoryFor: { talent: Talent; slotType: ItemType } | null;
  livestreamResult: LivestreamResult | null;
  activeLivestreamSession: ActiveLivestreamSession & { topic: string } | null;
  livestreamSetup: LivestreamSetup | null;
  productionSetup: ProductionSetup | null;
  productionResult: ProductionResult | null;
  originalMoney: number | null; // For developer cheats
  originalTalentEarnings: { [talentId: string]: number } | null; // For talent money cheat
  viewingOutcallFor: Talent | null;
  activeRaidEvent: RaidEvent | null;
  activeSatpolPpEvent: SatpolPpEvent | null;
  activePoliceRaidEvent: PoliceRaidEvent | null;
}

export interface GameStoreActions {
  loadGameData: () => Promise<void>;
  initializeCleaningTimers: () => void;
  setViewingTalent: (talent: Talent) => void;
  closeViewingTalent: () => void;
  setViewingGuest: (guest: Guest) => void;
  closeViewingGuest: () => void;
  setViewingReceipt: (session: MatchResult | null) => void;
  confirmSelection: (talent: Talent) => void;
  selectRoom: (roomId: string) => void;
  cancelSelection: () => void;
  handleMatch: (condomName: string | null) => void;
  acknowledgeSessionNarrative: () => void;
  processPayment: (sessionId: string, method: 'Cash' | 'QR') => Promise<void>;
  transferFunds: (
    amount: number,
    direction: 'savingsToCash' | 'cashToSavings'
  ) => Promise<void>;
  closeMatchResult: () => void;
  closeEndDayResult: () => void;
  setActiveView: (view: View) => void;
  startNight: () => void;
  endDay: () => void;
  buildNewRoom: (roomType: RoomType) => void;
  upgradeRoom: (roomId: string) => void;
  repairRoom: (roomId: string) => void;
  cleanRoom: (roomId: string) => void;
  performGachaPull: (count: 1 | 10, isFree?: boolean) => Promise<void>;
  closeGachaResult: () => void;
  performEquipmentGacha: (talentId: string, count: 1 | 10) => Promise<void>;
  closeEquipmentGachaResult: () => void;
  reincarnateTalent: (talentId: string) => Promise<void>;
  saveCreatedTalent: (talent: BaseTalent) => Promise<void>;
  buyPhone: (
    phoneData: Omit<PhoneItem, 'id' | 'level' | 'equippedTo'>
  ) => Promise<void>;
  buyConsumable: (itemData: ConsumableItem) => Promise<void>;
  upgradePhone: (phoneId: string) => Promise<void>;
  equipPhone: (phoneId: string, talentId: string) => Promise<void>;
  openPhoneInventory: (talent: Talent) => void;
  closePhoneInventory: () => void;
  openEquipmentInventory: (talent: Talent, slotType: ItemType) => void;
  closeEquipmentInventory: () => void;
  equipProductionItem: (
    itemId: string,
    talentId: string,
    slotType: ItemType
  ) => Promise<void>;
  unequipProductionItem: (talentId: string, slotType: ItemType) => Promise<void>;
  prepareLivestream: (talentId: string) => void;
  cancelLivestreamSetup: () => void;
  selectLivestreamPackage: (packageId: string) => void;
  startLivestream: (chosenTopic: string) => void;
  handleLivestreamChoice: (choiceIndex: number) => void;
  endLivestream: () => Promise<void>;
  closeLivestreamResult: () => void;
  prepareProduction: (talentId: string) => void;
  cancelProduction: () => void;
  startProduction: (
    batchSize: number,
    contentType: 'Foto' | 'Video',
    theme: string
  ) => Promise<void>;
  closeProductionResult: () => void;
  openOutcallModal: (talent: Talent) => void;
  closeOutcallModal: () => void;
  handleOutcall: (type: OutcallType) => Promise<void>;
  unlockDevOptions: () => void;
  toggleUnlimitedMoney: () => void;
  toggleUnlimitedTalentMoney: () => void;
  performSurgery: (
    talentId: string,
    attributePath: string,
    targetValue: number
  ) => Promise<void>;
  claimAdvancementReward: (level: number) => void;
  // Citizen Raid
  triggerRaid: () => void;
  handleRaidChoice: (choice: 'bribe' | 'negotiate' | 'hide') => void;
  resolveRaid: () => void;
  // Satpol-PP Raid
  triggerSatpolPpRaid: () => void;
  resolveSatpolPpRaid: (paidFine: boolean) => void;
  // Police Raid
  triggerPoliceRaid: () => void;
  resolvePoliceRaid: () => void;
}

// Helper type for creating store slices
export type StoreSlice<T> = (
  set: (
    partial:
      | (GameStoreState & GameStoreActions)
      | Partial<GameStoreState & GameStoreActions>
      | ((
          state: GameStoreState & GameStoreActions
        ) =>
          | (GameStoreState & GameStoreActions)
          | Partial<GameStoreState & GameStoreActions>),
    replace?: boolean | undefined
  ) => void,
  get: () => GameStoreState & GameStoreActions
) => T;
