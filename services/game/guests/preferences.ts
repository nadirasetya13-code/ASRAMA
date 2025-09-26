import { GuestWant, GuestKink, PersonalityTraitType } from "../../../types";

export const wants: Omit<GuestWant, 'value' | 'operator'>[] = [
    { category: 'main', attribute: 'kecantikan', label: 'Kecantikan', importance: 1.2 },
    { category: 'main', attribute: 'mental', label: 'Mental Kuat', importance: 1.1 },
    { category: 'fisik', attribute: 'bentukPantat', label: 'Bentuk Pantat', importance: 1.5 },
    { category: 'fisik', attribute: 'bentukBibir', label: 'Bentuk Bibir', importance: 1.2 },
    { category: 'payudara', attribute: 'ukuran', label: 'Ukuran Payudara', importance: 1.4 },
    { category: 'payudara', attribute: 'kekenyalan', label: 'Kekenyalan Payudara', importance: 1.3 },
    { category: 'vagina', attribute: 'kekencangan', label: 'Kekencangan Vagina', importance: 1.8 },
    { category: 'vagina', attribute: 'pelumasan', label: 'Pelumasan Vagina', importance: 1.3 },
    { category: 'vagina', attribute: 'sensitivitasGSpot', label: 'Sensitivitas G-Spot', importance: 1.6 },
    { category: 'klitoris', attribute: 'sensitivitas', label: 'Sensitivitas Klitoris', importance: 1.7 },
];

export const kinks: GuestKink[] = [
    { type: 'Dominasi', description: "Dia terobsesi dengan kepatuhan mutlak." },
    { type: 'Sadisme Ringan', description: "Dia menikmati saat pasangannya merasakan sedikit sakit." },
    { type: 'Masokisme', description: "Anehnya, dia suka diperlakukan sedikit kasar." },
    { type: 'Fertility', description: "Dia memiliki fantasi untuk menghamili pasangannya." },
    { type: 'Virginity Complex', description: "Dia sangat terobsesi dengan 'kesempitan' dan 'kemurnian'." },
];

export const personalityTraits: PersonalityTraitType[] = ['Royal', 'Pelit', 'Kasar', 'Romantis', 'Tidak Sabaran', 'Kritis', 'Setia', 'Penyebar Penyakit'];
