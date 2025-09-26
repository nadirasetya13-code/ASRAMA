import { LivestreamEvent } from '../../../types';

export const humiliationEvents: LivestreamEvent[] = [
    {
        id: 'human-toilet-fantasy',
        text: "Fantasi ekstrem dari Sultan: 'Jadilah toiletku. Buka mulutmu, aku mau 'kencing' di dalamnya.'",
        choices: [
            {
                text: "[Buka mulut dan pasang muka pasrah]",
                stat: 'mental',
                threshold: 98,
                success: { hype: 45, viewers: 90, message: "Fantasi paling menjijikkan ini terpenuhi! Sultan mengirim jet pribadi!" },
                failure: { hype: -30, viewers: -70, message: "Kamu muntah dan merusak segalanya." },
            },
            {
                text: "[Tolak: 'Aku bukan toilet, aku Ratu. Kamu yang harusnya jilat sepatuku.']",
                stat: 'mental',
                threshold: 95,
                success: { hype: 30, viewers: 50, message: "Kamu membalikkan keadaan! Beberapa Sultan suka Ratu yang dominan!" },
                failure: { hype: -20, viewers: -50, message: "Jawabanmu menyinggung Sultan yang tidak suka dilawan." },
            },
        ],
    },
    {
        id: 'called-a-whore',
        text: "Seorang donatur terus-menerus memanggilmu 'lonte' dan 'jalang' di setiap donasinya.",
        choices: [
            {
                text: "[Terima panggilan itu: 'Iya, aku lonte-mu malam ini, tuan...']",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Sikap patuhmu membuatnya makin bernafsu dan royal!" },
                failure: { hype: -15, viewers: -40, message: "Kamu terpancing emosi dan membalasnya." },
            },
        ],
    },
    {
        id: 'spit-on-face-fantasy',
        text: "Request: 'Bayangin aku meludah di wajahmu. Jangan dihapus. Tunjukin muka pasrahmu yang belepotan 'ludah'.'",
        choices: [
            {
                text: "[Tutup mata dan berakting pasrah]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Aktingmu yang meyakinkan sangat disukai oleh para masokis!" },
                failure: { hype: -14, viewers: -38, message: "Kamu refleks mengusap wajah dan merusak fantasi." },
            },
        ],
    },
    {
        id: 'dog-roleplay',
        text: "Seorang Sultan berkata: 'Jadilah anjingku. Merangkak, pakai kalung itu, dan gonggong untuk tuanmu.'",
        choices: [
            {
                text: "[Merangkak dan menggonggong dengan imut]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "'Anjing' yang imut dan patuh! Penonton gemas." },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat konyol, bukan seksi." },
            },
            {
                text: "[Merangkak dan menjilat 'sepatu' (kamera)]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 32, viewers: 62, message: "Tindakan menjilatmu adalah puncak kepatuhan!" },
                failure: { hype: -18, viewers: -42, message: "Kamu menolak dan Sultan kecewa." },
            },
        ],
    },
    {
        id: 'beg-for-donation',
        text: "Tantangan: 'Mengemis seperti gembel. Mohon-mohon ke kami untuk donasi, bilang kamu butuh uang untuk makan.'",
        choices: [
            {
                text: "[Berakting memelas dan putus asa]",
                stat: 'mental',
                threshold: 89,
                success: { hype: 29, viewers: 59, message: "Aktingmu menyentuh fantasi 'penyelamat' para donatur." },
                failure: { hype: -14, viewers: -39, message: "Aktingmu tidak meyakinkan dan terlihat matre." },
            },
        ],
    },
    {
        id: 'sissy-training-fantasy',
        text: "Roleplay: 'Kamu adalah seorang sissy. Pakai CD pink itu, dan bicaralah dengan suara feminin. Puji 'kejantanan' para penonton.'",
        choices: [
            {
                text: "[Lakukan dengan totalitas]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Para penonton menikmati pembalikan peran ini!" },
                failure: { hype: -15, viewers: -40, message: "Kamu tidak bisa menirukan suara feminin dan jadi bahan tertawaan." },
            },
        ],
    },
    {
        id: 'face-slapping-fantasy',
        text: "Permintaan aneh: 'Tampar mukamu sendiri. Lebih keras, aku mau lihat pipimu merah, jalang nakal!'",
        choices: [
            {
                text: "[Tampar pipimu sampai terlihat merah]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Rasa sakitmu adalah kenikmatan bagi mereka! Hype naik!" },
                failure: { hype: -20, viewers: -50, message: "Tamparanmu terlalu pelan, penonton tidak puas." },
            },
        ],
    },
    {
        id: 'eat-from-floor-fantasy',
        text: "Seorang donatur menjatuhkan sepotong kue. 'Ambil itu. Pake mulutmu, seperti anjing. Jangan pake tangan.'",
        choices: [
            {
                text: "[Merangkak dan makan kue dari lantai]",
                stat: 'mental',
                threshold: 97,
                success: { hype: 40, viewers: 80, message: "Tindakanmu yang tak punya harga diri membuat para dominan sangat puas!" },
                failure: { hype: -28, viewers: -68, message: "Kamu menolak mentah-mentah." },
            },
        ],
    },
    {
        id: 'praise-small-dick-fantasy',
        text: "Seorang donatur dengan nama 'KontolKecil' meminta: 'Hina ukuranku, tapi setelah itu bilang kalau kamu tetep sange sama aku.'",
        choices: [
            {
                text: "[Hina lalu puji dengan meyakinkan]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 32, viewers: 62, message: "Kamu berhasil memainkan fantasi SPH (Small Penis Humiliation)!" },
                failure: { hype: -17, viewers: -47, message: "Pujianmu setelah hinaan terdengar tidak tulus." },
            },
        ],
    },
    {
        id: 'forced-ahegao-humiliation',
        text: "Tantangan: 'Lakukan ahegao. Tapi setelah itu, kamu harus bilang 'Terima kasih, Tuan' seolah kamu dipaksa orgasme.'",
        choices: [
            {
                text: "[Lakukan dengan ekspresi terhina]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Kombinasi antara sange dan terhina sangat kuat!" },
                failure: { hype: -15, viewers: -40, message: "Ekspresimu tidak menunjukkan rasa terhina." },
            },
        ],
    },
    {
        id: 'chastity-keyholder-fantasy',
        text: "Roleplay: 'Aku terkunci dalam sangkar kesucian. Kamu pegang kuncinya. Goda aku, buat aku memohon untuk dibukakan kuncinya.'",
        choices: [
            {
                text: "[Goyangkan kunci di depan kamera sambil tertawa jahat]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Kamu adalah Ratu yang kejam! Fantasi penonton terpenuhi." },
                failure: { hype: -14, viewers: -38, message: "Kamu tidak terlihat cukup dominan." },
            },
        ],
    },
    {
        id: 'puke-fantasy-request',
        text: "Seorang donatur dengan fetish aneh meminta: 'Coba minum segelas air garam. Aku mau liat kamu mual dan mungkin muntah.'",
        choices: [
            {
                text: "[Minum air garam dan coba tahan]",
                stat: 'stamina',
                threshold: 94,
                success: { hype: 34, viewers: 64, message: "Ekspresi mualmu sangat meyakinkan! Donatur puas." },
                failure: { hype: -24, viewers: -54, message: "Kamu langsung muntah hebat dan harus menghentikan stream." },
            },
        ],
    },
    {
        id: 'pee-pants-fantasy',
        text: "Fantasi lanjutan dari menahan pipis: 'Sekarang pasrah aja. Pipisin celanamu sedikit. Biarin basah.'",
        choices: [
            {
                text: "[Akting mengompol di celana]",
                stat: 'mental',
                threshold: 95,
                success: { hype: 38, viewers: 78, message: "Pemandangan celana basahmu membuat penonton fetish menggila!" },
                failure: { hype: -22, viewers: -52, message: "Aktingmu sangat buruk dan tidak ada yang percaya." },
            },
        ],
    },
    {
        id: 'exposure-threat-fantasy',
        text: "Roleplay: 'Aku punya foto bugilmu. Kalau kamu gak nurut, aku sebarin. Sekarang, tunjukin tetekmu sebagai bukti kepatuhan.'",
        choices: [
            {
                text: "[Akting takut dan patuh, lalu buka baju]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Fantasi pemerasanmu sangat menegangkan dan panas!" },
                failure: { hype: -15, viewers: -40, message: "Kamu malah tertawa dan merusak suasana." },
            },
        ],
    },
    {
        id: 'snot-fetish-request',
        text: "Permintaan paling menjijikkan: 'Coba keluarin ingusmu, trus jilat lagi. Aku bayar mahal buat ini.'",
        choices: [
            {
                text: "[Lakukan demi donasi]",
                stat: 'mental',
                threshold: 99,
                success: { hype: 50, viewers: 100, message: "Kamu melakukannya! Kamu adalah legenda! Hujan Paus dan Jet!" },
                failure: { hype: -35, viewers: -80, message: "Kamu tidak bisa, dan penonton lain merasa jijik dengan permintaan itu." },
            },
        ],
    },
];
