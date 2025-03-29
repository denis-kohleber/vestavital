import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchPlugin } from '@payloadcms/plugin-search'
import { searchFields } from '@/search/fieldOverrides'

import { Article } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { beforeSyncWithSearch } from '@/search/beforeSync'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud';

const generateTitle: GenerateTitle<Article> = ({ doc }) => {
  return doc?.title ? `${doc.title} | VestaVital Magazin` : 'VestaVital Magazin'
}

const generateURL: GenerateURL<Article> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['articles'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  vercelBlobStorage({
    enabled: false,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  }),
//   s3Storage({
//     enabled: false,
//     collections: {
//       media: true,
//     },
//     bucket: process.env.S3_BUCKET!,
//     acl: 'public-read',
//     config: {
//       forcePathStyle: true,
//       credentials: {
//         accessKeyId: process.env.S3_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
//       },
//       region: process.env.S3_REGION,
//       endpoint: process.env.S3_ENDPOINT,
//       // ... Other S3 configuration
//     },
//   }),
  //   payloadCloudPlugin(),
]
