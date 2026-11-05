import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Bebas_Neue, Space_Grotesk } from 'next/font/google'
import '../globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://agri-experience.com'),
    title: {
      default: t('root_title_default'),
      template: t('root_title_template'),
    },
    description: t('root_desc'),
    keywords: ['Agriculture', 'Seed Systems', 'Agricultural Development', 'Sub-Saharan Africa', 'Kenya', 'Agri Experience', 'Value Chains'],
    authors: [{ name: 'Agri Experience' }],
    creator: 'Agri Experience',
    publisher: 'Agri Experience',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `https://agri-experience.com/${locale}`,
      siteName: 'Agri Experience',
      title: t('root_title_default'),
      description: t('root_desc'),
      images: [
        {
          url: '/hero-bg.png',
          width: 1200,
          height: 630,
          alt: t('root_og_alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('root_title_default'),
      description: t('root_desc'),
      images: ['/hero-bg.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-icon.png',
    },
  };
}

import ScrollToTop from '@/components/scroll-to-top'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import LanguageSwitchProvider from '@/components/language-switch-provider'
import GoogleAnalytics from '@/components/google-analytics'
import CookieToast from '@/components/cookie-toast'

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Agri Experience Limited',
    alternateName: 'Agri Experience',
    url: 'https://agri-experience.com',
    logo: 'https://agri-experience.com/Newsletters.svg',
    image: 'https://agri-experience.com/hero-bg.png',
    description: t('root_desc'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+254-722-516-160',
        contactType: 'customer service',
        availableLanguage: ['English', 'French'],
        email: 'info@agri-experience.com',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/agri-experience-ltd/',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Agri Experience',
    url: 'https://agri-experience.com',
    inLanguage: ['en', 'fr'],
    description: t('root_desc'),
  };

  const runtimeMapboxToken =
    process.env['NEXT_PUBLIC_MAPBOX_TOKEN'] ||
    process.env['MAPBOX_TOKEN'] ||
    '';

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${dmSans.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body
        suppressHydrationWarning
        data-mapbox-token={runtimeMapboxToken || undefined}
        className="font-dm-sans antialiased text-foreground flex flex-col min-h-screen"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-deep-forest focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-gold font-medium text-sm transition-all"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitchProvider>
            <ScrollToTop />
            <Header />
            <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </div>
            <Footer />
            <CookieToast />
          </LanguageSwitchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
