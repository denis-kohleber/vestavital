import type { Article } from '@/payload-types'
import ArticleCard from '../ArticleCard'
import styles from './ArticleCollectionHero.module.scss'

interface Props {
  article01: Article
  article02: Article
  article03: Article
}

export default function ArticleCollectionHero({ article01, article02, article03 }: Props) {
  return (
    <div className={styles.articleCollectionHero}>
      <ArticleCard
        doc={article01}
        imgLoading="eager"
        imgPriorityHight
        imgClassName="collection"
      />
      <div className={styles.secondRow}>
        <ArticleCard
          doc={article02}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond="collection"
          articleClassName="halfCard"
          imgLoading="lazy"
        />
        <ArticleCard
          doc={article03}
          imgSize="50vw"
          imgClassName="collectionHeroSecondRow"
          imgClassNameSecond="collection"
          articleClassName="halfCard"
          imgLoading="lazy"
        />
      </div>
    </div>
  )
}
