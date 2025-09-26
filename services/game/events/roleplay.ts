import { LivestreamEvent } from '../../../types';

export const roleplayAndPerformanceEvents: LivestreamEvent[] = [
    {
        id: 'dirty-talk',
        text: "Seorang 'Sultan' meminta: 'Coba panggil aku 'Daddy' sambil ngomong jorok. Aku mau dengar kamu jadi jalangku.'",
        choices: [
            {
                text: "[Patuhi dengan suara serak & mendesah]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 25, viewers: 50, message: "Kata-kata kotormu membuat Sultan mengirim gift besar!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terdengar kaku dan tidak meyakinkan." },
            },
            {
                text: "[Lakukan dengan malu-malu tapi tetap patuh]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 15, viewers: 30, message: "Sikap malumu justru dianggap imut oleh penonton!" },
                failure: { hype: -5, viewers: -15, message: "Kamu tidak bisa mengucapkan kata-katanya." },
            },
        ],
    },
    {
        id: 'asmr-desah',
        text: "Banyak penonton memintamu melakukan ASMR. 'Desahin nama-nama top donatur dong, kak...'",
        choices: [
            {
                text: "[Desahkan nama mereka satu per satu]",
                stat: 'kecantikan',
                threshold: 78,
                success: { hype: 20, viewers: 35, message: "Desahanmu membuat para donatur bangga dan makin royal!" },
                failure: { hype: -10, viewers: -20, message: "Desahanmu terdengar dipaksakan." },
            },
            {
                text: "[Tulis nama mereka di dadamu dengan spidol]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 25, viewers: 50, message: "Aksimu dianggap 'fan service' tingkat dewa!" },
                failure: { hype: -5, viewers: -25, message: "Tulisanmu jelek dan tidak terlihat jelas." },
            },
        ],
    },
    {
        id: 'roleplay-teacher',
        text: "Seorang donatur meminta roleplay: 'Jadi guru cabulku dong, hukum aku karena aku murid yang nakal...'",
        choices: [
            {
                text: "[Ambil penggaris dan bertindak galak]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 25, viewers: 40, message: "Aktingmu sebagai guru dominan sangat meyakinkan!" },
                failure: { hype: -10, viewers: -30, message: "Kamu lebih terlihat seperti guru TK, tidak ada aura dominan." },
            },
            {
                text: "[Buka kancing kemeja dan menggodanya]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 20, viewers: 35, message: "Guru sepertimu membuat semua murid ingin dihukum!" },
                failure: { hype: -5, viewers: -20, message: "Godaanmu tidak natural." },
            },
        ],
    },
    {
        id: 'read-erotic-story',
        text: "Seorang penonton mengirim link cerita erotis. 'Coba bacain cerita ini dengan suara mendesah...'",
        choices: [
            {
                text: "[Baca dengan penuh penghayatan]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 20, viewers: 30, message: "Suaramu membuat cerita itu jadi hidup! Banyak yang terangsang." },
                failure: { hype: -10, viewers: -25, message: "Kamu tertawa di tengah-tengah, merusak suasana." },
            },
        ],
    },
    {
        id: 'sell-worn-panties',
        text: "Chat menjadi ramai. Banyak yang mau membeli celana dalam bekas pakai-mu. 'Lelang dong, kak! Aku bid paling tinggi!'",
        choices: [
            {
                text: "[Lepas CD-mu di depan kamera dan mulai lelang]",
                stat: 'popularitas',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Lelang berlangsung panas! Kamu dapat banyak donasi!" },
                failure: { hype: -15, viewers: -40, message: "Kamu ragu-ragu dan penonton kehilangan minat." },
            },
            {
                text: "[Janjikan lelang setelah stream berakhir]",
                stat: 'mental',
                threshold: 70,
                success: { hype: 10, viewers: 20, message: "Kamu berhasil membuat mereka penasaran untuk stream berikutnya." },
                failure: { hype: -5, viewers: -15, message: "Penonton menganggapmu hanya bercanda." },
            },
        ],
    },
    {
        id: 'lick-screen',
        text: "Permintaan aneh muncul: 'Jilat layar HP-nya dong, bayangin itu 'punya' aku.'",
        choices: [
            {
                text: "[Jilat dengan gerakan sensual dari atas ke bawah]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Fantasi penonton terpenuhi! Hujan gift!" },
                failure: { hype: -10, viewers: -25, message: "Terlihat aneh dan tidak seksi sama sekali." },
            },
        ],
    },
    {
        id: 'singing-sexy-song',
        text: "Request: 'Coba nyanyiin lagu 'Cicak-Cicak di Dinding' tapi dengan gaya dan desahan sange.'",
        choices: [
            {
                text: "[Nyanyikan dengan penuh penjiwaan sensual]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 20, viewers: 40, message: "Lagu anak-anak itu jadi terdengar sangat porno! Penonton suka!" },
                failure: { hype: -10, viewers: -25, message: "Kamu fals dan malah terdengar lucu, bukan seksi." },
            },
        ],
    },
    {
        id: 'makeup-tutorial-sexy',
        text: "Tantangan: 'Bikin tutorial pake lipstik tapi sambil mainin lidah dan bibirmu, jangan berhenti.'",
        choices: [
            {
                text: "[Lakukan dengan tatapan mata menggoda ke kamera]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 25, viewers: 45, message: "Caramu memakai lipstik lebih panas dari adegan film dewasa!" },
                failure: { hype: -10, viewers: -20, message: "Lipstikmu berantakan dan terlihat seperti badut." },
            },
        ],
    },
    {
        id: 'food-play-chocolate',
        text: "Tantangan: 'Lelehin coklat trus olesin di bibirmu dan jilat perlahan-lahan.'",
        choices: [
            {
                text: "[Lakukan dengan sensual]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Pemandangan itu sangat manis dan erotis!" },
                failure: { hype: -10, viewers: -25, message: "Coklatnya meleleh ke mana-mana, sangat berantakan." },
            },
        ],
    },
    {
        id: 'yoga-pose-sexy',
        text: "Seorang penonton gym-freak meminta: 'Coba lakuin pose yoga 'Downward Dog' dengan kamera dari belakang.'",
        choices: [
            {
                text: "[Lakukan dengan pakaian ketat]",
                stat: 'stamina',
                threshold: 75,
                success: { hype: 25, viewers: 50, message: "Pemandangan pantatmu dari sudut itu sempurna!" },
                failure: { hype: -10, viewers: -30, message: "Kamu kehilangan keseimbangan dan jatuh." },
            },
        ],
    },
    {
        id: 'spank-request',
        text: "Tantangan dari chat: 'Spank pantatmu sendiri 10 kali, harus sampai merah dan bunyi!'",
        choices: [
            {
                text: "[Lakukan dengan sekuat tenaga]",
                stat: 'stamina',
                threshold: 70,
                success: { hype: 20, viewers: 45, message: "Suara 'plak!' yang keras membuat chat menggila!" },
                failure: { hype: -10, viewers: -20, message: "Pukulanmu terlalu pelan dan tidak memuaskan." },
            },
            {
                text: "[Lakukan sambil mendesah kesakitan]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 18, viewers: 35, message: "Desahanmu menambah fantasi BDSM para penonton." },
                failure: { hype: -5, viewers: -15, message: "Aktingmu terlihat buruk." },
            },
        ],
    },
];
