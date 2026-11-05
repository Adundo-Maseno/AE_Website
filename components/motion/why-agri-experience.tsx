'use client'

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function WhyAgriExperience() {
  const t = useTranslations('WhyAgriExperience');
  const sectionRef = useRef(null);

  const cards = [
    { text: t('card_1') },
    { text: t('card_2') },
    { text: t('card_3') },
    { text: t('card_4') },
    { text: t('card_5') }
  ];

  const bgColors = ['bg-gray-100/90', 'bg-gray-50/90', 'bg-[#FAFAFA]/90', 'bg-[#FDFDFD]/90', 'bg-white/90'];

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-32 bg-[#F8F6F0] relative overflow-visible border-t border-stone-200/70">
      {/* Scoped keyframes for the card entrance */}
      <style>{`
        @keyframes whyAeCardIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .why-ae-card {
          animation: whyAeCardIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .why-ae-card {
            animation: none;
          }
        }
      `}</style>

      {/* Dynamic Background Elements */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--warm-earth)_0%,transparent_60%)] opacity-25 blur-3xl pointer-events-none rounded-full translate-x-1/4 -translate-y-1/4"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_60%)] opacity-[0.04] blur-3xl pointer-events-none rounded-full -translate-x-1/4 translate-y-1/4"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="editorial-eyebrow justify-center"
          >
            {t('subtitle')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#0F1F15] font-bold tracking-tight text-balance"
          >
            {t('title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-[2px] bg-primary-green mx-auto mt-5"
          />
        </div>

        <div className="flex flex-col gap-5 pb-12 pt-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:pb-12 md:pt-6">
          {cards.map((item, idx) => (
            <div
              key={idx}
              style={{
                top: `calc(96px + ${idx * 14}px)`,
                zIndex: idx,
              }}
              className="sticky md:static h-auto md:h-full"
            >
              <div
                style={{ animationDelay: `${idx * 0.08}s` }}
                className="why-ae-card bg-white p-6 md:p-8 rounded-2xl md:rounded-[24px] border border-stone-200/90 hover:border-[#1A4D2E]/35 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group relative overflow-hidden h-full flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-green/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/70 tabular-nums">
                    Mandate // 0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green/60 group-hover:bg-primary-green transition-colors" />
                </div>

                <div className="relative z-10 flex-1 flex items-center">
                  <p className="text-base sm:text-lg text-charcoal/90 font-medium leading-relaxed text-pretty">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
