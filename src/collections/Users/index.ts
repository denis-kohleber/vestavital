import { authenticated } from '@/access/authenticated';
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: authenticated,
    create: ({ req: { user } }) => {
      return user?.roles?.includes('admin') ? true : false
    },
    update: ({ req: { user } }) => {
      return user?.roles?.includes('admin') ? true : false
    },
    delete: ({ req: { user } }) => {
      return user?.roles?.includes('admin') ? true : false
    },
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Redakteur',
          value: 'editor',
        },
        {
          label: 'Autor',
          value: 'writer',
        },
      ],
      defaultValue: 'writer',
      required: true,
    },
  ],
  timestamps: true,
}
