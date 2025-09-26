import { LivestreamEvent } from '../../../types';

export const physicalChallengeEvents: LivestreamEvent[] = [
    {
        id: 'phone-vibration',
        text: "Tantangan gila dari donatur: 'Coba taruh HP-mu yang lagi getar di antara paha. Kalau kuat 1 menit, aku kasih Paus.'",
        choices: [
            {
                text: "[Terima tantangan & coba tahan desahanmu]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 35, viewers: 70, message: "Kamu berhasil! Desahan tertahanmu membuat semua gila!" },
                failure: { hype: -20, viewers: -50, message: "Kamu tidak tahan dan menjatuhkan HP-nya." },
            },
            {
                text: "[Lakukan tapi sambil mendesah keras]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 25, viewers: 50, message: "Desahanmu sangat meyakinkan, penonton puas!" },
                failure: { hype: -10, viewers: -30, message: "Desahanmu terdengar palsu." },
            },
            {
                text: "[Tolak: 'Gila ya? Itu buat sesi private!']",
                stat: 'mental',
                threshold: 80,
                success: { hype: 10, viewers: 10, message: "Penolakanmu membuatmu terlihat eksklusif." },
                failure: { hype: -10, viewers: -20, message: "Kamu dianggap sombong dan tidak asik." },
            },
        ],
    },
    {
        id: 'ice-cube-challenge',
        text: "Seorang penonton menantangmu memasukkan es batu ke dalam celana dalammu dan menahannya selama 30 detik.",
        choices: [
            {
                text: "[Lakukan tantangan dengan ekspresi nikmat]",
                stat: 'stamina',
                threshold: 80,
                success: { hype: 25, viewers: 50, message: "Reaksimu terhadap dingin membuat penonton bergairah!" },
                failure: { hype: -15, viewers: -35, message: "Kamu menjerit kedinginan, tidak seksi sama sekali." },
            },
            {
                text: "[Tolak dengan genit: 'Nanti beku lho, bang...']",
                stat: 'mental',
                threshold: 75,
                success: { hype: 10, viewers: 20, message: "Jawabanmu membuat penonton makin penasaran." },
                failure: { hype: -5, viewers: -15, message: "Penonton kecewa kamu tidak berani." },
            },
        ],
    },
    {
        id: 'ahegao-challenge',
        text: "Tantangan baru muncul di chat: 'Kak, coba bikin muka ahegao dong!'",
        choices: [
            {
                text: "[Lakukan dengan totalitas (mata berputar, lidah keluar)]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 50, message: "Ahegao-mu sempurna! Banyak yang screenshot!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat seperti orang kesurupan." },
            },
            {
                text: "[Lakukan versi imut dan malu-malu]",
                stat: 'kecantikan',
                threshold: 78,
                success: { hype: 15, viewers: 30, message: "Versi imutmu sangat menggemaskan!" },
                failure: { hype: -5, viewers: -15, message: "Tidak terlihat seperti ahegao sama sekali." },
            },
        ],
    },
    {
        id: 'condom-challenge',
        text: "Tantangan baru: 'Coba pasang kondom di dildo atau pisang itu HANYA dengan mulutmu.'",
        choices: [
            {
                text: "[Lakukan dengan cepat dan ahli]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 25, viewers: 50, message: "Keahlian mulutmu membuat penonton ternganga!" },
                failure: { hype: -15, viewers: -35, message: "Kamu gagal dan kondomnya sobek." },
            },
        ],
    },
    {
        id: 'whip-cream-challenge',
        text: "Tantangan populer: 'Semprotin whipped cream di dadamu trus jilatin sampe bersih.'",
        choices: [
            {
                text: "[Lakukan dengan lahap]",
                stat: 'stamina',
                threshold: 75,
                success: { hype: 20, viewers: 45, message: "Caramu menjilatnya membuat penonton ngiler!" },
                failure: { hype: -10, viewers: -20, message: "Kamu tidak bisa menjangkau semuanya, terlihat konyol." },
            },
        ],
    },
    {
        id: 'edging-challenge',
        text: "Tantangan menahan nafsu: 'Mainin dirimu pake vibrator, tapi kamu GAK BOLEH muncrat selama 3 menit. Kalau berhasil, Paus meluncur.'",
        choices: [
            {
                text: "[Terima tantangan dan fokus menahan]",
                stat: 'mental',
                threshold: 95,
                success: { hype: 40, viewers: 80, message: "Kamu berhasil! Ekspresi menahanmu sangat panas!" },
                failure: { hype: -20, viewers: -50, message: "Kamu muncrat sebelum waktunya, tantangan gagal." },
            },
        ],
    },
    {
        id: 'hold-pose-challenge',
        text: "Seorang Sultan menantang: 'Tahan posisi nungging 'doggystyle' paling provokatif selama 2 menit tanpa bergerak. Sedikit saja goyang, donasi batal.'",
        choices: [
            {
                text: "[Kunci tubuhmu dan tahan posisi]",
                stat: 'stamina',
                threshold: 92,
                success: { hype: 30, viewers: 60, message: "Staminamu luar biasa! Sultan sangat terkesan." },
                failure: { hype: -15, viewers: -40, message: "Ototmu kram dan kamu terjatuh." },
            },
        ],
    },
    {
        id: 'flexibility-challenge-split',
        text: "Penonton meragukan kelenturanmu. 'Coba lakukan 'split' di lantai. Kalau bisa, kami semua kompakan kirim gift.'",
        choices: [
            {
                text: "[Lakukan split dengan sempurna]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 25, viewers: 50, message: "Tubuh lenturmu membuat semua orang terpukau!" },
                failure: { hype: -10, viewers: -30, message: "Kamu tidak bisa melakukannya dan malah terlihat kaku." },
            },
        ],
    },
    {
        id: 'breath-hold-challenge',
        text: "Tantangan aneh: 'Coba tahan napas sambil pasang muka sange. Kita hitung berapa detik kamu kuat.'",
        choices: [
            {
                text: "[Tahan napas selama mungkin]",
                stat: 'stamina',
                threshold: 80,
                success: { hype: 20, viewers: 30, message: "Kamu kuat menahan napas! Muka merahmu terlihat seksi." },
                failure: { hype: -10, viewers: -25, message: "Kamu langsung terbatuk-batuk." },
            },
        ],
    },
    {
        id: 'stare-challenge-sexy',
        text: "Tantangan mental: 'Tatap kamera tanpa berkedip selama 1 menit. Tapi tatapanmu harus tatapan jalang yang lapar kontol.'",
        choices: [
            {
                text: "[Fokus dan tatap dengan penuh nafsu]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 25, viewers: 40, message: "Tatapanmu berhasil menghipnotis seluruh penonton!" },
                failure: { hype: -15, viewers: -30, message: "Kamu tidak tahan dan matamu berair, merusak suasana." },
            },
        ],
    },
];