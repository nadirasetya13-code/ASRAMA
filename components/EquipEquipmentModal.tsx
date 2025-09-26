import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { CameraIcon } from './icons';
import { ItemType } from '../types';

const EquipEquipmentModal: React.FC = () => {
  const { closeEquipmentInventory, equipProductionItem } =
    useGameStore.getState();
  const viewingInventoryFor = useGameStore(
    (state) => state.viewingEquipmentInventoryFor
  );
  // Renamed for clarity as this inventory holds production items and phones
  const playerProductionItems = useGameStore(
    (state) => state.gameState.playerPhones
  );

  if (!viewingInventoryFor) return null;

  const { talent, slotType } = viewingInventoryFor;

  const availableItems = playerProductionItems.filter(
    (p) => p.type === slotType && !p.equippedTo
  );

  // Accessing the currently equipped item for the specific slot
  const currentItem =
    talent.equipment[slotType as keyof typeof talent.equipment];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeEquipmentInventory}
      role="dialog"
      aria-modal="true"
      aria-labelledby="equip-modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md p-3 text-gray-200 bg-dark-secondary rounded-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="equip-modal-title"
          className="text-lg font-serif font-bold text-center text-light-text capitalize"
        >
          Pilih {slotType.replace('Dsr', ' DSR')} untuk {talent.name}
        </h2>

        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {/* Currently Equipped Item */}
          {currentItem && (
            <div className="grid grid-cols-3 gap-2 p-2 text-left bg-green-900/30 rounded-lg">
              <div className="col-span-2">
                <p className="font-bold text-light-text">{currentItem.name}</p>
                {'brand' in currentItem && currentItem.brand ? (
                  <p className="text-xs text-subtle-text">
                    {currentItem.brand}
                  </p>
                ) : (
                  <p className="text-xs text-subtle-text capitalize">
                    Tipe: {currentItem.type.replace('Dsr', ' DSR')}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 text-xs font-bold text-white bg-gray-600 rounded-full">
                  Terpasang
                </div>
              </div>
            </div>
          )}

          {/* Available Items (only shows if slot is empty) */}
          {!currentItem && availableItems.length > 0 && (
            <div className="space-y-1">
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 gap-2 p-2 text-left bg-black/30 rounded-lg"
                >
                  <div className="col-span-2">
                    <p className="font-bold text-light-text">{item.name}</p>
                    {'brand' in item && item.brand ? (
                      <p className="text-xs text-subtle-text">
                        {item.brand}
                      </p>
                    ) : (
                      <p className="text-xs text-subtle-text capitalize">
                        Tipe: {item.type.replace('Dsr', ' DSR')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        equipProductionItem(item.id, talent.id, slotType)
                      }
                      className="px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
                      aria-label={`Pasang ${item.name} (${item.type}) ke slot ${slotType} untuk ${talent.name}`}
                    >
                      Pasang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback if no items are available and the slot is empty */}
          {availableItems.length === 0 && !currentItem && (
            <div className="py-8 text-center text-subtle-text">
              <CameraIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="capitalize">
                Tidak ada {slotType.replace('Dsr', ' DSR')} yang tersedia.
              </p>
              <p className="text-[10px]">
                Beli item baru di Toko untuk slot ini.
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={closeEquipmentInventory}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gray-700 rounded-full shadow-lg"
          aria-label={`Tutup modal pemilihan equipment untuk ${talent.name}`}
        >
          Tutup
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EquipEquipmentModal;
