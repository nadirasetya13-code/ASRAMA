# Catatan Refaktorisasi & Perubahan Arsitektur

Dokumen ini mencatat perubahan-perubahan signifikan pada struktur dan arsitektur kode aplikasi "ASRAMA BIRAHI". Tujuannya adalah untuk meningkatkan kualitas, keterbacaan, dan kemudahan pengelolaan kode seiring dengan perkembangan proyek.

---
### 9. Penambahan File Konstanta Equipment Baru
-   **Konteks:** Penambahan tiga set equipment baru (Hera, Demeter, Athena) untuk melengkapi sistem yang sudah ada.
-   **Solusi:** Mengikuti pola arsitektur modular yang sudah ada, setiap set equipment baru dibuatkan file konstanta-nya sendiri di dalam direktori `/constants/equipment/`.
-   **Perubahan yang Dilakukan:**
    -   Membuat file `constants/equipment/hera.ts` untuk mendefinisikan set dan item Hera.
    -   Membuat file `constants/equipment/demeter.ts` untuk mendefinisikan set dan item Demeter.
    -   Membuat file `constants/equipment/athena.ts` untuk mendefinisikan set dan item Athena.
    -   Memperbarui barrel file `constants/equipment/index.ts` untuk mengimpor dan mengekspor data dari ketiga file baru tersebut, mengintegrasikannya ke dalam pool equipment utama game.

### 8. Modularisasi Komponen Sistem Manajemen Risiko
-   **Masalah:** Sistem manajemen risiko yang baru adalah fitur yang kompleks dengan tiga modal yang berbeda (Warga, Satpol-PP, Polisi). Menggabungkannya dalam satu komponen akan menciptakan komponen monolitik baru.
-   **Solusi:** Membuat komponen terpisah untuk setiap modal event penggerebekan, memastikan setiap file fokus pada satu jenis interaksi.
-   **Perubahan yang Dilakukan:**
    -   Membuat `components/RaidModal.tsx` untuk menangani logika dan UI dari penggerebekan warga.
    -   Membuat `components/SatpolPpRaidModal.tsx` untuk razia Satpol-PP.
    -   Membuat `components/PoliceRaidModal.tsx` untuk skenario bencana penggerebekan polisi.
    -   Mengintegrasikan rendering modal-modal ini ke dalam `ModalManager.tsx` dengan sistem prioritas.

### 7. Modularisasi Komponen UI Monolitik

-   **Masalah:** Beberapa komponen UI inti (`KamarView.tsx`, `GuestProfile.tsx`, `TalentaView.tsx`) telah berkembang menjadi file yang sangat besar dan kompleks.
-   **Solusi:** Memecah setiap komponen monolitik menjadi komponen "orchestrator" dan beberapa sub-komponen yang lebih kecil dan terfokus.
-   **Perubahan yang Dilakukan:**
    -   **`KamarView`**: Komponen `RoomCard` diekstrak ke `components/kamar/RoomCard.tsx`.
    -   **`GuestProfile`**: Semua bagian UI diekstrak menjadi sub-komponen di dalam `components/guestProfile/`.
    -   **`TalentaView`**: Bagian "Talenta Unggulan" diekstrak ke `components/talenta/FeaturedTalent.tsx`.

---
### 6. Modularisasi Konstanta Gameplay

-   **Masalah:** File `constants.ts` telah berkembang menjadi file monolitik yang sangat besar.
-   **Solusi:** Memecah `constants.ts` menjadi beberapa file yang lebih kecil di dalam direktori `/constants/`. Sistem *barrel file* ganda digunakan untuk menjaga kompatibilitas impor.

---

### 5. Pemisahan Komponen Aplikasi & Data Narasi

-   **Masalah:** `App.tsx` menjadi "God Component" dan `narrativeService.ts` mencampurkan data dan logika.
-   **Solusi:** Memecah `App.tsx` menjadi `ViewRenderer` dan `ModalManager`. Memisahkan data `phraseBank` ke `services/game/data/narrativeBank.ts`.

---

### 4. Modularisasi Controller Utama (Zustand Store)

-   **Masalah:** File `controllers/gameController.ts` membengkak menjadi sangat besar.
-   **Solusi:** Memecah `gameController.ts` menjadi beberapa file "slice" yang lebih kecil dan terfokus di dalam direktori `controllers/` (`uiActions.ts`, `gameActions.ts`, dll.). File `store.ts` baru dibuat untuk mengintegrasikan semua slice.

---

### 3. Modularisasi Skenario Livestream

-   **Masalah:** File `services/game/events.ts` berisi semua skenario livestream dalam satu array besar.
-   **Solusi:** Memecah file tersebut menjadi beberapa file berdasarkan kategori skenario di dalam direktori `services/game/events/`.

---

### 2. Refaktorisasi Komponen Profil Talenta

-   **Masalah:** File `components/TalentProfile.tsx` menjadi komponen monolitik yang sangat besar.
-   **Solusi:** Memecah komponen tersebut menjadi beberapa sub-komponen yang lebih kecil di dalam direktori `components/talentProfile/`.

---

### 1. Refaktorisasi Layanan Game

-   **Masalah:** File `services/localDataService.ts` telah berkembang menjadi sangat besar, menampung logika yang tidak saling terkait.
-   **Solusi:** Memecah file tersebut menjadi beberapa file layanan yang lebih kecil di dalam direktori `services/game/` (`talentService.ts`, `guestService.ts`, `matchService.ts`, dll.).
