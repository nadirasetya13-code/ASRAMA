import React from 'react';
import { Talent, ItemType, EquipmentItem, PhoneItem } from '../../types';
import {
  PhoneIcon,
  CameraIcon,
  HandycamIcon,
  LaptopIcon,
  MakeupIcon,
  LingerieIcon,
  ShoesIcon,
  BraIcon,
  PantiesIcon,
  PotionIcon,
  ParfumIcon,
  StockingIcon,
} from '../icons';
import { useGameStore } from '../../controllers/gameController';
import { RARITY_CONFIG } from '../../constants';

interface TalentEquipmentProps {
  talent: Talent;
}

const slotConfig: Record<
  ItemType,
  { label: string; icon: React.FC<{ className?: string }>; isInteractive: boolean }
> = {
  ponsel: { label: 'Ponsel', icon: PhoneIcon, isInteractive: true },
  kameraDsr: { label: 'Kamera DSR', icon: CameraIcon, isInteractive: true },
  handycam: { label: 'Handycam', icon: HandycamIcon, isInteractive: true },
  laptop: { label: 'Laptop', icon: LaptopIcon, isInteractive: true },
  makeup: { label: 'Makeup', icon: MakeupIcon, isInteractive: false },
  lingerie: { label: 'Lingerie', icon: LingerieIcon, isInteractive: false },
  sepatu: { label: 'High Heels', icon: ShoesIcon, isInteractive: false },
  bra: { label: 'Bra', icon: BraIcon, isInteractive: false },
  celanaDalam: {
    label: 'Celana Dalam',
    icon: PantiesIcon,
    isInteractive: false,
  },
  obatBirahi: {
    label: 'Obat Birahi',
    icon: PotionIcon,
    isInteractive: false,
  },
  parfum: { label: 'Parfum', icon: ParfumIcon, isInteractive: false },
  stocking: { label: 'Stocking', icon: StockingIcon, isInteractive: false },
  kondom: { label: 'Kondom', icon: () => <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl">🛡️</div>, isInteractive: false },
};

const allSlots: ItemType[] = [
  'makeup',
  'lingerie',
  'sepatu',
  'bra',
  'celanaDalam',
  'obatBirahi',
  'parfum',
  'stocking',
  'ponsel',
  'kameraDsr',
  'handycam',
  'laptop',
];

const TalentEquipment: React.FC<TalentEquipmentProps> = ({ talent }) => {
  const { openPhoneInventory, openEquipmentInventory } =
    useGameStore.getState();
  const { equipment } = talent;

  const handleSlotClick = (slotType: ItemType) => {
    if (slotType === 'ponsel') {
      openPhoneInventory(talent);
    } else if (['kameraDsr', 'handycam', 'laptop'].includes(slotType)) {
      openEquipmentInventory(talent, slotType);
    }
  };

  const renderSlot = (slotType: ItemType) => {
    const item = equipment[slotType as keyof typeof equipment];
    const config = slotConfig[slotType];
    if (!config) return null;

    const Icon = config.icon;
    const rarityConfig = item && 'rarity' in item ? RARITY_CONFIG[item.rarity] : null;

    const baseClasses = 'relative flex flex-col items-center justify-center rounded-lg aspect-[5/7] overflow-hidden';
    
    const containerClasses = item
      ? `${baseClasses} ${rarityConfig ? rarityConfig.glowAnimation : ''}`
      : `${baseClasses} bg-black/20 border-2 border-dashed border-white/20 p-0.5`;

    const content = item ? (
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <>
        <Icon className="w-7/12 h-7/12 text-gray-500 opacity-50" />
        <span className="mt-1 text-[9px] font-bold leading-tight text-center text-gray-400">
          {config.label}
        </span>
      </>
    );

    if (config.isInteractive) {
      return (
        <button
          type="button"
          key={slotType}
          onClick={() => handleSlotClick(slotType)}
          className={`${containerClasses} transition-all cursor-pointer hover:scale-105`}
          title={item ? item.name : `Pilih ${config.label}`}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        key={slotType}
        className={containerClasses}
        title={item ? item.name : config.label}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="p-1.5 my-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 mb-1.5 text-xs font-serif font-bold text-center border-b-2 border-brand-gold/50">
        Perlengkapan & Equipment
      </h3>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {allSlots.map(renderSlot)}
      </div>
    </div>
  );
};

export default TalentEquipment;