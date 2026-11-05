#!/usr/bin/env node

/**
 * Generates standalone HTML preview files for all email templates and opens them in your browser.
 * Usage: node scripts/preview-emails.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getLogoDataUri() {
  const logoPath = path.join(process.cwd(), 'public/agri-experience-logo.png');
  if (fs.existsSync(logoPath)) {
    const buffer = fs.readFileSync(logoPath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  }
  return '/agri-experience-logo.png';
}

const logoUri = getLogoDataUri();

const sampleSubmissionEn = {
  name: 'Dr. Sarah Jenkins',
  email: 's.jenkins@agri-foundation.org',
  organization: 'African Agricultural Development Fund',
  message:
    'Dear Agri Experience Team,\n\nWe are preparing a regional seed sector scoping review covering 5 countries in Eastern and Southern Africa. We would like to explore advisory collaboration with your senior specialists regarding seed quality assurance frameworks and digital certification workflows.\n\nCould we schedule an exploratory discussion with your leadership next week?',
  locale: 'en',
};

const sampleSubmissionFr = {
  name: 'Jean-Paul Kouassi',
  email: 'jp.kouassi@coop-semences.ci',
  organization: 'Union Nationale des Producteurs Semenciers',
  message:
    "Bonjour à toute l'équipe Agri Experience,\n\nNous sollicitons votre expertise pour accompagner la modernisation de notre système de traçabilité des semences certifiées et le renforcement des capacités des inspecteurs semenciers privés.\n\nSerait-il possible de recevoir vos références sur des projets similaires en Afrique de l'Ouest ?",
  locale: 'fr',
};

// 1. Generate Team Notification HTML
const teamHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Website Inquiry] ${sampleSubmissionEn.name} (${sampleSubmissionEn.organization})</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2b2b2b; margin: 0; padding: 0; background-color: #F4F6F3; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #F4F6F3; padding: 32px 12px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #E6EAE3; box-shadow: 0 4px 20px rgba(26, 77, 46, 0.06); }
    .accent-bar { height: 5px; background: linear-gradient(90deg, #1A4D2E 0%, #3AB44A 50%, #2484C6 100%); }
    .header { padding: 32px 32px 24px 32px; text-align: center; background: #ffffff; border-bottom: 1px solid #F0F3EE; }
    .badge { display: inline-block; background: #EAF4EC; color: #1A4D2E; border: 1px solid #CDE5D2; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-top: 16px; }
    .header h1 { margin: 12px 0 4px 0; font-size: 22px; font-weight: 700; color: #1A4D2E; }
    .header p { margin: 0; font-size: 13px; color: #64748b; }
    .content { padding: 32px; }
    .info-card { background: #FAFBF9; border: 1px solid #E8EDE5; border-radius: 10px; overflow: hidden; margin-bottom: 24px; }
    .info-table { width: 100%; border-collapse: collapse; }
    .info-table td { padding: 12px 16px; font-size: 13.5px; border-bottom: 1px solid #EFF3EC; }
    .info-table tr:last-child td { border-bottom: none; }
    .info-table td.label { font-weight: 600; color: #526053; width: 135px; background: #F6F8F4; }
    .info-table td.value { color: #1f2937; }
    .message-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #1A4D2E; margin-bottom: 8px; }
    .message-box { background: #FAFBF9; border: 1px solid #E8EDE5; border-left: 4px solid #3AB44A; padding: 20px; border-radius: 8px; font-size: 14.5px; color: #1f2937; line-height: 1.7; }
    .btn-wrap { text-align: center; margin: 32px 0 8px 0; }
    .reply-btn { display: inline-block; background: #1A4D2E; color: #ffffff !important; padding: 13px 32px; border-radius: 50px; font-weight: 700; font-size: 14px; text-decoration: none; box-shadow: 0 3px 10px rgba(26, 77, 46, 0.2); }
    .reply-hint { font-size: 12px; color: #8a968a; margin-top: 10px; }
    .footer { padding: 24px 32px; background: #F9FAF8; border-top: 1px solid #EAEFE7; font-size: 12px; color: #6c7a6d; text-align: center; line-height: 1.6; }
    .footer a { color: #2484C6; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="accent-bar"></div>
      <div class="header">
        <a href="https://agri-experience.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
          <img src="${logoUri}" alt="Agri Experience" width="180" style="display: block; margin: 0 auto; width: 180px; max-width: 180px; height: auto; border: 0;" />
        </a>
        <br/>
        <span class="badge">New Website Inquiry</span>
        <h1>Contact Form Submission</h1>
        <p>Received through the official website contact portal</p>
      </div>
      <div class="content">
        <div class="info-card">
          <table class="info-table">
            <tr>
              <td class="label">Sender Name</td>
              <td class="value"><strong>${sampleSubmissionEn.name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value"><a href="mailto:${sampleSubmissionEn.email}" style="color: #2484C6; font-weight: 600; text-decoration: none;">${sampleSubmissionEn.email}</a></td>
            </tr>
            <tr>
              <td class="label">Organization</td>
              <td class="value">${sampleSubmissionEn.organization}</td>
            </tr>
            <tr>
              <td class="label">Submitted (EAT)</td>
              <td class="value">Friday, September 4, 2026 at 11:15 AM (Nairobi Time)</td>
            </tr>
            <tr>
              <td class="label">Site Language</td>
              <td class="value"><strong style="color: #1A4D2E;">EN</strong></td>
            </tr>
          </table>
        </div>

        <div class="message-title">Inquiry Message</div>
        <div class="message-box">
          ${sampleSubmissionEn.message.replace(/\n/g, '<br/>')}
        </div>

        <div class="btn-wrap">
          <a href="mailto:${sampleSubmissionEn.email}" class="reply-btn">Reply to ${sampleSubmissionEn.name} &rarr;</a>
          <div class="reply-hint">
            You can also hit &ldquo;Reply&rdquo; in your email client &mdash; responses route directly to ${sampleSubmissionEn.email}
          </div>
        </div>
      </div>
      <div class="footer">
        <div><strong>Agri Experience Ltd.</strong> &bull; Notification System</div>
        <div>Watermark Business Park, Spring Court, Karen. Nairobi, Kenya</div>
        <div style="margin-top: 6px;">
          <a href="https://agri-experience.com">agri-experience.com</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// 2. Generate Respondent Acknowledgment HTML (English)
const respEnHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting Agri Experience</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; color: #2d3748; margin: 0; padding: 0; background-color: #F4F6F3; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #F4F6F3; padding: 32px 12px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #E6EAE3; box-shadow: 0 4px 20px rgba(26, 77, 46, 0.06); }
    .accent-bar { height: 5px; background: linear-gradient(90deg, #1A4D2E 0%, #3AB44A 50%, #2484C6 100%); }
    .header { padding: 36px 32px 24px 32px; text-align: center; background: #ffffff; border-bottom: 1px solid #F0F3EE; }
    .subtitle { margin: 12px 0 0 0; font-size: 12.5px; color: #64748b; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; }
    .content { padding: 36px 32px; }
    .status-banner { background: #EAF5EC; border: 1px solid #CBE5D0; border-radius: 8px; padding: 10px 16px; margin-bottom: 24px; color: #1A4D2E; font-size: 13px; font-weight: 600; text-align: center; }
    .greeting { font-size: 17px; font-weight: 700; color: #1A4D2E; margin-bottom: 16px; }
    .lead { font-size: 14.5px; color: #374151; margin-bottom: 16px; line-height: 1.7; }
    .recap-box { background: #FAFBF9; border: 1px solid #E8EDE5; border-left: 3px solid #2484C6; border-radius: 8px; padding: 18px 20px; margin: 26px 0; }
    .recap-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #2484C6; margin-bottom: 8px; }
    .recap-text { font-size: 13.5px; color: #4b5563; line-height: 1.65; font-style: italic; }
    
    .pillars-section { margin: 30px 0; padding-top: 24px; border-top: 1px solid #EEF2EB; }
    .pillars-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #1A4D2E; margin-bottom: 14px; }
    .pillar-item { padding: 10px 14px; background: #F9FAF8; border-radius: 8px; border: 1px solid #EFF3EC; margin-bottom: 8px; }
    .pillar-name { font-size: 13px; font-weight: 700; color: #1A4D2E; margin-bottom: 2px; }
    .pillar-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
    
    .cta-wrap { text-align: center; margin: 28px 0 12px 0; }
    .cta-btn { display: inline-block; background: #1A4D2E; color: #ffffff !important; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 13.5px; text-decoration: none; box-shadow: 0 3px 10px rgba(26, 77, 46, 0.18); }
    
    .signoff { margin-top: 32px; font-size: 14px; color: #374151; }
    .signoff strong { color: #1A4D2E; display: block; margin-top: 4px; font-size: 15px; }
    .footer { padding: 24px 32px; background: #F9FAF8; border-top: 1px solid #EAEFE7; font-size: 12px; color: #6c7a6d; text-align: center; line-height: 1.6; }
    .footer a { color: #2484C6; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="accent-bar"></div>
      <div class="header">
        <a href="https://agri-experience.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
          <img src="${logoUri}" alt="Agri Experience" width="190" style="display: block; margin: 0 auto; width: 190px; max-width: 190px; height: auto; border: 0;" />
        </a>
      </div>
      <div class="content">
        <div class="status-banner">
          Inquiry Received &bull; Under Review
        </div>

        <div class="greeting">Dear ${sampleSubmissionEn.name},</div>
        <p class="lead">Thank you for reaching out to <strong>Agri Experience</strong>. We have received your inquiry and our advisory team is reviewing your message.</p>
        <p class="lead">Whether your inquiry concerns seed regulatory reform, institutional modernization, technical scoping studies, or partnership opportunities, we appreciate your engagement with our mission across sub-Saharan Africa. A member of our team will follow up with you promptly.</p>

        <div class="recap-box">
          <div class="recap-title">A copy of your inquiry for your records:</div>
          <div class="recap-text">${sampleSubmissionEn.message.replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="pillars-section">
          <div class="pillars-title">Our core areas of advisory &amp; impact:</div>
          <div class="pillar-item">
            <div class="pillar-name">&#127793; Seed Systems &amp; Regulatory Advisory</div>
            <div class="pillar-desc">Institutional modernization, policy reform, and private-sector enablement.</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128300; Technical Studies &amp; Sector Analytics</div>
            <div class="pillar-desc">In-depth value-chain diagnostics and scoping studies across 20+ countries.</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128187; Digital Platforms &amp; Quality Assurance</div>
            <div class="pillar-desc">Digital seed certification workflows and traceability tools for smallholder farmers.</div>
          </div>
        </div>

        <div class="cta-wrap">
          <a href="https://agri-experience.com/our-work" class="cta-btn">Explore Our Work &rarr;</a>
        </div>

        <div class="signoff">
          Warm regards,<br/>
          <strong>The Agri Experience Team</strong>
        </div>
      </div>
      <div class="footer">
        <div><strong>Agri Experience Ltd.</strong></div>
        <div>Watermark Business Park, Spring Court, Karen. Nairobi, Kenya</div>
        <div style="margin-top: 4px;">
          Tel: <a href="tel:+254202626888">+254 (20) 2626888</a> &bull; Email: <a href="mailto:info@agri-experience.com">info@agri-experience.com</a>
        </div>
        <div style="margin-top: 6px;">
          <a href="https://agri-experience.com">agri-experience.com</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// 3. Generate Respondent Acknowledgment HTML (French)
const respFrHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Merci d'avoir contacté Agri Experience</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; color: #2d3748; margin: 0; padding: 0; background-color: #F4F6F3; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #F4F6F3; padding: 32px 12px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #E6EAE3; box-shadow: 0 4px 20px rgba(26, 77, 46, 0.06); }
    .accent-bar { height: 5px; background: linear-gradient(90deg, #1A4D2E 0%, #3AB44A 50%, #2484C6 100%); }
    .header { padding: 36px 32px 24px 32px; text-align: center; background: #ffffff; border-bottom: 1px solid #F0F3EE; }
    .subtitle { margin: 12px 0 0 0; font-size: 12.5px; color: #64748b; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; }
    .content { padding: 36px 32px; }
    .status-banner { background: #EAF5EC; border: 1px solid #CBE5D0; border-radius: 8px; padding: 10px 16px; margin-bottom: 24px; color: #1A4D2E; font-size: 13px; font-weight: 600; text-align: center; }
    .greeting { font-size: 17px; font-weight: 700; color: #1A4D2E; margin-bottom: 16px; }
    .lead { font-size: 14.5px; color: #374151; margin-bottom: 16px; line-height: 1.7; }
    .recap-box { background: #FAFBF9; border: 1px solid #E8EDE5; border-left: 3px solid #2484C6; border-radius: 8px; padding: 18px 20px; margin: 26px 0; }
    .recap-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #2484C6; margin-bottom: 8px; }
    .recap-text { font-size: 13.5px; color: #4b5563; line-height: 1.65; font-style: italic; }
    
    .pillars-section { margin: 30px 0; padding-top: 24px; border-top: 1px solid #EEF2EB; }
    .pillars-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #1A4D2E; margin-bottom: 14px; }
    .pillar-item { padding: 10px 14px; background: #F9FAF8; border-radius: 8px; border: 1px solid #EFF3EC; margin-bottom: 8px; }
    .pillar-name { font-size: 13px; font-weight: 700; color: #1A4D2E; margin-bottom: 2px; }
    .pillar-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
    
    .cta-wrap { text-align: center; margin: 28px 0 12px 0; }
    .cta-btn { display: inline-block; background: #1A4D2E; color: #ffffff !important; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 13.5px; text-decoration: none; box-shadow: 0 3px 10px rgba(26, 77, 46, 0.18); }
    
    .signoff { margin-top: 32px; font-size: 14px; color: #374151; }
    .signoff strong { color: #1A4D2E; display: block; margin-top: 4px; font-size: 15px; }
    .footer { padding: 24px 32px; background: #F9FAF8; border-top: 1px solid #EAEFE7; font-size: 12px; color: #6c7a6d; text-align: center; line-height: 1.6; }
    .footer a { color: #2484C6; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="accent-bar"></div>
      <div class="header">
        <a href="https://agri-experience.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
          <img src="${logoUri}" alt="Agri Experience" width="190" style="display: block; margin: 0 auto; width: 190px; max-width: 190px; height: auto; border: 0;" />
        </a>
      </div>
      <div class="content">
        <div class="status-banner">
          Demande reçue &bull; En cours de traitement
        </div>

        <div class="greeting">Bonjour ${sampleSubmissionFr.name},</div>
        <p class="lead">Nous vous remercions d'avoir pris contact avec <strong>Agri Experience</strong>. Nous avons bien reçu votre demande et notre équipe examine actuellement votre message.</p>
        <p class="lead">Que votre démarche concerne la modernisation des cadres réglementaires semenciers, nos études techniques, nos plateformes numériques ou de futures opportunités de partenariat, nous vous remercions vivement de votre intérêt pour notre mission en Afrique subsaharienne. Un membre de notre équipe vous répondra dans les plus brefs délais.</p>

        <div class="recap-box">
          <div class="recap-title">Copie de votre demande pour vos archives :</div>
          <div class="recap-text">${sampleSubmissionFr.message.replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="pillars-section">
          <div class="pillars-title">Nos principaux domaines d'intervention :</div>
          <div class="pillar-item">
            <div class="pillar-name">&#127793; Systèmes semenciers &amp; conseil réglementaire</div>
            <div class="pillar-desc">Modernisation institutionnelle et réformes propices au secteur privé.</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128300; Études techniques &amp; diagnostics sectoriels</div>
            <div class="pillar-desc">Analyses approfondies des filières et études de cadrage dans 20+ pays.</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128187; Plateformes numériques &amp; assurance qualité</div>
            <div class="pillar-desc">Numérisation de la certification des semences et traçabilité pour les agriculteurs.</div>
          </div>
        </div>

        <div class="cta-wrap">
          <a href="https://agri-experience.com/fr/our-work" class="cta-btn">Découvrir nos interventions &rarr;</a>
        </div>

        <div class="signoff">
          Bien cordialement,<br/>
          <strong>L'équipe Agri Experience</strong>
        </div>
      </div>
      <div class="footer">
        <div><strong>Agri Experience Ltd.</strong></div>
        <div>Siège : Watermark Business Park, Spring Court, Karen. Nairobi, Kenya</div>
        <div style="margin-top: 4px;">
          Tel: <a href="tel:+254202626888">+254 (20) 2626888</a> &bull; Email: <a href="mailto:info@agri-experience.com">info@agri-experience.com</a>
        </div>
        <div style="margin-top: 6px;">
          <a href="https://agri-experience.com">agri-experience.com</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// Write preview files
const outDir = path.join(process.cwd(), '.previews');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'preview-team.html'), teamHtml);
fs.writeFileSync(path.join(outDir, 'preview-respondent-en.html'), respEnHtml);
fs.writeFileSync(path.join(outDir, 'preview-respondent-fr.html'), respFrHtml);

// Interactive Dashboard
const dashboardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agri Experience • Local Email Previews</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b1120; color: #f8fafc; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    header { background: #1e293b; padding: 12px 24px; border-bottom: 1px solid #334155; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .brand { font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px; }
    .badge { background: #1A4D2E; color: #4ade80; padding: 3px 8px; border-radius: 6px; font-size: 11px; }
    .nav { display: flex; gap: 8px; }
    .btn { background: #0f172a; border: 1px solid #334155; color: #94a3b8; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; }
    .btn.active { background: #1A4D2E; color: #fff; border-color: #1A4D2E; }
    .viewports { display: flex; gap: 6px; }
    .vp-btn { background: #334155; border: none; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
    .vp-btn.active { background: #2563eb; }
    main { flex: 1; display: flex; justify-content: center; align-items: center; padding: 24px; background: #070a12; overflow: hidden; }
    .frame-box { width: 100%; max-width: 820px; height: 100%; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5); transition: all 0.3s ease; }
    .frame-box.mobile { max-width: 414px; border-radius: 36px; border: 10px solid #1e293b; height: 92%; }
    iframe { width: 100%; height: 100%; border: none; background: #fff; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span>Agri Experience Email Previews</span>
      <span class="badge">Local Dev</span>
    </div>
    <div class="nav">
      <button class="btn active" onclick="loadFrame('preview-team.html', this)">📥 Team Notification (info@)</button>
      <button class="btn" onclick="loadFrame('preview-respondent-en.html', this)">✉️ Respondent Receipt (English)</button>
      <button class="btn" onclick="loadFrame('preview-respondent-fr.html', this)">✉️ Respondent Receipt (Français)</button>
    </div>
    <div class="viewports">
      <button class="vp-btn active" id="btn-d" onclick="setVp('desktop')">🖥️ Desktop</button>
      <button class="vp-btn" id="btn-m" onclick="setVp('mobile')">📱 Mobile</button>
    </div>
  </header>
  <main>
    <div class="frame-box" id="box">
      <iframe id="frame" src="preview-team.html"></iframe>
    </div>
  </main>
  <script>
    function loadFrame(file, btn) {
      document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('frame').src = file;
    }
    function setVp(vp) {
      const box = document.getElementById('box');
      if (vp === 'mobile') {
        box.classList.add('mobile');
        document.getElementById('btn-m').classList.add('active');
        document.getElementById('btn-d').classList.remove('active');
      } else {
        box.classList.remove('mobile');
        document.getElementById('btn-d').classList.add('active');
        document.getElementById('btn-m').classList.remove('active');
      }
    }
  </script>
</body>
</html>`;

const previewIndexPath = path.join(outDir, 'index.html');
fs.writeFileSync(previewIndexPath, dashboardHtml);

console.log('✔ Generated preview files in .previews/');
console.log(`- file://${previewIndexPath}`);

try {
  execSync(`open "${previewIndexPath}"`);
  console.log('✔ Opened in default browser.');
} catch {
  // Headless safe
}
