import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import {
  generateTeamNotificationEmail,
  generateRespondentAcknowledgmentEmail,
  ContactSubmission,
} from '@/lib/email'

const sampleSubmissionEn: ContactSubmission = {
  name: 'Dr. Sarah Jenkins',
  email: 's.jenkins@agri-foundation.org',
  organization: 'African Agricultural Development Fund',
  message:
    'Dear Agri Experience Team,\n\nWe are preparing a regional seed sector scoping review covering 5 countries in Eastern and Southern Africa. We would like to explore advisory collaboration with your senior specialists regarding seed quality assurance frameworks and digital certification workflows.\n\nCould we schedule an exploratory discussion with your leadership next week?',
  locale: 'en',
}

const sampleSubmissionFr: ContactSubmission = {
  name: 'Jean-Paul Kouassi',
  email: 'jp.kouassi@coop-semences.ci',
  organization: 'Union Nationale des Producteurs Semenciers',
  message:
    'Bonjour à toute l\'équipe Agri Experience,\n\nNous sollicitons votre expertise pour accompagner la modernisation de notre système de traçabilité des semences certifiées et le renforcement des capacités des inspecteurs semenciers privés.\n\nSerait-il possible de recevoir vos références sur des projets similaires en Afrique de l\'Ouest ?',
  locale: 'fr',
}

function getLogoDataUri(): string {
  try {
    const logoPath = path.join(process.cwd(), 'public/agri-experience-logo.png')
    if (fs.existsSync(logoPath)) {
      const buffer = fs.readFileSync(logoPath)
      return `data:image/png;base64,${buffer.toString('base64')}`
    }
  } catch (err) {
    console.error('Failed to read logo for preview:', err)
  }
  return '/agri-experience-logo.png'
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  const lang = searchParams.get('lang') || 'en'
  const view = searchParams.get('view')

  const logoDataUri = getLogoDataUri()

  // Return raw template HTML if requested
  if (type === 'team') {
    const { html } = generateTeamNotificationEmail(lang === 'fr' ? sampleSubmissionFr : sampleSubmissionEn)
    const previewHtml = html.replace(/cid:agri-experience-logo/g, logoDataUri)
    return new NextResponse(previewHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  if (type === 'respondent') {
    const { html } = generateRespondentAcknowledgmentEmail(lang === 'fr' ? sampleSubmissionFr : sampleSubmissionEn)
    const previewHtml = html.replace(/cid:agri-experience-logo/g, logoDataUri)
    return new NextResponse(previewHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // Interactive Tabbed Preview Dashboard
  const dashboardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agri Experience • Email Design Previewer</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .topbar { background: #1e293b; border-bottom: 1px solid #334155; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-title { font-weight: 700; font-size: 15px; color: #ffffff; letter-spacing: -0.01em; }
    .brand-badge { background: #1A4D2E; color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }
    .tabs { display: flex; gap: 6px; background: #0f172a; padding: 4px; border-radius: 8px; border: 1px solid #334155; }
    .tab-btn { background: transparent; border: none; color: #94a3b8; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s ease; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
    .tab-btn:hover { color: #f8fafc; background: #1e293b; }
    .tab-btn.active { background: #1A4D2E; color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
    .controls { display: flex; align-items: center; gap: 8px; }
    .device-btn { background: #334155; border: 1px solid #475569; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
    .device-btn.active { background: #2563eb; border-color: #3b82f6; }
    .main { flex: 1; display: flex; justify-content: center; align-items: center; background: #090d16; padding: 24px; overflow: hidden; }
    .preview-container { height: 100%; transition: all 0.3s ease; box-shadow: 0 10px 40px rgba(0,0,0,0.5); border-radius: 12px; overflow: hidden; background: #ffffff; width: 100%; max-width: 850px; }
    .preview-container.mobile { max-width: 414px; border-radius: 36px; border: 10px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.6); height: 90%; }
    iframe { width: 100%; height: 100%; border: none; background: #ffffff; }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand">
      <span class="brand-title">Agri Experience Email Previewer</span>
      <span class="brand-badge">Live Preview</span>
    </div>

    <div class="tabs">
      <button class="tab-btn active" onclick="switchView('team', 'en', this)">
        📥 Team Notification (info@)
      </button>
      <button class="tab-btn" onclick="switchView('respondent', 'en', this)">
        ✉️ Respondent Receipt (English)
      </button>
      <button class="tab-btn" onclick="switchView('respondent', 'fr', this)">
        ✉️ Respondent Receipt (Français)
      </button>
    </div>

    <div class="controls">
      <button class="device-btn active" id="btn-desktop" onclick="setDevice('desktop')">🖥️ Desktop</button>
      <button class="device-btn" id="btn-mobile" onclick="setDevice('mobile')">📱 Mobile</button>
      <a id="btn-raw" href="/api/email-preview?type=team" target="_blank" class="device-btn" style="text-decoration: none;">↗ Open Tab</a>
    </div>
  </header>

  <main class="main">
    <div class="preview-container" id="frame-box">
      <iframe id="preview-iframe" src="/api/email-preview?type=team"></iframe>
    </div>
  </main>

  <script>
    let currentType = 'team';
    let currentLang = 'en';

    function switchView(type, lang, element) {
      currentType = type;
      currentLang = lang;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      element.classList.add('active');

      const url = '/api/email-preview?type=' + type + '&lang=' + lang;
      document.getElementById('preview-iframe').src = url;
      document.getElementById('btn-raw').href = url;
    }

    function setDevice(device) {
      const box = document.getElementById('frame-box');
      const btnDesk = document.getElementById('btn-desktop');
      const btnMob = document.getElementById('btn-mobile');

      if (device === 'mobile') {
        box.classList.add('mobile');
        btnMob.classList.add('active');
        btnDesk.classList.remove('active');
      } else {
        box.classList.remove('mobile');
        btnDesk.classList.add('active');
        btnMob.classList.remove('active');
      }
    }
  </script>
</body>
</html>
`

  return new NextResponse(dashboardHtml, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
