import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getAllPublications, upsertPublication, deletePublication } from '@/lib/db'

export async function GET() {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const publications = getAllPublications(true)
  return NextResponse.json({ publications })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (!body.title_en || !body.category_en || !body.link) {
      return NextResponse.json({ error: 'Missing required publication fields' }, { status: 400 })
    }

    const success = upsertPublication(body)
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

    const success = deletePublication(id)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
