import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import MainBanner from '@/components/Ad/MainBanner'
import styles from '@/styles/ArticlesPage.module.scss'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ content, style }) => {
  if (style === 'advertising') return <MainBanner setH2 />
  if (style === 'section')
    return (
      <section className={styles.articleMainSection}>
        <RichText content={content} />
      </section>
    )

  return (
    <div className={style}>
      {style === 'source' && <h2>Quellen</h2>}

      <RichText content={content} />
    </div>
  )
}
