import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Memory Match Game',
  description: 'A captivating memory card matching game with multiple difficulty levels and score tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        {children}
      </body>
    </html>
  )
}