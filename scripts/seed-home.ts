import nextEnv from '@next/env'
import { getPayload } from 'payload'
import { fallbackHomePageData } from '@/data/homePage'

nextEnv.loadEnvConfig(process.cwd())
process.env.PAYLOAD_SECRET ??= 'change-me'

const seedHomePage = async () => {
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'pl',
    fallbackLocale: 'pl',
    data: fallbackHomePageData,
    depth: 0,
  })

  payload.logger.info('Seeded home-page global for locale pl.')
}

const isPostgresConnectionError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false
  }

  return error.message.includes('cannot connect to Postgres') || error.message.includes('ECONNREFUSED')
}

seedHomePage()
  .then(() => {
    process.exit(0)
  })
  .catch((error: unknown) => {
    if (isPostgresConnectionError(error)) {
      console.error('Cannot seed home-page: PostgreSQL is not available. Start Postgres or check DATABASE_URI.')
    }

    console.error(error)
    process.exit(1)
  })
