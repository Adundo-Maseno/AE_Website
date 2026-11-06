import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getPageSectionData, savePageSectionData, getAllPageSections } from '@/lib/db'

export async function GET(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || 'home'

  const sections = getAllPageSections(page)
  return NextResponse.json({ page, sections })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pageKey, sectionKey = 'main', locale, data } = await req.json()

    if (!pageKey || !locale || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = savePageSectionData(pageKey, sectionKey, locale, data)
    if (!success) {
      return NextResponse.json({ error: 'Failed to save section data' }, { status: 500 })
    }

    return NextResponse.json({ success: true, pageKey, sectionKey, locale })
  } catch (err: any) {
    console.error('[Admin Content Save Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

