import type { Article } from '@/payload-types'
import ArticleCard from '../ArticleCard'
import styles from './ArticleCollectionCluster.module.scss'

interface Props {
  article01: Article
  article02: Article
  article03: Article
  article04: Article
}

export default function ArticleCollectionCluster({
  article01,
  article02,
  article03,
  article04,
}: Props) {
  return (
    <div className={styles.articleCollectionCluster}>
      <div className={styles.clusterRow}>
        <ArticleCard
          doc={article01}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond='collection'
          articleClassName="halfCard"
          imgLoading="lazy"
        />
        <ArticleCard
          doc={article02}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond='collection'
          articleClassName="halfCard"
          imgLoading="lazy"
        />
      </div>
      <div className={styles.clusterRow}>
        <ArticleCard
          doc={article03}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond='collection'
          articleClassName="halfCard"
          imgLoading="lazy"
        />
        <ArticleCard
          doc={article04}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond='collection'
          articleClassName="halfCard"
          imgLoading="lazy"
        />
      </div>
    </div>
  )
}
