import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrueSolution — Building Digital Solutions That Drive Business Growth',
  description: 'TrueSolution is a professional software development company specializing in web applications, mobile apps, custom software, UI/UX design, API integration, and cloud solutions.',
  keywords: 'software development, web development, mobile app development, custom software, UI/UX design, API integration, cloud solutions',
  authors: [{ name: 'TrueSolution' }],
  openGraph: {
    title: 'TrueSolution — Building Digital Solutions That Drive Business Growth',
    description: 'Professional software development company helping businesses grow through innovative digital solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
