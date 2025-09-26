import { ConsumableItem } from '../types';

export const KONDOM_CATALOG: ConsumableItem[] = [
    {
        name: 'Kondom Lokal',
        type: 'kondom',
        description: 'Kondom standar dengan harga terjangkau. Memberikan perlindungan dasar terhadap risiko kehamilan dan HIV.',
        basePrice: 50000,
        protectionLevel: 0.95, // 95% protection
        category: 'Konsumsi',
    },
    {
        name: 'Kondom Sutra Premium',
        type: 'kondom',
        description: 'Kondom impor berkualitas tinggi. Sangat tipis namun kuat, memberikan proteksi superior dengan sedikit mengurangi kenikmatan.',
        basePrice: 250000,
        protectionLevel: 0.999, // 99.9% protection
        category: 'Konsumsi',
    },
];