import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agri-experience.com'
  const lastModified = new Date()

  interface RouteConfig {
    path: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }

  const routes: RouteConfig[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/our-work', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/our-work/project-implementation', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-work/technical-studies', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-work/client-advisory', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-work/digital-platforms', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-work/capacity-building', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-work/stakeholder-convenings', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/our-impact', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/our-team', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/events', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/resources', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/insights', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/gallery', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/map', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/newsletter', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const locales = ['en', 'fr']
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Default entries (routed to default / canonical locale)
  for (const { path, priority, changeFrequency } of routes) {
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}`,
          fr: `${baseUrl}/fr${path}`,
          'x-default': `${baseUrl}/en${path}`,
        },
      },
    })

    // Explicit entries for each supported locale
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority: Number((priority * 0.95).toFixed(2)),
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}`,
            fr: `${baseUrl}/fr${path}`,
            'x-default': `${baseUrl}/en${path}`,
          },
        },
      })
    }
  }

  return sitemapEntries
}
