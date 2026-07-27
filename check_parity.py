#!/usr/bin/env python3
"""
check_parity.py
-----------------
Compare votre site local (index.html, a-propos.html, services.html,
temoignages.html, contact.html) avec les pages réelles de
https://intelliquestcanada.ca/ et affiche un rapport des écarts :

  - textes présents sur le vrai site mais absents (ou différents) en local
  - images référencées en local mais manquantes dans assets/images/
  - images présentes sur le vrai site mais jamais référencées en local
  - liens/nav manquants

Ne modifie aucun fichier : il ne fait qu'imprimer un rapport lisible,
à vous de corriger le code en conséquence.

Utilisation :
    pip install requests beautifulsoup4
    python3 check_parity.py

Lancez-le depuis le dossier qui contient vos fichiers .html.
"""

import os
import re
import difflib
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://intelliquestcanada.ca/"

# correspondance : fichier local -> page réelle
PAGE_MAP = {
    "index.html": "",
    "a-propos.html": "a-propos/",
    "services.html": "services/",
    "temoignages.html": "projects/",
    "contact.html": "contact-2/",
}

HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(HERE, "assets", "images")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

BG_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")

# balises dont on extrait le texte pour la comparaison de contenu
TEXT_TAGS = ["h1", "h2", "h3", "h4", "h5", "p", "li", "a", "span", "button"]


def clean_filename(url: str) -> str:
    return unquote(os.path.basename(urlparse(url).path))


def extract_image_filenames(soup: BeautifulSoup, page_url: str) -> set:
    urls = set()
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            urls.add(urljoin(page_url, src))
        srcset = img.get("srcset")
        if srcset:
            for part in srcset.split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    urls.add(urljoin(page_url, candidate))
    for el in soup.find_all(style=True):
        for match in BG_URL_RE.findall(el["style"]):
            urls.add(urljoin(page_url, match))
    return {clean_filename(u) for u in urls if u}


def extract_text_lines(soup: BeautifulSoup) -> list:
    lines = []
    for tag in soup.find_all(TEXT_TAGS):
        # ignore les scripts/style et les textes vides
        txt = tag.get_text(strip=True)
        if txt and len(txt) > 1:
            lines.append(txt)
    return lines


def load_local(path: str):
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return BeautifulSoup(f.read(), "html.parser")


def fetch_live(page_path: str):
    url = urljoin(BASE_URL, page_path)
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
        return url, BeautifulSoup(resp.text, "html.parser")
    except Exception as e:
        print(f"  [erreur réseau] {url} -> {e}")
        return url, None


def compare_page(local_file: str, page_path: str):
    print(f"\n{'='*70}\nPAGE : {local_file}\n{'='*70}")

    local_soup = load_local(os.path.join(HERE, local_file))
    if local_soup is None:
        print(f"  [!] Fichier local introuvable : {local_file}")
        return

    live_url, live_soup = fetch_live(page_path)
    if live_soup is None:
        return

    # --- comparaison des images ---
    local_imgs = extract_image_filenames(local_soup, "file://" + HERE + "/")
    live_imgs = extract_image_filenames(live_soup, live_url)

    missing_locally = live_imgs - local_imgs
    extra_locally = local_imgs - live_imgs

    # images référencées en local mais absentes du dossier assets/images/
    not_downloaded = set()
    for name in local_imgs:
        if name and not os.path.exists(os.path.join(IMAGES_DIR, name)):
            not_downloaded.add(name)

    if not_downloaded:
        print(f"\n  [IMAGES MANQUANTES SUR DISQUE] ({len(not_downloaded)})")
        for n in sorted(not_downloaded):
            print(f"    - assets/images/{n}")

    if missing_locally:
        print(f"\n  [IMAGES DU VRAI SITE ABSENTES DE VOTRE CODE HTML] ({len(missing_locally)})")
        for n in sorted(missing_locally):
            print(f"    - {n}")

    if extra_locally:
        print(f"\n  [IMAGES DANS VOTRE CODE MAIS PAS SUR LE VRAI SITE] ({len(extra_locally)})")
        for n in sorted(extra_locally):
            print(f"    - {n}  (vérifiez si le vrai site a changé cette image)")

    # --- comparaison des textes ---
    local_lines = extract_text_lines(local_soup)
    live_lines = extract_text_lines(live_soup)

    sm = difflib.SequenceMatcher(a=local_lines, b=live_lines)
    diffs_found = False
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        diffs_found = True
        if tag in ("replace", "delete"):
            for line in local_lines[i1:i2]:
                print(f"  [- local]  {line}")
        if tag in ("replace", "insert"):
            for line in live_lines[j1:j2]:
                print(f"  [+ réel ]  {line}")

    if not diffs_found:
        print("\n  Textes : identiques (aucun écart détecté). ✔")
    if not not_downloaded and not missing_locally and not extra_locally:
        print("  Images : cohérentes. ✔")


def main():
    print("Vérification de la parité entre votre site local et le site réel...")
    for local_file, page_path in PAGE_MAP.items():
        compare_page(local_file, page_path)

    print(f"\n{'='*70}")
    print("Terminé. Corrigez le HTML/CSS en fonction des écarts listés ci-dessus,")
    print("puis relancez ce script pour vérifier.")


if __name__ == "__main__":
    main()
