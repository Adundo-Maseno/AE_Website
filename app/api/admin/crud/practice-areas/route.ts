import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getAllPracticeAreas, upsertPracticeArea, deletePracticeArea } from '@/lib/db'

export async function GET() {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const areas = getAllPracticeAreas(true)
  return NextResponse.json({ areas })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (!body.title_en || !body.description_en || !body.link) {
      return NextResponse.json({ error: 'Missing required practice area fields' }, { status: 400 })
    }

    const success = upsertPracticeArea(body)
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

    const success = deletePracticeArea(id)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
