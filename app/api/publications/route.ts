import { NextResponse } from 'next/server'
import { getAllPublications } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const locale = searchParams.get('locale') || 'en'

    const rows = getAllPublications(false)
    if (!rows || rows.length === 0) {
      return NextResponse.json({ publications: [] })
    }

    const publications = rows.map((r: any) => ({
      id: r.id,
      title: locale === 'fr' ? r.title_fr || r.title_en : r.title_en,
      category: locale === 'fr' ? r.category_fr || r.category_en : r.category_en,
      client: locale === 'fr' ? r.client_fr || r.client_en : r.client_en,
      citation: locale === 'fr' ? r.citation_fr || r.citation_en : r.citation_en,
      link: r.link,
      sortOrder: r.sort_order,
    }))

    return NextResponse.json({ publications })
  } catch (err: any) {
    return NextResponse.json({ publications: [], error: err.message })
  }
}
