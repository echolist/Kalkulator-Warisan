# Kalkulator Warisan Islam (Faraidh)

Aplikasi kecil untuk menghitung pembagian warisan menurut prinsip Faraidh dan memberikan saran pembagian aset fisik. Dibangun dengan React + Vite + TypeScript.

Fitur utama
- Hitung pembagian warisan (suami/istri, ayah/ibu, anak-anak, saudara) berdasarkan aturan umum.
- Dukungan pengurangan harta untuk wasiat, utang, dan biaya pemakaman.
- Tampilan tabel hasil dan diagram alur (React Flow).
- Saran pembagian aset fisik berdasarkan nilai aset.

Demo komponen & file utama
- Komponen utama: [`InheritanceCalculator`](src/InheritanceCalculator.tsx)  
- Form aset: [`AssetList`](src/components/AssetList.tsx)  
- Form anggota keluarga: [`MemberList`](src/components/MemberList.tsx)  
- Form wasiat/utang/biaya: [`WasiatUtangBiayaForm`](src/components/WasiatUtangBiaya.tsx)  
- Tabel hasil: [`ResultTable`](src/components/ResultTable.tsx)  
- Saran aset fisik: [`AssetSuggestion`](src/components/AssetSuggestion.tsx)  
- Diagram alur warisan: [`InheritanceFlow`](src/components/InheritanceFlow.tsx)  
- Tipe data: [`Member`, `Result`, `Asset`, `Suggestion`](src/types/inheritance.ts)

Struktur proyek (file penting)
- [.gitignore](.gitignore)  
- [eslint.config.js](eslint.config.js)  
- [index.html](index.html)  
- [package.json](package.json)  
- [vite.config.ts](vite.config.ts)  
- [tsconfig.json](tsconfig.json), [tsconfig.app.json](tsconfig.app.json), [tsconfig.node.json](tsconfig.node.json)  
- [src/index.css](src/index.css)  
- [src/main.tsx](src/main.tsx)  
- [src/InheritanceCalculator.tsx](src/InheritanceCalculator.tsx)  
- [src/components/AssetList.tsx](src/components/AssetList.tsx)  
- [src/components/MemberList.tsx](src/components/MemberList.tsx)  
- [src/components/WasiatUtangBiaya.tsx](src/components/WasiatUtangBiaya.tsx)  
- [src/components/ResultTable.tsx](src/components/ResultTable.tsx)  
- [src/components/AssetSuggestion.tsx](src/components/AssetSuggestion.tsx)  
- [src/components/InheritanceFlow.tsx](src/components/InheritanceFlow.tsx)  
- [src/types/inheritance.ts](src/types/inheritance.ts)

Aturan pembagian (ringkasan matematis)
- Suami: $$\text{Suami}=\begin{cases}1/4 & \text{jika ada anak}\\1/2 & \text{jika tidak ada anak}\end{cases}$$  
- Istri total: $$\text{Istri(total)}=\begin{cases}1/8 & \text{jika ada anak}\\1/4 & \text{jika tidak ada anak}\end{cases}$$  
- Ibu: $1/6$ jika ada anak atau ada saudara, selain itu $1/3$.  
- Anak-anak: pembagian ashabah ($2 : 1$ antara putra : putri) apabila masih tersisa setelah bagian tetap.  
Contoh pada kode: pembulatan ke ribuan diterapkan melalui helper `roundToThousands` di [`InheritanceCalculator`](src/InheritanceCalculator.tsx).

Cara menjalankan
1. Instal dependensi:
```bash
npm install