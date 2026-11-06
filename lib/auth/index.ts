import crypto from 'crypto'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'ae-secret-super-secure-admin-token-2026-agri-exp-key'
const COOKIE_NAME = 'ae_admin_session'

export interface AdminUser {
  id: number
  email: string
  name: string
}

/**
 * Hash a password using scrypt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

/**
 * Verify password against stored scrypt hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':')
    if (!salt || !key) return false
    const keyBuffer = Buffer.from(key, 'hex')
    const derivedKey = crypto.scryptSync(password, salt, 64)
    return crypto.timingSafeEqual(keyBuffer, derivedKey)
  } catch {
    return false
  }
}

/**
 * Create a signed session token
 */
export function createSessionToken(user: AdminUser): string {
  const payload = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  })
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(payload)
  const signature = hmac.digest('base64url')
  const encodedPayload = Buffer.from(payload).toString('base64url')
  return `${encodedPayload}.${signature}`
}

/**
 * Verify a signed session token
 */
export function verifySessionToken(token: string): AdminUser | null {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (!encodedPayload || !signature) return null

    const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8')
    const hmac = crypto.createHmac('sha256', SESSION_SECRET)
    hmac.update(payload)
    const expectedSig = hmac.digest('base64url')

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null
    }

    const data = JSON.parse(payload)
    if (!data.exp || data.exp < Date.now()) {
      return null // Expired
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
    }
  } catch {
    return null
  }
}

/**
 * Get current admin user from cookies in server components/actions
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

