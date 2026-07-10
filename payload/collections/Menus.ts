import type { CollectionConfig } from 'payload'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description: 'Fallback URL. Prefer selecting a route for internal links.',
          },
        },
        {
          name: 'route',
          type: 'relationship',
          relationTo: 'routes',
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              admin: {
                description: 'Fallback URL. Prefer selecting a route for internal links.',
              },
            },
            {
              name: 'route',
              type: 'relationship',
              relationTo: 'routes',
            },
          ],
        },
      ],
    },
  ],
}
