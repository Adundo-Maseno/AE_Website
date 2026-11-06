import { NextResponse } from 'next/server'
import { getCustomSectionsByPage } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 'home'
    const locale = searchParams.get('locale') || 'en'

    const rows = getCustomSectionsByPage(page, false)
    const localized = rows.map((r) => ({
      id: r.id,
      pageKey: r.page_key,
      title: locale === 'fr' ? (r.title_fr || r.title_en) : r.title_en,
      subtitle: locale === 'fr' ? (r.subtitle_fr || r.subtitle_en) : r.subtitle_en,
      content: locale === 'fr' ? (r.content_fr || r.content_en) : r.content_en,
      styleVariant: r.style_variant,
      sortOrder: r.sort_order,
    }))

    return NextResponse.json(localized)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

