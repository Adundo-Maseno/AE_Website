import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getCustomSectionsByPage, upsertCustomSection, deleteCustomSection } from '@/lib/db'

export async function GET(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || 'home'

  const sections = getCustomSectionsByPage(page, true)
  return NextResponse.json({ sections })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (!body.page_key || !body.title_en || !body.content_en) {
      return NextResponse.json({ error: 'Missing required custom section fields' }, { status: 400 })
    }

    const success = upsertCustomSection(body)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const success = deleteCustomSection(id)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
