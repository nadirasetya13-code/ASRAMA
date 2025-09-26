import { BaseTalent } from "../../../types";

export const khususTalents: BaseTalent[] = [
    {
      id: `talent-fixed-khusus-1`,
      name: "Citra Lestari",
      kotaAsal: "Medan",
      agama: "Buddha",
      statusSosial: "Pekerja Lepas",
      cerita: `Aku Citra. Orang Medan bilang aku 'kecil-kecil cabe rawit'. Hidup di jalanan sejak remaja membuatku keras. Aku belajar untuk tidak percaya siapapun, dan selalu waspada. Setiap hari adalah pertarungan untuk bertahan hidup, entah itu jadi kuli angkut di pasar atau jadi calo tiket. Aku harus selalu kuat, selalu memegang kendali.\n\nTapi di malam hari, saat sendirian di kamar sempitku, aku merasa lelah. Lelah menjadi kuat, lelah harus selalu waspada. Aku mendambakan satu momen di mana aku bisa melepaskan semuanya, di mana aku tidak perlu berpikir, tidak perlu melawan. Momen di mana orang lain yang memegang kendali, dan aku hanya perlu menurut.\n\nSeorang teman mengenalkanku pada Asrama Birahi. Awalnya aku skeptis, tapi kemudian aku menemukan sesuatu yang aneh di sini. Saat melayani tamu, terutama yang suka kasar dan dominan, aku menemukan kelegaan yang aneh. Untuk sesaat, aku bisa berhenti menjadi Citra yang tangguh. Aku bisa menjadi pasrah, menjadi objek. Semakin kasar mereka, semakin tenang perasaanku. Ini adalah pelarianku, caraku beristirahat dari kerasnya dunia.\n\nFisik Citra adalah cerminan dari hidupnya yang keras. Tubuhnya padat berisi, tidak gemuk tapi penuh otot. Wajahnya yang agak tirus memiliki garis tegas dengan sepasang mata yang selalu waspada. Kakinya kuat dan jenjang, memberinya kecepatan saat dibutuhkan. Asetnya yang paling mencolok adalah pantatnya yang bulat dan luar biasa besar, kontras dengan citranya yang tangguh. Ia terbiasa mengenakan pakaian praktis seperti jins robek dan kaos ketat, gaya yang tidak menghalangi gerakannya namun tetap menonjolkan lekuk tubuhnya yang padat.`,
      imageUrl: `https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/refs/heads/Game/Photo/Citra%20Lestari.png`,
      rarity: 'Khusus',
      stamina: 100,
      popularitas: 85,
      kecantikan: 100,
      mental: 95,
      fisik: {
        gayaRambut: 70,
        bentukWajah: 78,
        bentukMata: 80,
        bentukBibir: 72,
        bentukHidung: 66,
        bentukTangan: 82,
        beratBadan: 78,
        bentukKaki: 90,
        // FIX: Added missing property 'bentukPantat' to satisfy the FisikAttributes type.
        bentukPantat: 100,
      },
      intim: {
        payudara: { ukuran: 70, bentuk: 72, kekenyalan: 80, sensitivitasPuting: 92, ukuranAreola: 50, warnaPuting: 60, jarak: 64, bentukPuting: 75, warnaAreola: 60, kelembutanKulit: 70 },
        vagina: { kedalaman: 96, kekencangan: 100, pelumasan: 70, sensitivitasGSpot: 80, elastisitas: 100, aroma: 85, labia: 60, tipeHymen: 10, kondisiDindingVagina: 90, kekuatanOtotPC: 100, potensiOrgasmeMultiple: 85, volumeEjakulasiWanita: 75 },
        klitoris: { ukuran: 65, sensitivitas: 88, aksesibilitas: 80, kecepatanRespon: 75, tipeTudung: 70, pembengkakan: 68, dayaTahan: 100, posisi: 75 },
        anal: { kekencanganAnus: 100, elastisitasAnus: 95, warnaAnus: 80, kebersihan: 85, sensitivitasAnal: 90 },
        mulut: { keterampilanLidah: 85, kedalamanTenggorokan: 80, produksiSaliva: 80 },
        bokong: { bentukPantat: 100, kekencangan: 98, kehalusanKulit: 75, responSpank: 100 },
      },
      equipment: { makeup: null, lingerie: null, sepatu: null, bra: null, celanaDalam: null, obatBirahi: null, ponsel: null, kameraDsr: null, handycam: null, laptop: null, parfum: null, stocking: null, kondom: null },
      equipmentInventory: [],
      potensiHIVAIDS: 12, kesehatan: 88, jatuhCinta: 25, potensiHamil: 22,
      reincarnationCount: 0,
    },
];
