'use strict';

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
const safeURL = value => (/^https?:\/\//i.test(value || '') ? escapeHTML(value) : '');
const cityName = place => place.replace(/\s*\([^)]*\)\s*$/, '');
const downloadIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>';
const handIcon = (direction = 'up') => {
  const modifier = direction === 'right' ? ' hand-right' : direction === 'left' ? ' hand-left' : '';
  return `<svg class="hand-icon${modifier}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 12V4a2 2 0 0 1 4 0v8-2a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v5c0 3-2 5-5 5h-3c-2 0-3-1-4-3l-4-5a2 2 0 0 1 3-3l1 1"/><path d="M4 3 2 1M16 3l2-2M3 8H1"/></svg>`;
};

const pageSize = 12;
let data;
let view = 'home';
let selected = 1;
let query = '';
let group = '';
let sort = 'recent';
let page = 1;

const editionById = id => data.editions.find(edition => edition.id === Number(id));
const recordsFor = id => data.records.filter(record => !id || Number(record.edition) === Number(id));
const GT07_LABELS = {
  GT01: 'GT01 — Matemática na Educação Infantil e nos Anos Iniciais do Ensino Fundamental',
  GT02: 'GT02 — Educação Matemática nos Anos Finais do Ensino Fundamental e Ensino Médio',
  GT03: 'GT03 — Currículo e Educação Matemática',
  GT04: 'GT04 — Educação Matemática no Ensino Superior',
  GT05: 'GT05 — História da Matemática e Cultura',
  GT06: 'GT06 — Educação Matemática: Novas Tecnologias e Educação a Distância',
  GT07: 'GT07 — Formação de Professores que Ensinam Matemática',
  GT08: 'GT08 — Avaliação em Educação Matemática',
  GT09: 'GT09 — Processos Cognitivos e Linguísticos em Educação Matemática',
  GT10: 'GT10 — Modelagem Matemática',
  GT11: 'GT11 — Filosofia da Educação Matemática',
  GT12: 'GT12 — Ensino de Probabilidade e Estatística',
  GT13: 'GT13 — Diferença, Inclusão e Educação Matemática',
  GT14: 'GT14 — Didática da Matemática',
  GT15: 'GT15 — História da Educação Matemática'
};
const IES_SIGLAS = {
  'pontificia universidade catolica de sao paulo': 'PUC-SP',
  'pontificia universidade catolica de minas gerais': 'PUC Minas',
  'pontificia universidade catolica do rio grande do sul': 'PUCRS',
  'pontificia universidade catolica do rio de janeiro': 'PUC-Rio',
  'pontificia universidade catolica de campinas': 'PUC-Campinas',
  'universidade federal de pernambuco': 'UFPE',
  'universidade federal rural de pernambuco': 'UFRPE',
  'universidade de pernambuco': 'UPE',
  'universidade federal de mato grosso do sul': 'UFMS',
  'universidade estadual de mato grosso do sul': 'UEMS',
  'universidade estadual de londrina': 'UEL',
  'universidade federal de minas gerais': 'UFMG',
  'universidade do estado de minas gerais': 'UEMG',
  'universidade bandeirante de sao paulo': 'Uniban-SP',
  'universidade anhanguera de sao paulo': 'Anhanguera-SP',
  'universidade de sao paulo': 'USP',
  'universidade luterana do brasil': 'ULBRA',
  'universidade luterana do': 'ULBRA',
  'universidade federal de ouro preto': 'UFOP',
  'universidade federal de juiz de fora': 'UFJF',
  'universidade estadual de feira de santana': 'UEFS',
  'universidade estadual de santa cruz': 'UESC',
  'universidade tecnologica federal do parana': 'UTFPR',
  'universidade estadual paulista': 'UNESP',
  'universidade estadual paulista julio de mesquita filho': 'UNESP',
  'universidade de brasilia': 'UnB',
  'universidade estadual de campinas': 'UNICAMP',
  'universidade federal do rio de janeiro': 'UFRJ',
  'universidade federal do rio janeiro': 'UFRJ',
  'universidade federal rural do rio de janeiro': 'UFRRJ',
  'universidade do estado do rio de janeiro': 'UERJ',
  'universidade estadual do rio de janeiro': 'UERJ',
  'universidade federal do estado do rio de janeiro': 'UNIRIO',
  'centro universitario franciscano': 'UFN',
  'universidade federal do espirito santo': 'UFES',
  'universidade santa ursula': 'USU',
  'universidade federal de uberlandia': 'UFU',
  'universidade federal de goias': 'UFG',
  'universidade estadual de goias': 'UEG',
  'universidade cruzeiro do sul': 'UNICSUL',
  'universidade federal de sao carlos': 'UFSCar',
  'universidade estadual de maringa': 'UEM',
  'universidade federal do rio grande do sul': 'UFRGS',
  'universidade federal do ceara': 'UFC',
  'universidade sao francisco': 'USF',
  'universidade estadual do oeste do parana': 'UNIOESTE',
  'universidade estadual do centro-oeste do parana': 'UNICENTRO',
  'universidade estadual do parana': 'UNESPAR',
  'universidade estadual do sudoeste da bahia': 'UESB',
  'universidade federal do rio grande do norte': 'UFRN',
  'universidade federal da bahia': 'UFBA',
  'universidade regional do noroeste do estado do rio grande do sul': 'UNIJUÍ',
  'universidade estadual de ponta grossa': 'UEPG',
  'universidade federal fluminense': 'UFF',
  'universidade federal de sergipe': 'UFS',
  'centro universitario la salle': 'UNILASALLE',
  'universidade metodista de piracicaba': 'UNIMEP',
  'universidade federal do para': 'UFPA',
  'universidade federal do parana': 'UFPR',
  'universidade regional de blumenau': 'FURB',
  'universidade federal do rio grande': 'FURG',
  'universidade estadual da paraiba': 'UEPB',
  'universidade federal de alagoas': 'UFAL',
  'universidade federal de sao paulo': 'UNIFESP',
  'universidade federal do abc': 'UFABC',
  'universidade nove de julho': 'UNINOVE',
  'universidade federal de santa catarina': 'UFSC',
  'universidade federal da grande dourados': 'UFGD',
  'universidade federal do pampa': 'UNIPAMPA',
  'universidade federal de santa maria': 'UFSM',
  'universidade do vale do rio dos sinos': 'UNISINOS',
  'instituto federal de educacao ciencia e tecnologia do estado do ceara': 'IFCE',
  'instituto federal de minas gerais': 'IFMG',
  'instituto federal de sao paulo': 'IFSP',
  'instituto federal de santa catarina': 'IFSC',
  'instituto federal do espirito santo': 'IFES',
  'instituto federal da bahia': 'IFBA',
  'instituto federal de mato grosso': 'IFMT',
  'secretaria de educacao do distrito federal': 'SEEDF',
  'prefeitura de juiz de fora': 'PJF',
  'centro universitario fei': 'FEI',
  'faculdades oswaldo cruz': 'FOC',
  'inep': 'Inep',
  'unesp': 'UNESP',
  'universidade bandeirante': 'UNIBAN',
  'anhanguera uniban': 'Anhanguera-Uniban',
  'instituto federal de educacao ciencia e tecnologia do espirito santo': 'IFES',
  'universidade federal de sao joao del-rei': 'UFSJ',
  'instituto federal fluminense': 'IFF',
  'instituto federal do parana': 'IFPR',
  'secretaria de estado de educacao do rio de janeiro': 'SEEDUC-RJ',
  'centro universitario de maringa': 'UNICESUMAR',
  'centro universitario serra dos orgaos': 'UNIFESO',
  'centro universitario da fundacao santo andre': 'FSA',
  'centro federal de educacao tecnologica celso suckow da fonseca': 'CEFET-RJ',
  'centro federal de educacao tecnologica': 'CEFET',
  'faculdades integradas de vitoria': 'FDV',
  'universidade regional integrada do alto uruguai e das missoes': 'URI',
  'universidade comunitaria da regiao de chapeco': 'UNOCHAPECÓ',
  'universidade severino sombra': 'UNIVASSOURAS',
  'secretaria municipal de educacao do rio de janeiro': 'SME-RJ',
  'instituto federal minas gerais': 'IFMG',
  'instituto federal de educacao ciencia e tecnologia da paraiba': 'IFPB',
  'instituto federal de educacao ciencia e tecnologia de sao paulo': 'IFSP',
  'instituto federal de ciencia e tecnologia de sao paulo': 'IFSP',
  'instituto federal de ciencias e tecnologia de sao paulo': 'IFSP',
  'instituto federal do amapa': 'IFAP',
  'instituto nacional de estudos e pesquisas educacionais': 'INEP',
  'cederj': 'CEDERJ',
  'centro de ensino superior anisio teixeira': 'CESAT',
  'faculdades atibaia': 'FAT',
  'faculdade da aldeia de carapicuiba': 'FAC',
  'faculdades integradas hebraico-brasileiras renascenca': 'FIHR',
  'faculdade de ciencias humanas de pedro leopoldo': 'FCHPL',
  'faculdade de filosofia e letras de diamantina': 'FAFIDIA',
  'faculdade cenecista nossa senhora dos anjos': 'FACENSA',
  'senai cetiqt': 'SENAI/CETIQT',
  'institute of education': 'IOE-UCL',
  'western university': 'Western University',
  'colegio de aplicacao joao xxiii': 'CAp-UFJF',
  'colegio pedro ii': 'CPII',
  'universidade de granada': 'UGR',
  'universidade do sudoeste da bahia': 'UESB',
  'universidade do vale do sapucai': 'UNIVAS',
  'puc sao paulo': 'PUC-SP',
  'unicesumar': 'UNICESUMAR',
  'secretaria de educacao do estado de roraima': 'SEED-RR',
  'secretaria de educacao do estado de pernambuco': 'SEE-PE',
  'secretaria de educacao do rio de janeiro': 'SEEDUC-RJ',
  'secretaria de estado da educacao do parana': 'SEED-PR',
  'secretaria de educacao de curitiba': 'SME-Curitiba',
  'secretaria municipal de educacao de barreiras': 'SME-Barreiras',
  'pontificia universidade catolica do parana': 'PUCPR',
  'universidade federal de mato grosso': 'UFMT',
  'universidade do grande abc': 'UniABC',
  'universidade do vale do itajai': 'UNIVALI',
  'universidade do estado do para': 'UEPA',
  'universidade do estado de mato grosso': 'UNEMAT',
  'universidade estadual do ceara': 'UECE',
  'universidade de passo fundo': 'UPF',
  'universidade sao judas tadeu': 'USJT',
  'universidade estadual do rio grande do sul': 'UERGS',
  'universidade paulista': 'UNIP',
  'universidade catolica do salvador': 'UCSAL',
  'centro universitario de belo horizonte': 'UNI-BH',
  'faculdades jorge amado': 'FJA',
  'universidade do oeste paulista': 'UNOESTE',
  'faculdade de educacao da universidade estadual de campinas': 'FE-UNICAMP',
  'faculdade de educacao da universidade de sao paulo': 'FEUSP',
  'faculdade de educacao da universidade federal de minas gerais': 'FAE-UFMG',
  'faculdades integradas toledo de aracatuba': 'FITA',
};
/* Equivalências identificadas por fontes institucionais e registros históricos.
   A forma original permanece preservada nos metadados de cada documento. */
Object.assign(IES_SIGLAS, {
  'universidade franciscana': 'UFN',
  'unifra': 'UFN',
  'ufn': 'UFN',
  'universidade la salle': 'UNILASALLE',
  'unilasalle': 'UNILASALLE',
  'universidade de vassouras': 'UNIVASSOURAS',
  'univassouras': 'UNIVASSOURAS',
  'uss': 'UNIVASSOURAS',
  'centro universitario serra dos orgaos': 'UNIFESO',
  'unifeso': 'UNIFESO',
  'pontificia universidade catolica de sao paulo': 'PUC-SP',
  'puc sp': 'PUC-SP',
  'puc-sp': 'PUC-SP',
  'pontificia universidade catolica de minas gerais': 'PUC Minas',
  'puc minas': 'PUC Minas',
  'pontificia universidade catolica do rio de janeiro': 'PUC-Rio',
  'puc rio': 'PUC-Rio',
  'pontificia universidade catolica do rio grande do sul': 'PUCRS',
  'puc rs': 'PUCRS',
  'pontificia universidade catolica do parana': 'PUCPR',
  'puc pr': 'PUCPR',
  'pontificia universidade catolica de campinas': 'PUC-Campinas',
  'puc campinas': 'PUC-Campinas',
  'universidade de brasilia': 'UnB',
  'unb': 'UnB',
  'usp': 'USP',
  'ufscar': 'UFSCar',
  'unicamp': 'UNICAMP',
  'unesp': 'UNESP',
  'ufmg': 'UFMG',
  'ufpe': 'UFPE',
  'ufsc': 'UFSC',
  'ufrj': 'UFRJ',
  'ufrgs': 'UFRGS',
  'ufpa': 'UFPA',
  'ufpb': 'UFPB',
  'universidade federal da paraiba': 'UFPB',
  'universidade estadual da paraiba': 'UEPB',
  'uepb': 'UEPB',
  'instituto federal da paraiba': 'IFPB',
  'ifpb': 'IFPB',
  'universidade federal do triangulo mineiro': 'UFTM',
  'uftm': 'UFTM',
  'universidade federal de pelotas': 'UFPel',
  'ufpel': 'UFPel',
  'universidade do estado de santa catarina': 'UDESC',
  'udesc': 'UDESC',
  'universidade federal da fronteira sul': 'UFFS',
  'uffs': 'UFFS',
  'universidade federal do oeste do para': 'UFOPA',
  'ufopa': 'UFOPA',
  'universidade estadual de maringa': 'UEM',
  'uem': 'UEM'
});
const IES_AMBIGUAS = new Set(['puc', 'universidade catolica', 'universidade federal', 'universidade estadual', 'universidade', 'instituto federal', 'cefet']);
const iesKey = name => String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[,.“”"]/g, '').replace(/\s+/g, ' ').trim();
const iesOne = part => {
  const clean = part.replace(/\(.*?\)/g, ' ').trim();
  const candidates = [clean, clean.split(/\s*[-–—]\s*/)[0], ...clean.split(',').map(s => s.trim())];
  const found = candidates.map(c => IES_SIGLAS[iesKey(c)]).find(Boolean);
  return found || (IES_AMBIGUAS.has(iesKey(clean)) ? 'Instituição não identificada' : part.trim());
};
const iesSigla = name => String(name).split(/\s*[\/;]\s*|\s+e\s+(?=(?:Universidade|Instituto|Faculdade|Centro)\b)/).map(iesOne).join(' / ');
const iesTag = name => `<abbr title="${escapeHTML(name)}">${escapeHTML(iesSigla(name))}</abbr>`;
const authorHTML = author => {
  const match = String(author).match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  return match ? `${escapeHTML(match[1])} (${iesTag(match[2])})` : escapeHTML(author);
};
const groupLabel = record => Number(record.edition) === 7 ? (GT07_LABELS[record.gt] || record.gt) : (record.section || record.gt || '');
const route = (target, id) => '#' + ({ history: 'historia', archives: 'anais' }[target] || 'inicio') + (id ? '?edicao=' + id : '');
const themeOf = edition => edition.theme && !edition.theme.startsWith('Tema geral não') ? edition.theme : '';
const editionLabel = edition => `${edition.roman} SIPEM · ${edition.year}`;

const II_FILES = ['ii-2003-gt01.json', 'ii-2003-gt02-03.json', 'ii-2003-gt04.json', 'ii-2003-gt05.json', 'ii-2003-gt06.json', 'ii-2003-gt07.json', 'ii-2003-gt08.json', 'ii-2003-gt09.json', 'ii-2003-gt10.json', 'ii-2003-gt11.json', 'ii-2003-gt12.json'];
const VII_FILES = ['records-vii-2018-gt01.json', 'records-vii-2018-gt02.json', 'vii-2018-gt03-a.json', 'vii-2018-gt03-b.json', 'vii-2018-gt04.json', 'vii-2018-gt05.json', 'vii-2018-gt06.json', 'vii-2018-gt07-a.json', 'vii-2018-gt07-b.json', 'vii-2018-gt08.json', 'vii-2018-gt09.json', 'vii-2018-gt10.json', 'vii-2018-gt11.json', 'vii-2018-gt12.json', 'vii-2018-gt13.json', 'vii-2018-gt14.json', 'vii-2018-gt15.json'];
const IV_FILES = ['iv-2009.json'];
const extraFiles = [...VII_FILES, ...II_FILES, ...IV_FILES];

// A versão do catálogo acompanha a atualização dos índices; o parâmetro evita cache antigo no GitHub Pages.
const catalogVersion = 'iv-2009-20261101-1';
const loadJSON = async file => {
  const response = await fetch('data/' + file + '?v=' + catalogVersion, { cache: 'no-store' });
  if (!response.ok) throw Error('Não foi possível carregar ' + file + ' (' + response.status + ')');
  return response.json();
};

function indexList() {
  const all = view === 'archives'
    ? `<a class="edition-link all" href="#anais" ${!selected ? 'aria-current="true"' : ''}><span class="edition-name">Todas as edições</span><small>Acervo completo</small></a>`
    : '';
  return all + data.editions.map(edition => {
    const count = recordsFor(edition.id).length;
    const meta = view === 'history'
      ? cityName(edition.place)
      : count ? count.toLocaleString('pt-BR') + ' trabalhos' : 'Fonte externa';
    return `<a class="edition-link" href="${route(view, edition.id)}" ${edition.id === selected ? 'aria-current="true"' : ''}>
      <span class="edition-name"><span class="roman">${edition.roman}<span class="sr-only"> SIPEM</span></span><span class="year">${edition.year}</span></span>
      <small>${escapeHTML(meta)}</small>
    </a>`;
  }).join('');
}

function home() {
  const total = data.records.length;
  const indexed = data.editions.filter(edition => recordsFor(edition.id).length).length;
  const timeline = data.editions.map(edition => {
    const count = recordsFor(edition.id).length;
    const action = count
      ? `<a class="timeline-count" href="${route('archives', edition.id)}">${count.toLocaleString('pt-BR')} trabalhos ${handIcon()}</a>`
      : `<a class="timeline-count muted" href="${safeURL(edition.url)}" target="_blank" rel="noopener">Fonte oficial ${handIcon()}<span class="sr-only"> (abre em nova aba)</span></a>`;
    return `<li class="timeline-item">
      <span class="timeline-year">${edition.year}</span>
      <span class="timeline-dot" aria-hidden="true"></span>
      <a class="timeline-card" href="${route('history', edition.id)}">
        <span class="timeline-roman">${edition.roman} SIPEM</span>
        <span class="timeline-place">${escapeHTML(edition.place)}</span>
        ${themeOf(edition) ? `<span class="timeline-theme">${escapeHTML(themeOf(edition))}</span>` : ''}
      </a>
      ${action}
    </li>`;
  }).join('');

  $('#home-view').innerHTML = `
    <section class="landing-hero" aria-labelledby="landing-title">
      <div class="landing-intro">
        <p class="eyebrow">Acervo de pesquisa em Educação Matemática</p>
        <h1 id="landing-title">Memória do <em>SIPEM</em></h1>
        <p class="landing-lede">Um espaço dedicado à preservação, organização e consulta da produção científica do Seminário Internacional de Pesquisa em Educação Matemática.</p>
        <div class="landing-actions">
          <a class="button primary" href="#anais">Explorar o acervo <span aria-hidden="true">↗</span></a>
          <a class="button ghost" href="#historia">Conhecer as edições</a>
        </div>
      </div>
      <aside class="landing-feature" aria-label="Sobre o acervo">
        <span class="landing-feature-label">PESQUISAR · CONSULTAR · PRESERVAR</span>
        <p>Uma memória científica construída a partir dos trabalhos, debates e trajetórias que integram a história do SIPEM.</p>
        <a href="#sobre">Sobre o projeto <span aria-hidden="true">↗</span></a>
      </aside>
    </section>

    <section class="landing-numbers" aria-label="Números do acervo">
      <div><strong>${data.editions.length}</strong><span>edições realizadas</span></div>
      <div><strong>${total.toLocaleString('pt-BR')}</strong><span>registros indexados</span></div>
      <div><strong>${indexed}</strong><span>edições com trabalhos pesquisáveis</span></div>
      <div><strong>${data.editions[0].year}–${data.editions[data.editions.length - 1].year}</strong><span>período documentado</span></div>
    </section>

    <section class="landing-discover" aria-labelledby="discover-title">
      <div>
        <p class="eyebrow">Consulta ao acervo</p>
        <h2 id="discover-title">Encontre pesquisas do SIPEM</h2>
        </div>
      <a class="landing-discover-link" href="#anais">Acessar pesquisa de trabalhos <span aria-hidden="true">↗</span></a>
    </section>

    <section class="section landing-editions" aria-labelledby="landing-editions-title">
      <header class="section-head">
        <div>
          <p class="eyebrow">Linha do tempo</p>
          <h2 id="landing-editions-title">As edições do SIPEM</h2>
        </div>
        <p>Explore a trajetória do seminário e consulte os trabalhos disponíveis de cada edição.</p>
      </header>
      <ol class="timeline">${timeline}</ol>
    </section>
  `;
}

function history() {
  const edition = editionById(selected);
  const count = recordsFor(edition.id).length;
  const theme = themeOf(edition);
  const facts = [
    { value: edition.works, label: 'trabalhos na edição' },
    { value: edition.gts.length, label: 'grupos de trabalho' },
    { value: count ? count.toLocaleString('pt-BR') : '—', label: 'registros no acervo' }
  ];

  $('#surface').innerHTML = `
  <article class="edition-hero">
    <div class="edition-copy">
      <p class="eyebrow">${edition.roman} SIPEM · ${edition.year}</p>
      <h2 class="place">${escapeHTML(edition.place)}</h2>
      <p class="dates">${escapeHTML(edition.dates)}</p>
      ${theme ? `<p class="theme">${escapeHTML(theme)}</p>` : ''}
      <div class="edition-actions">
        ${count
          ? `<a class="button primary" href="${route('archives', edition.id)}">Pesquisar nos anais ${handIcon()}</a>`
          : `<a class="button primary" href="${safeURL(edition.url)}" target="_blank" rel="noopener">Consultar anais na fonte ${handIcon()}<span class="sr-only"> (abre em nova aba)</span></a>`}
      </div>
    </div>
    <figure class="edition-logo">
      <span class="logo-halo" aria-hidden="true"></span>
      <img src="${escapeHTML(edition.logo)}" alt="Marca original do ${edition.roman} SIPEM" width="320" height="230">
    </figure>
  </article>

  <dl class="fact-strip">
    ${facts.map(fact => `<div class="fact"><dd>${escapeHTML(String(fact.value))}</dd><dt>${fact.label}</dt></div>`).join('')}
  </dl>

  ${edition.id === 1 ? '<p class="history-description">Criado pela Sociedade Brasileira de Educação Matemática em 2000, o SIPEM consolidou um espaço de encontro, debate e intercâmbio entre pesquisadores da Educação Matemática.</p>' : ''}

  <details class="group-details">
    <summary>Grupos de Trabalho desta edição <span>${edition.gts.length}</span></summary>
    <ol class="group-list">
      ${edition.gts.map(gt => `<li><span>${escapeHTML(typeof gt === 'string' ? gt : gt.name)}</span>${gt.coordination ? `<small>${escapeHTML(gt.responsibilityLabel || 'Coordenação')}: ${escapeHTML(gt.coordination)}</small>` : ''}</li>`).join('')}
    </ol>
  </details>


  <nav class="edition-paging" aria-label="Percorrer edições">
    ${edition.id > 1 ? `<a href="${route('history', edition.id - 1)}"><span>${handIcon('left')} Edição anterior</span><strong>${editionLabel(editionById(edition.id - 1))}</strong></a>` : '<span></span>'}
    ${edition.id < data.editions.length ? `<a class="next" href="${route('history', edition.id + 1)}"><span>Próxima edição ${handIcon('right')}</span><strong>${editionLabel(editionById(edition.id + 1))}</strong></a>` : ''}
  </nav>`;
}

function archives() {
  const edition = editionById(selected);
  const groups = new Map();
  recordsFor(selected).forEach(record => {
    if (!record.gt) return;
    const label = groupLabel(record);
    groups.set(label, label);
  });
  if (!groups.has(group)) group = '';

  $('#surface').innerHTML = `
  <header class="archive-head">
    <div>
      <h2>${edition ? `${edition.roman} SIPEM · ${edition.year}` : 'Todas as edições'}</h2>
      <p class="archive-sub">${edition ? `${escapeHTML(edition.place)} · ${edition.dates}` : 'Edições com trabalhos indexados'}</p>
    </div>
    ${edition ? `<img class="archive-logo" src="${escapeHTML(edition.logo)}" alt="Marca do ${edition.roman} SIPEM" width="110" height="64">` : ''}
  </header>

  ${selected === 4 ? `<aside class="review-notice" aria-label="Aviso de conferência do IV SIPEM"><strong>IV SIPEM (2009): metadados em revisão.</strong> Os 199 PDFs individuais estão disponíveis no Google Drive. Autores, instituições, resumos e descritores foram transcritos preliminarmente e podem conter imprecisões. A ausência de um campo não comprova sua ausência no documento original.</aside>` : ''}
  ${selected === 2 ? `<aside class="review-notice" aria-label="Aviso sobre a conferência documental"><strong>II SIPEM (2003): revisão documental em andamento.</strong> Títulos, autorias, instituições, resumos e palavras-chave ainda estão sendo confrontados com os PDFs originais. A ausência de metadados no catálogo não significa ausência no documento. <a href="https://github.com/gerlansilva/memoria-sipem/blob/main/auditoria/protocolo-ii-sipem.md" target="_blank" rel="noopener">Consultar o protocolo de revisão</a>.</aside>` : ''}
  <div class="search-panel">
    <form class="search-form" role="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg>
      <input id="search" type="search" aria-label="Pesquisar títulos, autorias, instituições, resumos e palavras-chave" placeholder="O que você procura no acervo?" value="${escapeHTML(query)}">
      <button type="submit">Buscar</button>
    </form>
    <div class="filter-row">
      <label class="select-field" for="gt"><span>Grupo de Trabalho</span>
        <select id="gt">
          <option value="">Todos os GTs</option>
          ${[...groups].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR', { numeric: true })).map(([key, label]) => `<option value="${escapeHTML(key)}" ${key === group ? 'selected' : ''}>${escapeHTML(label)}</option>`).join('')}
        </select>
      </label>
      <button class="text-button" id="reset" type="button">Limpar busca</button>
    </div>
  </div>

  <div class="result-head">
    <h3 id="result-count" role="status" aria-live="polite"></h3>
    <label class="select-field sort-field" for="sort"><span>Ordenar</span>
      <select id="sort" aria-label="Ordenar trabalhos">
        <option value="recent">Mais recentes</option>
        <option value="oldest">Mais antigos</option>
        <option value="title">Título: A–Z</option>
      </select>
    </label>
  </div>
  <div id="results" class="results"></div>
  <div id="pagination"></div>`;

  $('#sort').value = sort;
  $('.search-form').addEventListener('submit', event => { event.preventDefault(); query = $('#search').value; page = 1; results(); });
  $('#search').addEventListener('input', () => { query = $('#search').value; page = 1; results(); });
  $('#gt').addEventListener('change', () => { group = $('#gt').value; page = 1; results(); });
  $('#sort').addEventListener('change', () => { sort = $('#sort').value; page = 1; results(); });
  $('#reset').addEventListener('click', () => {
    query = ''; group = ''; page = 1;
    $('#search').value = ''; $('#gt').value = '';
    results(); $('#search').focus();
  });
  results();
}

function article(record) {
  const url = safeURL([2, 7].includes(Number(record.edition)) ? record.drivePdf : (record.drivePdf || record.pdf || record.officialUrl));
  const edition = editionById(record.edition);
  const keywords = (record.keywords || []).filter(keyword => keyword && !/^não encontrad/i.test(keyword));
  const isIV = Number(record.edition) === 4;
  const showKeywords = isIV ? keywords.map(keyword => String(keyword).replace(/\\s+(?=(?:BASIC EDUCATION|LEARNING DIFICULTIES|LISTENING TO APPRENTICES|THE COMPREHENSION OF|ANALYSIS OF THE CONVERSION)[^;]*$)/i, ' ').trim()).filter(Boolean) : keywords;
  const institutions = record.institutions || [];
  const hasAbstract = record.abstract && !/^não encontrado$/i.test(record.abstract);
  const accessLabel = /pdf/i.test(record.accessLabel || '') || record.drivePdf || record.pdf ? 'PDF' : 'Abrir';

  return `<article class="record">
    <div class="record-body">
      <div class="record-meta">
        <span class="tag">${escapeHTML(record.gt || 'SIPEM')}</span>
        <span>${edition ? `${edition.roman} SIPEM · ${record.year}` : record.year}</span>
      </div>
      <h3>${url ? `<a href="${url}" target="_blank" rel="noopener">${escapeHTML(record.title)}</a>` : escapeHTML(record.title)}</h3>
      ${(record.authors || []).length ? `<p class="authors">${record.authors.map(author => authorHTML(author)).join(' · ')}</p>` : '<p class="authors">Autoria não informada no registro.</p>'}

    </div>
    <div class="record-actions">
      <details class="record-details">
        <summary><span class="details-open">Ver detalhes</span><span class="details-close">Ocultar detalhes</span></summary>
        <div class="record-expanded">
          <h4>Resumo</h4>
          ${hasAbstract ? `<p class="abstract">${escapeHTML(record.abstract)}</p>` : '<p class="abstract">Resumo não disponível neste registro.</p>'}
          ${institutions.length ? `<div class="record-institutions"><h4>Instituições e vínculos informados</h4><div class="chips">${institutions.map(name => `<span class="chip inst">${iesTag(name)}</span>`).join('')}</div>${isIV ? '<p class="record-document-note">Vínculos transcritos do caderno; a associação individual entre autor e instituição ainda está em revisão.</p>' : ''}</div>` : ''}
          ${showKeywords.length ? `<div class="chips keyword-chips"><span class="chips-label">Palavras-chave</span>${showKeywords.map(keyword => `<span class="chip kw">${escapeHTML(keyword)}</span>`).join('')}</div>` : (Number(record.edition) === 2 ? '<p class="keywords"><strong>Palavras-chave</strong> · Não identificadas automaticamente; ausência no original ainda não confirmada.</p>' : '')}
        </div>
      </details>
      ${url
        ? `<a class="download" href="${url}" target="_blank" rel="noopener" aria-label="${accessLabel === 'PDF' ? 'Acessar PDF' : 'Abrir documento'} — ${escapeHTML(record.title)}">${downloadIcon}<span>${accessLabel === 'PDF' ? 'Acessar PDF' : 'Abrir documento'}</span></a>`
        : '<span class="unavailable">Documento indisponível</span>'}
    </div>
  </article>`;
}

function results() {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const rows = recordsFor(selected)
    .filter(record => (!group || groupLabel(record) === group) && terms.every(term => record.searchText.includes(term)))
    .sort((a, b) => sort === 'title'
      ? a.title.localeCompare(b.title, 'pt-BR')
      : ((sort === 'oldest' ? a.year - b.year : b.year - a.year) || a.title.localeCompare(b.title, 'pt-BR')));
  const max = Math.max(1, Math.ceil(rows.length / pageSize));
  page = Math.min(page, max);

  $('#result-count').textContent = rows.length.toLocaleString('pt-BR') + ' trabalho' + (rows.length === 1 ? '' : 's');
  const edition = editionById(selected);

  $('#results').innerHTML = rows.length
    ? rows.slice((page - 1) * pageSize, page * pageSize).map(article).join('')
    : `<div class="empty">
        <p class="eyebrow">Sem resultados</p>
        <h3>${selected && !recordsFor(selected).length ? 'Anais disponíveis na fonte original' : 'Nenhum trabalho encontrado'}</h3>
        <p>${selected && !recordsFor(selected).length ? 'Esta edição ainda não possui trabalhos indexados na busca do acervo.' : 'Tente outro termo ou retire o filtro de Grupo de Trabalho.'}</p>
        ${selected && !recordsFor(selected).length ? `<a class="button primary" href="${safeURL(edition.url)}" target="_blank" rel="noopener">Consultar anais do ${edition.roman} SIPEM ${handIcon()}<span class="sr-only"> (abre em nova aba)</span></a>` : ''}
      </div>`;

  $('#pagination').innerHTML = rows.length > pageSize
    ? `<nav class="pagination" aria-label="Páginas de resultados">
        <button id="prev" ${page === 1 ? 'disabled' : ''}>${handIcon('left')} Anterior</button>
        <span>Página ${page} de ${max}</span>
        <button id="next" ${page === max ? 'disabled' : ''}>Próxima ${handIcon('right')}</button>
      </nav>`
    : '';
  $('#prev')?.addEventListener('click', () => { page--; results(); $('.result-head').scrollIntoView({ block: 'start', behavior: 'smooth' }); });
  $('#next')?.addEventListener('click', () => { page++; results(); $('.result-head').scrollIntoView({ block: 'start', behavior: 'smooth' }); });
}

function panorama() {
  const counts = data.editions.map(edition => ({
    edition,
    rows: recordsFor(edition.id),
  }));
  const total = data.records.length;
  const indexed = counts.filter(item => item.rows.length);
  const max = Math.max(1, ...counts.map(item => item.rows.length));
  const selector = '<option value="all">Todas as edições indexadas</option>' +
    indexed.map(({edition}) => `<option value="${edition.id}">${edition.roman} SIPEM · ${edition.year}</option>`).join('');

  $('#panorama-view').innerHTML = `
    <header class="panorama-heading">
      <p class="eyebrow">Panorama da produção científica</p>
      <h1 id="panorama-title">O SIPEM em dados</h1>
      <span class="panorama-status">Acervo em construção · indicadores parciais</span>
    </header>
    <div class="panorama-stats">
      <div><strong>${data.editions.length}</strong><span>edições do evento</span></div>
      <div><strong>${total.toLocaleString('pt-BR')}</strong><span>registros atualmente indexados</span></div>
      <div><strong>${indexed.length}</strong><span>edições com registros pesquisáveis</span></div>
    </div>
    <section class="panorama-section" aria-labelledby="panorama-editions-heading">
      <h2 id="panorama-editions-heading">Registros por edição</h2>
      <div class="panorama-bars">
        ${counts.map(({edition, rows}) => `<div class="panorama-bar-row">
          <span class="panorama-edition">${edition.roman} · ${edition.year}</span>
          <div class="panorama-bar-track" aria-hidden="true"><span style="width:${(rows.length / max * 100).toFixed(1)}%"></span></div>
          <span class="panorama-bar-value">${rows.length ? rows.length.toLocaleString('pt-BR') : 'Pendente'}</span>
          ${rows.length ? `<a href="${route('archives', edition.id)}" aria-label="Ver trabalhos do ${edition.roman} SIPEM">Ver trabalhos</a>` : '<span class="panorama-pending">Não indexado</span>'}
        </div>`).join('')}
      </div>
    </section>
    <section class="panorama-section" aria-labelledby="panorama-gt-heading">
      <h2 id="panorama-gt-heading">Distribuição por Grupo de Trabalho</h2>
      <div id="panorama-gt-results" class="panorama-gt-panels" aria-live="polite"></div>
    </section>
    <section class="panorama-section" aria-labelledby="panorama-ies-heading">
      <div class="panorama-ies-heading-row"><h2 id="panorama-ies-heading">Instituições de Ensino Superior (IES)</h2><div class="panorama-heading-actions"><label class="panorama-filter panorama-filter-compact"><span class="sr-only">Filtrar IES por edição</span><select id="panorama-ies-filter" aria-label="Filtrar instituições por edição">${selector}</select></label><button type="button" id="panorama-export-ies" class="panorama-export-small" title="Exportar auditoria institucional em CSV" aria-label="Exportar auditoria institucional em CSV">CSV</button></div></div>
      <div id="panorama-ies-results" aria-live="polite"></div>
    </section>
    <section class="panorama-explore" aria-labelledby="panorama-explore-heading">
      <div class="panorama-explore-head"><div><p class="eyebrow">Explorar os dados</p><h2 id="panorama-explore-heading">Produção, pesquisadores e temáticas</h2></div><label class="panorama-filter panorama-filter-compact"><span class="sr-only">Filtrar cartões por edição</span><select id="panorama-explore-filter" aria-label="Filtrar análises por edição">${selector}</select></label></div>
      <div class="panorama-dashboard-grid">
        <article class="panorama-dashboard-card"><div class="panorama-dashboard-card-head"><h3>Temáticas dos trabalhos</h3><span>Classificação exploratória</span></div><p>Distribuição por assuntos identificados em títulos e palavras-chave. Não equivale à codificação temática documental.</p><div id="panorama-topics-results" aria-live="polite"></div></article>
        <article class="panorama-dashboard-card"><div class="panorama-dashboard-card-head"><h3>Produção por pesquisador</h3><span>Participações em trabalhos</span></div><p>Cada autor conta uma vez por registro. Variações de nomes ainda podem dividir uma mesma autoria.</p><div id="panorama-authors-results" aria-live="polite"></div></article>
        <article class="panorama-dashboard-card"><div class="panorama-dashboard-card-head"><h3>Palavras-chave mais frequentes</h3><span>Frequência documental</span></div><p>Uma palavra-chave conta uma vez por trabalho. Acentuação, maiúsculas e espaços são normalizados; sinônimos não são reunidos.</p><div id="panorama-keywords-results" aria-live="polite"></div></article>
      </div>
      <p class="panorama-explore-note">Os indicadores consideram apenas os metadados atualmente disponíveis no acervo. A conferência de autoria, palavras-chave e resumos do II SIPEM permanece em andamento.</p>
    </section>
    <section class="panorama-explore" aria-labelledby="panorama-cross-heading">
      <div class="panorama-explore-head"><div><p class="eyebrow">Análise longitudinal</p><h2 id="panorama-cross-heading">Pesquisadores e evolução dos GTs</h2></div></div>
      <div class="panorama-dashboard-grid">
        <article class="panorama-dashboard-card"><div class="panorama-dashboard-card-head"><h3>Quem aparece em mais edições?</h3><span>Ranking por edições distintas</span></div><p>O critério principal é a presença em edições diferentes; a quantidade de trabalhos resolve empates. Participação significa autoria em trabalho indexado, não inscrição ou presença física no evento.</p><div id="panorama-repeat-authors" aria-live="polite"></div></article>
        <article class="panorama-dashboard-card"><div class="panorama-dashboard-card-head"><h3>GTs por edição</h3><span>Denominação original</span></div><p>Os números representam trabalhos catalogados em cada GT e edição; grupos agregados permanecem separados dos grupos de outras edições.</p><div id="panorama-gt-matrix" aria-live="polite"></div></article>
      </div>
      <p class="panorama-explore-note">A equivalência histórica entre GTs deve ser curada manualmente. Esta tabela não presume que GT01, GT02 etc. representem sempre a mesma linha temática ao longo dos anos.</p>
    </section>
    <section class="panorama-section panorama-method" aria-labelledby="panorama-method-heading">
      <h2 id="panorama-method-heading">Sobre os dados</h2>
      <p>Os indicadores são calculados a partir dos registros carregados no catálogo digital. Edições sem registros não são tratadas como edições sem produção. Metadados e documentos seguem em revisão; por isso, os totais podem mudar à medida que o acervo for ampliado e conferido.</p>
      <p>Esta etapa apresenta um panorama descritivo da cobertura documental. As informações institucionais exibidas são preliminares e podem conter variantes de siglas ou denominações. A análise histórica da colaboração e a padronização completa de autoria e temas permanecem em desenvolvimento.</p>
    </section>`;
  const panels = data.editions.map(edition => {
    const rows = recordsFor(edition.id);
    if (!rows.length) return `<article class="panorama-gt-panel panorama-gt-panel-empty">
      <header><h3>${escapeHTML(edition.roman)} SIPEM <span>${edition.year}</span></h3><span class="panorama-pending">Indexação pendente</span></header>
      <p>Não há trabalhos catalogados nesta edição.</p></article>`;
    const byGT = new Map();
    rows.forEach(record => {
      const gt = String(record.gt || 'GT não informado').trim();
      byGT.set(gt, (byGT.get(gt) || 0) + 1);
    });
    const groups = [...byGT].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0],'pt-BR',{numeric:true}));
    const biggest = Math.max(1,...groups.map(g=>g[1]));
    return `<article class="panorama-gt-panel">
      <header><h3>${escapeHTML(edition.roman)} SIPEM <span>${edition.year}</span></h3><strong>${rows.length.toLocaleString('pt-BR')} trabalhos</strong></header>
      <p class="panorama-count">${groups.length} GTs/categorias no índice</p>
      <div class="panorama-gt-chart" role="img" aria-label="Distribuição de ${rows.length} trabalhos nos grupos da edição de ${edition.year}">
        ${groups.map(([gt,count]) => `<div class="panorama-gt-chart-row">
          <span title="${escapeHTML(gt)}">${escapeHTML(gt)}</span>
          <div class="panorama-bar-track" aria-hidden="true"><span style="width:${(count/biggest*100).toFixed(1)}%"></span></div>
          <strong>${count}</strong></div>`).join('')}
      </div>
      <a class="panorama-gt-panel-link" href="${route('archives',edition.id)}">Consultar trabalhos da edição</a>
    </article>`;
  }).join('');
  $('#panorama-gt-results').innerHTML = panels;

  const exploratoryFilter = $('#panorama-explore-filter');
  const topicRules = [
    ['Formação de professores', /forma[cç][aã]o (?:de |do |dos )?profess|desenvolvimento profissional|saberes docentes|pr[aá]tica docente|licenciatura|professor que ensina/],
    ['Tecnologias digitais', /tecnologia|software|computador|internet|geogebra|ambiente virtual|inform[aá]tica|programa[cç][aã]o|digital/],
    ['Ensino e aprendizagem', /ensino.aprendizagem|aprendizagem|sala de aula|resolu[cç][aã]o de problemas|did[aá]tica|atividades de ensino/],
    ['Currículo e materiais', /curr[ií]culo|livro did[aá]tico|material did[aá]tico|pcn|bncc|proposta curricular/],
    ['História e filosofia', /hist[oó]ria da matem[aá]tica|hist[oó]ria da educa[cç][aã]o|filosofia da|epistemologia|hist[oó]rico.filos[oó]fica/],
    ['Avaliação', /avalia[cç][aã]o|provas|exame|desempenho escolar/],
    ['Geometria e medidas', /geometria|geom[eé]tric|espa[cç]o|[aá]rea|volume|medidas|trigonometria/],
    ['Álgebra e funções', /[aá]lgebra|alg[eé]bric|fun[cç][aã]o|fun[cç][oõ]es|equa[cç][aã]o|inequa[cç][aã]o/],
    ['Estatística e probabilidade', /estat[ií]stic|probabil|combinat[oó]ria|gr[aá]fic|dados estat[ií]sticos/],
    ['Números e operações', /n[uú]meros?|numera[cç][aã]o|aritm[eé]tic|opera[cç][oõ]es|fra[cç][oõ]es|proporcionalidade/],
    ['Inclusão e diversidade', /inclus[aã]o|defici[eê]ncia|surdo|cego|educa[cç][aã]o especial|etnomatem[aá]tica|educa[cç][aã]o ind[ií]gena/],
    ['Pesquisa e metodologia', /pesquisa em educa[cç][aã]o|metodologia|estado da arte|investiga[cç][aã]o|mapeamento da pesquisa/]
  ];
  const normalizeTerm = value => normalize(String(value || '').replace(/\s+/g,' ').trim()).replace(/[‐‑–—]/g,'-');
  const rankList = (items, cap=12) => {
    const selected = items.slice(0,cap), largest=Math.max(1,...selected.map(x=>x[1]));
    return selected.length ? '<div class="panorama-ranking">'+selected.map(([name,n],i)=>
      '<div class="panorama-ranking-item"><span class="panorama-rank-index">'+(i+1)+'</span><span class="panorama-rank-name" title="'+escapeHTML(name)+'">'+escapeHTML(name)+'</span><span class="panorama-rank-number">'+n+'</span><div class="panorama-rank-meter"><span style="width:'+(100*n/largest).toFixed(1)+'%"></span></div></div>'
    ).join('')+'</div>' : '<p class="panorama-count">Não há dados suficientes nessa seleção.</p>';
  };
  const displayRanking = (element, items, coverage, total) => {
    element.innerHTML='<p class="panorama-count">'+coverage.toLocaleString('pt-BR')+' de '+total.toLocaleString('pt-BR')+' registros com dados utilizáveis</p>'+rankList(items);
  };
  const renderExploratory = () => {
    const selected=exploratoryFilter.value;
    const rows=selected==='all'?data.records:recordsFor(Number(selected));
    const topics=new Map(),authors=new Map(),keywords=new Map();
    let coveredAuthors=0,coveredKeywords=0,coveredThemes=0;
    rows.forEach(record=>{
      const cleanAuthors=new Set((Array.isArray(record.authors)?record.authors:[]).map(author=>String(author).replace(/\s*\([^)]*\)\s*$/,'').trim()).filter(author=>author && !/@/.test(author) && author.split(/\s+/).length>=2));
      if(cleanAuthors.size)coveredAuthors++;
      cleanAuthors.forEach(name=>{const key=normalizeTerm(name);const old=authors.get(key);authors.set(key,{label:old?.label||name,n:(old?.n||0)+1});});
      const original=(Array.isArray(record.keywords)?record.keywords:[]).flatMap(kw=>String(kw||'').split(/\s*;\s*/)).map(x=>x.trim()).filter(Boolean);
      const termMap=new Map();
      original.forEach(term=>{const key=normalizeTerm(term).replace(/[.;,]+$/,'');if(key.length>2 && key.length<95 && !/resumos semin[aá]rio|semin[aá]rio internacional de pesquisa|^palavras.chave$/.test(key))termMap.set(key,termMap.get(key)||term.replace(/[.;,]+$/,''));});
      if(termMap.size)coveredKeywords++;
      termMap.forEach((label,key)=>{const old=keywords.get(key);keywords.set(key,{label:old?.label||label,n:(old?.n||0)+1});});
      const raw=[record.title||'',...original].join(' ').toLocaleLowerCase('pt-BR');
      const matches=topicRules.filter(([,re])=>re.test(raw)).map(([label])=>label);
      if(matches.length)coveredThemes++;
      [...new Set(matches)].forEach(name=>topics.set(name,(topics.get(name)||0)+1));
    });
    const sorted=map=>[...map.values()].sort((a,b)=>b.n-a.n||a.label.localeCompare(b.label,'pt-BR')).map(x=>[x.label,x.n]);
    displayRanking($('#panorama-topics-results'),[...topics].sort((a,b)=>b[1]-a[1]),coveredThemes,rows.length);
    displayRanking($('#panorama-authors-results'),sorted(authors),coveredAuthors,rows.length);
    displayRanking($('#panorama-keywords-results'),sorted(keywords),coveredKeywords,rows.length);
  };
  exploratoryFilter.addEventListener('change',renderExploratory);
  renderExploratory();

  const normalizeAuthor = value => normalize(String(value||'').replace(/\s*\([^)]*\)\s*$/,'').replace(/\s+/g,' ').trim());
  const repetition = new Map();
  data.records.forEach(rec => {
    const seen=new Set();
    (Array.isArray(rec.authors)?rec.authors:[]).forEach(value=>{
      const original=String(value||'').replace(/\s*\([^)]*\)\s*$/,'').trim();
      const key=normalizeAuthor(value);
      if(!key || original.split(/\s+/).length<2 || /@/.test(original)||seen.has(key))return;
      seen.add(key);
      let obj=repetition.get(key);
      if(!obj){obj={name:original,editions:new Set(),works:0,gts:new Set()};repetition.set(key,obj);}
      obj.editions.add(rec.edition);obj.works++;if(rec.gt)obj.gts.add(rec.gt);
    });
  });
  const repeated=[...repetition.values()].filter(x=>x.editions.size>=2).sort((a,b)=>b.editions.size-a.editions.size||b.works-a.works||a.name.localeCompare(b.name,'pt-BR'));
  $('#panorama-repeat-authors').innerHTML= repeated.length ?
    '<p class="panorama-count">'+repeated.length+' nomes normalizados aparecem em pelo menos duas edições</p><div class="panorama-repeat-list">'+repeated.slice(0,25).map((x,i)=>'<div class="panorama-repeat-row"><span>'+(i+1)+'. '+escapeHTML(x.name)+'</span><strong>'+x.editions.size+' edições</strong><small>'+x.works+' trabalhos · '+[...x.editions].sort((a,b)=>a-b).map(id=>{const ed=data.editions.find(e=>e.id===id);return ed?ed.year:id;}).join(', ')+'</small></div>').join('')+'</div><button type="button" id="panorama-repeat-toggle" class="panorama-repeat-toggle" aria-expanded="false" aria-controls="panorama-repeat-authors">Expandir ranking</button>':
    '<p class="panorama-count">Ainda não há autores identificados em duas edições no catálogo carregado.</p>';
  const rankingContainer = $('#panorama-repeat-authors');
  const rankingToggle = $('#panorama-repeat-toggle');
  if (rankingToggle) {
    const applyRankingState = expanded => {
      rankingContainer.classList.toggle('is-expanded', expanded);
      rankingToggle.setAttribute('aria-expanded', String(expanded));
      rankingToggle.textContent = expanded ? 'Recolher ranking' : 'Expandir ranking';
    };
    applyRankingState(false);
    rankingToggle.addEventListener('click', () => applyRankingState(rankingToggle.getAttribute('aria-expanded') !== 'true'));
  }
  const editionsWithData=data.editions.filter(e=>recordsFor(e.id).length);
  const gtRows=new Map();
  editionsWithData.forEach(ed=>recordsFor(ed.id).forEach(rec=>{
    const gt=String(rec.gt||'Não informado').trim();
    const key=gt.toUpperCase().replace(/\s+/g,'');
    if(!gtRows.has(key))gtRows.set(key,{gt,values:new Map()});
    const item=gtRows.get(key);item.values.set(ed.id,(item.values.get(ed.id)||0)+1);
  }));
  const gtSorted=[...gtRows.values()].sort((a,b)=>a.gt.localeCompare(b.gt,'pt-BR',{numeric:true}));
  $('#panorama-gt-matrix').innerHTML='<div class="panorama-cross-table-wrap"><table class="panorama-cross-table"><thead><tr><th scope="col">GT original</th>'+editionsWithData.map(ed=>'<th scope="col">'+ed.year+'</th>').join('')+'<th scope="col">Total</th></tr></thead><tbody>'+gtSorted.map(item=>'<tr><th scope="row">'+escapeHTML(item.gt)+'</th>'+editionsWithData.map(ed=>'<td>'+(item.values.get(ed.id)||'—')+'</td>').join('')+'<td><strong>'+[...item.values.values()].reduce((a,b)=>a+b,0)+'</strong></td></tr>').join('')+'</tbody></table></div>';
  const iesFilter = $('#panorama-ies-filter');
  const IES_PADROES = [
    ['universidade estadual paulista', 'UNESP'], ['unesp', 'UNESP'],
    ['faculdade de educacao - usp', 'USP'], ['feusp', 'USP'], ['ffclrp/usp', 'USP'], ['instituto de matematica e estatistica -usp', 'USP'],
    ['universidade de sao paulo', 'USP'],
    ['faculdade de educacao, universidade estadual de campinas', 'UNICAMP'],
    ['universidade estadual de campinas', 'UNICAMP'], ['faculdade de educacao da universidade estadual de campinas', 'UNICAMP'],
    ['universidade estadual de santa cruz', 'UESC'],
    ['universidade federal do rio de janeiro', 'UFRJ'],
    ['projeto fundao', 'UFRJ'], ['pemat', 'UFRJ'],
    ['universidade do vale do taquari', 'UNIVATES'],
    ['universidade federal do estado do rio de janeiro', 'UNIRIO'],
    ['universidade federal rural do rio de janeiro', 'UFRRJ'],
    ['universidade federal de mato grosso do sul', 'UFMS'],
    ['universidade federal do mato grosso do sul', 'UFMS'],
    ['universidade federal de pernambuco', 'UFPE'],
    ['universidade estadual de maringa', 'UEM'],
    ['universidade franciscana', 'UFN'],
    ['universidade de brasilia', 'UnB'],
    ['universidade luterana do brasil', 'ULBRA'],
    ['universidade cruzeiro do sul', 'UNICSUL'],
    ['universidade tecnologica federal do parana', 'UTFPR'],
    ['instituto federal do rio de janeiro', 'IFRJ'],
    ['instituto federal de sao paulo', 'IFSP'],
    ['instituto federal de educacao ciencia e tecnologia de sao paulo', 'IFSP'],
    ['instituto federal do norte de minas gerais', 'IFNMG'],
    ['instituto federal norte de minas gerais', 'IFNMG'],
    ['instituto federal de goias', 'IFG'],
    ['instituto federal do mato grosso do sul', 'IFMS'],
    ['instituto federal do sul de minas', 'IFSULDEMINAS'],
    ['instituto federal sul de minas', 'IFSULDEMINAS'],
    ['instituto federal farroupilha', 'IFFar'],
    ['instituto federal catarinense', 'IFC'],
    ['instituto federal de brasilia', 'IFB'],
    ['centro federal de educacao tecnologica de minas gerais', 'CEFET-MG'],
    ['universidade federal de alfenas', 'UNIFAL-MG'],
    ['universidade federal do reconcavo da bahia', 'UFRB'],
    ['universidade federal do sul e sudeste do para', 'UNIFESSPA'],
    ['universidade federal da integracao latino-americana', 'UNILA'],
    ['universidade estadual do norte do parana', 'UENP'],
    ['universidade estadual de montes claros', 'UNIMONTES'],
    ['universidade do estado de santa catarina', 'UDESC'],
    ['universidade estadual da bahia', 'UNEB'],
    ['universidade do estado do mato grosso', 'UNEMAT'],
    ['universidade vale do taquari', 'UNIVATES'],
    ['instituto federal de educacao ciencia e tecnologia fluminense', 'IFF'],
    ['instituto federal do espirito santo', 'IFES'],
    ['universidade federal de pelotas', 'UFPel'],
    ['universidade federal do triangulo mineiro', 'UFTM'],
    ['universidade federal da fronteira sul', 'UFFS'],
    ['universidade federal da grande dourados', 'UFGD'],
    ['universidade federal de santa catarina', 'UFSC'],
    ['universidade federal de sao carlos', 'UFSCar'],
    ['universidade federal de sao paulo', 'UNIFESP'],
    ['universidade estadual do oeste do parana', 'UNIOESTE'],
    ['universidade federal do para', 'UFPA'],
    ['universidade federal do parana', 'UFPR']
  ];
  const NORMALIZACAO_PENDENTE = /universidade tecnologica federal do para|^brasil$|^educacao matematica$|^instituto de educacao$|^centro de educacao matematica$|^instituto superior de educacao de sao paulo$|^tania maria mendonca campos$|^luis rolando padilla$|^lilian nohemy lopez$|^evelin johana lagos$|^josue alejandro izaguirre$/i;
  const VALIDACAO_HISTORICA = new Set(['UNIBAN','UNIAN','Anhanguera-SP','Anhanguera-Uniban','UNIVASSOURAS','UFN']);
  const EXTRA_VINCULOS = [
    [/^universidade federal do rio de janeiro.*col[eé]gio de aplica[cç][aã]o/i,'UFRJ'],
    [/^universidade estadual paulista/i,'UNESP'],
    [/^universidade federal de pernambuco/i,'UFPE'],
    [/^universidade federal de s[aã]o carlos/i,'UFSCar'],
    [/^universidade estadual de campinas/i,'UNICAMP'],
    [/^universidade tecnol[oó]gica federal do paran[aá]/i,'UTFPR'],
    [/^universidade federal de mato grosso do sul/i,'UFMS'],
    [/^instituto federal de s[aã]o paulo/i,'IFSP']
  ];
  const canonicalName = raw => {
    const cleaned = String(raw || '').trim().replace(/\s*[–—-]\s*(?:Brasil|Brazil|Portugal|Espanha|Spain|Argentina|Suécia|Sweden|Chile|Colômbia|Colombia)\s*$/i, '').replace(/\s*\((?:Brasil|Brazil|Portugal|Espanha|Spain)\)\s*$/i,'').trim();
    const key = iesKey(cleaned);
    if (!key || NORMALIZACAO_PENDENTE.test(key)) return '';
    const named = EXTRA_VINCULOS.find(([pattern]) => pattern.test(cleaned));
    if (named) return named[1];
    const known = IES_PADROES.find(([name]) => key.startsWith(name) && (key.length === name.length || /[\s,(/–—-]/.test(key.charAt(name.length))));
    if (known) return known[1];
    if (/^(?:FEUSP|FAE-UFMG|FFCLRP)\b/i.test(cleaned)) return cleaned.startsWith('FAE') ? 'UFMG' : 'USP';
    if (/^UNESP\b/i.test(cleaned)) return 'UNESP';
    if (/^UNIAN\b/i.test(cleaned)) return 'UNIAN';
    return iesSigla(cleaned);
  };
  const NON_IES = /^(?:FAETEC|INEP|SEEDF|SEED(?:UC)?(?:-|$)|SEE-|SME-|PJF|CEDERJ|SENAI|CAp-|CPII|Colegio|Colégio|Prefeitura|Secretaria|Instituto Nacional de Estudos)/i;
  const extractIES = record => {
    const raw = [
      ...(Array.isArray(record.institutions) ? record.institutions : []),
      ...(Array.isArray(record.authors) ? record.authors.map(author =>
        String(author).match(/\(([^()]+)\)\s*$/)?.[1] || '') : [])
    ];
    return [...new Set(raw.flatMap(value => String(value || '').split(/\s*[;/]\s*/))
      .map(value => value.trim()).filter(Boolean)
      .map(value => value.replace(/\s+[–—-]\s+(?:Brasil|Brazil|Portugal|Espanha|Spain|Argentina|Suécia|Sweden|Chile|Colômbia|Colombia)\s*$/i, '').trim())
      .map(value => canonicalName(value).trim())
      .filter(value => value && value !== 'Instituição não identificada' && !NON_IES.test(value)))];
  };
  const renderIES = () => {
    const id = iesFilter.value;
    const rows = id === 'all' ? data.records : recordsFor(Number(id));
    const byIES = new Map();
    let without = 0;
    rows.forEach(record => {
      const names = extractIES(record);
      if (!names.length) without++;
      names.forEach(name => {
        const key = normalize(name).replace(/\s+/g, ' ').trim();
        const existing = byIES.get(key);
        byIES.set(key, { label: existing ? existing.label : name, count: (existing ? existing.count : 0) + 1 });
      });
    });
    const ordered = [...byIES.values()].sort((a,b) => b.count - a.count || a.label.localeCompare(b.label,'pt-BR'));
    const top = ordered.slice(0, 20);
    const biggest = Math.max(1, ...top.map(item => item.count));
    $('#panorama-ies-results').innerHTML =
      `<p class="panorama-count">${rows.length.toLocaleString('pt-BR')} registros · ${ordered.length} denominações institucionais identificadas · ${without} sem IES identificada</p>` +
      (top.length ? `<div class="panorama-gt-list">
        ${top.map(item => `<div class="panorama-ies-row">
          <span title="${escapeHTML(item.label)}">${escapeHTML(item.label)}</span>
          <div class="panorama-bar-track" aria-hidden="true"><span style="width:${(item.count / biggest * 100).toFixed(1)}%"></span></div>
          <strong>${item.count}</strong>
        </div>`).join('')}
      </div><p class="panorama-count">Exibindo até 20 denominações. Contagens provisórias, sujeitas à conferência das afiliações.</p>` : '<p class="panorama-count">Não há instituições identificadas nesta seleção.</p>');
  };
  $('#panorama-export-ies').addEventListener('click', () => {
    const quote = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
    const lines = [['registro','edicao','ano','gt','afiliacao_original','instituicao_normalizada','situacao']];
    data.records.forEach(record => {
      const raw = [...(record.institutions || []), ...(record.authors || []).map(a => String(a).match(/\(([^()]+)\)\s*$/)?.[1] || '').filter(Boolean)];
      if (!raw.length) lines.push([record.id,record.edition,record.year,record.gt,'','','sem_afiliacao']);
      else [...new Set(raw)].forEach(value => {
        const normalized = extractIES({...record, institutions:[value], authors:[]});
        const key = iesKey(value);
        const status = !normalized.length ? (IES_AMBIGUAS.has(key) ? 'ambiguo' : 'nao_ies_ou_nao_identificada')
          : (IES_SIGLAS[key] ? 'equivalencia_cadastrada' : 'revisar_fonte');
        lines.push([record.id,record.edition,record.year,record.gt,value,normalized.join(' | '),status]);
      });
    });
    const csv = '\uFEFF' + lines.map(row=>row.map(quote).join(';')).join('\r\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href=url;link.download='memoria-sipem-auditoria-ies.csv';
    document.body.appendChild(link);link.click();link.remove();
    URL.revokeObjectURL(url);
  });
  iesFilter.addEventListener('change', renderIES);
  renderIES();
}

function navigate() {
  const [path, params] = (location.hash.slice(1) || 'inicio').split('?');
  const search = new URLSearchParams(params || '');
  view = path === 'anais' ? 'archives' : path === 'historia' ? 'history' : path === 'sobre' ? 'about' : path === 'panorama' ? 'panorama' : 'home';
  const id = Number(search.get('edicao'));
  selected = editionById(id) ? id : (view === 'archives' ? 0 : 1);
  const term = search.get('busca');
  if (term !== null) query = term;
  page = 1;
  group = '';

  document.body.dataset.view = view;
  $$('.main-nav [data-view]').forEach(link => {
    if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const homeView = $('#home-view');
  const catalogView = $('#catalog-view');
  const aboutView = $('#about-view');
  const panoramaView = $('#panorama-view');
  homeView.hidden = view !== 'home';
  aboutView.hidden = view !== 'about';
  panoramaView.hidden = view !== 'panorama';
  catalogView.hidden = view === 'home' || view === 'about' || view === 'panorama';

  if (view === 'home') {
    document.title = 'Memória SIPEM — História e anais';
    home();
  } else if (view === 'panorama') {
    document.title = 'Panorama — Memória SIPEM';
    panorama();
  } else if (view === 'about') {
    document.title = 'Sobre — Memória SIPEM';
  } else {
    document.title = (view === 'history' ? 'História' : 'Anais') + ' — Memória SIPEM';
    $('#page-title').textContent = view === 'history' ? 'História do SIPEM' : 'Anais do SIPEM';
    $('#section-label').textContent = view === 'history' ? '2000 — 2024' : 'Acervo de trabalhos';
    $('#page-intro').innerHTML = view === 'history'
      ? 'Nove edições de encontros e pesquisa <br>em Educação Matemática.'
      : 'Títulos, autorias, instituições, <br>resumos e palavras-chave.';
    $('#edition-list').innerHTML = indexList();
    view === 'history' ? history() : archives();
  }
}

Promise.allSettled([loadJSON('acervo.json'), ...extraFiles.map(loadJSON)]).then(outcomes => {
  if (outcomes[0].status !== 'fulfilled') throw outcomes[0].reason;
  data = outcomes[0].value;
  const existing = new Set(data.records.map(record => record.id));
  const failures = [];
  outcomes.slice(1).forEach((outcome, position) => {
    if (outcome.status === 'rejected') { failures.push(extraFiles[position]); return; }
    outcome.value.forEach(record => {
      if (!record.drivePdf && !record.pdf && !record.officialUrl) {
        console.warn('Registro sem link de documento:', record.id);
        return;
      }
      if (!existing.has(record.id)) { data.records.push(record); existing.add(record.id); }
    });
  });
  if (failures.length) console.error('Grupos não carregados:', failures);
  data.records.forEach(record => {
    record.searchText = normalize([record.id, record.title, ...(record.authors || []), ...(record.authorNames || []), ...(record.institutions || []), record.abstract, ...(record.keywords || []), record.gt, record.section].join(' '));
  });
  navigate();
  window.addEventListener('hashchange', navigate);
}).catch(error => {
  console.error(error);
  const message = '<p class="loading">Não foi possível carregar o acervo. <a href="">Recarregar a página</a>.</p>';
  $('#home-view').innerHTML = message;
  $('#surface').innerHTML = message;
});
