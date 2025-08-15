import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aplikasi Badminton - PB Kena Mental',
  description: 'Aplikasi perhitungan biaya sewa lapangan badminton dan pembagian biaya per orang',
  keywords: 'badminton, kalkulator, biaya, lapangan, shuttlecock, PB Kena Mental',
  authors: [{ name: 'PB Kena Mental' }],
  creator: 'PB Kena Mental',
  publisher: 'PB Kena Mental',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Aplikasi Badminton - PB Kena Mental',
    description: 'Aplikasi untuk menghitung biaya sewa lapangan badminton dan pembagian biaya per orang',
    type: 'website',
    locale: 'id_ID',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0284c7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="font-sans">
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
          {children}
        </div>
      </body>
    </html>
  )
}
