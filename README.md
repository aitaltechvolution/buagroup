# BUA Group — Corporate Website

React 18 · Vite 5 · Tailwind CSS v3 · Framer Motion · React Router v6

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build → /dist
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
bua-group/
├── index.html                  ← Vite HTML entry (root level)
├── vite.config.js              ← Vite configuration
├── tailwind.config.js          ← Design tokens & theme extensions
├── postcss.config.js           ← PostCSS (Tailwind + Autoprefixer)
├── eslint.config.js            ← ESLint for React + Vite
├── public/
│   └── favicon.svg             ← Static assets served at /
└── src/
    ├── main.jsx                ← React DOM entry point
    ├── App.jsx                 ← Router + AnimatePresence page transitions
    ├── components/
    │   ├── BUALogo.jsx         Real BUA logo image with SVG fallback
    │   ├── Header.jsx          Sticky header, mega menu, mobile drawer, magnetic CTA
    │   ├── Hero.jsx            4-slide image slideshow with Ken Burns + parallax
    │   ├── PageHero.jsx        Shared inner-page hero banner component
    │   ├── BusinessesGrid.jsx  3D-tilt card grid (home)
    │   ├── ChairmanStatement.jsx  2-col portrait + quote with scroll parallax
    │   ├── LiveImpactTracker.jsx  Animated counters + Africa SVG map
    │   ├── NewsPortal.jsx      Filtered article card grid
    │   ├── Footer.jsx          5-col footer, fade-in on scroll
    │   ├── Layout.jsx          Page wrapper + scroll progress bar
    │   ├── LegacyTimeline.jsx  Vertical timeline with inView animations
    │   ├── ExecutiveGrid.jsx   Portrait cards with biography modals
    │   ├── BusinessPortfolioHub.jsx  Filtered subsidiary cards
    │   ├── SubsidiaryCard.jsx  3-block asset card
    │   ├── SustainabilityPanel.jsx  ESG 3-pillar grid + progress bars
    │   ├── InvestorDashboard.jsx    Searchable publications table
    │   ├── CareersHub.jsx      Split layout + multi-step application wizard
    │   └── Icons.jsx           SVG icon library
    ├── pages/
    │   ├── Home.jsx            Full homepage with all sections
    │   ├── About.jsx           Corporate profile + timeline + executives
    │   ├── Businesses.jsx      Portfolio hub with sector filters
    │   ├── Sustainability.jsx  ESG strategy panel
    │   ├── Investors.jsx       Financial publications dashboard
    │   ├── Media.jsx           News portal
    │   ├── Careers.jsx         Careers hub + application wizard
    │   ├── Contact.jsx         Contact form + map + info cards
    │   └── PlaceholderPage.jsx Template for unbuilt routes
    ├── data/
    │   ├── siteData.js         Nav, mega menu, footer, contact info
    │   ├── mediaData.js        News articles data
    │   ├── portfolioData.js    Subsidiary cards data
    │   └── investorData.js     Financial publications data
    ├── hooks/
    │   ├── useScrolled.js      Passive scroll threshold hook
    │   └── useCountUp.js       IntersectionObserver count animation
    └── styles/
        ├── index.css           Tailwind layers + global styles + grid layouts
        └── tokens.js           Design tokens + Framer Motion variants
```

---

## Design Tokens

| Token         | Value     | Usage                        |
|---------------|-----------|------------------------------|
| `primary`     | `#BC1A22` | Brand red, CTAs, accents     |
| `primaryDark` | `#870F14` | Hover states                 |
| `onyx`        | `#12161A` | Headings, dark backgrounds   |
| `slate`       | `#525D6B` | Secondary text               |
| `alabaster`   | `#F8F9FA` | Light section backgrounds    |

Fonts: **Plus Jakarta Sans** (display/UI) + **Inter** (body fallback)

---

## Key Features

- ⚡ Vite 5 — instant HMR, sub-second dev starts
- 🎬 Hero: 4-slide real BUA image slideshow (Ken Burns + crossfade)
- 🖱 Magnetic CTA button (spring physics mouse tracking)
- 📜 Scroll progress bar across all pages
- 🔄 AnimatePresence page transitions (blur + slide)
- 📦 Code-split chunks: vendor / router / framer
- 🗺 Parallax scrolling on Hero, Chairman, BusinessesGrid sections
- 🎭 3D card tilt on BusinessesGrid (mouse-tracked rotateX/Y)
- 📱 Fully responsive across all breakpoints

---

*BUA Group © 2026 · buagroup.com*
"# buagroup" 
