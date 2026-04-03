import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Apply — ItalyCreatives',
  robots: { index: false, follow: false },
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>
      {children}
    </div>
  )
}
