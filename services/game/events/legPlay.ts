import { LivestreamEvent } from '../../../types';

export const legPlayEvents: LivestreamEvent[] = [
    {
        id: 'leg-play-foot-worship',
        text: "Banyak komentar aneh muncul: 'Kak, jilatin jempol kakinya dong... please...'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Lepas kaus kaki & jilat jempolmu]",
                stat: 'kecantikan',
                threshold: 75,
                success: { hype: 25, viewers: 50, message: "Para 'foot lovers' di chat mengirim banyak gift!" },
                failure: { hype: -15, viewers: -30, message: "Kamu terlihat jijik, merusak fantasi mereka." },
            },
            {
                text: "[Goyangkan kaki di depan kamera]",
                stat: 'popularitas',
                threshold: 70,
                success: { hype: 15, viewers: 25, message: "Gerakan kakimu cukup untuk memuaskan mereka." },
                failure: { hype: -5, viewers: -15, message: "Kakimu terlihat kotor." },
            },
        ],
    },
    {
        id: 'leg-play-high-heel-dangle',
        text: "Kamu memakai high heels. Request: 'Duduk di kursi, silangkan kakimu, trus mainin sepatumu di ujung jari kaki. Biarin sepatunya ngegantung.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Lakukan dengan perlahan dan menggoda]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Pemandangan itu sangat elegan dan membuat tegang!" },
                failure: { hype: -10, viewers: -25, message: "Sepatumu jatuh dan merusak momen." },
            },
        ],
    },
    {
        id: 'leg-play-thigh-squeeze',
        text: "Tantangan: 'Jepit botol minum itu di antara kedua pahamu. Jepit yang kenceng sampe botolnya penyok.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Jepit dengan sekuat tenaga]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Kekuatan pahamu luar biasa! Penonton terkesan." },
                failure: { hype: -12, viewers: -38, message: "Pahamu tidak cukup kuat, botolnya tergelincir." },
            },
        ],
    },
    {
        id: 'leg-play-stocking-peel',
        text: "Kamu memakai stocking. 'Lepas stocking-nya pelan-pelan banget, kak. Biar kami bisa nikmatin setiap senti kakimu yang terekspos.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Lepas stocking dengan gerakan super lambat]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Cara sensualmu melepas stocking adalah seni!" },
                failure: { hype: -15, viewers: -40, message: "Stocking-nya nyangkut dan sobek." },
            },
        ],
    },
    {
        id: 'leg-play-foot-massage',
        text: "Request: 'Pijit-pijit kakimu sendiri dong. Pake lotion, trus remas-remas telapak kakimu.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Lakukan pijatan dengan ekspresi keenakan]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 22, viewers: 45, message: "Pemandangan dan desahanmu membuat para foot fetishist puas." },
                failure: { hype: -8, viewers: -25, message: "Pijatanmu terlihat asal-asalan." },
            },
        ],
    },
    {
        id: 'leg-play-writing-on-thigh',
        text: "Sultan meminta: 'Tulis namaku di paha dalammu pake lipstik. Aku mau nandain 'wilayah'-ku.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Tulis namanya dengan sensual]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Sultan sangat bangga melihat namanya di pahamu!" },
                failure: { hype: -12, viewers: -38, message: "Lipstiknya beleber dan tulisannya tidak jelas." },
            },
        ],
    },
    {
        id: 'leg-play-pantyhose-rip',
        text: "Tantangan: 'Robek stocking jaringmu di bagian selangkangan. Pelan-pelan, pake jarimu.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Buat lubang kecil dan perbesar perlahan]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 26, viewers: 54, message: "Aksi merobek yang terkontrol itu sangat erotis!" },
                failure: { hype: -10, viewers: -30, message: "Kamu merobeknya terlalu cepat dan tidak sensual." },
            },
        ],
    },
    {
        id: 'leg-play-shoe-licking',
        text: "Seorang 'worshipper' meminta: 'Jilatin high heel-mu yang kotor itu. Anggap itu 'sepatu suci' dari tuanmu.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Jilat sol sepatu dengan lidahmu]",
                stat: 'mental',
                threshold: 96,
                success: { hype: 35, viewers: 70, message: "Aksi ekstremmu memuaskan fetish terdalam para penonton!" },
                failure: { hype: -25, viewers: -60, message: "Kamu muntah di tengah siaran." },
            },
        ],
    },
    {
        id: 'leg-play-feet-on-camera',
        text: "Request: 'Tempelin telapak kakimu di layar kamera. Kami mau ciumin.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Tekan kakimu ke kamera]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Penonton merasa sangat dekat denganmu!" },
                failure: { hype: -10, viewers: -20, message: "Kameranya jadi kotor." },
            },
        ],
    },
    {
        id: 'leg-play-leg-cramps-fantasy',
        text: "Roleplay: 'Pura-pura kakimu kram setelah pakai high heels. Minta 'penonton' buat pijitin sambil pasang muka kesakitan tapi nikmat.'",
        tags: ['kaki'],
        choices: [
            {
                text: "[Akting dengan meyakinkan]",
                stat: 'mental',
                threshold: 87,
                success: { hype: 27, viewers: 57, message: "Aktingmu membuat para penonton merasa jadi 'pahlawan'!" },
                failure: { hype: -11, viewers: -37, message: "Aktingmu terlihat palsu." },
            },
        ],
    },
];