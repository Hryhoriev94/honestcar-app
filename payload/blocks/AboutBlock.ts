import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    { name: 'textSecond', type: 'textarea', localized: true },
    { name: 'media', type: 'upload', relationTo: 'media' },
  ],
}
