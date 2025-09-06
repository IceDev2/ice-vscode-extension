
# ICE Language Support for VS Code

Fitur:
- Pewarnaan sintaks (TextMate grammar)
- Snippets (kelas, tugas, jika/kalau, selagi, untuk, properti)
- Auto-complete: keyword, built-in (`tampilkan`, `rentang`, dll), serta nama `kelas` & `tugas` yang terdeteksi di file aktif

## Instalasi (Developer)
1. Buka folder ini di VS Code.
2. Jalankan `npm install`.
3. Tekan `F5` untuk menjalankan **Extension Development Host** (VS Code instance kedua) lalu buka file `*.ice`.

## Packaging jadi VSIX
```bash
npm run compile
npm run package    # menghasilkan file .vsix
```
Kemudian, di VS Code: `Extensions` → menu `...` → `Install from VSIX...`.

## Catatan Grammar
Highlight mencakup:
- keyword kontrol: `jika`, `jikalau`, `kalau`, `selagi`, `untuk`, `dalam`, `kembalikan`
- tipe gaya: `bilangan`, `desimal`, `teks`, `boolean`
- OOP: `kelas`, `baru`, `properti`, `get`, `set`, `ini`, `super`
- built-in: `tampilkan`, `rentang`, `panjang`, `tipe`, `int`, `float`, `str`
- angka, string, operator komparasi & aritmatika, `//` komentar

## Roadmap (opsional)
- Hover docs untuk built-in
- Signature help untuk `tugas`
- Integrasi Language Server agar auto-complete lintas file & diagnosa error
