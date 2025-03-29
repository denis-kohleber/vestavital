import { Media } from '../Media'
import type { Article } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import Link from 'next/link'
import styles from './ArticleCard.module.scss'

interface Props {
  doc: Article
  imgSize?: string
  imgClassName?: string
  imgClassNameSecond?: string
  imgPriorityHight?: boolean
  imgLoading?: 'lazy' | 'eager'
  articleClassName?: string
  setH3?: boolean
  fill?: boolean
}

export default function ArticleCard({
  doc,
  imgSize,
  imgClassName = '',
  imgClassNameSecond = '',
  imgPriorityHight = false,
  imgLoading = 'lazy',
  articleClassName,
  setH3 = false,
  fill = false,
}: Props) {
  const { slug, meta, title, populatedAuthors, publishedAt, readingTime } = doc || {}
  const { description, image: metaImage } = meta || {}
  const href = `/articles/${slug}`


  return (
    <article className={`${styles.articleCard} ${styles[articleClassName || '']}`}>
      <Link className={styles.articleLink} href={href} aria-label={`Artikel aufrufen: ${title}`}>
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill={fill}
            resource={metaImage}
            size={imgSize}
            imgClassName={imgClassName}
            imgClassNameSecond={imgClassNameSecond}
            priority={imgPriorityHight}
            loading={imgLoading}
          />
        )}

        <time dateTime={publishedAt || ''} className={styles.date}>
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

        <div className={styles.articleCardBody}>
          {setH3 ? (
            <h3 className={styles.headline}>{title}</h3>
          ) : (
            <h2 className={styles.headline}>{title}</h2>
          )}
          <p className={styles.description}>{description}</p>
          <footer className={styles.articleCardFooter}>
            <p className={styles.author}>
              {populatedAuthors?.map((author) => author.name).join(' · ')}
            </p>
            <p className={styles.readingTime}>
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
          </footer>
        </div>
      </Link>
    </article>
  )
}
