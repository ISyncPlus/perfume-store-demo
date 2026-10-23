# Lattafa — The scent of you

A complete independent storefront concept for pitching a redesign to Lattafa Nigeria. React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide, Radix/shadcn-style primitives, and a lazy-loaded Three.js product scene.

## Run

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Open the local address Vite prints. To build and serve the production bundle:

```sh
npm run build
npm run preview
```

`npm test` checks catalog integrity, stock validation, corrupt/duplicate bag data, quantity limits, money totals and mood matching. The `dist/` directory is a complete static build; serve it over HTTP rather than opening index.html from Finder.

## Included

- A perfume-specific, pointer-responsive 3D hero, pause/reset controls, keyboard rotation, and image fallback when WebGL is unavailable.
- An accessible 3D coverflow for fragrance discovery, with scoped arrow keys, touch gestures, manual controls, optional autoplay and reduced-motion support.
- A Fakhar for-him/for-her showcase using the actual catalog's notes and prices.
- Search and filtering across 697 products, family filters, sorting, availability, saved scents and progressive loading.
- Product dialogs with source descriptions, fragrance notes, current snapshot availability and links to the source store.
- Persistent local bag with quantities, totals and an email enquiry containing the selected products. No email is sent automatically.
- A scent finder with real catalog recommendations, FAQ, mobile navigation, visible focus states and touch-sized controls.
- Scrapers, raw source snapshots, provenance, generated-asset records, design notes and browser QA screenshots.

`src/components/ui/` is the shared component path, configured in `components.json`, with `@/` aliases. Styles are in `src/styles.css`. The supplied coverflow and spatial showcase patterns were adapted to perfume content and this design rather than retaining restaurant/headphone data.

## Catalog and imagery

All 697 product records were scraped read-only from the public WooCommerce Store API at `https://lattafang.com/wp-json/wc/store/v1/products` on 23 October 2026. The snapshot contains 310 in-stock products. Seventy-five source product images are local; the remaining product images retain their source URLs. Product descriptions, prices, notes and availability are source data. Missing notes are not invented.

Source files and attribution are in `research/catalog-provenance.json` and `research/brand-source-inventory.json`. The source logo is preserved. Khamrah and Fakhar presentation images were adapted into isolated bottle assets with ImageGen. The hero atmosphere and Khamrah still life are generated campaign concepts. See `research/visual-assets.md` for paths, prompts and limitations. A small image credit sits in the footer. No Unsplash images or invented customer reviews are used.

The supplied sneaker video was an inspiration reference and is deliberately excluded from the delivered interface. Its place is taken by perfume imagery and a local, textured 3D glass volume. This is an artist reconstruction for the pitch; it is not a manufacturer CAD model.

To refresh source data, review `research/scrape_catalog.py` first and run it from the project. It uses Python's standard library and writes to this project using its own location. Cached raw pages are retained; remove or version those caches deliberately when a truly fresh catalog is wanted. The `--limit` argument controls how many product images are localized. Rebuild and rerun the tests after a catalog refresh.

## Before commercial launch

Connect a merchant-approved live catalog and checkout. The current bag hands off to `support@lattafang.com` or the original product pages; it does not collect payment or place orders. Confirm product prices, availability, delivery/returns policies, image usage and exact bottle artwork with Lattafa. The public source has inconsistent phone links, so this concept uses its verified support email instead of an unverified WhatsApp number.

The layout has been inspected at 1440, 768 and 390 pixels, including a reduced-motion check; see `.taste-skill/final/report.json` and the screenshots in that folder. The final design critique and defensible warnings are recorded in `research/critique.md`. Real-device GPU performance and Safari were not tested. Devices that do not support WebGL retain the product image and shopping flows.
