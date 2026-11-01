# Protocolo de conferência documental — II SIPEM (2003)

## Escopo

179 registros do II SIPEM distribuídos entre 11 arquivos de GT. A etapa de triagem gera o arquivo `auditoria/ii-sipem-2003-revisao.csv`. **Triagem não é conferência de PDF**: todos os registros permanecem pendentes até inspeção da imagem ou texto confiável do original.

## Procedimento obrigatório, documento a documento

1. Abrir o PDF original e inspecionar **visualmente a primeira página** (não presumir que a extração linear de texto preserva colunas, fontes e espaçamentos).
2. Delimitar o título pela hierarquia tipográfica: fonte, negrito, centralização, quebras e transição para bloco de autoria. **Jamais** incluir nomes e e-mails no título, nem deduzir autoria por capitalização isolada.
3. Identificar **todos os autores**, inclusive quando aparecem em linhas diferentes, em colunas, com nota de rodapé, sobrescritos ou e-mail intercalado.
4. Relacionar cada autor à(s) instituição(ões) somente se a disposição visual, notas ou referências do documento sustentarem o vínculo. Preservar a afiliação original e manter `instituicao_normalizada` separada.
5. Identificar seção RESUMO, incluindo variantes sem título explícito ou resumo antes do cabeçalho. Registrar todo o texto até o começo de PALAVRAS-CHAVE, ABSTRACT, INTRODUÇÃO ou da próxima seção; corrigir somente ruído inequívoco da extração.
6. Transcrever palavras-chave originais; separar por ponto e vírgula, ponto ou outro delimitador reconhecido no próprio documento. **Nunca** reaproveitar cabeçalhos/rodapés, títulos de eventos ou palavras geradas por inferência.
7. Conferir o documento completo quando os metadados aparecerem fora da primeira página. Inspecionar mudanças de coluna, páginas e rodapés.
8. Comparar PDF e catálogo; guardar evidências: ID, nome do arquivo, número de página, campo corrigido, texto anterior, valor verificado, status e nota de decisão.
9. Marcar `verificado_pdf` somente após validar título, autores, IES, resumo e palavras-chave (inclusive ausência confirmada). Caso algum campo não possa ser determinado, usar `pendente` ou `ausente_no_original` **por campo**.
10. Regerar indicadores apenas a partir dos registros válidos para a dimensão analisada. Validar número de registros por GT e checar duplicações.

## Convenções de qualidade

- `verificado_pdf`: campo confrontado com o documento.
- `ausente_no_original`: ausência constatada no PDF.
- `pendente`: não foi possível verificar.
- `corrigido_pdf`: campo alterado com evidência do PDF.
- `divergencia_fonte`: documentos ou fontes discordam; preservar a origem até decisão fundamentada.

Não usar heurísticas do tipo “um autor = errado” ou “sem palavras-chave = inexistentes”. Esses sinais apenas priorizam inspeções.

## Inconsistências já detectadas na triagem

- `II-2003-GT01-009`: nome de Tereza de Jesus Ferreira Scheide concatenado ao título.
- `II-2003-GT01-010`: nomes Pedro Franco de Sá e John Andrew Fossa concatenados ao título; resumo curto/ausente no catálogo.
- `II-2003-GT02-03-001`: rodapé do caderno aparece dentro das palavras-chave.
- `II-2003-GT02-03-014`: nomes concatenados ao título.
- `II-2003-GT04-010`: José Garcia Martins concatenado ao título.
- `II-2003-GT07-021`: Renata Camacho Bezerra concatenada ao título.

Todos esses são **candidatos à correção**, não correções validadas. Consultar os arquivos originais, especialmente os PDFs digitalizados que não retornam texto legível via extração automática.

## Critério para encerrar a revisão

Nenhum trabalho pode ser considerado concluído sem documentação do confronto com seu PDF. A edição completa somente estará validada quando os 179 registros tiverem checklist por campo, correspondência correta de autores/IES, revisão de resumos e palavras-chave e registro das ausências reais. Manter indicador de cobertura e lista de pendências no site até essa condição.

## Conferências documentais confirmadas (01/11/2026)

- **II-2003-GT01-010** — título e dois autores confirmados por inspeção do PDF individual; resumo e três palavras-chave conferidos na reprodução e no Livro de Resumos da SBEM (p. 25). IES não indicadas na página do evento; não importar afiliações de publicações posteriores. https://www.sbembrasil.org.br/files/sipemII.pdf
- **II-2003-GT07-001** — Livro de Resumos oficial (p. 112) identifica **Arlete de Jesus Brito** e **Bernadete Barbosa Morey**, ambas UFRN, e contém resumo. Corrigida autoria anteriormente incompleta e recuperado resumo. Palavras-chave não identificadas na transcrição consultada; ausência ainda requer validação visual. https://www.sbembrasil.org.br/files/sipemII.pdf

**Observação importante:** o Livro de Resumos oficial é uma fonte primária com texto recuperável. Ele deve ser utilizado junto aos PDFs recortados para revisar sistematicamente o II SIPEM, evitando OCR como fonte exclusiva. Não reaproveitar como resumo do SIPEM os resumos de artigos posteriormente publicados.

## Remoção de páginas não acadêmicas (01/11/2026)

Foram inspecionados visualmente os PDFs individuais de oito registros indevidos. Os arquivos exibem páginas vazias, versos de páginas ou artefatos do material editorial, sem um trabalho acadêmico. Excluídos da listagem pública: II-2003-GT02-03-022, II-2003-GT04-016, II-2003-GT05-002, II-2003-GT06-015, II-2003-GT07-033, II-2003-GT08-012, II-2003-GT09-013 e II-2003-GT10-011. Os registros e seus links originais foram preservados em `auditoria/ii-sipem-2003-registros-nao-trabalhos.json`. Total de registros nos arquivos complementares da edição: **179 antes; 171 após exclusão**. A planilha inicial `auditoria/ii-sipem-2003-revisao.csv` reflete o inventário anterior à limpeza e deve ser tratada como histórico. **Não** excluir entradas cujo título contenha acidentalmente a expressão 'Resumos Seminário...' quando houver efetivamente um trabalho na página.

## Verificação visual de três PDFs — GT01 (01/11/2026)

- **II-2003-GT01-002:** conferidos título, autora Regina Maria Pavanello, UEM, resumo e quatro palavras-chave.
- **II-2003-GT01-003:** título revisado pela imagem do PDF; autora Ana Virginia de Almeida Luna; vínculo escrito como Faculdades Jorge Amado (SSA/BA); resumo e quatro palavras-chave presentes.
- **II-2003-GT01-004:** erro de classificação da autoria: *Francisca Terezinha Oliveira Alves* é autora, enquanto *Arlete de Jesus Brito* aparece como **orientadora**. A afiliação PPGED/UFRN está vinculada à indicação da orientadora, não foi atribuída automaticamente à autora. Resumo presente; palavras-chave não observadas na página recortada.

Fonte: PDFs recortados do GT01 disponibilizados no Drive, inspecionados como imagens; resultados gravados em `data/ii-2003-gt01.json`.
