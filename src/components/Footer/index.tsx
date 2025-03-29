import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <figure className={styles.figure}>
        <picture>
          <source srcSet="logo/vestavital-logo-l-dark.svg" media="(prefers-color-scheme: dark)" />
          <img
            alt="VestaVital Logo"
            width={220}
            height={35}
            loading="lazy"
            src="/logo/vestavital-logo-l.svg"
          />
        </picture>

        <figcaption>
          Ihr Magazin für Gesundheit und körperliche Fitness
        </figcaption>
      </figure>

      <nav className={styles.nav}>
        <Link className={styles.link} href="/impressum">
          Impressum
        </Link>
        <Link className={styles.link} href="/datenschutz">
          Datenschutz
        </Link>
        <Link className={styles.link} href="/kontakt">
          Kontakt
        </Link>
      </nav>

      <p className={styles.copyrightText}>&copy; 2025 VestaVital · Alle Rechte vorbehalten.</p>
    </footer>
  )
}
