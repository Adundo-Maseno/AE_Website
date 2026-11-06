import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Content Management System | Agri Experience',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0F1F15] antialiased">
      {children}
    </div>
  )
}
