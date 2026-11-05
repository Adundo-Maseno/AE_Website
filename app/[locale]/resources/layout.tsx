import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';
import { publicDownloads } from '@/lib/public-downloads';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('resources_title');
  const description = t('resources_desc');
  const routePath = '/resources';

  return {
    title,
    description,
    keywords: [
      'Agricultural Reports',
      'Seed Systems Studies',
      'East Africa Seed Trade',
      'Pasture and Fodder Seed',
      'Agrodealer Mapping Kenya',
      'Seed Sector Policy Africa',
      'Agri Experience Publications',
    ],
    alternates: {
      canonical: `/${locale}${routePath}`,
      languages: {
        en: `/en${routePath}`,
        fr: `/fr${routePath}`,
        'x-default': `/en${routePath}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `https://agri-experience.com/${locale}${routePath}`,
      title: `${title} | Agri Experience`,
      description,
      siteName: 'Agri Experience',
      images: [
        {
          url: '/hero-bg.png',
          width: 1200,
          height: 630,
          alt: `${title} - Agri Experience`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Agri Experience`,
      description,
      images: ['/hero-bg.png'],
    },
  };
}

export default async function ResourcesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('resources_title');
  const description = t('resources_desc');

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://agri-experience.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: `https://agri-experience.com/${locale}/resources`,
      },
    ],
  };

  const publicationsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `https://agri-experience.com/${locale}/resources`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: publicDownloads.length,
      itemListElement: publicDownloads.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: item.title,
          description: item.citation,
          url: `https://agri-experience.com${item.link}`,
          encodingFormat: 'application/pdf',
          genre: item.category,
          author: {
            '@type': 'Organization',
            name: 'Agri Experience Ltd.',
          },
          publisher: {
            '@type': 'Organization',
            name: item.client,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationsJsonLd) }}
      />
      {children}
    </>
  );
}
