import React from 'react';
import StatBar from './StatBar';
import {
  HairStyleIcon, FaceShapeIcon, EyeShapeIcon, LipShapeIcon, NoseShapeIcon,
  HandShapeIcon, BodyWeightIcon, LegShapeIcon, ButtShapeIcon, PenisIcon,
  LengthIcon, DiameterIcon, StaminaIcon, AggressionIcon, ErectionIcon,
  SensitivityIcon, SpermVolumeIcon, HeadTypeIcon, VeinTextureIcon,
  AromaVaginaIcon as ScentIcon,
  // Tambahan ikon untuk atribut intim (jika relevan untuk guest stats, berdasarkan konteks attributeIcons.tsx)
  PayudaraIcon, UkuranPayudaraIcon, KekencanganVaginaIcon, // Contoh lengkapan
} from '../icons';

interface GuestAttributeGroupProps {
  title: string;
  stats: Record<string, number | string>;
  isPenis?: boolean;
}

const iconMap: Record<string, { 
  icon: React.FC<{className?:string}>; 
  color: string; 
  label?: string; 
  unit?: string;
  isReversedProgress?: boolean;
  tooltip?: string;
  range?: [number, number];
}> = {
  // Fisik (sudah ada, diverifikasi lengkap)
  gayaRambut: { icon: HairStyleIcon, color: 'text-orange-400', label: 'Gaya Rambut' },
  bentukWajah: { icon: FaceShapeIcon, color: 'text-lime-400', label: 'Bentuk Wajah' },
  bentukMata: { icon: EyeShapeIcon, color: 'text-cyan-400', label: 'Bentuk Mata' },
  bentukBibir: { icon: LipShapeIcon, color: 'text-rose-400', label: 'Bentuk Bibir' },
  bentukHidung: { icon: NoseShapeIcon, color: 'text-stone-400', label: 'Bentuk Hidung' },
  bentukTangan: { icon: HandShapeIcon, color: 'text-amber-400', label: 'Bentuk Tangan' },
  beratBadan: { icon: BodyWeightIcon, color: 'text-teal-400', label: 'Berat Badan' },
  bentukKaki: { icon: LegShapeIcon, color: 'text-indigo-400', label: 'Bentuk Kaki' },
  bentukPantat: { icon: ButtShapeIcon, color: 'text-fuchsia-400', label: 'Bentuk Pantat' },
  
  // Penis (sudah ada, diverifikasi lengkap)
  panjang: { icon: LengthIcon, color: 'text-gray-300', label: 'Panjang', unit: 'cm', range: [8, 22] },
  diameter: { icon: DiameterIcon, color: 'text-gray-300', label: 'Diameter', unit: 'cm', range: [3, 6] },
  dayaTahan: { icon: StaminaIcon, color: 'text-yellow-400', label: 'Daya Tahan' },
  agresivitas: { icon: AggressionIcon, color: 'text-red-400', label: 'Agresivitas' },
  kekerasanEreksi: { icon: ErectionIcon, color: 'text-blue-400', label: 'Kekerasan Ereksi' },
  sensitivitas: { icon: SensitivityIcon, color: 'text-pink-400', label: 'Sensitivitas' },
  volumeSperma: { icon: SpermVolumeIcon, color: 'text-sky-300', label: 'Volume Sperma' },
  tipeKepala: { icon: HeadTypeIcon, color: 'text-purple-300', label: 'Tipe Kepala' },
  teksturUrat: { icon: VeinTextureIcon, color: 'text-teal-300', label: 'Tekstur Urat' },
  
  // Bau (Scent) - Perbaikan: Tambah isReversedProgress dan tooltip
  bau: { 
    icon: ScentIcon, 
    color: 'text-orange-500', 
    label: 'Bau (Makin Rendah Makin Bagus)', 
    isReversedProgress: true,
    tooltip: 'Nilai lebih rendah berarti aroma lebih baik (ideal: 0-20). Bar progres menunjukkan jarak dari nilai buruk (100) ke baik (0).'
  },
  
  // Tambahan untuk atribut intim (lengkapi cakupan jika stats punya ini; fallback jika tidak)
  ukuranPayudara: { icon: UkuranPayudaraIcon, color: 'text-pink-400', label: 'Ukuran Payudara' },
  kekencanganVagina: { icon: KekencanganVaginaIcon, color: 'text-rose-400', label: 'Kekencangan Vagina' },
  // ... Tambahkan lebih banyak jika diperlukan berdasarkan stats potensial
};

const GuestAttributeGroup: React.FC<GuestAttributeGroupProps> = React.memo(({ title, stats, isPenis = false }) => {
  return (
    <div className="p-3 mt-4 space-y-4 rounded-xl shadow-inner bg-black/20 border border-white/10">
      <h3 className="flex items-center justify-center gap-2 pb-1 -mt-1 text-base font-serif font-bold text-center border-b-2 border-brand-purple/50">
        {isPenis && <PenisIcon className="w-6 h-6" />} {title}
      </h3>
      {Object.entries(stats).map(([key, value]) => {
        const config = iconMap[key];
        
        if (!config) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[GuestAttributeGroup] Missing config for key: "${key}". Using fallback. Ensure iconMap covers all stats keys.`);
          }
          return (
            <StatBar
              key={key}
              icon={<div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">?</div>}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={typeof value === 'number' ? value.toFixed(1) : String(value)}
              color="text-gray-400"
              isProgress={typeof value === 'number'}
              progressValue={typeof value === 'number' ? value : 0}
              aria-label={`Atribut tidak dikonfigurasi: ${key}`}
            />
          );
        }

        const displayValue = typeof value === 'number' && config.unit
          ? `${value.toFixed(1)} ${config.unit}`
          : String(value);
        
        let progressValue = 0;
        if (typeof value === 'number') {
            if (config.range) {
                const [min, max] = config.range;
                const clampedValue = Math.max(min, Math.min(value, max));
                progressValue = ((clampedValue - min) / (max - min)) * 100;
            } else {
                progressValue = value;
            }
        }

        const statBarProps = {
          key,
          icon: <config.icon className="w-6 h-6" />,
          label: config.label || key,
          value: displayValue,
          color: config.color,
          isProgress: typeof value === 'number',
          progressValue: progressValue,
          isReversedProgress: config.isReversedProgress || false,
          tooltip: config.tooltip,
        };

        return <StatBar {...statBarProps} />;
      })}
    </div>
  );
});

GuestAttributeGroup.displayName = 'GuestAttributeGroup';

export default GuestAttributeGroup;