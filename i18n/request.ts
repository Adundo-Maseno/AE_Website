import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { getDb } from '@/lib/db'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // @ts-ignore
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const baseMessages = (await import(`../messages/${locale}.json`)).default

  // Seamlessly merge dynamic SQLite CMS overrides if available
  try {
    const db = getDb()
    const rows = db
      .prepare('SELECT page_key, data_json FROM page_sections WHERE locale = ?')
      .all(locale) as { page_key: string; data_json: string }[]

    if (rows && rows.length > 0) {
      const pageKeyMap: Record<string, string> = {
        home: 'Home',
        about: 'About',
        ourwork: 'OurWork',
        ourimpact: 'OurImpact',
        events: 'Events',
        resources: 'Resources',
        contact: 'Contact',
        global: 'Header',
      }

      rows.forEach((row) => {
        const mappedKey = pageKeyMap[row.page_key] || row.page_key
        try {
          const parsed = JSON.parse(row.data_json)
          baseMessages[mappedKey] = {
            ...(baseMessages[mappedKey] || {}),
            ...parsed,
          }
        } catch {
          // Ignore parse errors on individual sections
        }
      })
    }
  } catch {
    // Fallback cleanly to static messages JSON during build or if DB uninitialized
  }

  return {
    locale,
    messages: baseMessages,
  }
})
