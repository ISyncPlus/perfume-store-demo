# Visual assets and evidence

## Observed source material

- Lattafa Nigeria catalog and 75 local source images: `catalog-provenance.json`, `raw/products-page-1.json` through `raw/products-page-7.json`. Product URLs and original image URLs are preserved per record in `src/data/catalog.json`.
- Source wordmark: `public/assets/catalog/brand-logo.svg`, from `https://lattafang.com/wp-content/uploads/2024/08/Screenshot_2024-08-16_193643-removebg-preview.svg`. Copyright remains with the brand.
- Unused source campaign image: `public/assets/catalog/campaign-perfume.jpeg`, from `https://lattafang.com/wp-content/uploads/2024/10/banner-bg-h6.jpeg`. Retained as research; it is not shown in the final design.
- Outfit font: local Google Fonts files in `public/assets/fonts/`, originally served by `fonts.gstatic.com`. Outfit is the source website's display family.

## Generated or adapted assets

All use the built-in ImageGen tool. These are concept assets for the pitch. They are not claimed as official merchant photographs. Source bottle identity should be approved by the merchant before commercial use.

| Project asset | Role | Prompt |
| --- | --- | --- |
| `public/assets/khamrah-cutout.png` | Hero fallback, photographic front of the 3D volume, product views | Isolate only the actual Khamrah bottle from the source presentation sheet on a transparent background. Remove packaging, fabric, barcode and surrounding text. Preserve its amber liquid, faceted crystal cap, glass, gold label and original lettering. Upright premium studio photograph; no added background or cast shadow. |
| `public/assets/fakhar-black-cutout.png` | Fakhar variant, catalog and coverflow | Isolate only the source's black round Fakhar bottle. Remove packaging and presentation text. Preserve original silhouette, decorative medallion, black/silver materials, cap and lettering. Transparent, full upright bottle with margins. |
| `public/assets/fakhar-rose-cutout.png` | Fakhar variant, catalog and coverflow | Isolate only the source's white and rose-gold round Fakhar bottle. Remove packaging and presentation text. Preserve original silhouette, medallion, cap, materials and lettering. Transparent, full upright bottle with margins. |
| `public/assets/perfume-atmosphere.png` | Hero environment | Premium perfume campaign set: pale mineral stone ledge, clear rippled water, fine mist, bergamot branch at upper right, warm silver and sandstone light. Calm left-side space for typography. No bottle, text, logo, packaging or fashion objects. |
| `public/assets/khamrah-editorial.png` | Editorial section | Preserve the exact reference Khamrah bottle on dark travertine with cinnamon bark, split nutmeg and dates. Architectural afternoon studio light, crystal caustics, bronze and mineral tones. Vertical premium product photograph. No added graphic text or unrelated products. |

The 3D scene is a local Three.js glass decanter with amber volume and a photographic front. Rotation is deliberately bounded to preserve the source's engraved front. It is a textured art reconstruction, not a source manufacturer model. It has no remote model dependency. The hero's background remains a static campaign still; the product supplies the movement. Under reduced motion, automatic travel stops. If WebGL fails, the still product remains, with a small pointer response where motion preferences permit it.

The opaque hero atmosphere and editorial artwork are served as optimized JPEG copies (`perfume-atmosphere.jpg` and `khamrah-editorial.jpg`); the original PNG exports are retained. Transparent bottle assets retain their alpha channels. The exact ImageGen prompts were normalized in this table for the delivered asset record.

## REA inspiration evidence

The supplied Anubi site was inspected through `capture_browser_scenario`, evidence `ev_0a14b6c5dca6a7fa28e959e94d5dfff315a7e8cf0b2a2e012768eb0df3542f82`. Observed: a creative studio site with CGI/motion positioning and project imagery. The final storefront's composition and implementation are design decisions; no Anubi code or proprietary component is represented as copied. Source-asset ownership and exact runtime behavior beyond that observation remain outside the evidence boundary.

No open-collection or stock-library photographs were used, so there are no external stock-license credits to list. Brand/source and AI-adaptation credit is placed in the visible footer.
