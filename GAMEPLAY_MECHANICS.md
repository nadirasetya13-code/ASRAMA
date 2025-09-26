# Mekanisme Gameplay "ASRAMA BIRAHI"

Dokumen ini merinci semua sistem, loop, dan formula inti yang membentuk pengalaman gameplay "ASRAMA BIRAHI".

## 1. Mekanisme Inti Gameplay

### 1.1. Siklus Harian (Siang & Malam)
-   **Fase Siang (Asrama Tutup)**: Fase manajemen. Pemain dapat meninjau talenta, merawat kamar, melakukan aktivitas siang hari (livestream, produksi konten), atau mengunjungi Klinik. Tidak ada tamu yang datang.
-   **Fase Malam (Asrama Buka)**: Fase aksi. Tamu baru akan digenerasi. Pemain harus menjodohkan talenta yang tersedia dengan tamu. Terbatas oleh energi talenta dan ketersediaan kamar.

### 1.2. Alur Sesi (Matching) & Logika Inti
Alur sesi adalah loop gameplay utama di Fase Malam.
1.  **Seleksi**: Pemain memilih talenta dan kamar yang tersedia.
2.  **Manajemen Risiko**: Pemain dapat memilih untuk menggunakan **Kondom** untuk mengurangi risiko.
3.  **Kalkulasi Hasil**: Sistem menghitung hasil di latar belakang.
4.  **Simulasi & Narasi Dinamis**: `SessionProcessingModal` muncul, menampilkan cerita sesi yang unik dan eksplisit.
5.  **Tampilan Hasil**: Modal hasil sesi muncul, menampilkan ringkasan kepuasan, reputasi, dan dampak.
6.  **Antrian Pembayaran**: Hasil sesi dibuat menjadi "struk" dan dimasukkan ke dalam antrian `unpaidSessions`.
7.  **Progresi**: Talenta mendapatkan XP, pemain mendapatkan reputasi.
8.  **Pembaruan State**: State game diperbarui dan disimpan.
9.  **Siklus Berulang**: Tamu berikutnya maju.

#### 1.2.1. Peristiwa Acak: Siklus Haid
-   Setiap kali sesi akan dimulai, ada kemungkinan kecil talenta mengalami menstruasi.
-   **Konsekuensi**: Sesi dibatalkan, penalti reputasi kecil, dan talenta tidak tersedia selama 7 hari.

## 2. Sistem Progresi & Ekonomi

### 2.1. Progresi Pemain (Agensi)
-   Pemain memiliki **Level** dan **Reputasi**. Level membuka lebih banyak slot tamu, Reputasi membuka tier tamu yang lebih tinggi.

### 2.2. Progresi Talenta
-   **Level**: Menaikkan atribut berbasis keahlian (`mental`, `popularitas`) dan membuka slot **Keahlian Posisi** pada level tertentu (`SKILL_UNLOCK_LEVELS`).
-   **Umur**: Memengaruhi atribut biologis melalui kurva pertumbuhan, puncak, dan penurunan.
-   **Pensiun & Reinkarnasi**: Talenta pensiun di usia 36 tahun, masuk ke **Makam Talenta**, dan dapat direinkarnasi setelah 3 jam waktu nyata untuk kembali ke usia 17 dengan bonus statistik permanen.

### 2.3. Sistem Keuangan & Aset
-   **Kasir & ATM**: Pendapatan dari sesi masuk ke **Tagihan Tertunda** dan harus diproses di Kasir. Pemain dapat mentransfer dana antara **Uang Kas** dan **Tabungan** melalui ATM dengan pajak progresif.
-   **Kamar**: Aset strategis dengan 7 tipe standar dan 4 tipe rarity. Kamar dapat di-upgrade, rusak, dan harus dibersihkan secara manual setelah digunakan.
-   **Klinik Estetika**: Fitur *end-game* yang memungkinkan modifikasi permanen pada atribut fisik dan intim talenta dengan biaya dan waktu pemulihan yang dinamis.
-   **Tawaran Luar (Outcall)**: Aktivitas malam hari berisiko tinggi dengan imbalan besar, membuat talenta tidak tersedia untuk waktu yang lama.

## 3. Aktivitas Siang Hari
-   **Livestreaming**: Membutuhkan **Ponsel**. Menghasilkan Uang Kas untuk agensi dan Popularitas untuk talenta.
-   **Produksi Konten**: Membutuhkan **Kamera** dan **Laptop**. Menghasilkan **Dana Pribadi untuk talenta** dan komisi untuk agensi, serta meningkatkan Pengikut. Memiliki risiko **Skandal**.

## 4. Sistem Equipment & Gacha

Ini adalah sistem *end-game* utama untuk kustomisasi talenta.

### 4.1. Konsep Dasar Equipment
-   **Struktur**: Setiap talenta memiliki **8 slot equipment pasif**.
-   **Bonus Set**: Mengenakan 2, 4, atau 8 item dari set yang sama akan mengaktifkan bonus kuat.
-   **Prinsip Spesialisasi (Wajib!)**: Setiap set dioptimalkan untuk **satu mekanisme gameplay spesifik**.
    1.  **Kyma**: Fokus pada **Livestreaming**.
    2.  **Fenomenal**: Fokus pada **Produksi Konten**.
    3.  **Aphrodisia**: Fokus pada **Kepuasan Tamu**.
    4.  **Artemisia**: Fokus pada **Daya Tahan Talenta** (defensif).
    5.  **Windfall**: Fokus pada **Profitabilitas Agensi**.
    6.  **Hera**: Fokus pada **Tawaran Luar (Outcall)**.
    7.  **Demeter**: Fokus pada **Progresi & XP Talenta**.
    8.  **Athena**: Fokus pada **Klinik Estetika**.

### 4.2. Gacha Equipment
-   **Lokasi**: Menu **"Panggil"** > tab "Panggil Equipment".
-   **Mata Uang**: Menggunakan **Dana Pribadi Talenta (`talent.earnings`)**, bukan Uang Kas agensi.
-   **Biaya Dinamis**: Biaya gacha dihitung berdasarkan `Daya Pikat` dan `Rarity` talenta.

### 4.3. Integrasi ke Gameplay Inti
-   **Kalkulator Pusat**: Fungsi `calculateEffectiveTalent` di `talentService.ts` adalah sumber kebenaran. Fungsi ini mengambil data dasar talenta, menerapkan **modifier umur**, lalu menambahkan **statistik dan bonus set** dari equipment yang terpasang.
-   **Integrasi Menyeluruh**: Semua layanan lain (`matchService`, `livestreamService`, dll.) memanggil `calculateEffectiveTalent` untuk mendapatkan statistik akhir talenta sebelum melakukan kalkulasi, memastikan equipment selalu diperhitungkan.

## 5. Sistem Manajemen Risiko (Penggerebekan)

Ini adalah sistem dinamis yang berjalan di latar belakang, dipicu oleh aksi pemain.

### 5.1. Tahap 1: Penggerebekan Warga (Citizen Raid)
-   **Pemicu**: `Kecurigaan Warga` mencapai **100 poin**. Poin ini terakumulasi dari sesi dengan kepuasan rendah, tamu dengan sifat 'Kasar', atau kink 'Dominasi'.
-   **Proses**: Saat `endDay` dipicu, modal **Raid Warga** akan muncul. Pemain harus memilih satu dari tiga opsi:
    1.  **Sogok**: Biaya persentase dari Uang Kas. Peluang berhasil dipengaruhi level agensi.
    2.  **Negosiasi**: Mengirim talenta dengan `Mental` tertinggi. Tanpa biaya, tapi berisiko.
    3.  **Bersembunyi**: Peluang berhasil sangat rendah, namun kegagalannya memiliki konsekuensi paling berat.
-   **Konsekuensi Kegagalan**: Asrama disegel selama beberapa hari, denda, reputasi anjlok, semua talenta trauma (tidak tersedia), dan `Laporan Resmi` ke Satpol-PP meningkat drastis.

### 5.2. Tahap 2: Razia Satpol-PP
-   **Pemicu**: `Laporan Resmi` mencapai **100 poin**. Poin ini terakumulasi dari kegagalan Raid Warga atau dari sesi dengan tamu 'Penyebar Penyakit'.
-   **Proses**: Saat `endDay`, modal **Razia Satpol-PP** akan muncul. Pemain diberi dua pilihan:
    1.  **Bayar Denda**: Membayar denda besar dari **Tabungan** untuk mengurangi durasi penyegelan.
    2.  **Terima Konsekuensi**: Menolak bayar, menerima durasi penyegelan yang lebih lama.
-   **Konsekuensi**: Asrama disegel, reputasi anjlok, dan agensi memasuki status **"Dalam Pengawasan"** selama 14 hari, yang menggandakan perolehan poin `Kecurigaan`. Kasus juga dilimpahkan ke Polisi, mengaktifkan `Penyelidikan Polisi`.

### 5.3. Tahap 3: Penggerebekan Polisi
-   **Pemicu**: `Penyelidikan Polisi` mencapai **100 poin**. Poin ini terakumulasi dari pelimpahan kasus Satpol-PP, skandal *Doxxing*, atau sesi berisiko tinggi saat "Dalam Pengawasan".
-   **Proses**: Ini adalah peristiwa katastrofik yang tidak bisa dicegah. Modal **Penggerebekan Polisi** akan muncul saat `endDay`.
-   **Konsekuensi (Bencana)**:
    -   Sebagian besar **Uang Kas dan Tabungan disita**.
    -   **3 talenta terbaik ditangkap** dan dihapus permanen dari game.
    -   Agensi mendapatkan **Catatan Kriminal permanen**: biaya operasional naik 25% dan perolehan reputasi berkurang 50% selamanya.
