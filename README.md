# Kalkulator Warisan Islam (Faraidh)

Aplikasi kecil untuk menghitung pembagian warisan menurut prinsip Faraidh dan memberikan saran pembagian aset fisik. Dibangun dengan React + Vite + TypeScript. Proyek ini bersifat terbuka — silakan dikembangkan lagi dan bebas dibagikan untuk siapa saja (lisensi MIT).

Deskripsi singkat
- Hitung pembagian warisan otomatis berdasarkan input anggota keluarga dan daftar aset.
- Menangani pengurangan harta untuk wasiat, utang, dan biaya pemakaman.
- Menampilkan hasil dalam tabel dan diagram alur interaktif (React Flow).
- Memberikan saran pembagian aset fisik (mis. rumah, kendaraan) agar mendekati nilai bagian warisan.

Fitur utama
- Pembagian untuk: suami/istri, ayah/ibu, anak laki-laki/perempuan, saudara kandung/seibu.
- Pembulatan hasil ke ribuan.
- Pengecualian aset berupa uang/tabungan saat membuat saran pembagian fisik.
- Diagram alur yang otomatis menata node berdasarkan hubungan.

Aturan pembagian (ringkasan matematis)
- Suami: $$\text{Suami}=\begin{cases}1/4 & \text{jika ada anak}\\1/2 & \text{jika tidak ada anak}\end{cases}$$  
- Istri total: $$\text{Istri(total)}=\begin{cases}1/8 & \text{jika ada anak}\\1/4 & \text{jika tidak ada anak}\end{cases}$$  
- Ibu: $1/6$ jika ada anak atau ada saudara; selain itu $1/3$.  
- Anak-anak: pembagian ashabah ($2 : 1$ antara putra : putri) apabila masih tersisa setelah bagian tetap.

Demo komponen & simbol utama (buka file untuk implementasi)
- Komponen utama: [`InheritanceCalculator`](src/InheritanceCalculator.tsx)  
- Form aset: [`AssetList`](src/components/AssetList.tsx)  
- Form anggota keluarga: [`MemberList`](src/components/MemberList.tsx)  
- Form wasiat/utang/biaya: [`WasiatUtangBiayaForm`](src/components/WasiatUtangBiaya.tsx)  
- Tabel hasil: [`ResultTable`](src/components/ResultTable.tsx)  
- Saran aset fisik: [`AssetSuggestion`](src/components/AssetSuggestion.tsx)  
- Diagram alur warisan: [`InheritanceFlow`](src/components/InheritanceFlow.tsx)  
- Tipe data: [`Member`](src/types/inheritance.ts), [`Result`](src/types/inheritance.ts), [`Asset`](src/types/inheritance.ts), [`Suggestion`](src/types/inheritance.ts)  

Struktur proyek (file penting)
- [`.gitignore`](.gitignore)  
- [`eslint.config.js`](eslint.config.js)  
- [`index.html`](index.html)  
- [`package.json`](package.json)  
- [`vite.config.ts`](vite.config.ts)  
- [`tsconfig.json`](tsconfig.json)  
- [`tsconfig.app.json`](tsconfig.app.json)  
- [`tsconfig.node.json`](tsconfig.node.json)  
- [`src/index.css`](src/index.css)  
- [`src/main.tsx`](src/main.tsx)  
- [`src/InheritanceCalculator.tsx`](src/InheritanceCalculator.tsx)  
- [`src/components/AssetList.tsx`](src/components/AssetList.tsx)  
- [`src/components/MemberList.tsx`](src/components/MemberList.tsx)  
- [`src/components/WasiatUtangBiaya.tsx`](src/components/WasiatUtangBiaya.tsx)  
- [`src/components/ResultTable.tsx`](src/components/ResultTable.tsx)  
- [`src/components/AssetSuggestion.tsx`](src/components/AssetSuggestion.tsx)  
- [`src/components/InheritanceFlow.tsx`](src/components/InheritanceFlow.tsx)  
- [`src/types/inheritance.ts`](src/types/inheritance.ts)

Contoh penggunaan (lokal)
1. Instal dependensi:
```bash
npm install
```
2. Jalankan mode pengembangan:
```bash
npm run dev
```
3. Build untuk produksi:
```bash
npm run build
```

Tips pengembangan
- Tambahkan validasi input dan unit tests untuk memastikan akurasi pada kasus kompleks.  
- Periksa setiap rumusan pembagian dan konsultasikan pada ahli Fiqh yang berwenang.  

Kontribusi
- Terima kontribusi: fitur, perbaikan bug, dokumentasi, dan test.  
- Disarankan menambahkan file LICENSE (MIT) dan CONTRIBUTING.md.  
- Buat branch fitur, ajukan pull request, sertakan deskripsi perubahan dan contoh kasus uji.

Peringatan hukum
- Aplikasi ini bersifat bantu hitung ( bisa jadi ada kesalahan hitung juga, tolong sampaikan jika ada ). Untuk keputusan hukum akhir terkait warisan, konsultasikan dengan pihak berwenang atau ahli fiqh setempat.