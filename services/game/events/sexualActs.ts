import { LivestreamEvent } from '../../../types';

export const sexualActEvents: LivestreamEvent[] = [
    {
        id: 'dildo-challenge',
        text: "Para penonton menantangmu: 'Mainin dildo-nya dong, kak! Sampe muncrat!'",
        choices: [
            {
                text: "[Gunakan dengan agresif & cepat]",
                stat: 'stamina',
                threshold: [78, 88],
                success: { hype: [22, 30], viewers: [55, 65], message: "Kamu 'muncrat' hebat! Penonton menggila!" },
                failure: { hype: [-10, -15], viewers: [-40, -45], message: "Kamu kelelahan sebelum mencapai puncak." },
            },
            {
                text: "[Gunakan dengan sensual & perlahan]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: [18, 25], viewers: [45, 55], message: "Desahanmu membuat semua penonton tegang!" },
                failure: { hype: -5, viewers: -20, message: "Gerakanmu terlihat canggung." },
            },
            {
                text: "[Hanya jilat ujungnya & goda penonton]",
                stat: 'mental',
                threshold: 70,
                success: { hype: [8, 12], viewers: [15, 25], message: "Godaamu berhasil membuat mereka makin penasaran!" },
                failure: { hype: -5, viewers: -15, message: "Penonton merasa di-PHP." },
            },
        ],
    },
    {
        id: 'foot-fetish',
        text: "Banyak komentar aneh muncul: 'Kak, jilatin jempol kakinya dong... please...'",
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
        id: 'tribute-request',
        text: "Donatur teratas meminta 'tribute' khusus: 'Coba bayangin sperma-ku di wajahmu, trus jilat bibirmu.'",
        choices: [
            {
                text: "[Lakukan dengan akting & ekspresi meyakinkan]",
                stat: 'kecantikan',
                threshold: [90, 96],
                success: { hype: [30, 40], viewers: [55, 65], message: "Aktingmu luar biasa! Sultan mengirim gift terbesar!" },
                failure: { hype: [-20, -25], viewers: [-40, -45], message: "Ekspresimu terlihat konyol dan tidak meyakinkan." },
            },
            {
                text: "[Tolak halus: 'Itu buat di sesi private, bang...']",
                stat: 'mental',
                threshold: 85,
                success: { hype: 10, viewers: 20, message: "Kamu berhasil menjual fantasi yang lebih mahal!" },
                failure: { hype: -10, viewers: -30, message: "Penolakanmu menyinggung Sultan." },
            },
        ],
    },
    {
        id: 'squirt-on-camera',
        text: "Sultan request: 'Bisa squirt gak, neng? Kalo bisa, jet pribadi meluncur.'",
        choices: [
            {
                text: "[Fokus dan coba sekuat tenaga]",
                stat: 'kecantikan',
                threshold: 95,
                success: { hype: 40, viewers: 100, message: "BERHASIL! Cairanmu membanjiri kamera! Sultan menepati janji!" },
                failure: { hype: -10, viewers: -30, message: "Kamu mencoba terlalu keras dan malah kram." },
            },
            {
                text: "[Gunakan air mineral untuk memalsukannya]",
                stat: 'mental',
                threshold: 80,
                success: { hype: 20, viewers: 40, message: "Trikmu berhasil! Penonton tidak ada yang sadar." },
                failure: { hype: -25, viewers: -60, message: "Sangat jelas itu palsu! Kamu jadi bahan tertawaan." },
            },
        ],
    },
    {
        id: 'deepthroat-banana',
        text: "Ada pisang di mejamu. Penonton menantang: 'Coba deepthroat pisangnya, tunjukkin seberapa dalem mulutmu bisa nelen.'",
        choices: [
            {
                text: "[Lakukan tanpa ragu sampai habis]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Skill 'oral'-mu luar biasa! Penonton terkesan." },
                failure: { hype: -15, viewers: -40, message: "Kamu tersedak dan batuk-batuk." },
            },
            {
                text: "[Jilat dan emut ujungnya dengan sensual]",
                stat: 'kecantikan',
                threshold: 75,
                success: { hype: 15, viewers: 30, message: "Caramu memakannya lebih erotis daripada deepthroat!" },
                failure: { hype: -5, viewers: -15, message: "Kamu terlihat seperti sedang makan biasa." },
            },
        ],
    },
    {
        id: 'vibrator-on-nipple',
        text: "Penonton melihat vibrator di mejamu. 'Tempelin di putingmu dong, kita mau liat kamu menggeliat keenakan!'",
        choices: [
            {
                text: "[Nyalakan di kecepatan tinggi dan tempelkan]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 25, viewers: 55, message: "Getarannya membuatmu melenguh keras! Hype memuncak!" },
                failure: { hype: -10, viewers: -30, message: "Kamu tidak tahan dan langsung melepaskannya." },
            },
            {
                text: "[Gunakan dengan kecepatan rendah dan goda kamera]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 20, viewers: 40, message: "Ekspresi 'menahan nikmat'-mu sangat seksi." },
                failure: { hype: -5, viewers: -20, message: "Getarannya tidak cukup kuat untuk memberikan reaksi." },
            },
        ],
    },
    {
        id: 'spit-in-mouth',
        text: "Request aneh dari penonton: 'Coba ludahin mulutmu sendiri trus telen lagi. Aku mau liat.'",
        choices: [
            {
                text: "[Lakukan tanpa ragu]",
                stat: 'mental',
                threshold: 85,
                success: { hype: 20, viewers: 40, message: "Aksi liarmu mengejutkan tapi menaikkan hype!" },
                failure: { hype: -10, viewers: -30, message: "Kamu terlihat jijik dan ragu-ragu." },
            },
            {
                text: "[Tolak tapi dengan cara menggoda]",
                stat: 'kecantikan',
                threshold: 80,
                success: { hype: 10, viewers: 15, message: "Kamu berhasil mengalihkan perhatian mereka ke hal lain." },
                failure: { hype: -5, viewers: -15, message: "Penolakanmu membuatmu terlihat tidak seru." },
            },
        ],
    },
    {
        id: 'crotch-sweat',
        text: "Setelah menari, penonton melihat noda keringat di selangkanganmu. 'Wow, becek ya, kak?'",
        choices: [
            {
                text: "[Raba area itu dan cium jarimu]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 30, viewers: 50, message: "Aksi liarmu membuat penonton terkejut dan terangsang!" },
                failure: { hype: -15, viewers: -30, message: "Kamu terlihat jijik dengan keringatmu sendiri." },
            },
            {
                text: "[Jawab: 'Ini bukan keringat, ini 'jus' buat kamu...']",
                stat: 'mental',
                threshold: 85,
                success: { hype: 20, viewers: 30, message: "Jawaban kotormu membuat chat meledak!" },
                failure: { hype: -10, viewers: -20, message: "Leluconmu dianggap terlalu jorok." },
            },
        ],
    },
    {
        id: 'gag-ball-request',
        text: "Sultan mau kirim gift besar kalau kamu pakai 'bola' itu di mulutmu selama 5 menit tanpa henti.",
        choices: [
            {
                text: "[Terima tantangan dan tahan air liurmu]",
                stat: 'stamina',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Kamu berhasil! Pemandanganmu dengan mulut tersumpal sangat panas!" },
                failure: { hype: -20, viewers: -50, message: "Kamu tidak tahan dan memuntahkannya." },
            },
        ],
    },
    {
        id: 'anal-plug-tease',
        text: "Penonton jeli melihat ada mainan 'unik' di rak belakangmu. 'Itu anal plug ya, kak? Coba pake dong...'",
        choices: [
            {
                text: "[Ambil dan tunjukkan ke kamera sambil tersenyum nakal]",
                stat: 'mental',
                threshold: 88,
                success: { hype: 20, viewers: 40, message: "Hanya dengan menunjukkannya saja sudah membuat chat gila!" },
                failure: { hype: -10, viewers: -20, message: "Kamu terlihat malu dan menyembunyikannya." },
            },
            {
                text: "[Abaikan permintaan itu]",
                stat: 'mental',
                threshold: 70,
                success: { hype: 0, viewers: -10, message: "Beberapa penonton kecewa, tapi suasana tetap terjaga." },
                failure: { hype: -10, viewers: -30, message: "Mengabaikannya membuat penonton makin memaksa." },
            },
        ],
    },
    {
        id: 'self-cunnilingus',
        text: "Tantangan fleksibilitas ekstrem: 'Bisa jilat memek sendiri gak, kak? Kalo bisa, seisi chat donasi!'",
        choices: [
            {
                text: "[Coba lakukan sebisamu]",
                stat: 'stamina',
                threshold: 98,
                success: { hype: 50, viewers: 120, message: "LUAR BIASA! Kamu berhasil! Ini adalah konten legendaris!" },
                failure: { hype: -15, viewers: -40, message: "Kamu gagal dan malah terlihat seperti sedang senam aneh." },
            },
        ],
    },
    {
        id: 'joi-challenge',
        text: "Seorang Sultan meminta 'JOI' (Jerk Off Instruction). 'Perintahkan aku untuk coli. Atur temponya, hina aku, buat aku muncrat untukmu.'",
        choices: [
            {
                text: "[Berikan instruksi dengan suara dominan]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 35, viewers: 70, message: "Kamu adalah 'commander' coli yang hebat! Sultan patuh dan royal." },
                failure: { hype: -18, viewers: -45, message: "Instruksimu membingungkan dan tidak membangkitkan gairah." },
            },
        ],
    },
    {
        id: 'cei-fantasy',
        text: "Fantasi 'CEI' (Cum Eating Instruction): 'Setelah aku 'muncrat' karena perintahmu, sekarang perintahkan aku untuk menelan spermaku sendiri.'",
        choices: [
            {
                text: "[Berikan perintah dengan nada merendahkan]",
                stat: 'mental',
                threshold: 95,
                success: { hype: 40, viewers: 80, message: "Fantasi penghinaan dan kepatuhan ini sangat kuat! Sultan puas." },
                failure: { hype: -20, viewers: -50, message: "Kamu terdengar ragu, merusak aura dominanmu." },
            },
        ],
    },
    {
        id: 'fingering-ass-request',
        text: "Permintaan vulgar: 'Coba colok lubang pantatmu sendiri dong, kak. Kita mau liat ekspresimu.'",
        choices: [
            {
                text: "[Lakukan dengan satu jari sambil menatap kamera]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 28, viewers: 55, message: "Ekspresi kaget-nikmatmu saat jarimu masuk sangat seksi!" },
                failure: { hype: -15, viewers: -40, message: "Kamu terlihat kesakitan." },
            },
        ],
    },
    {
        id: 'lactation-fantasy',
        text: "Seorang donatur dengan fetish aneh meminta: 'Pura-pura kamu lagi menyusui. Isap jempolmu sendiri seolah-olah itu puting yang mengeluarkan susu.'",
        choices: [
            {
                text: "[Lakukan dengan ekspresi keibuan yang sensual]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 45, message: "Aktingmu sangat meyakinkan, fantasi mereka terpenuhi." },
                failure: { hype: -10, viewers: -25, message: "Kamu malah terlihat seperti bayi, bukan ibu." },
            },
        ],
    },
    {
        id: 'sounding-fantasy',
        text: "Fantasi ekstrem: 'Bayangin kamu masukin benda tipis ke lubang pipismu. Tunjukin muka keenakan tapi perih.'",
        choices: [
            {
                text: "[Akting dengan ekspresi wajah yang kompleks]",
                stat: 'mental',
                threshold: 94,
                success: { hype: 34, viewers: 68, message: "Aktingmu sangat realistis, penonton dengan fetish ini sangat puas." },
                failure: { hype: -19, viewers: -49, message: "Ekspresimu hanya menunjukkan rasa sakit, tidak ada kenikmatan." },
            },
        ],
    },
    {
        id: 'fisting-fantasy',
        text: "Tantangan dari Sultan: 'Seberapa lebar lubangmu, neng? Coba masukin seluruh kepalan tanganmu ke dalam memekmu (pura-pura).'",
        choices: [
            {
                text: "[Simulasikan dengan melebarkan paha dan akting peregangan]",
                stat: 'stamina',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Imajinasi penonton sudah cukup untuk membuat mereka gila!" },
                failure: { hype: -15, viewers: -40, message: "Aktingmu tidak meyakinkan sama sekali." },
            },
        ],
    },
    {
        id: 'asmr-sex-toys',
        text: "Request: 'Nyalain semua sex toys-mu deket mic. Kita mau dengerin suara getaran dan mesinnya.'",
        choices: [
            {
                text: "[Buat 'orkestra' suara sex toys]",
                stat: 'popularitas',
                threshold: 80,
                success: { hype: 20, viewers: 35, message: "Konser ASMR-mu sangat unik dan disukai!" },
                failure: { hype: -10, viewers: -20, message: "Suaranya terlalu bising dan tidak enak didengar." },
            },
        ],
    },
    {
        id: 'pussy-slapping',
        text: "Tantangan: 'Tampar memekmu sendiri berulang kali. Kami mau dengar suaranya yang basah dan liat jadi merah.'",
        choices: [
            {
                text: "[Lakukan dengan ritme yang sensual]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 26, viewers: 52, message: "Suara 'plak-plok' basah itu adalah musik di telinga penonton!" },
                failure: { hype: -12, viewers: -32, message: "Pukulanmu terlalu lemah." },
            },
        ],
    },
    {
        id: 'clit-rubbing-fast',
        text: "Donatur teratas tidak sabaran. 'Jangan lama-lama! Ucek-ucek klitorismu yang cepet! Bikin muncrat sekarang juga!'",
        choices: [
            {
                text: "[Turuti dan percepat gerakan tanganmu]",
                stat: 'stamina',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Kamu mencapai orgasme cepat dan dahsyat! Sultan puas!" },
                failure: { hype: -15, viewers: -40, message: "Tanganmu kram dan kamu gagal orgasme." },
            },
        ],
    },
];