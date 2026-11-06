import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { verifyPassword, createSessionToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const db = getDb()
    const user = db
      .prepare('SELECT id, email, password_hash, name FROM admin_users WHERE email = ?')
      .get(email.trim().toLowerCase()) as { id: number; email: string; password_hash: string; name: string } | undefined

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    })

    response.cookies.set('ae_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err: any) {
    console.error('[Admin Login API Error]', err)
    return NextResponse.json({ error: 'An unexpected server error occurred' }, { status: 500 })
  }
}
