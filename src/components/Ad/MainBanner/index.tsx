import AdBanner from '../AdBanner'

interface Props {
  setH2?: boolean
}

export default function MainBanner({ setH2 = false }: Props) {
  const adSlot: string = process.env.NEXT_PUBLIC_AD_MAIN || ''

  return (
    <aside className="main-banner">
      <AdBanner adSlot={adSlot} />
    </aside>
  )
}
