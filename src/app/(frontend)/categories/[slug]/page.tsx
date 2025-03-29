import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import type { Category } from '@/payload-types' // Import types
import { cache } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AsideBanner from '@/components/Ad/AsideBanner'
import TopBanner from '@/components/Ad/TopBanner'
import SectionHeadline from '@/components/SectionHeadline'
import ArticleCollectionHero from '@/components/ArticleCollectionHero'
import MainBanner from '@/components/Ad/MainBanner'
// import ArticleCollectionCluster from '@/components/ArticleCollectionCluster'
import MultiplexBanner from '@/components/Ad/MultiplexAdBanner'
import styles from './CategoryPage.module.scss'

export const revalidate = 600 // 10 minutes

// Generate static routes for categories based on their slugs
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    draft: false,
    limit: 20,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = categories.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

// Prop types for the category page
type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params

  // Query category based on the slug
  const category = await queryCategoryBySlug({ slug })

  if (!category) {
    return {
      title: 'Kategorie nicht gefunden',
      description: 'Diese Kategorie existiert nicht.',
    }
  }

  // Metadata for the category page
  return {
    title: `VestaVital Magazin | Kategorie: ${
      category.title === 'Ernaehrung' ? 'Ernährung' : category.title
    }`,
    description:
      'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
    keywords:
      'Gesundheit, Fitness, Ernährung, Workout, Abnehmen, Fit, Tipps, Magazin, Sport, Trends',
    openGraph: {
      title: `VestaVital Magazin | Kategorie: ${
        category.title === 'Ernaehrung' ? 'Ernährung' : category.title
      }`,
      description:
        'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
      url: 'https://www.vestavital.de',
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
      title: `VestaVital Magazin | Kategorie: ${
        category.title === 'Ernaehrung' ? 'Ernährung' : category.title
      }`,
      description:
        'Dein Magazin für Gesundheit, Fitness und Ernährung mit fundierten Expertentipps und den neusten Trends für ein vitales Leben.',
      images: ['https://www.vestavital.de/logo/vestavital-with-bg.webp'],
    },
  }
}

// Main component for the category page
export default async function Category({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/'
  const category = await queryCategoryBySlug({ slug })
  const articles = await queryArticlesByCategory({ slug })

  if (!category) {
    return redirect(url) // This ensures that a 404 page is displayed
  }

  return (
    <div className="site-wrapper">
      <AsideBanner />
      <main className="main">
        <TopBanner />
        <section className={styles.newestArticlesSection}>
          <SectionHeadline
            content={category.title === 'Ernaehrung' ? 'Ernährung' : category.title}
            headlineType="h1"
            showCategory
            setCategory="KATEGORIE"
          />

          <ArticleCollectionHero
            article01={articles?.docs[0]}
            article02={articles?.docs[1]}
            article03={articles?.docs[2]}
          />

          <MainBanner />

          {/* <ArticleCollectionCluster
            article01={articles?.docs[3]}
            article02={articles?.docs[4]}
            article03={articles?.docs[5]}
            article04={articles?.docs[6]}
          /> */}
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

// Helper function to fetch a category based on the slug
const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryArticlesByCategory = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'articles',
    draft,
    limit: 7,
    overrideAccess: draft,
    pagination: false,
    sort: '-publishedAt',
    where: {
      'categories.title': {
        contains: slug, // Filter by linked category
      },
    },
  })

  return result || null
})
