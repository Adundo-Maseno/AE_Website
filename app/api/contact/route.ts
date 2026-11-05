import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmails } from '@/lib/email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    const { name, email, organization, message, locale, honeypot } = body

    // 1. Silent Honeypot rejection (Spam protection)
    if (honeypot) {
      console.warn('[Contact API] Honeypot field triggered. Silently dropping spam submission.')
      return NextResponse.json({ success: true })
    }

    // 2. Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name.' },
        { status: 400 }
      )
    }

    // 3. Validate Email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // 4. Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.length > 10000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 5 and 10,000 characters.' },
        { status: 400 }
      )
    }

    // 5. Validate optional organization
    const org = typeof organization === 'string' ? organization.slice(0, 150) : undefined

    // 6. Validate optional locale
    const validLocale = locale === 'fr' ? 'fr' : 'en'

    // 7. Dispatch emails
    const result = await sendContactEmails({
      name: name.trim(),
      email: email.trim(),
      organization: org,
      message: message.trim(),
      locale: validLocale,
    })

    return NextResponse.json({
      success: true,
      simulated: result.simulated,
    })
  } catch (error: any) {
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    )
  }
}
