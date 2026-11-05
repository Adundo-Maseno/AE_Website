'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const OfficePlantsGallery = dynamic(
  () => import('@/components/motion/office-plants-gallery'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] flex flex-col items-center justify-center bg-mist/30 rounded-3xl border border-stone-200/60 animate-pulse my-8">
        <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green mb-3">
          <span className="w-5 h-5 rounded-full border-2 border-primary-green border-t-transparent animate-spin" />
        </div>
        <span className="text-sm text-charcoal/60 font-medium">Loading 3D interactive gallery...</span>
      </div>
    ),
  }
)

export default function GalleryPage() {
  const t = useTranslations('Gallery')
  return (
    <main className="bg-white min-h-[100dvh] pt-16 lg:pt-28 pb-10">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg lg:text-xl text-charcoal/80 max-w-2xl mx-auto font-light">
          {t('subtitle')}
        </p>
      </div>

      <OfficePlantsGallery />
    </main>
  )
}
