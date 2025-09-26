import { LivestreamEvent } from '../../../types';

export const teaseAndRevealEvents: LivestreamEvent[] = [
    {
        id: 'cd-request',
        text: "Seorang penonton meminta: 'Spill dong warna CD-nya hari ini, kak!'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Singkap rok & pamerkan celana dalammu]",
                stat: 'popularitas',
                threshold: 75,
                success: { hype: 20, viewers: 40, message: "Penonton heboh melihat CD-mu yang seksi!" },
                failure: { hype: -5, viewers: -10, message: "Kamu terlihat malu-malu." },
            },
            {
                text: "[Jawab sambil menggesek selangkangan]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 15, viewers: 25, message: "Gerakanmu lebih panas dari jawaban apapun!" },
                failure: { hype: -5, viewers: -15, message: "Gerakanmu tidak terlihat jelas." },
            },
        ],
    },
    {
        id: 'lingerie-reveal',
        text: "Penonton ingin tahu lingeriemu. 'Kak, coba berdiri di atas kursi biar keliatan semua!'",
        tags: ['dada', 'pantat'],
        choices: [
            {
                text: "[Naik ke kursi & berpose menggoda]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 20, viewers: 45, message: "Pemandangan dari bawah membuat imajinasi mereka liar!" },
                failure: { hype: -10, viewers: -25, message: "Kamu hampir jatuh, sangat tidak seksi." },
            },
            {
                text: "[Hanya longgarkan bajumu sedikit]",
                stat: 'mental',
                threshold: 65,
                success: { hype: 10, viewers: 15, message: "Sedikit intipan sudah cukup membuat mereka senang." },
                failure: { hype: -5, viewers: -15, message: "Hampir tidak ada yang terlihat." },
            },
        ],
    },
    {
        id: 'wardrobe-malfunction-vulgar',
        text: "Sial! Kancing bajumu paling atas tiba-tiba lepas, membuat belahan dadamu terekspos jelas.",
        tags: ['dada'],
        choices: [
            {
                text: "[Biarkan saja & lanjutkan seolah tak terjadi]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 25, viewers: 40, message: "Sikap 'tak peduli'-mu dianggap sangat seksi!" },
                failure: { hype: -15, viewers: -50, message: "Kamu panik & mencoba menutupi, membuat suasana canggung." },
            },
            {
                text: "[Tersenyum nakal ke kamera]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 18, viewers: 35, message: "Penonton menganggapnya 'fan service' yang disengaja!" },
                failure: { hype: -10, viewers: -20, message: "Senyummu terlihat dipaksakan." },
            },
        ],
    },
    {
        id: 'nipple-poke',
        text: "Seorang penonton berkomentar: 'Dingin ya, kak? Kok putingnya keliatan nonjol gitu?'",
        tags: ['dada'],
        choices: [
            {
                text: "[Sentuh & mainkan putingmu dari balik baju]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 55, message: "Aksimu membuat seluruh chat menjadi tegang!" },
                failure: { hype: -10, viewers: -25, message: "Gerakanmu tidak terlihat dan sia-sia." },
            },
            {
                text: "[Jawab: 'Iya nih, bikinin anget dong...']",
                stat: 'mental',
                threshold: 75,
                success: { hype: 15, viewers: 20, message: "Jawabanmu memicu hujan gift dari penonton!" },
                failure: { hype: -5, viewers: -15, message: "Gombalanmu dianggap murahan." },
            },
        ],
    },
    {
        id: 'show-armpits',
        text: "Seorang penonton dengan fetish aneh meminta: 'Kak, liatin keteknya dong! Aku suka banget liat ketek cewek, apalagi yang basah.'",
        choices: [
            {
                text: "[Angkat tangan dan pamerkan ketiakmu]",
                stat: 'popularitas',
                threshold: 70,
                success: { hype: 15, viewers: 30, message: "Penonton dengan fetish aneh ini mengirim banyak gift!" },
                failure: { hype: -5, viewers: -10, message: "Kamu terlihat ragu dan tidak percaya diri." },
            },
        ],
    },
    {
        id: 'compare-breast-size',
        text: "Penonton mulai berdebat tentang ukuran dadamu. 'Ukuran bra-nya berapa, kak? Gak percaya kalo gak diukur langsung.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Ambil meteran dan ukur di depan kamera]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 20, viewers: 40, message: "Aksi beranimu mengakhiri perdebatan dan menaikkan hype!" },
                failure: { hype: -10, viewers: -20, message: "Kamu salah mengukur dan malah jadi bahan lelucon." },
            },
            {
                text: "[Jawab dengan misterius: 'Lebih besar dari yang kamu bayangin...']",
                stat: 'mental',
                threshold: 78,
                success: { hype: 10, viewers: 15, message: "Jawabanmu membuat mereka makin penasaran." },
                failure: { hype: -5, viewers: -15, message: "Penonton tidak puas dengan jawabanmu." },
            },
        ],
    },
    {
        id: 'oil-massage',
        text: "Penonton memintamu membaluri dadamu dengan baby oil dan memijatnya.",
        tags: ['dada'],
        choices: [
            {
                text: "[Lakukan dengan gerakan memutar yang sensual]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Pemandangan dada berkilauanmu sangat indah!" },
                failure: { hype: -10, viewers: -25, message: "Terlalu banyak minyak, semuanya jadi berantakan." },
            },
        ],
    },
    {
        id: 'mirror-show',
        text: "Request: 'Arahin kamera ke cermin dong, kita mau lihat dari depan dan belakang sekaligus!'",
        tags: ['dada', 'pantat'],
        choices: [
            {
                text: "[Patuhi dan lakukan berbagai pose seksi]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 25, viewers: 55, message: "Pemandangan ganda ini sangat memuaskan penonton!" },
                failure: { hype: -10, viewers: -30, message: "Pencahayaan buruk, tidak ada yang terlihat jelas." },
            },
        ],
    },
    {
        id: 'upskirt-staircase',
        text: "Tantangan: 'Pura-pura naik tangga, trus 'gak sengaja' kasih liat pemandangan dari bawah rokmu.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Atur kamera di bawah dan lakukan dengan hati-hati]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Angle kameranya sempurna! Pemandangan yang langka!" },
                failure: { hype: -12, viewers: -38, message: "Kameranya jatuh, rencanamu gagal." },
            },
        ],
    },
    {
        id: 'downblouse-tease',
        text: "Request: 'Benerin tali sepatu dong, kak. Tapi bungkuknya yang dalem ya, biar kita bisa liat 'pemandangan' dari atas.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Bungkuk dalam-dalam, biarkan dadamu tumpah]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Pemandangan belahan dadamu dari atas sangat indah!" },
                failure: { hype: -10, viewers: -30, message: "Bajumu terlalu ketat, tidak ada yang terlihat." },
            },
        ],
    },
    {
        id: 'cameltoe-focus',
        text: "Kamu memakai legging ketat. 'Celananya ketat banget, kak. Coba ngangkang sedikit, mau liat 'cetakannya'.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Ngangkang perlahan dan perlihatkan]",
                stat: 'popularitas',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Cetakan vaginamu terlihat jelas! Chat menggila!" },
                failure: { hype: -15, viewers: -40, message: "Tidak terlihat apa-apa, penonton kecewa." },
            },
        ],
    },
    {
        id: 'sideboob-reveal',
        text: "Kamu memakai tank top longgar tanpa bra. 'Coba miringin badan ke kamera, kak. Mau liat 'intipan' dari samping.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Miringkan badan dan sengaja perlihatkan]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 22, viewers: 42, message: "Sideboob-mu terlihat sangat menggoda!" },
                failure: { hype: -8, viewers: -22, message: "Gerakanmu terlalu cepat, tidak ada yang terlihat." },
            },
        ],
    },
    {
        id: 'whale-tail-peek',
        text: "Penonton melihat ujung G-stringmu menyembul dari celana. 'Tali CD-nya keliatan tuh. Coba sengaja tarik lebih tinggi lagi.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Tarik G-stringmu tinggi-tinggi]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Pemandangan 'whale tail' ini sangat nostalgia dan seksi!" },
                failure: { hype: -10, viewers: -20, message: "Talinya putus." },
            },
        ],
    },
    // --- 10 NEW SCENARIOS ---
    {
        id: 'bounce-on-bed',
        text: "Tantangan: 'Coba loncat-loncat di kasur. Kita mau lihat tetekmu sama pantatmu goyang-goyang.'",
        tags: ['dada', 'pantat'],
        choices: [
            {
                text: "[Loncat dengan antusias]",
                stat: 'stamina',
                threshold: 80,
                success: { hype: 25, viewers: 50, message: "Goyangan asetmu membuat penonton pusing keenakan!" },
                failure: { hype: -10, viewers: -25, message: "Kamu kelelahan dan terlihat tidak seksi." },
            },
        ],
    },
    {
        id: 'jiggle-butt-close-up',
        text: "Request: 'Close-up pantatmu dong. Trus goyangin pelan-pelan. Kita mau liat 'ombak'-nya.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Dekatkan kamera dan goyangkan pantatmu]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 30, viewers: 60, message: "Pantatmu yang 'jiggly' menghipnotis seluruh chat!" },
                failure: { hype: -15, viewers: -40, message: "Kameranya terlalu dekat dan gambarnya nge-blur." },
            },
        ],
    },
    {
        id: 'braless-jumps',
        text: "Tantangan: 'Lepas bra-mu, tapi tetap pakai kaosmu. Terus lompat tali 10 kali.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Terima tantangan tanpa bra]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 28, viewers: 55, message: "Pemandangan dadamu yang berguncang bebas sangat liar!" },
                failure: { hype: -12, viewers: -35, message: "Kamu tidak kuat melompat dan terlihat lemah." },
            },
        ],
    },
    {
        id: 'butt-clap-challenge',
        text: "Tantangan dari Sultan: 'Bisa 'butt clap' gak? Kalau bisa, aku kirim 5 Paus.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Konsentrasi dan coba lakukan]",
                stat: 'stamina',
                threshold: 95,
                success: { hype: 40, viewers: 70, message: "BERHASIL! Suara 'plok!' dari pantatmu adalah musik terindah!" },
                failure: { hype: -20, viewers: -45, message: "Kamu hanya bisa menggoyangkannya, tidak ada suara." },
            },
        ],
    },
    {
        id: 'see-through-shirt',
        text: "Request: 'Basahin kaos putihmu pake air. Kita mau liat tembus pandang.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Siram dirimu dengan sebotol air]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 25, viewers: 50, message: "Bentuk payudara dan putingmu tercetak jelas! Sangat seksi!" },
                failure: { hype: -10, viewers: -30, message: "Airnya terlalu sedikit dan tidak terlihat transparan." },
            },
        ],
    },
    {
        id: 'ass-in-jeans-challenge',
        text: "Tantangan: 'Pakai jeans-mu yang paling ketat. Trus jongkok-berdiri 10 kali. Kamera dari belakang.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Lakukan dengan gerakan yang menonjolkan pantat]",
                stat: 'stamina',
                threshold: 80,
                success: { hype: 22, viewers: 45, message: "Lekukan pantatmu di jeans ketat itu sempurna!" },
                failure: { hype: -10, viewers: -25, message: "Celanamu robek dan merusak suasana." },
            },
        ],
    },
    {
        id: 'squeeze-boobs-together',
        text: "Permintaan: 'Coba satukan kedua tetekmu dengan tangan. Jepit yang kenceng, kita mau liat belahan dadamu makin dalem.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Tekan dan pamerkan belahan dadamu]",
                stat: 'kecantikan',
                threshold: 78,
                success: { hype: 20, viewers: 40, message: "Belahan dadamu terlihat sangat penuh dan menggoda!" },
                failure: { hype: -5, viewers: -20, message: "Dadanya terlalu kecil, tidak ada belahan yang terlihat." },
            },
        ],
    },
    {
        id: 'twerk-on-camera',
        text: "Penonton serempak: 'TWERKING! TWERKING! TWERKING!'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Lakukan goyangan twerk terbaikmu]",
                stat: 'stamina',
                threshold: 90,
                success: { hype: 35, viewers: 65, message: "Goyangan pantatmu yang cepat dan ritmis membuat chat meledak!" },
                failure: { hype: -15, viewers: -40, message: "Goyanganmu kaku dan tidak terlihat seperti twerking." },
            },
        ],
    },
    {
        id: 'handbra-challenge',
        text: "Tantangan: 'Lepas bra-mu, tapi tutupi dadamu cuma pake tangan (handbra). Coba tahan selama 2 menit.'",
        tags: ['dada'],
        choices: [
            {
                text: "[Terima dan berpose seksi dengan handbra]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 26, viewers: 52, message: "Pemandangan ini membuat imajinasi penonton jadi liar!" },
                failure: { hype: -10, viewers: -30, message: "Tanganmu tidak sengaja terlepas dan memperlihatkan semuanya." },
            },
        ],
    },
    {
        id: 'thong-adjustment',
        text: "Request: 'Pura-pura G-stringmu nyelip. Coba benerin posisinya dari depan kamera, biar kita bisa liat kamu ngangkang.'",
        tags: ['pantat'],
        choices: [
            {
                text: "[Lakukan dengan gerakan 'memperbaiki' yang sensual]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Gerakanmu sangat meyakinkan dan pemandangannya luar biasa!" },
                failure: { hype: -12, viewers: -32, message: "Gerakanmu terlalu cepat dan tidak terlihat apa-apa." },
            },
        ],
    },
];