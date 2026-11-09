<div align="center">
  <img src="./public/assets/catalog/brand-logo.svg" alt="Lattafa" width="220">

  <h1>Lattafa Scent Studio</h1>

  <p><strong>A fragrance discovery experience with a point of view.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-1f3d37?style=for-the-badge&logo=react&logoColor=f7f6f2" alt="React 19">
    <img src="https://img.shields.io/badge/TypeScript-5.9-cb8f5b?style=for-the-badge&logo=typescript&logoColor=f7f6f2" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-7-8c4a3f?style=for-the-badge&logo=vite&logoColor=f7f6f2" alt="Vite">
    <img src="https://img.shields.io/badge/Demo-Local_only-2b2926?style=for-the-badge" alt="Local demo">
  </p>
</div>

<div align="center">
  <img src="./public/assets/perfume-atmosphere.jpg" alt="Warm perfume atmosphere with glass, amber and shadow" width="100%">
</div>

Lattafa Scent Studio is an editorial storefront concept built around one simple
idea:

> **The best fragrance shop does not start with a filter. It starts with a feeling.**

Instead of presenting a catalogue as a wall of products, the experience gives
every visitor a more personal way in:

- discover a mood;
- follow a note;
- meet a fragrance family;
- compare bottles;
- save the ones that stay with you;
- build a small scent wardrobe;
- prepare an enquiry when you are ready.

This repository is a **front-end pitch and interaction prototype**. It is not a
production checkout, payment service, inventory system, or customer database.

<div align="center">
  <img src="./public/assets/khamrah-cutout.png" alt="Khamrah bottle cutout" width="180">
  <img src="./public/assets/fakhar-black-cutout.png" alt="Fakhar Black bottle cutout" width="180">
  <img src="./public/assets/fakhar-rose-cutout.png" alt="Fakhar Rose bottle cutout" width="180">
</div>

<p align="center"><em>Warm amber. Clean glass. A catalogue made personal.</em></p>

---

## 🌒 The atmosphere

The interface is designed to feel like stepping into a quiet fragrance room:
warm paper, dark ink, glass, amber, fabric, and a bottle waiting in the light.

| Material | Interface expression |
| --- | --- |
| **Glass** | Responsive product imagery and the lazy-loaded spatial hero |
| **Paper** | Warm neutral surfaces, generous editorial spacing, soft page rhythm |
| **Ink** | High-contrast typography and confident headings |
| **Amber** | Warm fragrance families, notes, product stories, and campaign still lifes |
| **A scent strip** | Small moments of motion that guide attention without slowing the shop |

The result is intentionally closer to a fragrance campaign than a conventional
marketplace grid.

### 🎨 The palette

The README mirrors the interface palette so the project’s personality is visible
before the app is opened:

<table>
  <tr>
    <td align="center" width="20%"><div style="background:#f7f6f2;padding:28px;border:1px solid #d9d5cc;">&nbsp;</div><strong>Paper</strong><br><code>#F7F6F2</code></td>
    <td align="center" width="20%"><div style="background:#2b2926;padding:28px;">&nbsp;</div><strong>Ink</strong><br><code>#2B2926</code></td>
    <td align="center" width="20%"><div style="background:#1f3d37;padding:28px;">&nbsp;</div><strong>Deep green</strong><br><code>#1F3D37</code></td>
    <td align="center" width="20%"><div style="background:#cb8f5b;padding:28px;">&nbsp;</div><strong>Amber</strong><br><code>#CB8F5B</code></td>
    <td align="center" width="20%"><div style="background:#8c4a3f;padding:28px;">&nbsp;</div><strong>Clay</strong><br><code>#8C4A3F</code></td>
  </tr>
</table>

### 📸 The visual world

<table>
  <tr>
    <td width="50%"><img src="./public/assets/khamrah-editorial.jpg" alt="Khamrah editorial still life"></td>
    <td width="50%"><img src="./public/assets/catalog/campaign-perfume.jpeg" alt="Perfume campaign bottle"></td>
  </tr>
  <tr>
    <td align="center"><strong>Editorial still life</strong><br><sub>Warm notes, texture, shadow</sub></td>
    <td align="center"><strong>Campaign object</strong><br><sub>A bottle treated as a visual anchor</sub></td>
  </tr>
</table>

---

## ✨ What is inside

### 🏠 A considered landing page

The home page introduces the collection as a world rather than a list. It
combines:

- a pointer-responsive 3D hero;
- a WebGL-safe image fallback;
- a featured fragrance edit;
- a Fakhar for-him / for-her pairing;
- the scent finder;
- a house and collection introduction;
- editorial routes into the shop, brands, and journal.

### 🧭 A catalogue that stays usable

The shop is built for a large collection without making the visitor feel lost.
Visitors can:

- search product names and descriptions;
- browse by fragrance family;
- browse by brand;
- sort by price;
- show available products;
- progressively load the collection;
- open quick views;
- visit full product pages;
- save and compare fragrances.

### 🌬️ A scent finder

The finder asks two small questions:

1. **What notes are you drawn to?**
2. **What is your budget?**

It then returns a short edit from the real catalogue snapshot, using product
content, stock status, purchasability, budget, and a preference for local
imagery.

### 🛍️ A local demo bag

The bag behaves like a real storefront interaction while remaining safely local:

- add and remove products;
- change quantities;
- cap quantities at ten per product;
- reject corrupt or unknown lines;
- reject unavailable products;
- calculate a catalogue subtotal;
- prepare an enquiry for review;
- keep the visitor in control of sending it.

No payment is collected and no order is submitted automatically.

### 💌 A personal scent wardrobe

The demo account experience supports:

- a local profile;
- saved fragrances;
- a local bag;
- local comparison;
- demo orders;
- sign-in and sign-out without passwords.

Everything is stored in the browser for the prototype. There is no production
authentication service behind it.

### 📖 A journal layer

The journal gives the collection a slower editorial rhythm: notes, rituals,
signature scent guidance, and small invitations to explore beyond a product
tile.

---

## 🎨 Visual direction

The design system is built around a small number of deliberate choices:

### Type

- oversized campaign headings;
- short, memorable lines;
- strong contrast between display type and readable body copy;
- left-aligned editorial composition;
- generous measure and line height for long-form sections.

### Colour

- warm neutral grounds;
- deep ink for primary reading;
- restrained accent colour for actions and focus;
- surface changes instead of excessive borders;
- no dependency on gradients or decorative glow.

### Motion

Motion is used to establish a feeling of tactility:

- launch sequence;
- section reveals;
- product card movement;
- coverflow gestures;
- quick-view transitions;
- 3D hero rotation;
- hover, press, and focus feedback;
- reduced-motion fallbacks.

The page remains readable and usable when motion is reduced or unavailable.

### Composition

The main page avoids a repeated “hero + three cards + generic CTA” template.
Sections change pace and scale so that the collection feels like a curated
world:

```text
feeling → atmosphere → featured scent → collection → finder → house → journal
```

---

## 🧴 The visitor journey

```text
┌──────────────────┐
│  Open the studio │
└────────┬─────────┘
         ↓
┌──────────────────────┐
│  Follow a feeling    │
│  or search a name    │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│  Explore notes,      │
│  imagery and price   │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│  Save, compare,      │
│  or add to the bag   │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│  Prepare an enquiry  │
│  without auto-send   │
└──────────────────────┘
```

The prototype is strongest when experienced as a complete journey rather than
as a collection of isolated screens.

---

## 🗺️ Page map

| Route | Purpose |
| --- | --- |
| `/` | Editorial landing page |
| `/shop` | Full fragrance collection |
| `/brands` | Brand index |
| `/brands/:brandSlug` | Products within a brand |
| `/product/:slug` | Product detail |
| `/wishlist` | Saved fragrances |
| `/compare` | Side-by-side fragrance comparison |
| `/cart` | Local demo bag |
| `/checkout` | Demo checkout flow |
| `/order/:orderId` | Local demo order confirmation |
| `/account` | Local demo profile and order history |
| `/about` | Brand and collection story |
| `/journal` | Editorial fragrance stories |
| `/contact` | Contact preparation flow |
| `/delivery-returns` | Shopping help |
| `/privacy` | Fictional, demo-only privacy content |
| `/terms` | Fictional, demo-only terms content |

The Privacy and Terms pages are intentionally local routes. They contain sample
copy for this design prototype and are not legal advice or live merchant
policies.

---

## ⚡ Run it locally

### Requirements

- Node.js `22.12` or newer
- npm

### Install

```sh
npm ci
```

### Start development

```sh
npm run dev
```

Vite binds to `127.0.0.1`. Open the local URL printed in your terminal.

### Build production assets

```sh
npm run build
```

### Preview the production build

```sh
npm run preview
```

The generated `dist/` folder must be served over HTTP. Opening
`dist/index.html` directly from Finder does not reproduce the application
runtime correctly.

### Run the tests

```sh
npm test
```

The current suite covers:

| Test area | What is checked |
| --- | --- |
| Catalogue | size, unique IDs, valid prices, safe demo URLs |
| Bag parsing | corrupt JSON, unknown products, duplicates, invalid quantities |
| Bag rules | stock validation and quantity ceiling |
| Money | product totals and bag subtotal |
| Enquiries | generated email body and selected products |
| Mood matching | recommendations use actual product content |
| Brands | product assignments and brand counts |
| Contact | required fields and email validation |
| Demo orders | valid local order shape and total |
| Profiles | invalid profile data is rejected |

---

## 🧱 Project structure

```text
.
├── public/
│   ├── assets/                 # Local product, campaign, logo and visual assets
│   └── favicon.svg
├── research/
│   ├── design.md               # Visual direction
│   ├── motion-study.md        # Motion decisions
│   ├── visual-assets.md       # Asset inventory and limitations
│   ├── critique.md             # Design critique and known warnings
│   ├── checkout-feasibility.md# Production checkout considerations
│   ├── catalog-provenance.json# Snapshot provenance
│   ├── brand-source-inventory.json
│   ├── scrape_catalog.py       # Historical catalogue utility
│   └── scrape_brand.py         # Historical brand utility
├── src/
│   ├── App.tsx                # App shell, routes, header, footer, dialogs
│   ├── components/
│   │   ├── Motion.tsx          # Reveal and transition helpers
│   │   ├── ProductCard.tsx     # Product presentation
│   │   └── ui/                 # Shared Radix/shadcn-style primitives
│   ├── data/
│   │   ├── catalog.json        # Product snapshot
│   │   └── brands.json         # Brand snapshot
│   ├── lib/
│   │   ├── contact.ts          # Contact draft and WhatsApp destination
│   │   ├── demo.ts             # Local profiles and demo orders
│   │   ├── shop.ts             # Product, filter, bag and money logic
│   │   ├── shop.test.ts        # Behaviour tests
│   │   └── store.tsx           # Browser-persistent state
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── Shop.tsx            # Collection and brands
│   │   ├── Commerce.tsx        # Product, bag, checkout and compare
│   │   └── Information.tsx    # About, contact, policies and journal
│   └── styles.css              # Full visual system and responsive layout
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔌 Technology

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 plus project CSS |
| Motion | Framer Motion |
| Icons | Lucide |
| Primitives | Radix UI |
| 3D | Lazy-loaded Three.js scene |
| Routing | React Router |
| Validation | Node test runner through `tsx` |
| Persistence | Browser `localStorage` for demo state |

No server, database, payment provider, or password system is required to run
the current prototype.

---

## 🧪 Demo boundaries

This project contains intentionally fictional destinations and contact content
for safe presentation:

- product source-style URLs point to a reserved demo domain;
- policy pages are internal routes;
- the contact email is a placeholder;
- the WhatsApp action uses the configured demo contact channel;
- the displayed phone and address are dummy studio details;
- enquiry actions require an explicit visitor action;
- no card or payment details are collected;
- no production order is placed;
- no personal profile is uploaded to a remote service.

Treat all prices, stock, descriptions, imagery, and delivery language as
prototype data until a merchant-approved source is connected.

---

## 🚀 Before a commercial launch

### Commerce

- [ ] Connect an approved catalogue source.
- [ ] Confirm product names, sizes, prices, currencies, and availability.
- [ ] Add a secure checkout and payment provider.
- [ ] Add order creation, fulfilment, cancellation, and refund flows.
- [ ] Confirm delivery areas, fees, timing, taxes, and returns.

### Content and rights

- [ ] Confirm permission to use every logo and bottle image.
- [ ] Review generated campaign imagery and replacement requirements.
- [ ] Replace snapshot descriptions with approved copy.
- [ ] Add legally reviewed privacy, terms, cookie, and returns content.
- [ ] Replace all fictional contact and studio details.

### Production

- [ ] Add real account and authentication services if required.
- [ ] Add server-side validation at every commerce boundary.
- [ ] Add monitoring, error reporting, and secure logging.
- [ ] Run accessibility checks with keyboard and assistive technology.
- [ ] Test Safari, real mobile devices, touch, reduced motion, and WebGL fallback.
- [ ] Measure bundle size and split large client chunks where useful.

---

## ♿ Accessibility and resilience

The prototype includes:

- skip navigation;
- semantic headings and landmarks;
- visible focus states;
- labelled icon buttons;
- alt text and explicit image dimensions;
- keyboard-aware menus and dialogs;
- touch-sized controls;
- reduced-motion support;
- non-WebGL product imagery fallback;
- readable empty, error, and unavailable states;
- local persistence that degrades safely when storage is unavailable.

The experience has been reviewed at desktop, tablet, and mobile widths. A
production handoff should still include real-device testing, Safari testing,
screen-reader testing, and performance profiling on slower connections.

---

## 🧠 Design notes

The key design decision is not “make the shop prettier.” It is:

> **Give a large fragrance catalogue the pacing of an editorial story.**

That means:

1. Begin with atmosphere.
2. Give the visitor a human prompt.
3. Make the catalogue searchable when they know what they want.
4. Make it browsable when they do not.
5. Let product details earn attention through notes, imagery, and comparison.
6. Make the bag useful without pretending it is a live checkout.
7. End with a clear, calm next step.

The supporting research is in [`research/design.md`](./research/design.md),
[`research/motion-study.md`](./research/motion-study.md), and
[`research/critique.md`](./research/critique.md).

---

## 🧭 A good first tour

For the fullest impression:

1. Open `/`.
2. Let the launch transition finish.
3. Scroll through the opening story.
4. Try the scent finder with a warm family and a mid-range budget.
5. Open `/shop` and search for a familiar fragrance.
6. Save one product and compare two.
7. Add a product to the bag.
8. Visit `/checkout` to see the demo boundary.
9. Open `/privacy` and `/terms` from the footer.
10. Visit `/contact` and review the prepared message before sending.

The experience is designed to feel complete even though the commerce layer is
deliberately not connected to a live backend.

---

## 📌 Short version

**Lattafa Scent Studio** is a warm, editorial, motion-led fragrance storefront
prototype that turns catalogue browsing into personal discovery.

It is:

- rich in product discovery;
- careful with demo boundaries;
- responsive across screen sizes;
- designed around real interactions;
- accessible when enhanced features are unavailable;
- ready to become a production foundation once commerce, content rights, and
  legal copy are properly connected.
