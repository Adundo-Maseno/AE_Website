'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const linkStyle: React.CSSProperties = { color: '#999', fontSize: '13px', textDecoration: 'none', fontWeight: 300 }
const linkHoverClass = 'footer-nav-link'

export default function Footer() {
  const t = useTranslations('Footer')
  const [year, setYear] = useState(2026)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setYear(new Date().getFullYear())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <div className="relative w-full">
      <style>{`
        .footer-nav-link { color: #999; font-size: 13px; text-decoration: none; font-weight: 300; transition: color 0.15s ease; }
        .footer-nav-link:hover { color: #ffffff; }
      `}</style>

      {/* ─── Desktop ─── */}
      <div className="hidden md:block">

        <div className="relative w-full overflow-hidden" style={{ height: '70vh' }}>
          <Image
            src="/agri-footer-landscape.jpg"
            alt="Agricultural landscape"
            fill
            sizes="100vw"
            quality={75}
            className="object-cover object-center"
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #0d0d0d, transparent)' }} />
        </div>

        {/* Footer body */}
        <footer style={{ background: '#0d0d0d', color: '#e8e8e8', position: 'relative' }}>

          {/* Main content grid — matches reference: left | col1 | col2 | col3 | right */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(2rem, 1.5rem + 2vw, 3.5rem) clamp(1.5rem, 1rem + 2vw, 4rem) 0',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 300px) repeat(3, minmax(0, 1fr)) minmax(180px, 260px)',
              gap: 'clamp(1.5rem, 1rem + 2vw, 3rem)',
            }}>

              {/* ── LEFT: Newsletter ── */}
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '15px', marginBottom: '10px', fontFamily: 'inherit' }}>
                  {t('newsletter_title')}
                </p>
                <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', fontWeight: 300 }}>
                  {t('newsletter_desc')}
                </p>

                {/* Email row */}
                {submitted ? (
                  <p style={{ color: '#3ab44a', fontSize: '13px', marginBottom: '12px' }}>{t('subscribed')}</p>
                ) : !mounted ? (
                  <div style={{ height: '42px', marginBottom: '12px', border: '1px solid #333', borderRadius: '8px', padding: '10px 14px' }}>
                    <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: '1px solid #333', borderRadius: '8px',
                      padding: '10px 14px', background: 'transparent',
                    }}>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={t('email_placeholder')}
                        required
                        style={{
                          background: 'transparent', border: 'none', outline: 'none',
                          color: '#e8e8e8', fontSize: '13px', flex: 1,
                          fontFamily: 'inherit',
                        }}
                      />
                      <button type="submit" aria-label={t('aria_subscribe')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '12px', margin: '-12px', minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}


                {/* Social */}
                <div style={{ marginTop: '24px', display: 'flex' }}>
                  <Link href="https://www.linkedin.com/company/agri-experience-ltd/" target="_blank" rel="noopener noreferrer"
                    aria-label={t('aria_linkedin')}
                    style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#1a1a1a', textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    className="hover:bg-[#252525]"
                  >
                    <span className="sr-only">{t('linkedin')}</span>
                    {/* Filled "in" lettermark only */}
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                      <path d="M4.94 2.07A2.07 2.07 0 112.87 4.14 2.07 2.07 0 014.94 2.07zM2.07 6.75h3.56v11.45H2.07V6.75zm5.3 0h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H7.37V6.75z" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* ── COL 1: Our Work ── */}
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{t('our_work')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {[
                    { key: 'digital_platforms', href: '/our-work/digital-platforms' },
                    { key: 'technical_studies', href: '/our-work/technical-studies' },
                    { key: 'project_implementation', href: '/our-work/project-implementation' },
                    { key: 'client_advisory', href: '/our-work/client-advisory' },
                    { key: 'capacity_building', href: '/our-work/capacity-building' },
                    { key: 'stakeholder_convenings', href: '/our-work/stakeholder-convenings' },
                  ].map(item => (
                    <li key={item.key}>
                      <Link href={item.href} className={linkHoverClass}>{t(item.key as any)}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── COL 2: Company ── */}
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{t('company')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {[
                    { key: 'about_us', href: '/about' },
                    { key: 'our_impact', href: '/our-impact' },
                    { key: 'contact', href: '/contact' },
                  ].map(link => (
                    <li key={link.key}>
                      <Link href={link.href} className={linkHoverClass}>{t(link.key as any)}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── COL 3: Resources ── */}
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{t('resources')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {[
                    { key: 'resources', href: '/resources' },
                    { key: 'insights', href: '/insights' },
                    { key: 'newsletter', href: '/newsletter' },
                    { key: 'privacy', href: '/privacy' },
                  ].map(link => (
                    <li key={link.key}>
                      <Link href={link.href} className={linkHoverClass}>{t(link.key as any)}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── RIGHT: Contact + Social ── */}
              <div>
                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{t('work_with_us')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '24px' }}>
                  <li>
                    <Link href="/contact" className={linkHoverClass}>{t('request_concept')}</Link>
                  </li>
                  <li>
                    <Link href="/our-work" className={linkHoverClass}>{t('view_projects')}</Link>
                  </li>
                </ul>

                <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>{t('get_in_touch')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '24px' }}>
                  <li>
                    <a href="mailto:info@agri-experience.com" className={linkHoverClass}>info@agri-experience.com</a>
                  </li>
                  <li>
                    <a href="tel:+254202626888" className={linkHoverClass}>+254 (20) 2626888</a>
                  </li>
                  <li>
                    <a href="https://maps.google.com/?q=Watermark+Business+Park+Spring+Court,+Karen,+Nairobi,+Kenya" target="_blank" rel="noopener noreferrer" className={linkHoverClass}>
                      Watermark Business Park<br />Spring Court, Karen<br />P.O. Box 1720 - 00606, Nairobi
                    </a>
                  </li>
                </ul>

              </div>

            </div>
          </div>

          {/* Logo pinned to bottom-left — compact */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 1rem + 1vw, 2rem) clamp(1.5rem, 1rem + 2vw, 4rem)',
          }}>
            <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Link href="/" aria-label="Agri Experience" style={{ display: 'inline-flex' }}>
                <div
                  className="h-18 w-37.5 bg-[#888] transition-colors hover:bg-white"
                  style={{
                    WebkitMaskImage: 'url(/Newsletters.svg)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'left center',
                    maskImage: 'url(/Newsletters.svg)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'left center',
                  }}
                />
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <p style={{ color: '#888', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                  © {year} Agri Experience Ltd.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ─── Mobile ─── */}
      <footer className="md:hidden" style={{ background: '#0d0d0d', color: '#e8e8e8', padding: '48px 20px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Newsletter */}
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{t('newsletter_title')}</p>
            <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
              {t('newsletter_desc_mobile')}
            </p>
            {submitted ? (
              <p style={{ color: '#3ab44a', fontSize: '13px' }}>{t('subscribed')}</p>
            ) : !mounted ? (
              <div style={{ height: '42px', border: '1px solid #333', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: '1px solid #333', borderRadius: '8px', padding: '10px 14px',
                }}>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={t('email_placeholder')} required
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e8e8e8', fontSize: '13px', flex: 1, fontFamily: 'inherit' }}
                  />
                  <button type="submit" aria-label={t('aria_subscribe')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', margin: '-12px', minWidth: '48px', minHeight: '48px' }}>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* Social */}
            <div style={{ marginTop: '24px', display: 'flex' }}>
              <Link href="https://www.linkedin.com/company/agri-experience-ltd/" target="_blank" rel="noopener noreferrer"
                aria-label={t('aria_linkedin')}
                style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#1a1a1a', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                className="hover:bg-[#252525]"
              >
                <span className="sr-only">{t('linkedin')}</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                  <path d="M4.94 2.07A2.07 2.07 0 112.87 4.14 2.07 2.07 0 014.94 2.07zM2.07 6.75h3.56v11.45H2.07V6.75zm5.3 0h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H7.37V6.75z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 16px' }}>
            {[
              {
                titleKey: 'our_work',
                links: [
                  { key: 'digital_platforms', href: '/our-work/digital-platforms' },
                  { key: 'technical_studies', href: '/our-work/technical-studies' },
                  { key: 'project_implementation', href: '/our-work/project-implementation' },
                  { key: 'client_advisory', href: '/our-work/client-advisory' },
                  { key: 'capacity_building', href: '/our-work/capacity-building' },
                  { key: 'stakeholder_convenings', href: '/our-work/stakeholder-convenings' },
                ],
              },
              {
                titleKey: 'company',
                links: [
                  { key: 'about_us', href: '/about' },
                  { key: 'our_impact', href: '/our-impact' },
                  { key: 'contact', href: '/contact' },
                ],
              },
              {
                titleKey: 'resources',
                links: [
                  { key: 'resources', href: '/resources' },
                  { key: 'insights', href: '/insights' },
                  { key: 'newsletter', href: '/newsletter' },
                  { key: 'privacy', href: '/privacy' },
                ],
              },
              {
                titleKey: 'work_with_us',
                links: [
                  { key: 'request_concept', href: '/contact' },
                  { key: 'view_projects', href: '/our-work' },
                ],
              },
            ].map(col => (
              <div key={col.titleKey}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>{t(col.titleKey as any)}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <li key={l.key}>
                      <Link href={l.href} className={linkHoverClass}>{t(l.key as any)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>{t('get_in_touch')}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li>
                <a href="mailto:info@agri-experience.com" className={linkHoverClass} style={{ display: 'block', padding: '4px 0' }}>info@agri-experience.com</a>
              </li>
              <li>
                <a href="tel:+254202626888" className={linkHoverClass} style={{ display: 'block', padding: '4px 0' }}>+254 (20) 2626888</a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Watermark+Business+Park+Spring+Court,+Karen,+Nairobi,+Kenya" target="_blank" rel="noopener noreferrer" className={linkHoverClass} style={{ display: 'block', padding: '4px 0', lineHeight: 1.5 }}>
                  Watermark Business Park<br />Spring Court, Karen<br />P.O. Box 1720 - 00606, Nairobi
                </a>
              </li>
            </ul>
          </div>

          {/* Logo + copyright */}
          <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '24px' }}>
            <Link href="/" aria-label="Agri Experience" style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <div
                className="h-14 w-29 bg-[#888] transition-colors hover:bg-white"
                style={{
                  WebkitMaskImage: 'url(/Newsletters.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/Newsletters.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                }}
              />
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#888', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                © {year} Agri Experience Ltd.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}