#!/usr/bin/env python3
"""Check the static mirror and its read-only, authoritative policy source."""
import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

REPO = Path(__file__).resolve().parents[3]
SITE = REPO / "code/apps/tingji-site"
ORIGIN = "https://tingji.herong.info"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.refs, self.canonicals, self.ids, self.text = [], [], set(), []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.refs.append(attrs[key])
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))

    def handle_data(self, data):
        self.text.append(data)


def check(policy_source):
    errors, local_refs, fragments, policy_parts = [], 0, 0, 0
    pages = {p: Page(p) for p in SITE.rglob("*.html")}
    canonicals = set()
    for path, page in pages.items():
        relative = path.relative_to(SITE).as_posix()
        expected = ORIGIN + "/" + relative.removesuffix("index.html")
        if page.canonicals != [expected]:
            errors.append(f"{relative}: canonical must be {expected}")
        canonicals.add(expected)
        for ref in page.refs:
            url = urlsplit(urljoin(expected, ref))
            if url.scheme != "https" or url.netloc != "tingji.herong.info":
                if url.scheme not in ("https", "mailto"):
                    errors.append(f"{relative}: unexpected reference {ref}")
                continue
            local_refs += 1
            target = (SITE / unquote(url.path).lstrip("/")).resolve()
            if not target.is_relative_to(SITE.resolve()):
                errors.append(f"{relative}: escaping local reference {ref}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{relative}: missing reference {ref}")
            elif url.fragment:
                fragments += 1
                if target not in pages or unquote(url.fragment) not in pages[target].ids:
                    errors.append(f"{relative}: missing fragment {ref}")
    sitemap = ET.parse(SITE / "sitemap.xml")
    locations = [node.text for node in sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    if len(locations) != len(set(locations)) or set(locations) != canonicals:
        errors.append("sitemap URLs must equal all HTML canonical URLs, without duplicates")
    robots = (SITE / "robots.txt").read_text().splitlines()
    if f"Sitemap: {ORIGIN}/sitemap.xml" not in robots or "Allow: /" not in robots:
        errors.append("robots.txt must allow this public site and reference its formal sitemap")
    mirror_bytes = (SITE / "privacy-policy.json").read_bytes()
    policy = json.loads(mirror_bytes)
    source_bytes = policy_source.read_bytes()
    if json.loads(source_bytes) != policy or source_bytes != mirror_bytes:
        errors.append("privacy-policy.json differs from its authoritative source; regenerate in voice-transcriber")
    for name in ("privacy/index.html", f"privacy/versions/{policy['version']}/index.html"):
        page = pages.get(SITE / name)
        if page is None:
            errors.append(f"missing current policy page: {name}")
            continue
        text = " ".join(" ".join(page.text).split())
        for section in policy["sections"]:
            for part in [section["title"], *section["paragraphs"]]:
                policy_parts += 1
                if " ".join(part.split()) not in text:
                    errors.append(f"{name}: a source policy title or paragraph is missing")
    result = {
        "passed": not errors, "htmlPages": len(pages),
        "references": sum(len(p.refs) for p in pages.values()),
        "localReferences": local_refs, "fragments": fragments,
        "sitemapUrls": len(locations), "policyVersion": policy["version"],
        "policySha256": hashlib.sha256(mirror_bytes).hexdigest(),
        "policyPartsCheckedAcrossCurrentAndArchive": policy_parts,
        "networkRequests": 0, "errors": errors,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["passed"] else 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--policy-source", type=Path, default=REPO.parent / "voice-transcriber/code/assets/legal/privacy-policy.json")
    args = parser.parse_args()
    raise SystemExit(check(args.policy_source))
