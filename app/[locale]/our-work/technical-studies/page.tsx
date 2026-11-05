'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function TechnicalStudiesPage() {
  const t = useTranslations('TechnicalStudies')

  const kcdmsStudies = [
    {
      title: t('cs_study1_title'),
      citation: t('cs_study1_citation'),
      file: '/resources/Scoping-Study-Pasture-and-Fodder-Planting-Materials-in-Kenya.pdf',
      preview: '/resources/previews/preview-pasture-fodder.jpg',
    },
    {
      title: t('cs_study2_title'),
      citation: t('cs_study2_citation'),
      file: '/resources/Scoping-Study-Planting-Materials-for-Value-Chain-Crops-in-Kenya-banana-avocado-mango-pineapples-passion-fruit-sweet-potatoes-African-leafy-vegetables.pdf',
      preview: '/resources/previews/preview-value-chain-crops.jpg',
    },
    {
      title: t('cs_study3_title'),
      citation: t('cs_study3_citation'),
      file: '/resources/Scoping-Study-Horticulture-Seedling-Nurseries-as-a-Viable-Business-Model-in-Kenya.pdf',
      preview: '/resources/previews/preview-horticulture-nurseries.jpg',
      clientLink: 'https://www.agrilinks.org/post/private-horticulture-seedling-nurseries-kenya',
    },
    {
      title: t('cs_study4_title'),
      citation: t('cs_study4_citation'),
      file: '/resources/Scoping-Study-Agro-Dealer-Association-Development-in-Twelve-Counties-in-Kenya.pdf',
      preview: '/resources/previews/preview-agrodealer-associations.jpg',
    },
  ]

  return (
    <>
      <main className="bg-white min-h-[100dvh]">
        {/* ─── Hero ─── */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-[120px] -translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-blue/3 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
              {/* Left: Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-4 lg:space-y-6"
              >
                <h1
                  className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                  style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                  dangerouslySetInnerHTML={{ __html: t('hero_title') }}
                />
                <p className="text-primary-blue font-semibold text-base sm:text-lg tracking-wide">
                  {t('hero_subtitle')}
                </p>
              </motion.div>

              {/* Right: Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 lg:pt-16 relative"
              >
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-primary-blue/20" />
                <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                  {t('hero_desc1')} {t('hero_desc2')}
                </p>
                <div className="lg:pl-10 mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-primary-blue text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
<RollingText className="gap-2">
                    {t('req_study')}
                    <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                  </RollingText>
</Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-primary-blue/20 text-primary-blue rounded-full font-semibold text-sm hover:bg-primary-blue/5 transition-colors"
                  >
<RollingText className="gap-2">
                    {t('our_work')}
                  </RollingText>
</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Clients Trust Section ─── */}
        <section className="w-full py-20 bg-mist">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-deep-forest tracking-tight pb-2">
                {t('clients_title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t('clients.0.title'), desc: t('clients.0.description') },
                { title: t('clients.1.title'), desc: t('clients.1.description') },
                { title: t('clients.2.title'), desc: t('clients.2.description') },
                { title: t('clients.3.title'), desc: t('clients.3.description') },
              ].map((client, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[24px] p-6 lg:p-8 border border-transparent hover:border-primary-blue/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-start"
                >
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-forest tracking-tight pb-1 mb-3">
                    {client.title}
                  </h3>
                  <p className="text-charcoal/75 font-light leading-relaxed text-[14px] min-[1440px]:text-[14.5px]">
                    {client.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Flagship Showcase: USAID's KCDMS Studies ─── */}
        <section className="w-full py-16 lg:py-24 bg-[#F0F4EC] border-y border-[#E0E7DC] overflow-hidden">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
            {/* ── Title & Explainer Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4 max-w-4xl"
            >
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-1"
                style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3.5rem)' }}
              >
                {t('cs_title')}
              </h2>

              <div className="space-y-3 text-charcoal/85 font-normal leading-relaxed text-base sm:text-lg lg:text-[17px]">
                <p>{t('cs_desc1')}</p>
                <p>{t('cs_desc2')}</p>
              </div>
            </motion.div>

            {/* ── 4 Published Studies with Static Previews ── */}
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-forest mb-5 px-0.5">
                {t('cs_studies_title')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4 xl:gap-5">
                {kcdmsStudies.map((study, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:border-primary-green/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Instant Static Document Preview Thumbnail */}
                    <div className="relative w-full aspect-[1/1.12] overflow-hidden bg-mist/60 border-b border-black/[0.05]">
                      <Image
                        src={study.preview}
                        alt={study.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        priority={idx < 2}
                      />
                      {/* Hover overlay with Open PDF action */}
                      <a
                        href={study.file}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-primary-green/0 group-hover:bg-primary-green/10 transition-colors duration-200 flex items-center justify-center z-10"
                        aria-label={`Open ${study.title} PDF`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 backdrop-blur-sm text-deep-forest text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                          <ArrowRight size={12} /> Open PDF
                        </span>
                      </a>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <p className="text-xs font-bold text-primary-green uppercase tracking-wider">
                          {t('cs_client_tag')}
                        </p>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal/50 bg-mist px-2 py-0.5 rounded">
                          PDF
                        </span>
                      </div>

                      <h4 className="text-base font-serif font-bold text-deep-forest mb-1.5 leading-snug group-hover:text-primary-green transition-colors line-clamp-2">
                        {study.title}
                      </h4>

                      <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-4 flex-grow line-clamp-2">
                        {study.citation}
                      </p>

                      <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between mt-auto">
                        <a
                          href={study.file}
                          download
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                        >
                          <Download size={13} className="text-primary-green" />
                          <span>{t('cs_download_pdf')}</span>
                        </a>

                        {study.clientLink && (
                          <a
                            href={study.clientLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-green hover:underline"
                          >
                            <span>Agrilinks</span>
                            <ArrowRight size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Link to Resource Library */}
            <div className="pt-2 flex items-center justify-start">
              <Link
                href="/resources?tab=scoping-studies"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-deep-forest text-white rounded-full font-semibold text-sm hover:bg-deep-forest/90 transition-all shadow-md"
              >
                <RollingText className="gap-2">
                  {t('cs_view_all_studies')}
                  <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                </RollingText>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="w-full">
          <div className="w-full bg-deep-forest py-16 lg:py-20 px-6 relative overflow-hidden">
            {/* Radial gradient overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(36,132,198,0.12),transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(58,180,74,0.06),transparent_50%)] pointer-events-none" />

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilterTS">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterTS)" />
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight pb-2 mb-6">
                  {t('cta_title')}
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg mb-10 max-w-xl mx-auto">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white font-bold px-8 py-4 rounded-full transition duration-200"
                  >
<RollingText className="gap-2">
                    {t('cta_btn1')}
                    <ArrowRight size={18} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                  </RollingText>
</Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/20 transition duration-200"
                  >
<RollingText className="gap-2">
                    {t('cta_btn2')}
                    <ArrowRight size={18} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                  </RollingText>
</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
