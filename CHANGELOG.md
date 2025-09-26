# Catatan Perubahan (Lanjutan)

Dokumen ini berisi daftar pembaruan fitur dan mekanik game "ASRAMA BIRAHI" mulai dari versi 1.9.0 dan seterusnya. Untuk catatan perubahan yang lebih lama, silakan lihat `DEVELOPMENT_GUIDE.md`.

---
### v6.0.0 - Ekspansi Strategis Lanjutan & Manajemen Risiko
-   **Fitur Baru: Tiga Set Equipment Baru:** Menambahkan 3 set equipment baru untuk melengkapi 5 set yang sudah ada, masing-masing dengan fokus yang sangat spesifik untuk menutupi celah mekanisme gameplay:
    1.  **Hera**: Dioptimalkan untuk memaksimalkan keuntungan dan mengurangi risiko dari **Tawaran Luar (Outcall)**.
    2.  **Demeter**: Berfokus pada investasi jangka panjang untuk mempercepat **perolehan XP dan progresi talenta**.
    3.  **Athena**: Dirancang untuk efisiensi *end-game* dengan mengurangi biaya dan waktu pemulihan di **Klinik Estetika**.
-   **Sistem Manajemen Risiko Multi-Tahap Baru:** Memperkenalkan sistem penggerebekan yang dinamis dan berjenjang, dipicu oleh `Kecurigaan Warga`:
    -   **Tahap 1: Penggerebekan Warga:** Dipicu saat `Kecurigaan` mencapai ambang batas. Pemain harus memilih antara menyogok, bernegosiasi, atau bersembunyi. Kegagalan akan meningkatkan `Laporan Resmi`.
    -   **Tahap 2: Razia Satpol-PP:** Dipicu oleh `Laporan Resmi`. Mengakibatkan penyegelan asrama dan status "Dalam Pengawasan" yang meningkatkan risiko lebih lanjut.
    -   **Tahap 3: Penggerebekan Polisi:** Dipicu oleh `Penyelidikan Polisi` yang aktif. Merupakan skenario *game over* parsial yang mengakibatkan penyitaan aset besar-besaran, penangkapan talenta terbaik, dan debuff permanen pada agensi.
-   **Peningkatan UI & Keseimbangan:**
    -   Header kini menampilkan indikator visual jika agensi memiliki **Catatan Kriminal** atau sedang **Dalam Pengawasan**.
    -   Semua 8 set equipment telah di-rebalance dan nama-namanya disempurnakan agar lebih konsisten dan imersif.
    -   Aturan penamaan equipment yang ketat kini didokumentasikan di `CONTRIBUTING.md`.

### v5.0.0 - Sistem Equipment & Gacha
-   **Fitur Baru: Sistem Equipment Strategis:**
    -   Memperkenalkan sistem equipment 8-slot yang mendalam, dirancang untuk kustomisasi talenta tingkat lanjut.
    -   Setiap set memberikan bonus kuat saat 2, 4, atau 8 item dari set yang sama dikenakan, mendorong spesialisasi.
    -   **Lima Set Equipment Baru yang Sangat Spesifik** telah ditambahkan, masing-masing dioptimalkan untuk satu mekanisme gameplay unik:
        1.  **Kyma**: Untuk memaksimalkan pendapatan & performa Livestreaming.
        2.  **Fenomenal**: Untuk meningkatkan kualitas & mengurangi risiko Produksi Konten.
        3.  **Aphrodisia**: Untuk memaksimalkan skor kepuasan tamu.
        4.  **Artemisia**: Set defensif untuk mengurangi kerusakan Kesehatan & Mental.
        5.  **Windfall**: Set finansial untuk memaksimalkan laba bersih agensi dari sesi.
-   **Fitur Baru: Gacha Equipment:**
    -   Menu "Panggil" dirombak total dengan antarmuka bertab untuk memisahkan Gacha Talenta dan Gacha Equipment.
    -   Pemain kini dapat menggunakan **Dana Pribadi Talenta** untuk melakukan gacha equipment.
    -   Equipment yang didapat bersifat **spesifik untuk talenta tersebut** dan disimpan di inventaris pribadinya.
    -   Terdapat opsi tarikan 1x dan 10x, dengan diskon untuk tarikan massal.
-   **Mekanik Baru: Biaya Gacha Dinamis:** Biaya untuk Gacha Equipment dihitung secara dinamis berdasarkan `Daya Pikat` dan `Rarity` talenta yang dipilih, membuat investasi pada talenta tingkat tinggi terasa lebih premium.
-   **Peningkatan UI & Visual:**
    -   Antarmuka Gacha Equipment menampilkan equipment yang sedang terpasang untuk memberikan konteks strategis.
    -   Tombol gacha kini berubah warna secara dinamis sesuai dengan `Rarity` talenta yang dipilih, memberikan feedback visual yang premium.

### v4.0.0 - Ekspansi Strategis: Klinik, Tawaran Luar & Manajemen Risiko
-   **Fitur Baru: Klinik Estetika:** Menu "Klinik" kini berfungsi penuh, dapat diakses dari Navigasi Bawah.
    -   Pemain dapat memilih talenta yang tersedia untuk menjalani operasi plastik.
    -   Fitur ini memungkinkan **modifikasi permanen** pada sebagian besar atribut fisik dan intim talenta.
    -   Biaya operasi dihitung secara dinamis berdasarkan kelangkaan talenta, besarnya perubahan, dan atribut yang diubah.
    -   Setelah operasi, talenta akan memasuki masa **pemulihan** selama beberapa hari, di mana mereka tidak dapat berpartisipasi dalam aktivitas apa pun.
-   **Fitur Baru: Tawaran Luar (Outcall):** Selama Fase Malam, pemain kini memiliki opsi untuk mengirim talenta yang dipilih dalam "Tugas Luar".
    -   Ini adalah aktivitas berisiko tinggi dengan potensi pendapatan yang jauh lebih besar daripada sesi biasa.
    -   Terdapat tiga jenis tawaran: per Jam, Harian, dan Mingguan, masing-masing dengan pengganda pendapatan dan durasi ketidaktersediaan yang berbeda.
-   **Mekanik Baru: Manajemen Risiko (Kondom):**
    -   Di menu Toko, pemain kini dapat membeli item konsumsi baru: **Kondom**.
    -   Sebelum memulai sesi di dalam asrama, pemain dapat memilih untuk menggunakan kondom dari inventaris.
    -   Penggunaan kondom secara signifikan **mengurangi** (namun tidak sepenuhnya menghilangkan) risiko peningkatan `PotensiHIVAIDS` dan `PotensiHamil` pada talenta.
-   **Mekanik Baru: Siklus Haid:** Talenta kini memiliki kemungkinan kecil untuk mengalami menstruasi di awal sesi. Jika terjadi, sesi akan dibatalkan, dan talenta akan menjadi tidak tersedia selama 7 hari untuk beristirahat.
-   **Peningkatan Mekanik Produksi Konten:** Konten (Foto/Video) yang disimpan di inventaris talenta kini memiliki peluang untuk "terjual" secara pasif setiap hari, menghasilkan pendapatan tambahan untuk agensi dan dana pribadi untuk talenta di akhir malam.
-   **Peningkatan Mekanik Perawatan Talenta:** Talenta yang tidak bekerja (tidak melayani sesi atau melakukan tugas luar) selama Fase Malam kini akan memulihkan sejumlah kecil `Kesehatan` secara pasif.

### v3.0.0 - Produksi Konten & Manajemen Perlengkapan Lanjutan
-   **Fitur Baru: Produksi Konten:** Talenta kini dapat memproduksi konten (Foto atau Video) selama **Fase Siang** sebagai alternatif dari livestreaming.
    -   Aksi ini membutuhkan perlengkapan spesifik: **Kamera** (DSR/Handycam) dan **Laptop**, yang dapat dibeli di Toko.
    -   Pemain memilih jenis konten dan **tema** produksi (misal: "Gadis Desa Polos", "MILF Dominan"), di mana setiap tema memiliki tantangan atribut yang berbeda.
-   **Mekanik Baru: Hasil Produksi:**
    -   Produksi konten menghasilkan **dana langsung untuk Talenta** dan **komisi untuk Agensi**.
    -   Aksi ini juga meningkatkan **Popularitas** dan **Pengikut (Followers)** talenta secara signifikan.
    -   Setiap sesi produksi mengonsumsi `Energi` dan `Mental` talenta.
-   **Mekanik Baru: Risiko Skandal:**
    -   Setiap sesi produksi memiliki risiko memicu **Skandal**.
    -   Risiko ini dipengaruhi oleh `Mental` talenta dan kualitas `Laptop` yang digunakan. Laptop yang buruk meningkatkan risiko secara signifikan.
    -   Skandal dapat berupa **Konten Bocor** (debuff pada perolehan popularitas) atau **Doxxing** (data pribadi bocor, mengunci `Mental` talenta pada level rendah untuk sementara).
-   **UI Baru: Manajemen Perlengkapan Produksi:**
    -   Modal baru memungkinkan pemain untuk memasang atau melepas perlengkapan produksi (kamera, laptop) pada talenta, menambah lapisan manajemen aset.

### v2.1.0 - Livestreaming & Sistem Ponsel
-   **Fitur Baru: Toko Ponsel:** Menu "Toko" kini berfungsi, memungkinkan pemain membeli berbagai jenis ponsel dengan Uang Kas. Setiap ponsel memiliki buff unik yang memengaruhi performa livestream.
-   **Mekanik Baru: Perlengkapan Ponsel:** Talenta kini memiliki slot "Ponsel". Pemain dapat melengkapi talenta dengan ponsel dari inventaris agensi melalui profil talenta.
-   **Fitur Baru: Livestreaming:** Talenta yang dilengkapi ponsel dapat melakukan siaran langsung (livestream) selama **Fase Siang**.
    -   Livestreaming mengonsumsi `Energi` dan `Mental` talenta.
    -   Aksi ini menghasilkan **Uang Kas** langsung untuk agensi dan meningkatkan **Popularitas** talenta.
    -   Hasil siaran sangat dipengaruhi oleh atribut talenta dan buff dari ponsel yang digunakan.

### v2.0.0 - Sistem Rekrutmen Gacha
-   **Fitur Baru: Rekrutmen Talenta:** Menu "Toko" telah diganti dengan sistem "Rekrut" yang berfungsi penuh.
-   **Mekanik Baru: Gacha:** Pemain kini dapat menggunakan Uang Kas untuk melakukan rekrutmen tunggal (1x) atau massal (10x) untuk mendapatkan talenta baru.
-   **Sistem Probabilitas:** Peluang mendapatkan talenta didasarkan pada tingkat kelangkaan (`Rarity`), dengan talenta langka lebih sulit ditemukan. Rekrutmen 10x menjamin minimal satu talenta dengan rarity `Rare` atau lebih baik.
-   **Mekanik Baru: Konversi Duplikat:** Mendapatkan talenta yang sudah dimiliki akan secara otomatis mengubah kartu duplikat tersebut menjadi bonus XP untuk talenta yang bersangkutan, mempercepat progresinya.
-   **Mekanik Baru: Sistem Makam Talenta & Reinkarnasi** Talenta yang mencapai usia 36 tahun akan "pensiun" dan masuk ke dalam Makam Talenta, dapat diakses dari menu Pengaturan. Setelah masa hibernasi, pemain dapat membayar untuk mereinkarnasi talenta, mengembalikannya ke usia 17 dengan bonus statistik permanen.

### v1.9.0 - Sistem Keuangan Lanjutan (ATM & Tabungan)
-   **Fitur Baru: Pemisahan Keuangan:** Pendapatan agensi kini dibagi menjadi dua rekening:
    -   **Uang Kas (`money`):** Dana cair yang dapat langsung digunakan untuk biaya operasional (membangun, memperbaiki, dll).
    -   **Tabungan (`savings`):** Dana yang disimpan di bank, tidak dapat digunakan langsung.
-   **Mekanik Baru: Alur Pembayaran Terpisah:**
    -   Pembayaran via **Tunai** akan langsung masuk ke **Uang Kas**.
    -   Pembayaran via **QR** akan langsung masuk ke **Tabungan**, tetap memberikan bonus reputasi kecil dengan potongan biaya admin.
-   **Fitur Baru: ATM di Menu Kasir:**
    -   Pemain kini dapat mengakses fitur ATM untuk mentransfer dana antar rekening (Kas ke Tabungan, atau sebaliknya).
-   **Mekanik Baru: Pajak Transfer Progresif:**
    -   Setiap transaksi transfer melalui ATM akan dikenakan pajak progresif berdasarkan nominal transfer, menambah lapisan strategi dalam manajemen arus kas.
