import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { hashPassword } from '@/lib/auth'

const DATA_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
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

  // 3. Team Members Table (CRUD)
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
      image_position TEXT DEFAULT '50% 30%',
      hover_image_position TEXT DEFAULT '50% 30%',
      projects_en TEXT,
      projects_fr TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 4. Practice Areas Table (CRUD)
  db.exec(`
    CREATE TABLE IF NOT EXISTS practice_areas (
      id TEXT PRIMARY KEY,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_fr TEXT NOT NULL,
      mobile_description_en TEXT,
      mobile_description_fr TEXT,
      link TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 5. Events Table (CRUD)
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

  // 6. Publications Table (CRUD)
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

  // 7. Custom Page Sections Table (CRUD for dynamic sections)
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_sections (
      id TEXT PRIMARY KEY,
      page_key TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      subtitle_en TEXT,
      subtitle_fr TEXT,
      content_en TEXT NOT NULL,
      content_fr TEXT NOT NULL,
      style_variant TEXT DEFAULT 'standard',
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 8. Practice Area Inner Projects & Case Studies Table (CRUD)
  db.exec(`
    CREATE TABLE IF NOT EXISTS practice_projects (
      id TEXT PRIMARY KEY,
      practice_area_slug TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_fr TEXT NOT NULL,
      tag_en TEXT,
      tag_fr TEXT,
      description_en TEXT NOT NULL,
      description_fr TEXT NOT NULL,
      image TEXT NOT NULL,
      image_type TEXT DEFAULT 'screenshot',
      link_url TEXT,
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
    } catch (err) {
      console.error('[CMS] Failed to seed default messages:', err)
    }
  }

  // Check if practice_areas has records
  const practiceCount = db.prepare('SELECT COUNT(*) as count FROM practice_areas').get() as { count: number }
  if (practiceCount.count === 0) {
    try {
      const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages/en.json'), 'utf8')).OurWork || {}
      const fr = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages/fr.json'), 'utf8')).OurWork || {}
      const defaultAreas = [
        {
          id: 'practice-1',
          link: '/our-work/digital-platforms',
          title_en: en.c1_title || 'Digital Platforms & Seed Sector Portals',
          title_fr: fr.c1_title || 'Plateformes Numériques et Portails Semenciers',
          desc_en: en.c1_desc || 'Custom digital platforms connecting farmers, seed companies, and regulatory bodies.',
          desc_fr: fr.c1_desc || 'Plateformes numériques connectant agriculteurs, semenciers et autorités réglementaires.',
          mobile_en: en.c1_mobile_desc || 'Custom digital portals for verified seeds and variety catalogues.',
          mobile_fr: fr.c1_mobile_desc || 'Portails numériques pour les semences certifiées.',
        },
        {
          id: 'practice-2',
          link: '/our-work/technical-studies',
          title_en: en.c2_title || 'Technical & Empirical Studies',
          title_fr: fr.c2_title || 'Études Techniques et Empiriques',
          desc_en: en.c2_desc || 'Rigorous field studies and analytical assessments informing policy and investment.',
          desc_fr: fr.c2_desc || 'Études de terrain rigoureuses et évaluations analytiques.',
          mobile_en: en.c2_mobile_desc || 'Analytical diagnostics on seed systems and market dynamics.',
          mobile_fr: fr.c2_mobile_desc || 'Diagnostics analytiques sur les systèmes semenciers.',
        },
        {
          id: 'practice-3',
          link: '/our-work/project-implementation',
          title_en: en.c3_title || 'Project Design & Implementation Support',
          title_fr: fr.c3_title || 'Conception et Mise en Œuvre de Projets',
          desc_en: en.c3_desc || 'Hands-on operational management delivering complex agricultural development projects.',
          desc_fr: fr.c3_desc || 'Gestion opérationnelle pratique de programmes de développement agricole.',
          mobile_en: en.c3_mobile_desc || 'Delivering complex multi-stakeholder seed interventions.',
          mobile_fr: fr.c3_mobile_desc || 'Gestion de projets semenciers multi-acteurs complexes.',
        },
        {
          id: 'practice-4',
          link: '/our-work/client-advisory',
          title_en: en.c4_title || 'Strategic Advisory & Scoping Missions',
          title_fr: fr.c4_title || 'Conseil Stratégique et Missions de Cadrage',
          desc_en: en.c4_desc || 'Expert advisory for governments, international donors, and commercial agribusinesses.',
          desc_fr: fr.c4_desc || 'Conseil expert pour gouvernements, bailleurs et entreprises semencières.',
          mobile_en: en.c4_mobile_desc || 'Navigating policy, regulatory reforms, and market entry.',
          mobile_fr: fr.c4_mobile_desc || 'Réformes réglementaires et stratégie d\'accès au marché.',
        },
        {
          id: 'practice-5',
          link: '/our-work/capacity-building',
          title_en: en.c5_title || 'Capacity Building & Institutional Training',
          title_fr: fr.c5_title || 'Renforcement des Capacités et Formations',
          desc_en: en.c5_desc || 'Empowering breeders, inspectors, and agrodealers through targeted executive training.',
          desc_fr: fr.c5_desc || 'Formation ciblée des sélectionneurs, inspecteurs et distributeurs.',
          mobile_en: en.c5_mobile_desc || 'Training seed companies and agrodealer associations.',
          mobile_fr: fr.c5_mobile_desc || 'Formation des entreprises et associations semencières.',
        },
        {
          id: 'practice-6',
          link: '/our-work/stakeholder-convenings',
          title_en: en.c6_title || 'Stakeholder Convenings & Policy Roundtables',
          title_fr: fr.c6_title || 'Rencontres Multi-acteurs et Tables Rondes',
          desc_en: en.c6_desc || 'Independent facilitation bringing public regulators and commercial enterprises together.',
          desc_fr: fr.c6_desc || 'Animation neutre de dialogues public-privé pour des réformes concrètes.',
          mobile_en: en.c6_mobile_desc || 'Consensus-building roundtables on seed regulations.',
          mobile_fr: fr.c6_mobile_desc || 'Tables rondes de consensus sur les réglementations semencières.',
        },
      ]

      const insertArea = db.prepare(`
        INSERT INTO practice_areas (id, title_en, title_fr, description_en, description_fr, mobile_description_en, mobile_description_fr, link, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      defaultAreas.forEach((area, idx) => {
        insertArea.run(
          area.id,
          area.title_en,
          area.title_fr,
          area.desc_en,
          area.desc_fr,
          area.mobile_en,
          area.mobile_fr,
          area.link,
          idx
        )
      })
      console.log('[CMS] Seeded 6 practice areas into SQLite')
    } catch (err) {
      console.error('[CMS] Failed to seed practice areas:', err)
    }
  }

  // Check if team_members has records
  const teamCount = db.prepare('SELECT COUNT(*) as count FROM team_members').get() as { count: number }
  if (teamCount.count === 0) {
    try {
      const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages/en.json'), 'utf8')).OurTeam || {}
      const fr = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages/fr.json'), 'utf8')).OurTeam || {}
      const defaultTeam = [
        {
          id: 'team-aline',
          name: en.aline_name || "Aline O'Connor",
          role_en: en.aline_role || 'Founder & Managing Director',
          role_fr: fr.aline_role || 'Fondatrice et Directrice Générale',
          bio_en: en.aline_bio || 'Global seed systems executive with over 30 years driving policy reforms, variety licensing, and agricultural market transformations across Africa.',
          bio_fr: fr.aline_bio || 'Dirigeante internationale des systèmes semenciers avec plus de 30 ans d\'expérience dans les réformes politiques et l\'accès au marché.',
          image: '/team/aline.png',
          image_position: '50% 35%',
          projects_en: en.aline_projects || 'Seed Regulatory Modernization, Early Generation Seed Financing, Commercial Licensing',
          projects_fr: fr.aline_projects || 'Modernisation de la réglementation semencière, Financement EGS, Licences commerciales',
        },
        {
          id: 'team-mulemia',
          name: en.mulemia_name || 'Mulemia Maina',
          role_en: en.mulemia_role || 'Senior Seed Systems & Operations Specialist',
          role_fr: fr.mulemia_role || 'Spécialiste Senior des Systèmes Semenciers et Opérations',
          bio_en: en.mulemia_bio || 'Agronomist and supply chain specialist leading field verification, quality control systems, and commercial breeding partnerships.',
          bio_fr: fr.mulemia_bio || 'Agronome et spécialiste des chaînes d\'approvisionnement semencières.',
          image: '/team/mulemia2.jpg',
          hover_image: '/team/mulemia.jpg',
          image_position: '54% 27%',
          projects_en: en.mulemia_projects || 'Private Inspection Protocols, Quality Assurance Training, Agrodealer Networks',
          projects_fr: fr.mulemia_projects || 'Protocoles d\'inspection privée, Assurance qualité, Réseaux d\'agro-distributeurs',
        },
        {
          id: 'team-jayne',
          name: en.jayne_name || 'Jayne Gathii',
          role_en: en.jayne_role || 'Agricultural Economics & Policy Advisor',
          role_fr: fr.jayne_role || 'Conseillère en Économie Agricole et Politiques',
          bio_en: en.jayne_bio || 'Expert in seed sector demand modeling, value chain economics, and cross-border trade harmonization.',
          bio_fr: fr.jayne_bio || 'Experte en modélisation de la demande et harmonisation du commerce transfrontalier.',
          image: '/team/jayne2.jpg',
          hover_image: '/team/jayne.jpg',
          image_position: '51% 27%',
          projects_en: en.jayne_projects || 'Market Demand Assessments, Variety Adoption Studies, Policy Briefs',
          projects_fr: fr.jayne_projects || 'Études de demande de marché, Adoption variétale, Notes de politique',
        },
        {
          id: 'team-ronald',
          name: en.ronald_name || 'Ronald Lwanga',
          role_en: en.ronald_role || 'Technical Studies & Field Operations Lead',
          role_fr: fr.ronald_role || 'Responsable des Études Techniques et Opérations de Terrain',
          bio_en: en.ronald_bio || 'Directs field evaluations, variety performance trials, and technical seed certification audits.',
          bio_fr: fr.ronald_bio || 'Dirige les évaluations de terrain, essais variétaux et audits de certification.',
          image: '/team/ronald2.jpg',
          hover_image: '/team/ronald.jpg',
          image_position: '52% 27%',
          projects_en: en.ronald_projects || 'Farmer Field Trials, Crop Variety Catalogs, Certification Support',
          projects_fr: fr.ronald_projects || 'Essais au champ, Catalogues de variétés, Appui à la certification',
        },
        {
          id: 'team-denis',
          name: en.denis_name || 'Denis Kyalo',
          role_en: en.denis_role || 'Seed Enterprise Finance & Advisory Lead',
          role_fr: fr.denis_role || 'Responsable Finance et Conseil aux Entreprises Semencières',
          bio_en: en.denis_bio || 'Advises emerging seed enterprises on unit economics, inventory financing, and working capital management.',
          bio_fr: fr.denis_bio || 'Conseille les entreprises semencières sur la rentabilité unitaire et le fonds de roulement.',
          image: '/team/denis2.jpg',
          hover_image: '/team/denis.jpg',
          image_position: '50% 27%',
          projects_en: en.denis_projects || 'African Seed Company Toolbox Coaching, Working Capital Models',
          projects_fr: fr.denis_projects || 'Accompagnement Boîte à Outils des Entreprises Semencières',
        },
        {
          id: 'team-moses',
          name: en.moses_name || 'Moses Nyabila',
          role_en: en.moses_role || 'Senior Agribusiness & Institutional Advisor',
          role_fr: fr.moses_role || 'Conseiller Senior en Agro-industrie et Institutions',
          bio_en: en.moses_bio || 'Coordinates high-level stakeholder dialogues, regulatory roundtables, and public-private seed partnerships.',
          bio_fr: fr.moses_bio || 'Coordonne les dialogues multi-acteurs et les partenariats public-privé.',
          image: '/team/moses2.jpg',
          hover_image: '/team/moses.jpg',
          image_position: '50% 26%',
          projects_en: en.moses_projects || 'National Seed Policy Roundtables, Institutional Capacity Diagnostics',
          projects_fr: fr.moses_projects || 'Tables rondes nationales sur la réglementation semencière',
        },
        {
          id: 'team-claire',
          name: en.claire_name || 'Claire Muriithi',
          role_en: en.claire_role || 'Research & Documentation Analyst',
          role_fr: fr.claire_role || 'Analyste de Recherche et Documentation',
          bio_en: en.claire_bio || 'Leads synthesis of agricultural research, policy documentation, and publication curation.',
          bio_fr: fr.claire_bio || 'Dirige la synthèse des recherches agricoles et la documentation des politiques.',
          image: '/team/claire2.jpg',
          hover_image: '/team/claire.jpg',
          image_position: '54% 31%',
          projects_en: en.claire_projects || 'Seed Sector Technical Studies, Case Study Documentation',
          projects_fr: fr.claire_projects || 'Études techniques du secteur semencier, Documentation de cas',
        },
        {
          id: 'team-nicholas',
          name: en.nicholas_name || 'Nicholas Kilonzo',
          role_en: en.nicholas_role || 'Digital Systems & Field Coordinator',
          role_fr: fr.nicholas_role || 'Coordinateur des Systèmes Numériques et Terrain',
          bio_en: en.nicholas_bio || 'Coordinates digital platforms, interactive variety catalogues, and regional field data collection.',
          bio_fr: fr.nicholas_bio || 'Coordonne les plateformes numériques et la collecte de données de terrain.',
          image: '/team/kilonzo2.jpg',
          hover_image: '/team/kilonzo.jpg',
          image_position: '48% 36%',
          projects_en: en.nicholas_projects || 'Mbegu Choice Platform, Plant Variety Lists, Digital Verification',
          projects_fr: fr.nicholas_projects || 'Plateforme Mbegu Choice, Catalogues variétaux numériques',
        },
      ]

      const insertMember = db.prepare(`
        INSERT INTO team_members (id, name, role_en, role_fr, bio_en, bio_fr, image, hover_image, image_position, projects_en, projects_fr, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      defaultTeam.forEach((member, idx) => {
        insertMember.run(
          member.id,
          member.name,
          member.role_en,
          member.role_fr,
          member.bio_en,
          member.bio_fr,
          member.image,
          member.hover_image || null,
          member.image_position,
          member.projects_en,
          member.projects_fr,
          idx
        )
      })
      console.log('[CMS] Seeded 8 team members into SQLite')
    } catch (err) {
      console.error('[CMS] Failed to seed team members:', err)
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

  // Check if practice_projects has records
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM practice_projects').get() as { count: number }
  if (projectCount.count === 0) {
    try {
      const defaultProjects = [
        // Digital Platforms
        {
          id: 'proj-dp-mbeguchoice',
          practice_area_slug: 'digital-platforms',
          title_en: 'MbeguChoice Platform',
          title_fr: 'Plateforme MbeguChoice',
          tag_en: 'Variety Information Portal',
          tag_fr: "Portail d'information variétale",
          description_en: 'Nationwide digital seed selection platform empowering Kenyan farmers and agrodealers to find certified crop varieties tailored to their ecological zones.',
          description_fr: 'Plateforme nationale de sélection de semences permettant aux agriculteurs et distributeurs kényans de trouver des variétés certifiées adaptées.',
          image: '/platforms/mbeguchoice.png',
          image_type: 'screenshot',
          link_url: 'https://mbeguchoice.com',
          sort_order: 1,
        },
        {
          id: 'proj-dp-africa-catalogue',
          practice_area_slug: 'digital-platforms',
          title_en: 'Africa Crop Variety Catalogue',
          title_fr: "Catalogue des variétés de cultures d'Afrique",
          tag_en: 'Regional Database',
          tag_fr: 'Base de données régionale',
          description_en: 'Centralized regional digital repository cataloguing commercial and release-stage crop varieties across East and Southern Africa.',
          description_fr: 'Répertoire numérique régional centralisé répertoriant les variétés commerciales en Afrique orientale et australe.',
          image: '/platforms/africa-crop-variety-catalogue.png',
          image_type: 'screenshot',
          link_url: 'https://varietycatalogues.com/about/',
          sort_order: 2,
        },
        {
          id: 'proj-dp-kenya-pvl',
          practice_area_slug: 'digital-platforms',
          title_en: 'Kenya Plant Variety List API',
          title_fr: 'API de la liste des variétés végétales du Kenya',
          tag_en: 'Official Registry & API',
          tag_fr: 'Registre officiel et API',
          description_en: 'Digitalized national plant variety list developed in partnership with KEPHIS for instant regulatory verification and variety lookup.',
          description_fr: 'Liste nationale des variétés végétales développée en partenariat avec le KEPHIS pour la vérification réglementaire.',
          image: '/platforms/kenya-plant-variety-list.png',
          image_type: 'screenshot',
          link_url: 'https://catalogueapi.varietycatalogues.com/',
          sort_order: 3,
        },
        {
          id: 'proj-dp-tanzania-inputs',
          practice_area_slug: 'digital-platforms',
          title_en: 'Tanzania Agri-Inputs Platform',
          title_fr: 'Plateforme des intrants agricoles de Tanzanie',
          tag_en: 'Agricultural Inputs Registry',
          tag_fr: 'Registre des intrants agricoles',
          description_en: 'Comprehensive portal supporting TOSCI in digitizing seed certification, agrodealer inspection, and farmer verification across Tanzania.',
          description_fr: "Portail complet soutenant TOSCI dans la numérisation de la certification semencière et de l'inspection des distributeurs.",
          image: '/platforms/tanzania-agri-inputs-platform.png',
          image_type: 'screenshot',
          link_url: 'https://tanzaniaagri-inputsplatform.com/',
          sort_order: 4,
        },
        {
          id: 'proj-dp-seed-sector-kenya',
          practice_area_slug: 'digital-platforms',
          title_en: 'Seed Sector Platform Kenya',
          title_fr: 'Plateforme du secteur semencier du Kenya',
          tag_en: 'Sector Analytics & Data',
          tag_fr: 'Analytique du secteur',
          description_en: 'Interactive data dashboard unifying multi-stakeholder seed statistics, trade flows, and production projections.',
          description_fr: 'Tableau de bord de données interactif unifiant les statistiques semencières et les flux commerciaux.',
          image: '/platforms/seed-sector-platform-kenya.png',
          image_type: 'screenshot',
          link_url: 'https://mbeguchoice.com',
          sort_order: 5,
        },
        {
          id: 'proj-dp-uganda-inputs',
          practice_area_slug: 'digital-platforms',
          title_en: 'Uganda Agri-Inputs Platform',
          title_fr: "Plateforme des intrants agricoles d'Ouganda",
          tag_en: 'Regional Expansion',
          tag_fr: 'Expansion régionale',
          description_en: 'Digital system supporting variety tracking and certified agrodealer distribution networks in Uganda.',
          description_fr: 'Système numérique de suivi variétal et de réseaux de distributeurs certifiés en Ouganda.',
          image: '/platforms/uganda-agri-inputs-platform.png',
          image_type: 'screenshot',
          link_url: 'https://varietycatalogues.com',
          sort_order: 6,
        },
        {
          id: 'proj-dp-m3-system',
          practice_area_slug: 'digital-platforms',
          title_en: 'Mulika Mbegu Mbovu (M3) Verification',
          title_fr: 'Vérification Mulika Mbegu Mbovu (M3)',
          tag_en: 'Anti-Counterfeit Protection',
          tag_fr: 'Protection anti-contrefaçon',
          description_en: 'Award-winning farmer reporting and SMS verification framework safeguarding smallholder producers from counterfeit seed packages.',
          description_fr: 'Cadre de vérification par SMS et signalement protégeant les petits producteurs contre les semences contrefaites.',
          image: '/m3-logo.svg',
          image_type: 'logo',
          link_url: '/resources/Empowering-Kenyan-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
          sort_order: 7,
        },

        // Technical Studies
        {
          id: 'proj-ts-pasture-fodder',
          practice_area_slug: 'technical-studies',
          title_en: 'Scoping Study: Pasture & Fodder Materials in Kenya',
          title_fr: "Étude d'opportunité : Matériel de pâturage et fourrage au Kenya",
          tag_en: 'Livestock Value Chain',
          tag_fr: "Chaîne de valeur de l'élevage",
          description_en: 'Comprehensive market diagnosis identifying certified forage seed bottlenecks, farmer demand drivers, and commercialization pathways.',
          description_fr: "Diagnostic de marché complet identifiant les goulots d'étranglement des semences fourragères certifiées.",
          image: '/resources/previews/preview-pasture-fodder.jpg',
          image_type: 'preview',
          link_url: '/resources/Scoping-Study-Pasture-and-Fodder-Planting-Materials-in-Kenya.pdf',
          sort_order: 1,
        },
        {
          id: 'proj-ts-value-chain-crops',
          practice_area_slug: 'technical-studies',
          title_en: 'Scoping Study: Planting Materials for Value Chain Crops',
          title_fr: "Étude d'opportunité : Matériel végétal pour cultures à haute valeur",
          tag_en: 'Horticulture & Crops',
          tag_fr: 'Horticulture et cultures',
          description_en: 'Assessment across banana, avocado, mango, pineapple, passion fruit, sweet potato, and African leafy vegetables.',
          description_fr: "Évaluation sur la banane, l'avocat, la mangue, l'ananas, le fruit de la passion et les légumes feuilles africains.",
          image: '/resources/previews/preview-value-chain-crops.jpg',
          image_type: 'preview',
          link_url: '/resources/Scoping-Study-Planting-Materials-for-Value-Chain-Crops-in-Kenya-banana-avocado-mango-pineapples-passion-fruit-sweet-potatoes-African-leafy-vegetables.pdf',
          sort_order: 2,
        },
        {
          id: 'proj-ts-horticulture-nurseries',
          practice_area_slug: 'technical-studies',
          title_en: 'Scoping Study: Seedling Nurseries as a Viable Business',
          title_fr: 'Étude : Pépinières de plants comme modèle économique viable',
          tag_en: 'Enterprise Economics',
          tag_fr: "Économie d'entreprise",
          description_en: 'Analysis of private seedling nurseries as commercial conduits for high-yielding fruit and vegetable clean planting materials.',
          description_fr: 'Analyse des pépinières privées comme vecteurs commerciaux de matériel végétal sain.',
          image: '/resources/previews/preview-horticulture-nurseries.jpg',
          image_type: 'preview',
          link_url: '/resources/Scoping-Study-Horticulture-Seedling-Nurseries-as-a-Viable-Business-Model-in-Kenya.pdf',
          sort_order: 3,
        },
        {
          id: 'proj-ts-agrodealer-assoc',
          practice_area_slug: 'technical-studies',
          title_en: 'Scoping Study: Agro-Dealer Association Development',
          title_fr: "Étude : Développement des associations d'agro-distributeurs",
          tag_en: 'Distribution Networks',
          tag_fr: 'Réseaux de distribution',
          description_en: 'Twelve-county baseline investigation evaluating last-mile input supply chains, business practices, and regulatory awareness.',
          description_fr: "Enquête de base dans douze comtés évaluant les chaînes d'approvisionnement du dernier kilomètre.",
          image: '/resources/previews/preview-agrodealer-associations.jpg',
          image_type: 'preview',
          link_url: '/resources/Scoping-Study-Agro-Dealer-Association-Development-in-Twelve-Counties-in-Kenya.pdf',
          sort_order: 4,
        },

        // Project Implementation
        {
          id: 'proj-pi-tasai-pilot',
          practice_area_slug: 'project-implementation',
          title_en: 'The African Seed Access Index (TASAI) Rollout',
          title_fr: "Déploiement de l'African Seed Access Index (TASAI)",
          tag_en: 'Multi-Country Implementation',
          tag_fr: 'Mise en œuvre multi-pays',
          description_en: 'Designed and implemented pilot field methodologies measuring seed industry vibrancy and regulatory efficiency across target African countries.',
          description_fr: "Conception et mise en œuvre de méthodologies pilotes mesurant la vitalité du secteur semencier en Afrique.",
          image: '/platforms/africa-crop-variety-catalogue.png',
          image_type: 'screenshot',
          link_url: '/our-work/project-implementation',
          sort_order: 1,
        },
        {
          id: 'proj-pi-kephis-verification',
          practice_area_slug: 'project-implementation',
          title_en: 'National Scratch-Off Seed Labeling Implementation',
          title_fr: 'Mise en œuvre des étiquettes à gratter pour semences certifiées',
          tag_en: 'Regulatory Field Ops',
          tag_fr: 'Opérations réglementaires',
          description_en: 'Field-level technical implementation of tamper-proof security labels in Kenya, establishing an operational verification pipeline.',
          description_fr: 'Mise en œuvre technique au champ des étiquettes de sécurité inviolables au Kenya.',
          image: '/m3-logo.svg',
          image_type: 'logo',
          link_url: '/resources/Case-Study-Scratch-Off-Labels-for-Certified-Seed-in-Kenya.pdf',
          sort_order: 2,
        },
        {
          id: 'proj-pi-variety-demonstrations',
          practice_area_slug: 'project-implementation',
          title_en: 'Crop Variety Performance Trials & Field Days',
          title_fr: 'Essais de performance variétale et journées au champ',
          tag_en: 'Field Demonstrations',
          tag_fr: 'Démonstrations de terrain',
          description_en: 'Multi-location farmer demonstration plots comparing newly released climate-smart hybrids against legacy cultivars.',
          description_fr: 'Parcelles de démonstration multi-sites comparant de nouveaux hybrides adaptés au climat.',
          image: '/platforms/tanzania-agri-inputs-platform.png',
          image_type: 'screenshot',
          link_url: '/our-work/project-implementation',
          sort_order: 3,
        },

        // Client Advisory
        {
          id: 'proj-ca-seed-policy',
          practice_area_slug: 'client-advisory',
          title_en: 'National Seed Policy & Regulatory Reform Advisory',
          title_fr: 'Conseil en politique semencière et réformes réglementaires',
          tag_en: 'Policy Advisory',
          tag_fr: 'Conseil en politiques',
          description_en: 'Guiding ministries of agriculture, donors, and regulatory authorities on seed law revisions, private inspection accreditation, and variety release protocols.',
          description_fr: "Accompagnement des ministères de l'agriculture et autorités sur la révision des lois semencières.",
          image: '/platforms/seed-sector-platform-kenya.png',
          image_type: 'screenshot',
          link_url: '/our-work/client-advisory',
          sort_order: 1,
        },
        {
          id: 'proj-ca-egs-economics',
          practice_area_slug: 'client-advisory',
          title_en: 'Early Generation Seed (EGS) Commercial Financing Models',
          title_fr: 'Modèles de financement commercial des semences EGS',
          tag_en: 'Financial Modeling',
          tag_fr: 'Modélisation financière',
          description_en: 'Advising institutional partners and research institutes on pricing structures, licensing royalties, and revolving fund mechanisms.',
          description_fr: 'Conseil aux partenaires institutionnels sur les redevances de licence et mécanismes de fonds renouvelables.',
          image: '/team/denis2.jpg',
          image_type: 'photo',
          link_url: '/our-work/client-advisory',
          sort_order: 2,
        },
        {
          id: 'proj-ca-variety-licensing',
          practice_area_slug: 'client-advisory',
          title_en: 'Public-Private Commercial Licensing Frameworks',
          title_fr: 'Cadres de licences commerciales public-privé',
          tag_en: 'Commercial Strategy',
          tag_fr: 'Stratégie commerciale',
          description_en: 'Structuring commercial licensing agreements between international CGIAR breeders and domestic African seed companies.',
          description_fr: "Structuration d'accords de licence commerciale entre sélectionneurs CGIAR et semenciers africains.",
          image: '/team/aline.png',
          image_type: 'photo',
          link_url: '/our-work/client-advisory',
          sort_order: 3,
        },

        // Capacity Building
        {
          id: 'proj-cb-seed-business',
          practice_area_slug: 'capacity-building',
          title_en: 'Seed Business Management Training (WACCI Partnership)',
          title_fr: "Formation en gestion d'entreprises semencières (WACCI)",
          tag_en: 'Executive Education',
          tag_fr: 'Formation exécutive',
          description_en: 'Executive coaching for plant breeding postgraduate students and seed enterprise managers on demand forecasting, inventory, and operations.',
          description_fr: 'Coaching exécutif pour étudiants en amélioration des plantes et gestionnaires semenciers.',
          image: '/team/mulemia2.jpg',
          image_type: 'photo',
          link_url: '/our-work/capacity-building',
          sort_order: 1,
        },
        {
          id: 'proj-cb-toolbox-program',
          practice_area_slug: 'capacity-building',
          title_en: 'The African Seed Company Toolbox (52 Tools)',
          title_fr: 'La boîte à outils des entreprises semencières africaines (52 outils)',
          tag_en: 'Standard Reference',
          tag_fr: 'Référence du secteur',
          description_en: "Authored by Aline O'Connor, this standard management curriculum equips seed executives across 20+ African nations with practical business frameworks.",
          description_fr: 'Rédigé par Aline O\'Connor, ce programme standard équipe les dirigeants semenciers dans plus de 20 pays.',
          image: '/team/aline.png',
          image_type: 'photo',
          link_url: '/our-work/capacity-building',
          sort_order: 2,
        },
        {
          id: 'proj-cb-agrodealer-coaching',
          practice_area_slug: 'capacity-building',
          title_en: 'Agrodealer Technical & Business Capability Program',
          title_fr: 'Programme de compétences techniques et commerciales des agro-distributeurs',
          tag_en: 'Last-Mile Training',
          tag_fr: 'Formation de proximité',
          description_en: 'Hands-on training modules for agro-input stockists on seed storage integrity, seed germination stewardship, and farmer advisory.',
          description_fr: "Modules de formation pratique pour distributeurs sur l'intégrité du stockage et le conseil aux agriculteurs.",
          image: '/team/ronald2.jpg',
          image_type: 'photo',
          link_url: '/our-work/capacity-building',
          sort_order: 3,
        },

        // Stakeholder Convenings
        {
          id: 'proj-sc-regulatory-roundtable',
          practice_area_slug: 'stakeholder-convenings',
          title_en: 'Regional Seed Regulatory Harmonization Roundtables',
          title_fr: "Tables rondes régionales d'harmonisation réglementaire semencière",
          tag_en: 'Regional Dialogue',
          tag_fr: 'Dialogue régional',
          description_en: 'Facilitating high-level diplomatic and technical convenings to align seed certification, variety cataloguing, and cross-border trade standards.',
          description_fr: 'Facilitation de rencontres diplomatiques et techniques pour harmoniser les normes de certification semencière.',
          image: '/team/moses2.jpg',
          image_type: 'photo',
          link_url: '/our-work/stakeholder-convenings',
          sort_order: 1,
        },
        {
          id: 'proj-sc-study-tours',
          practice_area_slug: 'stakeholder-convenings',
          title_en: 'International Seed Industry Learning Trips & Study Tours',
          title_fr: "Voyages d'études et visites d'apprentissage internationales",
          tag_en: 'Immersive Study Tours',
          tag_fr: "Voyages d'études",
          description_en: 'Designing experiential benchmarking missions for African regulators and executives to leading global seed hubs in the Netherlands, South Africa, and Kenya.',
          description_fr: 'Missions d\'étalonnage pour régulateurs et dirigeants auprès de pôles semenciers mondiaux.',
          image: '/team/mulemia2.jpg',
          image_type: 'photo',
          link_url: '/our-work/stakeholder-convenings',
          sort_order: 2,
        },
        {
          id: 'proj-sc-industry-assemblies',
          practice_area_slug: 'stakeholder-convenings',
          title_en: 'National Seed Trade Association Strategic Assemblies',
          title_fr: 'Assemblées stratégiques des associations semencières nationales',
          tag_en: 'Industry Leadership',
          tag_fr: 'Leadership industriel',
          description_en: 'Convening private seed companies, breeders, and policymakers to establish shared investment priorities and advocacy agendas.',
          description_fr: "Rassemblement des semenciers privés et décideurs pour établir des priorités d'investissement communes.",
          image: '/team/claire2.jpg',
          image_type: 'photo',
          link_url: '/our-work/stakeholder-convenings',
          sort_order: 3,
        },
      ]

      const insertProj = db.prepare(`
        INSERT INTO practice_projects (
          id, practice_area_slug, title_en, title_fr, tag_en, tag_fr,
          description_en, description_fr, image, image_type, link_url, sort_order
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      defaultProjects.forEach((proj, idx) => {
        insertProj.run(
          proj.id,
          proj.practice_area_slug,
          proj.title_en,
          proj.title_fr,
          proj.tag_en,
          proj.tag_fr,
          proj.description_en,
          proj.description_fr,
          proj.image,
          proj.image_type,
          proj.link_url,
          proj.sort_order ?? idx
        )
      })
      console.log(`[CMS] Seeded ${defaultProjects.length} practice projects into SQLite`)
    } catch (err) {
      console.error('[CMS] Failed to seed practice projects:', err)
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

// Team Members CRUD Query Helpers
export function getAllTeamMembers(includeUnpublished = false): any[] {
  try {
    const db = getDb()
    const query = includeUnpublished
      ? 'SELECT * FROM team_members ORDER BY sort_order ASC, updated_at DESC'
      : 'SELECT * FROM team_members WHERE is_published = 1 ORDER BY sort_order ASC'
    return db.prepare(query).all()
  } catch (err) {
    console.error('[CMS] Failed to get team members:', err)
    return []
  }
}

export function upsertTeamMember(member: any): boolean {
  try {
    const db = getDb()
    const id = member.id || `team-${Date.now()}`
    db.prepare(`
      INSERT INTO team_members (
        id, name, role_en, role_fr, bio_en, bio_fr, image, hover_image,
        image_position, hover_image_position, projects_en, projects_fr,
        sort_order, is_published, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        role_en = excluded.role_en,
        role_fr = excluded.role_fr,
        bio_en = excluded.bio_en,
        bio_fr = excluded.bio_fr,
        image = excluded.image,
        hover_image = excluded.hover_image,
        image_position = excluded.image_position,
        hover_image_position = excluded.hover_image_position,
        projects_en = excluded.projects_en,
        projects_fr = excluded.projects_fr,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      member.name,
      member.role_en,
      member.role_fr || member.role_en,
      member.bio_en,
      member.bio_fr || member.bio_en,
      member.image,
      member.hover_image || null,
      member.image_position || '50% 30%',
      member.hover_image_position || '50% 30%',
      member.projects_en || '',
      member.projects_fr || member.projects_en || '',
      member.sort_order ?? 0,
      member.is_published ?? 1
    )
    return true
  } catch (err) {
    console.error('[CMS] Failed to upsert team member:', err)
    return false
  }
}

export function deleteTeamMember(id: string): boolean {
  try {
    const db = getDb()
    db.prepare('DELETE FROM team_members WHERE id = ?').run(id)
    return true
  } catch (err) {
    console.error('[CMS] Failed to delete team member:', err)
    return false
  }
}

// Practice Areas CRUD Query Helpers
export function getAllPracticeAreas(includeUnpublished = false): any[] {
  try {
    const db = getDb()
    const query = includeUnpublished
      ? 'SELECT * FROM practice_areas ORDER BY sort_order ASC'
      : 'SELECT * FROM practice_areas WHERE is_published = 1 ORDER BY sort_order ASC'
    return db.prepare(query).all()
  } catch (err) {
    console.error('[CMS] Failed to get practice areas:', err)
    return []
  }
}

export function upsertPracticeArea(area: any): boolean {
  try {
    const db = getDb()
    const id = area.id || `practice-${Date.now()}`
    db.prepare(`
      INSERT INTO practice_areas (
        id, title_en, title_fr, description_en, description_fr,
        mobile_description_en, mobile_description_fr, link, sort_order, is_published, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        title_en = excluded.title_en,
        title_fr = excluded.title_fr,
        description_en = excluded.description_en,
        description_fr = excluded.description_fr,
        mobile_description_en = excluded.mobile_description_en,
        mobile_description_fr = excluded.mobile_description_fr,
        link = excluded.link,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      area.title_en,
      area.title_fr || area.title_en,
      area.description_en,
      area.description_fr || area.description_en,
      area.mobile_description_en || area.description_en,
      area.mobile_description_fr || area.description_fr || area.description_en,
      area.link,
      area.sort_order ?? 0,
      area.is_published ?? 1
    )
    return true
  } catch (err) {
    console.error('[CMS] Failed to upsert practice area:', err)
    return false
  }
}

export function deletePracticeArea(id: string): boolean {
  try {
    const db = getDb()
    db.prepare('DELETE FROM practice_areas WHERE id = ?').run(id)
    return true
  } catch (err) {
    console.error('[CMS] Failed to delete practice area:', err)
    return false
  }
}

// Publications CRUD Query Helpers
export function getAllPublications(includeUnpublished = false): any[] {
  try {
    const db = getDb()
    const query = includeUnpublished
      ? 'SELECT * FROM publications ORDER BY sort_order ASC'
      : 'SELECT * FROM publications WHERE is_published = 1 ORDER BY sort_order ASC'
    return db.prepare(query).all()
  } catch (err) {
    console.error('[CMS] Failed to get publications:', err)
    return []
  }
}

export function upsertPublication(pub: any): boolean {
  try {
    const db = getDb()
    const id = pub.id || `pub-${Date.now()}`
    db.prepare(`
      INSERT INTO publications (
        id, title_en, title_fr, category_en, category_fr,
        client_en, client_fr, citation_en, citation_fr, link, sort_order, is_published, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        title_en = excluded.title_en,
        title_fr = excluded.title_fr,
        category_en = excluded.category_en,
        category_fr = excluded.category_fr,
        client_en = excluded.client_en,
        client_fr = excluded.client_fr,
        citation_en = excluded.citation_en,
        citation_fr = excluded.citation_fr,
        link = excluded.link,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      pub.title_en,
      pub.title_fr || pub.title_en,
      pub.category_en,
      pub.category_fr || pub.category_en,
      pub.client_en || 'Agri Experience',
      pub.client_fr || pub.client_en || 'Agri Experience',
      pub.citation_en || '',
      pub.citation_fr || pub.citation_en || '',
      pub.link,
      pub.sort_order ?? 0,
      pub.is_published ?? 1
    )
    return true
  } catch (err) {
    console.error('[CMS] Failed to upsert publication:', err)
    return false
  }
}

export function deletePublication(id: string): boolean {
  try {
    const db = getDb()
    db.prepare('DELETE FROM publications WHERE id = ?').run(id)
    return true
  } catch (err) {
    console.error('[CMS] Failed to delete publication:', err)
    return false
  }
}

// Custom Page Sections CRUD Query Helpers
export function getCustomSectionsByPage(pageKey: string, includeUnpublished = false): any[] {
  try {
    const db = getDb()
    const query = includeUnpublished
      ? 'SELECT * FROM custom_sections WHERE page_key = ? ORDER BY sort_order ASC'
      : 'SELECT * FROM custom_sections WHERE page_key = ? AND is_published = 1 ORDER BY sort_order ASC'
    return db.prepare(query).all(pageKey.toLowerCase())
  } catch (err) {
    console.error('[CMS] Failed to get custom sections:', err)
    return []
  }
}

export function upsertCustomSection(section: any): boolean {
  try {
    const db = getDb()
    const id = section.id || `sec-${Date.now()}`
    db.prepare(`
      INSERT INTO custom_sections (
        id, page_key, title_en, title_fr, subtitle_en, subtitle_fr,
        content_en, content_fr, style_variant, sort_order, is_published, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        page_key = excluded.page_key,
        title_en = excluded.title_en,
        title_fr = excluded.title_fr,
        subtitle_en = excluded.subtitle_en,
        subtitle_fr = excluded.subtitle_fr,
        content_en = excluded.content_en,
        content_fr = excluded.content_fr,
        style_variant = excluded.style_variant,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      section.page_key.toLowerCase(),
      section.title_en,
      section.title_fr || section.title_en,
      section.subtitle_en || null,
      section.subtitle_fr || section.subtitle_en || null,
      section.content_en,
      section.content_fr || section.content_en,
      section.style_variant || 'standard',
      section.sort_order ?? 0,
      section.is_published ?? 1
    )
    return true
  } catch (err) {
    console.error('[CMS] Failed to upsert custom section:', err)
    return false
  }
}

export function deleteCustomSection(id: string): boolean {
  try {
    const db = getDb()
    db.prepare('DELETE FROM custom_sections WHERE id = ?').run(id)
    return true
  } catch (err) {
    console.error('[CMS] Failed to delete custom section:', err)
    return false
  }
}

// Practice Area Inner Projects & Case Studies CRUD Query Helpers
export function getAllPracticeProjects(practiceAreaSlug?: string, includeUnpublished = false): any[] {
  try {
    const db = getDb()
    if (practiceAreaSlug && practiceAreaSlug !== 'all') {
      const query = includeUnpublished
        ? 'SELECT * FROM practice_projects WHERE practice_area_slug = ? ORDER BY sort_order ASC, updated_at DESC'
        : 'SELECT * FROM practice_projects WHERE practice_area_slug = ? AND is_published = 1 ORDER BY sort_order ASC'
      return db.prepare(query).all(practiceAreaSlug)
    }
    const query = includeUnpublished
      ? 'SELECT * FROM practice_projects ORDER BY practice_area_slug ASC, sort_order ASC, updated_at DESC'
      : 'SELECT * FROM practice_projects WHERE is_published = 1 ORDER BY practice_area_slug ASC, sort_order ASC'
    return db.prepare(query).all()
  } catch (err) {
    console.error('[CMS] Failed to get practice projects:', err)
    return []
  }
}

export function upsertPracticeProject(project: any): boolean {
  try {
    const db = getDb()
    const id = project.id || `proj-${Date.now()}`
    db.prepare(`
      INSERT INTO practice_projects (
        id, practice_area_slug, title_en, title_fr, tag_en, tag_fr,
        description_en, description_fr, image, image_type, link_url,
        sort_order, is_published, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        practice_area_slug = excluded.practice_area_slug,
        title_en = excluded.title_en,
        title_fr = excluded.title_fr,
        tag_en = excluded.tag_en,
        tag_fr = excluded.tag_fr,
        description_en = excluded.description_en,
        description_fr = excluded.description_fr,
        image = excluded.image,
        image_type = excluded.image_type,
        link_url = excluded.link_url,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      id,
      project.practice_area_slug,
      project.title_en,
      project.title_fr || project.title_en,
      project.tag_en || null,
      project.tag_fr || project.tag_en || null,
      project.description_en,
      project.description_fr || project.description_en,
      project.image,
      project.image_type || 'screenshot',
      project.link_url || null,
      project.sort_order ?? 0,
      project.is_published ?? 1
    )
    return true
  } catch (err) {
    console.error('[CMS] Failed to upsert practice project:', err)
    return false
  }
}

export function deletePracticeProject(id: string): boolean {
  try {
    const db = getDb()
    db.prepare('DELETE FROM practice_projects WHERE id = ?').run(id)
    return true
  } catch (err) {
    console.error('[CMS] Failed to delete practice project:', err)
    return false
  }
}
