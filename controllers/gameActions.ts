import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import {
  EndDayResult,
  GameState,
  MatchResult,
  SkillCard,
  ActiveBuff,
  View,
  Talent,
} from '../types';
import {
  generateGuests,
  calculateGuestSatisfaction,
  calculateTalentImpact,
  getBonusDescriptions,
  generateDynamicBuff,
  calculateSessionDuration,
  generateSessionNarrative,
  calculateExpToNextLevel,
  calculateReputationToNextLevel,
  calculateDayaPikat,
  calculateTariffs,
  calculateAtmTax,
  calculateOutcallResult,
  calculateEffectiveTalent,
} from '../services/localDataService';
import { AVAILABLE_SKILLS } from '../services/game/data/skills';
import {
  DAILY_OPERATIONAL_COST,
  ENERGY_RECOVERY_PER_DAY,
  GUEST_TIER_CONFIG,
  MATCH_REWARDS,
  MAX_SKILLS_BY_RARITY,
  PLAYER_MAX_LEVEL,
  REPUTATION_PENALTY_PER_UNSERVED_GUEST,
  SKILL_UNLOCK_LEVELS,
  CONDITION_DECAY_PER_SESSION,
  TALENT_RETIREMENT_AGE,
  TALENT_HIBERNATION_DURATION_MS,
  CONTENT_SELL_THROUGH_CHANCE,
  PRODUCTION_AGENCY_COMMISSION,
  HIV_INFECTION_THRESHOLD,
  BASE_HEALTH_RECOVERY_PER_DAY,
  HEALTH_RECOVERY_STAMINA_MODIFIER,
  OutcallType,
  MENSTRUATION_BASE_CHANCE,
  MENSTRUATION_HEALTH_PENALTY_MODIFIER,
  MENSTRUATION_YOUNG_AGE_MODIFIER,
  SUSPICION_FROM_LOW_SATISFACTION,
  SUSPICION_FROM_KASAR_TRAIT,
  SUSPICION_FROM_DOMINASI_KINK,
  RAID_SUSPICION_THRESHOLD,
  SUSPICION_FROM_LOW_REPUTATION,
  SATPOLPP_LAPORAN_RESMI_THRESHOLD,
  POLICE_PENYELIDIKAN_THRESHOLD,
  LAPORAN_RESMI_FROM_KASAR_TRAIT,
  LAPORAN_RESMI_FROM_DOMINASI_KINK,
  LAPORAN_RESMI_FROM_PENYEBAR_PENYAKIT,
  PENYELIDIKAN_FROM_PENYEBAR_PENYAKIT,
  SATPOLPP_SUPERVISION_MULTIPLIER,
  PENYELIDIKAN_FROM_SUPERVISION,
  POLICE_CRIMINAL_RECORD_COST_INCREASE,
  // FIX: Import POLICE_CRIMINAL_RECORD_REP_DECREASE to resolve reference error.
  POLICE_CRIMINAL_RECORD_REP_DECREASE,
} from '../constants';

type GameActions = Pick<
  GameStoreActions,
  | 'startNight'
  | 'endDay'
  | 'handleMatch'
  | 'processPayment'
  | 'transferFunds'
  | 'handleOutcall'
>;

export const createGameActionsSlice: StoreSlice<GameActions> = (set, get) => ({
  startNight: async () => {
    if (get().isProcessing) return;
    const { gameState, talents } = get();
    if (gameState.asramaSealedUntil && gameState.asramaSealedUntil > Date.now()) {
        return; // Prevent starting night if sealed
    }
    set({ isProcessing: true });
    try {
      const newGuests = generateGuests(gameState.level, gameState.reputation, talents);
      const newGameState = {
        ...gameState,
        gameTime: { ...gameState.gameTime, phase: 'Malam' as const },
      };
      set({
        gameState: newGameState,
        guests: newGuests,
        activeView: View.LOBY,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveGuests(newGuests);
    } finally {
      set({ isProcessing: false });
    }
  },
  endDay: async () => {
    if (get().isProcessing) return;
    
    // Check for pending raids in order of severity
    const { gameState: currentGameState } = get();
    if (currentGameState.penyelidikanPolisi >= POLICE_PENYELIDIKAN_THRESHOLD) {
        get().triggerPoliceRaid();
        return;
    }
    if (currentGameState.laporanResmi >= SATPOLPP_LAPORAN_RESMI_THRESHOLD) {
        get().triggerSatpolPpRaid();
        return;
    }
    if (currentGameState.raidPending) {
        get().triggerRaid();
        return;
    }

    set({ isProcessing: true });
    try {
      const { gameState, talents, guests, cleaningTimers } = get();
      Object.values(cleaningTimers).forEach(clearTimeout);

      let pendingAgencyProfit = 0;
      const pendingTalentEarnings = new Map<string, number>();

      gameState.unpaidSessions.forEach((session) => {
        pendingAgencyProfit += session.labaBersih;
        const current = pendingTalentEarnings.get(session.talentId) || 0;
        pendingTalentEarnings.set(
          session.talentId,
          current + session.talentEarnings
        );
      });

      let talentsWithPendingEarnings = talents.map((t) => {
        if (pendingTalentEarnings.has(t.id)) {
          return {
            ...t,
            earnings: t.earnings + (pendingTalentEarnings.get(t.id) || 0),
          };
        }
        return t;
      });

      let totalPassiveIncome = 0;
      const talentEarningsFromContent = new Map<string, number>();
      const soldPhotoIds = new Set<string>();
      const soldVideoIds = new Set<string>();

      talentsWithPendingEarnings.forEach((t) => {
        let dailyTalentIncome = 0;
        t.photoInventory.forEach((item) => {
          if (Math.random() < CONTENT_SELL_THROUGH_CHANCE * (1 + (item.quality - 50) / 100)) {
            const agencyShare = item.potentialEarnings * PRODUCTION_AGENCY_COMMISSION;
            const talentShare = item.potentialEarnings - agencyShare;
            totalPassiveIncome += agencyShare;
            dailyTalentIncome += talentShare;
            soldPhotoIds.add(item.id);
          }
        });
        t.videoInventory.forEach((item) => {
          if (Math.random() < CONTENT_SELL_THROUGH_CHANCE * (1 + (item.quality - 50) / 100)) {
            const agencyShare = item.potentialEarnings * PRODUCTION_AGENCY_COMMISSION;
            const talentShare = item.potentialEarnings - agencyShare;
            totalPassiveIncome += agencyShare;
            dailyTalentIncome += talentShare;
            soldVideoIds.add(item.id);
          }
        });
        if (dailyTalentIncome > 0) {
            talentEarningsFromContent.set(t.id, dailyTalentIncome);
        }
      });
      
      const talentsAfterContentSales = talentsWithPendingEarnings.map(t => {
          const newEarnings = (t.earnings || 0) + (talentEarningsFromContent.get(t.id) || 0);
          return {
              ...t,
              earnings: newEarnings,
              photoInventory: t.photoInventory.filter(item => !soldPhotoIds.has(item.id)),
              videoInventory: t.videoInventory.filter(item => !soldVideoIds.has(item.id)),
          };
      });

      const unservedGuests = guests.length;
      const reputationPenalty =
        unservedGuests * REPUTATION_PENALTY_PER_UNSERVED_GUEST;
      let operationalCost = DAILY_OPERATIONAL_COST + (gameState.level * 10000);
      if (gameState.hasCriminalRecord) {
          operationalCost *= POLICE_CRIMINAL_RECORD_COST_INCREASE;
      }
      const roomMaintenanceCost = gameState.rooms.reduce(
        (cost, room) => cost + room.level * 5000,
        0
      );
      
      const talentRecoveryInfo: { talentName: string; healthRecovered: number }[] = [];
      const tempTalentsForKb = [...talentsAfterContentSales];
      let tempMoney = gameState.money;

      const talentsAfterKb = tempTalentsForKb.map(t => {
        const kbCost = t.tariffs.kb;
        operationalCost += kbCost;
        if(tempMoney >= kbCost) {
            tempMoney -= kbCost;
            return { ...t, isOnContraceptives: true };
        }
        return { ...t, isOnContraceptives: false };
      });

      const netMoneyChange = -operationalCost - roomMaintenanceCost;

      const updatedBuffs = gameState.activeBuffs
        .map((buff) => ({ ...buff, durationDays: buff.durationDays - 1 }))
        .filter((buff) => buff.durationDays > 0);

      const processedTalents = talentsAfterKb.map((t) => {
        if (t.isDeceased) return null;
        if ((t.potensiHIVAIDS ?? 0) >= HIV_INFECTION_THRESHOLD && !t.isDeceased) {
            return { ...t, isDeceased: true };
        }

        const wasUsedThisNight = gameState.unpaidSessions.some(s => s.talentId === t.id);
        let healthAfterRecovery = t.kesehatan;
        
        const isUnavailable = t.unavailableUntil && t.unavailableUntil > Date.now();

        if (!wasUsedThisNight && t.kesehatan < 100 && !isUnavailable) {
            const healthRecovered = Math.floor(BASE_HEALTH_RECOVERY_PER_DAY + (t.stamina / HEALTH_RECOVERY_STAMINA_MODIFIER));
            healthAfterRecovery = Math.min(100, t.kesehatan + healthRecovered);
            talentRecoveryInfo.push({ talentName: t.name, healthRecovered: healthAfterRecovery - t.kesehatan });
        }
        
        const restedTalent = {
          ...t,
          kesehatan: healthAfterRecovery,
          currentEnergy: isUnavailable ? t.currentEnergy : Math.min(
            t.stamina,
            t.currentEnergy + ENERGY_RECOVERY_PER_DAY
          ),
        };

        if (
          restedTalent.age >= TALENT_RETIREMENT_AGE &&
          !restedTalent.hibernationEndTime
        ) {
          return {
            ...restedTalent,
            hibernationEndTime: Date.now() + TALENT_HIBERNATION_DURATION_MS,
          };
        }
        return restedTalent;
      }).filter(Boolean) as Talent[];

      const result: EndDayResult = {
        operationalCost,
        roomMaintenanceCost,
        unservedGuests,
        reputationPenalty,
        netMoneyChange,
        activeBuffs: gameState.activeBuffs,
        passiveIncome: totalPassiveIncome,
        talentRecoveryInfo,
      };

      set({ endDayResult: result });

      const updatedRoomsForNewDay = gameState.rooms.map((r) => {
        if (r.status === 'cleaning') {
          return {
            ...r,
            status: 'needs_cleaning' as const,
            cleaningCompleteTime: undefined,
          };
        }
        return {
          ...r,
          status: 'available' as const,
          cleaningCompleteTime: undefined,
          lastSessionInfo: undefined,
        };
      });

      const newGameState = {
        ...gameState,
        money:
          gameState.money +
          netMoneyChange +
          pendingAgencyProfit +
          totalPassiveIncome,
        reputation: Math.max(0, gameState.reputation + reputationPenalty),
        gameTime: {
          day: gameState.gameTime.day + 1,
          phase: 'Siang' as const,
        },
        rooms: updatedRoomsForNewDay,
        activeBuffs: updatedBuffs,
        unpaidSessions: [],
      };

      set({
        gameState: newGameState,
        talents: processedTalents,
        guests: [],
        cleaningTimers: {},
      });

      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveTalents(processedTalents);
      await db.saveGuests([]);
      await db.saveRooms(newGameState.rooms);
    } finally {
      set({ isProcessing: false });
    }
  },
  handleMatch: async (condomName: string | null) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });

    try {
      const { selectedTalent, guests, gameState, talents, selectedRoomId } =
        get();
      if (!selectedTalent || guests.length === 0 || !selectedRoomId) {
        set({ isProcessing: false });
        return;
      }
      
      let haidChance = MENSTRUATION_BASE_CHANCE;
      if (selectedTalent.kesehatan < 50) {
        haidChance += (50 - selectedTalent.kesehatan) * MENSTRUATION_HEALTH_PENALTY_MODIFIER;
      }
      if (selectedTalent.age < 22) {
        haidChance += MENSTRUATION_YOUNG_AGE_MODIFIER;
      }

      if (!selectedTalent.isOnContraceptives && Math.random() < haidChance) {
        const unavailabilityDuration = 7 * 24 * 60 * 60 * 1000;
        const updatedTalent = {
          ...selectedTalent,
          unavailableUntil: Date.now() + unavailabilityDuration,
          unavailabilityReason: 'Haid' as const,
          currentEnergy: Math.max(0, selectedTalent.currentEnergy - 10),
        };

        const updatedTalents = talents.map(t => t.id === updatedTalent.id ? updatedTalent : t);
        const updatedGuests = guests.slice(1);

        const failedResult: MatchResult = {
          sessionId: `failed-${Date.now()}`,
          talentId: selectedTalent.id,
          talentName: selectedTalent.name,
          talentImageUrl: selectedTalent.imageUrl,
          guestName: guests[0].name,
          guestImageUrl: guests[0].imageUrl,
          success: false,
          message: 'Sesi Dihentikan: Haid',
          pendapatanKotor: 0,
          biayaPerawatan: 0,
          labaBersih: 0,
          reputationChange: -10,
          xpGained: 10,
          talentEarnings: 0,
          satisfactionScore: 0,
          talentImpact: { kesehatanChange: -2, mentalChange: -5, energyChange: 10, hivRiskIncrease: 0, pregnancyRiskIncrease: 0 },
          usedRoomId: selectedRoomId,
          roomBonuses: [],
          unavailabilityMessage: 'Tidak bisa melayani selama 7 hari (Haid).'
        };

        const narrative = [`Di tengah sesi, ${selectedTalent.name} tiba-tiba meringis kesakitan. Darah haid datang tanpa diduga, memaksa sesi dihentikan seketika.`];
        set({
          sessionProgress: { narrative, duration: 5000 },
          activeView: View.LOBY,
          selectedTalent: null,
          selectedRoomId: null,
        });

        setTimeout(async () => {
            set({
                talents: updatedTalents,
                guests: updatedGuests,
                matchResult: failedResult,
                isSessionProcessingComplete: true,
            });
            await db.saveTalents(updatedTalents);
            await db.saveGuests(updatedGuests);
        }, 5000);
        return;
      }

      const chosenRoom = gameState.rooms.find((r) => r.id === selectedRoomId);
      if (!chosenRoom) {
        console.error('Room not found!');
        set({ isProcessing: false });
        return;
      }

      const currentGuest = guests[0];
      const { activeBonuses } = calculateEffectiveTalent(selectedTalent);
      const tempActiveBuffs = [...gameState.activeBuffs];
      let newBuff: ActiveBuff | undefined = undefined;
      const isSubstitute = !!(
        currentGuest.requestedTalentId &&
        currentGuest.requestedTalentId !== selectedTalent.id
      );

      if (
        'rarity' in chosenRoom &&
        chosenRoom.rarity === 'Event' &&
        selectedTalent.rarity === 'Event'
      ) {
        newBuff = generateDynamicBuff(chosenRoom.id, chosenRoom.name);
        tempActiveBuffs.push(newBuff);
      }
      if (
        'rarity' in chosenRoom &&
        chosenRoom.rarity === 'Khusus' &&
        selectedTalent.rarity === 'Khusus'
      ) {
        newBuff = generateDynamicBuff(chosenRoom.id, chosenRoom.name);
        tempActiveBuffs.push(newBuff);
      }

      const { score, conditionMet } = calculateGuestSatisfaction(
        selectedTalent,
        currentGuest,
        chosenRoom,
        isSubstitute
      );
      let satisfactionScore = score;
      
      // Add chance for a random buff on a very successful session
      if (satisfactionScore >= 95 && Math.random() < 0.25) {
        if (!newBuff) { // Only generate if one wasn't already generated
          newBuff = generateDynamicBuff(chosenRoom.id, chosenRoom.name);
          tempActiveBuffs.push(newBuff);
        }
      }

      const condomUsed = condomName ? gameState.playerConsumables[condomName]?.item : null;
      const talentImpact = calculateTalentImpact(
        selectedTalent,
        currentGuest,
        chosenRoom,
        condomUsed
      );
      const bonusDescriptions = getBonusDescriptions(
        chosenRoom,
        tempActiveBuffs
      );

      if ('rarity' in chosenRoom && chosenRoom.rarity === 'Mystic') {
        satisfactionScore = Math.max(85, satisfactionScore);
      }

      const guestTierMultiplier =
        GUEST_TIER_CONFIG[currentGuest.tier]?.multiplier || 1.0;

      let message: string;
      let baseRep: number;
      let xpMultiplier: number;

      if (satisfactionScore >= 95) {
        message = 'Fantasi Terpenuhi Sempurna!';
        baseRep = MATCH_REWARDS.PERFECT_MATCH_REP;
        xpMultiplier = 1.5;
      } else if (satisfactionScore >= 80) {
        message = 'Sesi yang Sangat Memuaskan!';
        baseRep = MATCH_REWARDS.GOOD_MATCH_REP;
        xpMultiplier = 1.2;
      } else if (satisfactionScore >= 60) {
        message = 'Cukup Puas.';
        baseRep = MATCH_REWARDS.OK_MATCH_REP;
        xpMultiplier = 1.0;
      } else if (satisfactionScore >= 40) {
        message = 'Sesi Standar.';
        baseRep = MATCH_REWARDS.MINIMAL_MATCH_REP;
        xpMultiplier = 0.8;
      } else {
        message = 'Tidak Sesuai Harapan!';
        baseRep = MATCH_REWARDS.BAD_MATCH_REP;
        xpMultiplier = 0.5;
      }

      let financialMultiplier = 1.0;
      if (currentGuest.personalityTraits.includes('Royal')) {
        let royalBonus = 0.5; // Base 50% bonus
        if (activeBonuses.some(b => b.setName === 'Windfall' && b.bonus.threshold === 8)) {
            royalBonus *= 1.5; // Windfall 8pc increases the bonus by 50%
        }
        financialMultiplier = 1 + royalBonus;
      }
      if (currentGuest.personalityTraits.includes('Pelit')) {
        financialMultiplier = 0.6;
      }

      const { tariffs } = selectedTalent;
      let pendapatanKotor = Math.floor(
        tariffs.layanan *
          guestTierMultiplier *
          Math.pow(satisfactionScore / 100, 1.5) *
          financialMultiplier
      );

      tempActiveBuffs.forEach((buff) => {
        if (
          buff.effect === 'EARNINGS_BONUS' &&
          conditionMet[buff.condition]
        ) {
          if (
            buff.target === 'ALL_SESSIONS_TODAY' ||
            (buff.target === 'NEXT_SESSION' && !buff.isTriggered)
          ) {
            pendapatanKotor *= 1 + buff.value;
          }
        }
      });

      const totalBiaya = tariffs.perawatan + tariffs.kesehatan + tariffs.kb;
      let labaBersih = pendapatanKotor - totalBiaya;
      let reputationChange = Math.ceil(baseRep * guestTierMultiplier);
      if(gameState.hasCriminalRecord) {
        reputationChange *= POLICE_CRIMINAL_RECORD_REP_DECREASE;
        reputationChange = Math.floor(reputationChange);
      }
      reputationChange += Math.ceil(
        reputationChange * (chosenRoom.upgrades.reputationBonus || 0)
      );

      tempActiveBuffs.forEach((buff) => {
        if (
          buff.effect === 'REPUTATION_BONUS' &&
          conditionMet[buff.condition]
        ) {
          reputationChange += Math.ceil(reputationChange * buff.value);
        }
      });

      if (currentGuest.personalityTraits.includes('Setia')) {
        if (satisfactionScore >= 80) {
          reputationChange += 3;
          labaBersih = Math.floor(labaBersih * 1.15);
          message += ' (+Bonus Setia!)';
        }
      }

      let talentEarnings = 0;
      if (labaBersih > 0) {
        const baseShare = labaBersih * 0.3;
        const bonusFromUpgrades =
          baseShare * (chosenRoom.upgrades.talentEarningsBonus || 0);
        talentEarnings = Math.floor(baseShare + bonusFromUpgrades);
      }

      const agencyProfit = labaBersih - talentEarnings;
      let xpGained = Math.floor(
        (30 + selectedTalent.dayaPikat * 0.3) *
          guestTierMultiplier *
          xpMultiplier
      );
      tempActiveBuffs.forEach((buff) => {
        if (buff.effect === 'XP_BONUS' && conditionMet[buff.condition]) {
          xpGained += Math.floor(xpGained * buff.value);
        }
      });

      const fullMatchResult: MatchResult = {
        sessionId: `session-${Date.now()}`,
        talentId: selectedTalent.id,
        talentName: selectedTalent.name,
        talentImageUrl: selectedTalent.imageUrl,
        guestName: currentGuest.name,
        guestImageUrl: currentGuest.imageUrl,
        success: true,
        message,
        pendapatanKotor,
        biayaPerawatan: totalBiaya,
        labaBersih: agencyProfit,
        reputationChange,
        xpGained,
        levelUp: false,
        ageUp: false,
        playerLevelUp: false,
        talentEarnings,
        roomBonuses: bonusDescriptions,
        usedRoomId: chosenRoom.id,
        newBuff,
        satisfactionScore,
        talentImpact,
      };

      const duration = calculateSessionDuration(selectedTalent, currentGuest);
      const narrative = generateSessionNarrative(
        selectedTalent,
        currentGuest,
        fullMatchResult,
        duration
      );

      set({
        sessionProgress: { narrative, duration },
        activeView: View.LOBY,
        selectedTalent: null,
        selectedRoomId: null,
      });

      setTimeout(async () => {
        const { gameState: currentGameState } = get();
        let { raidPending } = currentGameState;
        
        let suspicionMultiplier = 1.0;
        if(currentGameState.supervisionDebuffUntil && currentGameState.supervisionDebuffUntil > Date.now()) {
            suspicionMultiplier = SATPOLPP_SUPERVISION_MULTIPLIER;
        }

        let newSuspicion = currentGameState.kecurigaanWarga;
        if (satisfactionScore < 40) newSuspicion += (SUSPICION_FROM_LOW_SATISFACTION * suspicionMultiplier);
        if (currentGuest.personalityTraits.includes('Kasar')) newSuspicion += (SUSPICION_FROM_KASAR_TRAIT * suspicionMultiplier);
        if (currentGuest.kinks.some(k => k.type === 'Dominasi')) newSuspicion += (SUSPICION_FROM_DOMINASI_KINK * suspicionMultiplier);
        if (currentGameState.reputation < 30) newSuspicion += (SUSPICION_FROM_LOW_REPUTATION * suspicionMultiplier);

        let newLaporanResmi = currentGameState.laporanResmi;
        if (currentGuest.personalityTraits.includes('Kasar')) newLaporanResmi += (LAPORAN_RESMI_FROM_KASAR_TRAIT * suspicionMultiplier);
        if (currentGuest.kinks.some(k => k.type === 'Dominasi')) newLaporanResmi += (LAPORAN_RESMI_FROM_DOMINASI_KINK * suspicionMultiplier);
        if (currentGuest.personalityTraits.includes('Penyebar Penyakit')) newLaporanResmi += LAPORAN_RESMI_FROM_PENYEBAR_PENYAKIT;

        let newPenyelidikanPolisi = currentGameState.penyelidikanPolisi;
        if (currentGameState.penyelidikanPolisiActive) {
            if (currentGuest.personalityTraits.includes('Penyebar Penyakit')) newPenyelidikanPolisi += PENYELIDIKAN_FROM_PENYEBAR_PENYAKIT;
            if (suspicionMultiplier > 1.0) newPenyelidikanPolisi += PENYELIDIKAN_FROM_SUPERVISION;
        }
        
        if (!raidPending && newSuspicion >= RAID_SUSPICION_THRESHOLD) {
            raidPending = true;
        }

        const updatedTalent = { ...selectedTalent };
        let allTalents = [...talents];
        let newSkillUnlocked: SkillCard | undefined = undefined;

        if (
          'rarity' in chosenRoom &&
          chosenRoom.rarity === 'Special' &&
          selectedTalent.rarity === 'Special'
        ) {
          const lowestPiqueTalent = allTalents.reduce((prev, curr) =>
            prev.dayaPikat < curr.dayaPikat ? prev : curr
          );
          if (lowestPiqueTalent) {
            allTalents = allTalents.map((t) =>
              t.id === lowestPiqueTalent.id
                ? { ...t, experience: t.experience + xpGained }
                : t
            );
          }
        }

        let finalEnergyChange = talentImpact.energyChange;
        const zeroEnergyBuff = tempActiveBuffs.find(
          (b) =>
            (b.target === 'ALL_SESSIONS_TODAY' ||
              (b.target === 'NEXT_SESSION' && !b.isTriggered)) &&
            b.effect === 'ZERO_ENERGY_COST' &&
            conditionMet[b.condition]
        );
        if (
          zeroEnergyBuff ||
          ('rarity' in chosenRoom && chosenRoom.rarity === 'Mystic')
        ) {
          finalEnergyChange = 0;
        }

        updatedTalent.kesehatan = Math.max(
          0,
          updatedTalent.kesehatan + talentImpact.kesehatanChange
        );
        updatedTalent.mental = Math.max(
          0,
          updatedTalent.mental + talentImpact.mentalChange
        );
        updatedTalent.currentEnergy = Math.max(
          0,
          updatedTalent.currentEnergy - finalEnergyChange
        );
        
        if(!updatedTalent.isOnContraceptives){
             updatedTalent.potensiHamil = Math.min(
                100,
                updatedTalent.potensiHamil + talentImpact.pregnancyRiskIncrease
            );
        }

        updatedTalent.potensiHIVAIDS = Math.min(
          100,
          updatedTalent.potensiHIVAIDS + talentImpact.hivRiskIncrease
        );

        updatedTalent.experience += xpGained;
        updatedTalent.yearlyExperience += xpGained;
        updatedTalent.sessionsServed += 1;

        let levelUp = false,
          ageUp = false;
        while (
          updatedTalent.experience >= updatedTalent.experienceToNextLevel
        ) {
          levelUp = true;
          updatedTalent.experience -= updatedTalent.experienceToNextLevel;
          updatedTalent.level += 1;
          updatedTalent.experienceToNextLevel = calculateExpToNextLevel(
            updatedTalent.level
          );
          updatedTalent.mental = Math.min(100, updatedTalent.mental + 1);
          updatedTalent.popularitas = Math.min(
            100,
            updatedTalent.popularitas + 1
          );

          if (SKILL_UNLOCK_LEVELS.includes(updatedTalent.level)) {
            const maxSkills = MAX_SKILLS_BY_RARITY[updatedTalent.rarity];
            if (updatedTalent.skills.length < maxSkills) {
              const currentSkillIds = updatedTalent.skills.map((s) => s.id);
              const availableNewSkills = AVAILABLE_SKILLS.filter(
                (s) => !currentSkillIds.includes(s.id)
              );
              if (availableNewSkills.length > 0) {
                const skillToUnlock =
                  availableNewSkills[
                    Math.floor(Math.random() * availableNewSkills.length)
                  ];
                updatedTalent.skills.push(skillToUnlock);
                newSkillUnlocked = skillToUnlock;
              }
            }
          }
        }
        if (
          updatedTalent.yearlyExperience >= updatedTalent.yearlyExperienceToNextAge
        ) {
          ageUp = true;
          updatedTalent.age += 1;
          updatedTalent.yearlyExperience -=
            updatedTalent.yearlyExperienceToNextAge;
        }

        const newDayaPikat = calculateDayaPikat(updatedTalent);
        updatedTalent.dayaPikat = newDayaPikat;
        updatedTalent.tariffs = calculateTariffs(
          newDayaPikat,
          updatedTalent.kesehatan,
          updatedTalent.potensiHamil,
          updatedTalent.rarity
        );

        const updatedTalents = allTalents.map((t) =>
          t.id === updatedTalent.id ? updatedTalent : t
        );
        let newReputation = Math.max(
          0,
          currentGameState.reputation + reputationChange
        );
        let newLevel = currentGameState.level,
          newReputationToNextLevel = currentGameState.reputationToNextLevel,
          playerLevelUp = false;

        if (
          newLevel < PLAYER_MAX_LEVEL &&
          newReputation >= newReputationToNextLevel
        ) {
          playerLevelUp = true;
          newLevel += 1;
          newReputationToNextLevel = calculateReputationToNextLevel(newLevel);
        }

        fullMatchResult.levelUp = levelUp;
        fullMatchResult.ageUp = ageUp;
        fullMatchResult.playerLevelUp = playerLevelUp;
        fullMatchResult.playerLevelUpTo = playerLevelUp ? newLevel : undefined;
        fullMatchResult.talentImpact.energyChange = finalEnergyChange;
        fullMatchResult.newSkillUnlocked = newSkillUnlocked;
        fullMatchResult.talentInfected = updatedTalent.potensiHIVAIDS >= HIV_INFECTION_THRESHOLD;


        const conditionDecay =
          CONDITION_DECAY_PER_SESSION *
          (1 - (chosenRoom.upgrades.conditionDecayReduction || 0));
        const updatedRooms = currentGameState.rooms.map((r) =>
          r.id === chosenRoom.id
            ? {
                ...r,
                status: 'occupied' as const,
                condition: Math.max(
                  0,
                  r.condition - Math.round(conditionDecay)
                ),
                lastSessionInfo: {
                  talentRarity: selectedTalent.rarity,
                  guestTier: currentGuest.tier,
                },
              }
            : r
        );

        const finalActiveBuffs = tempActiveBuffs.map((b) =>
          b.target === 'NEXT_SESSION' && !b.isTriggered
            ? { ...b, isTriggered: true }
            : b
        );
        
        const newGameState: GameState = {
          ...currentGameState,
          reputation: newReputation,
          level: newLevel,
          reputationToNextLevel: newReputationToNextLevel,
          rooms: updatedRooms,
          activeBuffs: finalActiveBuffs,
          unpaidSessions: [...currentGameState.unpaidSessions, fullMatchResult],
          kecurigaanWarga: newSuspicion,
          laporanResmi: newLaporanResmi,
          penyelidikanPolisi: newPenyelidikanPolisi,
          raidPending: raidPending,
        };

        if (condomName) {
            const newConsumables = { ...newGameState.playerConsumables };
            const itemToUse = newConsumables[condomName];
            if (itemToUse) {
                if (itemToUse.quantity > 1) {
                    newConsumables[condomName] = { ...itemToUse, quantity: itemToUse.quantity - 1 };
                } else {
                    delete newConsumables[condomName];
                }
                newGameState.playerConsumables = newConsumables;
            }
        }


        const updatedGuests = guests.slice(1);

        set({
          gameState: newGameState,
          talents: updatedTalents,
          guests: updatedGuests,
          matchResult: fullMatchResult,
          isSessionProcessingComplete: true,
        });

        const { rooms: _rooms, ...gameStateToSave } = newGameState;
        await db.saveGameState(gameStateToSave);
        await db.saveTalents(updatedTalents);
        await db.saveGuests(updatedGuests);
        await db.saveRooms(newGameState.rooms);
      }, duration);
    } catch (e) {
      console.error('Error during match handling:', e);
      set({ isProcessing: false, sessionProgress: null });
    }
  },
  processPayment: async (sessionId, method) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { gameState, talents } = get();
      const sessionToPay = gameState.unpaidSessions.find(
        (s) => s.sessionId === sessionId
      );

      if (!sessionToPay) return;

      const agencyProfit = sessionToPay.labaBersih;
      let reputationBonus = 0;
      let newMoney = gameState.money;
      let newSavings = gameState.savings;

      if (method === 'QR') {
        const fee = Math.floor(agencyProfit * 0.01);
        const profitAfterFee = agencyProfit - fee;
        newSavings += profitAfterFee;
        reputationBonus = 1;
      } else {
        newMoney += agencyProfit;
      }

      const newReputation = gameState.reputation + reputationBonus;

      const updatedTalents = talents.map((t) => {
        if (t.id === sessionToPay.talentId) {
          return {
            ...t,
            earnings: t.earnings + sessionToPay.talentEarnings,
          };
        }
        return t;
      });
      const updatedUnpaidSessions = gameState.unpaidSessions.filter(
        (s) => s.sessionId !== sessionId
      );

      const newGameState = {
        ...gameState,
        money: newMoney,
        savings: newSavings,
        reputation: newReputation,
        unpaidSessions: updatedUnpaidSessions,
      };

      set({
        gameState: newGameState,
        talents: updatedTalents,
        viewingReceipt: null,
      });

      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveTalents(updatedTalents);
    } finally {
      set({ isProcessing: false });
    }
  },
  transferFunds: async (amount, direction) => {
    if (get().isProcessing || !amount || amount <= 0) return;
    set({ isProcessing: true });
    try {
      const { gameState } = get();
      const { netAmount } = calculateAtmTax(amount);

      let newGameState: GameState;

      if (direction === 'savingsToCash') {
        if (gameState.savings < amount) {
          set({ isProcessing: false });
          return;
        }
        newGameState = {
          ...gameState,
          savings: gameState.savings - amount,
          money: gameState.money + netAmount,
        };
      } else {
        if (gameState.money < amount) {
          set({ isProcessing: false });
          return;
        }
        newGameState = {
          ...gameState,
          money: gameState.money - amount,
          savings: gameState.savings + netAmount,
        };
      }

      set({ gameState: newGameState });
      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
    } finally {
      set({ isProcessing: false });
    }
  },
  handleOutcall: async (type) => {
    if (get().isProcessing) return;
    set({ isProcessing: true });
    try {
      const { viewingOutcallFor, guests, gameState, talents } = get();
      if (!viewingOutcallFor || guests.length === 0) {
        set({ isProcessing: false });
        return;
      }

      const currentGuest = guests[0];
      const { result, unavailableUntil } = calculateOutcallResult(viewingOutcallFor, currentGuest, type);
      
      const talentImpact = result.talentImpact!;

      const updatedTalent = { ...viewingOutcallFor };
      updatedTalent.kesehatan = Math.max(0, updatedTalent.kesehatan + talentImpact.kesehatanChange);
      updatedTalent.mental = Math.max(0, updatedTalent.mental + talentImpact.mentalChange);
      updatedTalent.currentEnergy = Math.max(0, updatedTalent.currentEnergy - talentImpact.energyChange);
      updatedTalent.potensiHIVAIDS = Math.min(100, updatedTalent.potensiHIVAIDS + talentImpact.hivRiskIncrease);
      updatedTalent.potensiHamil = Math.min(100, updatedTalent.potensiHamil + talentImpact.pregnancyRiskIncrease);
      updatedTalent.experience += result.xpGained || 0;
      updatedTalent.sessionsServed += 1;
      updatedTalent.unavailableUntil = unavailableUntil;
      updatedTalent.unavailabilityReason = 'Tugas Luar';
      
      const newDayaPikat = calculateDayaPikat(updatedTalent);
      updatedTalent.dayaPikat = newDayaPikat;
      updatedTalent.tariffs = calculateTariffs(newDayaPikat, updatedTalent.kesehatan, updatedTalent.potensiHamil, updatedTalent.rarity);
      
      const updatedTalents = talents.map(t => t.id === updatedTalent.id ? updatedTalent : t);
      const updatedGuests = guests.slice(1);

      const fullMatchResult: MatchResult = {
        ...result,
        sessionId: `outcall-${Date.now()}`,
        usedRoomId: '', // No room used for outcall
        roomBonuses: [],
      };

      const newGameState = {
        ...gameState,
        reputation: gameState.reputation + result.reputationChange,
        unpaidSessions: [...gameState.unpaidSessions, fullMatchResult],
      };
      
      set({
        gameState: newGameState,
        talents: updatedTalents,
        guests: updatedGuests,
        viewingOutcallFor: null,
        viewingTalent: null,
      });

      const { rooms: _rooms, ...gameStateToSave } = newGameState;
      await db.saveGameState(gameStateToSave);
      await db.saveTalents(updatedTalents);
      await db.saveGuests(updatedGuests);

    } finally {
      set({ isProcessing: false });
    }
  },
});
