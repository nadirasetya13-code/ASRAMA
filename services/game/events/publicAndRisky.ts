import { LivestreamEvent } from '../../../types';

export const publicAndRiskyEvents: LivestreamEvent[] = [
    {
        id: 'fantasy-public-naked',
        text: "Tantangan ekstrem: 'Roleplay kamu lagi telanjang di halte bus pas jam sibuk. Tunjukkan ekspresi takut tapi sange.'",
        choices: [
            {
                text: "[Akting dengan meyakinkan]",
                stat: 'mental',
                threshold: 96,
                success: { hype: 40, viewers: 80, message: "Aktingmu membuat semua orang tegang! Fantasi exhibitionist terpenuhi!" },
                failure: { hype: -25, viewers: -60, message: "Akting takutmu terlalu berlebihan dan tidak seksi." },
            },
        ],
    },
    {
        id: 'fantasy-oral-mall-toilet',
        text: "Request fantasi: 'Pura-pura lagi di toilet mal, ngulum 'kontol' orang asing di dalam bilik. Harus sambil dengerin suara orang lalu-lalang.'",
        choices: [
            {
                text: "[Simulasikan dengan dildo/pisang]",
                stat: 'kecantikan',
                threshold: 93,
                success: { hype: 35, viewers: 75, message: "Suara kecipak dan desahan tertahanmu sangat realistis!" },
                failure: { hype: -18, viewers: -48, message: "Kamu tidak bisa fokus karena 'suara' di luar." },
            },
            {
                text: "[Fokus pada akting suara desahan tertahan]",
                stat: 'mental',
                threshold: 94,
                success: { hype: 38, viewers: 70, message: "Imajinasi penonton jadi liar hanya dengan mendengar suaramu!" },
                failure: { hype: -20, viewers: -50, message: "Desahanmu terdengar palsu." },
            },
        ],
    },
    {
        id: 'fantasy-oral-spbu-toilet',
        text: "Fantasi jorok: 'Sekarang bayangin kamu lagi di toilet SPBU yang bau pesing. Kamu lagi nge-BJ supir truk. Tunjukin ekspresi nikmat tapi sambil nahan bau.'",
        choices: [
            {
                text: "[Akting dengan ekspresi kompleks]",
                stat: 'mental',
                threshold: 92,
                success: { hype: 32, viewers: 65, message: "Ekspresimu yang 'terpaksa nikmat' sangat meyakinkan!" },
                failure: { hype: -17, viewers: -45, message: "Kamu lebih terlihat seperti orang mau muntah." },
            },
        ],
    },
    {
        id: 'fantasy-sex-on-bus',
        text: "Roleplay: 'Kamu lagi di bus malam, duduk di paling belakang. Orang di sebelahmu mulai gerayain kamu. Akting pasrah keenakan.'",
        choices: [
            {
                text: "[Akting dengan gerakan dan desahan kecil]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Aktingmu yang subtil membuat fantasi ini sangat nyata!" },
                failure: { hype: -15, viewers: -40, message: "Gerakanmu tidak terlihat di kamera." },
            },
        ],
    },
    {
        id: 'fantasy-sex-on-motor',
        text: "Tantangan: 'Pura-pura kamu lagi 'ena-ena' di atas motor yang lagi jalan. Goyangin pinggulmu maju mundur seolah-olah lagi penetrasi.'",
        choices: [
            {
                text: "[Goyangkan pinggul dengan ritme cepat]",
                stat: 'stamina',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Goyangan 'mesin'-mu sangat panas!" },
                failure: { hype: -12, viewers: -38, message: "Goyanganmu tidak stabil dan terlihat aneh." },
            },
        ],
    },
    {
        id: 'fantasy-changing-room',
        text: "Fantasi: 'Kamu lagi di kamar pas toko baju. Tiba-tiba ada 'tangan' asing masuk dari tirai. Akting kaget tapi pasrah.'",
        choices: [
            {
                text: "[Simulasikan dengan tanganmu sendiri]",
                stat: 'mental',
                threshold: 89,
                success: { hype: 29, viewers: 59, message: "Aktingmu sangat menegangkan! Penonton suka!" },
                failure: { hype: -14, viewers: -39, message: "Kamu terlihat seperti sedang menggaruk." },
            },
        ],
    },
    {
        id: 'fantasy-office-desk',
        text: "Roleplay: 'Kamu sekretaris yang lagi digrepe-grepe bos di atas meja kerja. Harus sambil pura-pura jawab telepon kantor.'",
        choices: [
            {
                text: "[Lakukan multitasking sensual]",
                stat: 'mental',
                threshold: 94,
                success: { hype: 36, viewers: 76, message: "Kemampuanmu berakting di bawah 'tekanan' luar biasa!" },
                failure: { hype: -19, viewers: -49, message: "Kamu salah bicara dan merusak kedua peran." },
            },
        ],
    },
    {
        id: 'fantasy-cinema-handjob',
        text: "Request: 'Pura-pura lagi di bioskop, di baris paling belakang. Kasih 'handjob' ke orang di sebelahmu di bawah jaket.'",
        choices: [
            {
                text: "[Simulasikan dengan gerakan tangan di bawah selimut]",
                stat: 'kecantikan',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Gerakan tangan dan ekspresi wajahmu sudah cukup bercerita." },
                failure: { hype: -10, viewers: -30, message: "Tidak ada yang terlihat, penonton bosan." },
            },
        ],
    },
    {
        id: 'fantasy-park-flashing',
        text: "Tantangan: 'Roleplay kamu lagi jogging di taman. Tiba-tiba kamu buka jaketmu dan pamerin tetekmu ke 'orang' (kamera).'",
        choices: [
            {
                text: "[Lakukan dengan cepat dan ekspresi nakal]",
                stat: 'popularitas',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Aksi flashing-mu yang tiba-tiba membuat hype melonjak!" },
                failure: { hype: -12, viewers: -38, message: "Kamu terlalu lambat dan kehilangan momen kejutnya." },
            },
        ],
    },
    {
        id: 'fantasy-rooftop-sex',
        text: "Fantasi: 'Kamu lagi 'doggy style' di pinggir atap gedung pencakar langit. Tunjukkan pemandangan 'kota' dari belakang.'",
        choices: [
            {
                text: "[Ambil posisi nungging dengan latar belakang jendela]",
                stat: 'kecantikan',
                threshold: 90,
                success: { hype: 30, viewers: 60, message: "Pemandangan pantatmu dengan latar 'kota' sangat artistik!" },
                failure: { hype: -15, viewers: -40, message: "Pencahayaan dari jendela membuatmu jadi siluet." },
            },
        ],
    },
    {
        id: 'fantasy-elevator-quickie',
        text: "Roleplay: 'Lift macet, cuma ada kamu dan 'aku'. Cepat buka baju sebelum ada yang datang!'",
        choices: [
            {
                text: "[Lepas baju dengan panik tapi tetap seksi]",
                stat: 'stamina',
                threshold: 87,
                success: { hype: 27, viewers: 57, message: "Adegan yang cepat dan menegangkan ini sangat seru!" },
                failure: { hype: -13, viewers: -37, message: "Kamu terlalu panik dan terlihat tidak menarik." },
            },
        ],
    },
    {
        id: 'fantasy-supermarket-upskirt',
        text: "Tantangan: 'Pura-pura kamu lagi jongkok ngambil barang di supermarket. 'Gak sengaja' pamerin CD-mu ke kamera.'",
        choices: [
            {
                text: "[Lakukan dengan 'ketidaksengajaan' yang meyakinkan]",
                stat: 'mental',
                threshold: 86,
                success: { hype: 26, viewers: 56, message: "Aksi candid-mu berhasil, banyak yang 'pap'!" },
                failure: { hype: -11, viewers: -36, message: "Terlihat sangat disengaja dan murahan." },
            },
        ],
    },
    {
        id: 'fantasy-back-alley-bj',
        text: "Fantasi: 'Kamu lagi di gang belakang yang kotor. Berlutut dan berikan 'blowjob' terbaikmu pada orang asing.'",
        choices: [
            {
                text: "[Berlutut di lantai dan mulai simulasi oral]",
                stat: 'kecantikan',
                threshold: 88,
                success: { hype: 28, viewers: 58, message: "Kontras antara aksi jorok dan kecantikanmu sangat kuat!" },
                failure: { hype: -14, viewers: -38, message: "Kamu terlihat tidak nyaman dengan lantainya." },
            },
        ],
    },
    {
        id: 'fantasy-beach-sex-night',
        text: "Roleplay: 'Kita lagi di pantai malam-malam. Akting kamu 'main' di atas pasir sambil dengerin suara ombak.'",
        choices: [
            {
                text: "[Goyangkan badan seolah sedang berhubungan seks]",
                stat: 'stamina',
                threshold: 85,
                success: { hype: 25, viewers: 50, message: "Suasana romantis dan sensual berhasil tercipta." },
                failure: { hype: -10, viewers: -30, message: "Kamu malah kemasukan pasir (imajiner)." },
            },
        ],
    },
    {
        id: 'fantasy-under-table-footsie',
        text: "Fantasi: 'Pura-pura kita lagi meeting. Lepas sepatumu di bawah meja dan gerayangin 'kontol'-ku pake kakimu.'",
        choices: [
            {
                text: "[Arahkan kamera ke kaki dan lakukan gerakan sensual]",
                stat: 'kecantikan',
                threshold: 82,
                success: { hype: 22, viewers: 42, message: "Permainan kakimu sangat menggoda!" },
                failure: { hype: -10, viewers: -22, message: "Gerakan kakimu tidak terlihat jelas." },
            },
        ],
    },
];
