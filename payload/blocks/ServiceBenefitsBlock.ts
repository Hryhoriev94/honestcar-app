import type { Block } from 'payload'

export const ServiceBenefitsBlock: Block = {
  slug: 'service-benefits',
  interfaceName: 'ServiceBenefitsBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}
