// Correções editoriais pontuais do I SIPEM após conferência dos cabeçalhos dos documentos.
(() => {
  const records = window.SIPEM_RECORDS_I_2000 || [];
  const patches = {
    "I-2000-GT01-003": {
      authors: ["Christiano Alberto Muniz (Universidade de Brasília)"],
      authorNames: ["Christiano Alberto Muniz"],
      authorAffiliations: [{name:"Christiano Alberto Muniz", affiliations:["Universidade de Brasília"]}]
    },
    "I-2000-GT01-004": {
      authors: ["Gilda Lisboa Guimarães (Universidade Federal de Pernambuco)", "Verônica Gitirana Gomes Ferreira (Universidade Federal de Pernambuco)", "Antonio Roazzi (Universidade Federal de Pernambuco)"],
      authorNames: ["Gilda Lisboa Guimarães", "Verônica Gitirana Gomes Ferreira", "Antonio Roazzi"],
      authorAffiliations: [
        {name:"Gilda Lisboa Guimarães", affiliations:["Universidade Federal de Pernambuco"]},
        {name:"Verônica Gitirana Gomes Ferreira", affiliations:["Universidade Federal de Pernambuco"]},
        {name:"Antonio Roazzi", affiliations:["Universidade Federal de Pernambuco"]}
      ]
    },
    "I-2000-GT01-007": {
      title: "AÇÕES E ORGANIZAÇÕES DO ENSINO E DA APRENDIZAGEM DE GEOMETRIA EM SITUAÇÃO COMPARTILHADA"
    },
    "I-2000-GT01-010": {
      authors: ["Sandra Magina (Pontifícia Universidade Católica de São Paulo)", "Tânia Maria Mendonça Campos (Pontifícia Universidade Católica de São Paulo)"],
      authorNames: ["Sandra Magina", "Tânia Maria Mendonça Campos"],
      authorAffiliations: [
        {name:"Sandra Magina", affiliations:["Pontifícia Universidade Católica de São Paulo"]},
        {name:"Tânia Maria Mendonça Campos", affiliations:["Pontifícia Universidade Católica de São Paulo"]}
      ]
    },
    "I-2000-GT04-004": {
      authors: ["Josinalva Estácio Menezes (Universidade Federal Rural de Pernambuco)"],
      authorNames: ["Josinalva Estácio Menezes"],
      authorAffiliations: [{name:"Josinalva Estácio Menezes", affiliations:["Universidade Federal Rural de Pernambuco"]}]
    },
    "I-2000-GT04-007": {
      authors: ["Maria Cristina Bonomi Barufi (Universidade de São Paulo)"],
      authorNames: ["Maria Cristina Bonomi Barufi"],
      authorAffiliations: [{name:"Maria Cristina Bonomi Barufi", affiliations:["Universidade de São Paulo"]}]
    },
    "I-2000-GT04-008": {
      authors: ["Roberto Ribeiro Baldino (Universidade Estadual Paulista Júlio de Mesquita Filho)"],
      institutions: ["Universidade Estadual Paulista Júlio de Mesquita Filho"],
      authorAffiliations: [{name:"Roberto Ribeiro Baldino", affiliations:["Universidade Estadual Paulista Júlio de Mesquita Filho"]}]
    },
    "I-2000-GT05-001": {
      authors: ["Antônio Carlos Brolezzi (Universidade Federal de Ouro Preto)"],
      authorNames: ["Antônio Carlos Brolezzi"],
      authorAffiliations: [{name:"Antônio Carlos Brolezzi", affiliations:["Universidade Federal de Ouro Preto"]}]
    },
    "I-2000-GT05-005": {
      authors: ["Sérgio Nobre (Universidade Estadual Paulista Júlio de Mesquita Filho)"],
      authorNames: ["Sérgio Nobre"],
      institutions: ["Universidade Estadual Paulista Júlio de Mesquita Filho"],
      authorAffiliations: [{name:"Sérgio Nobre", affiliations:["Universidade Estadual Paulista Júlio de Mesquita Filho"]}]
    },
    "I-2000-GT06-001": {title:"APRENDIZAGEM DE MATEMÁTICA CONSECUTIVA AO USO DE INSTRUMENTOS"},
    "I-2000-GT06-004": {title:"O USO DA CALCULADORA NAS SÉRIES INICIAIS"},
    "I-2000-GT06-010": {
      authors: ["Marcelo de Carvalho Borba (Universidade Estadual Paulista Júlio de Mesquita Filho)"],
      institutions: ["Universidade Estadual Paulista Júlio de Mesquita Filho"],
      authorAffiliations: [{name:"Marcelo de Carvalho Borba", affiliations:["Universidade Estadual Paulista Júlio de Mesquita Filho"]}]
    },
    "I-2000-GT06-012": {
      title:"SENSORES, INFORMÁTICA E O CORPO: A NOÇÃO DE MOVIMENTO",
      authors: ["Nilce Fátima Scheffer (Universidade Estadual Paulista Júlio de Mesquita Filho)"],
      institutions: ["Universidade Estadual Paulista Júlio de Mesquita Filho"],
      authorAffiliations: [{name:"Nilce Fátima Scheffer", affiliations:["Universidade Estadual Paulista Júlio de Mesquita Filho"]}]
    },
    "I-2000-GT06-014": {
      authors: ["Telma A. Souza Gracias (Universidade Estadual Paulista Júlio de Mesquita Filho)"],
      institutions: ["Universidade Estadual Paulista Júlio de Mesquita Filho"],
      authorAffiliations: [{name:"Telma A. Souza Gracias", affiliations:["Universidade Estadual Paulista Júlio de Mesquita Filho"]}]
    },
    "I-2000-GT07-004": {title:"ANÁLISE DA ATUALIZAÇÃO INTERDISCIPLINAR DIRIGIDA A PROFESSORES REGENTES DOS PÓLOS DE CIÊNCIAS E MATEMÁTICA DA REDE MUNICIPAL DE ENSINO DO RIO DE JANEIRO DURANTE O ANO DE 1999"},
    "I-2000-GT07-015": {title:"ELABORAÇÃO E EXPERIMENTAÇÃO DE UMA ENGENHARIA DE FORMAÇÃO CONTINUADA DE PROFESSORES DE MATEMÁTICA RELATIVA AO ENSINO-APRENDIZAGEM DO CONCEITO DE ÁREA"},
    "I-2000-GT08-002": {title:"APROVEITAMENTO E EVASÃO ESCOLAR: ALGUMAS CONSIDERAÇÕES SOBRE AS 7ªs SÉRIES DO NOTURNO E O PROCESSO DE AVALIAÇÃO"},
    "I-2000-GT09-006": {
      authors: ["Tânia Margarida Lima Costa (Universidade Federal de Minas Gerais / Universidade Santa Úrsula)"],
      authorNames: ["Tânia Margarida Lima Costa"],
      authorAffiliations: [{name:"Tânia Margarida Lima Costa", affiliations:["Universidade Federal de Minas Gerais","Universidade Santa Úrsula"]}]
    },
    "I-2000-GT09-007": {
      title:"ESTRATÉGIA ARGUMENTATIVA: UM MODELO",
      authors: ["Mônica Rabello de Castro (Universidade do Estado do Rio de Janeiro / Universidade Santa Úrsula)", "Janete Bolite Frant (CEDERJ — Centro Universitário de Educação a Distância)"],
      authorNames: ["Mônica Rabello de Castro", "Janete Bolite Frant"],
      authorAffiliations: [
        {name:"Mônica Rabello de Castro", affiliations:["Universidade do Estado do Rio de Janeiro","Universidade Santa Úrsula"]},
        {name:"Janete Bolite Frant", affiliations:["CEDERJ — Centro Universitário de Educação a Distância"]}
      ]
    }
  };

  window.SIPEM_RECORDS_I_2000 = records.map(record => patches[record.id] ? {...record, ...patches[record.id]} : record);
})();
