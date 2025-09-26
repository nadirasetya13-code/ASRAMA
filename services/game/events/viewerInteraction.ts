import { LivestreamEvent } from '../../../types';

export const viewerInteractionEvents: LivestreamEvent[] = [
    {
        id: 'sultan-buka',
        text: "Seorang 'Sultan' masuk dan langsung to the point: 'Buka dong, neng. Abang mau liat semuanya. Paus menantimu.'",
        choices: [
            {
                text: "[Buka Baju & Pamerkan Dada]",
                stat: 'kecantikan',
                threshold: [80, 90],
                success: { hype: [25, 35], viewers: [60, 80], message: "Sultan puas! Hype meledak & gift dikirim!" },
                failure: { hype: [-15, -20], viewers: [-50, -60], message: "Kamu ragu-ragu, Sultan kecewa dan pergi." },
            },
            {
                text: "[Jawab genit: 'Ih, abang maennya kasar...']",
                stat: 'mental',
                threshold: 90,
                success: { hype: [15, 20], viewers: [30, 40], message: "Sultan tertantang, perang gift dimulai!" },
                failure: { hype: [-10, -15], viewers: [-30, -40], message: "Jawabanmu dianggap tidak menghargai Sultan." },
            },
        ],
    },
    {
        id: 'donation-war-vulgar',
        text: "Dua 'Sultan' mulai perang donasi. Satu meminta 'lihatin belahan', yang lain 'goyangin pantat'. Keduanya menjanjikan gift besar!",
        choices: [
            {
                text: "[Prioritaskan permintaan 'belahan dada']",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 30, viewers: 50, message: "Kamu memuaskan satu Sultan, perang donasi makin panas!" },
                failure: { hype: -20, viewers: -60, message: "Kedua Sultan merasa kamu matre dan pergi." },
            },
            {
                text: "[Coba lakukan keduanya sekaligus]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 25, viewers: 70, message: "Multitasking-mu membuat chat meledak!" },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat kikuk dan gagal memuaskan keduanya." },
            },
            {
                text: "[Goda keduanya: 'Siapa yang giftnya lebih besar?']",
                stat: 'mental',
                threshold: 90,
                success: { hype: 20, viewers: 60, message: "Kamu berhasil memanipulasi mereka! Gift mengalir!" },
                failure: { hype: -10, viewers: -30, message: "Trikmu gagal dan kamu dianggap sombong." },
            },
        ],
    },
    {
        id: 'hater-comment',
        text: "Seorang hater berkomentar: 'Muka editan, body palsu. Palingan suaranya juga jelek.'",
        choices: [
            {
                text: "[Balas dengan elegan: 'Makasih lho udah merhatiin']",
                stat: 'mental',
                threshold: [88, 95],
                success: { hype: [15, 20], viewers: [30, 35], message: "Jawabanmu membuat para fans membelamu! Hype naik!" },
                failure: { hype: [-20, -25], viewers: [-50, -55], message: "Kamu terpancing emosi dan merusak suasana." },
            },
            {
                text: "[Buktikan mereka salah dengan goyangan maut]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 20, viewers: 40, message: "Goyanganmu membungkam si hater! Penonton bersorak." },
                failure: { hype: -10, viewers: -25, message: "Goyanganmu terlihat kaku karena kesal." },
            },
        ],
    },
    {
        id: 'drunk-viewer',
        text: "Seorang penonton yang terdengar mabuk mulai ngomong ngawur dan sangat vulgar di kolom donasi.",
        choices: [
            {
                text: "[Layani omongannya dengan sabar]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 15, viewers: 20, message: "Orang mabuk cenderung royal! Kamu berhasil mengurasnya." },
                failure: { hype: -10, viewers: -40, message: "Kamu terpancing dan bertengkar dengannya." },
            },
            {
                text: "[Abaikan dan fokus pada donatur lain]",
                stat: 'popularitas',
                threshold: 70,
                success: { hype: 5, viewers: -5, message: "Penonton lain menghargai profesionalisme-mu." },
                failure: { hype: -10, viewers: -30, message: "Mengabaikannya membuat chat jadi kacau." },
            },
        ],
    },
    {
        id: 'female-admirer',
        text: "Seorang penonton cewek berkomentar: 'Cantik banget, kak. Aku jadi pengen nyobain cewek...'",
        choices: [
            {
                text: "[Goda dia kembali: 'Sini, biar aku ajarin...']",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 20, viewers: 50, message: "Penonton pria dan wanita jadi heboh! Segmentasi pasar baru!" },
                failure: { hype: -5, viewers: -10, message: "Godaanmu terasa canggung." },
            },
            {
                text: "[Ucapkan terima kasih dengan tulus]",
                stat: 'kecantikan',
                threshold: 70,
                success: { hype: 10, viewers: 20, message: "Keramahanmu menarik lebih banyak penonton wanita." },
                failure: { hype: -5, viewers: -10, message: "Kamu terlihat tidak tertarik." },
            },
        ],
    },
    {
        id: 'forced-compliment',
        text: "Donatur teratas adalah orang yang kamu tahu pelit dan menyebalkan. Dia meminta: 'Puji dong 'kejantanan'-ku, bilang aku hebat.'",
        choices: [
            {
                text: "[Puji dengan meyakinkan seolah kamu tulus]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 20, viewers: 30, message: "Aktingmu berhasil! Dia mengirim gift lagi karena bangga." },
                failure: { hype: -15, viewers: -40, message: "Sarkasmemu terlalu jelas, dia marah dan pergi." },
            },
        ],
    },
    {
        id: 'praise-penis-size-imaginary',
        text: "Seorang donatur dengan nama 'KecilTapiGanas' meminta: 'Coba pura-pura liat penisku, trus puji ukurannya.'",
        choices: [
            {
                text: "[Puji dengan akting meyakinkan]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 20, viewers: 30, message: "Egonya terpuaskan! Dia mengirim donasi besar." },
                failure: { hype: -10, viewers: -20, message: "Kamu tidak bisa menahan tawa saat memujinya." },
            },
        ],
    },
    {
        id: 'confession-time',
        text: "Penonton minta kamu jujur: 'Apa hal paling nakal yang pernah kamu lakuin di luar stream?'",
        choices: [
            {
                text: "[Ceritakan kisah yang sedikit dilebih-lebihkan]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Ceritamu membuat mereka makin penasaran dengan kehidupan pribadimu!" },
                failure: { hype: -10, viewers: -25, message: "Ceritamu membosankan dan tidak ada yang percaya." },
            },
            {
                text: "[Alihkan dengan jawaban menggoda]",
                stat: 'popularitas',
                threshold: 75,
                success: { hype: 15, viewers: 20, message: "Kamu berhasil membuat mereka lupa dengan pertanyaannya." },
                failure: { hype: -5, viewers: -15, message: "Pengalihanmu terlalu kentara." },
            },
        ],
    },
    {
        id: 'choose-a-husband',
        text: "Para Sultan bersaing. 'Pilih satu dari kami jadi 'suami'-mu malam ini, neng! Yang terpilih dapat Paus!'",
        choices: [
            {
                text: "[Pilih donatur teratas secara terang-terangan]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Sultan terpilih sangat bangga! Tapi yang lain sedikit cemburu." },
                failure: { hype: -15, viewers: -40, message: "Pilihanmu membuat Sultan yang lain marah dan pergi." },
            },
            {
                text: "[Jawab diplomatis: 'Kalian semua suamiku...']",
                stat: 'mental',
                threshold: 90,
                success: { hype: 25, viewers: 50, message: "Jawabanmu membuat SEMUA Sultan merasa spesial! Hujan gift!" },
                failure: { hype: -10, viewers: -25, message: "Jawabanmu dianggap tidak tulus." },
            },
        ],
    },
    {
        id: 'hypnosis-request',
        text: "Seorang donatur meminta: 'Aku mau kamu hipnotis aku. Bilang aku 'good boy' dan akan patuh padamu.'",
        choices: [
            {
                text: "[Lakukan dengan suara lembut dan dominan]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 20, viewers: 30, message: "Kamu berhasil memainkan fantasinya, dia jadi donatur setia!" },
                failure: { hype: -10, viewers: -25, message: "Suaramu tidak meyakinkan, hipnotismu gagal total." },
            },
        ],
    },
    {
        id: 'auction-personal-item',
        text: "Seorang Sultan melihat bantal di belakangmu. 'Aku mau bantal itu. Yang bekas kamu tidurin. Aku bayar 10 Paus.' Lelang pun dimulai!",
        choices: [
            {
                text: "[Terima dan mulai lelang dari 10 Paus]",
                stat: 'popularitas',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Perang donasi terjadi! Bantalmu laku dengan harga fantastis!" },
                failure: { hype: -15, viewers: -40, message: "Tidak ada yang menawar lebih tinggi, Sultan kecewa." },
            },
        ],
    },
    {
        id: 'troll-soundboard',
        text: "Seorang penonton iseng mengirim donasi dengan suara kentut yang keras lewat soundboard.",
        choices: [
            {
                text: "[Tertawa dan membalas dengan suara kentut palsu]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 15, viewers: 20, message: "Kamu mengubah keisengan jadi hiburan! Penonton suka." },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat kesal dan merusak suasana." },
            },
        ],
    },
    {
        id: 'deepfake-threat-joke',
        text: "Penonton bercanda: 'Hati-hati, kak. Muka sange-mu udah aku jadiin deepfake lho.'",
        choices: [
            {
                text: "[Balas: 'Kalo mau yang asli, donasi dong...']",
                stat: 'mental',
                threshold: 92,
                success: { hype: 22, viewers: 42, message: "Jawabanmu yang cerdas mengubah ancaman jadi peluang bisnis!" },
                failure: { hype: -18, viewers: -42, message: "Kamu terlihat takut dan panik." },
            },
        ],
    },
    {
        id: 'guess-the-kink',
        text: "Donatur teratas memberimu teka-teki: 'Aku punya fetish aneh. Coba tebak apa. Kalau benar, Paus buatmu.'",
        choices: [
            {
                text: "[Tebak 'kaki']",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 30, message: "Tebakanmu benar! Pengetahuanmu tentang fetish sangat luas." },
                failure: { hype: -5, viewers: -10, message: "Tebakanmu salah." },
            },
            {
                text: "[Tebak 'penghinaan']",
                stat: 'mental',
                threshold: 80,
                success: { hype: 20, viewers: 30, message: "Tebakanmu benar! Kamu sangat peka." },
                failure: { hype: -5, viewers: -10, message: "Tebakanmu salah." },
            },
        ],
    },
    {
        id: 'vr-date-request',
        text: "Seorang Sultan dari luar negeri meminta: 'Kapan-kapan kita VR date ya. Biar aku bisa 'nyentuh' kamu langsung.'",
        choices: [
            {
                text: "[Jawab 'Boleh, tapi charge-nya beda, sayang...']",
                stat: 'mental',
                threshold: 85,
                success: { hype: 18, viewers: 28, message: "Kamu membuka potensi pendapatan baru di masa depan!" },
                failure: { hype: -8, viewers: -18, message: "Jawabanmu terdengar terlalu matre." },
            },
        ],
    },
];