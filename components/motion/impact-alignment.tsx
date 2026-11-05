"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Target } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// ────────────────────────────────────────────
// Data
// ────────────────────────────────────────────

interface ImpactCard {
  id: string;
  shortTitle: string;
  title: string;
  aspect: string;
  examples: string;
  image?: string;
  color?: string;
  bgImage?: string;
}

const sdgData: ImpactCard[] = [
  { id: "sdg-1", shortTitle: "sdgs.1.shortTitle", title: "sdgs.1.title", aspect: "sdgs.1.aspect", examples: "sdgs.1.examples", image: "/SDGs/SDG-1.svg", color: "#E5243B", bgImage: "/SDG-images/1.webp" },
  { id: "sdg-2", shortTitle: "sdgs.2.shortTitle", title: "sdgs.2.title", aspect: "sdgs.2.aspect", examples: "sdgs.2.examples", image: "/SDGs/SDG-2.svg", color: "#DDA63A", bgImage: "/SDG-images/2.webp" },
  { id: "sdg-3", shortTitle: "sdgs.3.shortTitle", title: "sdgs.3.title", aspect: "sdgs.3.aspect", examples: "sdgs.3.examples", image: "/SDGs/SDG-3.svg", color: "#4C9F38", bgImage: "/SDG-images/3.webp" },
  { id: "sdg-4", shortTitle: "Education", title: "SDG 4: Quality Education", aspect: "Expanded practical learning and technical skills in the seed sector.", examples: "Training for seed companies, agrodealers, extension officers, seed outgrowers, CBOs, and association leaders.", image: "/SDGs/SDG-4.svg", color: "#C5192D", bgImage: "/SDG-images/4.webp" },
  { id: "sdg-5", shortTitle: "sdgs.5.shortTitle", title: "sdgs.5.title", aspect: "sdgs.5.aspect", examples: "sdgs.5.examples", image: "/SDGs/SDG-5.svg", color: "#FF3A21", bgImage: "/SDG-images/5.webp" },
  { id: "sdg-6", shortTitle: "Clean Water", title: "SDG 6: Clean Water and Sanitation", aspect: "Indirect contribution through promotion of better agronomic practices and climate-smart production.", examples: "Farmer demonstrations and extension training promote efficient crop management and responsible input use.", image: "/SDGs/SDG-6.svg", color: "#26BDE2", bgImage: "/SDG-images/6.webp" },
  { id: "sdg-7", shortTitle: "Clean Energy", title: "SDG 7: Affordable and Clean Energy", aspect: "Limited direct contribution; indirect support through digital platforms that reduce travel and paper-based processes.", examples: "Use of online platforms and digital information systems to improve access to agricultural information.", image: "/SDGs/SDG-7.svg", color: "#FCC30B", bgImage: "/SDG-images/7.webp" },
  { id: "sdg-8", shortTitle: "sdgs.8.shortTitle", title: "sdgs.8.title", aspect: "sdgs.8.aspect", examples: "sdgs.8.examples", image: "/SDGs/SDG-8.svg", color: "#A21942", bgImage: "/SDG-images/8.webp" },
  { id: "sdg-9", shortTitle: "Innovation", title: "SDG 9: Industry, Innovation and Infrastructure", aspect: "Advanced innovation in seed systems through digital tools, traceability and information infrastructure.", examples: "Seed Sector Platform Kenya, MbeguChoice, scratch-off labels, and digital farmer feedback tools such as Mulika Mbegu Mbovu.", image: "/SDGs/SDG-9.svg", color: "#FD6925", bgImage: "/SDG-images/9.webp" },
  { id: "sdg-10", shortTitle: "Reduced Inequality", title: "SDG 10: Reduced Inequalities", aspect: "Improved access to seed information and quality seed for smallholder farmers and underserved counties.", examples: "Support for decentralized seed production in Kitui and Tharaka Nithi and county-based agrodealer-led farmer outreach.", image: "/SDGs/SDG-10.svg", color: "#DD1367", bgImage: "/SDG-images/10.webp" },
  { id: "sdg-11", shortTitle: "Communities", title: "SDG 11: Sustainable Cities and Communities", aspect: "Strengthened county-level institutions and local agricultural services.", examples: "County agrodealer associations, county extension officer training, farmer field days and local advocacy platforms.", image: "/SDGs/SDG-11.svg", color: "#FD9D24", bgImage: "/SDG-images/11.webp" },
  { id: "sdg-12", shortTitle: "Responsible Production", title: "SDG 12: Responsible Consumption and Production", aspect: "Promoted responsible seed production, quality assurance, traceability and market transparency.", examples: "Standard certified seed production, record keeping, packaging, traceability systems, and anti-counterfeit seed awareness.", image: "/SDGs/SDG-12.svg", color: "#BF8B2E", bgImage: "/SDG-images/12.webp" },
  { id: "sdg-13", shortTitle: "sdgs.13.shortTitle", title: "sdgs.13.title", aspect: "sdgs.13.aspect", examples: "sdgs.13.examples", image: "/SDGs/SDG-13.svg", color: "#3F7E44", bgImage: "/SDG-images/13.webp" },
  { id: "sdg-14", shortTitle: "Life Below Water", title: "SDG 14: Life Below Water", aspect: "Limited direct contribution; indirect support through responsible input use and sustainable production practices.", examples: "Training on good agronomic practices and responsible input management can reduce environmental pressure from agricultural runoff.", image: "/SDGs/SDG-14.svg", color: "#0A97D9", bgImage: "/SDG-images/14.webp" },
  { id: "sdg-15", shortTitle: "Life on Land", title: "SDG 15: Life on Land", aspect: "Supported sustainable land use, crop diversity and production systems.", examples: "Promotion of diverse crop seed classes, localized seed production, and farmer training on good agronomic practices.", image: "/SDGs/SDG-15.svg", color: "#56C02B", bgImage: "/SDG-images/15.webp" },
  { id: "sdg-16", shortTitle: "Strong Institutions", title: "SDG 16: Peace, Justice and Strong Institutions", aspect: "Strengthened transparent, accountable and inclusive seed-sector institutions.", examples: "Support to MoA, KEPHIS, STAK, policy reform, private inspector authorization, seed regulations and stakeholder dialogue.", image: "/SDGs/SDG-16.svg", color: "#00689D", bgImage: "/SDG-images/16.webp" },
  { id: "sdg-17", shortTitle: "sdgs.17.shortTitle", title: "sdgs.17.title", aspect: "sdgs.17.aspect", examples: "sdgs.17.examples", image: "/SDGs/SDG-17.svg", color: "#19486A", bgImage: "/SDG-images/17.webp" },
];

const relevantSdgs = ["sdg-1", "sdg-2", "sdg-3", "sdg-5", "sdg-8", "sdg-13", "sdg-17"];
const displaySdgs = sdgData.filter(sdg => relevantSdgs.includes(sdg.id));




// ────────────────────────────────────────────
// Accordion Slice
// ────────────────────────────────────────────

function AccordionSlice({
  card,
  isActive,
  onHover,
  onClick,
  t,
  locale,
}: {
  card: ImpactCard;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
  t: any;
  locale: string;
}) {
  const num = card.id.replace('sdg-', '');
  const bgImageUrl = card.bgImage ? card.bgImage.replace('/SDG-images/', '/SDG-images/en/') : null;
  const logoUrl = locale === 'fr' ? `/SDG-images/fr/${num}.webp` : card.image;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onMouseEnter={onHover}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-[flex-grow,height,transform,opacity] duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 ${isActive
          ? 'h-[300px] lg:h-auto lg:flex-[6_0_0%]'
          : 'h-[72px] lg:h-auto lg:flex-[1_1_0%]'
        }`}
    >
      {/* ─── Background image placeholder ─── */}
      <div className="absolute inset-0 bg-mist overflow-hidden">
        {bgImageUrl ? (
          <div className="absolute inset-0">
            <Image
              src={bgImageUrl}
              alt={t(card.shortTitle)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${card.color || "#1A4D2E"} 0%, transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* ─── Mobile collapsed: title bar ─── */}
      <div className={`lg:hidden relative z-30 flex items-center gap-3 px-4 h-[72px] transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div
          className="w-14 h-14 rounded-none flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: card.color || "#1A4D2E" }}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={t(card.title)}
              width={56}
              height={56}
              className="w-full h-full object-contain"
              unoptimized={locale === 'fr'}
            />
          ) : (
            <Target className="text-white w-6 h-6" />
          )}
        </div>
        <span className="text-white font-semibold text-sm drop-shadow-md">{t(card.shortTitle)}</span>
      </div>

      {/* ─── SDG/Vision Logo: Dynamic Bookmark (desktop) ─── */}
      <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
        <motion.div
          layout
          initial={false}
          className={`absolute overflow-hidden flex items-center justify-center ${isActive
              ? "top-0 left-5 lg:left-8 w-24 h-40 lg:w-32 lg:h-48 rounded-b-2xl items-end pb-4 lg:pb-6"
              : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square rounded-none pb-0"
            }`}
          style={{
            backgroundColor: isActive ? card.color || "#1A4D2E" : "transparent"
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div layout="position" className="w-full flex items-center justify-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={t(card.title)}
                width={120}
                height={120}
                className="w-full h-auto object-contain"
                unoptimized={locale === 'fr'}
              />
            ) : (
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{ backgroundColor: card.color || "#1A4D2E" }}
              >
                <Target className="text-white w-1/2 h-1/2" />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Expanded: text content ─── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* Black tint with transparency for text readability instead of gradient */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content vertically centered on mobile, pinned to bottom on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 flex flex-col justify-center p-4 sm:p-5 lg:inset-auto lg:bottom-0 lg:left-0 lg:right-0 lg:block lg:p-7"
            >
              {/* Mobile: show SDG bookmark inline */}
              <div className="flex items-center gap-3 mb-3 lg:hidden">
                <div
                  className="w-16 h-16 rounded-none flex items-center justify-center shrink-0 overflow-hidden shadow-lg"
                  style={{ backgroundColor: card.color || "#1A4D2E" }}
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={t(card.title)}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                      unoptimized={locale === 'fr'}
                    />
                  )}
                </div>
                <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">{t(card.shortTitle)}</span>
              </div>
              <p className="text-[13px] sm:text-[15px] text-white leading-relaxed font-semibold line-clamp-3 sm:line-clamp-2 mb-2 sm:mb-3 drop-shadow-md text-pretty">
                {t(card.aspect)}
              </p>
              <p className="text-[12px] sm:text-[14px] text-white/80 leading-relaxed font-medium line-clamp-3 sm:line-clamp-2 drop-shadow-md text-pretty">
                {t(card.examples)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────
// Single Accordion Row
// ────────────────────────────────────────────

function AccordionRow({
  items,
  activeId,
  setActiveId,
  defaultId,
  t,
  locale,
}: {
  items: ImpactCard[];
  activeId: string;
  setActiveId: (id: string) => void;
  defaultId: string;
  t: any;
  locale: string;
}) {
  return (
    <div
      className="flex flex-col lg:flex-row w-full lg:h-[520px] gap-2 lg:gap-1.5"
      onMouseLeave={() => setActiveId(defaultId)}
    >
      {items.map((card) => (
        <AccordionSlice
          key={card.id}
          card={card}
          isActive={activeId === card.id}
          onHover={() => setActiveId(card.id)}
          onClick={() => setActiveId(activeId === card.id ? defaultId : card.id)}
          t={t}
          locale={locale}
        />
      ))}
    </div>
  );
}

// ────────────────────────────────────────────
// Main Export
// ────────────────────────────────────────────

export default function ImpactAlignment() {
  const [activeSdg, setActiveSdg] = useState("");
  const t = useTranslations("OurImpact");
  const locale = useLocale();

  return (
    <section className="w-full py-16 lg:py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #1A4D2E 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold uppercase tracking-widest text-primary-green mb-3"
          >
            {t("sdgs.header_tag")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold text-deep-forest mb-4 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 2rem + 1vw, 3rem)' }}
          >
            {t("sdgs.header_title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-charcoal/85 font-normal max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            {t("sdgs.header_desc")}
          </motion.p>
        </div>

        {/* ─── SDG: 1 row (7 selected) ─── */}
        <div className="w-full mt-0 space-y-1.5">
          <AccordionRow
            items={displaySdgs}
            activeId={activeSdg}
            setActiveId={setActiveSdg}
            defaultId={""}
            t={t}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
