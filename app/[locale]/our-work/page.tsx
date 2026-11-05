import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function OurWorkPage() {
  const t = useTranslations('OurWork')
  const cards = [
    {
      index: '01',
      domain: 'Digital Platforms & Data',
      title: t('c1_title'),
      description: t('c1_desc'),
      mobileDescription: t('c1_mobile_desc'),
      link: '/our-work/digital-platforms',
    },
    {
      index: '02',
      domain: 'Diagnostic Research & Studies',
      title: t('c2_title'),
      description: t('c2_desc'),
      mobileDescription: t('c2_mobile_desc'),
      link: '/our-work/technical-studies',
    },
    {
      index: '03',
      domain: 'Systems Implementation',
      title: t('c3_title'),
      description: t('c3_desc'),
      mobileDescription: t('c3_mobile_desc'),
      link: '/our-work/project-implementation',
    },
    {
      index: '04',
      domain: 'Executive & Commercial Advisory',
      title: t('c4_title'),
      description: t('c4_desc'),
      mobileDescription: t('c4_mobile_desc'),
      link: '/our-work/client-advisory',
    },
    {
      index: '05',
      domain: 'Institutional Strengthening',
      title: t('c5_title'),
      description: t('c5_desc'),
      mobileDescription: t('c5_mobile_desc'),
      link: '/our-work/capacity-building',
    },
    {
      index: '06',
      domain: 'Policy & Sector Convening',
      title: t('c6_title'),
      description: t('c6_desc'),
      mobileDescription: t('c6_mobile_desc'),
      link: '/our-work/stakeholder-convenings',
    },
  ]

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh]">
      {/* Editorial Consultancy Masthead */}
      <section className="relative w-full pt-14 lg:pt-24 pb-10 lg:pb-14 overflow-hidden bg-white border-b border-stone-200/80">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/[0.04] rounded-full blur-[110px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16">
            {/* Left Side: Eyebrow + Title */}
            <div className="flex-1 space-y-4">
              <span className="editorial-eyebrow">Advisory &amp; Implementation Practices</span>
              <h1
                className="font-serif text-[#0F1F15] font-bold leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
              >
                {t('title')}
              </h1>
            </div>

            {/* Right Side: Description */}
            <div className="flex-1 relative">
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-[1.5px] bg-[#1A4D2E]/20" />
              <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Practice Matrix */}
      <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 xl:gap-7">
            {cards.map((card, idx) => (
              <Link key={idx} href={card.link} className="block h-full group focus-visible:outline-none">
                <article
                  className="consultancy-card flex flex-col justify-between h-full p-5 sm:p-6 md:p-7 lg:p-8 min-h-0 md:min-h-[250px] lg:min-h-[275px] group-focus-visible:ring-2 group-focus-visible:ring-primary-green"
                >
                  {/* Top Index & Domain Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-stone-100">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A4D2E]/75">
                      {card.domain}
                    </span>
                    <span className="font-mono text-xs font-bold text-primary-green tabular-nums">
                      {card.index}
                    </span>
                  </div>

                  {/* Mobile Layout (< md) */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 md:hidden py-1">
                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <h2 className="text-[17px] sm:text-lg font-serif font-bold text-[#0F1F15] group-hover:text-[#1A4D2E] leading-snug transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-[13.5px] sm:text-sm text-charcoal/80 leading-relaxed line-clamp-2 pr-1">
                        {card.mobileDescription}
                      </p>
                    </div>
                    <div className="w-9 h-9 shrink-0 rounded-full bg-[#0F1F15] text-white group-hover:bg-primary-green flex items-center justify-center shadow-xs transition-colors duration-200">
                      <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </div>
                  </div>

                  {/* Desktop Layout (md+) */}
                  <div className="hidden md:flex flex-col justify-between flex-1 space-y-5">
                    <div className="space-y-2.5">
                      <h2
                        className="font-serif font-bold text-[#0F1F15] group-hover:text-[#1A4D2E] tracking-tight pb-0.5 leading-snug transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
                      >
                        {card.title}
                      </h2>
                      <p className="text-charcoal/85 font-normal leading-relaxed text-[14.5px] min-[1440px]:text-[15.5px]">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="pt-4 lg:pt-5 mt-auto flex items-center justify-between border-t border-stone-100">
                      <span className="text-xs lg:text-[13.5px] font-bold uppercase tracking-[0.12em] text-[#0F1F15] group-hover:text-primary-green transition-colors">
                        {t('learn_more')}
                      </span>
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#F8F6F0] border border-stone-200/80 text-[#0F1F15] group-hover:bg-[#0F1F15] group-hover:border-[#0F1F15] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
