'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Home,
  FileText,
  Briefcase,
  Users,
  Calendar,
  BookOpen,
  Mail,
  Save,
  LogOut,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  Globe,
  Sparkles,
} from 'lucide-react'

type PageKey = 'home' | 'about' | 'ourwork' | 'events' | 'resources' | 'contact' | 'global'
type Locale = 'en' | 'fr'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: number; email: string; name: string } | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Current active navigation
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [activeLocale, setActiveLocale] = useState<Locale>('en')

  // Loaded section data
  const [pageData, setPageData] = useState<{ en: any; fr: any }>({ en: null, fr: null })
  const [loadingData, setLoadingData] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Upload state
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')

  // 1. Check Authentication on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        if (res.ok && data.authenticated) {
          setUser(data.user)
          setCheckingAuth(false)
        } else {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router])

  // 2. Fetch Page Data when activePage changes
  useEffect(() => {
    if (checkingAuth) return
    async function fetchContent() {
      setLoadingData(true)
      setNotification(null)
      try {
        const res = await fetch(`/api/admin/content?page=${activePage}`)
        const data = await res.json()
        if (res.ok && data.sections) {
          setPageData({
            en: data.sections.en || {},
            fr: data.sections.fr || {},
          })
        }
      } catch (err) {
        console.error('Failed to load content', err)
      } finally {
        setLoadingData(false)
      }
    }
    fetchContent()
  }, [activePage, checkingAuth])

  // 3. Save Handler
  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    setNotification(null)

    try {
      const currentData = pageData[activeLocale]
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: activePage,
          sectionKey: 'main',
          locale: activeLocale,
          data: currentData,
        }),
      })

      const result = await res.json()
      if (res.ok && result.success) {
        setNotification({
          type: 'success',
          message: `Successfully saved ${activePage.toUpperCase()} (${activeLocale.toUpperCase()}) content to SQLite database!`,
        })
      } else {
        setNotification({
          type: 'error',
          message: result.error || 'Failed to save changes.',
        })
      }
    } catch {
      setNotification({
        type: 'error',
        message: 'Network error occurred while saving.',
      })
    } finally {
      setSaving(false)
    }
  }

  // 4. File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadedUrl('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setUploadedUrl(data.url)
        navigator.clipboard?.writeText(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed due to connection error')
    } finally {
      setUploading(false)
    }
  }

  // 5. Logout Handler
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Update a single nested field in the state
  const handleFieldChange = (key: string, value: any) => {
    setPageData((prev) => ({
      ...prev,
      [activeLocale]: {
        ...prev[activeLocale],
        [key]: value,
      },
    }))
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex flex-col items-center justify-center gap-3">
        <Loader2 size={24} className="animate-spin text-[#1A4D2E]" />
        <span className="text-sm font-medium text-[#46584D]">Verifying admin session...</span>
      </div>
    )
  }

  const pagesList: { key: PageKey; label: string; icon: any; liveUrl: string }[] = [
    { key: 'home', label: 'Home Page', icon: Home, liveUrl: `/${activeLocale}` },
    { key: 'about', label: 'About Us', icon: FileText, liveUrl: `/${activeLocale}/about` },
    { key: 'ourwork', label: 'Our Work', icon: Briefcase, liveUrl: `/${activeLocale}/our-work` },
    { key: 'events', label: 'Events & Convenings', icon: Calendar, liveUrl: `/${activeLocale}/events` },
    { key: 'resources', label: 'Resources & Reports', icon: BookOpen, liveUrl: `/${activeLocale}/resources` },
    { key: 'contact', label: 'Contact Us', icon: Mail, liveUrl: `/${activeLocale}/contact` },
    { key: 'global', label: 'Global (Header/Footer)', icon: Globe, liveUrl: `/${activeLocale}` },
  ]

  const currentContent = pageData[activeLocale] || {}

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col">
      {/* ===== TOP ADMIN HEADER ===== */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Image
              src="/agri-experience-logo.png"
              alt="Agri Experience"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <div className="hidden sm:block h-5 w-px bg-stone-200" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1A4D2E]/10 text-[#1A4D2E]">
                CMS Admin
              </span>
              <span className="text-xs text-[#46584D]">Hostinger SQLite Storage</span>
            </div>
          </div>

          {/* Right Action Bar: Language, Save & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bilingual Switcher */}
            <div className="flex items-center bg-[#F8F6F0] p-1 rounded-full border border-stone-200/90">
              <button
                type="button"
                onClick={() => setActiveLocale('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeLocale === 'en'
                    ? 'bg-[#0F1F15] text-white'
                    : 'text-[#46584D] hover:text-[#0F1F15]'
                }`}
              >
                EN 🇬🇧
              </button>
              <button
                type="button"
                onClick={() => setActiveLocale('fr')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeLocale === 'fr'
                    ? 'bg-[#0F1F15] text-white'
                    : 'text-[#46584D] hover:text-[#0F1F15]'
                }`}
              >
                FR 🇫🇷
              </button>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A4D2E] text-white text-xs sm:text-sm font-semibold hover:bg-[#143d24] transition-all cursor-pointer shadow-sm disabled:opacity-50 active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-[#46584D] hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN EDITORIAL WORKSPACE ===== */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Pages Navigation & Asset Uploader */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="consultancy-card p-3 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A4D2E] px-3 pt-2 pb-2">
              Website Pages
            </p>
            <nav className="space-y-1">
              {pagesList.map((item) => {
                const Icon = item.icon
                const isActive = activePage === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActivePage(item.key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13.5px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0F1F15] text-white font-semibold'
                        : 'text-[#2A3830] hover:bg-stone-100 hover:text-[#0F1F15]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-[#1A4D2E]'} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Asset Upload Widget (Hostinger public/uploads/ Direct Storage) */}
          <div className="consultancy-card p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A4D2E] uppercase tracking-wider">
              <Upload size={14} />
              <span>Media &amp; PDF Uploader</span>
            </div>
            <p className="text-xs text-[#46584D] leading-relaxed">
              Upload photos or PDFs directly to Hostinger server storage.
            </p>

            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-xs text-[#46584D] file:mr-2.5 file:py-2 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F8F6F0] file:text-[#0F1F15] hover:file:bg-stone-200 cursor-pointer disabled:opacity-50"
              />
            </label>

            {uploading && (
              <div className="flex items-center gap-2 text-xs text-[#1A4D2E]">
                <Loader2 size={13} className="animate-spin" />
                <span>Uploading file...</span>
              </div>
            )}

            {uploadedUrl && (
              <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-900 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <CheckCircle size={13} />
                  <span>Uploaded &amp; Copied!</span>
                </p>
                <p className="font-mono text-[11px] truncate bg-white p-1 rounded border border-green-200 select-all">
                  {uploadedUrl}
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Dynamic Page Content Editor */}
        <main className="lg:col-span-9 space-y-6">
          {/* Header Banner */}
          <div className="consultancy-card p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E]">
                Currently Editing
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0F1F15] tracking-tight capitalize mt-0.5">
                {activePage} Page ({activeLocale.toUpperCase()})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={pagesList.find((p) => p.key === activePage)?.liveUrl || `/${activeLocale}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-[#0F1F15] hover:bg-stone-50 transition-colors"
              >
                <span>Preview Page</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Feedback Notification */}
          {notification && (
            <div
              className={`p-4 rounded-xl border text-sm flex items-start gap-2.5 ${
                notification.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle size={18} className="shrink-0 text-green-700 mt-0.5" />
              ) : (
                <AlertCircle size={18} className="shrink-0 text-red-700 mt-0.5" />
              )}
              <span>{notification.message}</span>
            </div>
          )}

          {/* Dynamic Content Form */}
          {loadingData ? (
            <div className="consultancy-card p-12 bg-white rounded-2xl border border-stone-200/90 text-center space-y-3">
              <Loader2 size={24} className="animate-spin text-[#1A4D2E] mx-auto" />
              <p className="text-sm text-[#46584D]">Fetching content from Hostinger SQLite database...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* PAGE SPECIFIC FORM RENDERERS */}

              {/* ===== HOME PAGE FORM ===== */}
              {activePage === 'home' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Hero Section &amp; Headlines
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1.5">
                        Title Line 1
                      </label>
                      <input
                        type="text"
                        value={currentContent.hero_title_1 || ''}
                        onChange={(e) => handleFieldChange('hero_title_1', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15] focus:outline-none focus:border-[#1A4D2E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1.5">
                        Title Line 2
                      </label>
                      <input
                        type="text"
                        value={currentContent.hero_title_2 || ''}
                        onChange={(e) => handleFieldChange('hero_title_2', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15] focus:outline-none focus:border-[#1A4D2E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1.5">
                        Title Line 3
                      </label>
                      <input
                        type="text"
                        value={currentContent.hero_title_3 || ''}
                        onChange={(e) => handleFieldChange('hero_title_3', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15] focus:outline-none focus:border-[#1A4D2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={currentContent.hero_desc || ''}
                      onChange={(e) => handleFieldChange('hero_desc', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15] focus:outline-none focus:border-[#1A4D2E]"
                    />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pt-4 pb-3 border-b border-stone-100">
                    Institutional Footprint Statistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#F8F6F0] rounded-xl space-y-2">
                      <label className="block text-xs font-semibold text-[#1A4D2E]">Statistic 1</label>
                      <input
                        type="text"
                        placeholder="Value (e.g. 20+)"
                        value={currentContent.stat_1_val || ''}
                        onChange={(e) => handleFieldChange('stat_1_val', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={currentContent.stat_1_lbl || ''}
                        onChange={(e) => handleFieldChange('stat_1_lbl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                      />
                    </div>

                    <div className="p-4 bg-[#F8F6F0] rounded-xl space-y-2">
                      <label className="block text-xs font-semibold text-[#1A4D2E]">Statistic 2</label>
                      <input
                        type="text"
                        placeholder="Value (e.g. 20+)"
                        value={currentContent.stat_2_val || ''}
                        onChange={(e) => handleFieldChange('stat_2_val', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={currentContent.stat_2_lbl || ''}
                        onChange={(e) => handleFieldChange('stat_2_lbl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                      />
                    </div>

                    <div className="p-4 bg-[#F8F6F0] rounded-xl space-y-2">
                      <label className="block text-xs font-semibold text-[#1A4D2E]">Statistic 3</label>
                      <input
                        type="text"
                        placeholder="Value (e.g. 100+)"
                        value={currentContent.stat_3_val || ''}
                        onChange={(e) => handleFieldChange('stat_3_val', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={currentContent.stat_3_lbl || ''}
                        onChange={(e) => handleFieldChange('stat_3_lbl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                      />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pt-4 pb-3 border-b border-stone-100">
                    &apos;What We Believe&apos; Section
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="p-4 bg-[#F8F6F0] rounded-xl space-y-2">
                        <label className="block text-xs font-semibold text-[#1A4D2E]">
                          Pillar {num}
                        </label>
                        <input
                          type="text"
                          placeholder="Pillar Title"
                          value={currentContent[`belief_${num}_title`] || ''}
                          onChange={(e) => handleFieldChange(`belief_${num}_title`, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-bold"
                        />
                        <textarea
                          rows={3}
                          placeholder="Pillar Description"
                          value={currentContent[`belief_${num}_text`] || ''}
                          onChange={(e) => handleFieldChange(`belief_${num}_text`, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== ABOUT US PAGE FORM ===== */}
              {activePage === 'about' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Masthead &amp; Mandate
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={currentContent.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={currentContent.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pt-4 pb-3 border-b border-stone-100">
                    Vision, Mission &amp; Goal
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A4D2E] mb-1">Vision Statement</label>
                      <textarea
                        rows={2}
                        value={currentContent.vision_desc || ''}
                        onChange={(e) => handleFieldChange('vision_desc', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A4D2E] mb-1">Mission Statement</label>
                      <textarea
                        rows={2}
                        value={currentContent.mission_desc || ''}
                        onChange={(e) => handleFieldChange('mission_desc', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A4D2E] mb-1">Strategic Goal Statement</label>
                      <textarea
                        rows={2}
                        value={currentContent.goal_desc || ''}
                        onChange={(e) => handleFieldChange('goal_desc', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ===== OUR WORK (PRACTICE AREAS) FORM ===== */}
              {activePage === 'ourwork' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Masthead &amp; Overview
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={currentContent.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={currentContent.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pt-4 pb-3 border-b border-stone-100">
                    6 Practice Area Cards
                  </h3>

                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div key={num} className="p-4 bg-[#F8F6F0] rounded-xl space-y-3">
                        <span className="text-xs font-bold text-[#1A4D2E] uppercase">
                          Practice Area 0{num}
                        </span>
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Title</label>
                          <input
                            type="text"
                            value={currentContent[`c${num}_title`] || ''}
                            onChange={(e) => handleFieldChange(`c${num}_title`, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Full Description</label>
                          <textarea
                            rows={2}
                            value={currentContent[`c${num}_desc`] || ''}
                            onChange={(e) => handleFieldChange(`c${num}_desc`, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== EVENTS & CONVENINGS FORM ===== */}
              {activePage === 'events' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Events Masthead &amp; Key Headings
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={currentContent.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={currentContent.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pt-4 pb-3 border-b border-stone-100">
                    Upcoming 2026 Convenings
                  </h3>

                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="p-4 bg-[#F8F6F0] rounded-xl space-y-3">
                        <span className="text-xs font-bold text-[#1A4D2E] uppercase">
                          Convening #{num}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">Quarter / Window</label>
                            <input
                              type="text"
                              value={currentContent[`up_${num}_window`] || ''}
                              onChange={(e) => handleFieldChange(`up_${num}_window`, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">Location</label>
                            <input
                              type="text"
                              value={currentContent[`up_${num}_location`] || ''}
                              onChange={(e) => handleFieldChange(`up_${num}_location`, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Title</label>
                          <input
                            type="text"
                            value={currentContent[`up_${num}_title`] || ''}
                            onChange={(e) => handleFieldChange(`up_${num}_title`, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Summary</label>
                          <textarea
                            rows={2}
                            value={currentContent[`up_${num}_summary`] || ''}
                            onChange={(e) => handleFieldChange(`up_${num}_summary`, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== RESOURCES FORM ===== */}
              {activePage === 'resources' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Resources Masthead &amp; Publication Categories
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={currentContent.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={currentContent.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm text-[#0F1F15]"
                    />
                  </div>
                </div>
              )}

              {/* ===== CONTACT FORM ===== */}
              {activePage === 'contact' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Nairobi Headquarters &amp; Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Region Label</label>
                      <input
                        type="text"
                        value={currentContent.region || ''}
                        onChange={(e) => handleFieldChange('region', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Country</label>
                      <input
                        type="text"
                        value={currentContent.country || ''}
                        onChange={(e) => handleFieldChange('country', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#46584D] mb-1.5">Office Physical Address</label>
                    <textarea
                      rows={2}
                      value={currentContent.address || ''}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* ===== GLOBAL (HEADER / FOOTER) FORM ===== */}
              {activePage === 'global' && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Header &amp; Navigation Labels
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">About Menu</label>
                      <input
                        type="text"
                        value={currentContent.about || ''}
                        onChange={(e) => handleFieldChange('about', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">Our Work Menu</label>
                      <input
                        type="text"
                        value={currentContent.our_work || ''}
                        onChange={(e) => handleFieldChange('our_work', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">Events Menu</label>
                      <input
                        type="text"
                        value={currentContent.events || ''}
                        onChange={(e) => handleFieldChange('events', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">Our Team Menu</label>
                      <input
                        type="text"
                        value={currentContent.our_team || ''}
                        onChange={(e) => handleFieldChange('our_team', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">Our Impact Menu</label>
                      <input
                        type="text"
                        value={currentContent.our_impact || ''}
                        onChange={(e) => handleFieldChange('our_impact', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#46584D] mb-1">Resources Menu</label>
                      <input
                        type="text"
                        value={currentContent.resources || ''}
                        onChange={(e) => handleFieldChange('resources', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F0] border border-stone-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sticky Bottom Floating Save Bar */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-between">
                <span className="text-xs text-[#46584D]">
                  Changes are saved directly into your Hostinger SQLite database (`data/cms.db`).
                </span>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A4D2E] text-white text-xs sm:text-sm font-semibold hover:bg-[#143d24] transition-all cursor-pointer shadow-sm disabled:opacity-50 active:scale-[0.98]"
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Saving to SQLite...</span>
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      <span>Save Changes ({activeLocale.toUpperCase()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

