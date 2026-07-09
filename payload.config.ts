import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pl } from '@payloadcms/translations/languages/pl'
import { ru } from '@payloadcms/translations/languages/ru'
import { uk } from '@payloadcms/translations/languages/uk'
import { buildConfig } from 'payload'
import { Media } from '@/payload/collections/Media'
import { Menus } from '@/payload/collections/Menus'
import { Pages } from '@/payload/collections/Pages'
import { PortfolioItems } from '@/payload/collections/PortfolioItems'
import { Services } from '@/payload/collections/Services'
import { SpecialOffers } from '@/payload/collections/SpecialOffers'
import { Users } from '@/payload/collections/Users'
import { HomePage } from '@/payload/globals/HomePage'
import { SiteSettings } from '@/payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Menus, Services, PortfolioItems, SpecialOffers],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, HomePage],
  i18n: {
    fallbackLanguage: 'pl',
    supportedLanguages: {
      pl,
      ru,
      uk,
    },
  },
  localization: {
    locales: ['pl', 'ru', 'uk'],
    defaultLocale: 'pl',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
