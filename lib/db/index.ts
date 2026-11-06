import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { hashPassword } from '@/lib/auth'

const DATA_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'cms.db')

// Global singleton to prevent multiple open connections during dev hot-reloads
let dbInstance: Database.Database | null = null

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH)
    dbInstance.pragma('journal_mode = WAL')
    dbInstance.pragma('foreign_keys = ON')
    initSchema(dbInstance)
  }
  return dbInstance
}

function initSchema(db: Database.Database) {
  // 1. Admin Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 2. Generic Page Section Key-Value Document Store
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_sections (
      page_key TEXT NOT NULL,
      section_key TEXT NOT NULL,
      locale TEXT NOT NULL,
      data_json TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (page_key, section_key, locale)
    );
  `)

  // 3. Team Members Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_fr TEXT NOT NULL,
      bio_en TEXT NOT NULL,
      bio_fr TEXT NOT NULL,
      image TEXT NOT NULL,
      hover_image TEXT,
      image_position TEXT,
      hover_image_position TEXT,
      projects_en TEXT,
      projects_fr TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 4. Events Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      window_en TEXT,
      window_fr TEXT,
      format_key TEXT NOT NULL,
      region_key TEXT,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      location_en TEXT NOT NULL,
      location_fr TEXT NOT NULL,
      country TEXT NOT NULL,
      flag TEXT NOT NULL,
      mode_en TEXT,
      mode_fr TEXT,
      summary_en TEXT NOT NULL,
      summary_fr TEXT NOT NULL,
      delegation_en TEXT,
      delegation_fr TEXT,
      partners_en TEXT,
      partners_fr TEXT,
      themes_en TEXT,
      themes_fr TEXT,
      metric_badge_en TEXT,
      metric_badge_fr TEXT,
      outcome_en TEXT,
      outcome_fr TEXT,
      image TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 5. Publications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS publications (
      id TEXT PRIMARY KEY,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      category_en TEXT NOT NULL,
      category_fr TEXT NOT NULL,
      client_en TEXT,
      client_fr TEXT,
      citation_en TEXT,
      citation_fr TEXT,
      link TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 6. Gallery Photos Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery_photos (
      id TEXT PRIMARY KEY,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      location TEXT NOT NULL,
      country TEXT NOT NULL,
      flag TEXT NOT NULL,
      year TEXT NOT NULL,
      caption_en TEXT NOT NULL,
      caption_fr TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  seedDefaultsIfNeeded(db)
}

function seedDefaultsIfNeeded(db: Database.Database) {
  // Check if default admin exists
  const userCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number }
  if (userCount.count === 0) {
    const defaultEmail = 'admin@agri-experience.com'
    const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AgriExperience2026!'
    const hash = hashPassword(defaultPassword)
    db.prepare('INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)')
      .run(defaultEmail, hash, 'Agri Experience Admin')
    console.log(`[CMS] Initialized default admin user: ${defaultEmail}`)
  }

  // Check if page_sections has any records
  const sectionsCount = db.prepare('SELECT COUNT(*) as count FROM page_sections').get() as { count: number }
  if (sectionsCount.count === 0) {
    try {
      const enRaw = fs.readFileSync(path.join(process.cwd(), 'messages/en.json'), 'utf8')
      const frRaw = fs.readFileSync(path.join(process.cwd(), 'messages/fr.json'), 'utf8')
      const en = JSON.parse(enRaw)
      const fr = JSON.parse(frRaw)

      const insertSection = db.prepare(
        'INSERT OR REPLACE INTO page_sections (page_key, section_key, locale, data_json) VALUES (?, ?, ?, ?)'
      )

      const pagesToSeed = ['Home', 'About', 'OurWork', 'OurImpact', 'Events', 'Resources', 'Contact', 'Header', 'Footer']
      
      for (const page of pagesToSeed) {
        if (en[page]) {
          insertSection.run(page.toLowerCase(), 'main', 'en', JSON.stringify(en[page]))
        }
        if (fr[page]) {
          insertSection.run(page.toLowerCase(), 'main', 'fr', JSON.stringify(fr[page]))
        }
      }
      console.log('[CMS] Seeded initial page_sections from messages JSON')
    } catch (err) {
      console.error('[CMS] Failed to seed default messages:', err)
    }
  }

  // Check if publications has records
  const pubCount = db.prepare('SELECT COUNT(*) as count FROM publications').get() as { count: number }
  if (pubCount.count === 0) {
    try {
      const { publicDownloads } = require('@/lib/public-downloads')
      const insertPub = db.prepare(`
        INSERT INTO publications (id, title_en, title_fr, category_en, category_fr, client_en, client_fr, citation_en, citation_fr, link, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      publicDownloads.forEach((pub: any, idx: number) => {
        insertPub.run(
          `pub-${idx + 1}`,
          pub.title,
          pub.title,
          pub.category,
          pub.category,
          pub.client || 'Agri Experience',
          pub.client || 'Agri Experience',
          pub.citation || '',
          pub.citation || '',
          pub.link,
          idx
        )
      })
      console.log(`[CMS] Seeded ${publicDownloads.length} publications into SQLite`)
    } catch (err) {
      console.error('[CMS] Failed to seed publications:', err)
    }
  }
}

// =========================================================================
// Query Helpers for Server Components & Actions
// =========================================================================

export function getPageSectionData<T = any>(pageKey: string, sectionKey: string, locale: string): T | null {
  try {
    const db = getDb()
    const row = db
      .prepare('SELECT data_json FROM page_sections WHERE page_key = ? AND section_key = ? AND locale = ?')
      .get(pageKey.toLowerCase(), sectionKey.toLowerCase(), locale) as { data_json: string } | undefined
    if (row?.data_json) {
      return JSON.parse(row.data_json) as T
    }
    return null
  } catch (err) {
    console.error(`[CMS] Error fetching ${pageKey}.${sectionKey}.${locale}:`, err)
    return null
  }
}

export function savePageSectionData(pageKey: string, sectionKey: string, locale: string, data: any): boolean {
  try {
    const db = getDb()
    db.prepare(`
      INSERT INTO page_sections (page_key, section_key, locale, data_json, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(page_key, section_key, locale) DO UPDATE SET
        data_json = excluded.data_json,
        updated_at = CURRENT_TIMESTAMP
    `).run(pageKey.toLowerCase(), sectionKey.toLowerCase(), locale, JSON.stringify(data))
    return true
  } catch (err) {
    console.error(`[CMS] Error saving ${pageKey}.${sectionKey}.${locale}:`, err)
    return false
  }
}

export function getAllPageSections(pageKey: string): { en: any; fr: any } {
  return {
    en: getPageSectionData(pageKey, 'main', 'en'),
    fr: getPageSectionData(pageKey, 'main', 'fr'),
  }
}

