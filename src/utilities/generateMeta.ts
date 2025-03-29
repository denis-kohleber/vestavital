import type { Metadata } from 'next'

import type { Article, Media } from '../payload-types'

import { getServerSideURL } from './getURL'

export const generateMeta = async (args: { doc: Partial<Article> }): Promise<Metadata> => {
  const { doc } = args || {}

  const { slug } = doc || {}

  const { title, description, keywords, image } = doc?.meta || {}
  const { sizes, alt: imageAlt } = image as Media
  const { url: imageUrl } = sizes?.square || {}

  const url = getServerSideURL()

  return {
    title: title || 'VestaVital Magazin',
    description: description,
    keywords: keywords,
    openGraph: {
      siteName: 'VestaVital Magazin',
      title: title || '',
      description: description || '',
      url: url + '/articles/' + slug,
      type: 'article',
      tags: keywords,
      images: [
        {
          url: url + imageUrl,
          width: 420,
          height: 420,
          alt: imageAlt || '',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || '',
      description: description || '',
      images: [
        {
          url: url + '/articles/' + slug,
          width: 420,
          height: 420,
          alt: imageAlt || '',
        },
      ],
      creator: '@vestavital',
    },
  }
}
