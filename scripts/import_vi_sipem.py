#!/usr/bin/env python3
"""Converte o CSV do VI SIPEM no arquivo JavaScript consumido pelo site."""

import argparse
import csv
import json
from pathlib import Path


def split_semicolon(value):
    return [item.strip() for item in (value or "").split(";") if item.strip()]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("csv_path", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/records-vi-2015.js"),
    )
    args = parser.parse_args()

    with args.csv_path.open(encoding="utf-8-sig", newline="") as stream:
        rows = list(csv.DictReader(stream))

    records = []
    for row in rows:
        record = dict(row)
        record["edition"] = int(record["edition"])
        record["year"] = int(record["year"])
        record["authors"] = split_semicolon(record.get("authors"))
        record["authorNames"] = split_semicolon(record.get("authorNames"))
        record["institutions"] = split_semicolon(record.get("institutions"))
        record["keywords"] = split_semicolon(record.get("keywords"))
        records.append(record)

    if len(records) != 47:
        raise SystemExit(f"Esperados 47 artigos; encontrados {len(records)}.")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "window.SIPEM_RECORDS_VI_2015 = "
        + json.dumps(records, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"{len(records)} artigos gravados em {args.output}")


if __name__ == "__main__":
    main()
