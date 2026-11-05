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
    <>      <main className="bg-white min-h-[100dvh]">
      {/* Hero */}
      <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden border-b border-mist">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--mist)_0%,transparent_50%)] opacity-50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-4 lg:space-y-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-deep-forest tracking-tight pb-1"
            style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-charcoal/85 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="w-full py-16 lg:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold text-deep-forest mb-8">
                {t('form_title')}
              </h2>

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

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-deep-forest mb-6">
                  {t('info_title')}
                </h2>
                <p className="text-charcoal/80 font-light leading-relaxed mb-8">
                  {t('info_desc')}
                </p>
              </div>

              {/* Offices */}
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="p-5 sm:p-8 rounded-3xl bg-mist border border-mist hover:border-primary-green/20 transition-[background-color,border-color,box-shadow] duration-200"
                  >
                    <p className="text-sm font-bold text-primary-green tracking-widest uppercase mb-3">{office.region}</p>
                    <h3 className="text-2xl font-serif font-bold text-deep-forest mb-6">{office.country}</h3>

                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <MapPin size={20} className="text-primary-green flex-shrink-0 mt-0.5" />
                        <p className="text-charcoal/80 font-light leading-relaxed whitespace-pre-line">{office.address}</p>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Mail size={20} className="text-primary-green flex-shrink-0 mt-0.5" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-charcoal/80 hover:text-primary-green font-light transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Phone size={20} className="text-primary-green flex-shrink-0 mt-0.5" />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-charcoal/80 hover:text-primary-green font-light transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                      {office.mobile && (
                        <div className="flex gap-4 items-start">
                          <Phone size={20} className="text-primary-green flex-shrink-0 mt-0.5" />
                          <a
                            href={`tel:${office.mobile}`}
                            className="text-charcoal/80 hover:text-primary-green font-light transition-colors"
                          >
                            {office.mobile}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-mist mt-8"
                >
                  <iframe
                    src="https://maps.google.com/maps?q=Watermark%20Business%20Park,%20Spring%20Court,%20Karen,%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>    </>
  )
}
