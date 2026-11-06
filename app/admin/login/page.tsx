'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/admin')
      } else {
        setError(data.error || 'Invalid login credentials')
        setLoading(false)
      }
    } catch (err) {
      setError('Connection failed. Please check your network and try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex justify-center mb-2">
            <Image
              src="/agri-experience-logo.png"
              alt="Agri Experience"
              width={180}
              height={50}
              priority
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1F15] tracking-tight">
            Content Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#46584D]">
            Sign in to update pages, practice areas, events, and resources.
          </p>
        </div>

        {/* Login Card */}
        <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-sm">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#46584D] pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agri-experience.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F6F0] border border-stone-200/90 text-sm text-[#0F1F15] placeholder:text-stone-400 focus:outline-none focus:border-[#1A4D2E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#46584D] pointer-events-none"
                />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F6F0] border border-stone-200/90 text-sm text-[#0F1F15] placeholder:text-stone-400 focus:outline-none focus:border-[#1A4D2E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0F1F15] text-white text-sm font-semibold hover:bg-[#1A4D2E] transition-all duration-200 cursor-pointer disabled:opacity-60 shadow-sm active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <p className="text-xs text-[#46584D]">
              Protected editorial gateway for Agri Experience Limited personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

