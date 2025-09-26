import React from 'react';
import { Talent } from '../../types';
import { formatRupiah } from '../../services/localDataService';
import {
  HeartIcon,
  TalentCoinIcon,
  CityIcon,
  ReligionIcon,
  SocialStatusIcon,
  PopularityIcon,
  MatchIcon,
  CameraIcon,
  HandycamIcon,
} from '../icons';

interface TalentInfoBlockProps {
  talent: Talent;
}

const TalentInfoBlock: React.FC<TalentInfoBlockProps> = ({ talent }) => {
  return (
    <div className="p-1.5 my-2 rounded-xl shadow-inner bg-black/20 border border-white/10">
      {/* Key Metrics Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2 text-center">
        {/* Daya Pikat */}
        <div className="p-1.5 rounded-lg bg-black/30">
          <div className="inline-flex items-center gap-1.5">
            <HeartIcon className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-subtle-text">
              Daya Pikat
            </span>
          </div>
          <p className="text-lg font-bold text-light-text">
            {talent.dayaPikat}
          </p>
        </div>

        {/* Dana Pribadi */}
        <div className="p-1.5 rounded-lg bg-black/30">
          <div className="inline-flex items-center gap-1.5">
            <TalentCoinIcon className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-subtle-text">Dana</span>
          </div>
          <p className="text-lg font-bold text-light-text">
            {formatRupiah(talent.earnings)}
          </p>
        </div>

        {/* Pengikut */}
        <div className="p-1.5 rounded-lg bg-black/30">
          <div className="inline-flex items-center gap-1.5">
            <PopularityIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold text-subtle-text">
              Pengikut
            </span>
          </div>
          <p className="text-lg font-bold text-light-text">
            {talent.followers.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Sesi Dilayani */}
        <div className="p-1.5 rounded-lg bg-black/30">
          <div className="inline-flex items-center gap-1.5">
            <MatchIcon className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold text-subtle-text">Sesi</span>
          </div>
          <p className="text-lg font-bold text-light-text">
            {talent.sessionsServed.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
       {/* Content Stock Section */}
       <div className="grid grid-cols-2 gap-2 pt-2 mt-2 text-center border-t border-white/10">
         <div className="p-1.5 rounded-lg bg-black/30">
            <div className="inline-flex items-center gap-1.5">
              <CameraIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-subtle-text">Stok Foto</span>
            </div>
            <p className="text-lg font-bold text-light-text">{talent.photoInventory?.length || 0}</p>
          </div>
           <div className="p-1.5 rounded-lg bg-black/30">
            <div className="inline-flex items-center gap-1.5">
              <HandycamIcon className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-subtle-text">Stok Video</span>
            </div>
            <p className="text-lg font-bold text-light-text">{talent.videoInventory?.length || 0}</p>
          </div>
      </div>

      {/* Personal Info Section */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 mt-2 text-[10px] border-t border-white/10">
        <div className="flex items-center gap-1 py-0.5 px-2 bg-black/20 rounded-full shadow-sm">
          <CityIcon className="w-3 h-3 text-brand-purple" />
          <span className="font-semibold">{talent.kotaAsal}</span>
        </div>
        <div className="flex items-center gap-1 py-0.5 px-2 bg-black/20 rounded-full shadow-sm">
          <ReligionIcon className="w-3 h-3 text-brand-purple" />
          <span className="font-semibold">{talent.agama}</span>
        </div>
        <div className="flex items-center gap-1 py-0.5 px-2 bg-black/20 rounded-full shadow-sm">
          <SocialStatusIcon className="w-3 h-3 text-brand-purple" />
          <span className="font-semibold">{talent.statusSosial}</span>
        </div>
      </div>
    </div>
  );
};

export default TalentInfoBlock;