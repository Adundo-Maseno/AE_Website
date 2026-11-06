import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getAllPracticeProjects, upsertPracticeProject, deletePracticeProject } from '@/lib/db'

export async function GET(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug') || undefined
  const projects = getAllPracticeProjects(slug, true)
  return NextResponse.json({ projects })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (!body.practice_area_slug || !body.title_en || !body.description_en || !body.image) {
      return NextResponse.json(
        { error: 'Missing required project fields (practice_area_slug, title_en, description_en, image)' },
        { status: 400 }
      )
    }

    const success = upsertPracticeProject(body)
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

    const success = deletePracticeProject(id)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
