import { NextResponse } from 'next/server'
import { getAllPracticeProjects } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug') || undefined
    const locale = searchParams.get('locale') || 'en'

    const rows = getAllPracticeProjects(slug, false)
    if (!rows || rows.length === 0) {
      return NextResponse.json({ projects: [] })
    }

    const projects = rows.map((r: any) => ({
      id: r.id,
      practiceAreaSlug: r.practice_area_slug,
      title: locale === 'fr' ? r.title_fr || r.title_en : r.title_en,
      tag: locale === 'fr' ? r.tag_fr || r.tag_en : r.tag_en,
      description: locale === 'fr' ? r.description_fr || r.description_en : r.description_en,
      image: r.image,
      imageType: r.image_type || 'screenshot',
      link: r.link_url,
      sortOrder: r.sort_order,
    }))

    return NextResponse.json({ projects })
  } catch (err: any) {
    return NextResponse.json({ projects: [], error: err.message })
  }
}
