import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: ({ req: { user } }) => {
      return user?.roles?.includes('admin') || user?.roles?.includes('editor') ? true : false
    },
    update: ({ req: { user } }) => {
      return user?.roles?.includes('admin') || user?.roles?.includes('editor') ? true : false
    },
    delete: ({ req: { user } }) => {
      return user?.roles?.includes('admin') || user?.roles?.includes('editor') ? true : false
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        disabled: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        }
      },
    ],
  },
}
