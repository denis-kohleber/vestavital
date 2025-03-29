'use client'

import React, { useEffect } from 'react'

interface AdBannerProps {
  adSlot: string
  adFormat?: string
}

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

export default function AdBanner({ adSlot, adFormat = 'auto' }: AdBannerProps) {

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
            enable_page_level_ads: false,
        });
      } catch (e) {
        // console.error("AdSense error:", e);
      }
    }
  }, []);

  const adClient: string = process.env.NEXT_PUBLIC_AD_CLIENT || ''

  return (
    null
    // <ins
    //   className="adsbygoogle"
    //   style={{ display: 'block' }}
    //   data-ad-client={adClient}
    //   data-ad-slot={adSlot}
    //   data-ad-format={adFormat}
    //   data-full-width-responsive="true"
    // ></ins>
  )
}
