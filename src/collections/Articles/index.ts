import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
// import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateArticle, revalidateDelete } from './hooks/revalidateArticle'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { getServerSideURL } from '@/utilities/getURL'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Articles: CollectionConfig = {
  slug: 'articles',
  // This config controls what's populated by default when a article is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    publishedAt: true,
    readingTime: true,
    authors: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'articles',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'articles',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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

    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedArticles',
              type: 'relationship',
              required: true,
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'articles',
              minRows: 6,
            },
            {
              name: 'categories',
              type: 'relationship',
              required: true,
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            {
                name: 'keywords',
                label: 'Keywords',
                type: 'text',
                required: true,
                hasMany: true,
                minRows: 4,
                maxRows: 15,
            },
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: 3,
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: '_status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Entwurf' },
        { value: 'published', label: 'Veröffentlicht' },
      ],
      admin: {
        condition: (_, { user }) => {
          // Hide the status field for non-admins or non-editors
          return user?.roles?.includes('admin') || user?.roles?.includes('editor')
        },
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateArticle],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'update' && data?._status === 'published') {
          const user = req.user

          // Only Admins or Editors can publish articles
          if (!user?.roles?.includes('admin') && !user?.roles?.includes('editor')) {
            throw new Error('Nur Admins oder Editoren dürfen Artikel veröffentlichen.')
          }
        }

        // Default processing logic
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id
          }
          return data
        }
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: ({ req: { user }, data }) => {
      const isPublishing = data?._status === 'published'

      // Only allow publishing if the user is an admin or editor
      if (isPublishing && (user?.roles?.includes('admin') || user?.roles?.includes('editor'))) {
        return true
      }

      if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
        return true
      }

      if (user?.roles?.includes('writer') && !isPublishing) {
        return {
          createdBy: {
            equals: user.id,
          },
        }
      }

      return false
    },
    delete: ({ req: { user }, data }) => {
      const isPublishing = data?._status === 'published'

      if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
        return true
      }

      if (user?.roles?.includes('writer') && !isPublishing) {
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
