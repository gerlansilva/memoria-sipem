#!/usr/bin/env python3
"""Converte a planilha (xlsx) do VII SIPEM no arquivo JavaScript consumido pelo site.

Segue o mesmo padrão de campos usado em records-vi-2015-v3.js, já que a fonte
oficial do VII SIPEM (sbemparana.com.br/.../VII_SIPEM/paper/view/...) saiu do ar,
tornando a planilha manual (Drive/xlsx) a única fonte disponível para esta edição.

Uso:
    python3 import_vii_sipem.py planilha_vii_sipem.xlsx --output ../data/records-vii-2018.js

Colunas esperadas na planilha (uma linha por trabalho; cabeçalho na primeira linha):
    id, title, abstract, gt, section, type, pages, language,
    officialUrl, pdf, drivePdf, eventStatus, metadataStatus,
    sourceFileName, driveFileId,
    authors, keywords, authorNames, institutions

Campos de lista (authors, keywords, authorNames, institutions) devem vir com os
itens separados por ponto e vírgula (;) dentro da própria célula — igual ao
padrão adotado para o VI SIPEM. authors/authorNames/institutions devem ter a
mesma quantidade de itens, na mesma ordem (um autor por posição).
"""

import argparse
import json
from pathlib import Path

import pandas as pd

EDITION = 7
YEAR = 2018

LIST_COLUMNS = ["authors", "keywords", "authorNames", "institutions"]

TEXT_COLUMNS = [
    "id", "title", "abstract", "gt", "section", "type", "pages", "language",
    "officialUrl", "pdf", "drivePdf", "eventStatus", "metadataStatus",
    "sourceFileName", "driveFileId",
]


def split_semicolon(value):
    if pd.isna(value):
        return []
    return [item.strip() for item in str(value).split(";") if item.strip()]


def clean_text(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("xlsx_path", type=Path, help="Planilha exportada/baixada do Drive")
    parser.add_argument("--sheet", default=0, help="Nome ou índice da aba (padrão: primeira)")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/records-vii-2018.js"),
    )
    args = parser.parse_args()

    df = pd.read_excel(args.xlsx_path, sheet_name=args.sheet, dtype=str)
    df.columns = [str(c).strip() for c in df.columns]

    missing = [c for c in TEXT_COLUMNS + LIST_COLUMNS if c not in df.columns]
    if missing:
        raise SystemExit(
            "Colunas ausentes na planilha: " + ", ".join(missing) +
            "\nColunas encontradas: " + ", ".join(df.columns)
        )

    records = []
    warnings = []
    for i, row in df.iterrows():
        record = {}
        for col in TEXT_COLUMNS:
            record[col] = clean_text(row.get(col))
        record["edition"] = EDITION
        record["year"] = YEAR
        for col in LIST_COLUMNS:
            record[col] = split_semicolon(row.get(col))

        if not record["id"]:
            record["id"] = f"VIISIPEM-2018-{record.get('gt') or 'GTXX'}-{i+1:03d}"
        if not record["title"]:
            warnings.append(f"Linha {i+2}: sem título (id={record['id']}).")

        n_authors = len(record["authors"])
        n_names = len(record["authorNames"])
        n_inst = len(record["institutions"])
        if len({n_authors, n_names, n_inst}) > 1:
            warnings.append(
                f"Linha {i+2} (id={record['id']}): authors/authorNames/institutions "
                f"com quantidades diferentes ({n_authors}/{n_names}/{n_inst}) — revisar."
            )

        records.append(record)

    if warnings:
        print(f"Atenção — {len(warnings)} inconsistência(s) encontrada(s):")
        for w in warnings:
            print(f"  - {w}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "window.SIPEM_RECORDS_VII_2018 = "
        + json.dumps(records, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"{len(records)} artigos gravados em {args.output}")


if __name__ == "__main__":
    main()
