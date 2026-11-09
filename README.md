# Lattafa Scent Studio

> A richly animated fragrance storefront concept for discovering the scent that feels like you.

Lattafa Scent Studio turns a large perfume catalogue into a calm, editorial shopping experience. It combines an art-directed landing page, tactile product discovery, a practical demo bag, and a scent finder that helps visitors move from a mood to a bottle.

This repository is a **front-end pitch and interaction prototype**. It is designed to communicate a premium fragrance direction, not to process real payments or represent a production commerce backend.

## ✦ The experience at a glance

| Area | What it does |
| --- | --- |
| **The opening** | A cinematic launch sequence leads into a warm, textured hero with a responsive 3D glass volume. |
| **The collection** | Browse a large catalogue by family, brand, availability, price, and search. |
| **The scent finder** | Choose a fragrance mood and budget to receive a small, relevant edit from the catalogue. |
| **The product view** | Explore notes, descriptions, imagery, price, availability, comparison, and wishlist actions. |
| **The bag** | Build a local demo bag, adjust quantities, review totals, and prepare an enquiry without sending it automatically. |
| **Your scent wardrobe** | Save favourites, compare fragrances, and create a local demo profile in the browser. |
| **The journal** | Give the collection a slower editorial layer with fragrance guidance and discovery stories. |

## ✧ The design language

The interface is deliberately more **perfume counter than marketplace grid**:

- **Warm neutrals and ink** create the feeling of paper, glass, amber, and shadow.
- **Oversized typography** makes each page feel like a campaign rather than a catalogue export.
- **Motion with purpose** gives the bottle, cards, and transitions a sense of tactility without hiding controls.
- **Editorial whitespace** keeps a 697-item catalogue from feeling noisy.
- **Small, human prompts** — “What feels like you?” and “A note away.” — make discovery personal.
- **Accessible fallbacks** ensure the core browsing and shopping flows still work when WebGL, motion, or remote imagery are unavailable.

The visual system is documented in [`research/design.md`](./research/design.md), [`research/motion-study.md`](./research/motion-study.md), and [`research/critique.md`](./research/critique.md).

## ⚡ Quick start

### Requirements

- Node.js `22.12` or newer
- npm

### Install and run

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. The development server is intentionally bound to `127.0.0.1`.

### Build and preview

```sh
npm run build
npm run preview
```

The generated `dist/` folder is a static build. Serve it over HTTP; do not open `index.html` directly from Finder.

### Test

```sh
npm test
```

The test suite checks catalogue integrity, unique IDs, price validity, bag sanitisation, quantity limits, totals, order-enquiry formatting, brand assignments, contact validation, demo orders, and mood matching.

## 🧭 Core journeys

### 1. Start with a feeling

The home page introduces the collection through a responsive visual hero, then moves through featured fragrances, a Fakhar pairing, the scent finder, and the wider world of the house. The goal is to create an emotional entry point before asking visitors to filter products.

### 2. Explore without getting lost

The shop supports:

- text search across product names and descriptions;
- family filters such as warm, floral, fresh, woody, and all;
- brand browsing;
- price sorting;
- stock filtering;
- progressive loading for the catalogue;
- saved scents and comparison.

The catalogue is loaded from [`src/data/catalog.json`](./src/data/catalog.json) and shaped into typed product helpers in [`src/lib/shop.ts`](./src/lib/shop.ts).

### 3. Make discovery feel personal

The scent finder uses real product content rather than hard-coded recommendations. It combines mood matching, availability, purchasability, budget, and a preference for local imagery to return a concise three-fragrance edit.

### 4. Keep commerce honest

The bag is intentionally a demo interaction:

- quantities are capped and validated;
- unknown, duplicate, corrupt, and unavailable lines are rejected;
- totals are calculated from the catalogue snapshot;
- the final action prepares an enquiry for review;
- no payment, account password, address, or order is sent to a live commerce system.

This makes the prototype safe to present while leaving a clear seam for a future merchant-approved checkout.

## 🗂️ Project map

```text
src/
├── App.tsx                 # Shell, routes, header, footer, dialogs
├── components/             # Motion, product cards, shared UI primitives
├── data/                   # Catalogue and brand snapshots
├── lib/
│   ├── contact.ts          # Contact draft and demo contact helpers
│   ├── demo.ts             # Local profile and demo-order persistence
│   ├── shop.ts             # Product types, filtering, bag logic, money
│   ├── shop.test.ts        # Behaviour and data integrity tests
│   └── store.tsx           # Browser-persistent storefront state
├── pages/
│   ├── Commerce.tsx        # Product, bag, checkout, wishlist, compare
│   ├── Home.tsx            # Landing page and featured stories
│   ├── Information.tsx     # About, contact, account, journal, policies
│   └── Shop.tsx            # Collection, brands, filters, discovery
└── styles.css              # Art direction, responsive layout, motion, states
```

Supporting material lives in [`research/`](./research/):

- `design.md` — visual direction and composition decisions;
- `motion-study.md` — motion references and interaction intent;
- `visual-assets.md` — generated and local image inventory;
- `catalog-provenance.json` — catalogue provenance and snapshot metadata;
- `critique.md` — final design critique and known limitations;
- `checkout-feasibility.md` — what must change before a real launch;
- `scrape_catalog.py` and `scrape_brand.py` — historical data-preparation utilities.

## 🧪 Demo boundaries

This project intentionally uses a **dummy Lattafa destination** for source-style URLs and email placeholders. It contains no live links to the original external store. That keeps the pitch self-contained and prevents accidental navigation, enquiries, or asset refreshes from reaching a third-party production site.

Before any commercial launch, a product owner would need to:

1. connect a merchant-approved catalogue and checkout;
2. replace the demo contact details and destination URLs;
3. verify current prices, availability, shipping, returns, and tax rules;
4. confirm image, logo, bottle-art, and copy usage rights;
5. add real account, order, payment, and customer-support services;
6. re-test keyboard, reduced-motion, touch, WebGL fallback, and real-device performance;
7. remove or rework any historical source snapshots that are no longer appropriate.

## ♿ Accessibility and resilience

The prototype includes visible focus states, semantic labels, touch-sized controls, scoped keyboard interactions, reduced-motion handling, image dimensions, alt text, and non-WebGL fallbacks. The most important flows remain available without the 3D hero.

The layout has been reviewed at desktop, tablet, and mobile widths. Browser QA notes and screenshots are retained under [`.taste-skill/`](./.taste-skill/). Real-device GPU performance and Safari coverage still need a production pass.

## 🛠️ Technology

- React 19 and TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide icons
- Radix UI primitives
- Three.js for the lazy-loaded spatial hero
- Node’s built-in test runner through `tsx`

No server, database, payment provider, or authentication service is required to run the demo.

## ✨ A useful next step

If you are evaluating this as a redesign direction, start with the home page at `/`, try the scent finder, then browse to `/shop` and test the full journey from product discovery to a local demo bag. The strongest handoff is not a single screen; it is the feeling that the collection has a point of view from the first frame to the final enquiry.
