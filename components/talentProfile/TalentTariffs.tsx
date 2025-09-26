import React from 'react';
import { Talent } from '../../types';
import { formatRupiah } from '../../services/localDataService';

interface TalentTariffsProps {
  talent: Talent;
}

const TalentTariffs: React.FC<TalentTariffsProps> = ({ talent }) => {
  return (
    <div className="p-1.5 my-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="pb-1 mb-1.5 text-xs font-serif font-bold text-center border-b-2 border-brand-pink/50">
        Tarif & Biaya
      </h3>
      <div className="space-y-0.5 font-sans text-[11px]">
        <div className="flex items-center justify-between p-0.5 px-1.5 rounded-lg bg-green-900/40">
          <span className="font-semibold text-green-300">
            Tarif Layanan (Tamu)
          </span>
          <span className="font-bold text-green-200">
            {formatRupiah(talent.tariffs.layanan)}
          </span>
        </div>
        <div className="flex items-center justify-between p-0.5 px-1.5 rounded-lg bg-red-900/40">
          <span className="font-semibold text-red-300">Biaya Perawatan</span>
          <span className="font-bold text-red-200">
            {formatRupiah(talent.tariffs.perawatan)}
          </span>
        </div>
        <div className="flex items-center justify-between p-0.5 px-1.5 rounded-lg bg-red-900/40">
          <span className="font-semibold text-red-300">
            Biaya Kesehatan & Kebugaran
          </span>
          <span className="font-bold text-red-200">
            {formatRupiah(talent.tariffs.kesehatan)}
          </span>
        </div>
        <div className="flex items-center justify-between p-0.5 px-1.5 rounded-lg bg-red-900/40">
          <span className="font-semibold text-red-300">Biaya KB (Hamil)</span>
          <span className="font-bold text-red-200">
            {formatRupiah(talent.tariffs.kb)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TalentTariffs;