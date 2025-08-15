# 🏸 PB Kena Mental - Badminton Community App

Aplikasi web lengkap untuk komunitas badminton PB Kena Mental dengan 2 fitur utama: Kalkulator Biaya dan Pembuat Undangan.

## ✨ Fitur Utama

### 🧮 **Kalkulator Biaya Badminton**
- **Perhitungan Biaya Lapangan**: Hitung biaya sewa berdasarkan tarif per jam dan durasi
- **Perhitungan Biaya Shuttlecock**: Hitung total biaya shuttlecock yang digunakan
- **Pembagian Biaya Otomatis**: Bagi biaya total secara adil untuk semua pemain
- **Manajemen Pemain**: Tambah/hapus pemain dengan mudah
- **Informasi Rekening**: Kelola multiple rekening untuk transfer
- **Ringkasan Lengkap**: Dapatkan ringkasan yang bisa dibagikan atau didownload

### 📨 **Pembuat Undangan Bermain** (NEW!)
- **Informasi Lapangan**: Nama lapangan dan link Google Maps
- **Jadwal Lengkap**: Tanggal, jam mulai, dan jam selesai
- **Upload Gambar**: Tambahkan gambar untuk undangan (opsional)
- **Catatan Khusus**: Informasi tambahan atau aturan bermain
- **Share Instant**: Bagikan undangan ke WhatsApp atau media sosial

## 🚀 Teknologi

- **Framework**: Next.js 14 dengan TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Image Capture**: html2canvas
- **Deployment**: Vercel-ready

## 📋 Input yang Didukung

### Kalkulator Biaya
#### Informasi Lapangan
- Nama Lapangan
- Biaya sewa lapangan per jam
- Lama sewa lapangan (jam)

#### Informasi Waktu Bermain
- Tanggal bermain
- Jam bermain

#### Informasi Shuttlecock
- Biaya satuan shuttlecock
- Total shuttlecock habis

#### Informasi Pemain
- Nama-nama orang yang ikut (dinamis)
- Jumlah orang/pemain (otomatis)

#### Informasi Tambahan
- Catatan atau informasi tambahan
- Informasi transfer rekening (multiple rekening)

### Pembuat Undangan
#### Informasi Lapangan
- Nama Lapangan
- Link Google Maps (opsional)

#### Informasi Waktu
- Tanggal bermain
- Jam mulai
- Jam selesai

#### Media
- Upload gambar undangan (maksimal 5MB)

#### Catatan
- Informasi tambahan atau aturan khusus

## 📊 Output

### Kalkulator Biaya
- **Rincian Biaya**: Breakdown biaya lapangan dan shuttlecock
- **Total Biaya**: Jumlah keseluruhan biaya
- **Biaya per Orang**: Pembagian biaya yang adil
- **Daftar Pemain**: Nama semua pemain dengan biaya masing-masing
- **Informasi Transfer**: Detail rekening untuk pembayaran
- **Ringkasan**: Format yang bisa dibagikan via WhatsApp/social media

### Pembuat Undangan
- **Undangan Visual**: Layout menarik dengan logo PB Kena Mental
- **Informasi Lengkap**: Semua detail acara dalam satu tempat
- **Link Lokasi**: Akses langsung ke Google Maps
- **Call to Action**: Ajakan untuk bergabung bermain

## 🛠️ Instalasi dan Development

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd badminton-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment ke Vercel

### Otomatis via GitHub

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Import repository
   - Deploy otomatis

### Manual via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Project name: `pb-kena-mental-app`
   - Framework: `Next.js`
   - Build command: `npm run build`
   - Output directory: `.next`

## 📱 Fitur Export & Share

### Kalkulator Biaya
- **Share**: Bagikan ringkasan via native share API atau copy to clipboard
- **Download TXT**: Download ringkasan dalam format text file
- **Download PDF**: Download ringkasan dalam format PDF profesional
- **Download PNG**: Download ringkasan sebagai gambar berkualitas tinggi

### Pembuat Undangan
- **Share**: Bagikan undangan via native share API atau copy to clipboard
- **Download TXT**: Download undangan dalam format text file
- **Download PNG**: Download undangan sebagai gambar berkualitas tinggi

### Responsive Design
- **Mobile First**: Optimized untuk penggunaan mobile
- **Desktop Friendly**: Tampilan yang baik di desktop
- **Touch Friendly**: Button dan input yang mudah digunakan

### User Experience
- **Mode Selector**: Toggle mudah antara Calculator dan Invitation
- **Real-time Validation**: Validasi input yang user-friendly
- **Loading States**: Feedback visual untuk user actions
- **Error Handling**: Penanganan error yang graceful

## 🎨 Customization

### Warna dan Theme
Edit file `tailwind.config.ts` untuk mengubah color scheme:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  }
}
```

### Layout dan Styling
Edit file `app/globals.css` untuk custom styling:

```css
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg;
}
```

## 📄 Struktur Project

```
pb-kena-mental-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CalculatorForm.tsx
│   ├── CalculationResult.tsx
│   ├── InvitationForm.tsx
│   └── InvitationResult.tsx
├── types/
│   └── index.ts
├── public/
│   ├── logo-pbkm.jpg
│   ├── favicon.ico
│   └── ...
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📍 Roadmap
1. **User Authentication**: Login system untuk menyimpan data
2. **Event History**: Riwayat perhitungan dan undangan
3. **Template System**: Template undangan yang bisa dikustomisasi
4. **Notification System**: Reminder dan notifikasi
5. **Mobile App**: Aplikasi mobile native

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Badminton! 🏸**
