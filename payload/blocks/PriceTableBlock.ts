import type { Block } from 'payload'

export const PriceTableBlock: Block = {
  slug: 'price-table',
  interfaceName: 'PriceTableBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        { name: 'price', type: 'text', localized: true, required: true },
      ],
    },
  ],
}
