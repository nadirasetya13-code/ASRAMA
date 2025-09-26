import React from 'react';
import { useGameStore } from '../controllers/gameController';
import { View } from '../types';
import LobyView from './LobyView';
import TalentaView from './TalentaView';
import PilihKamarView from './PilihKamarView';
import KamarView from './KamarView';
import KasirView from './KasirView';
import RekrutView from './RekrutView';
import TokoView from './TokoView';
import PengaturanView from './PengaturanView';
import MakamTalentaView from './MakamTalentaView';
import DeveloperOptionsView from './DeveloperOptionsView';
import KlinikView from './KlinikView';
import JenjangView from './JenjangView';
import BuatTalentaView from './BuatTalentaView';
import MainMenu from './MainMenu';

const ViewRenderer: React.FC = () => {
  const activeView = useGameStore((state) => state.activeView);

  switch (activeView) {
    case View.MAIN_MENU:
      return <MainMenu />;
    case View.LOBY:
      return <LobyView />;
    case View.TALENTA:
      return <TalentaView />;
    case View.PILIH_KAMAR:
      return <PilihKamarView />;
    case View.KAMAR:
      return <KamarView />;
    case View.KASIR:
      return <KasirView />;
    case View.REKRUT:
      return <RekrutView />;
    case View.TOKO:
      return <TokoView />;
    case View.PENGATURAN:
      return <PengaturanView />;
    case View.MAKAM_TALENTA:
      return <MakamTalentaView />;
    case View.KLINIK:
      return <KlinikView />;
    case View.DEVELOPER_OPTIONS:
      return <DeveloperOptionsView />;
    case View.JENJANG:
      return <JenjangView />;
    case View.BUAT:
      return <BuatTalentaView />;
    default:
      return <LobyView />;
  }
};

export default ViewRenderer;