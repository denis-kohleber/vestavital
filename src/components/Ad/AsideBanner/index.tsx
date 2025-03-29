'use client'

import { useEffect, useState } from 'react'
import AdBanner from '../AdBanner'
import { useWindowWidth } from '@/hooks/useWindowWidth'

export default function AsideBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const adSlot: string = process.env.NEXT_PUBLIC_AD_ASIDE || ''
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth && windowWidth > 1250) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])

  return isVisible ? (
    <aside className="aside-banner">
      <AdBanner adSlot={adSlot} />
    </aside>
  ) : null
}
