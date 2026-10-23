#!/usr/bin/env python3
"""Read the public WooCommerce Store API and retain first-party pitch assets.

Run from anywhere with Python 3.9+: python3 research/scrape_catalog.py
No credentials, cart mutations, customer data, or private endpoints are used.
"""
import concurrent.futures
import argparse
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import time
import urllib.request
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "research/raw"
ASSETS = ROOT / "public/assets/catalog"
ENDPOINT = "https://lattafang.com/wp-json/wc/store/v1/products"
HEADERS = {"User-Agent": "LattafaNigeriaPitchResearch/1.0 (public product catalog; read-only)"}


def fetch(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=60) as response:
                return response.read(), dict(response.headers)
        except Exception:
            if attempt == 2:
                raise
            time.sleep(1 + attempt)


class TextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_data(self, text):
        self.parts.append(text)

    def handle_starttag(self, tag, attrs):
        if tag in {"p", "br", "li", "h1", "h2", "h3", "h4", "h5", "h6"}:
            self.parts.append("\n")


def text_from_html(source):
    parser = TextParser()
    parser.feed(source or "")
    return "\n".join(" ".join(line.split()) for line in unescape("".join(parser.parts)).splitlines() if line.strip())


def notes_from_text(source):
    notes = {"top": [], "heart": [], "base": []}
    for line in source.splitlines():
        match = re.match(r"\s*(top|heart|middle|base)(?:\s+notes?)?\s*[:\-]\s*(.+)", line, re.I)
        if match:
            key = "heart" if match.group(1).lower() == "middle" else match.group(1).lower()
            notes[key] = [value.strip(" .") for value in re.split(r",|;", match.group(2)) if value.strip()]
    return notes


def normalize(product, scraped_at):
    prices = product["prices"]
    short = text_from_html(product.get("short_description", ""))
    description = text_from_html(product.get("description", ""))
    return {
        "id": product["id"], "name": unescape(product["name"]), "slug": product["slug"],
        "price": int(prices["price"] or 0) / (10 ** prices["currency_minor_unit"]),
        "currency": prices["currency_code"], "inStock": product["is_in_stock"],
        "purchasable": product["is_purchasable"], "url": product["permalink"],
        "image": "", "images": [],
        "sourceImages": [{"url": image["src"], "alt": image.get("alt") or unescape(product["name"])} for image in product.get("images", [])],
        "description": description, "shortDescription": short,
        "notes": notes_from_text(short + "\n" + description),
        "categories": [unescape(item["name"]) for item in product.get("categories", [])],
        "tags": [unescape(item["name"]) for item in product.get("tags", [])],
        "attributes": product.get("attributes", []), "scrapedAt": scraped_at,
    }


def download_product_images(product):
    errors = []
    for index, image in enumerate(product["sourceImages"]):
        extension = Path(urlparse(image["url"]).path).suffix.lower()
        if extension not in {".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"}:
            errors.append({"url": image["url"], "error": "Unknown image extension"})
            continue
        filename = f"{product['slug']}{'' if index == 0 else '-' + str(index + 1)}{extension}"
        destination = ASSETS / filename
        try:
            if not destination.exists() or not destination.stat().st_size:
                content, headers = fetch(image["url"])
                if not headers.get("Content-Type", headers.get("content-type", "")).startswith("image/"):
                    raise ValueError("Source did not return an image")
                destination.write_bytes(content)
            product["images"].append("/assets/catalog/" + filename)
        except Exception as error:
            errors.append({"url": image["url"], "error": str(error)})
    product["image"] = next(iter(product["images"]), "")
    return errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true", help="Refresh API snapshots instead of resuming saved pages")
    parser.add_argument("--limit", type=int, default=80, help="Product image download limit (featured names first)")
    args = parser.parse_args()
    RAW.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    (ROOT / "src/data").mkdir(parents=True, exist_ok=True)
    scraped_at = datetime.now(timezone.utc).isoformat()
    products = []
    metadata, headers = fetch(f"{ENDPOINT}?per_page=1")
    total_products = int(headers.get("X-WP-Total", headers.get("x-wp-total", len(json.loads(metadata)))))
    total_pages = (total_products + 99) // 100

    def get_page(page):
        url = f"{ENDPOINT}?per_page=100&page={page}"
        path = RAW / f"products-page-{page}.json"
        if path.exists() and not args.refresh:
            data = path.read_bytes()
        else:
            data, _ = fetch(url)
            path.write_bytes(data)
        batch = json.loads(data)
        assert isinstance(batch, list), "Expected public product list"
        return page, batch

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = sorted(pool.map(get_page, range(1, total_pages + 1)))
    for page, batch in pages:
        products.extend(normalize(product, scraped_at) for product in batch)
        print(f"Catalog page {page}/{total_pages}: {len(batch)} products", flush=True)
    assert len({product['id'] for product in products}) == len(products), "Duplicate source IDs"
    priority = ["khamrah", "fakhar-lattafa-women", "fakhar-lattafa", "fakhar", "nebras", "yara", "yara-tous-2", "yara-tous", "yara-moi", "badee-al-oud-honor-glory", "badee-al-oud-amethyst", "eclaire", "angham", "asad", "teriaq", "ajwad", "mayar", "ishq-al-shuyukh-gold"]
    selected = sorted(products, key=lambda product: (priority.index(product["slug"]) if product["slug"] in priority else len(priority), not any(name in product["name"].lower() for name in ["fakhar", "khamrah", "nebras", "yara"]), product["id"]))[:args.limit]
    for product in products:
        if product not in selected and product["sourceImages"]:
            product["image"] = product["sourceImages"][0]["url"]
    catalog_path = ROOT / "src/data/catalog.json"
    catalog_path.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n")
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(download_product_images, product): product for product in selected}
        completed = 0
        for future in concurrent.futures.as_completed(futures):
            failures.extend(future.result())
            completed += 1
            if completed % 10 == 0:
                catalog_path.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n")
                print(f"Product images: {completed}/{len(selected)}", flush=True)
    catalog_path.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n")
    manifest = {
        "source": ENDPOINT, "scrapedAt": scraped_at, "products": len(products),
        "inStock": sum(product["inStock"] for product in products),
        "localImages": sum(len(product["images"]) for product in products), "imageFailures": failures,
        "scope": "Read-only public product data and first-party images. No private or customer endpoints.",
        "rights": "Source product names and images remain the property of their respective owners; retained for this private redesign pitch. Obtain the merchant's permission before publishing.",
        "facts": "Prices and stock are a dated snapshot. Description and note text is copied from source; missing data is left empty, never inferred.",
    }
    (ROOT / "research/catalog-provenance.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    assert all(product["currency"] == "NGN" and product["price"] >= 0 for product in products)
    assert notes_from_text("Top: Rose, Pear\nHeart: Jasmine\nBase: Musk") == {"top": ["Rose", "Pear"], "heart": ["Jasmine"], "base": ["Musk"]}
    print(json.dumps({key: manifest[key] for key in ("products", "inStock", "localImages")}), flush=True)


if __name__ == "__main__":
    main()
