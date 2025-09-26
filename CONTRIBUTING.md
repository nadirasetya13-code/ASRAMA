# Panduan Kontribusi "ASRAMA BIRAHI"

Dokumen ini berisi alur kerja, aturan kode, dan panduan untuk berkontribusi pada proyek.

## 1. Alur Kerja & Kontribusi

> **CATATAN UNTUK PENGEMBANG AI:** DEVELOPER AI SEPERTIMU MEMILIKI KETERBATASAN TOKEN UNTUK MEMBACA KONTEKS DAN MENULIS CODE. ITULAH MENGAPA FILE DIBUAT KECIL DAN TERPISAH TERMASUK FILE .md

### 1.1. Aturan Penulisan Kode
-   Gunakan TypeScript secara ketat dan tulis komponen fungsional dengan React Hooks.
-   Pisahkan logika bisnis (`services`, `controllers`) dari presentasi (`components`).
-   Tulis kode yang bersih, modular, dan beri komentar pada logika yang kompleks.

### 1.2. Menambah Talenta Baru
Data talenta kini sepenuhnya terpisah dari logika. Untuk menambah talenta baru:
1.  Navigasi ke direktori `services/game/talents/`.
2.  Buka file yang sesuai dengan kelangkaan (`Rarity`) talenta baru (misal: `epic.ts`).
3.  Tambahkan objek `BaseTalent` baru ke dalam array `...Talents` di file tersebut.
4.  Talenta akan secara otomatis ditambahkan ke dalam game melalui `services/game/talents/index.ts`.
5.  Pastikan untuk menyediakan semua data yang diperlukan dan mengikuti aturan keseimbangan di bawah ini.

#### 1.2.1. Aturan Keseimbangan (Balancing Rules) Wajib
Setiap talenta baru **WAJIB** mengikuti aturan balancing berikut untuk menjaga integritas game.
1.  **Total Attribute Points (TAP) Budget**: Patuhi budget poin total sesuai kelangkaan.
2.  **Batas Atas Atribut (Attribute Cap)**: Nilai dasar individu tidak boleh melebihi 100.
3.  **Spesialisasi Melalui "Spikes"**: Setiap talenta harus memiliki 1-5 atribut unggulan, diimbangi dengan atribut lain yang lebih rendah.
4.  **Balancing Kondisi Awal**: Kondisi awal harus seimbang. Trade-off diperbolehkan (misal: kondisi awal buruk dikompensasi dengan TAP yang lebih tinggi).
5.  **Justifikasi Naratif**: Alokasi poin atribut harus dapat dijelaskan oleh cerita latar belakang.

### 1.3. Testing
Gunakan Vitest dan React Testing Library. Tulis unit test untuk fungsi-fungsi krusial di `services`.

### 1.4. Menambah Set Equipment Baru
Sistem equipment dirancang untuk memberikan lapisan strategi yang dalam. Setiap set baru harus mengikuti prinsip-prinsip desain yang ketat untuk menjaga keseimbangan dan tujuan gameplay.

#### 1.4.1. Prinsip Spesialisasi Mekanisme (Wajib!)
Ini adalah aturan yang paling fundamental: **Setiap set equipment HARUS dioptimalkan untuk SATU mekanisme gameplay SPESIFIK.** Dilarang keras membuat set yang multi-fungsi atau "general purpose". Tujuannya adalah mendorong pemain untuk membuat build talenta yang terspesialisasi.

Contoh mekanisme yang sudah ada:
-   **Livestreaming**: Fokus pada pendapatan dan performa siaran langsung.
-   **Produksi Konten**: Fokus pada kualitas konten dan pengurangan risiko skandal.
-   **Kepuasan Tamu**: Fokus pada memaksimalkan skor kepuasan dari sesi.
-   **Daya Tahan Talenta**: Fokus pada pengurangan kerusakan Kesehatan & Mental.
-   **Profitabilitas Agensi**: Fokus pada memaksimalkan laba bersih dari sesi.
-   **Tawaran Luar (Outcall)**: Fokus pada memaksimalkan imbalan dan mitigasi risiko dari tugas luar.
-   **Progresi Talenta**: Fokus pada percepatan perolehan XP dan pengembangan jangka panjang.
-   **Klinik Estetika**: Fokus pada efisiensi biaya dan waktu dari operasi plastik.

#### 1.4.2. Struktur & Distribusi Statistik
-   **Struktur Set**: Setiap set terdiri dari **8 item** dan memberikan bonus pada **2, 4, dan 8 item** yang dikenakan.
-   **Distribusi Statistik Item**: Setiap item dalam set harus mengikuti rasio alokasi efek **40/60**:
    -   **40% Statistik Umum**: Efek yang meningkatkan statistik dasar talenta (`Kecantikan`, `Stamina`, `Mental`, `Popularitas`).
    -   **60% Statistik Spesifik**: Efek yang secara langsung memengaruhi mekanisme target. Contoh: `livestreamEarningsMultiplier`, `scandalChanceReduction`, `satisfactionBonus`.

#### 1.4.3. Desain Bonus Set
-   **Bonus 2-set**: Harus memberikan keuntungan dasar yang langsung terasa untuk mekanisme target.
-   **Bonus 4-set**: Harus memberikan peningkatan yang signifikan atau menambahkan efek sekunder yang mendukung mekanisme.
-   **Bonus 8-set**: Harus menjadi "puncak" dari set tersebut, memberikan efek yang sangat kuat, unik, atau mengubah cara kerja mekanisme secara fundamental bagi talenta yang memakainya.

#### 1.4.4. Penamaan Tematik (Thematic Naming)
Penamaan adalah bagian krusial dari imersi.
-   **Hindari Nama Literal**: Jangan menamai item "Sepatu Penambah Pendapatan Livestream".
-   **Gunakan Nama Keren & Imersif**: Gunakan nama yang puitis, keren, dan membangkitkan imajinasi. Contoh yang baik:
    -   **Set**: "Kyma", "Fenomenal", "Aphrodisia", "Artemisia", "Windfall", "Hera", "Demeter", "Athena".
    -   **Item**: "Stream Tint", "Aphrodite's Kiss Rouge", "Incognito Veil".

#### 1.4.5. Format Penamaan Item (Wajib)
Untuk menjaga konsistensi data dan kemudahan pengelolaan, setiap item equipment **wajib** mengikuti format penamaan berikut secara ketat:

**Format:** `[Nama Kreatif Item] [Nama Slot] - [Nama Set]`

-   **[Nama Kreatif Item]**: Bagian imersif dan puitis dari nama (misal: `Aphrodite's Kiss Rouge`, `Confidential Step`).
-   **[Nama Slot]**: Nama slot equipment yang sesuai, ditulis dengan kapitalisasi yang benar (misal: `Makeup`, `High Heels`, `Lingerie`, `Bra`, `Celana Dalam`, `Obat Birahi`, `Parfum`, `Stocking`).
-   **[Nama Set]**: Nama set equipment (misal: `Aphrodisia`, `Hera`).

**Contoh Penerapan yang Benar:**
-   `Aphrodite's Kiss Rouge Makeup - Aphrodisia`
-   `Confidential Step High Heels - Hera`
-   `Symmetry Harness Bra - Athena`

Aturan ini memastikan bahwa setiap item dapat diidentifikasi dengan jelas baik oleh sistem maupun oleh pemain.
