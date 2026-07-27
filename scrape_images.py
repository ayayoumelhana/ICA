#!/usr/bin/env python3
"""
scrape_images.py
-----------------
Ce script parcourt les pages du site réel https://intelliquestcanada.ca/
et télécharge toutes les images trouvées (balises <img>, srcset, et
background-image en CSS inline) dans le dossier assets/images/, en
conservant le nom de fichier original du serveur.

Utilisation :
    pip install requests beautifulsoup4
    python3 scrape_images.py

Lancez ce script depuis le dossier qui contient index.html, style.css,
etc. (il va créer / remplir assets/images/ à côté).
"""

import os
import re
import time
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://intelliquestcanada.ca/"

PAGES = [
    "",                 # Accueil
    "a-propos/",
    "services/",
    "projects/",        # Témoignages
    "contact-2/",       # Contact
]

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "images")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

# Regex to pull url(...) references out of inline style attributes / <style> blocks
BG_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")


def clean_filename(url: str) -> str:
    """Return the bare filename (no query string) from a URL."""
    path = urlparse(url).path
    name = os.path.basename(path)
    return unquote(name)


def collect_urls_from_page(html: str, page_url: str) -> set:
    urls = set()
    soup = BeautifulSoup(html, "html.parser")

    # <img src="...">
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            urls.add(urljoin(page_url, src))
        # srcset can contain multiple images: "url1 300w, url2 600w"
        srcset = img.get("srcset")
        if srcset:
            for part in srcset.split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    urls.add(urljoin(page_url, candidate))

    # any element with a background-image in a style="" attribute
    for el in soup.find_all(style=True):
        for match in BG_URL_RE.findall(el["style"]):
            urls.add(urljoin(page_url, match))

    # <link rel="preload" as="image" href="...">  (lazy-load preloads)
    for link in soup.find_all("link", attrs={"as": "image"}):
        href = link.get("href")
        if href:
            urls.add(urljoin(page_url, href))

    # Keep only images actually hosted on the wp-content/uploads path
    return {u for u in urls if "/wp-content/uploads/" in u}


def download(url: str) -> None:
    filename = clean_filename(url)
    if not filename:
        return
    dest = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(dest):
        print(f"  [skip] déjà présent : {filename}")
        return
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
        with open(dest, "wb") as f:
            f.write(resp.content)
        print(f"  [ok]   {filename}  ({len(resp.content)//1024} Ko)")
    except Exception as e:
        print(f"  [erreur] {url} -> {e}")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    all_urls = set()

    for page in PAGES:
        page_url = urljoin(BASE_URL, page)
        print(f"\n== Analyse de {page_url} ==")
        try:
            resp = requests.get(page_url, headers=HEADERS, timeout=20)
            resp.raise_for_status()
        except Exception as e:
            print(f"  Impossible de charger la page : {e}")
            continue

        found = collect_urls_from_page(resp.text, page_url)
        print(f"  {len(found)} image(s) détectée(s) sur cette page.")
        all_urls |= found
        time.sleep(0.5)  # petite pause polie entre les pages

    print(f"\nTotal d'images uniques à télécharger : {len(all_urls)}")
    print(f"Destination : {OUTPUT_DIR}\n")

    for url in sorted(all_urls):
        download(url)

    print("\nTerminé. Vérifiez le dossier assets/images/.")
    print("Si certaines images manquent encore (slider de témoignages en cache,")
    print("logo favicon, etc.), ouvrez la page réelle dans votre navigateur,")
    print("clic droit > Inspecter, et copiez l'URL manuellement.")


if __name__ == "__main__":
    main()
