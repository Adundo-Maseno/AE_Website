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
      borderClass: 'border-emerald-200/90 hover:border-emerald-500',
      textClass: 'text-emerald-950',
      cardBgClass: 'bg-[#F0F9F4] hover:bg-white',
      btnBgClass: 'bg-emerald-700 text-white group-hover:bg-emerald-800',
    },
    {
      title: t('c2_title'),
      description: t('c2_desc'),
      mobileDescription: t('c2_mobile_desc'),
      link: '/our-work/technical-studies',
      borderClass: 'border-sky-200/90 hover:border-sky-500',
      textClass: 'text-slate-950',
      cardBgClass: 'bg-[#F0F6FA] hover:bg-white',
      btnBgClass: 'bg-sky-700 text-white group-hover:bg-sky-800',
    },
    {
      title: t('c3_title'),
      description: t('c3_desc'),
      mobileDescription: t('c3_mobile_desc'),
      link: '/our-work/project-implementation',
      borderClass: 'border-[#1A4D2E]/25 hover:border-[#1A4D2E]/70',
      textClass: 'text-[#123821]',
      cardBgClass: 'bg-[#EDF3EF] hover:bg-white',
      btnBgClass: 'bg-[#1A4D2E] text-white group-hover:bg-[#123821]',
    },
    {
      title: t('c4_title'),
      description: t('c4_desc'),
      mobileDescription: t('c4_mobile_desc'),
      link: '/our-work/client-advisory',
      borderClass: 'border-lime-200/90 hover:border-lime-600',
      textClass: 'text-[#233110]',
      cardBgClass: 'bg-[#F4F7EE] hover:bg-white',
      btnBgClass: 'bg-[#435826] text-white group-hover:bg-[#34441B]',
    },
    {
      title: t('c5_title'),
      description: t('c5_desc'),
      mobileDescription: t('c5_mobile_desc'),
      link: '/our-work/capacity-building',
      borderClass: 'border-orange-200/90 hover:border-orange-500',
      textClass: 'text-[#451A03]',
      cardBgClass: 'bg-[#FAF0E9] hover:bg-white',
      btnBgClass: 'bg-[#9A3412] text-white group-hover:bg-[#7C2D12]',
    },
    {
      title: t('c6_title'),
      description: t('c6_desc'),
      mobileDescription: t('c6_mobile_desc'),
      link: '/our-work/stakeholder-convenings',
      borderClass: 'border-teal-200/90 hover:border-teal-500',
      textClass: 'text-teal-950',
      cardBgClass: 'bg-[#EDF7F7] hover:bg-white',
      btnBgClass: 'bg-teal-700 text-white group-hover:bg-teal-800',
    },
  ]

  return (
    <main className="bg-white min-h-[100dvh]">
        {/* Top Section */}
        <section className="relative w-full pt-16 lg:pt-28 pb-0 overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
              
              {/* Left Side: Title */}
              <div className="flex-1 space-y-4">
                <h1
                  className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                  style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                >
                  {t('title')}
                </h1>
              </div>

              {/* Right Side: Description */}
              <div className="flex-1 lg:pt-12 relative">
                {/* Vertical divider line for desktop */}
                <div className="hidden lg:block absolute left-0 top-12 bottom-0 w-px bg-stone-200/80"></div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-charcoal/90 leading-relaxed font-normal lg:pl-10">
                  {t('subtitle')}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20 relative z-10">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 xl:gap-7">
              {cards.map((card, idx) => {
                return (
                  <Link key={idx} href={card.link} className="block h-full group">
                    <div
                      className={`rounded-2xl md:rounded-[24px] lg:rounded-[26px] border ${card.borderClass} ${card.cardBgClass} flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-7 min-h-0 md:min-h-[210px] lg:min-h-[230px]`}
                    >
                      {/* Mobile Layout (< md) */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4 md:hidden py-1">
                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                          <h2 className={`text-[16.5px] sm:text-lg font-serif font-bold ${card.textClass} leading-snug`}>
                            {card.title}
                          </h2>
                          <p className="text-[13px] sm:text-sm text-charcoal/80 leading-relaxed line-clamp-2 pr-1">
                            {card.mobileDescription}
                          </p>
                        </div>
                        <div className={`w-8 h-8 shrink-0 rounded-full ${card.btnBgClass} flex items-center justify-center shadow-sm`}>
                          <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                        </div>
                      </div>

                      {/* Desktop Layout (md+) */}
                      <div className="hidden md:flex flex-col justify-between h-full space-y-4 lg:space-y-5">
                        <div className="space-y-2 lg:space-y-2.5">
                          <h2
                            className={`font-serif font-bold ${card.textClass} tracking-tight pb-0.5 leading-snug`}
                            style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
                          >
                            {card.title}
                          </h2>
                          <p
                            className="text-charcoal/90 font-normal leading-relaxed text-[14.5px] min-[1440px]:text-[15px]"
                          >
                            {card.description}
                          </p>
                        </div>

                        {/* Bottom Action Link */}
                        <div className="pt-4 lg:pt-5 mt-auto flex items-center justify-between border-t border-black/5">
                          <span className={`text-xs lg:text-sm font-bold ${card.textClass}`}>{t('learn_more')}</span>
                          <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full ${card.btnBgClass} flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300`}>
                            <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
    </main>
  )
}
