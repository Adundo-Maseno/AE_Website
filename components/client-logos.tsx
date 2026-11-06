'use client'

import Image from 'next/image'

interface ClientLogo {
  name: string
  src: string
  alt: string
  href: string
  containerClassName?: string
  imageClassName?: string
}

const row1Logos: ClientLogo[] = [
  {
    name: 'Gates Foundation',
    src: '/Gates_Foundation_Logo.svg',
    alt: 'Gates Foundation',
    href: 'https://www.gatesfoundation.org/',
    containerClassName: 'w-48 sm:w-56 md:w-64 lg:w-72',
    imageClassName: 'scale-115',
  },
  {
    name: 'NARO Uganda',
    src: '/naro-logo.webp',
    alt: 'National Agricultural Research Organisation Uganda',
    href: 'https://naro.go.ug/',
    containerClassName: 'w-24 sm:w-28 md:w-32 lg:w-36',
  },
  {
    name: 'AGRA',
    src: '/AGRA.webp',
    alt: 'AGRA',
    href: 'https://agra.org/',
    containerClassName: 'w-36 sm:w-44 md:w-48 lg:w-54',
  },
  {
    name: 'KEPHIS',
    src: '/kephis-logo.webp',
    alt: 'KEPHIS',
    href: 'https://www.kephis.org/',
    containerClassName: 'w-36 sm:w-44 md:w-52 lg:w-60',
    imageClassName: 'scale-115',
  },
  {
    name: 'TARI',
    src: '/tari-logo.webp',
    alt: 'TARI',
    href: 'https://www.tari.go.tz/',
    containerClassName: 'w-20 sm:w-22 md:w-24 lg:w-26',
  },
  {
    name: 'CIMMYT',
    src: '/cimmyt-logo.svg',
    alt: 'CIMMYT',
    href: 'https://www.cimmyt.org/',
    containerClassName: 'w-56 sm:w-66 md:w-76 lg:w-84',
    imageClassName: 'scale-120',
  },
  {
    name: 'Catholic Relief Services',
    src: '/crs-logo.webp',
    alt: 'Catholic Relief Services',
    href: 'https://www.crs.org/where-we-work/africa/kenya',
    containerClassName: 'w-36 sm:w-44 md:w-50 lg:w-56',
  },
  {
    name: 'Ministry of Agriculture Tanzania',
    src: '/moa-tanzania-logo.webp',
    alt: 'Ministry of Agriculture Tanzania',
    href: 'https://www.kilimo.go.tz/',
    containerClassName: 'w-24 sm:w-28 md:w-32 lg:w-36',
  },
  {
    name: 'USAID',
    src: '/USAID-Identity.svg',
    alt: 'USAID',
    href: 'https://www.usaid.gov/',
    containerClassName: 'w-44 sm:w-52 md:w-58 lg:w-64',
  },
  {
    name: 'STAK',
    src: '/stak-logo.webp',
    alt: 'STAK',
    href: 'https://stak.or.ke/',
    containerClassName: 'w-26 sm:w-30 md:w-34 lg:w-38',
  },
  {
    name: 'AgDevCo',
    src: '/agdevco-logo.webp',
    alt: 'AgDevCo',
    href: 'https://www.agdevco.com/',
    containerClassName: 'w-44 sm:w-52 md:w-60 lg:w-68',
  },
]

const row2Logos: ClientLogo[] = [
  {
    name: 'Adam Smith International',
    src: '/adam-smith-international-logo.webp',
    alt: 'Adam Smith International',
    href: 'https://adamsmithinternational.com/',
    containerClassName: 'w-40 sm:w-48 md:w-54 lg:w-60',
  },
  {
    name: 'Ministry of Agriculture Kenya',
    src: '/moa-kenya-logo.webp',
    alt: 'Ministry of Agriculture and Livestock Development Kenya',
    href: 'https://kilimo.go.ke/',
    containerClassName: 'w-52 sm:w-62 md:w-72 lg:w-80',
    imageClassName: 'scale-120',
  },
  {
    name: 'NASC',
    src: '/nasc-logo.svg',
    alt: 'NASC',
    href: 'https://seedcouncil.gov.ng/',
    containerClassName: 'w-24 sm:w-28 md:w-32 lg:w-36',
    imageClassName: 'scale-115',
  },
  {
    name: 'IFDC',
    src: '/ifdc-logo.webp',
    alt: 'IFDC',
    href: 'https://ifdc.org/',
    containerClassName: 'w-44 sm:w-52 md:w-60 lg:w-68',
  },
  {
    name: 'elan',
    src: '/elan-logo.webp',
    alt: 'elan RDC',
    href: 'https://www.beamexchange.org/practice/programme-database/elan-rdc/',
    containerClassName: 'w-24 sm:w-28 md:w-32 lg:w-36',
  },
  {
    name: 'KALRO',
    src: '/kalro-logo.webp',
    alt: 'KALRO',
    href: 'https://www.kalro.org/',
    containerClassName: 'w-48 sm:w-56 md:w-66 lg:w-74',
    imageClassName: 'scale-120',
  },
  {
    name: 'Gatsby Africa',
    src: '/gatsby-logo.webp',
    alt: 'Gatsby Africa',
    href: 'https://www.gatsbyafrica.org.uk/',
    containerClassName: 'w-36 sm:w-44 md:w-50 lg:w-56',
  },
  {
    name: 'TOSCI',
    src: '/tosci-logo.webp',
    alt: 'TOSCI',
    href: 'https://www.tosci.go.tz/',
    containerClassName: 'w-48 sm:w-56 md:w-66 lg:w-74',
    imageClassName: 'scale-115',
  },
  {
    name: 'USTA',
    src: '/usta-logo.webp',
    alt: 'USTA',
    href: 'http://www.usta.ug/',
    containerClassName: 'w-26 sm:w-30 md:w-34 lg:w-38',
  },
  {
    name: 'TASTA',
    src: '/tasta-logo-v2.webp',
    alt: 'TASTA',
    href: 'https://tasta.or.tz/',
    containerClassName: 'w-44 sm:w-52 md:w-60 lg:w-68',
  },
  {
    name: 'NASTAG',
    src: '/nastag-logo.webp',
    alt: 'NASTAG',
    href: 'https://nastag.org/',
    containerClassName: 'w-38 sm:w-46 md:w-52 lg:w-58',
  },
]

const LogoItem = ({ logo, isDuplicate = false }: { logo: ClientLogo; isDuplicate?: boolean }) => (
  <a
    href={logo.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={logo.name}
    aria-hidden={isDuplicate || undefined}
    tabIndex={isDuplicate ? -1 : undefined}
    className={`group flex items-center justify-center shrink-0 mx-6 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-14 h-14 sm:h-18 md:h-22 lg:h-24 transition-transform duration-300 hover:-translate-y-1 ${
      logo.containerClassName || 'w-36 sm:w-44 md:w-52 lg:w-60'
    }`}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={logo.src}
        alt={isDuplicate ? '' : logo.alt}
        width={220}
        height={80}
        loading="lazy"
        unoptimized
        className={`max-h-full max-w-full object-contain object-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-300 mix-blend-multiply ${
          logo.imageClassName || ''
        }`}
      />
    </div>
  </a>
)

export default function ClientLogos() {
  const topRepeated = [...row1Logos, ...row1Logos]
  const bottomRepeated = [...row2Logos, ...row2Logos]

  return (
    <div className="relative w-full flex flex-col pt-4 pb-8 md:py-12 overflow-hidden">
      {/* Side gradient fade masks */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-36 bg-gradient-to-r from-mist to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-36 bg-gradient-to-l from-mist to-transparent z-10 pointer-events-none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation: none !important;
          }
        }
      `}} />

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
        {/* Top Row (Moves Left) */}
        <div className="flex w-full overflow-hidden marquee-container">
          <div className="flex items-center shrink-0 w-max animate-marquee-left py-2">
            {topRepeated.map((logo, index) => (
              <LogoItem key={`top-${logo.name}-${index}`} logo={logo} isDuplicate={index >= row1Logos.length} />
            ))}
          </div>
        </div>

        {/* Bottom Row (Moves Right) */}
        <div className="flex w-full overflow-hidden marquee-container">
          <div className="flex items-center shrink-0 w-max animate-marquee-right py-2">
            {bottomRepeated.map((logo, index) => (
              <LogoItem key={`bottom-${logo.name}-${index}`} logo={logo} isDuplicate={index >= row2Logos.length} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}