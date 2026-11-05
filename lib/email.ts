import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

export interface ContactSubmission {
  name: string
  email: string
  organization?: string
  message: string
  locale?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Creates and returns the nodemailer transporter using environment variables.
 * Returns null if SMTP_PASS is not provided.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : port === 465
  const user = process.env.SMTP_USER || 'info@agri-experience.com'
  const pass = process.env.SMTP_PASS

  if (!pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })
}

/**
 * Returns the company logo attachment if the file exists on the server.
 */
function getLogoAttachment() {
  const logoPath = path.join(process.cwd(), 'public/agri-experience-logo.png')
  if (fs.existsSync(logoPath)) {
    return [
      {
        filename: 'agri-experience-logo.png',
        path: logoPath,
        cid: 'agri-experience-logo',
      },
    ]
  }
  return []
}

/**
 * Generates the notification email sent to info@agri-experience.com
 */
export function generateTeamNotificationEmail(submission: ContactSubmission) {
  const safeName = escapeHtml(submission.name.trim())
  const safeEmail = escapeHtml(submission.email.trim())
  const safeOrg = submission.organization?.trim() ? escapeHtml(submission.organization.trim()) : 'Not specified'
  const safeMessage = escapeHtml(submission.message.trim()).replace(/\n/g, '<br/>')
  const locale = (submission.locale || 'en').toUpperCase()

  const now = new Date()
  const dateFormatted = now.toLocaleString('en-US', {
    timeZone: 'Africa/Nairobi',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  const subject = `[Website Inquiry] ${submission.name}${submission.organization ? ` (${submission.organization})` : ''}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
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
          <img src="cid:agri-experience-logo" alt="Agri Experience" width="180" style="display: block; margin: 0 auto; width: 180px; max-width: 180px; height: auto; border: 0;" />
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
              <td class="value"><strong>${safeName}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value"><a href="mailto:${safeEmail}" style="color: #2484C6; font-weight: 600; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td class="label">Organization</td>
              <td class="value">${safeOrg}</td>
            </tr>
            <tr>
              <td class="label">Submitted (EAT)</td>
              <td class="value">${dateFormatted}</td>
            </tr>
            <tr>
              <td class="label">Site Language</td>
              <td class="value"><strong style="color: #1A4D2E;">${locale}</strong></td>
            </tr>
          </table>
        </div>

        <div class="message-title">Inquiry Message</div>
        <div class="message-box">
          ${safeMessage}
        </div>

        <div class="btn-wrap">
          <a href="mailto:${safeEmail}" class="reply-btn">Reply to ${safeName} &rarr;</a>
          <div class="reply-hint">
            You can also hit &ldquo;Reply&rdquo; in your email client &mdash; responses route directly to ${safeEmail}
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
</html>
`

  const text = `
NEW CONTACT INQUIRY - AGRI EXPERIENCE WEBSITE
=============================================================
From:         ${submission.name}
Email:        ${submission.email}
Organization: ${submission.organization || 'Not specified'}
Submitted:    ${dateFormatted} (East Africa Time)
Language:     ${locale}

MESSAGE:
-------------------------------------------------------------
${submission.message}

-------------------------------------------------------------
Direct Reply:
Simply click "Reply" in your email client to respond to ${submission.name} at ${submission.email}.
`

  return { subject, html, text }
}

/**
 * Generates the automated acknowledgment email sent to the respondent
 */
export function generateRespondentAcknowledgmentEmail(submission: ContactSubmission) {
  const isFrench = submission.locale === 'fr'
  const safeName = escapeHtml(submission.name.trim())
  const safeMessage = escapeHtml(submission.message.trim()).replace(/\n/g, '<br/>')

  const subject = isFrench
    ? `Merci d'avoir contacté Agri Experience`
    : `Thank you for contacting Agri Experience`

  const statusBadge = isFrench
    ? `Demande reçue &bull; En cours de traitement`
    : `Inquiry Received &bull; Under Review`

  const greeting = isFrench
    ? `Bonjour ${safeName},`
    : `Dear ${safeName},`

  const intro = isFrench
    ? `Nous vous remercions d'avoir pris contact avec <strong>Agri Experience</strong>. Nous avons bien reçu votre demande et notre équipe examine actuellement votre message.`
    : `Thank you for reaching out to <strong>Agri Experience</strong>. We have received your inquiry and our advisory team is reviewing your message.`

  const mission = isFrench
    ? `Que votre démarche concerne la modernisation des cadres réglementaires semenciers, nos études techniques, nos plateformes numériques ou de futures opportunités de partenariat, nous vous remercions vivement de votre intérêt pour notre mission en Afrique subsaharienne. Un membre de notre équipe vous répondra dans les plus brefs délais.`
    : `Whether your inquiry concerns seed regulatory reform, institutional modernization, technical scoping studies, or partnership opportunities, we appreciate your engagement with our mission across sub-Saharan Africa. A member of our team will follow up with you promptly.`

  const recapTitle = isFrench
    ? `Copie de votre message pour vos archives :`
    : `A copy of your inquiry for your records:`

  const pillarsTitle = isFrench
    ? `Nos principaux domaines d'intervention :`
    : `Our core areas of advisory & impact:`

  const pillar1Title = isFrench ? `Systèmes semenciers & conseil réglementaire` : `Seed Systems & Regulatory Advisory`
  const pillar1Desc = isFrench ? `Modernisation institutionnelle et réformes propices au secteur privé.` : `Institutional modernization, policy reform, and private-sector enablement.`

  const pillar2Title = isFrench ? `Études techniques & diagnostics sectoriels` : `Technical Studies & Sector Analytics`
  const pillar2Desc = isFrench ? `Analyses approfondies des filières et études de cadrage dans 20+ pays.` : `In-depth value-chain diagnostics and scoping studies across 20+ countries.`

  const pillar3Title = isFrench ? `Plateformes numériques & assurance qualité` : `Digital Platforms & Quality Assurance`
  const pillar3Desc = isFrench ? `Numérisation de la certification des semences et traçabilité pour les agriculteurs.` : `Digital seed certification workflows and traceability tools for smallholder farmers.`

  const exploreBtn = isFrench ? `Découvrir nos interventions &rarr;` : `Explore Our Work &rarr;`
  const exploreUrl = isFrench ? `https://agri-experience.com/fr/our-work` : `https://agri-experience.com/our-work`

  const signoff = isFrench ? `Bien cordialement,` : `Warm regards,`
  const teamTitle = isFrench ? `L'équipe Agri Experience` : `The Agri Experience Team`

  const officeLocation = isFrench
    ? `Siège : Watermark Business Park, Spring Court, Karen. Nairobi, Kenya`
    : `Head Office: Watermark Business Park, Spring Court, Karen. Nairobi, Kenya`

  const html = `
<!DOCTYPE html>
<html lang="${isFrench ? 'fr' : 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
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
          <img src="cid:agri-experience-logo" alt="Agri Experience" width="190" style="display: block; margin: 0 auto; width: 190px; max-width: 190px; height: auto; border: 0;" />
        </a>
      </div>
      <div class="content">
        <div class="status-banner">
          ${statusBadge}
        </div>

        <div class="greeting">${greeting}</div>
        <p class="lead">${intro}</p>
        <p class="lead">${mission}</p>

        <div class="recap-box">
          <div class="recap-title">${recapTitle}</div>
          <div class="recap-text">${safeMessage}</div>
        </div>

        <div class="pillars-section">
          <div class="pillars-title">${pillarsTitle}</div>
          <div class="pillar-item">
            <div class="pillar-name">&#127793; ${pillar1Title}</div>
            <div class="pillar-desc">${pillar1Desc}</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128300; ${pillar2Title}</div>
            <div class="pillar-desc">${pillar2Desc}</div>
          </div>
          <div class="pillar-item">
            <div class="pillar-name">&#128187; ${pillar3Title}</div>
            <div class="pillar-desc">${pillar3Desc}</div>
          </div>
        </div>

        <div class="cta-wrap">
          <a href="${exploreUrl}" class="cta-btn">${exploreBtn}</a>
        </div>

        <div class="signoff">
          ${signoff}
          <strong>${teamTitle}</strong>
        </div>
      </div>
      <div class="footer">
        <div><strong>Agri Experience Ltd.</strong></div>
        <div>${officeLocation}</div>
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
</html>
`

  const text = `
${isFrench ? 'AGRI EXPERIENCE - ACCUSÉ DE RÉCEPTION' : 'AGRI EXPERIENCE - INQUIRY ACKNOWLEDGMENT'}
======================================================================
${greeting}

${intro.replace(/<[^>]+>/g, '')}

${mission.replace(/<[^>]+>/g, '')}

${recapTitle}
----------------------------------------------------------------------
${submission.message}

----------------------------------------------------------------------
${signoff}
${teamTitle}

${officeLocation}
Tel: +254 (20) 2626888 / +254 (719) 554 154
Email: info@agri-experience.com
Web: https://agri-experience.com
`

  return { subject, html, text }
}

/**
 * Handles sending both the team notification and respondent acknowledgment emails.
 */
export async function sendContactEmails(submission: ContactSubmission): Promise<{ success: boolean; simulated: boolean; error?: string }> {
  const teamEmail = generateTeamNotificationEmail(submission)
  const respondentEmail = generateRespondentAcknowledgmentEmail(submission)

  const transporter = getMailTransporter()

  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@agri-experience.com'
  const senderEmail = process.env.CONTACT_FROM_EMAIL || `"Agri Experience" <${process.env.SMTP_USER || 'info@agri-experience.com'}>`

  // Get inline logo attachments
  const attachments = getLogoAttachment()

  // If no SMTP password configured, log simulated message and succeed gracefully
  if (!transporter) {
    console.warn('[Contact API] SMTP_PASS not configured. Simulating email dispatch:')
    console.log('[Team Notification]', {
      to: receiverEmail,
      from: senderEmail,
      replyTo: submission.email,
      subject: teamEmail.subject,
    })
    console.log('[Respondent Acknowledgment]', {
      to: submission.email,
      from: senderEmail,
      replyTo: receiverEmail,
      subject: respondentEmail.subject,
    })
    return {
      success: true,
      simulated: true,
    }
  }

  // Send Email 1: Notification to Agri Experience team
  await transporter.sendMail({
    from: senderEmail,
    to: receiverEmail,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject: teamEmail.subject,
    text: teamEmail.text,
    html: teamEmail.html,
    attachments,
  })

  // Send Email 2: Automated acknowledgment to respondent
  await transporter.sendMail({
    from: senderEmail,
    to: `"${submission.name}" <${submission.email}>`,
    replyTo: receiverEmail,
    subject: respondentEmail.subject,
    text: respondentEmail.text,
    html: respondentEmail.html,
    attachments,
  })

  return {
    success: true,
    simulated: false,
  }
}
