import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';
import { ShopIcon, RekrutIcon, JenjangIcon, SettingsIcon } from './icons';

const sideNavItems: {
  view: View;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { view: View.TOKO, label: 'Toko', icon: ShopIcon },
  { view: View.REKRUT, label: 'Panggil', icon: RekrutIcon },
  { view: View.JENJANG, label: 'Jenjang', icon: JenjangIcon },
  { view: View.PENGATURAN, label: 'Atur', icon: SettingsIcon },
];

const SideNavItem: React.FC<{ item: typeof sideNavItems[0] }> = ({
  item,
}) => {
  const { setActiveView } = useGameStore.getState();
  return (
    <motion.button
      type="button"
      onClick={() => setActiveView(item.view)}
      className="flex flex-col items-center gap-1 transition-all duration-300 text-light-text hover:text-brand-pink"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={item.label}
    >
      <motion.div
        animate={item.view === View.TOKO ? { scale: [1, 1.15, 1] } : {}}
        transition={
          item.view === View.TOKO
            ? { duration: 2.0, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      >
        <item.icon className="w-[50px] h-[50px]" />
      </motion.div>
      <span className="text-xs font-bold">{item.label}</span>
    </motion.button>
  );
};

const SideMenu: React.FC = () => {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed right-0 z-20 flex flex-col gap-8 p-2 top-16"
      aria-label="Navigasi Samping"
    >
      {sideNavItems.map((item) => (
        <SideNavItem key={item.view} item={item} />
      ))}
    </motion.div>
  );
};

export default SideMenu;