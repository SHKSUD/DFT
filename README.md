# DefTalk — Digital Platform

**Media · Intelligence · Community**

India's premier platform for geopolitical analysis, strategic intelligence, and defence discourse.

---

## Stack

- **Frontend** — Pure HTML/CSS/JS (no framework dependencies)
- **Hosting** — Vercel (static deployment)
- **Fonts** — Google Fonts (Bebas Neue, DM Sans, Space Mono)
- **Video** — YouTube embed API
- **Payments** — Razorpay (to be wired — add key to `js/main.js`)
- **Email** — Mailchimp (to be wired — add embed code to modal/footer)

---

## File Structure

```
deftalk/
├── index.html          # Main site — all sections
├── vercel.json         # Vercel routing + cache + security headers
├── .gitignore
├── README.md
├── css/
│   └── main.css        # All styles — extracted from index.html
├── js/
│   └── main.js         # All scripts — countdown, modal, nav, video player
└── public/
    └── images/         # Place logo, OG image, favicons here
        ├── og-image.jpg        # 1200×630 — for social sharing (ADD THIS)
        ├── favicon.ico         # (ADD THIS)
        └── favicon-32.png      # (ADD THIS)
```

---

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
cd deftalk
vercel
# Follow prompts — select "no framework", output directory "."
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import from GitHub
3. Select the repo
4. Framework preset: **Other**
5. Root directory: `.`
6. Build command: *(leave empty)*
7. Output directory: `.`
8. Click Deploy

---

## Before Going Live — Checklist

### Integrations (requires keys)
- [ ] **Razorpay** — Add your `key_id` to `js/main.js` → search `rzp_KEY_HERE`
- [ ] **Mailchimp** — Replace modal form action with your Mailchimp embed URL
- [ ] **Google Analytics** — Add GA4 tag before `</head>` in `index.html`

### Assets (add to `public/images/`)
- [ ] `og-image.jpg` — 1200×630px for WhatsApp/Twitter previews
- [ ] `favicon.ico` — browser tab icon
- [ ] `favicon-32.png` — high-res favicon

### SEO (update in `index.html` `<head>`)
- [ ] Confirm canonical URL matches live domain
- [ ] Update `og:url` meta tag to `https://thedeftalk.com`
- [ ] Submit sitemap to Google Search Console after go-live

### Content
- [ ] Replace countdown date in `js/main.js` (`eventDate` variable) with real event date
- [ ] Update hero video embed ID with latest DefTalk episode
- [ ] Add real book cover images when available

---

## Environment Variables

No environment variables required for the static build.

When adding Razorpay or Mailchimp backend webhooks (Phase 2), create a `.env` file — **never commit it**:

```
RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=xxxx
MAILCHIMP_API_KEY=xxxx
MAILCHIMP_AUDIENCE_ID=xxxx
```

---

## Customisation

| What to change | Where |
|---|---|
| Colour palette | `css/main.css` → `:root` variables |
| Nav links | `index.html` → `<nav>` section |
| Hero video | `index.html` → `src="https://www.youtube.com/embed/VIDEO_ID"` |
| Event countdown date | `js/main.js` → `const eventDate = new Date(...)` |
| Membership tier prices | `index.html` → `#membership` section |
| Ticker text | `index.html` → `.ticker-item` elements |

---

## Sections

| ID | Section |
|---|---|
| `#watch` | Video panel + YouTube embeds |
| `#trinetra` | Trinetra intelligence section |
| `#read` | Editorial / articles |
| `#books` | Book storefront |
| `#events` | Events + countdown |
| `#membership` | 4-tier membership |
| `#sponsorship` | Sponsor inquiry form |

---

*Built by [doers.digital](https://doers.digital) · April 2026*
