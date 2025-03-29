'use client'

import { useEffect } from 'react'

export default function MultiplexBanner() {
    const adSlot: string = process.env.NEXT_PUBLIC_AD_MULTIPLEX || ''
    const adClient: string = process.env.NEXT_PUBLIC_AD_CLIENT || ''
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
            try {
                ;(window.adsbygoogle = window.adsbygoogle || []).push({
                    enable_page_level_ads: false,
                })
            } catch (e) {
                // console.error("AdSense error:", e);
            }
    }
  }, [])

  return (
    <aside className="multiplex-banner">
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-matched-content-ui-type="image_card_stacked"
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
        data-matched-content-rows-num="30,10"
        data-matched-content-columns-num="1,3"
      ></ins> */}
    </aside>
  )
}
