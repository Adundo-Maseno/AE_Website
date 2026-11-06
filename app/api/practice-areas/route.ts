import { NextResponse } from 'next/server'
import { getAllPracticeAreas } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const locale = searchParams.get('locale') || 'en'

    const rows = getAllPracticeAreas(false)
    if (!rows || rows.length === 0) {
      return NextResponse.json({ areas: [] })
    }

    const areas = rows.map((r: any) => ({
      id: r.id,
      title: locale === 'fr' ? r.title_fr || r.title_en : r.title_en,
      description: locale === 'fr' ? r.description_fr || r.description_en : r.description_en,
      mobileDescription: locale === 'fr' ? r.mobile_description_fr || r.mobile_description_en || r.description_en : r.mobile_description_en || r.description_en,
      link: r.link,
      sortOrder: r.sort_order,
    }))

    return NextResponse.json({ areas })
  } catch (err: any) {
    return NextResponse.json({ areas: [], error: err.message })
  }
}

