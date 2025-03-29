import { Media } from '../Media'
import type { Article } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import styles from './ArticleHero.module.scss'

interface Props {
  doc: Article
  imgSize?: string
  imgClassName?: string
  imgPriorityHight?: boolean
  imgLoading?: 'lazy' | 'eager'
  articleClassName?: string
  fill?: boolean
}

export default function ArticleHero({
  doc,
  imgSize,
  imgClassName = '',
  imgPriorityHight = true,
  imgLoading = 'lazy',
  fill = false,
}: Props) {
  const { meta, title, populatedAuthors, publishedAt, readingTime } = doc || {}
  const { description, image: metaImage } = meta || {}

  return (
    <header className={styles.articleHeroSection}>
      {metaImage && typeof metaImage !== 'string' && (
        <Media
          resource={metaImage}
          size={imgSize}
          imgClassName={imgClassName}
          priority={imgPriorityHight}
          loading={imgLoading}
          fill={fill}
        />
      )}

      <div className={styles.articleHeroBody}>
        <div className={styles.articleHeroHeader}>
            <time dateTime={publishedAt || ''}>
              <picture>
                <source srcSet="/icons/calendar-dark.svg" media="(prefers-color-scheme: dark)" />
                <img
                  alt="Datum Icon"
                  width={17}
                  height={17}
                  loading="lazy"
                  fetchPriority="auto"
                  src="/icons/calendar.svg"
                />
              </picture>
              {publishedAt ? formatDateTime(publishedAt) : ''}
            </time>

            <p>
              <picture>
                <source srcSet="/icons/clock-dark.svg" media="(prefers-color-scheme: dark)" />
                <img
                  alt="Zettel Icon"
                  width={17}
                  height={17}
                  loading="lazy"
                  fetchPriority="auto"
                  src="/icons/clock.svg"
                />
              </picture>
              {`${readingTime} min.`}
            </p>
        </div>

        <h1 className={styles.headline}>{title}</h1>

        <p className={styles.author}>{populatedAuthors?.map((author) => author.name).join(' · ')}</p>
        
        <p className={styles.description}>{description}</p>
        
        <span className={styles.partingLine}></span>
      </div>
    </header>
  )
}
