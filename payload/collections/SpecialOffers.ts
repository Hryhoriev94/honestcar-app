import type { CollectionConfig } from 'payload'

export const SpecialOffers: CollectionConfig = {
  slug: 'special-offers',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'validUntil',
      type: 'date',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'details',
      type: 'group',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'badgeLabel', type: 'text' },
        { name: 'badgeValue', type: 'text' },
        { name: 'itemsTitle', type: 'text' },
        { name: 'itemsText', type: 'textarea' },
      ],
    },
    {
      name: 'prices',
      type: 'array',
      localized: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'regular', type: 'text' },
        { name: 'promo', type: 'text', required: true },
      ],
    },
  ],
}
