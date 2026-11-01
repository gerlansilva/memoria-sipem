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
