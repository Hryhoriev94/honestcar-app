import config from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import { importMap } from './importMap'
import '@payloadcms/next/css'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
