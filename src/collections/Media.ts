import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import path from 'path'
import { fileURLToPath } from 'url'
import { authenticated } from '@/access/authenticated';
import { anyone } from '@/access/anyone';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: 'alt', 
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
        create: () => false,
      },
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) data.createdBy = req.user.id
          return data
        }
      },
    ],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    withMetadata: false,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          }
        },
      },
      {
        name: 'square',
        width: 420,
        height: 420,
        formatOptions: {
            format: 'webp',
            options: {
              quality: 80,
            }
          },
      },
      {
        name: 'small',
        width: 600,
        height: 450,
        formatOptions: {
            format: 'webp',
            options: {
              quality: 80,
            }
          },
      },
      {
        name: 'medium',
        width: 800,
        height: 550,
        formatOptions: {
            format: 'webp',
            options: {
              quality: 80,
            }
          },
      },
      {
        name: 'large',
        width: 1000,
        height: 600,
        formatOptions: {
            format: 'webp',
            options: {
              quality: 80,
            }
          },
      },
    ],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
        return true
      }

      if (user?.roles?.includes('writer')) {
        return {
          createdBy: {
            equals: user.id,
          },
        }
      }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
        return true
      }

      if (user?.roles?.includes('writer')) {
        return {
          createdBy: {
            equals: user.id,
          },
        }
      }
      return false
    },
  },
}
