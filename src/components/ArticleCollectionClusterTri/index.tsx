import type { Article } from '@/payload-types'
import ArticleCard from '../ArticleCard'
import styles from './ArticleCollectionClusterTri.module.scss'

interface Props {
  articles: Article[]
}

export default function ArticleCollectionClusterTri({ articles }: Props) {
  return (
    <div className={styles.articleCollectionClusterTri}>
      {articles.map((article, index) => {
        return (
          <ArticleCard
            setH3
            key={index}
            doc={article}
            imgSize="50vw"
            imgClassName="collectionHeroSecondRow"
            imgClassNameSecond="collection"
            articleClassName="halfCard"
            imgLoading="lazy"
          />
        )
      })}
    </div>
  )
}
