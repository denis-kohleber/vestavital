import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <Link href="/" aria-label="Zur Startseite" title='Startseite'>
        <picture>
          <source srcSet="/logo/vestavital-logo-l-dark.svg" media="(prefers-color-scheme: dark)" />
          <img
            alt="VestaVital Logo"
            className={styles.primaryLogo}
            width={220}
            height={35}
            loading="eager"
            fetchPriority='high'
            src="/logo/vestavital-logo-l.svg"
          />
        </picture>
      </Link>
    </header>
  )
}
