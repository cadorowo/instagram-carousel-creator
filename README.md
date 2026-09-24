# Instagram Carousel Creator — Automated Multi-Brand Design Engine

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Chromium-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![HTML5/CSS3](https://img.shields.io/badge/HTML5_/_CSS3-Modular_Design-E34F26?style=for-the-badge&logo=html5)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An agent-driven, programmatic framework for designing, compiling, and rendering high-converting **Instagram Carousels (1080x1350px 4:5)**. Combines modular CSS Design Systems, reusable HTML slide templates, and headless Playwright rendering with 2x Retina pixel density.

---

## 🌟 Key Features

- **🎨 Multi-Brand Engine (`brands/`)**:
  - Independent brand kits defining color palettes, Google Fonts pairings, logos, voice guidelines, and visual assets.
  - Pre-configured kits for luxury hospitality, gaming, SaaS/tech, and lifestyle brands.

- **🏛️ 6 Modular Design Systems (`styles/`)**:
  - **Alpine Editorial**: Luxury chalets, mountain architecture, high-end travel (Ivory, Terracotta, Walnut + *Playfair Display* & *Plus Jakarta Sans*).
  - **Dark Tech Minimal**: SaaS, developer tools, AI creator economy (Charcoal `#0F0F0F`, Neon Orange `#FF5A36` + *Inter* & *Space Mono*).
  - **Earthy Organic Editorial**: Architecture, interior design, curated hospitality (Clay, Olive Green + *Outfit*).
  - **Brutalist Bold**: High-energy streetwear, events, disruptive marketing (Off-white, Deep Black, Electric Yellow + *Plus Jakarta Sans 800*).
  - **Warm Minimal Lifestyle**: Wellness, culinary, sustainable fashion (Linen Ecru, Sand, Night Espresso + *Cormorant Garamond*).
  - **Flat Party Bold**: Party games, card decks, celebrations (Vibrant Yellow, Ink Black, Tangerine + *Playfair 900*).

- **📸 Headless Playwright Renderer (`render.js`)**:
  - Batch processes HTML slides into high-resolution PNGs at 1080x1350px with `deviceScaleFactor: 2` (Retina sharpness without CSS scaling artifacts).

- **🤖 5-Stage Agent Workflow**:
  - **Stage 1 (`01-concept.md`)**: Narrative angle, hook hypotheses, target persona.
  - **Stage 2 (`02-carosello.md`)**: Copy per slide, typography hierarchy, template mapping.
  - **Stage 3 (`03-immagini/`)**: Image asset curation (AI-generated or curated photography).
  - **Stage 4 (`compiled/`)**: HTML templates populated with copy and assets.
  - **Stage 5 (`output/`)**: Headless rendering into production-ready PNGs.

- **🔌 Automation Adapters (`scripts/`)**:
  - `fetch-imagevallee.js`: Search & downloader for regional open-data photography archives.
  - `gflow-adapter.js`: Automatic extraction of visual prompts with style signature injection for Google Flow / Nano-Pro image generation.

---

## 🏗️ Project Architecture

```
instagram-carousel-creator/
├── brands/                           # Brand identity specifications
│   ├── chalet-grande-cerise/         # Hospitality brand kit
│   ├── twist-it/                     # Party game brand kit
│   └── casanova/                     # iGaming brand kit
├── styles/                           # Reusable design systems
│   ├── alpine-editorial/             # Editorial travel & mountain CSS
│   ├── dark-tech-minimal/            # Dark mode SaaS & tech CSS
│   └── ...
├── templates/                        # HTML slide layout templates
│   ├── slide-editorial-01-cover.html
│   ├── slide-editorial-08-split-photo.html
│   ├── slide-editorial-10-closing-card.html
│   └── ...
├── posts/                            # Carousel projects
│   └── <brand>/<post-slug>/
│       ├── 01-concept.md
│       ├── 02-carosello.md
│       ├── 03-immagini/
│       └── output/                   # Rendered PNGs (git-ignored)
├── scripts/                          # Automation & scrapers
├── render.js                         # Headless Playwright renderer
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `>=18.0.0`
- **npm** or **pnpm**

### 1. Installation

```bash
# Clone repository
git clone https://github.com/cadorowo/instagram-carousel-creator.git
cd instagram-carousel-creator

# Install dependencies
npm install

# Install Playwright Chromium browser
npx playwright install chromium
```

### 2. Render Demo Carousel

```bash
npm run render:esempio
```

Or render any custom post directory:

```bash
node render.js posts/chalet-grande-cerise/01-giornata-tipo-1500m/compiled posts/chalet-grande-cerise/01-giornata-tipo-1500m/output
```

---

## ⚙️ Specifications

- **Aspect Ratio**: `4:5` (Instagram Feed portrait optimum: 1080 x 1350 px).
- **Scale Factor**: `2x` (Internal canvas renders at 2160 x 2700 px for ultra-sharp mobile rendering).
- **Output**: Lossless PNG with embedded font rendering.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
