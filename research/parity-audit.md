# Lattafa Nigeria shop parity audit

Audit date: 23 October 2026. Scope: public HTTP GETs, rendered page text, HTML forms and configuration, plus the retained 697-product Store API snapshot. No cart, wishlist, account, order, review, message, or payment mutations were performed. This is observed source coverage, not a claim that submissions or payment processing were tested.

## Route and behavior matrix

| Area | Exact source route | Observed behavior / minimum parity |
| --- | --- | --- |
| Home | [/](https://lattafang.com/) | Product search; brand tabs All, Lattafa, Asdaff, Lattafa Pride, Rave, Alhambra; product prices, stock labels, quick view, add-to-cart; cart/wishlist counters. Brand tabs use in-page anchors `#wdt-tabs-0` through `#wdt-tabs-5`. |
| Full shop | [/shop/](https://lattafang.com/shop/) | Paginated catalog (10 products per page, approximately 70 pages), grid/list modes and column controls, category selector, keyword product search, product links and stock-aware cart actions. |
| Search | [/?s=khamrah&post_type=product](https://lattafang.com/?s=khamrah&post_type=product) | Product search form submits GET parameters `s` and `post_type=product`. Header search also uses `s`. Search submission URL is established from the form; no search query results were separately audited. |
| Sorting | [/shop/?orderby=price](https://lattafang.com/shop/?orderby=price) | Form options: `menu_order`, `popularity`, `rating`, `date`, `price`, `price-desc`. Parameter established from rendered form, not separately tested for each order. |
| Category | [/product-category/{slug}/](https://lattafang.com/product-category/lattafa/) | Category archives keep shop controls and pagination. Canonical category slugs are listed below. |
| Men | [/product-tag/men/](https://lattafang.com/product-tag/men/) | Product tag archive, 26 catalog assignments. |
| Women | [/product-tag/women/](https://lattafang.com/product-tag/women/) | Product tag archive, 29 catalog assignments. |
| Unisex | [/product-tag/unisex/](https://lattafang.com/product-tag/unisex/) | Product tag archive, 37 catalog assignments. |
| Product | [/product/{slug}/](https://lattafang.com/product/khamrah/) | Main image, price in NGN, quantity input, add-to-cart POST, category/tag links, description, review form, compare control. Sold-out listings show read-more instead of add-to-cart. |
| Cart | [/cart/](https://lattafang.com/cart/) | Real WooCommerce cart route returned HTTP 200 with an empty cart. Header mini-cart/counter and WooCommerce cart-fragments configuration are present. Nonempty-cart quantity, remove, coupon, shipping and totals behavior was not exercised in this read-only audit. |
| Checkout | [/checkout/](https://lattafang.com/checkout/) | Empty anonymous session redirects to `/cart/`. Checkout fields, shipping rules, payment gateways and order creation remain unverified; do not claim fake success from a local form. |
| Account | [/my-account/](https://lattafang.com/my-account/) | WooCommerce login with username/email, password and remember-me; email registration with newsletter opt-in. Forms use server nonces. No authenticated dashboard/order/address behavior was tested. |
| Header login | [/wp-login.php?redirect_to=…](https://lattafang.com/wp-login.php?redirect_to=https%3A%2F%2Flattafang.com%2F) | Header's actual login link points to WordPress login with return URL. Direct request encountered a browser verification page. The accessible WooCommerce account route is a better integration target. |
| Password recovery | [/my-account/lost-password/](https://lattafang.com/my-account/lost-password/) | Username or email input and reset-password POST form with nonce. Email delivery untested. |
| Wishlist | [/wishlist/](https://lattafang.com/wishlist/) | Empty table has product, unit price and stock status. YITH Wishlist frontend config exposes add/remove operations, cookie dependency and remove-after-add-to-cart behavior. Persistence and mutations were not exercised. |
| Compare | [/?action=yith-woocompare-view-table&iframe=yes](https://lattafang.com/?action=yith-woocompare-view-table&iframe=yes) | Renders comparison table/empty state. Product control targets `?action=yith-woocompare-add-product&id={id}`; footer says select at least two. Add/remove not executed. No standalone `/compare/` route was established. |
| Product reviews | [/product/khamrah/#reviews](https://lattafang.com/product/khamrah/#reviews) | Review form requests star rating, review, name, email, optional cookie consent, and POSTs to `/wp-comments-post.php`. Snapshot has zero reviews across all 697 products; do not invent ratings. Moderation/delivery untested. |
| Contact | [/contact-us/](https://lattafang.com/contact-us/) | Contact Form 7 form has first name, last name, email, mobile number and message; POST action `/contact-us/#wpcf7-f907-p868-o1`. Header `/contact/` redirects here. No message sent. |
| WhatsApp | [wa.me/2349160481391](https://wa.me/2349160481391) | First-party homepage `chaty_settings` configuration explicitly specifies channel `Whatsapp`, value `2349160481391`. Link handoff supported; account reachability not tested. |
| About | [/about/](https://lattafang.com/about/) | Brand/company story, hours and contact details. |
| Return policy link | [/policy/](https://lattafang.com/policy/) | Footer label says Return Policy, but destination contains a privacy/data-use policy, not a substantive return procedure. Preserve access; merchant must supply actual returns terms before launch. |
| Terms | [/terms/](https://lattafang.com/terms/) | Existing terms/privacy-related text, cookies and security statements. Source includes UAE-related references; merchant review required before republishing as Nigerian store policy. |
| Blog | [/blog/](https://lattafang.com/blog/) | Three post teasers dated 10 October 2024. Article pages have author/date and comment forms. |
| Articles | [/perfume-as-art/](https://lattafang.com/perfume-as-art/), [/finding-your-signature-scent/](https://lattafang.com/finding-your-signature-scent/), [/power-of-perfume/](https://lattafang.com/power-of-perfume/) | Routes confirmed from blog links. First and third article content read; signature-scent page returned browser verification through the web reader. Comments not submitted. |
| Newsletter | Footer email form | WDT/Mailchimp form is present, but exposed API-key and list-ID input values were empty. No functioning subscription backend established. |

## Brand data delivered

`src/data/brands.json` is a plain array with `name`, `slug`, `kind`, `count`, `inStockCount`, `categoryNames`, `categorySlugs`, `sourceCategoryIds`, `sourceUrl`, `aliases`, `productIds`, and `evidence`.

Use `productIds.includes(product.id)` to filter by brand. Comparing only `product.categories` silently loses all Alhambra products because the source per-product API omits that category. Counts are snapshot assignments, not sales figures.

| Display name | Canonical slug | Products | In stock |
| --- | --- | ---: | ---: |
| Lattafa | `lattafa` | 253 | 131 |
| Asdaaf | `asdaaf` | 21 | 9 |
| Lattafa Pride | `lattafa-pride` | 90 | 68 |
| Rave | `rave` | 12 | 5 |
| Alhambra | `alhambra` | 287 | 73 |
| Niche Emarati | `niche-emarati` | 17 | 15 |
| Al Zafaran | `al-zafaran` | 8 | 2 |
| Vurv | `vurv` | 2 | 1 |
| Lattafa Pride Kids Perfume | `lattafa-pride-2` | 6 | 6 |

**Evidence and mappings**

- Public category inventory: [Store API categories](https://lattafang.com/wp-json/wc/store/v1/products/categories?per_page=100). Source category IDs: Alhambra 17; Lattafa 66; Lattafa Pride 74; Rave 76; Vurv 77; Niche Emarati 78; Asdaaf 84; Lattafa Pride Kids Perfume 97; AL zafaran 101.
- Alhambra's category endpoint reports 287 products. Exact IDs recovered from [category-filtered products](https://lattafang.com/wp-json/wc/store/v1/products?category=17&per_page=100&page=1&_fields=id), pages 1–3 (100 + 100 + 87). All IDs exist in the frozen catalog. No name-based inference used.
- Homepage tab misspelling `Asdaff` maps to source category name `Asdaaf` and slug `asdaaf`. `AL zafaran` is displayed as Al Zafaran; original category spelling retained in `categoryNames`.
- `lattafa-pride-2` is the actual source slug for Lattafa Pride Kids Perfume. Pride, Kids and Niche Emarati are retained as collections, not asserted to be separate legal companies.
- Source categories are not mutually exclusive: product 10529 MISHLAH BY LATTAFA belongs to Lattafa and Alhambra; 8864 RAGE RAVE belongs to Lattafa and Rave. Do not sum brand counts as a unique-product total.
- Brand mapping covers 694 unique catalog products. Leave three unclassified rather than invent membership: 10198 SWAR VANILLA BLANC (New Arrivals only); 4785 Qaaed Al Shabaab (Oriented Fragrances only); 4645 Confidential Platinum (French Oriented / Oriented Fragrances only).
- Other real nonbrand category slugs: `new-arrivals` (46), `oriented-fragrances` (124), `french-oriented` (5), `fragrances` (20), `fragrance` (1).
- Header's `/product-category/oriental-fragrances/` returns HTTP 404; canonical taxonomy is [oriented-fragrances](https://lattafang.com/product-category/oriented-fragrances/). Correct the navigation target.
- All 697 products have source `type=simple`; do not invent purchasable size variants. All source `brands` arrays are empty; merchandising brand groups are product categories.
- 605 products lack a gender tag. Keep those available under All; do not infer gender from names or imagery.

## Merchant integration boundary

A local React implementation can fully implement catalog browsing, filtering, search, pagination, product details, responsive layouts, wishlist/compare and a local cart. Durable orders, authoritative stock/prices, customer accounts, password resets, server reviews, contact delivery, newsletter subscriptions, shipping/tax totals, coupon validation and payment confirmation require a merchant-approved backend integration.

WooCommerce public cart endpoints can use session/Cart-Token or nonce-based operations without embedding private keys. This audit did not validate cross-origin configuration or payment compatibility. Merchant involvement is required to establish the correct store origin/session flow and to connect authorized order, account, email, shipping and payment services. Never put WooCommerce consumer secrets, Mailchimp keys or payment secret keys in the browser bundle. The configured payment provider is **unknown**; Paystack or Flutterwave cannot be claimed from the inspected evidence.

Safe interim handoff routes are the merchant's original product/cart/account/contact pages. A local preview must not claim that a locally saved order, review, account or newsletter form has reached the merchant.

## Contact facts and unresolved details

Published support email: support@lattafang.com. Most visible site copy and Chaty WhatsApp config use +2349160481391. Footer telephone href and About page also use +2349131637118; merchant should select a canonical number. Visible address: 32/33 Awesome God Plaza, beside Rivers Plaza, Trade Fair Complex, Lagos, Nigeria. Merchant opening hours and current returns/shipping promises require confirmation.

## Checks

Checked JSON validity, unique IDs within each brand, count-to-ID consistency, every mapped ID against the frozen 697-product catalog, and exact 287-ID Alhambra recovery. No source catalog or app file changed.

Not checked: submissions, authenticated workflows, nonempty checkout, payment, email delivery, order persistence, or third-party account reachability.

