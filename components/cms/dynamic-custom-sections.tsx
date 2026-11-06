'use client'

import { useState, useEffect } from 'react'

interface CustomSection {
  id: string
  pageKey: string
  title: string
  subtitle?: string
  content: string
  styleVariant: string
  sortOrder: number
}

interface Props {
  page: 'home' | 'about' | 'ourwork' | 'ourteam' | 'events' | 'resources' | 'contact'
  locale: string
}

export function DynamicCustomSections({ page, locale }: Props) {
  const [sections, setSections] = useState<CustomSection[]>([])

  useEffect(() => {
    fetch(`/api/sections?page=${page}&locale=${locale}`)
      .then((res) => {
        if (!res.ok) return null
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSections(data)
        }
      })
      .catch(() => {
        // Safe fallback
      })
  }, [page, locale])

  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section) => {
        const isAccent = section.styleVariant === 'accent'
        const isMuted = section.styleVariant === 'muted'
        const isBordered = section.styleVariant === 'bordered'

        const bgClass = isAccent
          ? 'bg-[#1A4D2E] text-white'
          : isMuted
          ? 'bg-[#F8F6F0] text-[#0F1F15]'
          : 'bg-white text-[#0F1F15]'

        const titleClass = isAccent
          ? 'text-white'
          : 'text-[#0F1F15]'

        const subtitleClass = isAccent
          ? 'text-emerald-100/90'
          : 'text-[#2A3830]'

        const borderClass = isBordered
          ? 'border-y border-stone-300'
          : 'border-b border-stone-200/80'

        return (
          <section
            key={section.id}
            className={`w-full py-16 md:py-24 ${bgClass} ${borderClass} transition-colors`}
          >
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="max-w-3xl">
                <h2
                  className={`font-serif font-bold tracking-tight leading-[1.15] mb-4 ${titleClass}`}
                  style={{ fontSize: 'clamp(1.75rem, 1.25rem + 2vw, 3rem)' }}
                >
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className={`text-lg md:text-xl font-normal mb-8 leading-relaxed ${subtitleClass}`}>
                    {section.subtitle}
                  </p>
                )}
                <div
                  className={`prose max-w-none text-base md:text-lg leading-relaxed whitespace-pre-wrap ${
                    isAccent ? 'text-emerald-50/90 prose-invert' : 'text-[#2A3830]'
                  }`}
                >
                  {section.content}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
