'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

export default function ContactPage() {
  const t = useTranslations('Contact')
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          honeypot,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', organization: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || t('error_alert'))
      }
    } catch (err) {
      console.error('Contact submission network error:', err)
      setStatus('error')
      setErrorMessage(t('error_alert'))
    }
  }

  const offices = [
    {
      region: t('region'),
      country: t('country'),
      address: t('address'),
      email: 'info@agri-experience.com',
      phone: '+254 (20) 2626888',
      mobile: '+254 (719) 554 154',
    },
  ]

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh]">
      {/* Masthead */}
      <section className="relative w-full pt-14 lg:pt-24 pb-10 lg:pb-14 bg-white border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16"
          >
            <div className="flex-1">
              <h1
                className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
              >
                {t('title')}
              </h1>
            </div>
            <div className="flex-1 relative">
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-stone-200" />
              <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] font-normal leading-[1.6] lg:pl-10">
                {t('subtitle')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Headquarters Details */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Form Column (7 columns on desktop) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200/90">
              <div className="pb-5 mb-7 border-b border-stone-100">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1F15]">
                  {t('form_title')}
                </h2>
              </div>

              {status === 'success' ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-[#F4F8F5] border border-[#1A4D2E]/20 text-center space-y-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#1A4D2E]/10 text-[#1A4D2E] flex items-center justify-center">
                    <CheckCircle size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-[#0F1F15]">
                      {t('success_title')}
                    </h3>
                    <p className="text-[#2A3830] leading-relaxed max-w-md mx-auto text-sm sm:text-base">
                      {t('success_desc')}
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 bg-[#0F1F15] text-white rounded-full text-sm font-semibold hover:bg-[#1A4D2E] transition-colors"
                    >
                      {t('send_another')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
                    aria-hidden="true"
                  />

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMessage || t('error_alert')}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-[#0F1F15] mb-2">
                      {t('name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FBFBF9] hover:border-stone-300 focus:border-[#1A4D2E] focus:bg-white focus:ring-2 focus:ring-[#1A4D2E]/15 focus:outline-none transition-colors duration-150 disabled:opacity-60 text-[#0F1F15] font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-[#0F1F15] mb-2">
                      {t('email')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FBFBF9] hover:border-stone-300 focus:border-[#1A4D2E] focus:bg-white focus:ring-2 focus:ring-[#1A4D2E]/15 focus:outline-none transition-colors duration-150 disabled:opacity-60 text-[#0F1F15] font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-org" className="block text-sm font-semibold text-[#0F1F15] mb-2">
                      {t('org')}
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FBFBF9] hover:border-stone-300 focus:border-[#1A4D2E] focus:bg-white focus:ring-2 focus:ring-[#1A4D2E]/15 focus:outline-none transition-colors duration-150 disabled:opacity-60 text-[#0F1F15] font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-[#0F1F15] mb-2">
                      {t('message')}
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'submitting'}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FBFBF9] hover:border-stone-300 focus:border-[#1A4D2E] focus:bg-white focus:ring-2 focus:ring-[#1A4D2E]/15 focus:outline-none transition-colors duration-150 resize-none disabled:opacity-60 text-[#0F1F15] font-medium"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group relative overflow-hidden w-full px-8 py-4 bg-[#0F1F15] hover:bg-[#1A4D2E] text-white rounded-full font-semibold flex items-center justify-center transition-[transform,background-color] duration-200 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <RollingText className="gap-2">
                      {status === 'submitting' ? (
                        <>
                          {t('sending')}
                          <Loader2 size={18} className="animate-spin ml-1" />
                        </>
                      ) : (
                        <>
                          {t('send')}
                          <Send size={18} />
                        </>
                      )}
                    </RollingText>
                  </button>
                </form>
              )}
            </div>

            {/* Headquarters Column — Flat structure (No nested card-in-card) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 space-y-6">
              <div className="pb-5 border-b border-stone-100">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1F15] mb-2">
                  {t('info_title')}
                </h2>
                <p className="text-[15px] text-[#2A3830] font-normal leading-[1.6]">
                  {t('info_desc')}
                </p>
              </div>

              {offices.map((office, idx) => (
                <div key={idx} className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#46584D] mb-0.5">
                      {office.region}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1F15]">
                      {office.country}
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-sm sm:text-[15px] pt-1">
                    <div className="flex gap-3.5 items-start">
                      <MapPin size={18} className="text-[#1A4D2E] flex-shrink-0 mt-1" />
                      <p className="text-[#2A3830] font-normal leading-relaxed whitespace-pre-line">{office.address}</p>
                    </div>
                    <div className="flex gap-3.5 items-center">
                      <Mail size={18} className="text-[#1A4D2E] flex-shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-[#0F1F15] hover:text-[#1A4D2E] font-medium transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex gap-3.5 items-center">
                      <Phone size={18} className="text-[#1A4D2E] flex-shrink-0" />
                      <a
                        href={`tel:${office.phone}`}
                        className="text-[#0F1F15] hover:text-[#1A4D2E] font-medium tabular-nums transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    {office.mobile && (
                      <div className="flex gap-3.5 items-center">
                        <Phone size={18} className="text-[#1A4D2E] flex-shrink-0" />
                        <a
                          href={`tel:${office.mobile}`}
                          className="text-[#0F1F15] hover:text-[#1A4D2E] font-medium tabular-nums transition-colors"
                        >
                          {office.mobile}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-stone-100">
                <div className="w-full h-60 rounded-xl overflow-hidden border border-stone-200/80">
                  <iframe
                    src="https://maps.google.com/maps?q=Watermark%20Business%20Park,%20Spring%20Court,%20Karen,%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Agri Experience Nairobi Headquarters Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
