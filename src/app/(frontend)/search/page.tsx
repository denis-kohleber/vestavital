import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Article } from '@/payload-types'
import { Search } from '@/search/Component'
import AsideBanner from '@/components/Ad/AsideBanner'
import TopBanner from '@/components/Ad/TopBanner'
import SectionHeadline from '@/components/SectionHeadline'
import MultiplexBanner from '@/components/Ad/MultiplexAdBanner'
import ArticleCollectionClusterTri from '@/components/ArticleCollectionClusterTri'
import styles from './SearchPage.module.scss'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const articles =
    query && query.length > 2
      ? await payload.find({
          collection: 'search',
          depth: 1,
          limit: 12,
          pagination: false,
          where: {
            or: [
              { title: { like: query } },
              { 'meta.description': { like: query } },
              { 'meta.title': { like: query } },
              { slug: { like: query } },
            ],
          },
        })
      : { totalDocs: 0, docs: [] }

  return (
    <div className="site-wrapper">
      <AsideBanner />
      <main className="main">
        <TopBanner />

        <section>
          <SectionHeadline content="Suche" headlineType="h1">
            <Search />
          </SectionHeadline>

          <div className={styles.resultContainer}>
            {articles.totalDocs > 0 ? (
              <ArticleCollectionClusterTri articles={articles.docs as unknown as Article[]} />
            ) : (
              <>
                <img
                  alt="Suche-Icon"
                  className={styles.searchIconMain}
                  loading="lazy"
                  width={110}
                  height={110}
                  src="/icons/search-yellow.svg"
                />

                <p className={styles.infoMsg}>
                  {!query || query.length === 0
                    ? 'Bitte geben Sie einen Suchbegriff ein.'
                    : query.length <= 2
                      ? 'Bitte mehr als 2 Zeichen eingeben.'
                      : 'Keine Ergebnisse gefunden.'}
                </p>
              </>
            )}
          </div>
          <div></div>
        </section>

        <section className="section-also-interesting">
          <SectionHeadline content="Auch interessant" headlineType="h2" />
          <MultiplexBanner />
        </section>
      </main>
      <AsideBanner />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `VestaVital Magazin | Artikel-Suche`,
  }
}
