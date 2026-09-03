#!/usr/bin/env python3
"""Extrai o índice público do IX SIPEM para JSON, sem baixar os PDFs."""

import html
import json
import re
import sys
from pathlib import Path


def clean(value):
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def main():
    if len(sys.argv) != 3:
        raise SystemExit("uso: import_ix_sipem.py entrada.html saida.json")
    source = Path(sys.argv[1]).read_text(encoding="utf-8")
    output = []
    sections = re.findall(
        r'<div class="section">\s*<h2>(.*?)</h2>(.*?)(?=<div class="section">|</div>\s*</div>\s*</div>\s*<div class="page_issue_archive">)',
        source,
        flags=re.S,
    )
    for heading_html, body in sections:
        heading = clean(heading_html)
        gt_match = re.search(r"GT\s*0?(\d+)", heading, re.I)
        gt = f"GT{int(gt_match.group(1)):02d}" if gt_match else "Geral"
        for block in re.findall(r'<div class="obj_article_summary">(.*?)</div>\s*</li>', body, flags=re.S):
            title_match = re.search(r'<h3 class="title">\s*<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', block, re.S)
            authors_match = re.search(r'<div class="authors">(.*?)</div>', block, re.S)
            pages_match = re.search(r'<div class="pages">(.*?)</div>', block, re.S)
            pdf_match = re.search(r'<a class="obj_galley_link pdf" href="([^"]+)"', block, re.S)
            if not title_match:
                continue
            article_url, title_html = title_match.groups()
            article_id = re.search(r"/view/(\d+)", article_url)
            authors_text = clean(authors_match.group(1)) if authors_match else ""
            authors_text = re.sub(r"\s*\(Autor\)\s*$", "", authors_text)
            authors = []
            for author in authors_text.split(","):
                author = re.sub(r"^(?:Drª?\.?|Dra\.?|Profª?\.?)\s+", "", author.strip(), flags=re.I)
                author = re.sub(r"\s+", " ", author)
                if author:
                    authors.append(author)
            output.append({
                "id": f"sipem-2024-{gt.lower()}-{article_id.group(1) if article_id else len(output)+1}",
                "title": clean(title_html),
                "authors": authors,
                "abstract": "",
                "keywords": [],
                "edition": 9,
                "year": 2024,
                "gt": gt,
                "section": heading,
                "type": "Trabalho",
                "pages": clean(pages_match.group(1)) if pages_match else "",
                "language": "",
                "officialUrl": article_url,
                "pdf": pdf_match.group(1) if pdf_match else article_url,
                "drivePdf": "",
                "metadataStatus": "parcial",
            })
    serialized = json.dumps(output, ensure_ascii=False, indent=2)
    if Path(sys.argv[2]).suffix == ".js":
        serialized = "window.SIPEM_RECORDS_IX_2024 = " + serialized + ";"
    Path(sys.argv[2]).write_text(serialized + "\n", encoding="utf-8")
    print(f"{len(output)} registros extraídos")


if __name__ == "__main__":
    main()
