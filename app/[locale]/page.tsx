'use client'

import { useRef, useState, useEffect } from 'react'
import ClientLogos from '@/components/client-logos'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import WhyAgriExperience from '@/components/motion/why-agri-experience'
import { useTranslations, useLocale } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'
import { DynamicCustomSections } from '@/components/cms/dynamic-custom-sections'

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
  const [loadVideo, setLoadVideo] = useState(false)

  // Defer ambient hero video until user interaction or after initial load settles on desktop
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ((navigator as any).connection?.saveData) return

    let triggered = false
    const activateVideo = () => {
      if (triggered) return
      triggered = true
      setLoadVideo(true)
      window.removeEventListener('scroll', activateVideo)
      window.removeEventListener('pointermove', activateVideo)
      window.removeEventListener('keydown', activateVideo)
    }

    window.addEventListener('scroll', activateVideo, { once: true, passive: true })
    window.addEventListener('pointermove', activateVideo, { once: true, passive: true })
    window.addEventListener('keydown', activateVideo, { once: true, passive: true })
    const timer = window.setTimeout(activateVideo, 4500)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', activateVideo)
      window.removeEventListener('pointermove', activateVideo)
      window.removeEventListener('keydown', activateVideo)
    }
  }, [])

  // Dynamically load GSAP + ScrollTrigger only on desktop viewports (>= 768px)
  // and batch all DOM geometry reads before ScrollTrigger DOM mutations to prevent forced reflows.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canAnimate = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches
    if (!canAnimate) return

    let ctxCleanup: (() => void) | undefined
    let cancelled = false

    const initDesktopMotion = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()

      // Batch all geometric reads UPFRONT before any ScrollTrigger pin/spacer mutations
      const cachedMetrics = {
        vh: window.innerHeight,
        vw: window.innerWidth,
        scroll1: track1InnerRef.current ? Math.max(0, track1InnerRef.current.scrollWidth - window.innerWidth) : 0,
        scroll2: track2InnerRef.current ? Math.max(0, track2InnerRef.current.scrollWidth - window.innerWidth) : 0,
      }

      const updateMetrics = () => {
        cachedMetrics.vh = window.innerHeight
        cachedMetrics.vw = window.innerWidth
        cachedMetrics.scroll1 = track1InnerRef.current
          ? Math.max(0, track1InnerRef.current.scrollWidth - cachedMetrics.vw)
          : 0
        cachedMetrics.scroll2 = track2InnerRef.current
          ? Math.max(0, track2InnerRef.current.scrollWidth - cachedMetrics.vw)
          : 0
      }

      ScrollTrigger.addEventListener('refreshInit', updateMetrics)

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        if (!heroRef.current || !heroBgRef.current) return
        gsap.to(heroBgRef.current, {
          y: () => cachedMetrics.vh * 0.2,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 0,
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
      })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (
          !sequenceWrapperRef.current ||
          !track1Ref.current ||
          !track1InnerRef.current ||
          !track2Ref.current ||
          !track2InnerRef.current
        ) {
          return
        }

        const ratio1 = cachedMetrics.scroll1 > 0 ? cachedMetrics.scroll1 / cachedMetrics.vw : 0.1
        const ratio2 = cachedMetrics.scroll2 > 0 ? cachedMetrics.scroll2 / cachedMetrics.vw : 0.1

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sequenceWrapperRef.current,
            start: 'top top',
            end: () => `+=${cachedMetrics.scroll1 + cachedMetrics.scroll2 + cachedMetrics.vw}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to(track1InnerRef.current, {
          x: () => -cachedMetrics.scroll1,
          ease: 'none',
          duration: ratio1,
        })

        tl.to(
          track1Ref.current,
          {
            x: () => -cachedMetrics.vw * 0.3,
            ease: 'power2.inOut',
            duration: 0.8,
          },
          'cover'
        )

        tl.fromTo(
          track2Ref.current,
          { x: '100%' },
          {
            x: '0%',
            ease: 'power2.inOut',
            duration: 0.8,
          },
          'cover'
        )

        tl.to(track2InnerRef.current, {
          x: () => -cachedMetrics.scroll2,
          ease: 'none',
          duration: ratio2,
        })

        return () => {
          tl.kill()
        }
      })

      ctxCleanup = () => {
        ScrollTrigger.removeEventListener('refreshInit', updateMetrics)
        mm.revert()
      }
    }

    initDesktopMotion()

    return () => {
      cancelled = true
      ctxCleanup?.()
    }
  }, [])

  const beliefs = [
    {
      title: t('belief_4_title'),
      text: t('belief_4_text'),
      width: 'w-[290px] lg:w-[350px] xl:w-[380px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    },
    {
      title: t('belief_3_title'),
      text: t('belief_3_text'),
      width: 'w-[290px] lg:w-[350px] xl:w-[380px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    },
    {
      title: t('belief_1_title'),
      text: t('belief_1_text'),
      width: 'w-[310px] lg:w-[380px] xl:w-[420px] min-[1440px]:w-[470px] 2xl:w-[510px]',
    },
    {
      title: t('belief_2_title'),
      text: t('belief_2_text'),
      width: 'w-[310px] lg:w-[380px] xl:w-[420px] min-[1440px]:w-[470px] 2xl:w-[510px]',
    },
  ]

  const UNIFORM_CARD_WIDTH = 'w-[290px] lg:w-[340px] xl:w-[360px] min-[1440px]:w-[420px] 2xl:w-[460px]'

  const agriCards = [
    { text: tAgri('card_3'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_2'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_5'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_1'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_4'), width: UNIFORM_CARD_WIDTH },
  ]

  return (
    <>
      <main className="-mt-[var(--header-height)] bg-background overflow-x-clip">
        {/* Premium Full-Bleed Hero Section */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[90dvh] md:min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-[calc(var(--header-height)+2rem)] pb-12 bg-white z-0"
        >
          {/* Background Media Container */}
          <div
            ref={heroBgRef}
            className="absolute inset-0 md:-top-[20vh] left-0 w-full h-full md:h-[120vh] z-0 origin-center bg-black overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-mist">
              {/* Instant First-Frame Hero Picture (34 KB mobile WebP / 85 KB desktop WebP) */}
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(max-width: 767px)" srcSet="/hero-video-frame-mobile.webp" type="image/webp" />
                <source media="(min-width: 768px)" srcSet="/hero-video-frame.webp" type="image/webp" />
                <img
                  src="/hero-video-frame-mobile.webp"
                  alt="Agri Experience"
                  width={1200}
                  height={675}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center lg:object-[center_30%]"
                />
              </picture>

              {/* Desktop (md+): Deferred Full-Bleed Ambient Video Background */}
              {loadVideo && (
                <div className="hidden md:block absolute inset-0 w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/hero-video-frame.webp"
                    className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_30%]"
                  >
                    <source src="/Videos/hero-video.webm" type="video/webm" />
                    <source src="/Videos/hero-video.mp4" type="video/mp4" />
                    <track kind="captions" src="/empty.vtt" srcLang="en" label="English" />
                  </video>
                </div>
              )}
            </div>
          </div>

          {/* Directional Scrim: 100% text legibility on the left, pure visual on the right */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/88 to-white/35 md:bg-gradient-to-r md:from-white/95 md:from-[22%] md:via-white/90 md:via-[56%] md:to-transparent md:to-[86%] md:w-[86%] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] min-[1440px]:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full flex-1 flex flex-col justify-center">
            <div className="max-w-2xl xl:max-w-3xl 3xl:max-w-4xl space-y-6 lg:space-y-8">
              <h1
                className="font-serif tracking-tight text-[#0F1F15] font-bold leading-[1.1]"
                style={{ fontSize: 'clamp(2.125rem, 1.45rem + 3.1vw, 4rem)' }}
              >
                {t('hero_title_1')} <br />
                {t('hero_title_2')} <br />
                {t('hero_title_3')}
              </h1>

              <p
                className="text-[#223127] leading-[1.6] font-normal max-w-[58ch]"
                style={{ fontSize: 'clamp(1.0625rem, 0.96rem + 0.45vw, 1.35rem)' }}
              >
                {t('hero_desc')}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-4">
                <Link
                  href="/our-impact"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#0F1F15] text-white rounded-full font-semibold transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#1A4D2E] text-sm lg:text-[15px] shadow-md hover:shadow-lg active:scale-[0.98] select-none"
                >
                  <RollingText className="gap-2.5">
                    {t('explore_impact')}
                    <ArrowRight
                      size={17}
                      className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0"
                    />
                  </RollingText>
                </Link>

                <Link
                  href="/our-work"
                  className="inline-flex items-center justify-center px-6 py-3.5 lg:px-7 lg:py-4 bg-white/90 backdrop-blur-md border border-[#1A4D2E]/25 text-[#0F1F15] rounded-full font-semibold text-sm lg:text-[15px] hover:bg-white hover:border-[#0F1F15] transition-colors duration-200 active:scale-[0.98]"
                >
                  Practice Areas
                </Link>
              </div>

              {/* Understated Institutional Footprint Line */}
              <div className="pt-4 border-t border-[#0F1F15]/12 max-w-xl flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm sm:text-[15px] text-[#223127]">
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-base sm:text-lg mr-1.5">
                    {t('stat_1_val')}
                  </strong>
                  {t('stat_1_lbl').toLowerCase().replace(/\bafrican\b/i, 'African')}
                </span>
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-base sm:text-lg mr-1.5">
                    {t('stat_2_val')}
                  </strong>
                  {t('stat_2_lbl').toLowerCase()}
                </span>
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-base sm:text-lg mr-1.5">
                    {t('stat_3_val')}
                  </strong>
                  {t('stat_3_lbl').toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="hidden lg:motion-safe:block">
          {/* Pinned Horizontal Sequence Wrapper */}
          <div ref={sequenceWrapperRef} className="relative z-20 bg-[#F8F6F0]">
            <div className="relative h-[100dvh] w-full overflow-hidden">
              {/* Track 1: Why Agri Experience Layer */}
              <div ref={track1Ref} className="absolute inset-0 w-full h-full bg-[#F8F6F0] z-0 flex">
                <div
                  ref={track1InnerRef}
                  className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-6 lg:gap-8 xl:gap-10 min-[1440px]:gap-14 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24"
                >
                  <div className="w-[210px] lg:w-[230px] xl:w-[260px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] min-[1440px]:text-5xl 2xl:text-6xl font-serif text-[#0F1F15] font-bold tracking-tight leading-[1.12]">
                      {tAgri('title')}
                    </h2>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-4 lg:gap-5 xl:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(380px,58dvh,530px)]">
                    {agriCards.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.width} h-full shrink-0 bg-white p-5 lg:p-6 xl:p-7 min-[1440px]:p-8 rounded-2xl border border-stone-200/90 flex flex-col justify-center`}
                        style={{ boxShadow: '0 2px 8px rgba(15, 31, 21, 0.04)' }}
                      >
                        <p className="text-[#1C2B22] font-normal leading-[1.6] text-xs sm:text-[13.5px] lg:text-[14px] xl:text-[15px] min-[1440px]:text-[16.5px] 2xl:text-[17.5px]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Track 2: What We Believe Layer */}
              <div ref={track2Ref} className="absolute inset-0 w-full h-full bg-[#0F1F15] z-10 translate-x-full flex">
                <div
                  ref={track2InnerRef}
                  className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-6 lg:gap-8 xl:gap-10 min-[1440px]:gap-14 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24"
                >
                  <div className="w-[210px] lg:w-[230px] xl:w-[260px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] min-[1440px]:text-5xl font-serif text-white font-bold tracking-tight leading-[1.14]">
                      {t('what_we_believe')}
                    </h2>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-4 lg:gap-5 xl:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(390px,60dvh,550px)]">
                    {beliefs.map((belief, idx) => (
                      <div
                        key={idx}
                        className={`${belief.width} h-full shrink-0 bg-[#162B1E] border border-[#2A4735] p-5 lg:p-6 xl:p-7 min-[1440px]:p-8 rounded-2xl flex flex-col justify-center overflow-hidden`}
                      >
                        <div className="flex flex-col justify-center gap-2 xl:gap-2.5 h-full overflow-hidden">
                          <h3 className="text-sm sm:text-base lg:text-[17px] xl:text-lg min-[1440px]:text-xl font-serif text-white font-bold leading-snug">
                            {belief.title}
                          </h3>
                          <p className="text-[#D5E0D9] font-normal leading-[1.6] tracking-[0.01em] text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14.5px] min-[1440px]:text-[15.5px]">
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
            <section className="w-full py-16 lg:py-24 bg-[#0F1F15] relative overflow-hidden">
              <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  <div className="lg:w-1/3">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
                      {t('what_we_believe')}
                    </h2>
                  </div>

                  <div className="w-full lg:w-2/3 flex flex-col sm:grid sm:grid-cols-2 gap-4 md:gap-6">
                    {beliefs.map((belief, idx) => (
                      <div
                        key={idx}
                        className="bg-[#162B1E] border border-[#2A4735] p-6 sm:p-7 rounded-2xl flex flex-col justify-center"
                      >
                        <h3 className="text-xl font-serif text-white mb-2.5 font-bold">{belief.title}</h3>
                        <p className="text-[#D5E0D9] font-normal text-base leading-[1.65] tracking-[0.01em]">
                          {belief.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Client Logos */}
        <section className="w-full py-16 lg:py-24 bg-white border-t border-stone-200/80 relative z-20">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14 space-y-3">
              <h2 className="text-[#0F1F15] text-2xl sm:text-3xl lg:text-5xl font-serif font-bold tracking-tight">
                {t('trusted_leaders')}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] font-normal max-w-2xl mx-auto">
                {t('trusted_leaders_desc')}
              </p>
            </div>
            <ClientLogos />
          </div>
        </section>

        {/* Dynamic CMS Sections for Home */}
        <DynamicCustomSections page="home" locale={locale} />

        {/* Executive Advisory CTA Section */}
        <section className="relative w-full py-16 sm:py-20 lg:py-28 bg-[#0F1F15] text-white overflow-hidden z-20 border-t border-[#2A4735]">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
            <div className="flex flex-col items-center gap-5 lg:gap-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
                {t('cta_title')}
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-[#D5E0D9] font-normal leading-[1.65] tracking-[0.01em] max-w-2xl mx-auto">
                {t('cta_desc')}
              </p>

              <div className="flex flex-row flex-wrap gap-3.5 sm:gap-5 justify-center mt-2">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 bg-primary-green text-[#0F1F15] rounded-full font-bold text-sm sm:text-base transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#45c456] active:scale-[0.98]"
                >
                  <RollingText>{t('cta_btn_1')}</RollingText>
                </Link>
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 border border-[#3A5A46] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-[#162B1E] hover:border-[#527A61] transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
                >
                  <RollingText>{t('cta_btn_2')}</RollingText>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
