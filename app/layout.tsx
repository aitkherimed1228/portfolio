import type { Metadata } from 'next'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Mohamed AIT KHERI - Data Scientist & AI Engineer',
  description: 'Portfolio professionnel de Mohamed AIT KHERI, Data Scientist et ingénieur en IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
