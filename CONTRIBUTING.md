# Contributing

Terima kasih sudah berminat berkontribusi ke proyek Kalkulator Warisan Islam (Faraidh). Panduan singkat untuk mempercepat proses kontribusi.

1. Laporan isu
- Buka issue yang jelas dengan deskripsi masalah, langkah reproduksi, dan hasil yang diharapkan.
- Sertakan screenshot atau contoh data jika relevan.

2. Mengajukan perubahan (Pull Request)
- Fork repository dan buat branch fitur/bug dengan nama deskriptif, mis. `feature/add-i18n` atau `fix/rounding-bug`.
- Ikuti gaya kode TypeScript + React yang ada.
- Sertakan deskripsi perubahan dan contoh kasus uji pada PR.
- Jika perubahan memengaruhi logika perhitungan, tambahkan unit test dan contoh input/output.

3. Testing & kualitas
- Jalankan test (jika tersedia) sebelum mengajukan PR.
- Pastikan tidak ada error TypeScript dan linting. Contoh perintah:
  - `npm install`
  - `npm run dev` (cek build lokal)
  - `npm run build` (cek produksi)
  - `npm test` (jika test tersedia)
- Gunakan format commit yang jelas: `type(scope): short description` (opsional).

4. Peninjauan PR
- PR akan ditinjau oleh maintainer. Seringkali akan ada masukan; harap tanggapi dan perbaiki bila perlu.
- Jaga perubahan kecil per PR untuk memudahkan review.

5. Gaya kode & praktik
- Gunakan TypeScript dengan tipe yang jelas.
- Tambahkan/ubah tipe di `src/types` bila diperlukan.
- Pertahankan konsistensi penggunaan helper seperti `roundToThousands`.
- Dokumentasikan perubahan API atau behavior di README jika perlu.

6. Lisensi
- Kontribusi akan dilisensikan di bawah lisensi MIT (lihat LICENSE).

7. Pertanyaan atau diskusi
- Untuk diskusi besar (fitur baru, perubahan aturan pembagian), buka issue terlebih dahulu untuk mendapat masukan sebelum mengerjakan.

Terima kasih atas kontribusinya. Semua kontribusi membantu membuat proyek ini lebih bermanfaat bagi banyak orang.