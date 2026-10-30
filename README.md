# Memória SIPEM

Catálogo estático e progressivo dos Anais do Seminário Internacional de Pesquisa em Educação Matemática (2000–2024).

## Interface

O site é uma aplicação de página única, sem build, com três rotas por hash:

- `#inicio`: apresentação do acervo, números gerais e linha do tempo das nove edições;
- `#historia?edicao=9`: história da edição selecionada, com tema, local, GTs e fontes;
- `#anais?edicao=9`: busca local por título, autoria, instituição, resumo e palavras-chave, com filtro por GT, ordenação e paginação. Sem `edicao`, pesquisa em todas as edições indexadas.

A busca é instantânea e funciona inteiramente no navegador.

## Estrutura

- `index.html`: interface pública;
- `assets/site.css`: estilos e layout responsivo;
- `assets/site.js`: rotas, renderização, busca e carregamento do acervo;
- `data/acervo.json`: edições e registros principais;
- `data/records-viii-2021.js`: índice completo do VIII SIPEM (226 trabalhos);
- `data/records-ix-2024.js`: índice importado do IX SIPEM;
- `data/ii-2003-*.json` e `data/vii-2018-*.json`: índices complementares do II e do VII SIPEM;
- `scripts/`: importadores reproduzíveis das páginas oficiais;
- PDFs: armazenados externamente no Google Drive, mantendo também o link da fonte oficial.

O acervo reúne 1.251 registros indexados de sete edições. As edições III (2006) e IV (2009) são consultadas na fonte oficial.

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
  pdf: "https://drive.google.com/"
}
```

## Princípios editoriais

1. Não inventar metadados ausentes.
2. Manter o link oficial e registrar a origem.
3. Identificar documentos incompletos.
4. Separar trabalhos, conferências, mesas, relatórios e expediente.
5. Só disponibilizar cópia no Drive quando houver autorização ou base clara para redistribuição.
