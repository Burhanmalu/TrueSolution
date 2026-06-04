import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrueSolution | Software Engineering Agency',
  description: 'TrueSolution is a professional software development company specializing in web applications, mobile apps, custom software, UI/UX design, API integration, and cloud solutions.',
  keywords: 'software development, web development, mobile app development, custom software, UI/UX design, API integration, cloud solutions, TrueSolution',
  authors: [{ name: 'TrueSolution' }],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#09090B',
  openGraph: {
    title: 'TrueSolution | Software Engineering Agency',
    description: 'Professional software development company helping businesses grow through innovative digital solutions.',
    type: 'website',
    siteName: 'TrueSolution',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'TrueSolution Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'TrueSolution | Software Engineering Agency',
    description: 'Production-grade software engineering for funded startups, SMBs, and government organizations.',
    images: ['/logo.png'],
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
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#09090B" />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
