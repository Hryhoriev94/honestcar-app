import type { CollectionConfig } from 'payload'

export const Routes: CollectionConfig = {
  slug: 'routes',
  admin: {
    defaultColumns: ['slug', 'status', 'updatedAt'],
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      localized: true,
      required: true,
      index: true,
      admin: {
        description: 'One URL segment without slashes. The full URL is built from the parent route.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'routes',
      admin: {
        description: 'Optional parent route. Use it to create nested URLs.',
      },
    },
    {
      name: 'target',
      type: 'relationship',
      relationTo: ['pages', 'services', 'portfolio-items', 'special-offers'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'showInSitemap',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
  ],
}
