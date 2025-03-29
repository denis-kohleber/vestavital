'use client'

import { useEffect, useRef, useState } from 'react'
import { useWindowWidth } from '../../hooks/useWindowWidth'
import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image';

export default function Navbar() {
  // States for the menus
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

  const burgerBtn = useRef<HTMLButtonElement>(null)
  const navLink01 = useRef<HTMLButtonElement>(null)
  const navLink02 = useRef<HTMLAnchorElement>(null)
  const navLink03 = useRef<HTMLAnchorElement>(null)
  const navLink04 = useRef<HTMLAnchorElement>(null)
  const navLink05 = useRef<HTMLAnchorElement>(null)
  const navLink06 = useRef<HTMLAnchorElement>(null)
  const navLinks = [navLink01, navLink02, navLink03, navLink04, navLink05, navLink06]

  // Watch screen-width on resize
  const windowWidth = useWindowWidth()

  // Change Tabindex by < 800px screen-width
  useEffect(() => {
    if (windowWidth && windowWidth < 1080) {
      navLinks.forEach((element) => {
        if (element.current) element.current.tabIndex = -1
      })
    } else {
      navLinks.forEach((element) => {
        if (element.current) element.current.tabIndex = 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])

  const activateTabIndexMenu = () => {
    navLinks.forEach((element) => {
      if (element.current) element.current.tabIndex = 0
    })
  }

  const deactivateTabIndexMenu = () => {
    navLinks.forEach((element) => {
      if (element.current) element.current.tabIndex = -1
    })
  }

  // Function that hold the tab-navigation in the open menu
  const handleBlurLastLink = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (windowWidth && windowWidth > 1080) return

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      if (burgerBtn.current) burgerBtn.current.focus()
    }
  }

  const showCloseMenu = () => {
    jumpToNav()

    if (isMenuActive) deactivateTabIndexMenu()
    if (!isMenuActive) activateTabIndexMenu()
    setIsMenuActive((prevState) => !prevState)
  }

  const removeMenus = () => {
    setIsMenuActive(() => false)
    deactivateTabIndexMenu()
  }

  // Necessary, because the menus must be in full height, when opening them.
  const navRef = useRef<HTMLElement>(null)
  const jumpToNav = () => {
    if (navRef.current) {
      navRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  //   ----- SCROLL-ANIMATION-LOGO -----

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 49)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={styles.mainNav} ref={navRef}>
      <div className={styles.navWrapper}>
        <Link
          title="Startseite"
          href="/"
          className={styles.logoLink}
          aria-label="Zur Startseite"
          onClick={removeMenus}
          onMouseDown={(e) => e.preventDefault()}
        >
          <picture>
            <source
              srcSet="/logo/vestavital-logo-l-dark.svg"
              media="(prefers-color-scheme: dark)"
            />
            <img
              alt="VestaVital Logo"
              width={140}
              height={42}
              loading="lazy"
              className={`${styles.logo} ${styles[(isScrolled && 'active') || '']}`}
              src="/logo/vestavital-logo-l.svg"
            />
          </picture>
        </Link>

        <button
          className={`${styles.navBtn} ${styles.navBtnBurger}`}
          ref={burgerBtn}
          aria-label="Menü öffnen/schließen"
          onClick={showCloseMenu}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg
            className={`${styles.ham} ${styles.hamRotate}
             ${styles[(isMenuActive && 'active') || '']}`}
            viewBox="0 0 100 100"
            width="33px"
            height="33px"
          >
            <path
              className={`${styles.line} ${styles.top}`}
              d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
            />
            <path className={`${styles.line} ${styles.middle}`} d="m 70,50 h -40" />
            <path
              className={`${styles.line} ${styles.bottom}`}
              d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 
          8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
            />
          </svg>
        </button>
      </div>

      <div className={`${styles.navLinkContainer} ${styles[(isMenuActive && 'active') || '']}`}>
        <Link
          ref={navLink02}
          href="/categories/ernaehrung"
          className={styles.navLink}
          onClick={removeMenus}
          onMouseDown={(e) => e.preventDefault()}
        >
          <img
            alt="Chefkoch-Hut Icon"
            width={20}
            height={20}
            loading="eager"
            fetchPriority="high"
            src="/icons/chef-hat.svg"
          />
          ERNÄHRUNG
        </Link>
        <Link
          ref={navLink03}
          href="/categories/fitness"
          className={styles.navLink}
          onClick={removeMenus}
          onMouseDown={(e) => e.preventDefault()}
        >
          <img
            alt="Chefkoch-Hut Icon"
            width={20}
            height={20}
            loading="eager"
            fetchPriority="high"
            src="/icons/bike.svg"
          />
          FITNESS
        </Link>
        <Link
          ref={navLink04}
          href="/categories/gewicht"
          className={styles.navLink}
          onClick={removeMenus}
          onMouseDown={(e) => e.preventDefault()}
        >
          <img
            alt="Fahrradfahrer Icon"
            width={20}
            height={20}
            loading="eager"
            fetchPriority="high"
            src="/icons/weight.svg"
          />
          GEWICHT
        </Link>
        <Link
          ref={navLink05}
          onClick={removeMenus}
          href="/categories/lifestyle"
          className={styles.navLink}
          onMouseDown={(e) => e.preventDefault()}
        >
          <img
            alt="Kleeblatt Icon"
            width={20}
            height={20}
            loading="eager"
            fetchPriority="high"
            src="/icons/clover.svg"
          />
          LIFESTYLE
        </Link>
        <Link
          ref={navLink06}
          onKeyDown={(e) => handleBlurLastLink(e)}
          onClick={removeMenus}
          href="/categories/forschung"
          className={styles.navLink}
          onMouseDown={(e) => e.preventDefault()}
        >
          <img
            alt="Reagenzglas Icon"
            width={20}
            height={20}
            loading="eager"
            fetchPriority="high"
            src="/icons/test-pipe.svg"
          />
          FORSCHUNG
        </Link>
      </div>

      <Link
        href="/search"
        className={`${styles.navBtn} ${styles.navBtnSearch}`}
        onClick={removeMenus}
        onMouseDown={(e) => e.preventDefault()}
        aria-label="Zur Artikelsuche"
        title="Artikelsuche"
      >
        <picture>
          <source srcSet="/icons/search-dark.svg" media="(prefers-color-scheme: dark)" />
          <img alt="Suche-Icon" width={40} height={40} src="/icons/search.svg" />
        </picture>
      </Link>

      <div
        className={`${styles.darkBg} ${isMenuActive ? styles.active : ''}`}
        onClick={removeMenus}
      ></div>
    </nav>
  )
}
