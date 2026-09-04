const GTS_I = [
  "GT01 — Educação Matemática nas Séries Iniciais do Ensino Fundamental",
  "GT02 — Educação Matemática nas Séries Finais do Ensino Fundamental",
  "GT03 — Educação Matemática no Ensino Médio",
  "GT04 — Educação Matemática no Ensino Superior",
  "GT05 — Educação Matemática, História e Cultura",
  "GT06 — Educação Matemática: Novas Tecnologias e Ensino a Distância",
  "GT07 — Formação de Professores que Ensinam Matemática",
  "GT08 — Avaliação em Educação Matemática",
  "GT09 — Processos Cognitivos e Linguísticos na Educação Matemática"
];

const GTS_II_V = [
  "GT01 — Educação Matemática nas Séries Iniciais do Ensino Fundamental",
  "GT02 — Educação Matemática nas Séries Finais do Ensino Fundamental",
  "GT03 — Educação Matemática no Ensino Médio",
  "GT04 — Educação Matemática no Ensino Superior",
  "GT05 — História da Matemática e Cultura",
  "GT06 — Educação Matemática: Novas Tecnologias e Educação a Distância",
  "GT07 — Formação de Professores que Ensinam Matemática",
  "GT08 — Avaliação em Educação Matemática",
  "GT09 — Processos Cognitivos e Linguísticos em Educação Matemática",
  "GT10 — Modelagem Matemática",
  "GT11 — Filosofia da Educação Matemática",
  "GT12 — Ensino de Probabilidade e Estatística"
];

const GTS_V = [
  {name:"GT01 — Educação Matemática nas séries iniciais do Ensino Fundamental",coordination:"Gilda Lisboa Guimarães (UFPE) e Clélia Ignatius Nogueira (UEM)"},
  {name:"GT02 — Educação Matemática nas séries finais do Ensino Fundamental",coordination:"Claudia Lisete Oliveira Groenwald (ULBRA) e José Luiz Magalhães de Freitas (UFMS)"},
  {name:"GT03 — Educação Matemática no Ensino Médio",coordination:"Nelson Antonio Pirola (UNESP) e Márcio Antonio da Silva (UFMS)"},
  {name:"GT04 — Educação Matemática no Ensino Superior",coordination:"Maria Clara Rezende Frota (PUC/MG) e Barbara Lutaif Bianchini (PUC/SP)"},
  {name:"GT05 — História da Matemática e Cultura",coordination:"Maria do Carmo Domite (USP) e Cristiane Coppe de Oliveira (UFU)"},
  {name:"GT06 — Educação Matemática: novas tecnologias e Educação à distância",coordination:"Mauricio Rosa (ULBRA), Marcelo Almeida Bairral (UFRRJ) e Rúbia Barcelos Amaral (UNICAMP)"},
  {name:"GT07 — Formação de professores que ensinam Matemática",coordination:"Cármem Lúcia Brancaglion Passos (UFSCar), Armando Traldi Júnior (IFSP) e Nielce Meneguelo Lobo da Costa (UNIBAN)"},
  {name:"GT08 — Avaliação em Educação Matemática",coordination:"Regina Luzia Corio de Buriasco (UEL) e Maria Isabel Ramalho Ortigão (UERJ)"},
  {name:"GT09 — Processos cognitivos e linguísticos em Educação Matemática",coordination:"Alina Galvão Spinillo (UFPE) e Edna Maura Zuffi (USP)"},
  {name:"GT10 — Modelagem Matemática",coordination:"Lourdes Maria Werle de Almeida (UEL) e Jussara de Loiola Araujo (UFMG)"},
  {name:"GT11 — Filosofia da Educação Matemática",coordination:"Renata C. Geromel Meneghetti (USP) e Denise Silva Vilela (UFSCar)"},
  {name:"GT12 — Ensino de Probabilidade e Estatística",coordination:"Cileda de Queiroz e Silva Coutinho (PUC/SP), Lori Viali (PUC/RS) e Admur Severino Pamplona (UFMT)"}
];

const GTS_VI = [
  "GT01 — Matemática na Educação Infantil e nos Anos Iniciais do Ensino Fundamental",
  "GT02 — Educação Matemática nos Anos Finais do Ensino Fundamental",
  "GT03 — Educação Matemática no Ensino Médio",
  "GT04 — Educação Matemática no Ensino Superior",
  "GT05 — História da Matemática e Cultura",
  "GT06 — Educação Matemática: Novas Tecnologias e Educação a Distância",
  "GT07 — Formação de Professores que Ensinam Matemática",
  "GT08 — Avaliação em Educação Matemática",
  "GT09 — Processos Cognitivos e Linguísticos em Educação Matemática",
  "GT10 — Modelagem Matemática",
  "GT11 — Filosofia da Educação Matemática",
  "GT12 — Ensino de Probabilidade e Estatística",
  "GT13 — Diferença, Inclusão e Educação Matemática"
];

const GTS_VII_VIII = [
  "GT01 — Matemática na Educação Infantil e nos Anos Iniciais do Ensino Fundamental",
  "GT02 — Educação Matemática nos Anos Finais do Ensino Fundamental e Ensino Médio",
  "GT03 — Currículo e Educação Matemática",
  "GT04 — Educação Matemática no Ensino Superior",
  "GT05 — História da Matemática e Cultura",
  "GT06 — Educação Matemática: Novas Tecnologias e Educação a Distância",
  "GT07 — Formação de Professores que Ensinam Matemática",
  "GT08 — Avaliação em Educação Matemática",
  "GT09 — Processos Cognitivos e Linguísticos em Educação Matemática",
  "GT10 — Modelagem Matemática",
  "GT11 — Filosofia da Educação Matemática",
  "GT12 — Ensino de Probabilidade e Estatística",
  "GT13 — Diferença, Inclusão e Educação Matemática",
  "GT14 — Didática da Matemática",
  "GT15 — História da Educação Matemática"
];

const GTS_IX = [
  ...GTS_VII_VIII.slice(0, 5),
  "GT06 — Educação Matemática: Tecnologias Digitais e Educação a Distância",
  ...GTS_VII_VIII.slice(6, 11),
  "GT12 — Educação Estatística",
  ...GTS_VII_VIII.slice(12),
  "GT16 — Educação Matemática com Pessoas Jovens, Adultas e Idosas"
];

window.MEMORIA_SIPEM = {
  editions: [
    {id:1,roman:"I",year:2000,place:"Serra Negra (SP)",dates:"22–25 nov. 2000",theme:"Investigação em Educação Matemática no Brasil",works:97,gts:GTS_I,url:"https://www.sbembrasil.org.br/files/sipemI.pdf"},
    {id:2,roman:"II",year:2003,place:"Santos (SP)",dates:"29 out.–1 nov. 2003",theme:"A contribuição das pesquisas para a formação de professores de Matemática",works:162,gts:GTS_II_V,url:"https://www.sbembrasil.org.br/files/sipemII.pdf"},
    {id:3,roman:"III",year:2006,place:"Águas de Lindóia (SP)",dates:"11–14 out. 2006",theme:"Tema geral não informado na fonte histórica",works:207,gts:GTS_II_V,url:"https://www.sbembrasil.org.br/files/sipemIII.pdf"},
    {id:4,roman:"IV",year:2009,place:"Brasília (DF)",dates:"25–28 out. 2009",theme:"Tema geral não informado na fonte histórica",works:194,gts:GTS_II_V,url:"https://www.sbembrasil.org.br/files/sipemIV.pdf"},
    {id:5,roman:"V",year:2012,place:"Petrópolis (RJ)",dates:"28–31 out. 2012",theme:"Questões epistemológicas, teóricas e práticas da pesquisa em Educação Matemática",works:154,gts:GTS_V,url:"https://www.sbembrasil.org.br/files/v_sipem",logo:"assets/logo-v-sipem.png"},
    {id:6,roman:"VI",year:2015,place:"Pirenópolis (GO)",dates:"15–19 nov. 2015",theme:"Tema geral não informado na fonte histórica",works:169,gts:GTS_VI,url:"https://www.sbembrasil.org.br/files/vi_sipem.zip",logo:"assets/logo-vi-sipem.png"},
    {id:7,roman:"VII",year:2018,place:"Foz do Iguaçu (PR)",dates:"4–8 nov. 2018",theme:"Justiça Social e Educação Matemática",works:226,gts:GTS_VII_VIII,url:"https://www.sbemparana.com.br/viisipem/portuguese/index.php"},
    {id:8,roman:"VIII",year:2021,place:"On-line",dates:"22–27 nov. 2021",theme:"Educação Matemática, pandemia, pós-pandemia e a atualidade: implicações na pesquisa e nas práticas de ensinar e aprender",works:226,gts:GTS_VII_VIII,url:"https://www.even3.com.br/anais/viiisipemvs2021/",logo:"assets/logo-viii-sipem.webp"},
    {id:9,roman:"IX",year:2024,place:"Natal (RN)",dates:"26–30 nov. 2024",theme:"Pensar a Educação Matemática pela pesquisa frente aos desafios do cotidiano escolar e responsabilidade social",works:318,gts:GTS_IX,url:"https://www.sbembrasil.org.br/eventos/index.php/sipem/issue/view/39",logo:"assets/logo-ix-sipem.png"}
  ],
  records: [
    ...(window.SIPEM_RECORDS_VI_2015 || []),
    ...(window.SIPEM_RECORDS_VIII_2021 || []),
    ...(window.SIPEM_RECORDS_IX_2024 || [])
  ]
};
