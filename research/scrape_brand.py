#!/usr/bin/env python3
"""Retain public first-party brand media URLs and contact links for the pitch."""
import concurrent.futures
from datetime import datetime, timezone
from html import unescape
import json
from pathlib import Path
import re
from urllib.parse import urlparse
from scrape_catalog import ASSETS, RAW, ROOT, fetch


def main():
    RAW.mkdir(parents=True, exist_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)
    pages = {}
    for name, url in [("homepage", "https://lattafang.com/"), ("contact", "https://lattafang.com/contact-us/")]:
        path = RAW / f"{name}.html"
        if path.exists():
            data = path.read_bytes()
        else:
            data, _ = fetch(url)
            path.write_bytes(data)
        pages[name] = data.decode("utf-8")
    urls = list(dict.fromkeys(unescape(url).replace("\\/", "/") for url in re.findall(r"https?:[^\s\"'<>]+?\.(?:png|webp|jpe?g|svg|mp4)(?:\?[^\s\"'<>]*)?", pages["homepage"], re.I)))
    contacts = list(dict.fromkeys(unescape(value) for value in re.findall(r'href=["\']((?:tel:|mailto:|https://wa\.me/|https://api\.whatsapp\.com/)[^"\']+)', "\n".join(pages.values()))))
    record = {"scrapedAt": datetime.now(timezone.utc).isoformat(), "sources": ["https://lattafang.com/", "https://lattafang.com/contact-us/"], "media": urls, "contactLinks": contacts}
    selected = {
        "brand-logo.svg": "https://lattafang.com/wp-content/uploads/2024/08/Screenshot_2024-08-16_193643-removebg-preview.svg",
        "al-areeq-gold-cutout.png": "https://lattafang.com/wp-content/uploads/2024/08/Al-Areeq-Gold-1.png",
        "campaign-perfume.jpeg": "https://lattafang.com/wp-content/uploads/2024/10/banner-bg-h6.jpeg",
        "perfume-ritual.webp": "https://lattafang.com/wp-content/uploads/2024/08/filler-img-01.webp",
        "brand-menu.png": "https://lattafang.com/wp-content/uploads/2024/10/MAIN-MELU.png",
        "la-vivacite-cutout.png": "https://lattafang.com/wp-content/uploads/2024/10/la-vivacite-maison-alhambra-100-ml_11455__1_-removebg-preview-1.png",
    }
    def download(item):
        name, url = item
        path = ASSETS / name
        if not path.exists():
            data, _ = fetch(url)
            path.write_bytes(data)
        return {"path": "/assets/catalog/" + name, "source": url, "sourcePage": "https://lattafang.com/", "rights": "First-party merchant media; private pitch use. Merchant approval required for publication."}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        record["downloaded"] = list(pool.map(download, selected.items()))
    (ROOT / "research/brand-source-inventory.json").write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"downloaded": record["downloaded"], "contactLinks": contacts}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
