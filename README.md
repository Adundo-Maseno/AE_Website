# Agri Experience

Official website for **Agri Experience** — an African agricultural consulting firm transforming seed systems and agricultural value chains across 20+ African countries.

**[agri-experience.com](https://agri-experience.com)**

---

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Internationalization (i18n)](#internationalization-i18n)
- [Email & Contact System](#email--contact-system)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About

Agri Experience is a Nairobi-based consulting firm specializing in crop seed sector development, agricultural policy reform, institutional modernization, and market linkages throughout sub-Saharan Africa. The website serves as the organization's primary digital presence, showcasing practice areas, field impacts, and public-domain resources across East, West, Central, and Southern Africa.

### Key Features

- **Interactive Mapbox Map** — Drill-down map of 20+ countries with active projects, regional filtering, and project-level detail
- **Bilingual (EN / FR)** — Full internationalization powered by `next-intl`, an auto-translation pipeline, and locale-aware routing (`/en/...`, `/fr/...`)
- **Automated Contact & Receipt Pipeline** — Dual email dispatch system delivering customer inquiries directly to `info@agri-experience.com` and sending an automated bilingual receipt acknowledgment to respondents
- **Resource Library** — Downloadable publications including case studies, toolkits, and scoping reports with in-browser PDF preview
- **Institutional Case Studies** — Detailed showcases of flagship initiatives, including the ESSETA seed transformation program with Tanzania's Ministry of Agriculture and TOSCI
- **SDG Alignment** — Visual mapping of organizational impact to UN Sustainable Development Goals
- **High-Performance Motion Design** — Custom fluid physics, smooth page transitions, and interactive visual components powered by Framer Motion and GSAP
- **Mobile Optimized** — Clean viewport sizing, responsive navigation, touch interactions, and zero unnecessary media payloads on mobile devices

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Webpack) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) · [Radix UI](https://www.radix-ui.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com/) |
| Maps | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) |
| Internationalization | [next-intl](https://next-intl.dev/) |
| PDF Preview | [react-pdf](https://react-pdf.org/) · [pdfjs-dist](https://github.com/mozilla/pdf.js) |
| Email Delivery | [Nodemailer](https://nodemailer.com/) (Google Workspace / SMTP) |
| Package Manager | [pnpm](https://pnpm.io/) / [npm](https://www.npmjs.com/) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.18 (recommended: Node.js 20+)
- **pnpm** or **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Agri-experience/company-website.git
cd company-website

# Install dependencies
pnpm install
# or: npm install

# Set up environment variables
cp hostinger.env .env.local
```

### Development

```bash
pnpm dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
# or: npm run build && npm run start
```

### Linting

```bash
pnpm lint
# or: npm run lint
```

---

## Environment Variables

All production environment variables are documented and formatted for direct import in [`hostinger.env`](hostinger.env).

| Variable | Description | Default / Example | Required |
|----------|-------------|-------------------|----------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL JS public token for the interactive impact map | `pk.eyJ...` | **Yes** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 tracking ID | `G-0ZV66F5FK6` | Optional |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata & sitemaps | `https://agri-experience.com` | Optional |
| `PORT` | Node.js production server port | `3000` | Optional |
| `SMTP_HOST` | Outgoing SMTP mail server | `smtp.gmail.com` | For emails |
| `SMTP_PORT` | SMTP port (465 for SSL, 587 for TLS) | `465` | For emails |
| `SMTP_SECURE` | Use SSL/TLS | `true` | For emails |
| `SMTP_USER` | SMTP username / address | `info@agri-experience.com` | For emails |
| `SMTP_PASS` | Google Workspace App Password (16 chars) | `your-app-password` | For emails |
| `CONTACT_RECEIVER_EMAIL` | Inbox destination for website contact inquiries | `info@agri-experience.com` | Optional |
| `CONTACT_FROM_EMAIL` | Outgoing email sender label | `"Agri Experience" <info@agri-experience.com>` | Optional |

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts         # Contact form API endpoint & email dispatch
│   │   └── email-preview/
│   │       └── route.ts         # Interactive local email design preview dashboard
│   └── [locale]/                # Locale-scoped routes (en, fr)
│       ├── page.tsx             # Home
│       ├── about/               # Mission, values, company journey
│       ├── our-work/            # Practice areas overview
│       │   ├── capacity-building/
│       │   ├── client-advisory/
│       │   ├── digital-platforms/
│       │   ├── project-implementation/  # Institutional case study (ESSETA)
│       │   ├── stakeholder-convenings/
│       │   └── technical-studies/
│       ├── our-results/         # Key metrics and outcomes
│       ├── our-impact/          # Interactive map & SDG alignment
│       ├── our-team/            # Leadership and specialist profiles
│       ├── map/                 # Full-screen interactive map
│       ├── resources/           # Downloadable publications & PDF reader
│       ├── insights/            # Case examples and articles
│       ├── gallery/             # High-res photo gallery
│       ├── contact/             # Contact form & regional office information
│       ├── newsletter/          # Newsletter subscription
│       ├── privacy/             # Privacy policy
│       └── terms/               # Terms of service
│
├── components/
│   ├── header.tsx               # Fixed/sticky navigation with mobile drawer
│   ├── footer.tsx               # Responsive multi-column footer & links
│   ├── interactive-map.tsx      # Map container with responsive viewports
│   ├── client-logos.tsx         # Partner and client logo marquee
│   ├── map/                     # Mapbox rendering and country dossiers
│   ├── motion/                  # GSAP & Framer Motion section modules
│   ├── liquid-glass/            # Dynamic frosted glass effect
│   └── ui/                      # Base UI primitives
│
├── lib/
│   ├── email.ts                 # Nodemailer dispatcher & bilingual email templates
│   ├── public-downloads.ts      # Curated publication repository metadata
│   └── utils.ts                 # Common utility helpers
│
├── i18n/                        # next-intl routing configuration
├── messages/                    # Translation files (en.json, fr.json)
├── public/                      # Static assets (images, logos, PDFs, flags)
├── hostinger.env                # Pre-configured environment variable template
└── scripts/
    ├── auto-translate.js        # Auto-translation pipeline (pre-commit hook)
    └── preview-emails.js        # Instant standalone local email template previewer
```

---

## Internationalization (i18n)

The site supports **English** and **French** with locale-prefixed routing (`/en/...`, `/fr/...`):

- Content strings are managed in [`messages/en.json`](messages/en.json) and [`messages/fr.json`](messages/fr.json).
- A pre-commit hook (via [Husky](https://typicode.github.io/husky/)) runs `scripts/auto-translate.js` to ensure French translations stay in sync.
- Translations are cached in `.translation-cache.json` to avoid redundant API queries.

To trigger auto-translation manually:

```bash
pnpm translate
# or: npm run translate
```

---

## Email & Contact System

The contact form at [`/contact`](app/[locale]/contact/page.tsx) captures user submissions and sends two distinct emails via [`lib/email.ts`](lib/email.ts):

1. **Agri Experience Team Notification**:
   - Sent to: `info@agri-experience.com`
   - `Reply-To`: Set to the respondent's email address so the team can reply immediately.
   - Header: Linked company logo, status badge, and tricolor accent bar.
   - Includes: Sender Name, Email, Organization, Nairobi Time (EAT), Locale, and formatted message body.

2. **Automated Receipt Acknowledgment**:
   - Sent to: Respondent's email.
   - Language: Dynamically delivered in **English** or **French** based on the respondent's active site locale.
   - Header: Linked company logo and tricolor accent bar.
   - Includes: Official acknowledgment of receipt, follow-up expectations, reference copy of their submitted message, 3 core advisory practice highlights, and official office contact details.

3. **Retina-Crisp Inline Logo & Brand Colors**:
   - Both email fronts feature the official **Agri Experience logo** ([`public/agri-experience-logo.png`](public/agri-experience-logo.png)) embedded via inline CID attachment (`cid:agri-experience-logo`) so email clients display it natively without prompting to "load remote images".
   - The logo links directly to [https://agri-experience.com](https://agri-experience.com).
   - Styled with official brand colors: Deep Forest Green (`#1A4D2E`), Sprout Green (`#3AB44A`), and Ocean Blue (`#2484C6`).

4. **Local Email Previews**:
   - **Terminal Command**:
     ```bash
     npm run preview:emails
     ```
     Generates standalone HTML previews and pops open an interactive preview dashboard in your default browser.
   - **Live In-App Route**:
     When running `npm run dev` or `pnpm dev`, open:
     `http://localhost:3000/api/email-preview`
     Features an interactive tab switcher (Team notification, English respondent receipt, French respondent receipt) with Desktop and Mobile (iPhone frame) viewport toggles.

5. **Spam Protection**:
   - Equipped with an invisible honeypot field that silently drops automated bot submissions without requiring disruptive CAPTCHAs.

> [!NOTE]
> For Google Workspace accounts with 2-Step Verification, generate a 16-character **App Password** via *Google Account > Security > 2-Step Verification > App Passwords* and set it in `SMTP_PASS`.

---

## Design System

### Color Palette

| Token | Value | Role |
|-------|-------|------|
| Primary Green | `#1A4D2E` / `#3ab44a` | CTAs, brand emblems, active accents |
| Deep Forest | `#1A4D2E` | Headings, hero typography, dark banners |
| Mist | `#F5F5F0` | Warm editorial backgrounds, cards |
| Charcoal | `#2B2B2B` | Body copy, secondary typography |
| Warm Earth | `#D4A373` | Subtle glow accents, highlights |

### Typography

| Role | Font | Category |
|------|------|----------|
| Headings & Titles | Playfair Display / Serif | Editorial serif |
| Body & Navigation | DM Sans | High-legibility sans-serif |

Design tokens and utility extensions are defined in [`app/globals.css`](app/globals.css).

---

## Deployment

### Deploying to Hostinger (Production)

1. **Connect Repository**:
   - In Hostinger hPanel > **Websites** (or **Node.js Application**), connect:
     `https://github.com/Agri-experience/company-website.git`
   - Branch: `main`
2. **Build Settings**:
   - Install Command: `npm install` (or `pnpm install`)
   - Build Command: `npm run build`
   - Start Command: `npm run start`
3. **Environment Variables**:
   - In Hostinger’s Environment Variables tab, click **Import** and upload [`hostinger.env`](hostinger.env).
   - Enter your Google Workspace App Password into `SMTP_PASS`.
4. **SSL & Security**:
   - In **Security > SSL**, install the free Let's Encrypt certificate for `agri-experience.com` and `www.agri-experience.com`.
   - Enable **Force HTTPS**.

### Deploying to Vercel

```bash
vercel --prod
```

Configure `NEXT_PUBLIC_MAPBOX_TOKEN` and SMTP variables under **Project Settings > Environment Variables**.

---

## Contributing

1. Create a feature branch (`git checkout -b feature/my-feature`)
2. Commit your changes (`git commit -m "feat: add feature"`)
3. Verify the build passes with zero errors (`pnpm build`)
4. Verify translations are up to date (`pnpm translate`)
5. Push your branch and open a Pull Request against `main`

---

## License

© Agri Experience. All rights reserved.