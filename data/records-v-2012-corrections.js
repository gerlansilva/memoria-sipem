// V SIPEM (2012): correções verificadas de autoria e palavras-chave.
// Fonte: planilha `metadados-v-sipem-com-palavras-chave.xlsx` (149 comunicações),
// com palavras-chave extraídas dos PDFs. Casos de separadores atípicos e dois
// vazamentos para títulos em inglês foram conferidos diretamente nos PDFs.
(() => {
  const verified = new Map(`CC04054895875_A.pdf	fenomenologia;identidade;formação de professores;diretrizes curriculares
CC08789012720_A.pdf	Educação Matemática;História da Ciência;Tecnologia Educacional;Função
CC57002509500_A.pdf	Alunos cegos;Maquete tátil;Pictogramas;Taxonomia SOLO
CC49710842900_A.pdf	inteligência coletiva;Educação a Distância;atitude colaborativa
CC43828108504_A.pdf	docência universitária;psicopedagogia;adulto;matemática;resolução de problemas
CC33744809854_A.pdf	Matemática escolar;Relação entre o jovem e o saber;Jovens trabalhadores;Aprendizagem situada;Práticas sociais;Práticas escolares
CC64107000168_A.pdf	Formação Geométrica;Licenciatura em Matemática;ENEM
CC28769415897_A.pdf	Formação de professores;ensino e aprendizagem da matemática;educação primária
CC37724310890_A.pdf	metodologia da hermenêutica de profundidade;formas simbólicas;John B. Thompson;textos de matemática
CC00596629800_A.pdf	ensino de geometria;geometria espacial;formação de conceitos;planificação
CC93953380087_A.pdf	Ambiente Virtual de Aprendizagem;Matemática;Problematização;Tecnologia
CC98629980087_A.pdf	ensino de matemática;organização escolar jesuítica;pesquisa fenomenológica
CC79114563720_A.pdf	educação matemática;prática pedagógica;teoria dialógico-crítica
CC06869522782_A.pdf	disciplinas escolares;formação de professores;história da educação matemática;metodologia do ensino de matemática
CC04715655802_A.pdf	Discurso na aula de matemática;marcas discursivas e nominalização
CC02045371930_A.pdf	Modelagem Matemática;Signo;Objetivação do Conhecimento
CC64107000168_B.pdf	docência universitária;mediação do conhecimento;adulto;matemática;resolução de situações-problemas
CC01217645675_A.pdf	formação de professores;sociedade líquido-moderna;educação matemática crítica;produção de significados;matemacia
CC82963983115_A.pdf	Estágio supervisionado;prática reflexiva;formação de professor
CC42941865268_A.pdf	Estágio Supervisionado em Matemática;Laboratório de Educação Matemática;Formação de Professores de Matemática
CC00585759600_A.pdf	revista pedagógica;ensino primário;ensino da matemática
CC02580726527_A.pdf	Modelagem matemática;Professores;Tensões nos discursos
CC02884268510_A.pdf	Tutoria;Modelagem Matemática;Formação à Distância;Teoria dos Códigos
CC58872787653_A.pdf	ensino e aprendizagem de Matemática;crenças de autoeficácia;acompanhamento extraclasse
CC52976777500_A.pdf	Alfabetização;Matemática;Anos iniciais do Ensino Fundamental;Prática Docente
CC84996560991_A.pdf	alunos;aula de matemática;significado;espaço comunicativo
CC07286285700_A.pdf	análise combinatória;erros;formação do professor de matemática;ensino superior
CC09715887830_A.pdf	sistemas lineares;representações semióticas;winplot
CC05372276444_A.pdf	Mestrado profissional;Educação Matemática;Produto final
CC09196498072_A.pdf	generalização de padrões;análise de erros;professores em formação inicial e continuada em Matemática
CC17161848865_A.pdf	avaliação de aprendizagem;análise de erros;formação de professores de matemática
CC88044823891_B.pdf	Educação Matemática;Modelagem Matemática;Aplicações Matemática
CC00440245923_A.pdf	Inclusão Educacional;Ensino de Matemática;Intérprete de Libras
CC21284545814_A.pdf	modelagem;isolado;premissas e pressupostos
CC03922715591_A.pdf	Arte;Matemática;Educação;Educação Matemática;Currículo
CC15100115874_A.pdf	Educação Matemática;currículos de Matemática;ensino médio;critérios de seleção e organização curricular;Cálculo Diferencial e Integral
CC33034141734_A.pdf	Educação a distância;formação de professores;fenomenologia;educação matemática
CC82683662149_A.pdf	Avaliação da aprendizagem;concepções;professores de Matemática
CC87044137415_A.pdf	Concepções sobre a Matemática;Licenciatura em Matemática;Professor de Conteúdos Específicos
CC13304415831_A.pdf	Equação;Conhecimento matemático para o ensino;Educação algébrica;Formação de professores de matemática
CC00139332804_A.pdf	Conhecimento Profissional Docente;Proporcionalidade e Porcentagem
CC23993901053_B.pdf	etnomatemática;educação indígena;educação escolar indígena;ensino e aprendizagem da matemática
CC10992200687_A.pdf	objetos de aprendizagem;atividade investigativa;estudo da Elipse-Soft Geogebra
CC14888911843_A.pdf	Ensino Médio;Perspectiva Construtivista;Desenvolvimento Curricular;Funções Trigonométricas
CC17148187800_A.pdf	Neurociência Cognitiva;Pensamento Matemático Avançado;Mente Matemática;Educação Matemática
CC92379095000_A.pdf	Ensino de Estatística;Unidade de Aprendizagem;Ensino com a planilha
CC09915440723_A.pdf	análise;irracionais;incomensurabilidade;cortes
CC02789645833_A.pdf	Criatividade;Criatividade Matemática;Divisão de quadrados
CC00720610060_A.pdf	Educação Matemática;Engenharia Didática;Criptografia
CC64691900730_A.pdf	inserção escolar indígena;etnia Paresí;conhecimento matemático;etnomatemática
CC01425475817_A.pdf	Aprendizes de matemática cegos;transformações geométricas;intra;inter e transfigural;pensamento geométrico
CC25941745800_A.pdf	Paulo Freire;Educação Matemática Crítica;Educação Matemática
CC29755299882_A.pdf	Etnomatemática;Descrição;Etnografia;Interrogação Mútua
CC62913166920_A.pdf	Modelagem Matemática;Diálogo;Educação Matemática
CC57028710653_A.pdf	dispositivo;experimentação;imanência;educação matemática
CC33752070854_A.pdf	ensino de análise;educação matemática no ensino superior;formação matemática do professor
CC08059565656_A.pdf	Argumentação Matemática;Investigação Matemática;Educação Matemática
CC42397162334_A.pdf	Engenharia Didática;Gráficos;Cálculo;Sequência Fedathi
CC03752714492_A.pdf	ensino de combinatória;conhecimentos de conteúdo e pedagógico;ensino fundamental
CC11875696741_A.pdf	invenção;Campos Conceituais;Campos Semânticos
CC11865401765_A.pdf	Análise de erros;Formação de professores;PIBID;Zero no quociente;Pesquisa cooperativa
CC01588779858_A.pdf	Etnomodelagem;Etnomatemática;Modelagem Matemática;Perspectiva Êmica;Perspectiva Ética
CC13244833004_A.pdf	Modelagem Matemática;funções;ensino de Matemática
CC30866672818_A.pdf	Formação Continuada de Professores;Educação a Distância;Teses e Dissertações
CC01233648411_A.pdf	Matemática;Formação Continuada;práticas;ensino médio
CC39085821053_A.pdf	Educação Matemática;Formação Continuada;Anos Iniciais;Tratamento da Informação
CC06359235803_A.pdf	sistema de numeração decimal;contagem;saberes;práticas
CC07604550827_A.pdf	conhecimento prévio;ensino médio;funções trigonométricas;aprendizagem significativa
CC37554433253_A.pdf	Saberes;formadores;trajetórias;matemática;formação
CC81409397653_A.pdf	formação de professores;formação continuada;ensino de matemática;Programa GESTAR II
CC60631082891_A.pdf	desenvolvimento profissional;grupo de estudos;prática pedagógica;ensino de matemática;educação continuada
CC14171090091_A.pdf	visualização;geometria espacial;ensino superior
CC11198253851_A.pdf	matemática;história;Brasil;colônia;cultura
CC36570108824_A.pdf	Educação Matemática;Pensamento Matemático Elementar;Pensamento Matemático Avançado;Grupo
CC04864914982_A.pdf	Educação Matemática;Educação Matemática Realística;Avaliação em Matemática
CC02095945190_A.pdf	o ciclo de ações e a espiral de aprendizagem;ambiente Klogo;formação continuada de professores;paralelogramo
CC66430259749_B.pdf	PISA 2003;Letramento matemático;Competências e habilidades;Escala de proficiência em Matemática
CC76752267715_A.pdf	compressão;teoria da cognição corporificada;sala de aula de matemática
CC18035807803_A.pdf	matemática na Escola Nova;aritmética;história da educação matemática;livro didático de matemática
CC10958389705_A.pdf	Educação Matemática;Aprendizagem Inventiva;(Des)Territorialização
CC69177481615_A.pdf	filosofia da educação matemática;prática social;pragmatismo;práticas matemáticas;licenciatura em matemática
CC02649045590_A.pdf	Movimento Reformador;Jacomo Stávale;Osvaldo Sangiorgi;Livro Didático
CC00348521901_A.pdf	ciência;técnica;tecnologia;Educação Matemática
CC21600767591_A.pdf	Materiais Manipuláveis;Ensino de Cálculo;Mediação
CC94019932034_A.pdf	Tecnologias da Informação e Comunicação;Ensino de Matemática;Cibermundo
CC43172725634_A.pdf	hipertexto;conhecimento matemático;fenomenologia
CC89804600820_A.pdf	Ensino médio;Currículo de matemática no ensino médio;Caminhos formativos
CC03372205570_A.pdf	Materiais curriculares educativos;discurso regulativo;modelagem matemática
CC22407867874_A.pdf	Ensino Superior;Curso de Cálculo na Matemática;Análise Matemática
CC06406621964_A.pdf	Educação Matemática;formação inicial de professores de matemática;querer ser professor de matemática;estágio curricular supervisionado;Análise Textual Discursiva
CC00547986807_A.pdf	ensino de estatística descritiva;jogos;resolução de problemas
CC73605875068_A.pdf	Educação Matemática;tecnologias digitais;processo depurativo;ação de aprendizagem;experiência estética
CC01046092065_A.pdf	Cálculo Diferencial e Integral I;Tecnologias Digitais;Modelagem
CC16516613591_A.pdf	métodos de pesquisa;métodos quantitativos;métodos mistos
CC01515418928_A.pdf	modelagem matemática;intencionalidade;mediação semiótica;aprendizagem significativa;educação matemática
CC05971636693_A.pdf	Educação Matemática;Pensamento Geométrico;Desenvolvimento Profissional;Professores dos anos iniciais
CC28688189862_A.pdf	plágio;ambiente virtual de aprendizagem;educação a distância;Fenomenologia
CC66430259749_A.pdf	PNLD;livro didático;processo de seleção
CC78728770153_A.pdf	formação de professores;atividade pedagógica;professor de matemática;motivos
etxffguemttgr.pdf	constituição profissional;início de carreira;narrativa;professor de matemática;trabalho docente
CC44022565772_A.pdf	Provinha Brasil de Matemática;resolução de problemas;ensino fundamental
CC24744558844_A.pdf	número racional na forma fracionária;Três Mundos da Matemática;subconstrutos
CC88044823891_A.pdf	Modelagem Matemática;Cálculo;Ensino
CC07494595813_A.pdf	sistema de numeração decimal;livros didáticos;anos iniciais de escolarização;recursos didáticos
CC27495750871_A.pdf	Jogo;Jogo de Xadrez;Educação Matemática;Resolução de Problema
CC93968213149_A.pdf	Projeto;Atualização;Formação de professores
CC01155158601_A.pdf	obstáculos;frações;erros;dificuldades
CC00779800427_A.pdf	análise de livro didático de matemática;equação do primeiro grau;PNLD;TAD
CC63707578100_A.pdf	Souzinha;História da Matemática;Análise de Discurso;Construção da imagem;Biografias
CC40065731034_A.pdf	crianças;dificuldades com a divisão;intervenção
CC03272362800_A.pdf	educação matemática;conhecimento do conteúdo disciplinar;matemática dos anos iniciais
CC29504694187_A.pdf	inequações;títulos;estado da arte;ensino superior
CC01942151560_A.pdf	modelagem matemática;ensino de matemática tradicional;distanciamento;discurso do professor
CC07234546804_A.pdf	Currículos de Matemática;Pesquisa;Práticas
CC51532921691_A.pdf	atividade matemática escolar;perspectiva históricocultural da atividade;mobilidade e mudanças de regras
CC37702009004_A.pdf	teoria da instrumentação;formação continuada de professores;uso de software educacional de matemática
CC17829682453_A.pdf	Metacognição;álgebra;contrato didático;equações do 1º grau;sala de aula de Matemática
CC39341984068_A.pdf	Condição de fronteira;educação matemática;indígenas
CC05481499681_A.pdf	História da Matemática;potencialidades pedagógicas da História da Matemática;Números Inteiros;Ensino Fundamental
CC55365639634_B.pdf	Educação Matemática;Formação Inicial;Prática como Componente Curricular;Análise Textual Discursiva
CC74574329653_A.pdf	modelagem matemática;prática pedagógica;pesquisa;aspectos positivos;aspectos não-positivos
CC43277748715_A.pdf	Anos Iniciais;Provinha Brasil de Matemática;Práticas didáticas em Matemática
CC66657466404_A.pdf	raciocínio combinatório;estratégias de resolução;representações simbólicas;invariantes;significados
CC47376120068_A.pdf	formação do professor de matemática;estágio supervisionado;conceito de compreensão
CC00625654781_A.pdf	Educação Matemática;Ensino Fundamental;produção de significados;tarefas aritméticas
CC37073060620_A.pdf	condição docente;relação professor/aluno;professor de matemática
CC23993901053_A.pdf	economia solidária;educação matemática;projetos
CC46820833920_A.pdf	Educação Matemática;Avaliação da Aprendizagem em Matemática;Prova em fases
CC10024476668_A.pdf	texto matemático;escrita e leitura compreensiva em matemática;pensamento matemático avançado
CC52205991515_A.pdf	Formação de Professor;Estágio Supervisionado;Modelagem Matemática
CC001356680_A.pdf	Registros de Representação Semiótica;Geometria Analítica;Ensino e Aprendizagem;Tecnologias de Informação e Comunicação
CC00977083489_A.pdf	Resolução de Problemas;Formação de Professores;Crenças e Atitudes;Conhecimento Pedagógico
CC02875535820_A.pdf	sistema de numeração decimal;pesquisa longitudinal;trabalho colaborativo
CC57002509500_B.pdf	Probabilidade;Construcionismo;Letramento Probabilístico;Árvore de Possibilidades
CC24010286172_A.pdf	matemática nos anos iniciais;sequência didática;formação continuada do professor;pesquisa colaborativa
CC12346465879_A.pdf	Teoria da auto-organização;Economia Solidária e Etnomatemática
CC03178308997_A.pdf	Educação Matemática;Análise da Produção Escrita;Análise de Conteúdo;Análise Textual Discursiva;Análise Narrativa
CC36399183987_A.pdf	Metaestudo;Modelagem Matemática;Objetivos de pesquisa
CC22057969843_A.pdf	artes;drama;multimodalidade;tecnologia digital
CC15079891807_A.pdf	resolução de problemas;geometria plana;investigação
CC62296965504_A.pdf	Modelagem Matemática;anos iniciais;prática pedagógica;discurso matemático escolar
CC18595006768_A.pdf	Cálculo;transição;funções;gráficos
CC04656133655_A.pdf	Fundos de Conhecimento;História da Matemática;Pedagogia Culturalmente Relevante
CC35084629864_A.pdf	Tecnologia Social;Tecnologia Convencional;Educação Matemática;Etnomatemática
CC58937242400_A.pdf	ensino de matemática;avaliação;saberes dos professores
CC42397162334_B.pdf	Engenharia Didática;Ensino do Cálculo;Visualização;Sequência Fedathi
CC03937708693_A.pdf	atividades investigativas;cálculo na engenharia;derivada;educação matemática;taxas de variação
CC27563022791_A.pdf	escolas de primeiras letras;século XIX;Arithmetica;Vassouras (RJ)
CC01486432131_A.pdf	Educação Matemática;formação continuada de professores de Matemática;cultura da performatividade;“alinhamento” de professores;ensino médio`.split("\n").filter(Boolean).map(line => {
    const tab = line.indexOf("\t");
    const file = line.slice(0, tab);
    const keywords = line.slice(tab + 1).split(";").map(value => value.trim()).filter(Boolean);
    return [file, keywords];
  }));

  const records = (window.SIPEM_RECORDS_V_2012 || [])
    .filter(record => verified.has(record.sourceFileName));

  if (records.length !== 149) {
    console.warn(`V SIPEM: esperados 149 trabalhos verificados; encontrados ${records.length}.`);
  }

  window.SIPEM_RECORDS_V_2012 = records.map(record => ({
    ...record,
    // Evita associações autor–IES inventadas pela importação posicional.
    // authorNames vem da planilha e coincide com o corpus verificado.
    authors: (record.authorNames || []).slice(),
    keywords: verified.get(record.sourceFileName).slice(),
    metadataStatus: "autoria e palavras-chave validadas a partir da planilha/PDF do V SIPEM"
  }));
})();
