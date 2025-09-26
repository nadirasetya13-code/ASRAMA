# Arsitektur & Teknologi "ASRAMA BIRAHI"

Dokumen ini merinci tumpukan teknologi (tech stack), struktur proyek, dan pola arsitektur yang digunakan dalam game.

## 1. Struktur Proyek

Struktur proyek dirancang untuk menjadi sangat modular dan mudah dikelola, memisahkan domain-domain yang berbeda secara jelas.

-   `/components`: Komponen UI React. Termasuk sub-direktori untuk `icons` dan sub-komponen yang lebih kompleks seperti `talentProfile`, `guestProfile`, dan `kamar`.
-   `/controllers`: Manajemen state global (Zustand) yang dipecah menjadi beberapa "slice" berdasarkan fungsionalitas (misalnya: `gameActions.ts`, `uiActions.ts`, `gachaActions.ts`).
-   `/services`: Logika bisnis, kalkulasi, dan interaksi data.
    - `/game`: Layanan game spesifik, termasuk direktori data untuk `talents`, `guests`, `events`.
    - `dbService.ts`: Abstraksi untuk IndexedDB.
-   `/constants`: Berisi semua konstanta gameplay yang telah dipecah menjadi file-file modular berdasarkan domain (misalnya: `rooms.ts`, `gacha.ts`, `equipment/`).
-   `App.tsx`: **Shell Aplikasi.** Komponen root yang hanya mengatur layout utama dan mendelegasikan rendering ke `ViewRenderer` dan `ModalManager`.
-   `constants.ts`: **Barrel File.** Mengekspor ulang semua konstanta dari direktori `/constants`.
-   `types.ts`: **Barrel File.** Mengekspor ulang semua definisi tipe TypeScript dari direktori `/types`.

## 2. Tumpukan Teknologi (Tech Stack)

Proyek ini menggunakan setup modern yang minimalis tanpa proses build yang kompleks.
-   **Framework**: React 19 & TypeScript.
-   **Styling**: Tailwind CSS (via CDN, dikonfigurasi di `index.html`).
-   **Animasi**: Framer Motion.
-   **Manajemen State**: Zustand.
-   **Module System**: ES Modules native dengan `importmap` (tanpa bundler).
-   **Database**: IndexedDB melalui library `idb` untuk persistensi data di browser.
-   **Testing**: Vitest & React Testing Library.

## 3. Manajemen State (Zustand)

State utama game dikelola menggunakan pola **"slice"** di dalam direktori `/controllers` untuk skalabilitas dan kemudahan pengelolaan.
-   **Integrasi**: File `controllers/store.ts` mengimpor semua slice (`uiActions.ts`, `gameActions.ts`, `riskActions.ts`, dll.) dan menggabungkannya menjadi satu hook `useGameStore`.
-   **State & Actions**: State dan tipe aksi didefinisikan secara terpusat di `controllers/types.ts`. Setiap file slice berisi sekelompok aksi yang relevan dengan fungsionalitasnya (misal: `assetActions.ts` hanya berisi logika untuk kamar dan item).
-   **Penggunaan**: Komponen UI tetap menggunakan satu hook `useGameStore` yang sama untuk mengakses state dan actions, menjaga API tetap sederhana meskipun struktur internalnya sangat modular.

## 4. Persistensi Data (IndexedDB)

Game menggunakan IndexedDB untuk menyimpan progres secara otomatis. Logika interaksi database diabstraksi dalam `services/dbService.ts`.
- **Data Inti**: State utama game, daftar talenta yang dimiliki, dan daftar kamar disimpan di object store masing-masing.
- **Talenta Kustom**: Talenta yang dibuat oleh pengguna disimpan di object store terpisah (`userCreatedTalents`). Saat game dimuat, data ini diambil dan digabungkan dengan talenta statis untuk membentuk pool Gacha yang dinamis.
- **Penyimpanan**: Data disimpan setelah setiap aksi signifikan (misal: setelah sesi, akhir malam, pembelian) untuk memastikan tidak ada progres yang hilang.