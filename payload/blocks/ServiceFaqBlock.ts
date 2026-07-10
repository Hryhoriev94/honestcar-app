import type { Block } from 'payload'

export const ServiceFaqBlock: Block = {
  slug: 'service-faq',
  interfaceName: 'ServiceFaqBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true, required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'textarea', localized: true, required: true },
        { name: 'isOpen', type: 'checkbox' },
      ],
    },
  ],
}
