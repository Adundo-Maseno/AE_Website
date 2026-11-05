import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('terms_title');
  const description = t('terms_desc');
  const routePath = '/terms';

  return {
    title,
    description,
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

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
