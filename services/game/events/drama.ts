import { LivestreamEvent } from '../../../types';

export const dramaEvents: LivestreamEvent[] = [
    {
        id: 'blackout-flash',
        text: "Sial! Tiba-tiba lampu kamarmu padam, hanya menyisakan cahaya dari layar.",
        choices: [
            {
                text: "[Nyalakan flash HP & arahkan ke dada]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Bayangan dadamu di kegelapan membuat imajinasi liar!" },
                failure: { hype: -15, viewers: -60, message: "Kamu tidak sengaja menyilaukan kamera, penonton kesal." },
            },
            {
                text: "[Nyalakan flash HP & arahkan ke selangkangan]",
                stat: 'popularitas',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Pemandangan 'cameltoe' singkat itu membuat chat meledak!" },
                failure: { hype: -10, viewers: -30, message: "Cahayanya terlalu terang dan tidak seksi." },
            },
            {
                text: "[Tetap tenang & berbisik sensual]",
                stat: 'mental',
                threshold: 70,
                success: { hype: 10, viewers: 5, message: "Suasana gelap membuat bisikanmu makin intim." },
                failure: { hype: -10, viewers: -25, message: "Kamu terdengar panik." },
            },
        ],
    },
    {
        id: 'family-interruption',
        text: "Tiba-tiba terdengar suara ibumu memanggil dari luar kamar: 'Sayang, lagi ngapain?!'",
        choices: [
            {
                text: "[Mute mic & balas chat: 'Bentar, ada monster']",
                stat: 'mental',
                threshold: 82,
                success: { hype: 15, viewers: 20, message: "Leluconmu membuat penonton tegang sekaligus terhibur!" },
                failure: { hype: -20, viewers: -50, message: "Kamu panik dan tidak sengaja mematikan stream." },
            },
            {
                text: "[Pasang muka panik yang dibuat-buat]",
                stat: 'kecantikan',
                threshold: 75,
                success: { hype: 10, viewers: 15, message: "Penonton menikmati 'drama' yang terjadi." },
                failure: { hype: -15, viewers: -40, message: "Kepalsuanmu terlihat jelas, penonton bosan." },
            },
        ],
    },
    {
        id: 'lagging-stream',
        text: "Koneksi internetmu tiba-tiba lemot. Gambar jadi pecah-pecah saat kamu sedang bergoyang.",
        choices: [
            {
                text: "[Minta maaf dan coba perbaiki posisi]",
                stat: 'mental',
                threshold: 70,
                success: { hype: 5, viewers: -10, message: "Penonton mengapresiasi usahamu, sebagian tetap bertahan." },
                failure: { hype: -15, viewers: -50, message: "Kamu panik dan membuat penonton makin kesal." },
            },
            {
                text: "[Bercanda: 'Saking panasnya, sinyal jadi meleleh']",
                stat: 'mental',
                threshold: 85,
                success: { hype: 15, viewers: 10, message: "Leluconmu mencairkan suasana! Hype kembali naik." },
                failure: { hype: -10, viewers: -30, message: "Leluconmu dianggap tidak lucu saat mereka sedang tegang." },
            },
        ],
    },
    {
        id: 'accidental-fart',
        text: "Ups! Kamu tidak sengaja kentut saat mengubah posisi. Terdengar jelas di mic.",
        choices: [
            {
                text: "[Tersipu malu dan minta maaf dengan imut]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 10, viewers: 20, message: "Reaksi malumu dianggap sangat menggemaskan!" },
                failure: { hype: -20, viewers: -40, message: "Kamu mencoba menyangkal, tapi semua orang dengar." },
            },
            {
                text: "[Abaikan dan lanjutkan seolah tidak terjadi apa-apa]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 5, viewers: -5, message: "Mental bajamu membuat insiden itu cepat dilupakan." },
                failure: { hype: -15, viewers: -30, message: "Kamu terlihat sangat canggung setelahnya." },
            },
        ],
    },
    {
        id: 'ex-boyfriend-watching',
        text: "Kamu tidak salah lihat. Itu username mantan pacarmu di daftar penonton. Dia hanya diam menonton.",
        choices: [
            {
                text: "[Sengaja tampil lebih panas untuk membuatnya menyesal]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 25, viewers: 40, message: "Aksi balas dendammu menjadi tontonan yang luar biasa!" },
                failure: { hype: -20, viewers: -50, message: "Kamu kehilangan fokus dan stream menjadi berantakan." },
            },
            {
                text: "[Abaikan dia sepenuhnya]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 5, viewers: 0, message: "Kamu menunjukkan profesionalisme tingkat tinggi." },
                failure: { hype: -15, viewers: -30, message: "Kamu terlihat jelas terganggu oleh kehadirannya." },
            },
        ],
    },
    {
        id: 'burp-loudly',
        text: "Kamu tidak sengaja sendawa keras setelah minum soda. Suaranya terdengar jelas.",
        choices: [
            {
                text: "[Tertawa dan bilang 'maaf, abis minum soda sange']",
                stat: 'mental',
                threshold: 80,
                success: { hype: 15, viewers: 25, message: "Lelucon jorokmu berhasil mencairkan suasana!" },
                failure: { hype: -15, viewers: -35, message: "Kamu terlihat sangat malu dan stream jadi canggung." },
            },
        ],
    },
    {
        id: 'leaked-dm-on-screen',
        text: "Sial! Notifikasi pesan dari 'Om Budi' muncul di layar: 'Nanti malem jadi kan, sayang? Aku udah siapin 'susu'-nya.'",
        choices: [
            {
                text: "[Cepat tutup notifikasi & alihkan pembicaraan]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 10, viewers: 20, message: "Kamu berhasil mengalihkan perhatian, tapi beberapa penonton curiga." },
                failure: { hype: -25, viewers: -60, message: "Semua orang melihatnya! Chat jadi heboh dan kamu panik." },
            },
        ],
    },
    {
        id: 'jealous-wife-raid',
        text: "Tiba-tiba, seorang penonton baru dengan username 'ISTRI_SAH_SULTAN' masuk dan mulai menerormu di chat. 'DASAR PELAKOR! JAUHI SUAMIKU!'",
        choices: [
            {
                text: "[Blokir dia dan tetap tenang]",
                stat: 'mental',
                threshold: 95,
                success: { hype: 15, viewers: 30, message: "Profesionalismemu di tengah drama membuat fans kagum." },
                failure: { hype: -30, viewers: -70, message: "Kamu terpancing dan drama besar terjadi, merusak reputasimu." },
            },
            {
                text: "[Goda dia: 'Suamimu lebih suka sama aku, tante...']",
                stat: 'mental',
                threshold: 92,
                success: { hype: 25, viewers: 50, message: "Jawaban beranimu membuat Sultan terkesan dan mengirim donasi besar!" },
                failure: { hype: -20, viewers: -50, message: "Kamu memperkeruh suasana, banyak penonton yang tidak suka drama." },
            },
        ],
    },
    {
        id: 'pet-interrupts-stream',
        text: "Kucing peliharaanmu melompat ke pangkuanmu di tengah-tengah sesi panas.",
        choices: [
            {
                text: "[Elus kucing itu sambil terus mendesah]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 15, viewers: 25, message: "Kontras antara imutnya kucing dan seksinya kamu sangat menarik!" },
                failure: { hype: -10, viewers: -20, message: "Kucingnya mencakar dan merusak suasana." },
            },
        ],
    },
    {
        id: 'phone-falls-bad-angle',
        text: "HP-mu terjatuh dan sekarang menyorot langit-langit. Hanya suaramu yang terdengar.",
        choices: [
            {
                text: "[Manfaatkan situasi untuk ASMR desahan sampai HP diperbaiki]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 20, viewers: 10, message: "Kamu mengubah musibah jadi konten audio yang sensual!" },
                failure: { hype: -15, viewers: -40, message: "Kamu panik dan hanya terdengar suara grasak-grusuk." },
            },
        ],
    },
    {
        id: 'wrong-donation-name',
        text: "Kamu salah membaca nama donatur. Kamu memanggil 'Budi' dengan sebutan 'Bento'. Dia marah.",
        choices: [
            {
                text: "[Minta maaf dengan cara yang sangat manja dan sensual]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 18, viewers: 28, message: "Cara minta maafmu lebih seksi dari apapun, dia luluh!" },
                failure: { hype: -12, viewers: -32, message: "Dia tidak terima dan terus menghinamu." },
            },
        ],
    },
];
