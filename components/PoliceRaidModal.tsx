import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { PoliceIcon } from './icons';
import { 
    RARITY_CONFIG,
    POLICE_CRIMINAL_RECORD_COST_INCREASE,
    POLICE_CRIMINAL_RECORD_REP_DECREASE 
} from '../constants';

const PoliceRaidModal: React.FC = () => {
  const { resolvePoliceRaid } = useGameStore.getState();
  const event = useGameStore((state) => state.activePoliceRaidEvent);

  if (!event) return null;

  const costIncreasePercent = (POLICE_CRIMINAL_RECORD_COST_INCREASE - 1) * 100;
  const repDecreasePercent = (1 - POLICE_CRIMINAL_RECORD_REP_DECREASE) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <div className="absolute inset-0 z-0 w-full h-full bg-red-800/50 animate-pulse [animation-duration:0.5s]"></div>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-md p-4 text-gray-200 bg-dark-primary rounded-lg shadow-2xl border-2 border-red-500"
      >
        <div className="text-center">
          <PoliceIcon className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="mt-2 text-2xl font-serif font-bold text-red-400">
            PENGGEREBEKAN POLISI!
          </h2>
          <p className="mt-2 text-base text-gray-300">
            Investigasi telah selesai. Asrama Birahi dinyatakan sebagai sarang kegiatan ilegal. Operasi Anda telah berakhir.
          </p>
        </div>
        <div className="p-3 mt-4 text-sm text-left text-red-200 bg-red-900/50 rounded-lg space-y-2">
            <h3 className='font-bold text-center text-red-100'>KONSEKUENSI BENCANA:</h3>
            <div>
                <p className='font-bold'>- Aset Disita:</p>
                <ul className='list-disc list-inside pl-4 text-xs'>
                    <li>Uang Kas: {formatRupiah(event.seizedMoney)}</li>
                    <li>Tabungan: {formatRupiah(event.seizedSavings)}</li>
                </ul>
            </div>
             <div>
                <p className='font-bold'>- Talenta Ditangkap:</p>
                <div className='pl-4 text-xs'>
                    {event.arrestedTalents.map(t => (
                        <p key={t.name}>
                            <span className={`font-semibold ${RARITY_CONFIG[t.rarity as keyof typeof RARITY_CONFIG].color}`}>{t.name}</span> (Dihapus Permanen)
                        </p>
                    ))}
                </div>
            </div>
             <div>
                <p className='font-bold'>- Catatan Kriminal Permanen:</p>
                <ul className='list-disc list-inside pl-4 text-xs'>
                    <li>Biaya operasional naik permanen sebesar {costIncreasePercent}%.</li>
                    <li>Perolehan reputasi berkurang permanen sebesar {repDecreasePercent}%.</li>
                </ul>
            </div>
        </div>
        <button
          onClick={resolvePoliceRaid}
          className="w-full py-2.5 mt-4 font-bold text-white transition-colors rounded-lg bg-red-800 hover:bg-red-900"
        >
          Terima Nasib...
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PoliceRaidModal;