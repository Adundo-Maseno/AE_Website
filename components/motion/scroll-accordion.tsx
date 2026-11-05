'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { RollingText } from '@/components/ui/rolling-text'
import { useLocale } from 'next-intl'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollAccordion({ 
  title, 
  visionTitle, visionDesc, 
  missionTitle, missionDesc, 
  goalTitle, goalDesc 
}: any) {
  const [isFallback, setIsFallback] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const mqlMobile = window.matchMedia('(max-width: 768px)')
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const update = () => setIsFallback(mqlMobile.matches || mqlMotion.matches)
    update() // initial check
    
    mqlMobile.addEventListener('change', update)
    mqlMotion.addEventListener('change', update)
    return () => {
      mqlMobile.removeEventListener('change', update)
      mqlMotion.removeEventListener('change', update)
    }
  }, [])

  const items = [
    {
      id: 0,
      title: visionTitle,
      desc: visionDesc,
      image: '/our-vision-2026.jpg' // Our Vision
    },
    {
      id: 1,
      title: missionTitle,
      desc: missionDesc,
      image: '/our-mission-2026.jpg' // Our Mission
    },
    {
      id: 2,
      title: goalTitle,
      desc: goalDesc,
      image: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg', // people/partnership shot
      isGoal: true
    }
  ]

  if (!mounted) {
    return <></>
  }

  if (isFallback) {
    return <MobileFallbackAccordion title={title} items={items} />
  }

  return <DesktopStickyAccordion title={title} items={items} />
}

function DesktopStickyAccordion({ title, items }: { title: string, items: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<any>(null)
  const locale = useLocale()
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
          snapTo: "labels",
          duration: { min: 0.1, max: 0.3 },
          delay: 0.1,
          ease: "power3.out"
        },
        onUpdate: (self) => {
          if (!tlRef.current || !containerRef.current) return;
          const currentTl = tlRef.current;
          const t = currentTl.time();
          
          const t0 = currentTl.labels["item0"] || 0;
          const t1 = currentTl.labels["item1"] || 0;
          const t2 = currentTl.labels["item2"] || 0;
          
          let activeIdx = 0;
          if (t > t0 + 0.75 && t < t1 + 0.75) {
            activeIdx = 1;
          } else if (t >= t1 + 0.75) {
            activeIdx = 2;
          }
          
          if ((currentTl as any).lastActiveIdx !== activeIdx) {
            (currentTl as any).lastActiveIdx = activeIdx;
            
            // Trigger one-off roll animation for the new active item
            const newActiveEl = containerRef.current.querySelector(`.item-title-${activeIdx}`);
            if (newActiveEl) {
              // Clear any existing reset timeout
              if ((newActiveEl as any)._rollTimeout) {
                clearTimeout((newActiveEl as any)._rollTimeout);
              }
              
              // Trigger the roll up animation
              newActiveEl.setAttribute('data-active', 'true');
              
              // Secretly teleport back to 0% after the animation finishes
              (newActiveEl as any)._rollTimeout = setTimeout(() => {
                const spans = newActiveEl.querySelectorAll('.inline-flex > span');
                // Disable transitions safely without destroying inline delays
                spans.forEach(span => {
                  (span as HTMLElement).style.transitionProperty = 'none';
                });
                
                // Remove the active class to snap back to 0%
                newActiveEl.removeAttribute('data-active');
                
                // Force a browser reflow so the instant snap is processed
                void (newActiveEl as HTMLElement).clientTop;
                
                // Restore the CSS transitions
                spans.forEach(span => {
                  (span as HTMLElement).style.transitionProperty = '';
                });
              }, 800);
            }
          }
        }
      }
    });

    tlRef.current = tl;

    // We add symmetric "dead zones" (0.5s total gap) between transitions.
    // This requires the user to intentionally scroll a bit before the next item starts opening.
    tl.addLabel("item0", 0)
      .to('.item-content-0', { height: "0vh", duration: 1 }, "item0+=0.25")
      .to('.item-image-0', { opacity: 0, duration: 0.5 }, "item0+=0.25")
      .to('.item-title-0', { color: "rgba(26,77,46,0.5)", duration: 1 }, "item0+=0.25")
      .to('.dot-0', { backgroundColor: "rgba(28,43,34,0.2)", duration: 1 }, "item0+=0.25")
      
      .to('.item-content-1', { height: "50vh", duration: 1 }, "item0+=0.25")
      .to('.item-image-1', { opacity: 1, duration: 0.5 }, "item0+=0.25")
      .to('.item-title-1', { color: "#3ab44a", duration: 1 }, "item0+=0.25")
      .to('.dot-1', { backgroundColor: "#3ab44a", duration: 1 }, "item0+=0.25")
      
      // Label in the exact middle of the dead zone
      .add("item1", "item0+=1.5")
      
      .to('.item-content-1', { height: "0vh", duration: 1 }, "item1+=0.25")
      .to('.item-image-1', { opacity: 0, duration: 0.5 }, "item1+=0.25")
      .to('.item-title-1', { color: "rgba(26,77,46,0.5)", duration: 1 }, "item1+=0.25")
      .to('.dot-1', { backgroundColor: "rgba(28,43,34,0.2)", duration: 1 }, "item1+=0.25")
      
      .to('.item-content-2', { height: "50vh", duration: 1 }, "item1+=0.25")
      .to('.item-image-2', { opacity: 1, duration: 0.5 }, "item1+=0.25")
      .to('.item-title-2', { color: "#3ab44a", duration: 1 }, "item1+=0.25")
      .to('.dot-2', { backgroundColor: "#3ab44a", duration: 1 }, "item1+=0.25")
      
      // Final label in the middle of a trailing dead zone
      .add("item2", "item1+=1.5")
      
      // Trailing padding to ensure the final item has a resting zone before unpinning
      .to({}, { duration: 0.25 });
  }, { scope: containerRef });

  const scrollToItem = (index: number) => {
    if (!tlRef.current || !tlRef.current.scrollTrigger) return;
    const tl = tlRef.current;
    const st = tl.scrollTrigger;
    const labelTime = tl.labels[`item${index}`];
    
    if (typeof labelTime === 'number') {
      // Calculate exact scroll position based on timeline progress
      const progress = labelTime / tl.duration();
      const scrollPos = st.start + (st.end - st.start) * progress;
      
      // Scroll to that position smoothly
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <a href="#after-accordion" className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 bg-white p-2">
        Skip this section
      </a>
      <section ref={containerRef} className="w-full relative h-[300vh] bg-mist">
        <div className="sticky top-(--header-height) h-[calc(100dvh-var(--header-height))] w-full overflow-hidden flex flex-col justify-center">
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            {items.map((item, i) => (
              <div 
                key={item.id} 
                onClick={() => scrollToItem(i)}
                className={`dot-${i} w-1.5 h-8 rounded-full cursor-pointer hover:opacity-70 transition-opacity`}
                style={{ backgroundColor: i === 0 ? "#3ab44a" : "rgba(28,43,34,0.2)" }}
              />
            ))}
          </div>

          <div className="max-w-350 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 flex flex-col h-full py-5 lg:py-7 justify-center">

            <div className="w-full flex flex-col">
              {items.map((item, i) => {
                return (
                <div 
                  key={item.id} 
                  className={cn(
                    "border-t border-deep-forest/20 flex flex-col relative"
                  )}
                >
                  <h2 
                    onClick={() => scrollToItem(i)}
                    className={`item-title-${i} group font-serif py-3 lg:py-3.5 cursor-pointer hover:opacity-80 transition-opacity z-20 relative w-full lg:w-2/5`}
                    style={{ 
                      color: i === 0 ? "#3ab44a" : "rgba(26,77,46,0.5)",
                      fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)'
                    }}
                  >
                    <RollingText>{item.title}</RollingText>
                  </h2>
                  
                  <div 
                    className={`item-content-${i} w-full overflow-hidden`}
                    style={{ height: i === 0 ? "50vh" : "0vh" }}
                  >
                    <div className="w-full lg:w-2/5 flex flex-col justify-start pt-2 pb-4 pr-4 lg:pr-8 text-sm lg:text-base xl:text-lg text-charcoal/80 leading-snug lg:leading-normal font-normal overflow-hidden h-full">
                      <p>{item.desc}</p>
                      
                      {item.isGoal && (
                        <div className="mt-3 lg:mt-6">
                          <div className="grid grid-cols-3 gap-1.5 lg:gap-3 w-4/5 lg:w-3/4 mx-auto">
                            {[1, 2, 3, 5, 8, 13].map((num) => (
                              <div key={num} className="w-full aspect-square relative">
                                <Image
                                  src={locale === 'fr' ? `/SDG-images/fr/${num}.webp` : `/SDGs/SDG-${num}.svg`}
                                  alt={`SDG ${num}`}
                                  fill
                                  sizes="(max-width: 768px) 33vw, 20vw"
                                  className="object-contain shadow-md bg-white"
                                  unoptimized={locale === 'fr'}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Full-Height Image spanning from below separator line to bottom of content */}
                  <div 
                    className={`item-image-${i} absolute top-3 lg:top-4.5 bottom-2 right-0 w-3/5 overflow-hidden pointer-events-none shadow-sm`}
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      sizes="60vw"
                      className="object-cover object-center" 
                      priority={i === 0}
                    />
                  </div>
                </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>
      <div id="after-accordion"></div>
    </>
  )
}

function MobileFallbackAccordion({ title, items }: { title: string, items: any[] }) {
  const [openItem, setOpenItem] = useState<number | null>(0)
  const locale = useLocale()

  return (
    <section className="w-full relative py-20 bg-mist">
      <div className="max-w-350 w-full mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col">
          {items.map((item) => {
            const isActive = openItem === item.id;
            return (
              <div 
                key={item.id}
                className={cn(
                  "overflow-hidden border-t border-deep-forest/20",
                  item.id === items.length - 1 ? "border-b" : ""
                )}
              >
                <button
                  onClick={() => setOpenItem(isActive ? null : item.id)}
                  className="w-full flex items-center justify-between py-6 transition-colors group text-left"
                  aria-expanded={isActive}
                >
                  <h3 
                    className={cn(
                      "text-3xl sm:text-4xl font-serif transition-colors duration-300", 
                      isActive ? "text-primary-green" : "text-deep-forest/50 group-hover:text-deep-forest/80"
                    )}
                    data-active={isActive}
                  >
                    <RollingText>{item.title}</RollingText>
                  </h3>
                  <ChevronDown className={cn(
                    "transition-transform duration-300", 
                    isActive ? "rotate-180 text-primary-green" : "text-deep-forest/50"
                  )} size={28} />
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 flex flex-col gap-8">
                        
                        <div className="relative w-full h-72 sm:h-80 overflow-hidden shadow-md">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill
                            sizes="100vw"
                            className="object-cover" 
                          />
                        </div>

                        <div className="text-lg text-charcoal/80 leading-relaxed font-light" aria-live="polite">
                          <p>{item.desc}</p>
                          
                          {item.isGoal && (
                            <div className="mt-8 pt-6 border-t border-mist">
                              <p className="text-sm font-semibold uppercase tracking-widest text-deep-forest/60 mb-4">
                                Sustainable Development Goals
                              </p>
                              <div className="grid grid-cols-3 gap-3 w-full">
                                {[1, 2, 3, 5, 8, 13].map((num) => (
                                  <div key={num} className="w-full aspect-square relative">
                                    <Image
                                      src={locale === 'fr' ? `/SDG-images/fr/${num}.webp` : `/SDGs/SDG-${num}.svg`}
                                      alt={`SDG ${num}`}
                                      fill
                                      sizes="33vw"
                                      className="object-contain shadow-sm bg-white"
                                      unoptimized={locale === 'fr'}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
