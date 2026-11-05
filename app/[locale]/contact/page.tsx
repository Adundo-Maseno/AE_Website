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
    <>
      <main className="bg-[#F8F6F0] min-h-[100dvh]">
        {/* Editorial Consultancy Masthead */}
        <section className="relative w-full pt-14 lg:pt-24 pb-10 lg:pb-14 overflow-hidden bg-white border-b border-stone-200/80">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/[0.04] rounded-full blur-[110px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16">
              <div className="flex-1 space-y-4">
                <span className="editorial-eyebrow">Executive Advisory Inquiries</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.1]"
                  style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
                >
                  {t('title')}
                </motion.h1>
              </div>
              <div className="flex-1 relative">
                <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-[1.5px] bg-[#1A4D2E]/20" />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base sm:text-lg lg:text-xl text-charcoal/85 font-normal leading-relaxed lg:pl-10"
                >
                  {t('subtitle')}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Headquarters Dossier */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Form Card (7 columns on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-xs"
              >
                <div className="pb-5 mb-7 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/70 block mb-1">
                      Direct Consultation // 01
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1F15]">
                      {t('form_title')}
                    </h2>
                  </div>
                </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="p-8 sm:p-10 rounded-3xl bg-primary-green/5 border border-primary-green/20 text-center space-y-5"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-green/10 text-primary-green flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-deep-forest">
                      {t('success_title')}
                    </h3>
                    <p className="text-charcoal/80 leading-relaxed max-w-md mx-auto text-sm sm:text-base">
                      {t('success_desc')}
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 bg-deep-forest text-white rounded-full text-sm font-bold hover:bg-deep-forest/90 transition-colors shadow-sm"
                    >
                      {t('send_another')}
                    </button>
                  </div>
                </motion.div>
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
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMessage || t('error_alert')}</span>
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-bold text-deep-forest mb-2">
                      {t('name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 hover:border-stone-300 focus:border-primary-green focus:bg-white focus:ring-3 focus:ring-primary-green/15 focus:outline-none transition-all duration-150 disabled:opacity-60 text-charcoal font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-bold text-deep-forest mb-2">
                      {t('email')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 hover:border-stone-300 focus:border-primary-green focus:bg-white focus:ring-3 focus:ring-primary-green/15 focus:outline-none transition-all duration-150 disabled:opacity-60 text-charcoal font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-org" className="block text-sm font-bold text-deep-forest mb-2">
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
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 hover:border-stone-300 focus:border-primary-green focus:bg-white focus:ring-3 focus:ring-primary-green/15 focus:outline-none transition-all duration-150 disabled:opacity-60 text-charcoal font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-bold text-deep-forest mb-2">
                      {t('message')}
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'submitting'}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 hover:border-stone-300 focus:border-primary-green focus:bg-white focus:ring-3 focus:ring-primary-green/15 focus:outline-none transition-all duration-150 resize-none disabled:opacity-60 text-charcoal font-medium"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group relative overflow-hidden w-full px-8 py-4 bg-deep-forest text-white rounded-full font-bold flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
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
                  </motion.button>
                </form>
              )}
            </motion.div>

              {/* Contact Info Dossier (5 columns on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
                  <div className="pb-4 border-b border-stone-100">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/70 block mb-1">
                      Headquarters // 02
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1F15] mb-2">
                      {t('info_title')}
                    </h2>
                    <p className="text-sm sm:text-[15px] text-charcoal/80 font-normal leading-relaxed">
                      {t('info_desc')}
                    </p>
                  </div>

                  {/* Offices */}
                  <div className="space-y-6">
                    {offices.map((office, idx) => (
                      <div
                        key={idx}
                        className="p-5 sm:p-6 rounded-2xl bg-[#F8F6F0] border border-stone-200/80"
                      >
                        <p className="font-mono text-[11px] font-bold text-primary-green tracking-[0.2em] uppercase mb-1.5">
                          {office.region}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1F15] mb-5">
                          {office.country}
                        </h3>

                        <div className="space-y-3.5 text-sm sm:text-[15px]">
                          <div className="flex gap-3.5 items-start">
                            <MapPin size={18} className="text-primary-green flex-shrink-0 mt-1" />
                            <p className="text-charcoal/85 font-normal leading-relaxed whitespace-pre-line">{office.address}</p>
                          </div>
                          <div className="flex gap-3.5 items-center">
                            <Mail size={18} className="text-primary-green flex-shrink-0" />
                            <a
                              href={`mailto:${office.email}`}
                              className="text-charcoal/85 hover:text-primary-green font-medium transition-colors"
                            >
                              {office.email}
                            </a>
                          </div>
                          <div className="flex gap-3.5 items-center">
                            <Phone size={18} className="text-primary-green flex-shrink-0" />
                            <a
                              href={`tel:${office.phone}`}
                              className="text-charcoal/85 hover:text-primary-green font-medium tabular-nums transition-colors"
                            >
                              {office.phone}
                            </a>
                          </div>
                          {office.mobile && (
                            <div className="flex gap-3.5 items-center">
                              <Phone size={18} className="text-primary-green flex-shrink-0" />
                              <a
                                href={`tel:${office.mobile}`}
                                className="text-charcoal/85 hover:text-primary-green font-medium tabular-nums transition-colors"
                              >
                                {office.mobile}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="w-full h-60 rounded-2xl overflow-hidden border border-stone-200/80">
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
