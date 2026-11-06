import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getAllTeamMembers, upsertTeamMember, deleteTeamMember } from '@/lib/db'

export async function GET() {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const members = getAllTeamMembers(true)
  return NextResponse.json({ members })
}

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (!body.name || !body.role_en || !body.bio_en || !body.image) {
      return NextResponse.json({ error: 'Missing required team member fields' }, { status: 400 })
    }

    const success = upsertTeamMember(body)
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

    const success = deleteTeamMember(id)
    return NextResponse.json({ success })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

