import nextEnv from '@next/env'
import mysql from 'mysql2/promise'
import type { RowDataPacket } from 'mysql2'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import type { Media, Page, PortfolioItem, Route, Service, SpecialOffer } from '@/payload-types'

nextEnv.loadEnvConfig(process.cwd())

type SupportedLocale = 'pl' | 'ru' | 'uk'

interface WordPressPageRow extends RowDataPacket {
  content: string
  language: string
  parentId: number
  postId: number
  seoDescription: string | null
  slug: string
  title: string
  translationGroupId: number
}

interface WordPressAttachmentRow extends RowDataPacket {
  alt: string | null
  attachedFile: string
  mimeType: string
  postId: number
  title: string
}

interface HeroMediaReferences {
  imageId?: number
  videoId?: number
}

interface ServiceCardMediaReference {
  imageId: number
  title: string
}

interface WordPressBlock {
  attributes: Record<string, unknown>
  name: string
}

interface ImportReport {
  blocks: Map<string, number>
  locales: Map<string, number>
  pages: number
  serviceCategories: number
  serviceDetails: number
  topLevelPages: number
}

interface ServiceBenefitsImportBlock {
  blockType: 'service-benefits'
  eyebrow: string
  items: Array<{ text: string; title: string }>
  text?: string
  title: string
}

interface PriceTableImportBlock {
  blockType: 'price-table'
  eyebrow: string
  items: Array<{ name: string; price: string }>
  text?: string
  title: string
}

interface ServiceFaqImportBlock {
  blockType: 'service-faq'
  eyebrow: string
  items: Array<{ answer: string; question: string }>
  title: string
}

type ServiceLayoutImport = ServiceBenefitsImportBlock | PriceTableImportBlock | ServiceFaqImportBlock

const supportedLocales = new Set<SupportedLocale>(['pl', 'ru', 'uk'])

const isSupportedLocale = (value: string): value is SupportedLocale => supportedLocales.has(value as SupportedLocale)

const parseBlocks = (content: string): WordPressBlock[] => {
  const blocks: WordPressBlock[] = []
  const blockPattern = /<!--\s+wp:honestcar\/([a-z0-9-]+)(?:\s+(\{[\s\S]*?\}))?\s*\/?-->/gi

  for (const match of content.matchAll(blockPattern)) {
    const [, name, rawAttributes] = match

    if (!name) {
      continue
    }

    try {
      const attributes = rawAttributes ? (JSON.parse(rawAttributes) as Record<string, unknown>) : {}
      blocks.push({ attributes, name })
    } catch {
      blocks.push({ attributes: {}, name })
    }
  }

  return blocks
}

const getPageKind = (page: WordPressPageRow, serviceRootIds: ReadonlySet<number>, parentIds: ReadonlyMap<number, number>): string => {
  if (serviceRootIds.has(page.postId)) {
    return 'service-root'
  }

  if (serviceRootIds.has(page.parentId)) {
    return 'service-category'
  }

  const grandParentId = parentIds.get(page.parentId)

  if (grandParentId !== undefined && serviceRootIds.has(grandParentId)) {
    return 'service-detail'
  }

  return page.parentId === 0 ? 'page' : 'nested-page'
}

const getWordPressPages = async (): Promise<WordPressPageRow[]> => {
  const connection = await mysql.createConnection({
    database: process.env.WORDPRESS_DB_NAME ?? 'honestcar',
    host: process.env.WORDPRESS_DB_HOST ?? '127.0.0.1',
    password: process.env.WORDPRESS_DB_PASSWORD ?? '',
    user: process.env.WORDPRESS_DB_USER ?? 'root',
  })

  try {
    const [rows] = await connection.query<WordPressPageRow[]>(`
      SELECT
        p.ID AS postId,
        p.post_content AS content,
        p.post_title AS title,
        p.post_name AS slug,
        p.post_parent AS parentId,
        t.trid AS translationGroupId,
        t.language_code AS language,
        seo.meta_value AS seoDescription
      FROM hc_posts p
      INNER JOIN hc_icl_translations t
        ON t.element_id = p.ID AND t.element_type = 'post_page'
      LEFT JOIN hc_postmeta seo
        ON seo.post_id = p.ID AND seo.meta_key = '_aioseo_description'
      WHERE p.post_type = 'page' AND p.post_status = 'publish'
      ORDER BY p.ID
    `)

    return rows.filter((page) => isSupportedLocale(page.language))
  } finally {
    await connection.end()
  }
}

const getWordPressAttachments = async (): Promise<WordPressAttachmentRow[]> => {
  const connection = await mysql.createConnection({
    database: process.env.WORDPRESS_DB_NAME ?? 'honestcar',
    host: process.env.WORDPRESS_DB_HOST ?? '127.0.0.1',
    password: process.env.WORDPRESS_DB_PASSWORD ?? '',
    user: process.env.WORDPRESS_DB_USER ?? 'root',
  })

  try {
    const [rows] = await connection.query<WordPressAttachmentRow[]>(`
      SELECT
        p.ID AS postId,
        p.post_title AS title,
        p.post_mime_type AS mimeType,
        attached.meta_value AS attachedFile,
        alt.meta_value AS alt
      FROM hc_posts p
      INNER JOIN hc_postmeta attached
        ON attached.post_id = p.ID AND attached.meta_key = '_wp_attached_file'
      LEFT JOIN hc_postmeta alt
        ON alt.post_id = p.ID AND alt.meta_key = '_wp_attachment_image_alt'
      WHERE p.post_type = 'attachment'
        AND p.post_status = 'inherit'
        AND (p.post_mime_type LIKE 'image/%' OR p.post_mime_type LIKE 'video/%')
      ORDER BY p.ID
    `)

    return rows
  } finally {
    await connection.end()
  }
}

const createReport = (pages: WordPressPageRow[]): ImportReport => {
  const report: ImportReport = {
    blocks: new Map(),
    locales: new Map(),
    pages: pages.length,
    serviceCategories: 0,
    serviceDetails: 0,
    topLevelPages: 0,
  }
  const parentIds = new Map(pages.map((page) => [page.postId, page.parentId]))
  const serviceRootIds = new Set(pages.filter((page) => page.slug === 'uslugi' || page.slug === 'poslugi').map((page) => page.postId))

  for (const page of pages) {
    report.locales.set(page.language, (report.locales.get(page.language) ?? 0) + 1)

    const kind = getPageKind(page, serviceRootIds, parentIds)

    if (kind === 'service-category') {
      report.serviceCategories += 1
    } else if (kind === 'service-detail') {
      report.serviceDetails += 1
    } else if (kind === 'page') {
      report.topLevelPages += 1
    }

    for (const block of parseBlocks(page.content)) {
      report.blocks.set(block.name, (report.blocks.get(block.name) ?? 0) + 1)
    }
  }

  return report
}

const printReport = (report: ImportReport): void => {
  console.log(`Pages: ${report.pages}`)
  console.log(`Top-level pages: ${report.topLevelPages}`)
  console.log(`Service categories: ${report.serviceCategories}`)
  console.log(`Service details: ${report.serviceDetails}`)
  console.log('Locales:')

  for (const [locale, count] of [...report.locales.entries()].sort()) {
    console.log(`  ${locale}: ${count}`)
  }

  console.log('Gutenberg blocks:')

  for (const [name, count] of [...report.blocks.entries()].sort()) {
    console.log(`  honestcar/${name}: ${count}`)
  }
}

const getBlockText = (content: string): string | undefined => {
  const hero = parseBlocks(content).find((block) => block.name === 'pages-hero')
  const text = hero?.attributes.text

  return typeof text === 'string' && text.length > 0 ? text : undefined
}

const getStringAttribute = (attributes: Record<string, unknown>, key: string): string | undefined => {
  const value = attributes[key]

  return typeof value === 'string' && value.length > 0 ? value : undefined
}

const getNumberAttribute = (attributes: Record<string, unknown>, key: string): number | undefined => {
  const value = attributes[key]

  if (typeof value === 'number' && Number.isInteger(value)) {
    return value
  }

  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return Number(value)
  }

  return undefined
}

const getHeroMediaReferences = (content: string): HeroMediaReferences => {
  const hero = parseBlocks(content).find((block) => block.name === 'pages-hero' || block.name === 'hero')

  if (!hero) {
    return {}
  }

  const desktopBackgroundType = getStringAttribute(hero.attributes, 'desktopBackgroundType')
  const imageId = getNumberAttribute(hero.attributes, 'backgroundImageId') ?? getNumberAttribute(hero.attributes, 'imageId')
  const videoId = getNumberAttribute(hero.attributes, 'backgroundVideoId')
    ?? getNumberAttribute(hero.attributes, 'videoId')
    ?? (desktopBackgroundType === 'video' ? getNumberAttribute(hero.attributes, 'desktopBackgroundId') : undefined)

  return { imageId, videoId }
}

const normalizeTitle = (value: string): string => value
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase('pl')
  .replace(/[^a-z0-9]+/g, '')

const getServiceCardMediaReferences = (pages: WordPressPageRow[]): ServiceCardMediaReference[] => pages.flatMap((page) =>
  parseBlocks(page.content).flatMap((block) => {
    if (block.name !== 'service-card') {
      return []
    }

    const title = getStringAttribute(block.attributes, 'title')
    const imageId = getNumberAttribute(block.attributes, 'imageId')

    return title && imageId ? [{ imageId, title }] : []
  }),
)

const getServiceCardMediaId = (title: string, references: ServiceCardMediaReference[]): number | undefined => {
  const normalizedTitle = normalizeTitle(title)
  const reference = references.find(({ title: referenceTitle }) => {
    const normalizedReferenceTitle = normalizeTitle(referenceTitle)

    return normalizedTitle.includes(normalizedReferenceTitle) || normalizedReferenceTitle.includes(normalizedTitle)
  })

  return reference?.imageId
}

const getPortfolioGallery = (content: string, mediaByWordPressId: Map<number, Media>): Array<{ image: number }> => {
  const gallery = parseBlocks(content).find((block) => block.name === 'portfolio-single-gallery')
  const media = gallery?.attributes.media ?? gallery?.attributes.images

  if (!Array.isArray(media)) {
    return []
  }

  return media.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return []
    }

    const id = getNumberAttribute(item as Record<string, unknown>, 'id')
    const payloadMedia = id ? mediaByWordPressId.get(id) : undefined

    return payloadMedia ? [{ image: payloadMedia.id }] : []
  })
}

const getPortfolioArray = (content: string, blockName: string, key: string): Record<string, unknown>[] => {
  const block = parseBlocks(content).find((item) => item.name === blockName)
  const value = block?.attributes[key]

  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object') : []
}

const getPortfolioDetails = (content: string) => ({
  facts: getPortfolioArray(content, 'portfolio-single-meta', 'facts').flatMap((item) => {
    const label = getStringAttribute(item, 'label')
    const value = getStringAttribute(item, 'value')
    return label && value ? [{ label, value }] : []
  }),
  sidebar: getPortfolioArray(content, 'portfolio-single-sidebar', 'cards').flatMap((item) => {
    const title = getStringAttribute(item, 'title')
    return title ? [{ itemsText: getStringAttribute(item, 'itemsText'), text: getStringAttribute(item, 'text'), title }] : []
  }),
  story: getPortfolioArray(content, 'portfolio-single-story', 'items').flatMap((item) => {
    const title = getStringAttribute(item, 'title')
    const text = getStringAttribute(item, 'text')
    return title && text ? [{ text, title }] : []
  }),
})

const getSpecialOfferData = (content: string) => {
  const details = parseBlocks(content).find((block) => block.name === 'promo-details')?.attributes ?? {}
  const priceTable = parseBlocks(content).find((block) => block.name === 'promo-price-table')?.attributes ?? {}
  const rows = priceTable.rows

  return {
    details: {
      badgeLabel: getStringAttribute(details, 'badgeLabel'),
      badgeValue: getStringAttribute(details, 'badgeValue'),
      eyebrow: getStringAttribute(details, 'eyebrow'),
      itemsText: Array.isArray(details.items) ? details.items.filter((item): item is string => typeof item === 'string').join('\n') : undefined,
      itemsTitle: getStringAttribute(details, 'itemsTitle'),
    },
    prices: Array.isArray(rows) ? rows.flatMap((row) => {
      if (!row || typeof row !== 'object') return []
      const item = row as Record<string, unknown>
      const name = getStringAttribute(item, 'name') ?? getStringAttribute(item, 'title')
      const promo = getStringAttribute(item, 'promo') ?? getStringAttribute(item, 'promoPrice')
      return name && promo ? [{ name, promo, regular: getStringAttribute(item, 'regular') ?? getStringAttribute(item, 'regularPrice') }] : []
    }) : [],
  }
}

const getAboutBlock = (content: string, mediaByWordPressId: Map<number, Media>) => {
  const contentBlock = parseBlocks(content).find((block) => block.name === 'about-content')?.attributes ?? {}
  const mediaBlock = parseBlocks(content).find((block) => block.name === 'about-media')?.attributes ?? {}
  const mediaId = getNumberAttribute(mediaBlock, 'imageId')

  const title = getStringAttribute(contentBlock, 'title')
  return title ? [{ blockType: 'about' as const, eyebrow: getStringAttribute(contentBlock, 'eyebrow'), media: mediaId ? mediaByWordPressId.get(mediaId)?.id : undefined, text: getStringAttribute(contentBlock, 'text'), textSecond: getStringAttribute(contentBlock, 'textSecond'), title }] : []
}

const getContactBlock = (content: string) => {
  const attributes = parseBlocks(content).find((block) => block.name === 'contact')?.attributes ?? {}
  const title = getStringAttribute(attributes, 'title')
  const items = attributes.items
  return title ? [{ blockType: 'contact' as const, eyebrow: getStringAttribute(attributes, 'eyebrow'), itemsText: Array.isArray(items) ? items.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => `${getStringAttribute(item, 'label') ?? ''}: ${getStringAttribute(item, 'value') ?? ''}`).join('\n') : undefined, mapUrl: getStringAttribute(attributes, 'mapUrl'), title }] : []
}

const getPagePriceBlocks = (content: string): PriceTableImportBlock[] => parseBlocks(content).flatMap((block) => {
  if (block.name !== 'pricing-list' && block.name !== 'price-section') return []

  const title = getStringAttribute(block.attributes, 'title')
  const items = getPriceItems(block.attributes)
  return title && items.length > 0 ? [{ blockType: 'price-table', eyebrow: getStringAttribute(block.attributes, 'eyebrow') ?? 'Cennik', items, text: getStringAttribute(block.attributes, 'text'), title }] : []
})

const importMedia = async (payload: Awaited<ReturnType<typeof getPayload>>, attachments: WordPressAttachmentRow[]): Promise<Map<number, Media>> => {
  const mediaByWordPressId = new Map<number, Media>()
  let skipped = 0

  for (const attachment of attachments) {
    const filePath = path.resolve(process.cwd(), 'wordpress', 'wp-content', 'uploads', attachment.attachedFile)

    try {
      await access(filePath)
    } catch {
      skipped += 1
      payload.logger.warn(`Source image is missing: ${attachment.attachedFile}`)
      continue
    }

    const existing = await payload.find({
      collection: 'media',
      limit: 1,
      pagination: false,
      where: { wordpressId: { equals: attachment.postId } },
    })
    const alt = attachment.alt?.trim() || attachment.title || path.basename(attachment.attachedFile)
    const media = existing.docs[0]
      ? await payload.update({ collection: 'media', id: existing.docs[0].id, locale: 'pl', data: { alt } })
      : await payload.create({ collection: 'media', data: { alt, wordpressId: attachment.postId }, filePath, locale: 'pl' })

    mediaByWordPressId.set(attachment.postId, media)
  }

  payload.logger.info(`Imported ${mediaByWordPressId.size} original WordPress media files; skipped ${skipped}.`)

  return mediaByWordPressId
}

const getPriceItems = (attributes: Record<string, unknown>): Array<{ name: string; price: string }> => {
  const candidate = attributes.items ?? attributes.rows ?? attributes.prices

  if (!Array.isArray(candidate)) {
    return []
  }

  return candidate.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return []
    }

    const record = item as Record<string, unknown>
    const name = getStringAttribute(record, 'name') ?? getStringAttribute(record, 'title')
    const price = getStringAttribute(record, 'price') ?? getStringAttribute(record, 'value')

    return name && price ? [{ name, price }] : []
  })
}

const getServiceLayout = (content: string): ServiceLayoutImport[] => {
  const blocks = parseBlocks(content)
  const layout: ServiceLayoutImport[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (block.name === 'feature-section') {
      const items: Array<{ text: string; title: string }> = []

      for (let childIndex = index + 1; childIndex < blocks.length; childIndex += 1) {
        const child = blocks[childIndex]

        if (child.name === 'feature-section' || child.name === 'price-section' || child.name === 'faq') {
          break
        }

        if (child.name === 'feature-card') {
          const title = getStringAttribute(child.attributes, 'title')
          const text = getStringAttribute(child.attributes, 'text')

          if (title && text) {
            items.push({ text, title })
          }
        }
      }

      const title = getStringAttribute(block.attributes, 'title')

      if (title && items.length > 0) {
        layout.push({
          blockType: 'service-benefits',
          eyebrow: getStringAttribute(block.attributes, 'eyebrow') ?? 'Dlaczego warto',
          items,
          text: getStringAttribute(block.attributes, 'text'),
          title,
        })
      }
    }

    if (block.name === 'price-section') {
      const title = getStringAttribute(block.attributes, 'title')
      const items = getPriceItems(block.attributes)

      if (title && items.length > 0) {
        layout.push({
          blockType: 'price-table',
          eyebrow: getStringAttribute(block.attributes, 'eyebrow') ?? 'Cennik',
          items,
          text: getStringAttribute(block.attributes, 'text'),
          title,
        })
      }
    }

    if (block.name === 'faq') {
      const items: Array<{ answer: string; question: string }> = []

      for (let childIndex = index + 1; childIndex < blocks.length; childIndex += 1) {
        const child = blocks[childIndex]

        if (childIndex > index + 1 && child.name === 'faq') {
          break
        }

        if (child.name === 'faq-item') {
          const question = getStringAttribute(child.attributes, 'question')
          const answer = getStringAttribute(child.attributes, 'answer')

          if (question && answer) {
            items.push({ answer, question })
          }
        }
      }

      const title = getStringAttribute(block.attributes, 'title')

      if (title && items.length > 0) {
        layout.push({
          blockType: 'service-faq',
          eyebrow: getStringAttribute(block.attributes, 'eyebrow') ?? 'FAQ',
          items,
          title,
        })
      }
    }
  }

  return layout
}

const importContent = async (wordpressPages: WordPressPageRow[], attachments: WordPressAttachmentRow[]) => {
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })
  const mediaByWordPressId = await importMedia(payload, attachments)
  const serviceCardMediaReferences = getServiceCardMediaReferences(wordpressPages)
  const parentTranslationGroups = new Map(wordpressPages.map((page) => [page.postId, page.translationGroupId]))
  const groups = new Map<number, WordPressPageRow[]>()

  for (const page of wordpressPages) {
    const group = groups.get(page.translationGroupId) ?? []
    group.push(page)
    groups.set(page.translationGroupId, group)
  }

  await payload.delete({ collection: 'menus', where: {} })
  await payload.delete({ collection: 'routes', where: {} })
  await payload.delete({ collection: 'services', where: {} })
  await payload.delete({ collection: 'portfolio-items', where: {} })
  await payload.delete({ collection: 'special-offers', where: {} })
  await payload.delete({ collection: 'pages', where: {} })

  const serviceRootIds = new Set(wordpressPages.filter((page) => page.slug === 'uslugi' || page.slug === 'poslugi').map((page) => page.postId))
  const portfolioRootIds = new Set(wordpressPages.filter((page) => page.slug === 'portfolio').map((page) => page.postId))
  const promotionRootIds = new Set(wordpressPages.filter((page) => ['promocje', 'aktsii', 'aktsiyi'].includes(page.slug)).map((page) => page.postId))
  const targets = new Map<number, {
    type: 'pages' | 'portfolio-items' | 'services' | 'special-offers'
    value: Page | PortfolioItem | Service | SpecialOffer
  }>()
  const sourceByGroup = new Map<number, WordPressPageRow>()

  for (const [groupId, translations] of groups) {
    const source = translations.find((page) => page.language === 'pl') ?? translations[0]
    const kind = getPageKind(source, serviceRootIds, new Map(wordpressPages.map((page) => [page.postId, page.parentId])))
    const text = getBlockText(source.content)
    const isService = kind === 'service-category' || kind === 'service-detail'
    const isPortfolioItem = portfolioRootIds.has(source.parentId)
    const isSpecialOffer = promotionRootIds.has(source.parentId)
    const heroMediaReferences = getHeroMediaReferences(source.content)
    const serviceCardMediaId = isService ? getServiceCardMediaId(source.title, serviceCardMediaReferences) : undefined
    const mediaId = heroMediaReferences.videoId ?? heroMediaReferences.imageId ?? serviceCardMediaId
    const media = mediaId ? mediaByWordPressId.get(mediaId) : undefined
    const portfolioDetails = getPortfolioDetails(source.content)
    const specialOfferData = getSpecialOfferData(source.content)
    const value = isService
      ? await payload.create({ collection: 'services', locale: 'pl', data: { featuredImage: media?.id, layout: getServiceLayout(source.content), slug: source.slug, summary: text, title: source.title } })
      : isPortfolioItem
        ? await payload.create({ collection: 'portfolio-items', locale: 'pl', data: { description: text, gallery: getPortfolioGallery(source.content, mediaByWordPressId), ...portfolioDetails, slug: source.slug, title: source.title } })
        : isSpecialOffer
          ? await payload.create({ collection: 'special-offers', locale: 'pl', data: { description: text, ...specialOfferData, slug: source.slug, title: source.title } })
      : await payload.create({
          collection: 'pages',
          locale: 'pl',
          data: {
            layout: [{ blockType: 'hero', media: media?.id, text, title: source.title }, ...getAboutBlock(source.content, mediaByWordPressId), ...getContactBlock(source.content), ...getPagePriceBlocks(source.content)],
            seo: { description: source.seoDescription, title: source.title },
            slug: source.slug,
            title: source.title,
          },
        })

    targets.set(groupId, {
      type: isService ? 'services' : isPortfolioItem ? 'portfolio-items' : isSpecialOffer ? 'special-offers' : 'pages',
      value,
    })
    sourceByGroup.set(groupId, source)

    for (const translation of translations.filter((page) => isSupportedLocale(page.language) && page.language !== 'pl')) {
      if (isService) {
        const translationHeroMedia = getHeroMediaReferences(translation.content)
        const translationMediaId = translationHeroMedia.videoId ?? translationHeroMedia.imageId ?? getServiceCardMediaId(translation.title, serviceCardMediaReferences)
        await payload.update({ collection: 'services', id: value.id, locale: translation.language as SupportedLocale, data: { featuredImage: translationMediaId ? mediaByWordPressId.get(translationMediaId)?.id : undefined, layout: getServiceLayout(translation.content), summary: getBlockText(translation.content), title: translation.title } })
      } else if (isPortfolioItem) {
        await payload.update({ collection: 'portfolio-items', id: value.id, locale: translation.language as SupportedLocale, data: { description: getBlockText(translation.content), gallery: getPortfolioGallery(translation.content, mediaByWordPressId), ...getPortfolioDetails(translation.content), title: translation.title } })
      } else if (isSpecialOffer) {
        await payload.update({ collection: 'special-offers', id: value.id, locale: translation.language as SupportedLocale, data: { description: getBlockText(translation.content), ...getSpecialOfferData(translation.content), title: translation.title } })
      } else {
        await payload.update({
          collection: 'pages',
          id: value.id,
          locale: translation.language as SupportedLocale,
          data: {
            layout: [{ blockType: 'hero', media: (() => {
              const references = getHeroMediaReferences(translation.content)
              const mediaId = references.videoId ?? references.imageId

              return mediaId ? mediaByWordPressId.get(mediaId)?.id : undefined
            })(), text: getBlockText(translation.content), title: translation.title }, ...getAboutBlock(translation.content, mediaByWordPressId), ...getContactBlock(translation.content), ...getPagePriceBlocks(translation.content)],
            seo: { description: translation.seoDescription, title: translation.title },
            title: translation.title,
          },
        })
      }
    }
  }

  const routes = new Map<number, Route>()

  let pendingRoutes = [...sourceByGroup.entries()]

  while (pendingRoutes.length > 0) {
    const nextPendingRoutes: Array<[number, WordPressPageRow]> = []

    for (const [groupId, source] of pendingRoutes) {
    if (source.slug === '123-2' || source.slug === 'golovna-storinka' || source.slug === 'glavnaya-stranitsa') {
      continue
    }

    const target = targets.get(groupId)
    const parentGroupId = parentTranslationGroups.get(source.parentId)
    const parent = parentGroupId ? routes.get(parentGroupId) : undefined

    if (!target) {
      continue
    }

    if (parentGroupId && !parent) {
      nextPendingRoutes.push([groupId, source])
      continue
    }

    const route = await payload.create({
      collection: 'routes',
      locale: 'pl',
      data: {
        parent: parent?.id,
        showInSitemap: true,
        slug: source.slug,
        status: 'published',
        target: { relationTo: target.type, value: target.value.id },
      },
    })
    routes.set(groupId, route)
    const translations = groups.get(groupId) ?? []

    for (const translation of translations.filter((page) => isSupportedLocale(page.language) && page.language !== 'pl')) {
      await payload.update({ collection: 'routes', id: route.id, locale: translation.language as SupportedLocale, data: { slug: translation.slug } })
    }
  }

    if (nextPendingRoutes.length === pendingRoutes.length) {
      throw new Error('Cannot resolve WordPress route hierarchy.')
    }

    pendingRoutes = nextPendingRoutes
  }

  const primarySlugs = ['uslugi', 'promocje', 'o-nas', 'cennik', 'portfolio', 'kontakt', 'blog']
  const primaryItems = primarySlugs.flatMap((slug) => {
    const entry = [...sourceByGroup.entries()].find(([, source]) => source.language === 'pl' && source.slug === slug)
    const route = entry ? routes.get(entry[0]) : undefined

    return route ? [{ label: entry?.[1].title ?? slug, route: route.id }] : []
  })
  const servicesRootEntry = [...sourceByGroup.entries()].find(([, source]) => source.language === 'pl' && source.slug === 'uslugi')
  const servicesRootGroupId = servicesRootEntry?.[0]
  const serviceItems = [...sourceByGroup.entries()].flatMap(([groupId, source]) => {
    const parentGroupId = parentTranslationGroups.get(source.parentId)
    const route = routes.get(groupId)

    return source.language === 'pl' && parentGroupId === servicesRootGroupId && route
      ? [{ label: source.title, route: route.id }]
      : []
  })

  await payload.create({ collection: 'menus', locale: 'pl', data: { items: primaryItems, name: 'primary' } })
  await payload.create({ collection: 'menus', locale: 'pl', data: { items: serviceItems, name: 'services' } })

  payload.logger.info(`Imported ${targets.size} WPML content groups and ${routes.size} routes.`)
}

const main = async () => {
  const pages = await getWordPressPages()
  const attachments = await getWordPressAttachments()
  const report = createReport(pages)

  printReport(report)

  if (process.argv.includes('--apply')) {
    await importContent(pages, attachments)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
