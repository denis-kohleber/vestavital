import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Article, Category, Media, User } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import RichText from '@/components/RichText'
import ArticleHero from '@/components/ArticelHero'
import { redirect } from 'next/navigation'
import AsideBanner from '@/components/Ad/AsideBanner'
import TopBanner from '@/components/Ad/TopBanner'
import MultiplexBanner from '@/components/Ad/MultiplexAdBanner'
import SectionHeadline from '@/components/SectionHeadline'
import MainBanner from '@/components/Ad/MainBanner'
import styles from '@/styles/ArticlesPage.module.scss'
import ArticleCollectionClusterTri from '@/components/ArticleCollectionClusterTri'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 6000 // 100 minutes

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = articles.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Article({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const article = await queryArticleBySlug({ slug })

  if (!article) {
    redirect('/')
  }

  // ----- Structured Data Preparation -----

  const { populatedAuthors, publishedAt, updatedAt, categories, content } =
    (article as Article) || {}
  const typedCategories = categories as Category[]
  const typedContent = content as Record<string, any>

  const { title, description, keywords, image } = article.meta || {}
  const { sizes } = image as Media

  const url = getServerSideURL()

  // Generate the `hasPart` array for the structured data

  const hasPart = typedContent?.root?.children
    .filter(
      (block: {
        fields: {
          style: string
        }
      }) => block?.fields?.style !== 'advertising',
    )
    .map((section: { fields: { content: { root: { children: any[] } } } }) => {
      // Find heading, paragraphs and list items
      const heading = section?.fields?.content?.root?.children.find(
        (child) => child.type === 'heading',
      )
      const paragraphs = section?.fields?.content?.root?.children.filter(
        (child) => child.type === 'paragraph',
      )
      const listItems = section?.fields?.content?.root?.children.filter(
        (child) => child.type === 'list',
      )

      // Create structured WebPageElement
      const sectionData: {
        '@type': string
        isAccessibleForFree: boolean
        name: string
        text: string
        listItems?: string[]
      } = {
        '@type': 'WebPageElement',
        isAccessibleForFree: true,
        name: heading ? heading.children[0]?.text : 'Unnamed Section', // Use heading as name
        text: paragraphs?.map((p) => p?.children[0]?.text).join(' '), // Combine all paragraphs into one text
      }

      // If there are list items, add them in a structured way
      if (listItems && listItems?.length > 0) {
        sectionData.listItems = listItems
          .map((list) =>
            list.children.map((item: { children: { text: any }[] }) => item.children[0]?.text),
          )
          .flat() // Flatten the nested arrays into a single array of list items
      }

      // If there are no paragraphs or list items, set text as empty
      if (paragraphs && listItems && !paragraphs.length && !listItems.length) {
        sectionData.text = '' // No text available
      }

      return sectionData
    })

  // ----- Structured Data -----

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: url + sizes?.square?.url,
    author: populatedAuthors?.map((author) => ({
      '@type': 'Person',
      name: author.name || 'Unbekannt',
      affiliation: {
        '@type': 'Organization',
        name: 'VestaVital',
      },
    })),
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${url}/articles/${slug}`
      },
    publisher: {
      '@type': 'Organization',
      name: 'VestaVital',
      logo: {
        '@type': 'ImageObject',
        url: url + '/logo/vestavital-logo-s.svg',
      },
    },
    dateCreated: publishedAt,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    genre: typedCategories?.map((category) => category.title),
    articleSection: typedCategories?.map((category) => category.title),
    hasPart: hasPart,
    keywords: keywords?.join(', '),
    inLanguage: 'de',
    timeZone: 'Europe/Berlin',
    about: typedCategories?.map((category) => ({
        '@type': 'Thing',
        name: category.title || '',
      })),
    isAccessibleForFree: true,
    medicalAudience: 'Public',
    isFamilyFriendly: true,
  }

  return (
    <>
      <script
        key="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-wrapper">
        <AsideBanner />
        <main className="main">
          <TopBanner />

          <article className={styles.siteArticle}>
            <ArticleHero
              doc={article}
              imgLoading="eager"
              imgPriorityHight
              imgClassName="collection"
            />

            <MainBanner setH2 />

            <RichText content={article.content} />

            <span className={styles.partingLine}></span>
          </article>

          <MainBanner setH2 />

          <section>
            <SectionHeadline content="Weitere Artikel" headlineType="h2" />
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <ArticleCollectionClusterTri
                articles={article.relatedArticles.filter(
                  (related): related is Article => typeof related !== 'string',
                )}
              />
            )}
          </section>

          <section className="section-also-interesting">
            <SectionHeadline content="Auch interessant" headlineType="h2" />
            <MultiplexBanner />
          </section>
        </main>
        <AsideBanner />
      </div>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const article = await queryArticleBySlug({ slug })

  return generateMeta({ doc: article })
}

const queryArticleBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'articles',
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
