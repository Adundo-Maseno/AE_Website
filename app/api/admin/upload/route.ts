import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const user = await getCurrentAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Sanitize filename and append timestamp
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-')
    const finalFilename = `${Date.now()}-${safeName}`
    const filePath = path.join(uploadsDir, finalFilename)

    fs.writeFileSync(filePath, buffer)

    const publicUrl = `/uploads/${finalFilename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.size,
    })
  } catch (err: any) {
    console.error('[Upload Error]', err)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}

