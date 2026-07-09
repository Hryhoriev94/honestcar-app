import type { Field, GlobalConfig } from 'payload'

const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    localized: true,
    required: true,
  },
  {
    name: 'href',
    type: 'text',
    required: true,
  },
]

const imagePathField = (name: string, label: string): Field => ({
  name,
  type: 'text',
  admin: {
    description: 'Use a public path, for example /images/services/diagnostyka.jpg.',
  },
  label,
  required: true,
})

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'siteContact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', required: true },
        { name: 'phoneHref', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'emailHref', type: 'text', required: true },
        { name: 'address', type: 'text', localized: true, required: true },
        { name: 'addressHref', type: 'text', required: true },
        { name: 'hours', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'siteNavigation',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'array',
          fields: linkFields,
        },
        {
          name: 'services',
          type: 'array',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'heroHighlights',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'reviews',
      type: 'array',
      fields: [
        { name: 'author', type: 'text', required: true },
        { name: 'date', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true, required: true },
      ],
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
        imagePathField('image', 'Image'),
      ],
    },
    {
      name: 'serviceBenefits',
      type: 'array',
      fields: [
        { name: 'iconClass', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true, required: true },
      ],
    },
    {
      name: 'beforeAfterProjects',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        imagePathField('beforeImage', 'Before image'),
        imagePathField('afterImage', 'After image'),
        { name: 'beforeAlt', type: 'text', localized: true, required: true },
        { name: 'afterAlt', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'brands',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        imagePathField('image', 'Logo image'),
      ],
    },
    {
      name: 'processSteps',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true, required: true },
      ],
    },
    {
      name: 'faqItems',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'textarea', localized: true, required: true },
        { name: 'isOpen', type: 'checkbox' },
      ],
    },
    {
      name: 'blogPreviewPosts',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'href', type: 'text', required: true },
        imagePathField('image', 'Image'),
        { name: 'alt', type: 'text', localized: true, required: true },
        { name: 'category', type: 'text', localized: true, required: true },
      ],
    },
  ],
}
