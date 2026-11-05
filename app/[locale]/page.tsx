'use client'

import { useRef, useState, useEffect } from 'react'
import ClientLogos from '@/components/client-logos'
import { motion } from 'framer-motion'
import { ArrowRight, Earth, Handshake, Building2 } from 'lucide-react'
import { Link } from '@/i18n/routing'
import WhyAgriExperience from '@/components/motion/why-agri-experience'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function Home() {
  const t = useTranslations('Home')
  const tAgri = useTranslations('WhyAgriExperience')
  const locale = useLocale()

  const heroRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const sequenceWrapperRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track1InnerRef = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const track2InnerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Effect 1: Hero Parallax
  useGSAP(() => {
    if (!heroRef.current || !heroBgRef.current) return;

    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Parallax the background (slides down up to 20vh) and slight zoom
      gsap.to(heroBgRef.current, {
        y: () => window.innerHeight * 0.2,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: 0,
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, [])

  // Effect 2: Multi-step Pinned Horizontal Scroll with Parallax Overlap
  useGSAP(() => {
    if (!sequenceWrapperRef.current || !track1Ref.current || !track1InnerRef.current || !track2Ref.current || !track2InnerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const container = sequenceWrapperRef.current;

      const getScroll1 = () => {
        // Safely access scrollWidth, returning 0 if the ref is unmounted during mobile view
        if (!track1InnerRef.current) return 0;
        return Math.max(0, track1InnerRef.current.scrollWidth - window.innerWidth);
      };
      const getScroll2 = () => {
        if (!track2InnerRef.current) return 0;
        return Math.max(0, track2InnerRef.current.scrollWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScroll1() + getScroll2() + window.innerWidth}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      const scroll1 = getScroll1();
      const scroll2 = getScroll2();
      const ratio1 = scroll1 > 0 ? scroll1 / window.innerWidth : 0.1;
      const ratio2 = scroll2 > 0 ? scroll2 / window.innerWidth : 0.1;

      tl.to(track1InnerRef.current, {
        x: () => -getScroll1(),
        ease: "none",
        duration: ratio1
      });

      tl.to(track1Ref.current, {
        x: () => -window.innerWidth * 0.3,
        ease: "power2.inOut",
        duration: 0.8
      }, "cover");

      tl.fromTo(track2Ref.current, {
        x: "100%"
      }, {
        x: "0%",
        ease: "power2.inOut",
        duration: 0.8
      }, "cover");

      tl.to(track2InnerRef.current, {
        x: () => -getScroll2(),
        ease: "none",
        duration: ratio2
      });

      return () => {
        tl.kill();
      }
    });

    return () => mm.revert();
  }, [])

  const beliefs = [
    {
      title: t('belief_4_title'),
      text: t('belief_4_text'),
      width: "w-[290px] lg:w-[350px] xl:w-[380px] min-[1440px]:w-[430px] 2xl:w-[470px]"
    },
    {
      title: t('belief_3_title'),
      text: t('belief_3_text'),
      width: "w-[290px] lg:w-[350px] xl:w-[380px] min-[1440px]:w-[430px] 2xl:w-[470px]"
    },
    {
      title: t('belief_1_title'),
      text: t('belief_1_text'),
      width: "w-[310px] lg:w-[380px] xl:w-[420px] min-[1440px]:w-[470px] 2xl:w-[510px]"
    },
    {
      title: t('belief_2_title'),
      text: t('belief_2_text'),
      width: "w-[310px] lg:w-[380px] xl:w-[420px] min-[1440px]:w-[470px] 2xl:w-[510px]"
    }
  ]

  const UNIFORM_CARD_WIDTH = "w-[290px] lg:w-[340px] xl:w-[360px] min-[1440px]:w-[420px] 2xl:w-[460px]"

  const agriCards = [
    { text: tAgri('card_3'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_2'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_5'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_1'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_4'), width: UNIFORM_CARD_WIDTH }
  ]

  return (
    <>
      <main className="-mt-[var(--header-height)] bg-background overflow-x-clip">

        {/* Premium Full-Bleed Video Hero Section */}
        <section ref={heroRef} className="relative w-full min-h-[90dvh] md:min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-[calc(var(--header-height)+2rem)] pb-12 bg-white z-0">

          {/* Background Media Container (Contained within hero section) */}
          <div ref={heroBgRef} className="absolute inset-0 md:-top-[20vh] left-0 w-full h-full md:h-[120vh] z-0 origin-center bg-black overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-mist">
              {/* Mobile (< md): Instant LCP Image (0 MB video download over mobile networks) */}
              {/* Mobile (< md): Instant LCP Image (Exact video frame screenshot) */}
              <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image
                  src="/hero-video-frame.jpg"
                  alt="Agri Experience"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 767px) 100vw, 1px"
                  className="object-cover object-center"
                />
              </div>

              {/* Desktop (md+): Full-Bleed Video Background */}
              {isDesktop && (
                <div className="hidden md:block absolute inset-0 w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/hero-video-frame.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_30%]"
                  >
                    <source src="/Videos/hero-video.mp4" type="video/mp4" />
                    <track kind="captions" src="/empty.vtt" srcLang="en" label="English" />
                  </video>
                </div>
              )}
            </div>
          </div>

          {/* Directional Scrim: 100% text legibility on the left, pure video visible on the right */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/88 to-white/35 md:bg-gradient-to-r md:from-white/95 md:from-[22%] md:via-white/90 md:via-[56%] md:to-transparent md:to-[86%] md:w-[86%] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F6F0]/60 to-transparent pointer-events-none z-0" />

          <div className="relative z-10 max-w-[1400px] min-[1440px]:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full flex-1 flex flex-col justify-center">
            <div className="max-w-2xl xl:max-w-3xl 3xl:max-w-4xl space-y-5 lg:space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#1A4D2E]/15 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-primary-green shrink-0" />
                <span className="text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#1A4D2E]">
                  Seed Systems &amp; Agricultural Advisory • Sub-Saharan Africa
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif tracking-tight pb-1 text-[#0F1F15] font-bold leading-[1.12]"
                style={{ fontSize: 'clamp(2rem, 1.35rem + 3.1vw, 3.85rem)' }}
              >
                {t('hero_title_1')} <br />
                {t('hero_title_2')} <br />
                <span className="text-[#1A4D2E]">{t('hero_title_3')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="text-charcoal/90 leading-relaxed font-normal max-w-xl xl:max-w-2xl border-l-2 border-primary-green/60 pl-4 sm:pl-5"
                style={{ fontSize: 'clamp(1rem, 0.92rem + 0.45vw, 1.35rem)' }}
              >
                {t('hero_desc')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="pt-1 flex flex-wrap items-center gap-3.5 sm:gap-4"
              >
                <Link href="/our-impact" className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#0F1F15] text-white rounded-full font-bold transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#1A4D2E] text-sm lg:text-[15px] shadow-lg shadow-[#0F1F15]/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2">
                  <RollingText className="gap-3">
                    {t('explore_impact')}
                    <ArrowRight size={17} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0" />
                  </RollingText>
                </Link>

                <Link
                  href="/our-work"
                  className="group inline-flex items-center justify-center gap-2.5 px-5 py-3.5 lg:px-7 lg:py-4 bg-white/85 backdrop-blur-md border border-[#1A4D2E]/20 text-[#0F1F15] rounded-full font-semibold text-sm lg:text-[15px] hover:bg-white hover:border-[#1A4D2E]/45 transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xs hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                >
                  <span>Practice Areas</span>
                  <ArrowRight size={16} className="text-primary-green transform group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
                </Link>
              </motion.div>

              {/* Institutional Impact Ledger */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="pt-3 lg:pt-5"
              >
                <div className="inline-grid grid-cols-3 divide-x divide-[#1A4D2E]/15 rounded-2xl bg-white/88 backdrop-blur-xl border border-[#1A4D2E]/15 shadow-sm overflow-hidden max-w-2xl w-full sm:w-auto">
                  {[
                    { value: t('stat_1_val'), label: t('stat_1_lbl'), icon: Earth },
                    { value: t('stat_2_val'), label: t('stat_2_lbl'), icon: Handshake },
                    { value: t('stat_3_val'), label: t('stat_3_lbl'), icon: Building2 },
                  ].map((stat, i) => (
                    <div key={i} className="px-3.5 py-3 sm:px-6 sm:py-4 lg:px-7 lg:py-4 flex flex-col justify-between group hover:bg-[#F8F6F0]/80 transition-colors duration-200">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className="font-serif font-bold text-[#0F1F15] leading-none tabular-nums tracking-tight"
                          style={{ fontSize: 'clamp(1.25rem, 1.05rem + 0.8vw, 1.85rem)' }}
                        >
                          {stat.value}
                        </span>
                        <stat.icon size={15} className="text-primary-green/80 hidden sm:block shrink-0" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-[0.12em] text-charcoal/70 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="hidden lg:motion-safe:block">
          {/* Pinned Horizontal Sequence Wrapper */}
          <div ref={sequenceWrapperRef} className="relative z-20 bg-[#F8F6F0]">
            <div className="relative h-[100dvh] w-full overflow-hidden">

              {/* Track 1: Why Agri Experience Layer */}
              <div ref={track1Ref} className="absolute inset-0 w-full h-full bg-[#F8F6F0] z-0 flex">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--warm-earth)_0%,transparent_60%)] opacity-25 blur-3xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_60%)] opacity-[0.04] blur-3xl pointer-events-none rounded-full -translate-x-1/4 translate-y-1/4" />

                <div ref={track1InnerRef} className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-5 lg:gap-6 xl:gap-8 min-[1440px]:gap-12 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24">
                  <div className="w-[200px] lg:w-[220px] xl:w-[250px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0 space-y-3 lg:space-y-4 min-[1440px]:space-y-6">
                    <motion.div className="space-y-3">
                      <span className="editorial-eyebrow">
                        {tAgri('subtitle')}
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] min-[1440px]:text-5xl 2xl:text-6xl font-serif text-[#0F1F15] font-bold tracking-tight pb-1 leading-[1.12]">
                        {tAgri('title')}
                      </h2>
                      <div className="w-16 lg:w-20 h-[2px] bg-primary-green"></div>
                    </motion.div>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-3.5 lg:gap-4 xl:gap-5 min-[1440px]:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(390px,60dvh,550px)]">
                    {agriCards.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.width} h-full shrink-0 bg-white p-4 lg:p-5 xl:p-6 min-[1440px]:p-7 2xl:p-8 rounded-2xl xl:rounded-[24px] border border-stone-200/90 hover:border-[#1A4D2E]/35 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 group relative overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-stone-100">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/70 tabular-nums">
                            Mandate // 0{idx + 1}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-green/60 group-hover:bg-primary-green transition-colors" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center flex-1 pt-2 overflow-hidden">
                          <p
                            className="text-charcoal/95 font-medium leading-relaxed text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14.5px] min-[1440px]:text-[16px] 2xl:text-[17.5px]"
                          >
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Track 2: What We Believe Layer */}
              <div ref={track2Ref} className="absolute inset-0 w-full h-full bg-[#0F1F15] z-10 translate-x-full flex">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary-green)_0%,transparent_55%)] opacity-15 pointer-events-none"></div>

                <div ref={track2InnerRef} className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-5 lg:gap-6 xl:gap-8 min-[1440px]:gap-12 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24">
                  <div className="w-[200px] lg:w-[220px] xl:w-[250px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0 space-y-3 lg:space-y-4 min-[1440px]:space-y-6">
                    <motion.div className="space-y-3">
                      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-green">
                        <span className="w-5 h-[1.5px] bg-primary-green inline-block" />
                        Core Convictions
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] min-[1440px]:text-4xl 2xl:text-5xl font-serif text-white font-bold tracking-tight pb-1 leading-[1.15]">{t('what_we_believe')}</h2>
                      <div className="w-16 lg:w-20 h-[2px] bg-primary-green"></div>
                    </motion.div>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-3.5 lg:gap-4 xl:gap-5 min-[1440px]:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(390px,60dvh,550px)]">
                    {beliefs.map((belief, idx) => (
                      <div
                        key={idx}
                        className={`${belief.width} h-full shrink-0 bg-white/[0.05] backdrop-blur-md border border-white/12 p-4 sm:p-5 lg:p-5 xl:p-6 min-[1440px]:p-7 rounded-2xl xl:rounded-[24px] hover:bg-white/[0.09] hover:border-primary-green/40 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/20`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-primary-green tabular-nums">
                            Principle // 0{idx + 1}
                          </span>
                        </div>
                        <div className="flex flex-col justify-center gap-1.5 xl:gap-2 flex-1 pt-2 overflow-hidden">
                          <h3 className="text-sm sm:text-base lg:text-[16.5px] xl:text-lg min-[1440px]:text-xl font-serif text-white font-bold leading-snug">{belief.title}</h3>
                          <p
                            className="text-white/80 font-normal leading-snug xl:leading-relaxed text-xs sm:text-[13px] lg:text-[13px] xl:text-[14px] min-[1440px]:text-[15px] 2xl:text-[16.5px]"
                          >
                            {belief.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="block lg:motion-safe:hidden">
          {/* Vertical Fallback for Mobile / Reduced Motion */}
          <div className="relative z-20 bg-[#F8F6F0]">
            <WhyAgriExperience />

            {/* What We Believe Section */}
            <section className="w-full py-16 lg:py-20 bg-[#0F1F15] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary-green)_0%,transparent_55%)] opacity-15"></div>
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  <div className="lg:w-1/3 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-green">
                        <span className="w-5 h-[1.5px] bg-primary-green inline-block" />
                        Core Convictions
                      </span>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight pb-1">{t('what_we_believe')}</h2>
                      <div className="w-20 h-[2px] bg-primary-green"></div>
                    </motion.div>
                  </div>

                  <div className="w-full lg:w-2/3 flex flex-col sm:grid sm:grid-cols-2 gap-4 md:gap-6">
                    {beliefs.map((belief, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ delay: idx * 0.08 }}
                        className="bg-white/[0.05] backdrop-blur-sm border border-white/12 p-5 sm:p-6 rounded-2xl hover:bg-white/[0.09] transition-colors flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-green tabular-nums">
                            Principle // 0{idx + 1}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-serif text-white mb-2 font-bold">{belief.title}</h3>
                          <p className="text-white/80 font-normal text-base leading-relaxed">{belief.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Institutional Partnerships & Client Logos */}
        <section className="w-full py-16 lg:py-24 bg-white border-t border-stone-200/80 relative z-20">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14 space-y-3">
              <div className="flex justify-center">
                <span className="editorial-eyebrow">Institutional Track Record</span>
              </div>
              <h2 className="text-[#0F1F15] text-2xl sm:text-3xl lg:text-5xl font-serif font-bold tracking-tight pb-1">{t('trusted_leaders')}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-charcoal/75 font-normal max-w-2xl mx-auto">
                {t('trusted_leaders_desc')}
              </p>
            </div>
            <ClientLogos />
          </div>
        </section>

        {/* Executive Advisory CTA Section */}
        <section className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#0F1F15] text-white overflow-hidden z-20 border-t border-white/10">
          {/* Subtle Architectural Grid & Radial Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_70%)]"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
            <div className="flex flex-col items-center gap-5 lg:gap-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-green">
                Strategic Advisory &amp; Systems Implementation
              </span>

              <div className="overflow-hidden pb-2 -mb-2">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight"
                >
                  {t('cta_title')}
                </motion.h2>
              </div>

              <div className="overflow-hidden pb-2 -mb-2">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto"
                >
                  {t('cta_desc')}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-row flex-wrap gap-3.5 sm:gap-5 justify-center mt-2"
              >
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-3.5 sm:px-9 sm:py-4.5 bg-primary-green text-white rounded-full font-bold text-xs sm:text-base transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary-green/25 hover:shadow-primary-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <RollingText>
                    {t('cta_btn_1')}
                  </RollingText>
                </Link>
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-3.5 sm:px-9 sm:py-4.5 border border-white/30 text-white rounded-full font-bold text-xs sm:text-base hover:bg-white/10 hover:border-white/50 transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <RollingText>
                    {t('cta_btn_2')}
                  </RollingText>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
