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
    <section ref={sectionRef} className="w-full py-16 lg:py-40 bg-mist relative overflow-visible">
      {/* Scoped keyframes for the card entrance */}
      <style>{`
        @keyframes whyAeCardIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .why-ae-card {
          animation: whyAeCardIn 0.6s ease-out both;
        }
      `}</style>

      {/* Dynamic Background Elements */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--warm-earth)_0%,transparent_60%)] opacity-20 blur-3xl pointer-events-none rounded-full translate-x-1/4 -translate-y-1/4"
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_60%)] opacity-[0.05] blur-3xl pointer-events-none rounded-full -translate-x-1/4 translate-y-1/4"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block text-sm font-bold uppercase tracking-widest text-primary-green mb-2"
          >
            {t('subtitle')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-serif text-deep-forest font-bold tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-primary-green to-transparent mx-auto rounded-full mt-6"
          />
        </div>

        <div className="flex flex-col gap-6 pb-16 pt-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12 md:pb-16 md:pt-12">
          {cards.map((item, idx) => (
            <div
              key={idx}
              style={{ 
                top: `calc(100px + ${idx * 16}px)`,
                zIndex: idx,
              }}
              className="sticky md:static h-auto md:h-full"
            >
              <div
                style={{ animationDelay: `${idx * 0.1}s` }}
                className={`
                  why-ae-card
                  ${bgColors[idx] || 'bg-white/90'} 
                  backdrop-blur-xl p-6 md:p-10 rounded-3xl md:rounded-[2rem] 
                  border border-white/80 
                  shadow-[0_-4px_20px_rgba(0,0,0,0.04)] md:shadow-md
                  group relative overflow-hidden h-full flex flex-col justify-center min-h-[160px] sm:min-h-[180px]
                `}
              >
                {/* Card Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 font-medium leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
