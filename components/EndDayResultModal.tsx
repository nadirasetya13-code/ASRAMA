import React from 'react';
import { motion } from 'framer-motion';
import { EndDayResult } from '../types';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { HealthIcon, ReputationIcon } from './icons';

interface EndDayResultModalProps {
  result: EndDayResult;
}

const EndDayResultModal: React.FC<EndDayResultModalProps> = ({ result }) => {
  const { closeEndDayResult } = useGameStore.getState();

  // PERBAIKAN: Dokumentasi jelas untuk menghindari kebingungan double-counting.
  // Dari CHANGELOG v3.0.0 & v4.0.0: netMoneyChange adalah net laba dari sesi malam
  // (setelah dikurangi biaya operasional/perawatan kamar), sedangkan passiveIncome
  // adalah tambahan terpisah dari penjualan konten pasif (tidak termasuk di netMoneyChange).
  // Total = passive + net (benar, tidak double-count).
  const totalChange = result.passiveIncome + result.netMoneyChange;
  const isPositiveTotal = totalChange >= 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="endDayTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="p-3 rounded-xl shadow-lg bg-dark-secondary/90 backdrop-blur-lg w-72 border border-white/10 max-h-[90vh] overflow-y-auto">
        <h2
          id="endDayTitle"
          className="text-lg font-serif font-bold text-light-text"
        >
          Laporan Akhir Malam
        </h2>
        <div className="w-full mx-auto mt-2 space-y-1 text-xs text-left font-sans">
          {result.passiveIncome > 0 && (
            <div className="flex items-center justify-between text-green-400">
              {/* PERBAIKAN: Label lebih jelas untuk membedakan dari net sesi. */}
              <span>Passive Income (Konten):</span>
              <span className="font-bold">
                {formatRupiah(result.passiveIncome)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-red-400">
            <span>Biaya Operasional:</span>
            <span className="font-bold">
              {formatRupiah(result.operationalCost)}
            </span>
          </div>
          <div className="flex items-center justify-between text-red-400">
            <span>Biaya Perawatan Kamar:</span>
            <span className="font-bold">
              {formatRupiah(result.roomMaintenanceCost)}
            </span>
          </div>
          {result.unservedGuests > 0 && (
            <div className="flex items-center justify-between text-red-400">
              <span>Tamu Kecewa ({result.unservedGuests} orang):</span>
              <div className="flex items-center gap-1 font-bold">
                <span>{result.reputationPenalty}</span>
                <ReputationIcon className="w-3 h-3" />
              </div>
            </div>
          )}
          <hr className="my-1 border-gray-600" />
          {/* PERBAIKAN: Label total lebih transparan, sebut "Sesi + Pasif" untuk clarity.
           * Warna berdasarkan total final (sudah ada, tapi reinforce className). */}
          <div
            className={`flex items-center justify-between text-base font-bold ${
              isPositiveTotal ? 'text-green-300' : 'text-red-300'
            }`}
            aria-label={`Total perubahan kas: ${formatRupiah(
              totalChange
            )} (net sesi + passive income)`}
          >
            <span>Total Perubahan Kas (Sesi + Pasif):</span>
            <span>{formatRupiah(totalChange)}</span>
          </div>
        </div>
        {result.talentRecoveryInfo.length > 0 && (
          <div className="p-2 mt-3 text-[11px] text-left rounded-lg shadow-inner bg-green-900/30">
            <h4 className="flex items-center justify-center gap-2 pb-1 mb-1 text-xs font-bold text-center border-b text-green-300 border-green-700/50">
              <HealthIcon className="w-4 h-4" /> Pemulihan Talenta
            </h4>
            {result.talentRecoveryInfo.map((info, index) => (
              <div
                key={index}
                className="flex justify-between font-medium text-green-300"
              >
                <span>{info.talentName}</span>
                <span className="font-bold">
                  +{info.healthRecovered} Kesehatan
                </span>
              </div>
            ))}
          </div>
        )}
        {result.activeBuffs.length > 0 && (
          <div className="p-2 mt-3 text-[11px] text-left rounded-lg shadow-inner bg-yellow-900/30">
            <h4 className="pb-1 mb-1 text-xs font-bold text-center border-b text-yellow-300 border-yellow-700/50">
              Buff Aktif Hari Ini
            </h4>
            {result.activeBuffs.map((buff) => (
              <div key={buff.id} className="font-medium text-yellow-300">
                <p>• {buff.description}</p>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={closeEndDayResult}
          className="w-full px-3 py-1.5 mt-4 text-sm font-bold text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full shadow-lg"
          aria-label="Mulai hari baru dan tutup laporan"
        >
          Mulai Hari Baru
        </button>
      </div>
    </motion.div>
  );
};

export default EndDayResultModal;
