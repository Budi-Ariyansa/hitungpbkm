# Update Fitur Kalkulator Badminton

## Perubahan yang Dilakukan

### 1. Dropdown Lapangan (Tanpa Auto-Fill Harga)
- **Sebelum**: Input manual nama lapangan dan harga sewa per jam
- **Sesudah**: Dropdown pilihan lapangan TANPA auto-fill harga sewa per jam
- **Data Source**: `/public/data/courts.json`
- **Fitur**:
  - 8 pilihan lapangan badminton di Jakarta
  - Hanya mengisi nama lapangan saat dipilih
  - Menampilkan nama lapangan dan lokasi di dropdown
  - **Biaya sewa tetap input manual** (tidak otomatis terisi)
  - Field harga tetap editable untuk fleksibilitas
  - **Digunakan di Calculator dan Invitation Form**

### 2. Dropdown Bank untuk Rekening Transfer
- **Sebelum**: Input manual nama bank
- **Sesudah**: Dropdown pilihan bank Indonesia
- **Data Source**: `/public/data/banks.json`
- **Fitur**:
  - 15 pilihan bank populer di Indonesia
  - Konsistensi nama bank di semua transaksi
  - Mencakup bank konvensional, digital, dan syariah
  - Auto-fill nama bank saat dipilih dari dropdown

### 3. Sistem Seleksi Pemain dengan Checkbox Grid
- **Sebelum**: Input manual nama pemain satu per satu
- **Sesudah**: Grid checkbox untuk memilih pemain dari daftar yang sudah ada
- **Data Source**: `/public/data/players.json`
- **Fitur**:
  - 20 pemain dengan nama lengkap dan nickname
  - Grid layout responsif (2-5 kolom tergantung ukuran layar)
  - Visual feedback dengan warna dan icon check
  - Search/filter pemain berdasarkan nama atau nickname
  - Tombol "Pilih Semua" dan "Hapus Semua"
  - Summary pemain yang dipilih dengan kemampuan remove individual
  - Counter jumlah pemain yang dipilih

### 4. Fitur Tambahan
- **Search Functionality**: Cari pemain berdasarkan nama atau nickname
- **Bulk Selection**: Pilih semua atau hapus semua pemain sekaligus
- **Visual Feedback**: Indikator visual yang jelas untuk pemain yang dipilih
- **Responsive Design**: Tampilan optimal di semua ukuran layar
- **Loading States**: Indikator loading saat memuat data
- **Consistent UI**: Dropdown yang sama digunakan di Calculator dan Invitation

## File yang Diubah

### 1. Data Files (Baru)
- `/public/data/courts.json` - Data lapangan badminton (tanpa harga)
- `/public/data/players.json` - Data pemain badminton
- `/public/data/banks.json` - Data bank Indonesia

### 2. Types (Diperbarui)
- `/types/index.ts` - Menambahkan interface `Court`, `PlayerData`, dan `Bank`

### 3. Components (Diperbarui)
- `/components/CalculatorForm.tsx` - Update dengan dropdown lapangan, bank, dan sistem seleksi pemain
- `/components/InvitationForm.tsx` - Update dengan dropdown lapangan yang sama

## Struktur Data

### Courts Data
```json
{
  "id": "1",
  "name": "GOR Badminton Senayan",
  "location": "Jakarta Pusat"
}
```

### Banks Data (Baru)
```json
{
  "id": "1",
  "name": "BCA (Bank Central Asia)",
  "code": "BCA"
}
```

### Players Data
```json
{
  "id": "1",
  "name": "Ahmad Rizki",
  "nickname": "Rizki"
}
```

## Cara Menambah Data

### Menambah Lapangan Baru
1. Edit file `/public/data/courts.json`
2. Tambahkan object baru dengan format yang sama
3. Pastikan `id` unik
4. **Catatan**: Harga tidak disimpan di data, tetap input manual

### Menambah Bank Baru
1. Edit file `/public/data/banks.json`
2. Tambahkan object baru dengan format yang sama
3. Pastikan `id` unik dan `code` sesuai standar

### Menambah Pemain Baru
1. Edit file `/public/data/players.json`
2. Tambahkan object baru dengan format yang sama
3. Pastikan `id` unik

## Keuntungan Pendekatan Ini

### Dropdown Lapangan Tanpa Auto-Fill Harga
- ✅ **Fleksibilitas**: Harga bisa berbeda tergantung waktu/promo
- ✅ **Konsistensi Data**: Nama lapangan tetap konsisten
- ✅ **User Control**: User tetap bisa input harga sesuai kebutuhan
- ✅ **Mudah Maintenance**: Tidak perlu update harga di data
- ✅ **Unified Experience**: Sama di Calculator dan Invitation

### Dropdown Bank
- ✅ **Konsistensi**: Nama bank selalu sama dan benar
- ✅ **User Experience**: Tidak perlu mengetik nama bank
- ✅ **Comprehensive**: Mencakup bank digital dan konvensional
- ✅ **Standardization**: Format nama bank yang standar

### Sistem Seleksi Pemain
- ✅ **Efisiensi**: Tidak perlu mengetik nama berulang-ulang
- ✅ **Konsistensi**: Nama pemain selalu sama
- ✅ **User Experience**: Interface yang intuitif dan mudah digunakan

## Kompatibilitas

- ✅ Tidak mengubah struktur data `CalculationData` dan `InvitationData`
- ✅ Tidak mengubah komponen `CalculationResult` dan `InvitationResult`
- ✅ Tidak mengubah fitur export/share
- ✅ Backward compatible dengan data yang ada

## Testing

- ✅ Build berhasil tanpa error
- ✅ TypeScript validation passed
- ✅ Responsive design tested
- ✅ Data loading tested
- ✅ Form validation tested
- ✅ Manual price input working
- ✅ Bank dropdown working
- ✅ Court dropdown working in both forms

## User Experience Improvements

1. **Faster Court Selection**: Pilih lapangan dari dropdown di Calculator dan Invitation
2. **Consistent Court Names**: Nama lapangan yang konsisten di semua fitur
3. **Flexible Pricing**: Tetap bisa input harga sesuai kondisi aktual
4. **Standardized Bank Names**: Nama bank yang konsisten dan benar
5. **Efficient Player Selection**: Tidak perlu mengetik nama pemain berulang-ulang
6. **Better UX**: Visual feedback yang jelas untuk seleksi
7. **Search Capability**: Mudah mencari pemain dari daftar yang panjang
8. **Bulk Operations**: Efisien untuk memilih banyak pemain sekaligus
9. **Unified Interface**: Konsistensi UI antara Calculator dan Invitation form
