import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MatchResult } from '../types';
import { useGameStore } from '../controllers/gameController';
import { formatRupiah } from '../services/localDataService';
import { LoadingSpinner, QrCodeIcon, CashPaymentIcon } from './icons';

interface ReceiptModalProps {
  session: MatchResult;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ session }) => {
  const { setViewingReceipt, processPayment, isProcessing } = useGameStore();
  const day = useGameStore((state) => state.gameState.gameTime.day);
  const phase = useGameStore((state) => state.gameState.gameTime.phase);

  // State to track which payment method is being processed for better UX
  const [processingMethod, setProcessingMethod] = useState<
    'QR' | 'Cash' | null
  >(null);

  // Refactored handler for cleaner code and specific loading state
  const handlePayment = (method: 'QR' | 'Cash') => {
    if (isProcessing) return;
    setProcessingMethod(method);
    processPayment(session.sessionId, method);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono bg-black/70 backdrop-blur-sm"
      onClick={() => setViewingReceipt(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="receiptTitle"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-sm p-3 text-xs text-gray-200 bg-gray-900 rounded-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Receipt Header */}
        <div className="pb-2 text-center border-b-2 border-dashed border-gray-600">
          <h2 id="receiptTitle" className="text-lg font-bold text-light-text">
            ASRAMA BIRAHI
          </h2>
          <p className="text-[11px] text-subtle-text">Struk Pembayaran</p>
        </div>

        {/* Transaction Details */}
        <div className="py-2 text-[11px] border-b border-dashed border-gray-600">
          <div className="flex justify-between">
            <span className="text-subtle-text">ID Sesi:</span>
            <span>{session.sessionId.slice(-8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtle-text">Tanggal:</span>
            <span>
              Hari ke-{day}, {phase}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtle-text">Pelanggan:</span>
            <span>{session.guestName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtle-text">Talenta:</span>
            <span>{session.talentName}</span>
          </div>
        </div>

        {/* Itemized List - Reworked for clarity and to fix calculation bug */}
        <div className="py-2 text-xs border-b border-dashed border-gray-600">
          <div className="flex justify-between">
            <span>Pendapatan Kotor Sesi</span>
            <span>{formatRupiah(session.pendapatanKotor)}</span>
          </div>
          {session.roomBonuses.map((bonus, index) => (
            <div key={index} className="flex justify-between text-green-400">
              <span className="pl-2">&bull; {bonus.description}</span>
              <span className="italic">{bonus.value}</span>
            </div>
          ))}
        </div>

        {/* Deductions & Final Totals */}
        <div className="py-2 space-y-1 text-xs">
          <div className="flex justify-between text-red-400">
            <span>- Biaya Perawatan & Lainnya</span>
            <span>({formatRupiah(session.biayaPerawatan)})</span>
          </div>

          <div className="flex justify-between pt-2 mt-2 text-base font-bold border-t border-dashed border-gray-600">
            <h2>TOTAL TAGIHAN</h2>
            <h2>{formatRupiah(session.pendapatanKotor)}</h2>
          </div>
        </div>

        <div className="p-2 mt-2 text-xs rounded-md bg-black/30">
          <div className="flex justify-between font-bold text-green-400">
            <span>LABA BERSIH AGENSI</span>
            <span>{formatRupiah(session.labaBersih)}</span>
          </div>
          <div className="flex justify-between font-bold text-purple-400">
            <span>DANA UNTUK TALENTA</span>
            <span>{formatRupiah(session.talentEarnings)}</span>
          </div>
        </div>

        {/* Footer & Action */}
        <div className="pt-3 mt-2 text-center border-t border-gray-700">
          <p className="mb-4 text-xs italic text-subtle-text">
            Pilih metode pembayaran:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePayment('QR')}
              disabled={isProcessing}
              className="flex flex-col items-center justify-center w-full px-1.5 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg shadow-lg font-sans hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
            >
              {isProcessing && processingMethod === 'QR' ? (
                <LoadingSpinner className="w-5 h-5 mb-1" />
              ) : (
                <QrCodeIcon className="w-5 h-5 mb-1" />
              )}
              Bayar via QR
              <span className="text-[9px] font-normal opacity-90">
                (+1 Rep, -1% Biaya)
              </span>
            </button>
            <button
              type="button"
              onClick={() => handlePayment('Cash')}
              disabled={isProcessing}
              className="flex flex-col items-center justify-center w-full px-1.5 py-1.5 text-xs font-bold text-white transition-transform transform bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg font-sans hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
            >
              {isProcessing && processingMethod === 'Cash' ? (
                <LoadingSpinner className="w-5 h-5 mb-1" />
              ) : (
                <CashPaymentIcon className="w-5 h-5 mb-1" />
              )}
              Bayar Tunai
              <span className="text-[9px] font-normal opacity-90">
                (Jumlah Penuh)
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptModal;
