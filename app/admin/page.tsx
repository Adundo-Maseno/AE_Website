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
  Plus,
  Trash2,
  Edit2,
  X,
  Sparkles,
} from 'lucide-react'

type PageKey = 'home' | 'about' | 'ourwork' | 'ourteam' | 'events' | 'resources' | 'contact' | 'global'
type Locale = 'en' | 'fr'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Current active navigation
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [activeLocale, setActiveLocale] = useState<Locale>('en')

  // Loaded section data
  const [pageData, setPageData] = useState<{ en: any; fr: any }>({ en: null, fr: null })
  const [loadingData, setLoadingData] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // CRUD Collections state
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [practiceAreas, setPracticeAreas] = useState<any[]>([])
  const [publications, setPublications] = useState<any[]>([])
  const [customSections, setCustomSections] = useState<any[]>([])

  // Modal / Editing Drawer State
  const [editingItemType, setEditingItemType] = useState<'team' | 'practice' | 'pub' | 'section' | null>(null)
  const [editingItemData, setEditingItemData] = useState<any>(null)

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

  // 2. Fetch Page Data and Collections when activePage changes
  const fetchAllData = async () => {
    setLoadingData(true)
    setNotification(null)
    try {
      if (['home', 'about', 'contact', 'global', 'events'].includes(activePage)) {
        const res = await fetch(`/api/admin/content?page=${activePage}`)
        const data = await res.json()
        if (res.ok && data.sections) {
          setPageData({
            en: data.sections.en || {},
            fr: data.sections.fr || {},
          })
        }
      }

      if (activePage === 'ourteam') {
        const res = await fetch('/api/admin/crud/team')
        const data = await res.json()
        if (res.ok && data.members) setTeamMembers(data.members)
      } else if (activePage === 'ourwork') {
        const res = await fetch('/api/admin/crud/practice-areas')
        const data = await res.json()
        if (res.ok && data.areas) setPracticeAreas(data.areas)
      } else if (activePage === 'resources') {
        const res = await fetch('/api/admin/crud/publications')
        const data = await res.json()
        if (res.ok && data.publications) setPublications(data.publications)
      }

      // Also fetch custom sections for the active page
      const secRes = await fetch(`/api/admin/crud/sections?page=${activePage}`)
      const secData = await secRes.json()
      if (secRes.ok && secData.sections) setCustomSections(secData.sections)
    } catch (err) {
      console.error('Failed to load content', err)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (checkingAuth) return
    fetchAllData()
  }, [activePage, checkingAuth])

  // 3. Save Standard Page Section
  const handleSavePageSection = async () => {
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
          message: `Successfully saved ${activePage.toUpperCase()} (${activeLocale.toUpperCase()}) content to SQLite!`,
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

  // 4. Team Member CRUD Handlers
  const handleSaveTeamMember = async (member: any) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/crud/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Team member saved successfully!' })
        setEditingItemType(null)
        setEditingItemData(null)
        fetchAllData()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return
    try {
      const res = await fetch(`/api/admin/crud/team?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok) {
        setNotification({ type: 'success', message: `${name} deleted.` })
        fetchAllData()
      }
    } catch {
      alert('Delete failed')
    }
  }

  // 5. Practice Area CRUD Handlers
  const handleSavePracticeArea = async (area: any) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/crud/practice-areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(area),
      })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Practice area saved successfully!' })
        setEditingItemType(null)
        setEditingItemData(null)
        fetchAllData()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePracticeArea = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/crud/practice-areas?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok) {
        setNotification({ type: 'success', message: `Practice area deleted.` })
        fetchAllData()
      }
    } catch {
      alert('Delete failed')
    }
  }

  // 6. Publication CRUD Handlers
  const handleSavePublication = async (pub: any) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/crud/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pub),
      })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Publication saved successfully!' })
        setEditingItemType(null)
        setEditingItemData(null)
        fetchAllData()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePublication = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/crud/publications?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok) {
        setNotification({ type: 'success', message: `Publication deleted.` })
        fetchAllData()
      }
    } catch {
      alert('Delete failed')
    }
  }

  // 7. Custom Section CRUD Handlers
  const handleSaveCustomSection = async (sec: any) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/crud/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sec, page_key: activePage }),
      })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Custom section saved!' })
        setEditingItemType(null)
        setEditingItemData(null)
        fetchAllData()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCustomSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom section?')) return
    try {
      const res = await fetch(`/api/admin/crud/sections?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Custom section removed.' })
        fetchAllData()
      }
    } catch {
      alert('Delete failed')
    }
  }

  // 8. File Upload Handler
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

  // 9. Logout
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Single field update helper
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
    { key: 'ourwork', label: 'Our Work (Practice Areas)', icon: Briefcase, liveUrl: `/${activeLocale}/our-work` },
    { key: 'ourteam', label: 'Our Team (Staff)', icon: Users, liveUrl: `/${activeLocale}/our-team` },
    { key: 'events', label: 'Events & Convenings', icon: Calendar, liveUrl: `/${activeLocale}/events` },
    { key: 'resources', label: 'Resources & Reports', icon: BookOpen, liveUrl: `/${activeLocale}/resources` },
    { key: 'contact', label: 'Contact Us', icon: Mail, liveUrl: `/${activeLocale}/contact` },
    { key: 'global', label: 'Global Navigation', icon: Globe, liveUrl: `/${activeLocale}` },
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
              <span className="text-xs text-[#46584D]">Hostinger SQLite CRUD</span>
            </div>
          </div>

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

      {/* ===== MAIN WORKSPACE ===== */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="consultancy-card p-3 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A4D2E] px-3 pt-2 pb-2">
              Website Management
            </p>
            <nav className="space-y-1">
              {pagesList.map((item) => {
                const Icon = item.icon
                const isActive = activePage === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setActivePage(item.key)
                      setEditingItemType(null)
                      setEditingItemData(null)
                    }}
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

          {/* Media & PDF Uploader */}
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

        {/* Right Main Editor */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Banner */}
          <div className="consultancy-card p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E]">
                Active Module
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0F1F15] tracking-tight capitalize mt-0.5">
                {pagesList.find((p) => p.key === activePage)?.label} ({activeLocale.toUpperCase()})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={pagesList.find((p) => p.key === activePage)?.liveUrl || `/${activeLocale}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-[#0F1F15] hover:bg-stone-50 transition-colors"
              >
                <span>View Live Page</span>
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

          {loadingData ? (
            <div className="consultancy-card p-12 bg-white rounded-2xl border border-stone-200/90 text-center space-y-3">
              <Loader2 size={24} className="animate-spin text-[#1A4D2E] mx-auto" />
              <p className="text-sm text-[#46584D]">Loading data from SQLite...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ========================================================================= */}
              {/* 1. TEAM MEMBERS CRUD MODULE */}
              {/* ========================================================================= */}
              {activePage === 'ourteam' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#0F1F15]">
                        Team Members Management
                      </h3>
                      <p className="text-xs text-[#46584D]">
                        Add, edit, reorder, or remove team members displayed on the Our Team page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingItemType('team')
                        setEditingItemData({
                          id: '',
                          name: '',
                          role_en: '',
                          role_fr: '',
                          bio_en: '',
                          bio_fr: '',
                          image: '/team/aline.png',
                          hover_image: '',
                          projects_en: '',
                          projects_fr: '',
                          is_published: 1,
                        })
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24] transition-colors cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Team Member</span>
                    </button>
                  </div>

                  {/* Team Members List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="consultancy-card p-4 bg-white rounded-xl border border-stone-200/90 flex items-start gap-4"
                      >
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                          <Image
                            src={member.image || '/team/aline.png'}
                            alt={member.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-base text-[#0F1F15] truncate">
                            {member.name}
                          </h4>
                          <p className="text-xs text-[#1A4D2E] font-medium truncate mb-1">
                            {activeLocale === 'fr' ? member.role_fr || member.role_en : member.role_en}
                          </p>
                          <p className="text-xs text-[#46584D] line-clamp-2 leading-relaxed">
                            {activeLocale === 'fr' ? member.bio_fr || member.bio_en : member.bio_en}
                          </p>

                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-100">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItemType('team')
                                setEditingItemData(member)
                              }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A4D2E] hover:underline"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>
                            <span className="text-stone-300">·</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeamMember(member.id, member.name)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                            >
                              <Trash2 size={12} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Edit Modal */}
                  {editingItemType === 'team' && editingItemData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-stone-200 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                          <h4 className="font-serif font-bold text-lg text-[#0F1F15]">
                            {editingItemData.id ? 'Edit Team Member' : 'Add New Team Member'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              value={editingItemData.name || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, name: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                Role (English)
                              </label>
                              <input
                                type="text"
                                required
                                value={editingItemData.role_en || ''}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, role_en: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                Role (French)
                              </label>
                              <input
                                type="text"
                                value={editingItemData.role_fr || ''}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, role_fr: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs font-semibold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                Primary Photo Path / URL
                              </label>
                              <input
                                type="text"
                                placeholder="/team/name.jpg or /uploads/..."
                                value={editingItemData.image || ''}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, image: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                Hover Photo Path / URL
                              </label>
                              <input
                                type="text"
                                placeholder="/team/name2.jpg (optional)"
                                value={editingItemData.hover_image || ''}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, hover_image: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Bio (English)
                            </label>
                            <textarea
                              rows={3}
                              value={editingItemData.bio_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, bio_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Bio (French)
                            </label>
                            <textarea
                              rows={3}
                              value={editingItemData.bio_fr || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, bio_fr: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Key Projects (Comma Separated)
                            </label>
                            <input
                              type="text"
                              value={editingItemData.projects_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, projects_en: e.target.value })
                              }
                              placeholder="Project A, Project B, Project C"
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="px-4 py-2 rounded-full text-xs font-semibold text-[#46584D] hover:bg-stone-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveTeamMember(editingItemData)}
                            disabled={saving}
                            className="px-5 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24]"
                          >
                            Save Team Member
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 2. OUR WORK (PRACTICE AREAS) CRUD MODULE */}
              {/* ========================================================================= */}
              {activePage === 'ourwork' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#0F1F15]">
                        Practice Areas Management
                      </h3>
                      <p className="text-xs text-[#46584D]">
                        Add, edit, or remove practice area advisory services.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingItemType('practice')
                        setEditingItemData({
                          id: '',
                          title_en: '',
                          title_fr: '',
                          description_en: '',
                          description_fr: '',
                          mobile_description_en: '',
                          mobile_description_fr: '',
                          link: '/our-work/',
                          sort_order: practiceAreas.length,
                          is_published: 1,
                        })
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24] transition-colors cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Practice Area</span>
                    </button>
                  </div>

                  {/* Practice Areas List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {practiceAreas.map((area, idx) => (
                      <div
                        key={area.id}
                        className="consultancy-card p-5 bg-white rounded-xl border border-stone-200/90 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#1A4D2E] font-semibold mb-1">
                            <span>Service 0{idx + 1}</span>
                            <span className="font-mono text-stone-400">{area.link}</span>
                          </div>
                          <h4 className="font-serif font-bold text-lg text-[#0F1F15] mb-2">
                            {activeLocale === 'fr' ? area.title_fr || area.title_en : area.title_en}
                          </h4>
                          <p className="text-xs text-[#46584D] leading-relaxed line-clamp-3">
                            {activeLocale === 'fr' ? area.description_fr || area.description_en : area.description_en}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType('practice')
                              setEditingItemData(area)
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A4D2E] hover:underline"
                          >
                            <Edit2 size={12} />
                            <span>Edit Service</span>
                          </button>
                          <span className="text-stone-300">·</span>
                          <button
                            type="button"
                            onClick={() => handleDeletePracticeArea(area.id, area.title_en)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Practice Area Modal */}
                  {editingItemType === 'practice' && editingItemData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-stone-200 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                          <h4 className="font-serif font-bold text-lg text-[#0F1F15]">
                            {editingItemData.id ? 'Edit Practice Area' : 'Add New Practice Area'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Title (English)
                            </label>
                            <input
                              type="text"
                              required
                              value={editingItemData.title_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, title_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Title (French)
                            </label>
                            <input
                              type="text"
                              value={editingItemData.title_fr || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, title_fr: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Page Link / Slug
                            </label>
                            <input
                              type="text"
                              value={editingItemData.link || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, link: e.target.value })
                              }
                              placeholder="/our-work/service-name"
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Full Description (English)
                            </label>
                            <textarea
                              rows={3}
                              value={editingItemData.description_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, description_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Full Description (French)
                            </label>
                            <textarea
                              rows={3}
                              value={editingItemData.description_fr || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, description_fr: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="px-4 py-2 rounded-full text-xs font-semibold text-[#46584D] hover:bg-stone-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSavePracticeArea(editingItemData)}
                            disabled={saving}
                            className="px-5 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24]"
                          >
                            Save Practice Area
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3. RESOURCES & PUBLICATIONS CRUD MODULE */}
              {/* ========================================================================= */}
              {activePage === 'resources' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#0F1F15]">
                        Publications &amp; Reports Library
                      </h3>
                      <p className="text-xs text-[#46584D]">
                        Add new publications, upload PDFs, edit citations, or remove reports.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingItemType('pub')
                        setEditingItemData({
                          id: '',
                          title_en: '',
                          title_fr: '',
                          category_en: 'Reports & Analysis',
                          category_fr: 'Rapports et Analyses',
                          client_en: 'Agri Experience Limited',
                          client_fr: 'Agri Experience Limited',
                          citation_en: '',
                          citation_fr: '',
                          link: '/resources/report.pdf',
                          is_published: 1,
                        })
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24] transition-colors cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Publication</span>
                    </button>
                  </div>

                  {/* Publications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {publications.map((pub) => (
                      <div
                        key={pub.id}
                        className="consultancy-card p-5 bg-white rounded-xl border border-stone-200/90 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#F8F6F0] text-[#1A4D2E] font-semibold text-[11px]">
                              {activeLocale === 'fr' ? pub.category_fr || pub.category_en : pub.category_en}
                            </span>
                            <span className="text-[#46584D] truncate max-w-[150px]">
                              {activeLocale === 'fr' ? pub.client_fr || pub.client_en : pub.client_en}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[#0F1F15] mb-2 leading-snug">
                            {activeLocale === 'fr' ? pub.title_fr || pub.title_en : pub.title_en}
                          </h4>
                          <p className="text-xs text-[#46584D] leading-relaxed line-clamp-2">
                            {activeLocale === 'fr' ? pub.citation_fr || pub.citation_en : pub.citation_en}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-stone-100 text-xs">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#1A4D2E] hover:underline truncate max-w-[160px]"
                          >
                            {pub.link}
                          </a>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItemType('pub')
                                setEditingItemData(pub)
                              }}
                              className="font-semibold text-[#1A4D2E] hover:underline"
                            >
                              Edit
                            </button>
                            <span className="text-stone-300">·</span>
                            <button
                              type="button"
                              onClick={() => handleDeletePublication(pub.id, pub.title_en)}
                              className="font-semibold text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Publication Modal */}
                  {editingItemType === 'pub' && editingItemData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-stone-200 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                          <h4 className="font-serif font-bold text-lg text-[#0F1F15]">
                            {editingItemData.id ? 'Edit Publication' : 'Add New Publication'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Title (English)
                            </label>
                            <input
                              type="text"
                              required
                              value={editingItemData.title_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, title_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Title (French)
                            </label>
                            <input
                              type="text"
                              value={editingItemData.title_fr || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, title_fr: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                Category (English)
                              </label>
                              <select
                                value={editingItemData.category_en || 'Reports & Analysis'}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, category_en: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                              >
                                <option value="Reports & Analysis">Reports &amp; Analysis</option>
                                <option value="Case Studies">Case Studies</option>
                                <option value="Scoping Studies">Scoping Studies</option>
                                <option value="Toolkits & Guides">Toolkits &amp; Guides</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#46584D] mb-1">
                                PDF File Link / URL
                              </label>
                              <input
                                type="text"
                                placeholder="/uploads/file.pdf"
                                value={editingItemData.link || ''}
                                onChange={(e) =>
                                  setEditingItemData({ ...editingItemData, link: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Citation / Partner
                            </label>
                            <input
                              type="text"
                              value={editingItemData.client_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, client_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#46584D] mb-1">
                              Full Citation Description
                            </label>
                            <textarea
                              rows={2}
                              value={editingItemData.citation_en || ''}
                              onChange={(e) =>
                                setEditingItemData({ ...editingItemData, citation_en: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemType(null)
                              setEditingItemData(null)
                            }}
                            className="px-4 py-2 rounded-full text-xs font-semibold text-[#46584D] hover:bg-stone-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSavePublication(editingItemData)}
                            disabled={saving}
                            className="px-5 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24]"
                          >
                            Save Publication
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 4. DYNAMIC CUSTOM SECTIONS MODULE */}
              {/* ========================================================================= */}
              <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A4D2E]">
                      <Sparkles size={14} />
                      <span>Custom Dynamic Sections for {activePage.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-[#46584D]">
                      Add custom editorial blocks, banners, or callouts to this page.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingItemType('section')
                      setEditingItemData({
                        id: '',
                        page_key: activePage,
                        title_en: '',
                        title_fr: '',
                        subtitle_en: '',
                        subtitle_fr: '',
                        content_en: '',
                        content_fr: '',
                        style_variant: 'standard',
                        is_published: 1,
                      })
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F1F15] text-white text-xs font-semibold hover:bg-[#1A4D2E] transition-colors"
                  >
                    <Plus size={13} />
                    <span>Add Custom Section</span>
                  </button>
                </div>

                {customSections.length === 0 ? (
                  <p className="text-xs text-[#46584D] italic py-2">
                    No custom sections added yet for this page. Click &quot;Add Custom Section&quot; above to create one.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {customSections.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-4 rounded-xl bg-[#F8F6F0] border border-stone-200 flex items-start justify-between gap-4"
                      >
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#0F1F15]">
                            {activeLocale === 'fr' ? sec.title_fr || sec.title_en : sec.title_en}
                          </h5>
                          {sec.subtitle_en && (
                            <p className="text-xs text-[#1A4D2E]">{sec.subtitle_en}</p>
                          )}
                          <p className="text-xs text-[#46584D] line-clamp-2 mt-1">
                            {activeLocale === 'fr' ? sec.content_fr || sec.content_en : sec.content_en}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomSection(sec.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete section"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom Section Modal */}
                {editingItemType === 'section' && editingItemData && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 border border-stone-200 shadow-2xl">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                        <h4 className="font-serif font-bold text-lg text-[#0F1F15]">
                          Add Custom Section to {activePage.toUpperCase()}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemType(null)
                            setEditingItemData(null)
                          }}
                          className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">
                            Section Title (English)
                          </label>
                          <input
                            type="text"
                            required
                            value={editingItemData.title_en || ''}
                            onChange={(e) =>
                              setEditingItemData({ ...editingItemData, title_en: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">
                            Section Title (French)
                          </label>
                          <input
                            type="text"
                            value={editingItemData.title_fr || ''}
                            onChange={(e) =>
                              setEditingItemData({ ...editingItemData, title_fr: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">
                            Content Body (English - Markdown / Text)
                          </label>
                          <textarea
                            rows={4}
                            value={editingItemData.content_en || ''}
                            onChange={(e) =>
                              setEditingItemData({ ...editingItemData, content_en: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">
                            Content Body (French - Markdown / Text)
                          </label>
                          <textarea
                            rows={4}
                            value={editingItemData.content_fr || ''}
                            onChange={(e) =>
                              setEditingItemData({ ...editingItemData, content_fr: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemType(null)
                            setEditingItemData(null)
                          }}
                          className="px-4 py-2 rounded-full text-xs font-semibold text-[#46584D] hover:bg-stone-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveCustomSection(editingItemData)}
                          disabled={saving}
                          className="px-5 py-2 rounded-full bg-[#1A4D2E] text-white text-xs font-semibold hover:bg-[#143d24]"
                        >
                          Save Section
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* 5. STANDARD PAGE COPY EDITOR (HOME, ABOUT, CONTACT, GLOBAL) */}
              {/* ========================================================================= */}
              {['home', 'about', 'contact', 'global', 'events'].includes(activePage) && (
                <div className="consultancy-card p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-6">
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15] pb-3 border-b border-stone-100">
                    Page Text &amp; Core Content ({activeLocale.toUpperCase()})
                  </h3>

                  {activePage === 'home' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Hero Title Line 1</label>
                          <input
                            type="text"
                            value={currentContent.hero_title_1 || ''}
                            onChange={(e) => handleFieldChange('hero_title_1', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Hero Title Line 2</label>
                          <input
                            type="text"
                            value={currentContent.hero_title_2 || ''}
                            onChange={(e) => handleFieldChange('hero_title_2', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Hero Title Line 3</label>
                          <input
                            type="text"
                            value={currentContent.hero_title_3 || ''}
                            onChange={(e) => handleFieldChange('hero_title_3', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Hero Subtitle</label>
                        <textarea
                          rows={2}
                          value={currentContent.hero_desc || ''}
                          onChange={(e) => handleFieldChange('hero_desc', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="p-3 rounded-lg bg-[#F8F6F0] space-y-1">
                            <span className="text-xs font-bold text-[#1A4D2E]">Stat {num}</span>
                            <input
                              type="text"
                              value={currentContent[`stat_${num}_val`] || ''}
                              onChange={(e) => handleFieldChange(`stat_${num}_val`, e.target.value)}
                              placeholder="Value"
                              className="w-full px-2 py-1 rounded bg-white border border-stone-200 text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={currentContent[`stat_${num}_lbl`] || ''}
                              onChange={(e) => handleFieldChange(`stat_${num}_lbl`, e.target.value)}
                              placeholder="Label"
                              className="w-full px-2 py-1 rounded bg-white border border-stone-200 text-[11px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activePage === 'about' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Page Title</label>
                        <input
                          type="text"
                          value={currentContent.title || ''}
                          onChange={(e) => handleFieldChange('title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Subtitle</label>
                        <textarea
                          rows={2}
                          value={currentContent.subtitle || ''}
                          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Vision Statement</label>
                        <textarea
                          rows={2}
                          value={currentContent.vision_desc || ''}
                          onChange={(e) => handleFieldChange('vision_desc', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Mission Statement</label>
                        <textarea
                          rows={2}
                          value={currentContent.mission_desc || ''}
                          onChange={(e) => handleFieldChange('mission_desc', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Strategic Goal Statement</label>
                        <textarea
                          rows={2}
                          value={currentContent.goal_desc || ''}
                          onChange={(e) => handleFieldChange('goal_desc', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {activePage === 'contact' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Region</label>
                          <input
                            type="text"
                            value={currentContent.region || ''}
                            onChange={(e) => handleFieldChange('region', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#46584D] mb-1">Country</label>
                          <input
                            type="text"
                            value={currentContent.country || ''}
                            onChange={(e) => handleFieldChange('country', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#46584D] mb-1">Physical Address</label>
                        <textarea
                          rows={2}
                          value={currentContent.address || ''}
                          onChange={(e) => handleFieldChange('address', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F6F0] border border-stone-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Save Page Section Button */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-[#46584D]">
                      Click to save text changes for {activePage.toUpperCase()} in {activeLocale.toUpperCase()}.
                    </span>
                    <button
                      type="button"
                      onClick={handleSavePageSection}
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
                          <span>Save {activePage.toUpperCase()} Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
