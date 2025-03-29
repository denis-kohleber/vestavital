import AdBanner from '../AdBanner'

export default function TopBanner() {
  const adSlot: string = process.env.NEXT_PUBLIC_AD_TOP || ''

  return (
    <aside className="top-banner">
      <AdBanner adSlot={adSlot} />
    </aside>
  )
}
