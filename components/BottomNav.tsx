import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  MainMenuIcon,
  LobyIcon,
  TalentIcon,
  RoomIcon,
  CashierIcon,
  ClinicIcon,
} from './icons';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';

const navItems: {
  view: View;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { view: View.MAIN_MENU, label: 'Main', icon: MainMenuIcon },
  { view: View.LOBY, label: 'Lobi', icon: LobyIcon },
  { view: View.TALENTA, label: 'Talenta', icon: TalentIcon },
  { view: View.KAMAR, label: 'Kamar', icon: RoomIcon },
  { view: View.KASIR, label: 'Kasir', icon: CashierIcon },
  { view: View.KLINIK, label: 'Klinik', icon: ClinicIcon },
];

const iconVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  hover: {
    y: -4,
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const NavItem = React.memo(
  ({ view, label, icon: Icon }: (typeof navItems)[0]) => {
    const { setActiveView } = useGameStore.getState();
    const isActive = useGameStore((state) => state.activeView === view);
    const showBadge = useGameStore((state) => {
      switch (view) {
        case View.KASIR:
          return state.gameState.unpaidSessions.length > 0;
        case View.KAMAR:
          return state.gameState.rooms.some((r) => r.status === 'needs_cleaning');
        default:
          return false;
      }
    });

    return (
      <div
        className="relative flex items-center justify-center flex-shrink-0 w-[16.66%] h-full"
        aria-current={isActive ? 'page' : undefined}
        aria-label={`${label}${showBadge ? ' (ada notifikasi)' : ''}`}
      >
        {showBadge && (
          <motion.div
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-label="Notifikasi baru"
          />
        )}
        <motion.button
          type="button"
          onClick={() => setActiveView(view)}
          className="relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-300 cursor-pointer"
          animate={{ color: isActive ? '#FFFFFF' : '#9ca3af' }}
          whileTap={{ scale: 0.95 }}
          initial="rest"
          whileHover="hover"
        >
          <motion.div variants={iconVariants}>
            <Icon className="w-[34px] h-[34px]" />
          </motion.div>
          <span className="mt-0.5 text-[8px] font-bold">{label}</span>
        </motion.button>

        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-pink-500/40"
            style={{ borderRadius: 9999 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </div>
    );
  }
);
NavItem.displayName = 'NavItem';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-dark-secondary/80 backdrop-blur-lg shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.2)] border-t border-white/10">
      <div className="container flex items-center justify-around h-14 mx-auto">
        {navItems.map((item) => (
          <NavItem key={item.view} {...item} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;