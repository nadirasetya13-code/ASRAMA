import { LivestreamEvent } from '../../../types';

export const asmrEvents: LivestreamEvent[] = [
    {
        id: 'asmr-ear-licking-mic',
        text: "Request ASMR: 'Jilatin mic-nya. Anggap itu kuping penonton. Bisikin kata-kata jorok sambil jilatin.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Lakukan dengan suara jilatan yang basah dan jelas]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 55, message: "Suara ASMR-mu membuat seluruh penonton merinding!" },
                failure: { hype: -15, viewers: -35, message: "Suaranya terlalu berisik dan tidak sensual." },
            },
            {
                text: "[Hanya hembuskan napas panas ke mic]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 20, viewers: 30, message: "Hembusan napasmu sudah cukup membuat mereka merinding." },
                failure: { hype: -10, viewers: -20, message: "Tidak terdengar apa-apa." },
            },
        ],
    },
    {
        id: 'asmr-kissing-sounds',
        text: "Penonton ingin mendengar suara ciumanmu. 'Coba cium punggung tanganmu berulang kali dekat mic.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Buat berbagai jenis suara ciuman (basah, lembut, cepat)]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 45, message: "Suara kecupanmu membuat penonton merasa dicium!" },
                failure: { hype: -10, viewers: -25, message: "Suaranya terdengar seperti orang makan." },
            },
        ],
    },
    {
        id: 'asmr-inaudible-whisper',
        text: "Tantangan ASMR: 'Bisikkan rahasia tergelapmu, tapi jangan sampai kami bisa dengar kata-katanya. Kami hanya mau dengar suara bisikanmu.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Bisikkan hal random dengan sangat pelan]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 50, message: "Bisikanmu yang tidak terdengar sangat intim dan misterius!" },
                failure: { hype: -12, viewers: -30, message: "Beberapa kata terdengar dan itu merusak ilusi." },
            },
        ],
    },
    {
        id: 'asmr-tapping-on-body',
        text: "Request: 'Pake kuku panjangmu, coba ketuk-ketuk pelan di area dadamu. Kami mau denger suaranya.'",
        tags: ['asmr', 'dada'],
        choices: [
            {
                text: "[Lakukan dengan ritme yang menenangkan]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 22, viewers: 40, message: "Suara ketukan kukumu di kulitmu sangat sensual!" },
                failure: { hype: -8, viewers: -20, message: "Suaranya terlalu keras dan tidak menenangkan." },
            },
        ],
    },
    {
        id: 'asmr-water-sounds',
        text: "Tantangan: 'Mainin air di mangkok dekat mic. Buat suara tetesan, kumuran, seolah-olah kamu lagi main di kamar mandi.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Buat suara air yang realistis dan sensual]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 35, message: "Suara airmu membuat imajinasi penonton jadi liar!" },
                failure: { hype: -10, viewers: -25, message: "Kamu malah menumpahkan air ke mana-mana." },
            },
        ],
    },
    {
        id: 'asmr-eating-banana',
        text: "Permintaan: 'Makan pisang itu pelan-pelan dekat mic. Kami mau dengar suara mulutmu yang basah.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Makan dengan suara 'smacking' yang disengaja]",
                stat: 'kecantikan',
                threshold: 86,
                success: { hype: 26, viewers: 52, message: "Suara makanmu terdengar sangat jorok dan erotis!" },
                failure: { hype: -11, viewers: -32, message: "Suaranya menjijikkan, bukan sensual." },
            },
        ],
    },
    {
        id: 'asmr-breathing-in-ear',
        text: "Roleplay ASMR: 'Anggap mic ini kupingku. Dekatkan mulutmu dan bernapaslah dengan berat seolah kamu lagi sange berat.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Hembuskan napas panas dengan ritme terengah-engah]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Napasmu yang berat membuat semua orang merinding!" },
                failure: { hype: -12, viewers: -38, message: "Kamu kehabisan napas dan terdengar aneh." },
            },
        ],
    },
    {
        id: 'asmr-fabric-sounds',
        text: "Tantangan: 'Gesek-gesekkan CD satinmu di mic. Kami mau dengar suara kainnya yang lembut.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Lakukan dengan perlahan]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Suara gesekan kainnya sangat menenangkan dan intim." },
                failure: { hype: -10, viewers: -20, message: "Tidak ada suara yang terdengar." },
            },
        ],
    },
    {
        id: 'asmr-roleplay-girlfriend',
        text: "Roleplay: 'Jadi pacarku yang lagi manja. Bisikin kata 'sayang' berulang kali dengan nada yang berbeda-beda.'",
        tags: ['asmr', 'interaksi'],
        choices: [
            {
                text: "[Bisikkan dengan berbagai intonasi (manja, posesif, sange)]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Akting suaramu luar biasa! Para 'pacar' di chat sangat puas." },
                failure: { hype: -15, viewers: -40, message: "Semua intonasimu terdengar sama." },
            },
        ],
    },
    {
        id: 'asmr-counting-donations',
        text: "Request unik: 'Coba hitung uang (imajiner) dekat mic. Kami mau dengar suara gemerisik uang sambil kamu mendesah.'",
        tags: ['asmr'],
        choices: [
            {
                text: "[Gunakan kertas dan buat suara gemerisik sambil berakting]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Kombinasi suara uang dan desahanmu sangat memicu!" },
                failure: { hype: -10, viewers: -25, message: "Suaranya tidak terdengar seperti uang." },
            },
        ],
    },
];