import { LivestreamEvent } from '../../../types';

export const cosplayEvents: LivestreamEvent[] = [
    {
        id: 'cosplay-nurse',
        text: "Donatur teratas mengirimimu kostum perawat seksi. 'Jadilah perawat pribadiku malam ini, suster. Aku butuh 'suntikan' khusus darimu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Periksa 'suhu tubuh'nya dengan sensual]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Pemeriksaanmu membuat 'pasien' makin panas!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat seperti perawat sungguhan, tidak seksi." },
            },
            {
                text: "[Hukum dia karena 'tidak patuh' minum obat]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Sikap dominanmu sebagai perawat galak sangat disukai!" },
                failure: { hype: -15, viewers: -40, message: "Akting galakmu tidak meyakinkan." },
            },
        ],
    },
    {
        id: 'cosplay-policewoman',
        text: "Kamu memakai kostum polisi wanita yang sangat ketat. 'Ibu Polwan, saya mengaku bersalah... tolong borgol dan geledah saya!' pinta seorang donatur.",
        tags: ['kostum'],
        choices: [
            {
                text: "[Bentak dia & lakukan 'penggeledahan' di tubuhmu sendiri]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 30, viewers: 65, message: "Aksi 'penggeledahan' kasarmu membuat penonton liar!" },
                failure: { hype: -15, viewers: -45, message: "Kamu terlihat ragu-ragu, tidak ada wibawa." },
            },
            {
                text: "[Goda dia: 'Hukumannya di 'penjara' pribadi saya...']",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 25, viewers: 55, message: "Semua penonton ingin ditangkap olehmu!" },
                failure: { hype: -10, viewers: -30, message: "Godaanmu tidak semenarik kostumnya." },
            },
        ],
    },
    {
        id: 'cosplay-catgirl',
        text: "Dengan telinga dan ekor kucing, kamu mengeong imut. 'Jadi kucingku yang nurut ya, meow. Coba jilatin 'susu' di mangkok ini.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Menjilat 'susu' (susu kental manis) dari mangkok]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 25, viewers: 50, message: "Tingkah imut dan jorokmu sebagai kucing sangat menggemaskan!" },
                failure: { hype: -10, viewers: -25, message: "Kamu terlihat jijik dan berantakan." },
            },
            {
                text: "[Menggesekkan tubuhmu ke kamera seperti kucing]",
                stat: 'popularitas',
                threshold: 85,
                success: { hype: 20, viewers: 40, message: "Gerakanmu membuat para 'majikan' ingin mengadopsimu!" },
                failure: { hype: -5, viewers: -20, message: "Gerakanmu kaku seperti robot." },
            },
        ],
    },
    {
        id: 'cosplay-maid',
        text: "Kamu mengenakan kostum maid Perancis. 'Pelayanku, bersihkan 'debu' di celanaku dengan mulutmu,' perintah seorang Sultan.",
        tags: ['kostum'],
        choices: [
            {
                text: "[Berlutut dan berpura-pura membersihkannya]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 30, viewers: 60, message: "Sikap patuhmu sebagai pelayan sangat meyakinkan!" },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat terpaksa dan tidak natural." },
            },
        ],
    },
    {
        id: 'cosplay-highschool',
        text: "Kamu memakai seragam SMA Jepang (seifuku) yang minim. 'Kamu dihukum setelah sekolah! Buka rokmu dan tunjukkan nilai 'biologi'-mu!'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Singkap rok dan pamerkan celana dalammu]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 55, message: "Pemandangan CD putihmu membuat para 'guru' bernafsu!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terlalu malu-malu." },
            },
            {
                text: "[Jawab: 'Nilai A+ ku ada di dalam sini, pak guru...']",
                stat: 'mental',
                threshold: 82,
                success: { hype: 20, viewers: 40, message: "Jawaban nakalmu membuat fantasi semakin liar!" },
                failure: { hype: -5, viewers: -20, message: "Leluconmu garing." },
            },
        ],
    },
    {
        id: 'cosplay-secretary',
        text: "Dengan kacamata dan rok span ketat, kamu roleplay jadi sekretaris. 'Lembur malam ini ya. Kerjaanmu... di bawah mejaku.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Masuk ke bawah meja dan menghilang dari kamera]",
                stat: 'popularitas',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Imajinasi penonton meledak! Suara 'slurp' imajiner terdengar." },
                failure: { hype: -10, viewers: -25, message: "Penonton kecewa karena tidak ada yang terlihat." },
            },
        ],
    },
    {
        id: 'cosplay-flight-attendant',
        text: "Kamu memakai seragam pramugari. 'Turbulensi! Tolong pasang 'sabuk pengaman' dan berikan 'bantuan pernapasan' dari mulut ke mulut!'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Berpura-pura panik dan memberikan 'CPR' ke kamera]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Pelayanan daruratmu sangat 'first class'!" },
                failure: { hype: -10, viewers: -30, message: "Aktingmu buruk dan terlihat konyol." },
            },
        ],
    },
    {
        id: 'cosplay-cheerleader',
        text: "Dengan rok mini dan pom-pom, kamu jadi cheerleader. 'Semangatin aku dong! Kalau aku 'skor', kamu harus telanjang!'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Lakukan tarian penyemangat yang sangat seksi]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Gerakan lincah dan rok minimu adalah kombinasi maut!" },
                failure: { hype: -12, viewers: -32, message: "Tarianmu tidak bersemangat." },
            },
        ],
    },
    {
        id: 'cosplay-superheroine',
        text: "Kamu memakai kostum Wonder Woman lateks. 'Pahlawanku, aku ditawan! Tolong kalahkan 'monster' di celanaku dengan 'kekuatan super'-mu!'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Berpose heroik sambil meraba selangkanganmu]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Kamu adalah pahlawan kesangean yang kami butuhkan!" },
                failure: { hype: -15, viewers: -40, message: "Posemu kaku dan tidak terlihat kuat." },
            },
        ],
    },
    {
        id: 'cosplay-videogame-character',
        text: "Kamu cosplay Tifa Lockhart. 'Final Hentai! Lakukan 'Limit Break'-mu di wajahku!' pinta seorang fans berat.",
        tags: ['kostum'],
        choices: [
            {
                text: "[Berpose ikonik Tifa sambil pasang muka sange]",
                stat: 'popularitas',
                threshold: 93,
                success: { hype: 35, viewers: 75, message: "Para wibu di chat menggila! Hujan donasi!" },
                failure: { hype: -18, viewers: -48, message: "Kamu salah pose dan dikritik fans." },
            },
        ],
    },
    // --- 10 NEW SCENARIOS ---
    {
        id: 'cosplay-bunny-girl',
        text: "Kamu memakai kostum bunny girl lengkap dengan stocking jaring. 'Kelinciku, coba lompat-lompat sambil pamerin ekor bulatmu itu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Melompat sambil menggoyangkan ekor]",
                stat: 'stamina',
                threshold: 82,
                success: { hype: 25, viewers: 50, message: "Kelincahanmu sangat menggemaskan dan seksi!" },
                failure: { hype: -10, viewers: -25, message: "Lompatanmu tidak bertenaga." },
            },
        ],
    },
    {
        id: 'cosplay-teacher-strict',
        text: "Kamu cosplay ibu guru killer. 'Sebagai hukuman, kamu harus menulis 'Saya Murid Nakal' 100 kali... di pantatmu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Ambil spidol dan mulai menulis di pantatmu]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Pemandangan pantatmu yang 'dihukum' sangat panas!" },
                failure: { hype: -15, viewers: -40, message: "Kamu tidak bisa menjangkau dan tulisanmu berantakan." },
            },
        ],
    },
    {
        id: 'cosplay-devil-girl',
        text: "Dengan tanduk dan trisula, kamu jadi iblis penggoda. 'Iblisku, coba bisikin dosa-dosa terliar yang akan kamu lakukan padaku.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Bisikkan fantasi dominasi yang kejam]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 55, message: "Bisikanmu membuat penonton merinding ketakutan dan bernafsu!" },
                failure: { hype: -12, viewers: -35, message: "Fantasi yang kamu bisikkan tidak cukup 'jahat'." },
            },
        ],
    },
    {
        id: 'cosplay-angel',
        text: "Kamu memakai kostum malaikat dengan sayap putih. 'Malaikatku, apakah 'surga' di antara pahamu terbuka untuk pendosa sepertiku?'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Buka paha perlahan: 'Pintu surga selalu terbuka...']",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 26, viewers: 52, message: "Kontras antara malaikat suci dan tindakan cabulmu sangat kuat!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat ragu-ragu." },
            },
        ],
    },
    {
        id: 'cosplay-nun',
        text: "Kamu memakai kostum biarawati. 'Suster, aku ingin mengaku dosa... dosaku adalah menginginkan tubuhmu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Jawab: 'Tuhan mengampuni, tapi Suster tidak...']",
                stat: 'mental',
                threshold: 91,
                success: { hype: 31, viewers: 61, message: "Jawaban dominanmu dalam kostum suci sangat panas!" },
                failure: { hype: -16, viewers: -41, message: "Jawabanmu tidak sesuai dengan karakter." },
            },
        ],
    },
    {
        id: 'cosplay-gamer-girl',
        text: "Dengan headset dan jersey e-sport, kamu jadi gamer girl. 'Mabarku payah. Hibur aku dong. Coba mainin 'joystick'-ku pake mulutmu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Simulasikan fellatio pada joystick konsol]",
                stat: 'kecantikan',
                threshold: 84,
                success: { hype: 24, viewers: 48, message: "Skill 'oral'-mu di joystick membuat para gamer berdonasi!" },
                failure: { hype: -10, viewers: -28, message: "Kamu terlihat canggung dengan joystick-nya." },
            },
        ],
    },
    {
        id: 'cosplay-miko-shrine-maiden',
        text: "Kamu memakai kostum Miko (gadis kuil Shinto). 'Wahai Miko-sama, tolong sucikan 'batang'-ku dengan 'ritual' mulutmu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Lakukan 'ritual' pembersihan dengan mulutmu]",
                stat: 'mental',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Fantasi menodai kesucian ini sangat populer di kalangan wibu!" },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat tidak menghayati peran." },
            },
        ],
    },
    {
        id: 'cosplay-lifeguard',
        text: "Kamu memakai baju renang penjaga pantai. 'Tolong! Aku tenggelam dalam nafsu! Beri aku napas buatan dari mulut ke 'mulut'!'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Berikan 'napas buatan' ke kamera]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Semua orang ingin 'diselamatkan' olehmu!" },
                failure: { hype: -10, viewers: -30, message: "Aktingmu tidak meyakinkan." },
            },
        ],
    },
    {
        id: 'cosplay-witch',
        text: "Dengan topi penyihir, kamu mengaduk kuali. 'Penyihir, aku butuh 'ramuan cinta'. Bahannya dari 'cairan' vaginamu.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Pura-pura mengambil 'cairan' dan masukkan ke kuali]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Fantasi jorok dan magismu sangat kreatif!" },
                failure: { hype: -12, viewers: -38, message: "Kamu terlihat jijik dengan idenya." },
            },
        ],
    },
    {
        id: 'cosplay-office-lady',
        text: "Kamu cosplay OL (Office Lady) Jepang dengan setelan ketat. 'Presentasimu bagus. Sebagai bonus, presentasikan 'aset'-mu di mejaku.'",
        tags: ['kostum'],
        choices: [
            {
                text: "[Naik ke meja dan pamerkan pantatmu]",
                stat: 'popularitas',
                threshold: 86,
                success: { hype: 27, viewers: 57, message: "Pemandangan 'aset' perusahaanmu sangat memuaskan 'atasan'!" },
                failure: { hype: -11, viewers: -37, message: "Kamu hampir terpeleset dari meja." },
            },
        ],
    },
];