import styles from './SectionHeadline.module.scss'

interface Props {
  content: string
  headlineType: string
  showCategory?: boolean
  setCategory?: string
  children?: React.ReactNode
}

export default function SectionHeadline({
  content,
  headlineType,
  showCategory = false,
  setCategory = 'KATEGORIE',
  children,
}: Props) {
  return (
    <div className={styles.headlineCard}>
      {headlineType === 'h1' ? (
        <h1 className={styles.headline}>
          {showCategory && <span className={styles.category}>{setCategory}</span>}
          {content}
        </h1>
      ) : headlineType === 'h2' ? (
        <h2 className={styles.headline}>
          {showCategory && <span className={styles.category}>{setCategory}</span>}
          {content}
        </h2>
      ) : null}

      <div className={styles.dotsContainer} aria-hidden="true">
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>

      {children}
    </div>
  )
}
