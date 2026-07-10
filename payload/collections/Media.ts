import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
  },
  fields: [
    {
      name: 'wordpressId',
      type: 'number',
      index: true,
      unique: true,
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
