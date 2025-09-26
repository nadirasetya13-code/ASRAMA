import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import { getRandomNumber, formatRupiah } from '../services/localDataService';
import {
  RAID_BRIBE_COST_PERCENTAGE,
  RAID_BRIBE_BASE_SUCCESS_CHANCE,
  RAID_BRIBE_LEVEL_BONUS,
  RAID_NEGOTIATE_BASE_SUCCESS_CHANCE,
  RAID_NEGOTIATE_MENTAL_MODIFIER,
  RAID_HIDE_SUCCESS_CHANCE,
  RAID_REPUTATION_PENALTY,
  RAID_SEAL_DURATION_DAYS_MIN,
  RAID_SEAL_DURATION_DAYS_MAX,
  RAID_MONEY_FINE_PERCENTAGE,
  RAID_TALENT_TRAUMA_DURATION_DAYS,
  RAID_SUSPICION_RESET_VALUE_FAIL,
  RAID_LAPORAN_RESMI_INCREASE,
  RAID_SUSPICION_RESET_VALUE_SUCCESS,
  SATPOLPP_FINE_PERCENTAGE,
  SATPOLPP_SEAL_DURATION_DAYS_BASE,
  SATPOLPP_SEAL_DURATION_DAYS_WITH_FINE,
  SATPOLPP_SUPERVISION_DEBUFF_DAYS,
  SATPOLPP_LAPORAN_RESET_VALUE,
  POLICE_INVESTIGATION_ACTIVATION_INCREASE,
  RAID_HIDE_FAIL_SEAL_MULTIPLIER,
  RAID_HIDE_FAIL_REPUTATION_MULTIPLIER,
  RAID_HIDE_FAIL_FINE_MULTIPLIER,
  // FIX: Import missing constants for police raid consequences.
  POLICE_MONEY_SEIZURE_PERCENTAGE,
  POLICE_SAVINGS_SEIZURE_PERCENTAGE,
  POLICE_TALENT_ARREST_COUNT,
  POLICE_PENYELIDIKAN_RESET_VALUE,
} from '../constants';

type RiskActions = Pick<
  GameStoreActions,
  | 'triggerRaid'
  | 'handleRaidChoice'
  | 'resolveRaid'
  | 'triggerSatpolPpRaid'
  | 'resolveSatpolPpRaid'
  | 'triggerPoliceRaid'
  | 'resolvePoliceRaid'
>;

export const createRiskActionsSlice: StoreSlice<RiskActions> = (set, get) => ({
  triggerRaid: () => {
    set({ activeRaidEvent: { status: 'decision' } });
  },

  handleRaidChoice: (choice) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });

    const { gameState, talents } = get();
    let success = false;
    let message = '';
    let negotiatingTalentInfo;
    let cost = 0;

    switch (choice) {
      case 'bribe':
        cost = Math.floor(gameState.money * RAID_BRIBE_COST_PERCENTAGE);
        if (gameState.money < cost) {
          success = false;
          message = 'Uangmu tidak cukup untuk menyogok! Warga makin marah!';
          break;
        }
        const bribeChance =
          RAID_BRIBE_BASE_SUCCESS_CHANCE +
          gameState.level * RAID_BRIBE_LEVEL_BONUS;
        success = Math.random() < bribeChance;
        message = success
          ? `Sogokan ${formatRupiah(
              cost
            )} berhasil! Ketua RW berhasil menenangkan warga.`
          : `Sogokanmu ditolak mentah-mentah! Uangmu hilang dan warga tetap mengamuk!`;
        break;

      case 'negotiate':
        const availableTalents = talents.filter(
          (t) => !t.unavailableUntil || t.unavailableUntil <= Date.now()
        );
        if (availableTalents.length === 0) {
          success = false;
          message =
            'Tidak ada talenta yang bisa dikirim untuk negosiasi! Kepanikan melanda.';
          break;
        }
        const negotiator = availableTalents.reduce((prev, current) =>
          prev.mental > current.mental ? prev : current
        );
        negotiatingTalentInfo = {
          name: negotiator.name,
          mental: negotiator.mental,
        };
        const negotiateChance =
          RAID_NEGOTIATE_BASE_SUCCESS_CHANCE +
          negotiator.mental * RAID_NEGOTIATE_MENTAL_MODIFIER;
        success = Math.random() < negotiateChance;
        message = success
          ? `${negotiator.name} dengan mental bajanya berhasil menenangkan warga dengan argumen yang cerdas!`
          : `${negotiator.name} gagal bernegosiasi. Ia diintimidasi dan kembali dengan mental hancur.`;
        break;

      case 'hide':
        success = Math.random() < RAID_HIDE_SUCCESS_CHANCE;
        message = success
          ? 'Keberuntungan berpihak padamu! Setelah beberapa saat, warga mengira asrama kosong dan membubarkan diri.'
          : 'Bersembunyi sia-sia! Warga yang marah mendobrak pintu gerbang!';
        break;
    }

    set({
      activeRaidEvent: {
        status: 'result',
        success,
        message,
        negotiatingTalent: negotiatingTalentInfo,
        choice,
      },
      isProcessing: false,
    });
  },

  resolveRaid: async () => {
    const { activeRaidEvent, gameState, talents } = get();
    if (!activeRaidEvent || activeRaidEvent.status !== 'result') return;

    let newGameState = { ...gameState };
    let newTalents = [...talents];

    if (activeRaidEvent.success) {
      newGameState.kecurigaanWarga = RAID_SUSPICION_RESET_VALUE_SUCCESS;
      const bribeCost = Math.floor(gameState.money * RAID_BRIBE_COST_PERCENTAGE);
      if (activeRaidEvent.message?.includes('Sogokan')) {
        newGameState.money -= bribeCost;
      }
    } else {
      // Failure logic with specific penalty scaling
      let reputationPenalty = RAID_REPUTATION_PENALTY;
      let sealDurationDays = getRandomNumber(
        RAID_SEAL_DURATION_DAYS_MIN,
        RAID_SEAL_DURATION_DAYS_MAX
      );
      let finePercentage = RAID_MONEY_FINE_PERCENTAGE;

      // Apply heavier penalties if the failed choice was 'hide'
      if (activeRaidEvent.choice === 'hide') {
        sealDurationDays = Math.floor(
          sealDurationDays * RAID_HIDE_FAIL_SEAL_MULTIPLIER
        );
        reputationPenalty = Math.floor(
          reputationPenalty * RAID_HIDE_FAIL_REPUTATION_MULTIPLIER
        );
        finePercentage *= RAID_HIDE_FAIL_FINE_MULTIPLIER;
      }

      newGameState.reputation += reputationPenalty;
      newGameState.asramaSealedUntil =
        Date.now() + sealDurationDays * 24 * 60 * 60 * 1000;

      const fineAmount = Math.floor(gameState.money * finePercentage);
      newGameState.money -= fineAmount;
      if (activeRaidEvent.message?.includes('ditolak mentah-mentah')) {
        newGameState.money -= Math.floor(
          gameState.money * RAID_BRIBE_COST_PERCENTAGE
        );
      }

      newGameState.kecurigaanWarga = RAID_SUSPICION_RESET_VALUE_FAIL;
      newGameState.laporanResmi += RAID_LAPORAN_RESMI_INCREASE;

      const traumaDuration =
        RAID_TALENT_TRAUMA_DURATION_DAYS * 24 * 60 * 60 * 1000;
      newTalents = newTalents.map((t) => {
        if (!t.unavailableUntil || t.unavailableUntil <= Date.now()) {
          return {
            ...t,
            mental: Math.max(0, t.mental - 20),
            unavailableUntil: Date.now() + traumaDuration,
            unavailabilityReason: 'Trauma Penggerebekan',
          };
        }
        return t;
      });
    }

    newGameState.raidPending = false;

    set({
      gameState: newGameState,
      talents: newTalents,
      activeRaidEvent: null,
    });

    const { rooms: _rooms, ...gameStateToSave } = newGameState;
    await db.saveGameState(gameStateToSave);
    await db.saveTalents(newTalents);

    get().endDay();
  },

  triggerSatpolPpRaid: () => {
    set({ activeSatpolPpEvent: { status: 'decision' } });
  },

  resolveSatpolPpRaid: async (paidFine) => {
    let { gameState } = get();

    if (paidFine) {
      // FIX: Reference 'savings' from the gameState object.
      const fineAmount = Math.floor(gameState.savings * SATPOLPP_FINE_PERCENTAGE);
      if (gameState.savings < fineAmount) {
        // Not enough savings, force the harsher penalty
        return get().resolveSatpolPpRaid(false);
      }
      gameState.savings -= fineAmount;
      gameState.asramaSealedUntil =
        Date.now() + SATPOLPP_SEAL_DURATION_DAYS_BASE * 24 * 60 * 60 * 1000;
    } else {
      gameState.asramaSealedUntil =
        Date.now() +
        SATPOLPP_SEAL_DURATION_DAYS_WITH_FINE * 24 * 60 * 60 * 1000;
    }

    gameState.reputation = Math.floor(gameState.reputation / 2);
    gameState.supervisionDebuffUntil =
      Date.now() + SATPOLPP_SUPERVISION_DEBUFF_DAYS * 24 * 60 * 60 * 1000;
    gameState.laporanResmi = SATPOLPP_LAPORAN_RESET_VALUE;
    gameState.penyelidikanPolisiActive = true;
    gameState.penyelidikanPolisi += POLICE_INVESTIGATION_ACTIVATION_INCREASE;

    set({ gameState, activeSatpolPpEvent: null });

    const { rooms: _rooms, ...gameStateToSave } = gameState;
    await db.saveGameState(gameStateToSave);

    get().endDay();
  },

  triggerPoliceRaid: () => {
    const { gameState, talents } = get();
    const seizedMoney = Math.floor(
      gameState.money * POLICE_MONEY_SEIZURE_PERCENTAGE
    );
    const seizedSavings = Math.floor(
      gameState.savings * POLICE_SAVINGS_SEIZURE_PERCENTAGE
    );

    const sortedTalents = [...talents].sort((a, b) => b.dayaPikat - a.dayaPikat);
    const arrestedTalentsRaw = sortedTalents.slice(
      0,
      POLICE_TALENT_ARREST_COUNT
    );

    set({
      activePoliceRaidEvent: {
        status: 'result',
        seizedMoney,
        seizedSavings,
        arrestedTalents: arrestedTalentsRaw.map((t) => ({
          name: t.name,
          rarity: t.rarity,
        })),
      },
    });
  },

  resolvePoliceRaid: async () => {
    const { gameState, talents, activePoliceRaidEvent } = get();
    if (!activePoliceRaidEvent) return;

    let newGameState = { ...gameState };

    newGameState.money -= activePoliceRaidEvent.seizedMoney;
    newGameState.savings -= activePoliceRaidEvent.seizedSavings;
    newGameState.hasCriminalRecord = true;
    newGameState.penyelidikanPolisi = POLICE_PENYELIDIKAN_RESET_VALUE;

    const arrestedTalentNames = new Set(
      activePoliceRaidEvent.arrestedTalents.map((t) => t.name)
    );
    const remainingTalents = talents.filter(
      (t) => !arrestedTalentNames.has(t.name)
    );

    set({
      gameState: newGameState,
      talents: remainingTalents,
      activePoliceRaidEvent: null,
    });

    const { rooms: _rooms, ...gameStateToSave } = newGameState;
    await db.saveGameState(gameStateToSave);
    await db.saveTalents(remainingTalents);

    get().endDay();
  },
});
