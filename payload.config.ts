import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Media } from '@/payload/collections/Media'
import { Menus } from '@/payload/collections/Menus'
import { Pages } from '@/payload/collections/Pages'
import { PortfolioItems } from '@/payload/collections/PortfolioItems'
import { Services } from '@/payload/collections/Services'
import { SpecialOffers } from '@/payload/collections/SpecialOffers'
import { Users } from '@/payload/collections/Users'
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
  globals: [SiteSettings],
  localization: {
    locales: ['en', 'pl', 'ru', 'uk'],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
