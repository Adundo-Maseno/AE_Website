import { NextResponse } from 'next/server'
import { getAllTeamMembers } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const locale = searchParams.get('locale') || 'en'

    const rows = getAllTeamMembers(false)
    if (!rows || rows.length === 0) {
      return NextResponse.json({ members: [] })
    }

    const members = rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      role: locale === 'fr' ? r.role_fr || r.role_en : r.role_en,
      bio: locale === 'fr' ? r.bio_fr || r.bio_en : r.bio_en,
      image: r.image,
      hoverImage: r.hover_image || undefined,
      imagePosition: r.image_position || '50% 30%',
      hoverImagePosition: r.hover_image_position || '50% 30%',
      projects: (locale === 'fr' ? r.projects_fr || r.projects_en : r.projects_en)
        ?.split(',')
        .map((s: string) => s.trim())
        .filter(Boolean) || [],
    }))

    return NextResponse.json({ members })
  } catch (err: any) {
    return NextResponse.json({ members: [], error: err.message })
  }
}
