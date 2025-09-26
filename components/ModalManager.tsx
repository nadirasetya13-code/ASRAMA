import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';

// Import all modal components
import GuestProfile from './GuestProfile';
import ReceiptModal from './ReceiptModal';
import SessionProcessingModal from './SessionProcessingModal';
import GachaResultModal from './GachaResultModal';
import EquipPhoneModal from './EquipPhoneModal';
import LivestreamResultModal from './LivestreamResultModal';
import LivestreamMinigame from './LivestreamMinigame';
import LivestreamPackageModal from './LivestreamPackageModal';
import LivestreamTopicModal from './LivestreamTopicModal';
import MatchResultModal from './MatchResultModal';
import EndDayResultModal from './EndDayResultModal';
import ProductionSetupModal from './ProductionSetupModal';
import ProductionResultModal from './ProductionResultModal';
import EquipEquipmentModal from './EquipEquipmentModal';
import OutcallModal from './OutcallModal';
import RaidModal from './RaidModal';
import SatpolPpRaidModal from './SatpolPpRaidModal';
import PoliceRaidModal from './PoliceRaidModal';
import EquipmentGachaResultModal from './EquipmentGachaResultModal';

const ModalManager: React.FC = () => {
  // Select all state slices that trigger modals
  const {
    sessionProgress,
    activeLivestreamSession,
    gachaResult,
    equipmentGachaResult,
    livestreamResult,
    livestreamSetup,
    viewingPhoneInventoryFor,
    viewingEquipmentInventoryFor,
    productionSetup,
    productionResult,
    matchResult,
    endDayResult,
    viewingGuest,
    viewingReceipt,
    viewingOutcallFor,
    activeRaidEvent,
    activeSatpolPpEvent,
    activePoliceRaidEvent,
  } = useGameStore();

  let modalContent: React.ReactNode = null;

  // This `if-else if` chain establishes a strict priority system for modals.
  // The first condition that evaluates to true will be the only modal rendered,
  // preventing overlaps and ensuring critical modals always take precedence.
  // Priority Order: Critical Events > Fullscreen Minigames > Major Results > Setup/Interaction > Profiles.

  if (activePoliceRaidEvent) {
    modalContent = <PoliceRaidModal />;
  } else if (activeSatpolPpEvent) {
    modalContent = <SatpolPpRaidModal />;
  } else if (activeRaidEvent) {
    modalContent = <RaidModal />;
  } else if (sessionProgress) {
    modalContent = <SessionProcessingModal progress={sessionProgress} />;
  } else if (activeLivestreamSession) {
    modalContent = <LivestreamMinigame />;
  } else if (endDayResult) {
    modalContent = <EndDayResultModal result={endDayResult} />;
  } else if (matchResult) {
    modalContent = <MatchResultModal result={matchResult} />;
  } else if (gachaResult) {
    modalContent = <GachaResultModal />;
  } else if (equipmentGachaResult) {
    modalContent = <EquipmentGachaResultModal />;
  } else if (livestreamResult) {
    modalContent = <LivestreamResultModal />;
  } else if (productionResult) {
    modalContent = <ProductionResultModal />;
  } else if (livestreamSetup?.topicOptions) {
    modalContent = <LivestreamTopicModal />;
  } else if (livestreamSetup?.talentId) {
    modalContent = <LivestreamPackageModal />;
  } else if (productionSetup) {
    modalContent = <ProductionSetupModal />;
  } else if (viewingOutcallFor) {
    modalContent = <OutcallModal talent={viewingOutcallFor} />;
  } else if (viewingReceipt) {
    modalContent = <ReceiptModal session={viewingReceipt} />;
  } else if (viewingPhoneInventoryFor) {
    modalContent = <EquipPhoneModal />;
  } else if (viewingEquipmentInventoryFor) {
    modalContent = <EquipEquipmentModal />;
  } else if (viewingGuest) {
    modalContent = <GuestProfile guest={viewingGuest} />;
  }

  return <AnimatePresence>{modalContent}</AnimatePresence>;
};

export default ModalManager;
