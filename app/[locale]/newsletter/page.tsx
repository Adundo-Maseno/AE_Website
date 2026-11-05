'use client'

import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

export default function NewsletterPage() {
  const t = useTranslations('Newsletter')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setEmail('')
    }, 3000)
  }

  return (
    <>      <main className="bg-white min-h-[100dvh]">
        {/* Hero */}
        <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden border-b border-mist">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--mist)_0%,transparent_50%)] opacity-50"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-7xl font-serif font-bold text-deep-forest tracking-tight"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg lg:text-xl text-charcoal/80 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Signup Form */}
        <section className="w-full py-16 lg:py-16 bg-white relative">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 md:p-12 border border-mist shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-primary-green/10 flex items-center justify-center">
                  <Mail className="text-primary-green" size={24} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-deep-forest">{t('sign_up')}</h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="text-primary-green" size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-deep-forest">
                    {t('confirmed')}
                  </h3>
                  <p className="text-charcoal/80 font-light leading-relaxed">
                    {t('thank_you')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-deep-forest mb-2">
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist bg-mist/30 focus:border-primary-green focus:outline-none transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-deep-forest mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist bg-mist/30 focus:border-primary-green focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded border-mist text-primary-green focus:ring-primary-green mt-0.5"
                    />
                    <span className="text-sm text-charcoal/80 font-light leading-relaxed">
                      {t('agree')}
                    </span>
                  </label>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="group relative overflow-hidden w-full px-8 py-4 bg-deep-forest text-white rounded-full font-bold flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-200"
                    >
                      <RollingText>
                        {t('subscribe')}
                      </RollingText>
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>    </>
  )
}
