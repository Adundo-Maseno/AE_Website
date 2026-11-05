import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function OurWorkPage() {
  const t = useTranslations('OurWork')
  const cards = [
    {
      title: t('c1_title'),
      description: t('c1_desc'),
      mobileDescription: t('c1_mobile_desc'),
      link: '/our-work/digital-platforms',
    },
    {
      title: t('c2_title'),
      description: t('c2_desc'),
      mobileDescription: t('c2_mobile_desc'),
      link: '/our-work/technical-studies',
    },
    {
      title: t('c3_title'),
      description: t('c3_desc'),
      mobileDescription: t('c3_mobile_desc'),
      link: '/our-work/project-implementation',
    },
    {
      title: t('c4_title'),
      description: t('c4_desc'),
      mobileDescription: t('c4_mobile_desc'),
      link: '/our-work/client-advisory',
    },
    {
      title: t('c5_title'),
      description: t('c5_desc'),
      mobileDescription: t('c5_mobile_desc'),
      link: '/our-work/capacity-building',
    },
    {
      title: t('c6_title'),
      description: t('c6_desc'),
      mobileDescription: t('c6_mobile_desc'),
      link: '/our-work/stakeholder-convenings',
    },
  ]

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh]">
      {/* Masthead */}
      <section className="relative w-full pt-14 lg:pt-24 pb-10 lg:pb-14 bg-white border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16">
            <div className="flex-1">
              <h1
                className="font-serif text-[#0F1F15] font-bold leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
              >
                {t('title')}
              </h1>
            </div>

            <div className="flex-1 relative">
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-stone-200" />
              <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] leading-[1.6] font-normal lg:pl-10">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 xl:gap-7">
            {cards.map((card, idx) => (
              <Link key={idx} href={card.link} className="block h-full group focus-visible:outline-none">
                <article
                  className="consultancy-card flex flex-col justify-between h-full p-5 sm:p-6 md:p-7 lg:p-8 min-h-0 md:min-h-[230px] lg:min-h-[250px] group-focus-visible:ring-2 group-focus-visible:ring-[#1A4D2E]"
                >
                  {/* Mobile Layout (< md) */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 md:hidden py-1">
                    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                      <h2 className="text-[17px] sm:text-lg font-serif font-bold text-[#0F1F15] group-hover:text-[#1A4D2E] leading-snug transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-[13.5px] sm:text-sm text-[#2A3830] leading-relaxed line-clamp-2 pr-1">
                        {card.mobileDescription}
                      </p>
                    </div>
                    <div className="w-9 h-9 shrink-0 rounded-full bg-[#0F1F15] text-white group-hover:bg-[#1A4D2E] flex items-center justify-center transition-colors duration-200">
                      <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </div>
                  </div>

                  {/* Desktop Layout (md+) */}
                  <div className="hidden md:flex flex-col justify-between flex-1 space-y-5">
                    <div className="space-y-3">
                      <h2
                        className="font-serif font-bold text-[#0F1F15] group-hover:text-[#1A4D2E] tracking-tight leading-snug transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
                      >
                        {card.title}
                      </h2>
                      <p className="text-[#2A3830] font-normal leading-[1.65] text-[15px] min-[1440px]:text-base">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="pt-4 lg:pt-5 mt-auto flex items-center justify-between border-t border-stone-100">
                      <span className="text-sm font-semibold text-[#0F1F15] group-hover:text-[#1A4D2E] transition-colors">
                        {t('learn_more')}
                      </span>
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#F8F6F0] border border-stone-200/80 text-[#0F1F15] group-hover:bg-[#0F1F15] group-hover:border-[#0F1F15] group-hover:text-white flex items-center justify-center transition-colors duration-200">
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
