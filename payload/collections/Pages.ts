import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/payload/blocks/HeroBlock'
import { AboutBlock } from '@/payload/blocks/AboutBlock'
import { ContactBlock } from '@/payload/blocks/ContactBlock'
import { PriceTableBlock } from '@/payload/blocks/PriceTableBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, AboutBlock, ContactBlock, PriceTableBlock],
      required: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
