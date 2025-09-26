import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { MoneyIcon, PhoneIcon } from './icons';
import { MAX_PHONE_LEVEL, PHONE_UPGRADE_COST_BASE, PHONE_UPGRADE_COST_MULTIPLIER } from '../constants';
import { formatRupiah } from '../services/localDataService';

const EquipPhoneModal: React.FC = () => {
    const { closePhoneInventory, equipPhone, upgradePhone } = useGameStore.getState();
    const viewingPhoneInventoryFor = useGameStore(state => state.viewingPhoneInventoryFor);
    const playerPhones = useGameStore(state => state.gameState.playerPhones);
    const money = useGameStore(state => state.gameState.money);
    const isProcessing = useGameStore(state => state.isProcessing);

    if (!viewingPhoneInventoryFor) return null;

    const unequippedPhones = playerPhones.filter(p => !p.equippedTo);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closePhoneInventory}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-md p-3 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-serif font-bold text-center text-light-text">
                    Ponsel untuk {viewingPhoneInventoryFor.name}
                </h2>

                <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                    {playerPhones.map(phone => {
                        const upgradeCost = Math.floor(PHONE_UPGRADE_COST_BASE * Math.pow(PHONE_UPGRADE_COST_MULTIPLIER, phone.level - 1));
                        const canAffordUpgrade = money >= upgradeCost;
                        const isMaxLevel = phone.level >= MAX_PHONE_LEVEL;
                        const isEquipped = !!phone.equippedTo;
                        const isEquippedByCurrent = phone.equippedTo === viewingPhoneInventoryFor.id;

                        return (
                            <div key={phone.id} className="grid grid-cols-3 gap-2 p-2 text-left transition-colors bg-black/30 rounded-lg">
                                <div className="col-span-1">
                                    <p className="font-bold text-light-text">{phone.name}</p>
                                    <p className="text-xs text-subtle-text">{phone.brand}</p>
                                    <p className={`text-xs font-bold ${isMaxLevel ? 'text-amber-400' : 'text-light-text'}`}>
                                        Level: {phone.level} {isMaxLevel && '(MAX)'}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center col-span-1">
                                    {isEquipped ? (
                                        <div className={`px-2 py-1 text-xs font-bold rounded-full ${isEquippedByCurrent ? 'bg-green-600' : 'bg-gray-600'}`}>
                                            {isEquippedByCurrent ? 'Terpasang' : 'Dipakai'}
                                        </div>
                                    ) : (
                                        <button onClick={() => equipPhone(phone.id, viewingPhoneInventoryFor.id)} disabled={isProcessing} className="w-full px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-500">
                                            Pasang
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col items-center justify-center col-span-1">
                                    {isMaxLevel ? (
                                         <div className="px-2 py-1 text-xs font-bold text-black bg-amber-400 rounded-full">
                                            MAX
                                        </div>
                                    ) : (
                                        <button onClick={() => upgradePhone(phone.id)} disabled={isProcessing || !canAffordUpgrade} className="w-full flex flex-col items-center px-2 py-1 text-xs font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 h-full justify-center">
                                            Upgrade
                                            <span className="flex items-center gap-1 text-[10px] opacity-80">
                                                <MoneyIcon className="h-3"/> {formatRupiah(upgradeCost)}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {playerPhones.length === 0 && (
                        <div className="py-8 text-center text-subtle-text">
                            <PhoneIcon className="w-8 h-8 mx-auto mb-2" />
                            <p>Tidak ada ponsel.</p>
                            <p>Beli ponsel baru di Toko.</p>
                        </div>
                    )}
                </div>

                 <button
                    type="button"
                    onClick={closePhoneInventory}
                    className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
                >
                    Tutup
                </button>
            </motion.div>
        </motion.div>
    );
};

export default EquipPhoneModal;