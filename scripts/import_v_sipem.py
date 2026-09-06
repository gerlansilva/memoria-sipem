#!/usr/bin/env python3
"""Converte a planilha de metadados do V SIPEM (colunas em português, PDFs já
hospedados no domínio oficial sbembrasil.org.br) no arquivo JavaScript
consumido pelo site, no mesmo formato de records-vi-2015-v3.js.

Uso:
    python3 import_v_sipem.py metadados-v-sipem.xlsx --output ../data/records-v-2012.js

Colunas esperadas na planilha (uma linha por trabalho; separador de lista ";"):
    edicao, ano, gt, tipo, titulo, autores, ies, resumo, abstract, arquivo, url_pdf

Princípios seguidos (README do projeto):
- não inventa metadados ausentes (páginas, idioma e status ficam em branco
  quando a planilha não traz essa informação, em vez de assumir um valor);
- mantém o link oficial e registra a origem (officialUrl/pdf = url_pdf da
  planilha; sourceFileName = nome do PDF original);
- separa trabalhos de conferências/mesas/palestras: linhas com tipo != "COM"
  são marcadas com type = código original (ex.: MRE, PLE) em vez de serem
  contadas junto com as comunicações científicas.
"""

import argparse
import json
import re
from pathlib import Path

import pandas as pd

EDITION = 5
YEAR = 2012

DRIVE_ID_RE = re.compile(r"/d/([a-zA-Z0-9_-]{10,})")


def extract_drive_id(link_or_id):
    """Aceita um link completo do Drive ou já o ID puro."""
    if not link_or_id or pd.isna(link_or_id):
        return ""
    value = str(link_or_id).strip()
    match = DRIVE_ID_RE.search(value)
    if match:
        return match.group(1)
    if re.fullmatch(r"[a-zA-Z0-9_-]{10,}", value):
        return value
    return ""


def load_drive_map(path):
    """Lê uma planilha/CSV com colunas 'arquivo' e 'link_drive' (ou 'driveFileId')
    e devolve um dict {nome_do_arquivo: (drivePdf_url, driveFileId)}."""
    try:
        df = pd.read_excel(path, dtype=str)
    except ValueError:
        df = pd.read_csv(path, dtype=str, encoding="utf-8-sig")
    df.columns = [c.strip() for c in df.columns]

    link_col = next((c for c in df.columns if c.lower() in ("link_drive", "drivepdf", "link")), None)
    if not link_col or "arquivo" not in df.columns:
        raise SystemExit(
            "A planilha de mapeamento precisa das colunas 'arquivo' e "
            "'link_drive' (ou 'driveFileId'/'link'). Colunas encontradas: "
            + ", ".join(df.columns)
        )

    mapping = {}
    for _, row in df.iterrows():
        filename = str(row["arquivo"]).strip()
        raw = row[link_col]
        file_id = extract_drive_id(raw)
        if not filename or not file_id:
            continue
        drive_url = f"https://drive.google.com/file/d/{file_id}/view?usp=drivesdk"
        mapping[filename] = (drive_url, file_id)
    return mapping

# GT -> nome completo, extraído de data/catalog.js (GTS_V)
GT_SECTIONS = {
    "GT01": "GT01 — Educação Matemática nas séries iniciais do Ensino Fundamental",
    "GT02": "GT02 — Educação Matemática nas séries finais do Ensino Fundamental",
    "GT03": "GT03 — Educação Matemática no Ensino Médio",
    "GT04": "GT04 — Educação Matemática no Ensino Superior",
    "GT05": "GT05 — História da Matemática e Cultura",
    "GT06": "GT06 — Educação Matemática: novas tecnologias e Educação à distância",
    "GT07": "GT07 — Formação de professores que ensinam Matemática",
    "GT08": "GT08 — Avaliação em Educação Matemática",
    "GT09": "GT09 — Processos cognitivos e linguísticos em Educação Matemática",
    "GT10": "GT10 — Modelagem Matemática",
    "GT11": "GT11 — Filosofia da Educação Matemática",
    "GT12": "GT12 — Ensino de Probabilidade e Estatística",
}

TYPE_LABELS = {
    "COM": "Comunicação científica",
    # MRE e PLE aparecem na planilha mas o código não define o rótulo completo
    # oficial — mantidos como código bruto para não inventar metadado ausente.
}


def split_list(value):
    if pd.isna(value):
        return []
    return [item.strip() for item in str(value).split(";") if item.strip()]


def clean(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def build_authors(names, institutions):
    """Combina nomes de autores com instituições.

    A planilha lista a instituição uma única vez quando todos os autores do
    trabalho pertencem à mesma instituição (em vez de repetir), então:
    - 1 instituição para N autores (N>1) -> aplica a mesma a todos;
    - quantidades iguais -> pareamento posicional (1 a 1);
    - qualquer outra combinação -> pareamento posicional só até o menor
      tamanho, e o restante fica sem instituição (sinalizado como aviso).
    """
    if not institutions:
        return list(names)
    if len(institutions) == 1 and len(names) > 1:
        return [f"{name} ({institutions[0]})" for name in names]
    if len(institutions) == len(names):
        return [f"{name} ({inst})" if inst else name for name, inst in zip(names, institutions)]
    paired = [
        f"{name} ({inst})" for name, inst in zip(names, institutions)
    ]
    paired += names[len(institutions):]
    return paired


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_path", type=Path)
    parser.add_argument(
        "--drive-map",
        type=Path,
        default=None,
        help="Planilha/CSV com colunas 'arquivo' e 'link_drive' (ou 'driveFileId') "
             "para preencher drivePdf/driveFileId a partir do nome do PDF.",
    )
    parser.add_argument("--output", type=Path, default=Path("data/records-v-2012.js"))
    args = parser.parse_args()

    drive_map = load_drive_map(args.drive_map) if args.drive_map else {}

    # a planilha enviada veio como CSV com extensão .xlsx; tenta os dois formatos
    try:
        df = pd.read_excel(args.input_path, dtype=str)
    except ValueError:
        df = pd.read_csv(args.input_path, dtype=str, encoding="utf-8-sig")
    df.columns = [c.strip() for c in df.columns]

    required = ["edicao", "ano", "gt", "tipo", "titulo", "autores", "ies",
                "resumo", "abstract", "arquivo", "url_pdf"]
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise SystemExit(f"Colunas ausentes: {', '.join(missing)}")

    counters = {}
    records = []
    warnings = []

    for i, row in df.iterrows():
        gt = clean(row["gt"])
        tipo = clean(row["tipo"])
        names = split_list(row["autores"])
        institutions = split_list(row["ies"])
        authors = build_authors(names, institutions)
        source_filename = clean(row["arquivo"])
        drive_pdf, drive_file_id = drive_map.get(source_filename, ("", ""))

        counters[gt] = counters.get(gt, 0) + 1
        record_id = f"VSIPEM-2012-{gt}-{counters[gt]:03d}"

        record = {
            "id": record_id,
            "title": clean(row["titulo"]),
            "abstract": clean(row["resumo"]),
            "abstractEn": clean(row["abstract"]),
            "edition": EDITION,
            "year": YEAR,
            "gt": gt,
            "section": GT_SECTIONS.get(gt, gt),
            "type": TYPE_LABELS.get(tipo, tipo),
            "pages": "",
            "language": "",
            "officialUrl": clean(row["url_pdf"]),
            "pdf": clean(row["url_pdf"]),
            "drivePdf": drive_pdf,
            "eventStatus": "",
            "metadataStatus": "importado da planilha oficial do V SIPEM; revisar",
            "sourceFileName": source_filename,
            "driveFileId": drive_file_id,
            "authors": authors,
            "keywords": [],
            "authorNames": names,
            "institutions": institutions,
        }

        # só é inconsistência de fato quando não é "1 instituição para todos"
        # nem pareamento posicional exato (ver build_authors)
        if institutions and len(institutions) != 1 and len(institutions) != len(names):
            warnings.append(
                f"Linha {i+2} (id={record_id}): {len(names)} autor(es) x "
                f"{len(institutions)} instituição(ões) — não dá para casar "
                f"1 a 1 nem assumir instituição única; revisar manualmente."
            )
        if gt not in GT_SECTIONS and gt != "CONF":
            warnings.append(f"Linha {i+2} (id={record_id}): GT '{gt}' não reconhecido.")
        if drive_map and not drive_pdf:
            warnings.append(
                f"Linha {i+2} (id={record_id}): arquivo '{source_filename}' sem "
                f"correspondência no mapeamento do Drive."
            )

        records.append(record)

    com = sum(1 for r in records if r["type"] == "Comunicação científica")
    others = len(records) - com
    print(f"{len(records)} registros no total ({com} comunicações científicas, {others} outros: conferências/mesas/palestras).")

    if warnings:
        print(f"\nAtenção — {len(warnings)} inconsistência(s):")
        for w in warnings:
            print(f"  - {w}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "window.SIPEM_RECORDS_V_2012 = "
        + json.dumps(records, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"\nGravado em {args.output}")


if __name__ == "__main__":
    main()
