# III SIPEM (2006) — GT02: auditoria documental (etapa 26)

Atualizado em 2026-11-02. Documento de controle editorial; **não é catálogo de registros publicados**.

## Fontes conferidas
- Anais originais: https://drive.google.com/file/d/1WL3GNBoZHg2A5kR9rSdbAW7iEEOg41f8/view
- Relatórios de revisão documental das etapas 22 a 25, armazenados em https://drive.google.com/drive/folders/1fc9FNadnYnjgLYfwZTvO6ktrgbzCNe3_

## Estado verificável
- 16 candidatos GT02, nas páginas digitais 21–32; página 20 é abertura do GT02 e página 33 é abertura do GT03.
- A ocorrência anterior GT02-007, texto “ENVOLVENDO O CONCEITO DE ÁREA”, é continuação de um título, não trabalho independente. Preservar renumeração consolidada no inventário atual.
- Na página digital 21 existe texto de continuação de resumo com origem não identificada. **Não criar registro por inferência.**
- Existem 16 PDFs de *páginas-fonte*, não equivalentes a 16 PDFs individuais definitivos. Três recortes de trabalhos 014–016 foram preparados, mas requerem verificação das margens.

## Matriz de revisão
| IDs | Evidência documental | Ainda necessário |
| --- | --- | --- |
| GT02-001–005 | Autores identificados parcialmente na etapa 23 | Confrontar título, autoria, filiações, resumo, palavras-chave e limites de cada trabalho |
| GT02-006–013 | Autoria e instituições candidatas examinadas na etapa 24 | Validar todas as siglas, resumos integrais, descritores e recortes |
| GT02-014 | Auxiliadora Baraldi Pacheco — Escola Agrotécnica Federal de Satuba (AL); Cleide Farias de Medeiros — UFRPE; descritores “Problema verbal”, “Análise Combinatória” | Validar transcrição integral e margens |
| GT02-015 | Cícera Maria dos Santos Xavier e Bárbara Bianchini Lutaif — PUC-SP; cinco descritores identificados | Conferir grafia original, lista literal das cinco palavras-chave, resumo e margens |
| GT02-016 | Maria das Graças Pereira — UFRRJ; José Roberto Linhares de Mattos — UFF; Eulina Coutinho Silva do Nascimento — UFRRJ; três descritores identificados | Conferir resumo, descritores, margens e fim na página digital 32 |

## Regras de publicação
1. Não publicar um PDF de páginas-fonte como se fosse PDF individual.
2. Registrar título, autores, IES, resumo e palavras-chave *conforme constam no original*, sem completar ausências por suposição.
3. Preservar nomenclaturas históricas de IES e só aplicar siglas comprovadas.
4. Conferir visualmente o começo e o fim de cada recorte antes de associá-lo ao registro.
5. Contabilizar GT02 como **candidatos**, não como trabalhos publicados, até a revisão final.
6. Não alterar os 28 registros já integrados de GT01 e GT12 sem nova evidência do original.

## Pendências do catálogo atualmente no site
- `data/iii-2006.json` contém 28 registros: 17 do GT01 e 11 do GT12.
- GT12-002 não possui palavras-chave no catálogo.
- GT12-011 não possui resumo no catálogo.
- A aplicação já carrega `iii-2006.json` através de `assets/site.js`, mas a renderização em produção ainda precisa de teste manual.

## Etapa 27 — revisão visual do exemplar completo (2026-11-02)
- Original de 159 páginas, imagem digitalizada; análise das páginas digitais 20–33.
- Inspeção visual identificou **17 blocos com títulos aparentes** no GT02, em contraste com os 16 candidatos do inventário anterior. Divergência a resolver cotejando item a item antes de atualizar totais do site.
- Foram preparados localmente 17 **recortes preliminares** por intervalos verticais de página, em ZIP, com manifesto JSON e indicação explícita de revisão pendente. Não são PDFs definitivos e ainda não foram enviados ao Drive.
- O trecho anterior ao primeiro título da página digital 21 foi mantido fora dos recortes: é continuação sem origem identificada, e não deve ser atribuído a outro autor por suposição.
- Recomenda-se revisar margens e limites, conferir os 17 títulos e seus resumos antes de publicação, e investigar se o inventário antigo agregou dois blocos por erro.

## Etapa 28 — controle técnico dos 17 PDFs preliminares (2026-11-02)
- Os 17 PDFs locais abriram sem erro com PyMuPDF, totalizando 28 páginas físicas após os recortes regionais.
- Foi gerado um painel visual de suas primeiras páginas e uma planilha CSV de controle.
- A validação efetuada é apenas de integridade e legibilidade geral dos arquivos; **não demonstra ainda** que todas as margens estejam corretas nem que textos/descritores estejam integralmente transcritos.
- Conserva-se como pendente a divergência entre 16 candidatos do inventário e 17 blocos de títulos no original.
- Nenhum registro adicional foi publicado no site ou enviado ao Drive nesta etapa.
