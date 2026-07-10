import type { CollectionConfig } from 'payload'
import { PriceTableBlock } from '@/payload/blocks/PriceTableBlock'
import { ServiceBenefitsBlock } from '@/payload/blocks/ServiceBenefitsBlock'
import { ServiceFaqBlock } from '@/payload/blocks/ServiceFaqBlock'

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [ServiceBenefitsBlock, PriceTableBlock, ServiceFaqBlock],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
