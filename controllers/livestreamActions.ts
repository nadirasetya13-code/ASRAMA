import { StoreSlice, GameStoreActions } from './types';
import * as db from '../services/dbService';
import { ActiveLivestreamSession } from '../types';
import { LIVESTREAM_PACKAGES, LIVESTREAM_TOPICS } from '../constants';
import {
  calculateLivestreamCosts,
  calculateFinalLivestreamResult,
  generateLivestreamEvents,
  resolveLivestreamChoice,
  calculateDayaPikat,
  calculateTariffs,
  calculateExpToNextLevel,
} from '../services/localDataService';

type LivestreamActions = Pick<
  GameStoreActions,
  | 'prepareLivestream'
  | 'selectLivestreamPackage'
  | 'startLivestream'
  | 'handleLivestreamChoice'
  | 'endLivestream'
>;

export const createLivestreamActionsSlice: StoreSlice<LivestreamActions> = (
  set,
  get
) => ({
  prepareLivestream: (talentId) => {
    set({ livestreamSetup: { talentId } });
  },
  selectLivestreamPackage: (packageId) => {
    const { isProcessing, talents, gameState, livestreamSetup } = get();
    if (isProcessing || !livestreamSetup?.talentId) return;

    const talent = talents.find((t) => t.id === livestreamSetup.talentId);
    const pkg = LIVESTREAM_PACKAGES.find((p) => p.id === packageId);
    if (!talent || !talent.equipment.ponsel || !pkg || gameState.money < pkg.cost)
      return;

    const costs = calculateLivestreamCosts(talent, talent.equipment.ponsel);
    if (
      talent.currentEnergy < -costs.energyChange ||
      talent.mental < -costs.mentalChange
    )
      return;

    const topicKeys = Object.keys(LIVESTREAM_TOPICS);
    const shuffledTopics = topicKeys.sort(() => 0.5 - Math.random());
    const topicOptions = shuffledTopics.slice(0, 3);

    const newGameState = { ...gameState, money: gameState.money - pkg.cost };

    set({
      gameState: newGameState,
      livestreamSetup: {
        ...livestreamSetup,
        selectedPackage: { scenarios: pkg.scenarios, cost: pkg.cost },
        topicOptions,
      },
    });
  },
  startLivestream: (chosenTopic) => {
    const { isProcessing, talents, gameState, livestreamSetup } = get();
    if (
      isProcessing ||
      !livestreamSetup?.talentId ||
      !livestreamSetup.selectedPackage
    )
      return;

    const talent = talents.find((t) => t.id === livestreamSetup.talentId);
    if (!talent || !talent.equipment.ponsel) return;

    set({ isProcessing: true, viewingTalent: null });

    const { eventHistory, gameTime } = gameState;
    const topicTag = LIVESTREAM_TOPICS[chosenTopic]?.tag || '';
    const events = generateLivestreamEvents(
      eventHistory,
      gameTime.day,
      livestreamSetup.selectedPackage.scenarios,
      topicTag
    );

    const session: ActiveLivestreamSession & { topic: string } = {
      talentId: talent.id,
      phoneId: talent.equipment.ponsel.id,
      hype: 30,
      currentViewers: talent.popularitas * 10,
      peakViewers: talent.popularitas * 10,
      events,
      eventProgressIndex: 0,
      activeEventIndex: 0,
      topic: chosenTopic,
    };

    set({
      activeLivestreamSession: session,
      livestreamSetup: null,
    });
  },
  handleLivestreamChoice: (choiceIndex) => {
    const { activeLivestreamSession, talents } = get();
    if (!activeLivestreamSession || activeLivestreamSession.activeEventIndex < 0)
      return;

    const talent = talents.find((t) => t.id === activeLivestreamSession.talentId);
    const event =
      activeLivestreamSession.events[activeLivestreamSession.activeEventIndex];
    if (!talent || !event) return;

    const choice = event.choices[choiceIndex];
    if (!choice) return;

    if (
      choice.exclusiveToRarity &&
      !choice.exclusiveToRarity.includes(talent.rarity)
    ) {
      console.error('Talent does not meet rarity requirement for this choice.');
      return;
    }

    const result = resolveLivestreamChoice(
      talent,
      choice,
      activeLivestreamSession.topic
    );

    const newHype = Math.max(
      0,
      Math.min(100, activeLivestreamSession.hype + result.hypeChange)
    );
    const newViewers = Math.max(
      0,
      activeLivestreamSession.currentViewers + result.viewersChange
    );
    const newProgressIndex = activeLivestreamSession.eventProgressIndex + 1;
    const isLastEvent = newProgressIndex >= activeLivestreamSession.events.length;

    if (isLastEvent) {
      set({
        activeLivestreamSession: {
          ...activeLivestreamSession,
          hype: newHype,
          currentViewers: newViewers,
          peakViewers: Math.max(
            activeLivestreamSession.peakViewers,
            newViewers
          ),
          eventProgressIndex: newProgressIndex,
          activeEventIndex: -1,
        },
      });
      setTimeout(() => get().endLivestream(), 1500);
    } else {
      set({
        activeLivestreamSession: {
          ...activeLivestreamSession,
          hype: newHype,
          currentViewers: newViewers,
          peakViewers: Math.max(
            activeLivestreamSession.peakViewers,
            newViewers
          ),
          eventProgressIndex: newProgressIndex,
          activeEventIndex: newProgressIndex,
        },
      });
    }
  },
  endLivestream: async () => {
    const { activeLivestreamSession, talents, gameState } = get();
    if (!activeLivestreamSession) return;

    const talent = talents.find((t) => t.id === activeLivestreamSession.talentId);
    const phone = talent?.equipment.ponsel;
    if (!talent || !phone) {
      set({ activeLivestreamSession: null, isProcessing: false });
      return;
    }

    const costs = calculateLivestreamCosts(talent, phone);
    const results = calculateFinalLivestreamResult(
      activeLivestreamSession.hype,
      activeLivestreamSession.peakViewers,
      talent,
      phone,
      activeLivestreamSession.topic
    );

    const finalResult = {
      ...results,
      talentId: talent.id,
      ...costs,
      topic: activeLivestreamSession.topic,
      topicLabel:
        LIVESTREAM_TOPICS[activeLivestreamSession.topic]?.label || 'Sesi Acak',
    };

    const currentDay = gameState.gameTime.day;
    const usedEventIds = activeLivestreamSession.events.map((e) => e.id);
    const newEventHistory = { ...gameState.eventHistory };
    usedEventIds.forEach((id) => {
      newEventHistory[id] = currentDay;
    });

    const updatedTalents = talents.map((t) => {
      if (t.id === talent.id) {
        const updatedTalent = {
          ...t,
          currentEnergy: Math.max(0, t.currentEnergy + finalResult.energyChange),
          mental: Math.max(0, t.mental + finalResult.mentalChange),
          popularitas: Math.min(100, t.popularitas + finalResult.popularityGain),
          followers: (t.followers || 0) + finalResult.popularityGain,
        };

        // --- Apply XP and Level Up ---
        if (updatedTalent.level < 100) {
          let xpToAdd = finalResult.xpGained;
          if (updatedTalent.hasMastery) {
            xpToAdd = Math.floor(xpToAdd * 1.2);
          }
          updatedTalent.experience += xpToAdd;

          while (
            updatedTalent.experience >= updatedTalent.experienceToNextLevel &&
            updatedTalent.level < 100
          ) {
            updatedTalent.experience -= updatedTalent.experienceToNextLevel;
            updatedTalent.level += 1;
            updatedTalent.experienceToNextLevel = calculateExpToNextLevel(
              updatedTalent.level
            );
            // Milestone checks
            if (updatedTalent.level === 20) {
              updatedTalent.stamina = Math.round(updatedTalent.stamina * 1.05);
              updatedTalent.kecantikan = Math.round(updatedTalent.kecantikan * 1.05);
              updatedTalent.popularitas = Math.round(updatedTalent.popularitas * 1.05);
              updatedTalent.mental = Math.round(updatedTalent.mental * 1.05);
            }
            if (updatedTalent.level === 50) {
              updatedTalent.hasMastery = true;
            }
          }
        }
        
        const newDayaPikat = calculateDayaPikat(updatedTalent);
        updatedTalent.dayaPikat = newDayaPikat;
        updatedTalent.tariffs = calculateTariffs(
          newDayaPikat,
          updatedTalent.potensiHIVAIDS,
          updatedTalent.potensiHamil,
          updatedTalent.rarity
        );
        return updatedTalent;
      }
      return t;
    });

    const newGameState = {
      ...gameState,
      money: gameState.money + finalResult.earnings,
      eventHistory: newEventHistory,
    };

    set({
      gameState: newGameState,
      talents: updatedTalents,
      livestreamResult: finalResult,
      activeLivestreamSession: null,
      isProcessing: false,
    });

    await db.saveTalents(updatedTalents);
    const { rooms: _rooms, ...gameStateToSave } = newGameState;
    await db.saveGameState(gameStateToSave);
  },
});