import type { Block } from 'payload'

export const ContactBlock: Block = { slug: 'contact', interfaceName: 'ContactBlock', fields: [
  { name: 'eyebrow', type: 'text', localized: true }, { name: 'title', type: 'text', localized: true, required: true },
  { name: 'itemsText', type: 'textarea', localized: true }, { name: 'mapUrl', type: 'text' },
] }
