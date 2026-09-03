# Memória SIPEM

Catálogo estático e progressivo dos Anais do Seminário Internacional de Pesquisa em Educação Matemática (2000–2024).

## Estrutura

- `index.html`: interface pública;
- `assets/`: estilos e busca local;
- `data/catalog.js`: edições e registros bibliográficos;
- `data/records-ix-2024.js`: índice importado do IX SIPEM;
- `scripts/import_ix_sipem.py`: importador reproduzível da página oficial;
- PDFs: armazenados externamente no Google Drive, mantendo também o link da fonte oficial.

## Publicação no GitHub Pages

Publique a raiz do repositório pela branch `main`. O site não requer instalação, banco de dados ou processo de compilação.

## Modelo de registro

```js
{
  id: "sipem-2024-gt01-001",
  title: "Título do trabalho",
  authors: ["Nome Sobrenome"],
  abstract: "Resumo",
  keywords: ["Educação Matemática"],
  edition: 9,
  year: 2024,
  gt: "GT01",
  type: "Comunicação científica",
  pages: "1–15",
  language: "pt",
  officialUrl: "https://...",
  pdf: "https://drive.google.com/..."
}
```

## Princípios editoriais

1. Não inventar metadados ausentes.
2. Manter o link oficial e registrar a origem.
3. Identificar documentos incompletos.
4. Separar trabalhos, conferências, mesas, relatórios e expediente.
5. Só disponibilizar cópia no Drive quando houver autorização ou base clara para redistribuição.
