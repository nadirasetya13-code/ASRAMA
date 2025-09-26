import { LivestreamEvent } from '../../../types';

export const groupAndCuckoldEvents: LivestreamEvent[] = [
    {
        id: 'fantasy-gangbang',
        text: "Para Sultan berkolaborasi. 'Kami mau lihat kamu digilir 5 'kontol' imajiner sekaligus. Tunjukkan ekspresi kewalahanmu menerima semuanya!'",
        choices: [
            {
                text: "[Akting kewalahan menerima semua 'kontol']",
                stat: 'stamina',
                threshold: 95,
                success: { hype: 40, viewers: 85, message: "Aktingmu luar biasa! Seolah-olah semua lubangmu terisi penuh!" },
                failure: { hype: -20, viewers: -55, message: "Kamu terlihat kebingungan dan tidak bisa mengimbangi." },
            },
            {
                text: "[Fokus pada ekspresi wajah penuh nafsu]",
                stat: 'kecantikan',
                threshold: 94,
                success: { hype: 35, viewers: 75, message: "Wajah sange-mu sudah cukup menceritakan segalanya!" },
                failure: { hype: -15, viewers: -45, message: "Ekspresimu tidak meyakinkan." },
            },
        ],
    },
    {
        id: 'fantasy-threesome-mmf',
        text: "Request roleplay: 'Pura-pura kamu lagi threesome sama dua cowok. Satu jilatin memekmu, satu lagi masukin mulutmu.'",
        choices: [
            {
                text: "[Simulasikan dengan dildo dan tanganmu]",
                stat: 'stamina',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Multitasking-mu sangat panas! Fantasi penonton terpenuhi." },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat kikuk dan tidak sinkron." },
            },
        ],
    },
    {
        id: 'fantasy-bukkake',
        text: "Tantangan fantasi dari grup donatur: 'Bayangin kami semua muncrat di mukamu. Tahan mukamu, jangan dilap. Trus jilat semua 'sperma'-nya.'",
        choices: [
            {
                text: "[Tutup mata dan berakting menerima semuanya]",
                stat: 'mental',
                threshold: 96,
                success: { hype: 40, viewers: 80, message: "Aktingmu yang pasrah dan jorok membuat mereka menggila!" },
                failure: { hype: -25, viewers: -60, message: "Kamu menunjukkan ekspresi jijik yang merusak fantasi." },
            },
        ],
    },
    {
        id: 'cuckold-watching-fantasy',
        text: "Seorang donatur bernama 'SuamiCuckold' meminta: 'Aku mau kamu main sama 'selingkuhanmu' (dildo). Tapi kamu harus terus liatin aku lewat kamera, biar aku liat istriku dinikmati orang lain.'",
        choices: [
            {
                text: "[Mainkan dildo sambil menatap kamera dengan tatapan mengejek]",
                stat: 'mental',
                threshold: 93,
                success: { hype: 35, viewers: 70, message: "Tatapanmu membuatnya merasa terhina dan terangsang! Donasi besar!" },
                failure: { hype: -18, viewers: -48, message: "Kamu lupa menatap kamera dan fokus pada dildo." },
            },
        ],
    },
    {
        id: 'cuckold-cleanup-fantasy',
        text: "Request lanjutan dari 'SuamiCuckold': 'Sekarang, 'selingkuhanmu' udah muncrat di dalem. Pura-pura jilatin dan bersihin sisa spermanya dari memekmu.'",
        choices: [
            {
                text: "[Jilati jarimu seolah membersihkan 'sperma']",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Aksi 'bersih-bersih'-mu adalah penghinaan termanis baginya." },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat tidak serius melakukannya." },
            },
        ],
    },
    {
        id: 'hotwife-roleplay',
        text: "Roleplay: 'Aku suamimu, dan aku mau kamu dandan paling jalang buat temen-temenku. Pamerin tubuhmu ke mereka (penonton) atas perintahku.'",
        choices: [
            {
                text: "[Patuhi dan mulai pamerkan tubuhmu ke penonton]",
                stat: 'popularitas',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Penonton suka menjadi 'teman-teman' si suami!" },
                failure: { hype: -12, viewers: -38, message: "Kamu terlihat ragu-ragu dengan perintahnya." },
            },
        ],
    },
    {
        id: 'gloryhole-fantasy',
        text: "Fantasi: 'Pura-pura kamu lagi di bilik gloryhole. Cuma mulutmu yang keliatan. Layani semua 'kontol' anonim yang datang.'",
        choices: [
            {
                text: "[Gunakan dildo atau pisang sebagai properti]",
                stat: 'kecantikan',
                threshold: 91,
                success: { hype: 32, viewers: 62, message: "Misteri dan aksi oralmu sangat menggoda!" },
                failure: { hype: -16, viewers: -42, message: "Propertimu terlihat konyol dan tidak meyakinkan." },
            },
        ],
    },
    {
        id: 'orgy-sound-asmr',
        text: "Request ASMR: 'Kami gak mau liat apa-apa. Cuma mau denger suara desahanmu seolah-olah kamu lagi di tengah-tengah pesta seks.'",
        choices: [
            {
                text: "[Ciptakan berbagai macam desahan dan suara kecipak]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 50, message: "Teater pikiranmu berhasil! Imajinasi penonton jadi liar." },
                failure: { hype: -15, viewers: -35, message: "Suaramu monoton dan tidak terdengar seperti pesta seks." },
            },
        ],
    },
    {
        id: 'wife-sharing-story',
        text: "Seorang donatur meminta: 'Ceritain dong fantasi terliarmu kalo kamu punya suami dan dia nawarin kamu ke temennya. Ceritain dengan detail.'",
        choices: [
            {
                text: "[Karang cerita yang sangat vulgar dan detail]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 25, viewers: 45, message: "Ceritamu membuat para cuckold di chat berdonasi." },
                failure: { hype: -10, viewers: -25, message: "Ceritamu tidak menarik dan membosankan." },
            },
        ],
    },
    {
        id: 'threesome-ffm-fantasy',
        text: "Seorang penonton cewek (atau yang pura-pura) meminta: 'Ajak aku threesome dong kak. Kita mainin 'punya' abang Sultan ini bareng-bareng.'",
        choices: [
            {
                text: "[Ajak penonton cewek itu dan mulai mengarahkan fantasi]",
                stat: 'popularitas',
                threshold: 89,
                success: { hype: 29, viewers: 59, message: "Fantasi lesbian dan threesome membuat chat meledak!" },
                failure: { hype: -14, viewers: -39, message: "Kamu terlihat canggung berinteraksi dengan sesama jenis." },
            },
        ],
    },
];
