# Struktur File Proyek "ASRAMA BIRAHI"

Dokumen ini memberikan rincian lengkap mengenai struktur file dan folder proyek, beserta deskripsi fungsi dari setiap file.

---

## Direktori Root (`/`)

| File | Keterangan |
| --- | --- |
| `App.tsx` | **Shell Aplikasi.** Komponen root yang hanya mengatur layout utama. |
| `ARCHITECTURE.md` | Menjelaskan tumpukan teknologi, struktur proyek, dan pola arsitektur. |
| `CHANGELOG.md`| Catatan perubahan fitur dan mekanik gameplay yang dihadapi oleh pemain. |
| `CONTRIBUTING.md` | Berisi alur kerja, aturan kode, dan panduan untuk berkontribusi. |
| `DEVELOPMENT_GUIDE.md` | **Dokumen Induk.** Titik masuk utama yang menautkan ke semua dokumen panduan lainnya. |
| `GAMEPLAY_MECHANICS.md` | Merinci semua sistem, loop, dan formula inti gameplay. |
| `GAMEPLAY_PHILOSOPHY.md` | Menjelaskan prinsip desain fundamental `Daya Pikat`. |
| `index.html` | File HTML utama. Mengimpor Tailwind CSS, font, dan script `index.tsx`. |
| `index.tsx` | Titik masuk (entry point) aplikasi React. |
| `metadata.json` | Metadata aplikasi, termasuk nama, deskripsi, dan izin. |
| `package.json` | Mendefinisikan dependensi pengembangan dan script. |
| `PROJECT_STRUCTURE.md` | File ini, yang menjelaskan struktur proyek. |
| `REFACTOR_LOG.md` | Catatan perubahan teknis pada arsitektur kode. |
| `types.ts` | **Barrel File.** Mengekspor ulang semua tipe dari sub-direktori `types/`. |
| `constants.ts` | **Barrel File.** Mengekspor ulang semua konstanta dari sub-direktori `constants/`. |
| `vitest.config.ts` | Konfigurasi untuk framework testing Vitest. |
| `vitest.setup.ts` | File setup untuk Vitest. |

---

## Direktori `components/`

Berisi semua komponen UI React yang dapat digunakan kembali.

| File | Keterangan |
| --- | --- |
| `BottomNav.tsx` | Bilah navigasi bawah. |
| `BuatTalentaView.tsx` | Tampilan menu untuk membuat talenta kustom. |
| `DeveloperOptionsView.tsx`| Tampilan Opsi Developer untuk cheat. |
| `EndDayResultModal.tsx` | Modal yang menampilkan laporan akhir malam. |
| `EquipEquipmentModal.tsx`| Modal untuk memasang/melepas perlengkapan produksi. |
| `EquipPhoneModal.tsx`| Modal untuk memilih, upgrade, dan melengkapi ponsel. |
| `GachaResultModal.tsx`| Modal untuk menampilkan hasil Gacha talenta. |
| `EquipmentGachaResultModal.tsx`| Modal baru untuk menampilkan hasil dari Gacha Equipment. |
| `GuestCard.tsx` | Kartu ringkasan tamu di Lobi. |
| `GuestProfile.tsx` | **Orchestrator** untuk profil tamu. |
| `GuestWantsSummary.tsx`| Menampilkan ringkasan permintaan tamu. |
| `Header.tsx` | Header yang menampilkan status agensi (uang, reputasi, dll). |
| `icons.tsx` | **Barrel File** untuk semua ikon. |
| `KamarView.tsx` | Tampilan untuk menu manajemen kamar. |
| `KasirView.tsx` | Tampilan untuk menu kasir, termasuk fitur ATM. |
| `KlinikView.tsx`| Tampilan untuk menu Klinik Estetika (operasi plastik). |
| `LobyView.tsx` | Tampilan utama lobi untuk fase siang dan malam. |
| `LivestreamMinigame.tsx`| UI interaktif untuk minigame livestreaming. |
| `LivestreamPackageModal.tsx`| Modal memilih paket data livestream. |
| `LivestreamTopicModal.tsx`| Modal memilih topik siaran. |
| `LivestreamResultModal.tsx`| Modal hasil sesi livestream. |
| `MakamTalentaView.tsx`| Tampilan melihat dan mereinkarnasi talenta. |
| `MatchResultModal.tsx` | Modal hasil dan dampak sesi. |
| `ModalManager.tsx` | Me-render semua modal global. |
| `OutcallModal.tsx`| Modal memilih dan konfirmasi tawaran tugas luar (outcall). |
| `PengaturanView.tsx` | Tampilan menu pengaturan. |
| `PilihKamarView.tsx` | Tampilan memilih kamar dan kondom sebelum sesi. |
| `PoliceRaidModal.tsx`| Modal untuk event Penggerebekan Polisi. |
| `ProductionResultModal.tsx` | Modal hasil sesi produksi konten. |
| `ProductionSetupModal.tsx` | Modal memilih jenis dan tema konten. |
| `RaidModal.tsx`| Modal untuk event Penggerebekan Warga. |
| `ReceiptModal.tsx` | Tampilan modal struk pembayaran. |
| `RekrutView.tsx`| Tampilan rekrutmen dengan tab Gacha Talenta & Equipment. |
| `SatpolPpRaidModal.tsx`| Modal untuk event Razia Satpol-PP. |
| `SessionProcessingModal.tsx` | Tampilan sinematik narasi sesi. |
| `TalentCard.tsx` | Kartu ringkasan talenta. |
| `TalentShowcase.tsx` | Carousel talenta unggulan di menu Rekrut. |
| `TalentProfile.tsx` | **Orchestrator** untuk profil talenta. |
| `TalentaView.tsx` | Tampilan utama untuk melihat dan memilih talenta. |
| `TokoView.tsx`| Tampilan menu Toko (ponsel, item produksi, item konsumsi). |
| `ViewRenderer.tsx` | Me-render view utama. |

### Sub-direktori `components/icons/`

| File | Keterangan |
| --- | --- |
| `attributeIcons.tsx` | Ikon untuk semua atribut fisik dan intim. |
| `equipmentIcons.tsx` | Ikon untuk slot perlengkapan. |
| `miscIcons.tsx` | Ikon lain-lain (posisi, pembayaran, dll.). |
| `navIcons.tsx` | Ikon untuk bilah navigasi bawah. |
| `roomIcons.tsx` | Ikon untuk tipe-tipe kamar. |
| `statIcons.tsx` | Ikon untuk statistik utama dan kondisi. |
| `traitIcons.tsx` | Ikon untuk sifat dan kink tamu. |
| `uiIcons.tsx` | Ikon UI umum (uang, reputasi, hati, dll.). |

### Sub-direktori `components/{guestProfile, kamar, talentProfile, talenta}/`
Berisi sub-komponen yang dipecah dari komponen orchestrator-nya untuk menjaga keterbacaan kode.

---

## Direktori `controllers/`
Berisi semua logika manajemen state global (Zustand) yang dipecah menjadi "slice".

| File | Keterangan |
| --- | --- |
| `gameController.ts` | **Barrel File.** Mengekspor ulang store. |
| `store.ts` | **Integrator.** Menggabungkan semua slice menjadi satu store. |
| `types.ts` | Mendefinisikan semua interface state dan action. |
| `initialState.ts` | Mengisolasi objek state awal. |
| `uiActions.ts` | Slice aksi untuk logika UI. |
| `gameActions.ts` | Slice aksi untuk loop gameplay inti. |
| `assetActions.ts` | Slice aksi untuk manajemen aset (kamar, item). |
| `talentActions.ts` | Slice aksi untuk siklus hidup talenta. |
| `livestreamActions.ts`| Slice aksi untuk minigame livestream. |
| `productionActions.ts`| Slice aksi untuk produksi konten. |
| `gachaActions.ts` | Slice aksi untuk semua logika Gacha. |
| `riskActions.ts`| Slice aksi baru untuk sistem manajemen risiko. |

---

## Direktori `services/` & `services/game/`
Berisi semua logika bisnis, kalkulasi, dan interaksi data.

| File | Keterangan |
| --- | --- |
| `dbService.ts` | Lapisan abstraksi untuk IndexedDB. |
| `localDataService.ts` | **Barrel File.** Mengekspor ulang semua layanan. |
| `game/clinicService.ts` | Logika kalkulasi untuk Klinik Estetika. |
| `game/guestService.ts` | Logika pembuatan tamu dan pemenuhan keinginan. |
| `game/livestreamService.ts` | Logika simulasi livestream. |
| `game/matchService.ts` | Logika inti untuk kalkulasi sesi. |
| `game/narrativeService.ts` | Mesin narasi dinamis. |
| `game/outcallService.ts` | Logika kalkulasi untuk tugas luar (outcall). |
| `game/productionService.ts` | Logika untuk produksi konten. |
| `game/roomService.ts` | Logika manajemen kamar, buff, dan pembersihan. |
| `game/talentService.ts` | Logika talenta, termasuk `calculateEffectiveTalent`. |
| `game/utils.ts` | Fungsi bantuan umum. |
| `game/events.ts` | **Barrel File** untuk semua skenario livestream. |
| `game/talents.ts`| **Barrel File** untuk semua data dasar talenta. |
| `game/guests.ts`| **Barrel File** untuk semua data dasar tamu. |

---

## Direktori `types/` & `constants/`
Berisi semua definisi tipe dan konstanta game, dipecah menjadi file-file modular berdasarkan domain. Contohnya `types/equipment.ts` dan `constants/equipment/`.