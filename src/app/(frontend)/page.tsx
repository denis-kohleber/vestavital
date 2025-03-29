import AsideBanner from '@/components/Ad/AsideBanner'
import SectionHeadline from '@/components/SectionHeadline'
import TopBanner from '@/components/Ad/TopBanner'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import ArticleCollectionHero from '@/components/ArticleCollectionHero'
import styles from './LandingPage.module.scss'
import MainBanner from '@/components/Ad/MainBanner'
import ArticleCollectionCluster from '@/components/ArticleCollectionCluster'
import MultiplexBanner from '@/components/Ad/MultiplexAdBanner'

export const revalidate = 600 // 10 minutes

export async function generateMetadata() {
  return {
    title: 'VestaVital Magazin | Gesundheit · Ernährung · Fitness',
    description:
      'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
    keywords:
      'Gesundheit, Fitness, Ernährung, Workout, Abnehmen, Fit, Tipps, Magazin, Sport, Trends',
    openGraph: {
      title: 'VestaVital Magazin | Gesundheit · Ernährung · Fitness',
      description:
        'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
      url: 'https://www.vestavital.de',
      type: 'website',
      images: [
        {
          url: 'https://www.vestavital.de/logo/vestavital-with-bg.webp',
          width: 430,
          height: 430,
          alt: 'VestaVital',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'VestaVital Magazin | Gesundheit · Ernährung · Fitness',
      description:
        'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
      images: ['https://www.vestavital.de/logo/vestavital-with-bg.webp'],
      creator: '@vestavital',
    },
  }
}

export default async function Home() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const articles =
    (await payload.find({
      collection: 'articles',
      draft,
      depth: 1,
      limit: 11,
      overrideAccess: draft,
      pagination: false,
      sort: '-publishedAt',
    })) || null

  return (
    <div className="site-wrapper">
      <AsideBanner />
      <main className="main">
        <TopBanner />
        <section className={styles.newestArticlesSection}>
          <SectionHeadline
            content="Neuheiten"
            headlineType="h1"
            showCategory
            setCategory="AKTUELLE"
          />

          <ArticleCollectionHero
            article01={articles?.docs[0]}
            article02={articles?.docs[1]}
            article03={articles?.docs[2]}
          />

          <MainBanner />

          <ArticleCollectionCluster
            article01={articles?.docs[3]}
            article02={articles?.docs[4]}
            article03={articles?.docs[5]}
            article04={articles?.docs[6]}
          />

          <MainBanner />

          <ArticleCollectionCluster
            article01={articles?.docs[7]}
            article02={articles?.docs[8]}
            article03={articles?.docs[9]}
            article04={articles?.docs[10]}
          />
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
