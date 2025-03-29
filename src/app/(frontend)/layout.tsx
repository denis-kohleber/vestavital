import React from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'

import './globals.scss'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


// Font files can be colocated inside of `app`
const raleway = localFont({
  src: './../../../public/fonts/Raleway-VariableFont_wght.ttf',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()

  return (
    <html lang="de" className={`${raleway.className} font`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/logo/favicon/site.webmanifest" />

        <meta name="google-adsense-account" content="ca-pub-8170403159936911"></meta>

        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_CLIENT}`}
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body>
        {draft && <LivePreviewListener />}

        <Header />
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  )
}
