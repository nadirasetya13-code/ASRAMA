import React from 'react';
import { motion } from 'framer-motion';
import { Guest } from '../types';
import GuestHeader from './guestProfile/GuestHeader';
import GuestInfoBlock from './guestProfile/GuestInfoBlock';
import GuestNarrativeBlock from './guestProfile/GuestNarrativeBlock';
import GuestWantsBlock from './guestProfile/GuestWantsBlock';
import GuestAttributeGroup from './guestProfile/GuestAttributeGroup';

interface GuestProfileProps {
  guest: Guest;
}

const GuestProfile: React.FC<GuestProfileProps> = ({ guest }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 z-40 overflow-y-auto bg-gradient-to-br from-dark-tertiary via-dark-secondary to-dark-primary"
    >
      <GuestHeader guest={guest} />

      {/* Main Content Area */}
      <div className="p-3 pb-12 text-light-text">
        <GuestInfoBlock guest={guest} />
        <GuestNarrativeBlock guest={guest} />
        <GuestWantsBlock guest={guest} />
        <GuestAttributeGroup title="Atribut Penis" stats={guest.penis} isPenis/>
        <GuestAttributeGroup title="Atribut Fisik" stats={guest.fisik} />
      </div>
    </motion.div>
  );
};

export default React.memo(GuestProfile);