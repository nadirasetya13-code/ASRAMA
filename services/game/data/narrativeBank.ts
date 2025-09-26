import { PersonalityTraitType } from "../../../types";

// --- DYNAMIC NARRATIVE ENGINE V4 ---

export type NarrativePhase = 'opening' | 'climax' | 'dialogue' | 'closing';
export type DuelType = 'stamina_win' | 'stamina_loss' | 'physical_mismatch_pain' | 'physical_mismatch_pleasure' | 'mental_overwhelm' | 'synergy';

export type NarrativeContext = {
    score?: [number, number]; // [min, max]
    personality?: PersonalityTraitType;
    kink?: string; // e.g., 'Dominasi_success'
    duel?: DuelType;
};

interface NarrativeSnippet {
    text: string;
    context: NarrativeContext;
    weight: number; // How likely this is to be picked
}

export const phraseBank: Record<NarrativePhase, NarrativeSnippet[]> = {
    opening: [
        { text: 'Begitu pintu tertutup, ${guest.name} langsung menarik ${talent.name} ke dalam pelukan yang menuntut. "Aku sudah tidak tahan lagi," bisiknya dengan suara serak, bibirnya langsung melumat bibir ${talent.name}.', context: { score: [95, 100] }, weight: 1 },
        { text: 'Di dalam kamar, ${guest.name} tidak bisa melepaskan pandangannya dari ${talent.name}. Hasratnya terpancar jelas, udara terasa berat oleh gairah yang tak terucapkan.', context: { score: [80, 94] }, weight: 1 },
        { text: 'Sambil tersenyum profesional, ${talent.name} mempersilakan ${guest.name} masuk. Sesi dimulai dengan tenang, keduanya saling menjaga jarak sebelum kehangatan mulai menjalar.', context: { score: [60, 79] }, weight: 1 },
        { text: 'Suasana di dalam kamar terasa canggung. ${guest.name} menatap ${talent.name} dengan tatapan kritis, seolah mengukur setiap inci tubuhnya.', context: { score: [40, 59] }, weight: 1 },
        { text: '"${talent.name}, ya? Hmm, tidak seperti di foto," gumam ${guest.name} pelan, membuat suasana menjadi dingin seketika.', context: { score: [0, 39] }, weight: 1 },
        { text: '"Kau terlihat lebih cantik dari yang kubayangkan," puji ${guest.name} tulus, tangannya dengan lembut membelai pipi ${talent.name}.', context: { personality: 'Romantis' }, weight: 5 },
        { text: '"Cepat, lepas bajumu. Aku tidak punya banyak waktu," bentak ${guest.name}, mendorong ${talent.name} ke arah tempat tidur tanpa basa-basi.', context: { personality: 'Kasar' }, weight: 5 },
        { text: '"Jangan buang-buang waktuku, tunjukkan apa yang kau bisa," desis ${guest.name} tidak sabaran, matanya melirik jam tangan.', context: { personality: 'Tidak Sabaran' }, weight: 5 },
        { text: '${guest.name} dengan perlahan membuka kancing kemejanya, matanya tak lepas dari ${talent.name}. Tangannya lalu dengan lembut melepas lingerie ${talent.name}, memuja setiap inci tubuhnya yang tersingkap.', context: { personality: 'Romantis', score: [80, 100] }, weight: 8 },
        { text: '"Lepas semuanya, sekarang!" perintah ${guest.name}. Tanpa menunggu jawaban, tangannya yang kasar merobek lingerie ${talent.name}, menarik lepas bra dan celana dalamnya dengan tidak sabaran.', context: { personality: 'Kasar' }, weight: 10 },
        { text: 'Pakaian mereka beterbangan di lantai. ${guest.name} merobek kemejanya sendiri sementara ${talent.name} dengan lincah melepaskan bra-nya, keduanya terlarut dalam hasrat yang membara.', context: { score: [90, 100] }, weight: 8 },
        { text: '${talent.name} dengan gerakan yang terlatih mulai melepaskan pakaiannya satu per satu. Bra, lalu celana dalam, semua dilakukan dengan efisien di hadapan tatapan ${guest.name} yang menunggu.', context: { score: [60, 79] }, weight: 5 },
        { text: 'Atas perintah ${guest.name}, ${talent.name} mulai melepaskan bajunya. Suasana terasa dingin, seperti pemeriksaan medis. Ia melepas bra dan celana dalamnya dengan canggung, merasakan tatapan kritis ${guest.name} padanya.', context: { score: [40, 59], personality: 'Kritis' }, weight: 8 },
    ],
    climax: [
        { text: '${guest.name} menghujam tanpa henti, staminanya seolah tak terbatas. ${talent.name} mulai terengah-engah, tubuhnya gemetar menahan gempuran dahsyat itu, vaginanya terasa panas dan bengkak.', context: { duel: 'stamina_loss' }, weight: 10 },
        { text: '${talent.name} mengambil alih kendali dengan pinggulnya yang liar. Ia menguras setiap tetes stamina ${guest.name} hingga sang tamu terbaring lemas, tak berdaya di bawah dominasinya.', context: { duel: 'stamina_win' }, weight: 10 },
        { text: 'Setiap hentakan dari penis raksasa ${guest.name} terasa seperti merobek rahim ${talent.name}. Ia hanya bisa pasrah, merasakan vaginanya dipaksa meregang hingga batasnya, diisi penuh hingga sesak.', context: { duel: 'physical_mismatch_pain' }, weight: 10 },
        { text: 'Vagina ${talent.name} yang super ketat menjepit penis ${guest.name} dengan nikmat. "Sial... Sempit sekali...," erang ${guest.name}, hampir muncrat hanya dengan beberapa sentakan.', context: { duel: 'physical_mismatch_pleasure' }, weight: 10 },
        { text: 'Di bawah tatapan dan kata-kata kasar ${guest.name}, mental ${talent.name} runtuh. Ia hanya bisa pasrah menerima setiap perlakuan, pikirannya kosong, tubuhnya bergerak seperti boneka.', context: { duel: 'mental_overwhelm' }, weight: 10 },
        { text: 'Gerakan mereka menyatu dalam ritme yang sempurna. Desahan ${talent.name} berpadu dengan erangan ${guest.name}, setiap sentuhan terasa tepat, setiap penetrasi mengenai titik-titik kenikmatan terdalam.', context: { duel: 'synergy' }, weight: 10 },
        { text: '"Kau milikku malam ini, jalang," geram ${guest.name}, menampar pantat ${talent.name} hingga memerah. ${talent.name} yang bermental baja, justru tersenyum nakal, menikmati setiap perlakuan kasarnya.', context: { kink: 'Dominasi_success' }, weight: 20 },
        { text: '"Kau pikir kau siapa?" balasnya dingin, mematahkan fantasi sang tamu seketika.', context: { kink: 'Dominasi_fail' }, weight: 20 },
        { text: 'Bibir mereka bertemu dalam ciuman basah yang dalam. Lidah ${guest.name} menari dengan liar di dalam mulut ${talent.name}, sementara tangannya mulai meraba setiap lekuk tubuhnya yang telanjang, dari payudara hingga ke pantat.', context: { personality: 'Romantis', score: [80, 100] }, weight: 8 },
        { text: 'Tangan ${guest.name} yang besar meremas payudara kenyal ${talent.name} dengan kasar namun nikmat. "Ahhh..." desah ${talent.name} saat ia menunduk dan menjilati puting yang mengeras itu dengan lidahnya yang hangat.', context: { personality: 'Kasar', score: [70, 95] }, weight: 8 },
        { text: '${guest.name} membenamkan wajahnya di antara paha ${talent.name}. Lidahnya yang terampil mencari klitoris yang membengkak, menjilatnya dengan rakus hingga ${talent.name} menjerit tertahan, cairan kenikmatannya membanjiri mulut sang tamu.', context: { duel: 'synergy', score: [85, 100] }, weight: 9 },
        { text: '${talent.name} berlutut, mulutnya yang mungil dengan ahli mengulum penis ${guest.name} yang sudah keras sempurna. Ia menelan setiap senti kejantanan itu, membuat sang tamu mengerang, "Oh, sial... Enak sekali..."', context: { duel: 'synergy', score: [80, 100] }, weight: 9 },
        { text: '"Buka mulutmu, jalang," perintah ${guest.name}. Tanpa ragu, ${talent.name} menelan penisnya yang besar dan asin, mengulumnya hingga ke pangkal tenggorokannya, matanya berair namun tatapannya tetap nakal.', context: { personality: 'Kasar', kink: 'Dominasi_success' }, weight: 15 },
        { text: 'Jari-jari ${guest.name} yang panjang menyelinap masuk ke dalam vagina ${talent.name} yang sudah becek. Ia mengocoknya dari dalam, mencari G-spotnya hingga ${talent.name} menggeliat hebat, "Di situ... ah... terusss..." rintihnya.', context: { duel: 'synergy' }, weight: 8 },
        { text: '${talent.name} membuktikan keahliannya. Dari posisi misionaris, ia dengan lincah beralih ke \'woman on top\', lalu \'doggy style\' yang dalam tanpa sedikitpun kehilangan ritme, membuat ${guest.name} kewalahan.', context: { duel: 'stamina_win' }, weight: 12 },
        { text: '"Aaaargh! Sakit... Pelan sedikit," rintih ${talent.name} saat penis ${guest.name} yang terlalu besar merobek vaginanya. Bukannya melambat, ${guest.name} justru semakin bernafsu mendengar rintihan kesakitannya.', context: { duel: 'physical_mismatch_pain' }, weight: 15 },
        { text: 'Dengan satu hentakan terakhir, ${guest.name} menarik penisnya keluar dan menyemprotkan air maninya yang kental ke seluruh wajah ${talent.name}. "Telan semua," perintahnya dingin sambil tersenyum puas.', context: { duel: 'mental_overwhelm' }, weight: 15 },
        { text: 'Tepat di puncak kenikmatan, ${guest.name} menumpahkan seluruh cairannya di atas payudara ${talent.name} yang indah, menciptakan pemandangan jorok yang membuat gairahnya semakin menjadi-jadi.', context: { score: [60, 89] }, weight: 8 },
        { text: '${guest.name} meraung saat mencapai klimaks, menyemburkan benihnya yang hangat dalam-dalam hingga memenuhi rahim ${talent.name}. Tubuh mereka berdua kejang dalam orgasme yang panjang dan memuaskan.', context: { score: [90, 100], personality: 'Romantis' }, weight: 10 },
        { text: 'Saat ${guest.name} menghantam G-spotnya berulang kali, ${talent.name} merasakan sensasi luar biasa. "Aku... aku mau muncrat!" teriaknya, sebelum cairan vaginanya menyemprot deras, membasahi perut ${guest.name} dan sprei.', context: { duel: 'synergy' }, weight: 12 },
        { text: 'Gairah meledak di antara keduanya. Tubuh mereka saling memuja, keringat membasahi sprei saat mereka mencapai puncak kenikmatan bersama dalam teriakan orgasme yang panjang.', context: { score: [95, 100] }, weight: 1 },
        { text: 'Dengan teknik yang handal, ${talent.name} memandu ${guest.name} melewati gelombang kenikmatan. Sesi berjalan panas dan memuaskan, diakhiri dengan pelepasan yang kuat.', context: { score: [80, 94] }, weight: 1 },
        { text: '${talent.name} melayani ${guest.name} dengan profesional. Semua dilakukan sesuai prosedur hingga sang tamu mencapai klimaksnya.', context: { score: [60, 79] }, weight: 1 },
        { text: 'Terasa tidak ada \'chemistry\' di antara mereka. Gerakan terasa mekanis, desahan terdengar palsu. Sesi berakhir dengan cepat dan tanpa kesan.', context: { score: [0, 59] }, weight: 1 },
    ],
    dialogue: [
        { text: '"Ahh... punyamu besar sekali, Om," desah ${talent.name} dengan mata berkaca-kaca.', context: { duel: 'physical_mismatch_pain'}, weight: 10},
        { text: '"Sempit dan hangat... Kau benar-benar luar biasa, ${talent.name}," erang ${guest.name}, suaranya berat karena nafsu.', context: { duel: 'physical_mismatch_pleasure'}, weight: 10},
        { text: '"Tenagamu seperti kuda, Om... Aku sudah tidak kuat...," rintih ${talent.name} terengah-engah.', context: { duel: 'stamina_loss'}, weight: 10},
        { text: '"Bagaimana? Suka dengan permainanku?" tanya ${talent.name} sambil menggerakkan pinggulnya lebih cepat, mendominasi permainan.', context: { duel: 'stamina_win'}, weight: 10},
        { text: '"Kau suka disiksa, ya? Jalang kecil," bisik ${guest.name} di telinga ${talent.name}.', context: { kink: 'Dominasi_success' }, weight: 10 },
        { text: '"Jangan banyak bicara, nikmati saja," balas ${talent.name} dengan senyum sinis.', context: { personality: 'Kritis' }, weight: 5 },
        { text: '"Sayang... sentuh aku di sini," pinta ${guest.name} dengan suara manja.', context: { personality: 'Romantis' }, weight: 8 },
        { text: '"Mmmph... Oh, Tuhan... Terus, jangan berhenti!" teriak ${talent.name} saat orgasme mendekat.', context: { score: [90, 100] }, weight: 5},
        { text: '"Aku akan menghancurkanmu malam ini," geram ${guest.name}.', context: { personality: 'Kasar' }, weight: 8 },
        { text: '"Apa cuma segini kemampuanmu?" ledek ${talent.name} menantang.', context: { score: [40, 79] }, weight: 5 },
        { text: '"Aku... mau... muncrat...!" raung ${guest.name} di puncak kenikmatan.', context: { score: [80, 100] }, weight: 5 },
    ],
    closing: [
        { text: 'Sambil terbaring lemas, ${guest.name} membelai rambut ${talent.name}. "Itu... luar biasa. Kau benar-benar seorang dewi," bisiknya, menyelipkan beberapa lembar uang tambahan ke tangannya.', context: { score: [95, 100] }, weight: 1 },
        { text: 'Dengan senyum puas, ${guest.name} berkata, "Aku akan kembali lagi untukmu. Hanya untukmu."', context: { score: [80, 94] }, weight: 1 },
        { text: 'Setelah membersihkan diri, ${guest.name} mengangguk singkat. "Kerja bagus," ucapnya sebelum meninggalkan ruangan.', context: { score: [60, 79] }, weight: 1 },
        { text: '${guest.name} segera memakai pakaiannya dengan wajah masam. "Selesai. Cepat keluar," katanya dingin tanpa menoleh sedikit pun.', context: { score: [40, 59] }, weight: 1 },
        { text: '"Apa-apaan ini?! Pelayanan macam apa ini?! Aku bayar mahal bukan untuk ini!" teriak ${guest.name}, membanting pintu saat keluar kamar.', context: { score: [0, 39] }, weight: 1 },
        { text: '"Malam ini akan selalu kuingat," kata ${guest.name} sambil mengecup kening ${talent.name} dengan lembut. "Terima kasih."', context: { personality: 'Romantis' }, weight: 5 },
        { text: '"Jangan pikir ini sudah selesai. Lain kali, aku mau kau lebih nurut lagi," ancam ${guest.name} dengan seringai puas.', context: { personality: 'Kasar' }, weight: 5 },
        { text: '"Hmm, ada beberapa hal yang bisa kau perbaiki. Tapi ya sudahlah," komentar ${guest.name} kritis sambil merapikan dasinya.', context: { personality: 'Kritis' }, weight: 5 },
    ],
};