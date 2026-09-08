'use strict';
const $=s=>document.querySelector(s);
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
const safeURL=v=>/^https?:\/\//i.test(v||'')?escapeHTML(v):'';
const downloadIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>';
let data,view='history',selected=1,query='',group='',sort='recent',page=1;
const pageSize=12;
const editionById=id=>data.editions.find(e=>e.id===Number(id));
const recordsFor=id=>data.records.filter(r=>!id||Number(r.edition)===Number(id));
const route=(v,id)=>'#'+(v==='history'?'historia':'anais')+(id?'?edicao='+id:'');
function index(){
 $('#edition-list').innerHTML=(view==='archives'?`<a class="edition-link all" href="#anais" ${!selected?'aria-current="true"':''}>Todas as edições</a>`:'')+data.editions.map(e=>`<a href="${route(view,e.id)}" class="edition-link" ${e.id===selected?'aria-current="true"':''} aria-label="${e.roman} SIPEM, ${e.year}, ${escapeHTML(e.place)}"><span class="roman">${e.roman}</span><span class="year">${e.year}</span><small>${view==='history'?escapeHTML(e.place.match(/\(([^)]+)\)/)?.[1]||'On-line'):recordsFor(e.id).length?'('+recordsFor(e.id).length+')':'↗'}</small></a>`).join('');
}
function history(){
 const e=editionById(selected);const n=recordsFor(e.id).length;
 $('#surface').innerHTML=`<div class="edition-top"><h2>${e.roman} Seminário Internacional de Pesquisa em Educação Matemática</h2><span class="folio">${String(e.id).padStart(2,'0')} / 09</span></div>
 <div class="edition-display"><div class="edition-copy"><h3 class="place">${escapeHTML(e.place)}</h3><p class="dates">${escapeHTML(e.dates)}</p>${!e.theme.startsWith('Tema geral não')?`<p class="theme">${escapeHTML(e.theme)}</p>`:''}</div><figure class="edition-logo"><img src="${escapeHTML(e.logo)}" alt="Marca original do ${e.roman} SIPEM" width="320" height="230"></figure></div>
 <div class="edition-facts"><dl><div><dt>trabalhos na edição*</dt><dd>${e.works}</dd></div><div><dt>Grupos de Trabalho</dt><dd>${e.gts.length}</dd></div></dl>${n?`<a class="primary-link" href="${route('archives',e.id)}">Pesquisar nos anais <span aria-hidden="true">→</span></a>`:`<a class="primary-link" href="${safeURL(e.url)}" target="_blank" rel="noopener">Consultar anais <span aria-hidden="true">↗</span></a>`}</div>
 ${e.id===1?'<p class="history-description">Criado pela Sociedade Brasileira de Educação Matemática em 2000, o SIPEM consolidou um espaço de encontro, debate e intercâmbio entre pesquisadores da Educação Matemática.</p>':''}
 <details class="group-details"><summary>Grupos de Trabalho desta edição</summary><ol class="group-list">${e.gts.map(g=>`<li>${escapeHTML(typeof g==='string'?g:g.name)}${g.coordination?`<small>${escapeHTML(g.responsibilityLabel||'Coordenação')}: ${escapeHTML(g.coordination)}</small>`:''}</li>`).join('')}</ol></details>
 <p class="source-note">* Quantitativo histórico da edição, que pode diferir do número de trabalhos disponíveis nesta busca. ${n?`${n} registros desta edição estão indexados no acervo.`:'Os anais desta edição são consultados na fonte externa.'} Dados preservados do <a href="https://gerlansilva.github.io/memoria-sipem/#historia" target="_blank" rel="noopener">Memória SIPEM</a>; referência histórica: <a href="https://www.sbembrasil.org.br/eventos/index.php/sipem/historico" target="_blank" rel="noopener">SBEM</a>.</p>
 <nav class="edition-paging" aria-label="Percorrer edições">${e.id>1?`<a href="${route('history',e.id-1)}">← ${editionById(e.id-1).roman} SIPEM · ${editionById(e.id-1).year}</a>`:'<span></span>'}${e.id<9?`<a href="${route('history',e.id+1)}">${editionById(e.id+1).roman} SIPEM · ${editionById(e.id+1).year} →</a>`:''}</nav>`;
}
function archives(){
 const e=editionById(selected);const groups=new Map();recordsFor(selected).forEach(r=>{if(r.gt)groups.set(r.gt,r.section||r.gt)});if(!groups.has(group))group='';
 $('#surface').innerHTML=`<div class="archive-title"><div><h2>${e?e.roman+' SIPEM':'Todas as edições'}</h2><p>${e?escapeHTML(e.place)+' · '+e.year:'I, V, VI, VIII e IX SIPEM · trabalhos indexados'}</p></div>${e?`<img src="${escapeHTML(e.logo)}" alt="Marca do ${e.roman} SIPEM" width="110" height="64">`:''}</div>
 <form class="search-form" role="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg><input id="search" type="search" aria-label="Pesquisar títulos, autorias, instituições, resumos e palavras-chave" placeholder="O que você procura no acervo?" value="${escapeHTML(query)}"><button type="submit">Buscar</button></form>
 <div class="filter-row"><div class="filter-control"><label for="gt">Grupo de Trabalho</label><select id="gt"><option value="">Todos os GTs</option>${[...groups].sort((a,b)=>a[0].localeCompare(b[0],'pt-BR',{numeric:true})).map(([k,v])=>`<option value="${escapeHTML(k)}" ${k===group?'selected':''}>${escapeHTML(v)}</option>`).join('')}</select></div><button class="text-button" id="reset">Limpar busca</button></div>
 <div class="result-head"><h3 id="result-count" role="status" aria-live="polite"></h3><select id="sort" aria-label="Ordenar trabalhos"><option value="recent">Mais recentes</option><option value="oldest">Mais antigos</option><option value="title">Título: A–Z</option></select></div><div id="results"></div><div id="pagination"></div>`;
 $('#sort').value=sort;
 $('.search-form').addEventListener('submit',ev=>{ev.preventDefault();query=$('#search').value;page=1;results()});
 $('#search').addEventListener('input',()=>{query=$('#search').value;page=1;results()});
 $('#gt').addEventListener('change',()=>{group=$('#gt').value;page=1;results()});
 $('#sort').addEventListener('change',()=>{sort=$('#sort').value;page=1;results()});
 $('#reset').addEventListener('click',()=>{query='';group='';page=1;$('#search').value='';$('#gt').value='';results();$('#search').focus()});results();
}
function article(r){
 const url=safeURL(r.drivePdf||r.pdf||r.officialUrl);const e=editionById(r.edition);
 const keywords=(r.keywords||[]).filter(k=>k&&!/^não encontrad/i.test(k));const institutions=r.institutions||[];
 return `<article class="record"><div><div class="record-meta"><span class="gt">${escapeHTML(r.gt)}</span><span>${e.roman} SIPEM · ${r.year}</span></div><h3>${url?`<a href="${url}" target="_blank" rel="noopener">${escapeHTML(r.title)}</a>`:escapeHTML(r.title)}</h3><p class="authors">${(r.authors||[]).map(escapeHTML).join('; ')||'Autoria não informada no registro.'}</p><details class="record-details"><summary>Resumo e informações</summary>${r.abstract&&!/^não encontrado$/i.test(r.abstract)?`<p class="abstract">${escapeHTML(r.abstract)}</p>`:'<p class="abstract">Resumo não disponível neste registro.</p>'}${institutions.length?`<p class="affiliations">${institutions.map(escapeHTML).join('; ')}</p>`:''}<p class="affiliations">${escapeHTML(r.section||r.gt)}</p>${keywords.length?`<p class="keywords"><strong>Palavras-chave</strong> · ${keywords.map(escapeHTML).join('; ')}</p>`:''}</details></div>${url?`<a class="download" href="${url}" target="_blank" rel="noopener" aria-label="Abrir documento: ${escapeHTML(r.title)}">${downloadIcon}<span>${/pdf/i.test(r.accessLabel||'')||r.drivePdf||r.pdf?'PDF':'Abrir'}</span></a>`:'<span class="unavailable">Sem PDF</span>'}</article>`;
}
function results(){
 const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
 const rows=recordsFor(selected).filter(r=>(!group||r.gt===group)&&terms.every(t=>r.searchText.includes(t))).sort((a,b)=>sort==='title'?a.title.localeCompare(b.title,'pt-BR'):((sort==='oldest'?a.year-b.year:b.year-a.year)||a.title.localeCompare(b.title,'pt-BR')));
 const max=Math.max(1,Math.ceil(rows.length/pageSize));page=Math.min(page,max);
 $('#result-count').textContent=rows.length.toLocaleString('pt-BR')+' trabalho'+(rows.length===1?'':'s');
 const e=editionById(selected);
 $('#results').innerHTML=rows.length?rows.slice((page-1)*pageSize,page*pageSize).map(article).join(''):`<div class="empty"><h3>${selected&&!recordsFor(selected).length?'Anais disponíveis na fonte original':'Nenhum trabalho encontrado'}</h3><p>${selected&&!recordsFor(selected).length?'Esta edição ainda não possui trabalhos indexados na busca do acervo.':'Tente outro termo ou retire o filtro de Grupo de Trabalho.'}</p>${selected&&!recordsFor(selected).length?`<a class="primary-link" href="${safeURL(e.url)}" target="_blank" rel="noopener">Consultar anais do ${e.roman} SIPEM ↗</a>`:''}</div>`;
 $('#pagination').innerHTML=rows.length>pageSize?`<nav class="pagination" aria-label="Páginas de resultados"><button id="prev" ${page===1?'disabled':''}>← Anterior</button><span>Página ${page} de ${max}</span><button id="next" ${page===max?'disabled':''}>Próxima →</button></nav>`:'';
 $('#prev')?.addEventListener('click',()=>{page--;results();$('.result-head').scrollIntoView({block:'start'})});$('#next')?.addEventListener('click',()=>{page++;results();$('.result-head').scrollIntoView({block:'start'})});
}
function navigate(){
 const [path,params]=location.hash.slice(1).split('?');view=path==='anais'?'archives':'history';const id=Number(new URLSearchParams(params).get('edicao'));selected=editionById(id)?id:view==='history'?1:0;page=1;
 document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 $('#page-title').textContent=view==='history'?'História do SIPEM':'Anais do SIPEM';$('#section-label').textContent=view==='history'?'2000 — 2024':'ACERVO DE TRABALHOS';$('#page-intro').innerHTML=view==='history'?'Nove edições de encontros e pesquisa<br>em Educação Matemática.':'Títulos, autorias, instituições,<br>resumos e palavras-chave.';
 document.title=(view==='history'?'História':'Anais')+' — Memória SIPEM';index();view==='history'?history():archives();
}
fetch('data/acervo.json').then(r=>{if(!r.ok)throw Error('Acervo indisponível');return r.json()}).then(d=>{data=d;data.records.forEach(r=>r.searchText=normalize([r.id,r.title,...(r.authors||[]),...(r.authorNames||[]),...(r.institutions||[]),r.abstract,...(r.keywords||[]),r.gt,r.section].join(' ')));navigate();window.addEventListener('hashchange',navigate)}).catch(()=>{$('#surface').innerHTML='<p>Não foi possível carregar o acervo. <a href="">Recarregar a página</a>.</p>'});
