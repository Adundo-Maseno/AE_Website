import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import '../globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Content Management System | Agri Experience',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="font-dm-sans min-h-screen bg-[#F8F6F0] text-[#0F1F15] antialiased">
        {children}
      </body>
    </html>
  )
}
