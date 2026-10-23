# Public Store API checkout feasibility

23 October 2026. Target: https://lattafang.com/wp-json/wc/store/v1/. App unchanged.

**Answer:** WooCommerce supports headless cart/checkout without private API credentials, using a per-shopper Cart-Token. This merchant exposes that capability and currently lists `paystack`. However, its actual GET responses omit `Access-Control-Allow-Origin`, so a browser on another origin cannot presently read them. Direct cross-origin checkout is **not yet viable as configured**. A merchant CORS fix or a same-origin backend proxy is needed before integrating the token flow. Payment completion remains untested.

## What the official API supports

- [Cart Tokens](https://developer.woocommerce.com/docs/apis/store-api/cart-tokens): GET `/cart` issues a `Cart-Token`; sending it on subsequent cart/checkout requests identifies the shopper's cart without cookie sessions or a nonce.
- [Store API overview](https://developer.woocommerce.com/docs/category/store-api): the customer-facing API does not require private consumer keys.
- [WooCommerce 9.8 CORS changes](https://developer.woocommerce.com/2025/04/02/store-api-updates-coming-in-woocommerce-9-8/): browser-readable Cart-Token exposure supports headless clients; Nonce is not similarly exposed.
- [Checkout API](https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/checkout): authenticated checkout GET can create a draft order; payment processing uses POST with addresses, payment method and gateway-specific payment data, then returns a payment result including a redirect URL. Therefore this audit deliberately did **not** send a token to checkout GET.
- [Payment integration](https://developer.woocommerce.com/docs/block-development/extensible-blocks/cart-and-checkout-blocks/checkout-payment-methods/payment-method-integration): existing gateways can process Store API payment data through legacy handling or a dedicated integration. This does not prove compatibility of the merchant's installed Paystack version.

## Live observations

Eleven GET/OPTIONS requests only. Origins tested: `http://localhost:5173` and `https://lattafa-pitch.example`. No cookies were sent. A newly issued Cart-Token was replayed only to GET `/cart`, kept in process memory, and never printed or saved.

| Request | Result | CORS origin result |
| --- | --- | --- |
| GET `/cart`, localhost origin | 200; empty cart; Cart-Token present | Allow-Origin absent |
| GET `/cart` with the new Cart-Token, localhost origin | 200; empty cart; token accepted | Allow-Origin absent |
| GET `/cart`, separate HTTPS origin | 200; same response shape | Allow-Origin absent |
| OPTIONS `/cart`, localhost origin | 200; initially generic response with no CORS headers | Absent |
| GET `/checkout`, no token or nonce | 401, code `woocommerce_rest_missing_nonce` | Allow-Origin absent |
| OPTIONS `/checkout`, each origin | 200 | Echoes supplied origin |
| Cache-busted GET `/cart`, localhost origin | 200; `Cache-Control: no-store`, `X-LiteSpeed-Cache: miss` | Still absent |
| Cache-busted GET `/checkout`, no token | Same 401 error | Still absent |
| Cache-busted OPTIONS `/cart` and `/checkout` | 200 | Echoes localhost origin |

The cache-busted retry makes a stale cached response an insufficient explanation for the missing GET header. Server returned LiteSpeed. Under [browser CORS rules](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin), successful preflight alone does not make a GET response readable: the actual response also needs an allowed origin. This browser consequence is an inference from the measured headers, not an executed browser checkout test.

### Header names and safe CORS values

On GET responses and the WordPress-handled preflights:

- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE`
- `Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Disposition, Content-MD5, Content-Type, Cart-Token, Nonce`
- `Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages, Link, Cart-Token`
- `Vary: Origin`

`Access-Control-Allow-Origin` appeared on checkout preflights and cache-busted cart preflight, but never on the actual cart/checkout GETs in this audit. GET `/cart` sent headers named `Cart-Token`, `Nonce`, `Nonce-Timestamp`, and `User-ID`; no values are retained here. `Nonce` was not in Expose-Headers. No `Set-Cookie` header appeared in the tested anonymous GETs.

The `Allow` header on the cart base route was `GET`; checkout was `GET, POST, PUT, PATCH`. Actual cart mutation subroutes such as `/cart/add-item` were not probed.

### Public response capabilities

Anonymous cart GET exposed schema keys for items, coupons, fees, totals, shipping rates, cross-sells, errors, extensions, address structures, and payment requirements/methods. No address or personal field values were printed or retained. Safe observed values:

- Currency: `NGN`.
- `items_count: 0`; `needs_payment: false`; `needs_shipping: false`.
- `payment_methods: ["paystack"]`.
- `payment_requirements: ["products"]`.

This confirms Paystack is advertised for the tested anonymous empty-cart context. It does not establish live/test mode, required payment data, a public SDK key, shipping eligibility, successful authorization, or redirect completion. The earlier broad audit's “payment gateway unknown” is superseded by this narrower response evidence.

## Integration implication

With working response CORS, the intended flow is: GET cart → keep the returned token per shopper → send it with cart operations → render server totals/shipping/payment availability → submit authorized checkout → follow the server-provided payment redirect. Private WooCommerce consumer secrets are unnecessary for this customer flow; merchant payment secrets remain on its server. Paystack-specific client configuration may still be required.

For the existing configuration, use a same-origin API layer on the new site's host, or have the merchant correct CORS on both preflight and actual Store API responses. A local Vite proxy could establish a development connection, but production also needs an equivalent server route or reverse proxy. None was implemented by this audit.

A Cart-Token is a request header, not an automatic merchant-site browser cookie. Simply navigating a shopper from a token-based headless cart to the merchant's ordinary `/checkout/` page does not establish shared cart state; any handoff needs an intentional session bridge or the Store API's returned payment redirect.

**Not tested:** cart changes, shipping/customer updates, token-bearing checkout GET, order creation, payment POST, payment provider reachability, or a browser CORS fetch. No add-to-cart, checkout mutation, personal-data submission, or messages were sent. Gateway compatibility and production payment approval remain required before claiming live checkout.

