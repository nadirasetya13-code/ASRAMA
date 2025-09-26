import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { BaseTalent, Rarity } from '../types';
import { TALENT_ATTRIBUTE_BUDGET, RARITY_CONFIG } from '../constants';
import { CreateIcon, LoadingSpinner } from './icons';

const initialTalentState: Omit<BaseTalent, 'id'> = {
  name: '',
  kotaAsal: '',
  agama: '',
  statusSosial: '',
  cerita: '',
  imageUrl: '',
  rarity: 'Biasa',
  stamina: 0,
  popularitas: 0,
  kecantikan: 0,
  mental: 0,
  fisik: { gayaRambut: 0, bentukWajah: 0, bentukMata: 0, bentukBibir: 0, bentukHidung: 0, bentukTangan: 0, beratBadan: 0, bentukKaki: 0, bentukPantat: 0 },
  intim: {
    payudara: { ukuran: 0, bentuk: 0, kekenyalan: 0, sensitivitasPuting: 0, ukuranAreola: 0, warnaPuting: 0, jarak: 0, bentukPuting: 0, warnaAreola: 0, kelembutanKulit: 0 },
    vagina: { kedalaman: 0, kekencangan: 0, pelumasan: 0, sensitivitasGSpot: 0, elastisitas: 0, aroma: 0, labia: 0, tipeHymen: 0, kondisiDindingVagina: 0, kekuatanOtotPC: 0, potensiOrgasmeMultiple: 0, volumeEjakulasiWanita: 0 },
    klitoris: { ukuran: 0, sensitivitas: 0, aksesibilitas: 0, kecepatanRespon: 0, tipeTudung: 0, pembengkakan: 0, dayaTahan: 0, posisi: 0 },
    anal: { kekencanganAnus: 0, elastisitasAnus: 0, warnaAnus: 0, kebersihan: 0, sensitivitasAnal: 0 },
    mulut: { keterampilanLidah: 0, kedalamanTenggorokan: 0, produksiSaliva: 0 },
    bokong: { bentukPantat: 0, kekencangan: 0, kehalusanKulit: 0, responSpank: 0 },
  },
  equipment: { makeup: null, lingerie: null, sepatu: null, bra: null, celanaDalam: null, obatBirahi: null, ponsel: null, kameraDsr: null, handycam: null, laptop: null, parfum: null, stocking: null, kondom: null },
  equipmentInventory: [],
  potensiHIVAIDS: 0,
  kesehatan: 0,
  jatuhCinta: 0,
  potensiHamil: 0,
  reincarnationCount: 0,
};

const attributeList = [
    { path: 'stamina', label: 'Stamina' },
    { path: 'popularitas', label: 'Popularitas' },
    { path: 'kecantikan', label: 'Kecantikan' },
    { path: 'mental', label: 'Mental' },
    { path: 'kesehatan', label: 'Kesehatan' },
    { path: 'potensiHIVAIDS', label: 'Potensi HIV/AIDS' },
    { path: 'jatuhCinta', label: 'Jatuh Cinta' },
    { path: 'potensiHamil', label: 'Potensi Hamil' },
    { path: 'fisik.gayaRambut', label: 'Fisik: Gaya Rambut' },
    { path: 'fisik.bentukWajah', label: 'Fisik: Bentuk Wajah' },
    { path: 'fisik.bentukMata', label: 'Fisik: Bentuk Mata' },
    { path: 'fisik.bentukBibir', label: 'Fisik: Bentuk Bibir' },
    { path: 'fisik.bentukHidung', label: 'Fisik: Bentuk Hidung' },
    { path: 'fisik.bentukTangan', label: 'Fisik: Bentuk Tangan' },
    { path: 'fisik.beratBadan', label: 'Fisik: Berat Badan' },
    { path: 'fisik.bentukKaki', label: 'Fisik: Bentuk Kaki' },
    { path: 'fisik.bentukPantat', label: 'Fisik: Bentuk Pantat' },
    { path: 'intim.payudara.ukuran', label: 'Payudara: Ukuran' },
    { path: 'intim.payudara.bentuk', label: 'Payudara: Bentuk' },
    { path: 'intim.payudara.kekenyalan', label: 'Payudara: Kekenyalan' },
    { path: 'intim.payudara.sensitivitasPuting', label: 'Payudara: Sensitivitas Puting' },
    { path: 'intim.payudara.ukuranAreola', label: 'Payudara: Ukuran Areola' },
    { path: 'intim.payudara.warnaPuting', label: 'Payudara: Warna Puting' },
    { path: 'intim.payudara.jarak', label: 'Payudara: Jarak' },
    { path: 'intim.payudara.bentukPuting', label: 'Payudara: Bentuk Puting' },
    { path: 'intim.payudara.warnaAreola', label: 'Payudara: Warna Areola' },
    { path: 'intim.payudara.kelembutanKulit', label: 'Payudara: Kelembutan Kulit' },
    { path: 'intim.vagina.kedalaman', label: 'Vagina: Kedalaman' },
    { path: 'intim.vagina.kekencangan', label: 'Vagina: Kekencangan' },
    { path: 'intim.vagina.pelumasan', label: 'Vagina: Pelumasan' },
    { path: 'intim.vagina.sensitivitasGSpot', label: 'Vagina: Sensitivitas G-Spot' },
    { path: 'intim.vagina.elastisitas', label: 'Vagina: Elastisitas' },
    { path: 'intim.vagina.aroma', label: 'Vagina: Aroma' },
    { path: 'intim.vagina.labia', label: 'Vagina: Bentuk Labia' },
    { path: 'intim.vagina.tipeHymen', label: 'Vagina: Tipe Hymen' },
    { path: 'intim.vagina.kondisiDindingVagina', label: 'Vagina: Dinding Vagina' },
    { path: 'intim.vagina.kekuatanOtotPC', label: 'Vagina: Otot PC' },
    { path: 'intim.vagina.potensiOrgasmeMultiple', label: 'Vagina: Orgasme Ganda' },
    { path: 'intim.vagina.volumeEjakulasiWanita', label: 'Vagina: Volume Ejakulasi' },
    { path: 'intim.klitoris.ukuran', label: 'Klitoris: Ukuran' },
    { path: 'intim.klitoris.sensitivitas', label: 'Klitoris: Sensitivitas' },
    { path: 'intim.klitoris.aksesibilitas', label: 'Klitoris: Aksesibilitas' },
    { path: 'intim.klitoris.kecepatanRespon', label: 'Klitoris: Kecepatan Respon' },
    { path: 'intim.klitoris.tipeTudung', label: 'Klitoris: Tipe Tudung' },
    { path: 'intim.klitoris.pembengkakan', label: 'Klitoris: Potensi Pembengkakan' },
    { path: 'intim.klitoris.dayaTahan', label: 'Klitoris: Daya Tahan' },
    { path: 'intim.klitoris.posisi', label: 'Klitoris: Posisi' },
    { path: 'intim.anal.kekencanganAnus', label: 'Anal: Kekencangan Anus' },
    { path: 'intim.anal.elastisitasAnus', label: 'Anal: Elastisitas Anus' },
    { path: 'intim.anal.warnaAnus', label: 'Anal: Warna Anus' },
    { path: 'intim.anal.kebersihan', label: 'Anal: Kebersihan' },
    { path: 'intim.anal.sensitivitasAnal', label: 'Anal: Sensitivitas Anal' },
    { path: 'intim.mulut.keterampilanLidah', label: 'Mulut: Keterampilan Lidah' },
    { path: 'intim.mulut.kedalamanTenggorokan', label: 'Mulut: Kedalaman Tenggorokan' },
    { path: 'intim.mulut.produksiSaliva', label: 'Mulut: Produksi Saliva' },
    { path: 'intim.bokong.bentukPantat', label: 'Bokong: Bentuk Pantat' },
    { path: 'intim.bokong.kekencangan', label: 'Bokong: Kekencangan' },
    { path: 'intim.bokong.kehalusanKulit', label: 'Bokong: Kehalusan Kulit' },
    { path: 'intim.bokong.responSpank', label: 'Bokong: Respon Spank' },
];

const BuatTalentaView: React.FC = () => {
    const { saveCreatedTalent } = useGameStore.getState();
    const isProcessing = useGameStore((state) => state.isProcessing);
    const [talent, setTalent] = useState(initialTalentState);
    const [isSaved, setIsSaved] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTalent(prev => ({ ...prev, [name]: value }));
    };
    
    const { totalPointsUsed, budget, remainingPoints } = useMemo(() => {
        const budget = TALENT_ATTRIBUTE_BUDGET[talent.rarity];
        let used = 0;
        const numericAttributes = [
            talent.stamina, talent.popularitas, talent.kecantikan, talent.mental,
            ...Object.values(talent.fisik), ...Object.values(talent.intim.payudara),
            ...Object.values(talent.intim.vagina), ...Object.values(talent.intim.klitoris),
            ...Object.values(talent.intim.anal), ...Object.values(talent.intim.mulut),
            ...Object.values(talent.intim.bokong), talent.potensiHIVAIDS, talent.kesehatan,
            talent.jatuhCinta, talent.potensiHamil
        ];
        used = numericAttributes.reduce((sum, val) => sum + (Number(val) || 0), 0);
        return { totalPointsUsed: used, budget, remainingPoints: budget - used };
    }, [talent]);

    const handleSliderChange = (path: string, value: number) => {
        const getAttributeValue = (obj: any, path: string) => path.split('.').reduce((o, k) => o?.[k], obj);
        
        const currentValue = getAttributeValue(talent, path) as number;
        const delta = value - currentValue;

        if (delta > 0) {
            if (delta > remainingPoints) {
                value = currentValue + remainingPoints;
            }
        }

        setTalent(prev => {
            const keys = path.split('.');
            const newTalent = JSON.parse(JSON.stringify(prev));
            let current = newTalent;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newTalent;
        });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (remainingPoints !== 0 || isProcessing || isSaved) return;
        setSaveError(null);
        try {
            await saveCreatedTalent(talent as BaseTalent);
            setIsSaved(true);
            setTimeout(() => {
                setTalent(initialTalentState);
                setIsSaved(false);
            }, 3000);
        } catch (error) {
            console.error('Gagal simpan talenta:', error);
            setSaveError('Terjadi kesalahan saat menyimpan. Silakan coba lagi.');
        }
    };

    const budgetStatusColor = remainingPoints === 0 ? 'text-green-400' : remainingPoints > 0 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="p-2 md:p-4 pb-20">
            <h2 className="mb-3 text-xl font-serif text-center text-light-text">Buat Talenta Kustom</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                
                {/* --- Point Budget Tracker --- */}
                <div className="sticky top-[45px] z-10 p-2 bg-dark-secondary/80 backdrop-blur-md rounded-lg border border-white/10">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold">Poin Atribut:</span>
                        <span className={`font-bold ${budgetStatusColor}`}>{remainingPoints} / {budget}</span>
                    </div>
                    <div className="w-full h-2 mt-1 bg-black/30 rounded-full">
                        <div className="h-2 bg-brand-purple rounded-full transition-all" style={{ width: `${(totalPointsUsed / budget) * 100}%` }}></div>
                    </div>
                </div>

                {/* --- Basic Info --- */}
                <div className="p-3 space-y-2 rounded-xl shadow-lg bg-black/20">
                     <input name="name" value={talent.name} onChange={handleInputChange} placeholder="Nama Talenta" required className="w-full p-2 bg-dark-tertiary rounded"/>
                     <input name="imageUrl" value={talent.imageUrl} onChange={handleInputChange} placeholder="URL Gambar" required className="w-full p-2 bg-dark-tertiary rounded"/>
                     <textarea name="cerita" value={talent.cerita} onChange={handleInputChange} placeholder="Cerita Latar Belakang" required rows={4} className="w-full p-2 bg-dark-tertiary rounded"/>
                     <div className="grid grid-cols-2 gap-2">
                        <input name="kotaAsal" value={talent.kotaAsal} onChange={handleInputChange} placeholder="Kota Asal" required className="p-2 bg-dark-tertiary rounded"/>
                        <input name="agama" value={talent.agama} onChange={handleInputChange} placeholder="Agama" required className="p-2 bg-dark-tertiary rounded"/>
                        <input name="statusSosial" value={talent.statusSosial} onChange={handleInputChange} placeholder="Status Sosial" required className="p-2 bg-dark-tertiary rounded"/>
                        <select name="rarity" value={talent.rarity} onChange={handleInputChange} className="p-2 bg-dark-tertiary rounded">
                            {(Object.keys(TALENT_ATTRIBUTE_BUDGET) as Rarity[]).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                     </div>
                </div>

                {/* --- Attributes --- */}
                <div className="p-3 space-y-3 rounded-xl shadow-lg bg-black/20">
                    <h3 className="text-center font-serif">Atribut</h3>
                    {attributeList.map(({ path, label }) => {
                        const value = path.split('.').reduce((o, k) => (o as any)?.[k], talent) as number;
                        return (
                            <div key={path}>
                                <label className="flex justify-between text-xs">
                                    <span>{label}</span>
                                    <span className="font-bold">{value}</span>
                                </label>
                                <input type="range" min="0" max="100" value={value} onChange={(e) => handleSliderChange(path, parseInt(e.target.value, 10))} className="w-full" />
                            </div>
                        );
                    })}
                </div>
                
                <button type="submit" disabled={remainingPoints !== 0 || isProcessing || isSaved} className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-blue-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed">
                    {isProcessing ? <LoadingSpinner className="w-6 h-6 mx-auto"/> : isSaved ? 'Talenta Disimpan!' : remainingPoints !== 0 ? `Sisa Poin: ${remainingPoints}` : 'Simpan Talenta'}
                </button>
                {isSaved && <p className="text-sm text-center text-green-400">Talenta barumu akan tersedia di Gacha setelah memuat ulang game.</p>}
                {saveError && <p className="mt-2 text-sm font-bold text-center text-red-500">{saveError}</p>}
            </form>
        </div>
    );
};

export default BuatTalentaView;