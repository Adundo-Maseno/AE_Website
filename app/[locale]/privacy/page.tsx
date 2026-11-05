import React from 'react'
import { Link } from '@/i18n/routing'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('Legal')
  return (
    <main className="bg-[#FAFAFA] min-h-[100dvh] pt-16 lg:pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-primary-green transition-colors text-sm font-medium mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {t('back')}
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-16 border-b border-black/5 pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-deep-forest font-bold tracking-tight pb-2">
            {t('privacy_title')}
          </h1>
          <p className="text-charcoal/60 text-lg font-light">
            Last Updated: June 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-charcoal/80 font-light leading-relaxed space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-deep-forest">1. Introduction</h2>
            <p>
              Agri Experience ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and platform, including any other media form, media channel, mobile website, or mobile application related or connected thereto.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-deep-forest">2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, that you voluntarily give to us when you contact us.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-deep-forest">3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver administrative information and platform services.</li>
              <li>Respond to product, service, and customer support requests.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Request feedback and contact you about your use of the Site.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-deep-forest">4. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and customer service.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-deep-forest">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
