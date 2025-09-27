import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../controllers/gameController';
import { BaseTalent, Rarity, Talent } from '../types';
import {
  TALENT_CREATOR_RARITY_STAT_CAP,
  YEARLY_XP_TO_NEXT_AGE,
  RARITY_CONFIG,
} from '../constants';
import { CreateIcon, LoadingSpinner, MagicWandIcon } from './icons';
import {
  calculateDayaPikat,
  calculateExpToNextLevel,
} from '../services/localDataService';
import { GoogleGenAI } from '@google/genai';

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
    { path: 'intim.mulut.produksialiva', label: 'Mulut: Produksi Saliva' },
    { path: 'intim.bokong.bentukPantat', label: 'Bokong: Bentuk Pantat' },
    { path: 'intim.bokong.kekencangan', label: 'Bokong: Kekencangan' },
    { path: 'intim.bokong.kehalusanKulit', label: 'Bokong: Kehalusan Kulit' },
    { path: 'intim.bokong.responSpank', label: 'Bokong: Respon Spank' },
];

const getAttributeValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, k) => (o ? o[k] : 0), obj);
};

const BuatTalentaView: React.FC = () => {
    const { saveCreatedTalent } = useGameStore.getState();
    const isProcessing = useGameStore((state) => state.isProcessing);
    const [talent, setTalent] = useState(initialTalentState);
    const [isSaved, setIsSaved] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const rarityConfig = RARITY_CONFIG[talent.rarity];
    const statCap = TALENT_CREATOR_RARITY_STAT_CAP[talent.rarity];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'rarity') {
            // Reset all numeric stats when rarity changes to enforce new caps and budgets
            setTalent(prev => ({
                ...initialTalentState,
                // Keep the text fields the user has already entered
                name: prev.name,
                kotaAsal: prev.kotaAsal,
                agama: prev.agama,
                statusSosial: prev.statusSosial,
                cerita: prev.cerita,
                imageUrl: prev.imageUrl,
                // Set the new rarity
                rarity: value as Rarity,
            }));
        } else {
            setTalent(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const { totalPointsUsed, budget, remainingPoints } = useMemo(() => {
        const totalPossiblePoints = statCap * attributeList.length;
        const budget = Math.floor(totalPossiblePoints / 2) + 8;
        
        let used = 0;
        attributeList.forEach(attr => {
            used += getAttributeValue(talent, attr.path);
        });
        
        return { totalPointsUsed: used, budget, remainingPoints: budget - used };
    }, [talent, statCap]);
    
    const dayaPikat = useMemo(() => {
        // Construct a temporary full talent object for calculation, assuming it's a "newborn" talent.
        const tempTalentForCalc: Omit<Talent, 'dayaPikat' | 'tariffs'> = {
            ...talent,
            id: 'temp-creation-id',
            age: 17,
            level: 1,
            experience: 0,
            experienceToNextLevel: calculateExpToNextLevel(1),
            yearlyExperience: 0,
            yearlyExperienceToNextAge: YEARLY_XP_TO_NEXT_AGE,
            currentEnergy: talent.stamina,
            skills: [],
            followers: 0,
            sessionsServed: 0,
            photoInventory: [],
            videoInventory: [],
            isDeceased: false,
            isOnContraceptives: false,
            hasMastery: false,
            hibernationEndTime: undefined,
            unavailabilityReason: undefined,
            unavailableUntil: undefined,
            earnings: 0
        };
        return calculateDayaPikat(tempTalentForCalc);
    }, [talent]);

    const handleSliderChange = useCallback((path: string, value: number) => {
        const currentValue = getAttributeValue(talent, path) as number;
        const delta = value - currentValue;

        if (delta > 0 && delta > remainingPoints) {
            value = currentValue + remainingPoints;
        }

        const finalValue = Math.min(value, statCap);

        setTalent(prev => {
            const keys = path.split('.');
            const newTalent = JSON.parse(JSON.stringify(prev));
            let current = newTalent;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = finalValue;
            return newTalent;
        });
    }, [remainingPoints, statCap, talent]);
    
    const handleGenerateAttributes = useCallback(() => {
        const statCap = TALENT_CREATOR_RARITY_STAT_CAP[talent.rarity];
        const numAttributes = attributeList.length;
        const totalPossiblePoints = statCap * numAttributes;
        const budget = Math.floor(totalPossiblePoints / 2) + 8;
        
        const points = new Array(numAttributes).fill(0);
        
        let pointsToDistribute = budget;
        while(pointsToDistribute > 0) {
            const randomIndex = Math.floor(Math.random() * numAttributes);
            if (points[randomIndex] < statCap) {
                points[randomIndex]++;
                pointsToDistribute--;
            }
        }
        
        const newTalentState = {
            ...initialTalentState,
            name: talent.name,
            kotaAsal: talent.kotaAsal,
            agama: talent.agama,
            statusSosial: talent.statusSosial,
            cerita: talent.cerita,
            imageUrl: talent.imageUrl,
            rarity: talent.rarity,
        };
        
        attributeList.forEach(({ path }, index) => {
            const keys = path.split('.');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let current = newTalentState as any;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = points[index];
        });
    
        setTalent(newTalentState);
    }, [talent.rarity, talent.name, talent.kotaAsal, talent.agama, talent.statusSosial, talent.cerita, talent.imageUrl]);
    
    const handleGenerateStory = useCallback(async () => {
        if (!talent.cerita.trim() || isAiGenerating) return;

        setIsAiGenerating(true);
        setAiError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const allAttributes = attributeList.map(attr => ({
                label: attr.label,
                value: getAttributeValue(talent, attr.path)
            })).sort((a, b) => b.value - a.value);

            const topAttributes = allAttributes.slice(0, 5).map(a => `${a.label}: ${a.value}`);
            const bottomAttributes = allAttributes.slice(-5).map(a => `${a.label}: ${a.value}`);

            const detailedPrompt = `
                Tugasmu adalah mengembangkan ide cerita untuk talenta di game dewasa 'ASRAMA BIRAHI'.
                Berikut adalah detail talenta:
                - Nama: ${talent.name || 'Belum ditentukan'}
                - Kota Asal: ${talent.kotaAsal || 'Belum ditentukan'}
                - Status Sosial: ${talent.statusSosial || 'Belum ditentukan'}
                - Rarity: ${talent.rarity}
                - Ide Cerita Awal dari User: "${talent.cerita}"
                - Atribut Terkuat: ${topAttributes.join(', ')}
                - Atribut Terlemah: ${bottomAttributes.join(', ')}

                Kembangkan ide cerita awal menjadi latar belakang yang lengkap, vulgar, dan eksplisit sesuai tema game (gelap, realistis, modern Indonesia).
                Cerita harus mencakup deskripsi fisik yang detail dan sensual, yang secara logis mencerminkan atribut terkuat dan terlemah di atas.
                Pastikan bahasa yang digunakan lugas dan tanpa sensor.
                Hanya berikan teks ceritanya saja dalam Bahasa Indonesia.
            `;

            const systemInstruction = `You are a creative writer for an adult simulation game called 'ASRAMA BIRAHI'. The game's tone is explicit, dark, realistic, and vulgar, with a modern Indonesian setting. Your task is to expand a user's short idea into a full, rich, and explicit backstory for a female talent, based on the detailed profile provided. The backstory must include a detailed physical description that justifies her potential stats. The narrative must be mature, provocative, and consistent with the game's themes. DO NOT use pleasantries or introductory phrases like 'Tentu,' or 'Berikut adalah...'. Respond only with the generated story text in Bahasa Indonesia.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: detailedPrompt,
                config: {
                    systemInstruction,
                },
            });

            const generatedStory = response.text;
            setTalent(prev => ({ ...prev, cerita: generatedStory }));

        } catch (error) {
            console.error("AI story generation failed:", error);
            setAiError("Gagal menghasilkan cerita. Coba lagi nanti.");
        } finally {
            setIsAiGenerating(false);
        }
    }, [isAiGenerating, talent]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Ukuran file terlalu besar. Maksimal 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTalent(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (remainingPoints < 0 || isProcessing || isSaved) return; // Prevent saving if over budget
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
                
                {/* Image Preview */}
                <AnimatePresence>
                    {talent.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex justify-center mb-4"
                        >
                            <div className={`relative w-40 h-72 rounded-xl shadow-lg border-2 overflow-hidden bg-dark-secondary ${rarityConfig.border} ${rarityConfig.glowAnimation}`}>
                                <img src={talent.imageUrl} alt="Pratinjau Talenta" className="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 w-full p-2 text-center text-white">
                                    <h3 className="text-lg font-bold font-serif drop-shadow-lg">{talent.name || 'Nama Talenta'}</h3>
                                    <p className={`text-sm font-semibold drop-shadow-md ${rarityConfig.color}`}>{talent.rarity}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- Daya Pikat & Point Budget Tracker --- */}
                <div className="sticky top-[45px] z-10 p-2 bg-dark-secondary/80 backdrop-blur-md rounded-lg border border-white/10 space-y-2">
                    {/* Daya Pikat Display */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold">Total Daya Pikat:</span>
                        <span className="font-bold text-brand-gold text-lg">{dayaPikat}</span>
                    </div>
                    {/* Point Budget Tracker */}
                    <div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold">Poin Atribut Digunakan:</span>
                            <span className={`font-bold ${budgetStatusColor}`}>{totalPointsUsed} / {budget}</span>
                        </div>
                        <div className="w-full h-2 mt-1 bg-black/30 rounded-full">
                            <div className="h-2 bg-brand-purple rounded-full transition-all" style={{ width: `${(totalPointsUsed / budget) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* --- Basic Info --- */}
                <div className="p-3 space-y-2 rounded-xl shadow-lg bg-black/20">
                     <input name="name" value={talent.name} onChange={handleInputChange} placeholder="Nama Talenta" required className="w-full p-2 bg-dark-tertiary rounded"/>
                     
                     <div className="flex gap-2 items-center">
                        <input name="imageUrl" value={talent.imageUrl} onChange={handleInputChange} placeholder="URL Gambar atau Unggah Lokal" required className="flex-grow p-2 bg-dark-tertiary rounded"/>
                        <label htmlFor="local-image-upload" className="flex-shrink-0 px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                            Unggah File
                        </label>
                        <input
                            id="local-image-upload"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                     </div>

                    <div className="relative">
                        <textarea 
                            name="cerita" 
                            value={talent.cerita} 
                            onChange={handleInputChange} 
                            placeholder="Tulis ide singkat di sini (contoh: 'Gadis desa polos yang terpaksa ke kota')..." 
                            required 
                            rows={4} 
                            className="w-full p-2 pr-12 bg-dark-tertiary rounded"
                        />
                        <button
                            type="button"
                            onClick={handleGenerateStory}
                            disabled={isAiGenerating || !talent.cerita.trim()}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                            title="Buat Cerita dengan AI"
                            aria-label="Buat Cerita dengan AI"
                        >
                            {isAiGenerating ? <LoadingSpinner className="w-5 h-5"/> : <MagicWandIcon className="w-5 h-5"/>}
                        </button>
                    </div>
                    {aiError && <p className="text-xs font-bold text-center text-red-500">{aiError}</p>}
                     <div className="grid grid-cols-2 gap-2">
                        <input name="kotaAsal" value={talent.kotaAsal} onChange={handleInputChange} placeholder="Kota Asal" required className="p-2 bg-dark-tertiary rounded"/>
                        <input name="agama" value={talent.agama} onChange={handleInputChange} placeholder="Agama" required className="p-2 bg-dark-tertiary rounded"/>
                        <input name="statusSosial" value={talent.statusSosial} onChange={handleInputChange} placeholder="Status Sosial" required className="p-2 bg-dark-tertiary rounded"/>
                        <select name="rarity" value={talent.rarity} onChange={handleInputChange} className="p-2 bg-dark-tertiary rounded">
                            {(Object.keys(TALENT_CREATOR_RARITY_STAT_CAP) as Rarity[]).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                     </div>
                </div>

                {/* --- Attributes --- */}
                <div className="p-3 space-y-3 rounded-xl shadow-lg bg-black/20">
                     <button
                        type="button"
                        onClick={handleGenerateAttributes}
                        className="w-full flex items-center justify-center gap-2 py-2 mb-3 font-bold text-white rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition-transform"
                    >
                        🎲 Generate Atribut Acak
                    </button>
                    <h3 className="text-center font-serif">Atribut (Max per stat: {statCap})</h3>
                    {attributeList.map(({ path, label }) => {
                        const value = path.split('.').reduce((o, k) => (o as any)?.[k] || 0, talent) as number;
                        return (
                            <div key={path}>
                                <label className="flex justify-between text-xs">
                                    <span>{label}</span>
                                    <span className="font-bold">{value}</span>
                                </label>
                                <input type="range" min="0" max={statCap} value={value} onChange={(e) => handleSliderChange(path, parseInt(e.target.value, 10))} className="w-full" />
                            </div>
                        );
                    })}
                </div>
                
                <button type="submit" disabled={remainingPoints < 0 || isProcessing || isSaved} className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-blue-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed">
                    {isProcessing ? <LoadingSpinner className="w-6 h-6 mx-auto"/> : isSaved ? 'Talenta Disimpan!' : remainingPoints < 0 ? 'Poin Melebihi Batas!' : `Simpan (Sisa Poin: ${remainingPoints})`}
                </button>
                {isSaved && <p className="text-sm text-center text-green-400">Talenta barumu akan tersedia di Gacha setelah memuat ulang game.</p>}
                {saveError && <p className="mt-2 text-sm font-bold text-center text-red-500">{saveError}</p>}
            </form>
        </div>
    );
};

export default BuatTalentaView;