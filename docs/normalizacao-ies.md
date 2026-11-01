# Normalização de instituições — Memória SIPEM

## Estado
Tabela preliminar de equivalências implementada em `assets/site.js`. Esta atualização **não equivale a auditoria integral dos PDFs originais**. Os metadados documentais originais não foram reescritos.

## Princípios
1. Preservar o nome que aparece no documento original.
2. Agrupar grafias alternativas sob uma denominação controlada para estatísticas.
3. Distinguir nome histórico de nome vigente e registrar a data da alteração.
4. Não associar siglas genéricas sem informação contextual (por exemplo: `PUC`).
5. Não tratar secretarias, prefeituras e escolas automaticamente como IES.
6. Ao calcular participações, contar uma instituição uma única vez por documento.

## Equivalências institucionais com evidências

| Registro histórico / variante | Identificador estatístico | Evidência |
| --- | --- | --- |
| Centro Universitário Franciscano (UNIFRA) | UFN | https://site.ufn.edu.br/pagina/institucional — transformação em Universidade Franciscana em 2018 |
| Centro Universitário La Salle | UNILASALLE | https://www.unilasalle.edu.br/uploads/files/3ead1ccaeb369e5e.20181024170457.pdf — transformação em Universidade La Salle em 2017 |
| Universidade Severino Sombra (USS) | UNIVASSOURAS | https://univassouras.edu.br/wp-content/uploads/2021/12/REL_CPA_2018_VASSOURAS.pdf — nome anterior da Universidade de Vassouras |
| Centro Universitário Serra dos Órgãos | UNIFESO | https://unifeso.edu.br/sobre-unifeso.php |
| Pontifícia Universidade Católica de São Paulo | PUC-SP | https://www.pucsp.br/sites/default/files/download/cpa/Relatorio-Parcial-2024.pdf |
| Universidade de Brasília | UnB | https://unb.br/institucional/a-unb |

## Pontos pendentes
- Inventariar todas as grafias efetivamente presentes nos  arquivos de cada edição, incluindo os metadados vinculados aos PDFs.
- Conferir instituição de cada autor e casos com mais de uma afiliação.
- Distinguir campus, unidades acadêmicas e entidades mantenedoras.
- Verificar siglas e denominações em fontes oficiais, preferencialmente o e-MEC: https://www.gov.br/mec/pt-br/politica-regulacao-supervisao-educacao-superior/cadastro-nacional-de-cursos-e-ies .
- Consolidar lista canônica com código e-MEC, país, UF e fonte de cada resolução.
- Revisar manualmente casos ambíguos antes de afirmar que o processo está concluído.

A contagem do Panorama é provisória e deve continuar identificada como tal.

## Auditoria adicional dos índices complementares (2026-11-01)

Foram examinados os arquivos de GTs do II SIPEM (2003) e do VII SIPEM (2018). O catálogo continua incompleto e a auditoria dos PDFs não está concluída.

### Ocorrências que exigem validação no documento
- `Universidade Tecnológica Federal do Pará`: denominação problemática; não presumir que significa UFPA ou UTFPR.
- `Tânia Maria Mendonça Campos`, `Luis Rolando Padilla`, `Lilian Nohemy López`, `Evelin Johana Lagos`, `Josué Alejandro Izaguirre`: nomes de pessoas inseridos no campo institucional.
- `Brasil`, `Educação Matemática`: conteúdo não institucional.
- `Instituto de Educação Rangel Pestana – SEEDUC/RJ`, `Escola Despertar/NEEMFS`, `Colégio Estadual de Planalto`: organizações de ensino básico, não IES.
- `FEUSP`, `FFCLRP/USP`, `Instituto de Matemática e Estatística - USP`: unidades da USP.
- `PEMAT/UFRJ`, `Projeto Fundão/UFRJ`: iniciativas/unidades relacionadas à UFRJ.
- `UFRRJ/UCAM/FAETEC`, `UFU/FEUSP`, `UFG e SEEDF`: múltiplas organizações exigem separação por vínculo, sem presumir equivalência institucional.
- `UNESP - Rio Claro IBILCE`: possível conflito entre campus e unidade, exige cotejo com o PDF.
- `Universidade Estadual da Bahia`: conferir se a designação corresponde à UNEB.
- `UNIAN`, `UNIBAN`, `Anhanguera`: verificar continuidade e nomenclatura conforme a data do trabalho.
- `CEDERJ`, `INEP`, secretarias, escolas e prefeituras: manter vínculo documental e classificar como categoria específica, não como IES.

### Correções realizadas no site
- Remoção de sufixos de países usuais na visualização estatística.
- Agrupamentos conservadores para universidades e institutos com nomes completos reconhecíveis.
- Exclusão preliminar de algumas organizações não-IES do gráfico.
- Exportação CSV por registro com afiliação original, forma agregada e situação provisória.
- Dados originais preservados nos arquivos documentais.

### Limites
O estado `equivalencia_cadastrada` do CSV significa apenas que a grafia foi mapeada no software: **não** confirma a revisão individual do PDF e da página oficial. Registros sem mapeamento são mantidos para conferência. O catálogo continuará apresentando aviso de resultados preliminares até a auditoria integral.

## Conferência documental adicional — VII SIPEM (2026-11-01)

**VII-2018-210 (GT15)** — A versão catalogada continha `Brasil` como instituição e, na lista de autores, o texto `Instituto Federal de Educação, Ciência e Tecnologia de São Paulo — Campus Birigui`. O relatório oficial do VII SIPEM, publicado pela SBEM, identifica como autores **Adriana de Bortoli** e **Zionice Garbelini Martos Rodrigues**. O arquivo `data/vii-2018-gt15.json` foi corrigido. O vínculo à FATEC Lins / IFSP Birigui é corroborado pela literatura acadêmica, mas a distribuição individual dos vínculos deve ser confrontada com o PDF de origem. Fontes: https://www.sbembrasil.org.br/files/relatorio_viisipem.pdf ; https://www.revistaparadigma.com.br/index.php/paradigma/article/download/775/831/1328

**VII-2018-112 (GT07)** — O catálogo registra `Universidade Tecnológica Federal do Pará` associada ao trabalho de Miguel Ribeiro e colaboradores. Fontes acadêmicas contemporâneas associam Marlova Caldatto à **UTFPR**, mas a afiliação no PDF do evento ainda não foi verificada. Permanece pendente, sem substituir a informação original. Fontes: https://ciespmat.wixsite.com/ciespmat/copia-seminarios ; https://educa.fcc.org.br/scielo.php?pid=S2177-60592021000103006&script=sci_arttext

**VII-2018-009 (GT01)** — O campo de instituição inclui o nome de uma pessoa, `Tânia Maria Mendonça Campos`. Pendente de conferência no PDF original; não atribuir instituição por inferência.

### Situação
Conferência de fontes públicas **não substitui** a inspeção direta dos PDFs originais. A normalização completa do corpus continua em curso, com identificação explícita dos registros não resolvidos.

## Atualização operacional — 1º de novembro de 2026

**Fontes de autoridade:** Cadastro e-MEC (https://emec.mec.gov.br/), documentação oficial de cada instituição e documento de época. O cadastro e-MEC é a referência oficial para IES, inclusive extintas, mas **não basta para atribuir afiliação a um autor**.

**Arquivos examinados nesta rodada:** onze arquivos de GT do II SIPEM (2003) e dezessete do VII SIPEM (2018), além dos índices de código do site. As fontes recuperadas apresentaram grafias divergentes, múltiplas organizações num mesmo campo, fragmentos de nomes de autores e instituições erroneamente atribuídas.

**Melhorias no código:** limpeza de país entre parênteses ou travessões, agrupamento de denominações institucionais reconhecíveis e exclusão de termos não institucionais na apuração. Mantidos os dados originais nos registros, exceto correção individual explicitamente registrada.

**Casos que continuam pendentes:** `Universidade Tecnológica Federal do Pará`, denominações genéricas, `UNIBAN/UNIAN/Anhanguera` e afiliações que precisam ser atribuídas individualmente por autor. A UTFPR informa oficialmente que a forma correta é *Universidade Tecnológica Federal do Paraná* (https://www.utfpr.edu.br/servidores/site/mural/ordem-de-servico-normatiza-uso-do-nome-da-utfpr), mas isso não demonstra, isoladamente, que essa instituição seja a do autor no trabalho.

**Limite da conclusão:** o processo **não está finalizado**. Uma auditoria exaustiva exige acesso e inspeção dos PDFs individuais de cada trabalho, comparação com o registro do evento, revisão dos nomes institucionais e validação dos vínculos. Não há base suficiente para marcar todos os registros como verificados.

## Verificação direta dos PDFs originais — três registros do VII SIPEM

Conferidos via arquivos PDF preservados no Google Drive:

- **VII-2018-009 (GT01):** https://drive.google.com/file/d/19o2IXVFFiEjFb04P72VQOEnlpf0t5m86/view — autoria confirmada: Angélica da Fontoura Garcia Silva (Universidade Anhanguera de São Paulo), Sandra Cristina Lopes (Centro Universitário de Volta Redonda), Ruy Cesar Pietropaolo (Universidade Anhanguera de São Paulo), Tânia Maria Mendonça Campos (**sem afiliação indicada no original**). O endereço eletrônico incorretamente catalogado como autor foi removido. As palavras-chave originais foram separadas em três itens.
- **VII-2018-112 (GT07):** https://drive.google.com/file/d/18eNZKk3aSVpMAcL99U3YU7GaqjXr3Abc/view — as cinco afiliações foram conferidas no original. O PDF apresenta literalmente `Universidade Tecnológica Federal do Pará` para Marlova Caldatto; fontes externas indicam UTFPR, mas a divergência **não foi resolvida por substituição automática**. Vinculação individual de cada autor adicionada.
- **VII-2018-210 (GT15):** https://drive.google.com/file/d/1sLcp5giaVBbxI2UB9xJQJXX-g_OFEGxM/view — autoria e afiliações de Adriana de Bortoli (FATEC Lins) e Zionice Garbelini Martos Rodrigues (IFSP Birigui) confirmadas no documento. Resumo e quatro palavras-chave recuperados do original.

Essas três conferências não representam validação dos demais registros. A indicação de instituição original divergente do nome em outras fontes deve permanecer visível na auditoria.
