'use client'

import { useTranslations } from 'next-intl'

export default function WhyAgriExperience() {
  const t = useTranslations('WhyAgriExperience')

  const cards = [
    { text: t('card_1') },
    { text: t('card_2') },
    { text: t('card_3') },
    { text: t('card_4') },
    { text: t('card_5') },
  ]

  return (
    <section className="w-full py-16 lg:py-28 bg-[#F8F6F0] relative border-t border-stone-200/80">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0F1F15] font-bold tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200/90 flex flex-col justify-center min-h-[150px]"
              style={{ boxShadow: '0 2px 8px rgba(15, 31, 21, 0.03)' }}
            >
              <p className="text-base sm:text-[17px] text-[#1C2B22] font-normal leading-[1.6] text-pretty">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
