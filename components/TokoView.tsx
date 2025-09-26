import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { PHONE_CATALOG, KONDOM_CATALOG } from '../constants';
import { formatRupiah } from '../services/localDataService';
import { MoneyIcon, PhoneIcon, CameraIcon, ConsumableIcon } from './icons';
import { PhoneItem, ConsumableItem } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type ShopItem = (Omit<PhoneItem, 'id' | 'level' | 'equippedTo'>) | ConsumableItem;

const ItemCard: React.FC<{ item: ShopItem }> = ({ item }) => {
    const { buyPhone, buyConsumable } = useGameStore.getState();
    const money = useGameStore(state => state.gameState.money);
    const isProcessing = useGameStore(state => state.isProcessing);
    const canAfford = money >= item.basePrice;
    
    const isConsumable = item.category === 'Konsumsi';

    const handleBuy = () => {
        if (isConsumable) {
            buyConsumable(item as ConsumableItem);
        } else {
            buyPhone(item as Omit<PhoneItem, 'id' | 'level' | 'equippedTo'>);
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col overflow-hidden rounded-xl shadow-lg bg-dark-tertiary/60 border border-white/10"
        >
            <div className="p-3">
                <h4 className="font-bold font-serif text-light-text">{item.name}</h4>
                 <p className="text-xs font-semibold text-brand-purple">
                    {isConsumable ? `Proteksi: ${(item.protectionLevel * 100).toFixed(1)}%` : item.brand}
                </p>
                <p className="mt-2 text-xs text-subtle-text h-16">{item.description}</p>
            </div>
            <div className="p-3 mt-auto bg-black/30">
                <button
                    type="button"
                    onClick={handleBuy}
                    disabled={!canAfford || isProcessing}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 ${
                        canAfford
                        ? 'bg-gradient-to-r from-green-500 to-blue-500'
                        : 'bg-gray-400'
                    }`}
                >
                    Beli
                    <div className="flex items-center gap-1 px-2 py-0.5 ml-2 text-xs rounded-full bg-black/20">
                        <MoneyIcon className="h-4" />
                        <span>{formatRupiah(item.basePrice)}</span>
                    </div>
                </button>
            </div>
        </motion.div>
    );
};


const TokoView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Ponsel' | 'Produksi' | 'Konsumsi'>('Ponsel');
    
    const phones = PHONE_CATALOG.filter(item => item.category === 'Ponsel');
    const productionItems = PHONE_CATALOG.filter(item => item.category === 'Produksi');
    const consumableItems = KONDOM_CATALOG;

    const itemsToShow = (() => {
        switch(activeTab) {
            case 'Ponsel': return phones;
            case 'Produksi': return productionItems;
            case 'Konsumsi': return consumableItems;
            default: return [];
        }
    })();

    return (
        <div className="p-1 md:p-2">
            <h2 className="mb-3 text-xl font-serif text-center text-light-text">
                Toko Agensi
            </h2>

            <div className="p-3 mb-4 rounded-xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10">
                {/* Tabs */}
                <div className="flex justify-center mb-4 border-b border-white/10">
                    <button onClick={() => setActiveTab('Ponsel')} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors ${activeTab === 'Ponsel' ? 'text-white border-b-2 border-brand-pink' : 'text-subtle-text'}`}>
                        <PhoneIcon className="w-5 h-5" /> Ponsel
                    </button>
                    <button onClick={() => setActiveTab('Produksi')} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors ${activeTab === 'Produksi' ? 'text-white border-b-2 border-brand-pink' : 'text-subtle-text'}`}>
                        <CameraIcon className="w-5 h-5" /> Produksi
                    </button>
                    <button onClick={() => setActiveTab('Konsumsi')} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors ${activeTab === 'Konsumsi' ? 'text-white border-b-2 border-brand-pink' : 'text-subtle-text'}`}>
                        <ConsumableIcon className="w-5 h-5" /> Konsumsi
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {itemsToShow.map((item, index) => (
                           <ItemCard key={`${item.name}-${index}`} item={item} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TokoView;