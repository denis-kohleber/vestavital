'use client'

import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import styles from './SearchInput.module.scss'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`, { scroll: false })
  }, [debouncedValue, router])

  return (
    <search className={styles.searchContainer}>
      <form
        className={styles.searchForm}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input
          aria-label="Suche"
          className={styles.searchInput}
          id="search"
          type="text"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Ihr gesuchter Artikel ..."
        />
        <button type="submit" aria-label="Suche ausführen" className={`${styles.searchInputBtn} btn-ani`}>
          <img alt="Suche-Icon" width={40} height={40} src="/icons/search.svg" />
        </button>
      </form>
    </search>
  )
}
