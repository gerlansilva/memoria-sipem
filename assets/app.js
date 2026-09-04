const data = window.MEMORIA_SIPEM;
const $ = selector => document.querySelector(selector);
const norm = value => (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const esc = value => String(value || "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[character]));

function setup() {
  [...new Set(data.records.map(record => record.gt).filter(Boolean))].sort().forEach(gt => {
    $("#gt").insertAdjacentHTML("beforeend", `<option>${esc(gt)}</option>`);
  });
  render();
  renderEditions();
  showView(location.hash === "#anais" ? "archives" : "history");
}

function renderEditions() {
  $("#edition-timeline").innerHTML = data.editions.map(edition => {
    const mark = edition.logo
      ? `<img src="${esc(edition.logo)}" alt="Logo do ${esc(edition.roman)} SIPEM">`
      : `<span class="edition-seal" aria-hidden="true">${esc(edition.roman)}</span>`;
    const action = edition.id >= 8
      ? `<a href="#anais" class="edition-action" data-open-edition="${edition.id}">Pesquisar nos anais <span aria-hidden="true">→</span></a>`
      : `<a href="${esc(edition.url)}" class="edition-action" target="_blank" rel="noopener">Consultar anais <span aria-hidden="true">↗</span></a>`;
    return `<article class="edition-card">
      <div class="edition-mark">${mark}</div>
      <div class="edition-copy">
        <div class="edition-heading"><h2>${esc(edition.roman)} SIPEM</h2><span>${esc(edition.year)}</span></div>
        <p class="edition-theme">${esc(edition.theme)}</p>
        <dl><div><dt>Local</dt><dd>${esc(edition.place)}</dd></div><div><dt>Data</dt><dd>${esc(edition.dates)}</dd></div><div><dt>Trabalhos</dt><dd>${esc(edition.works)}</dd></div></dl>
        ${action}
      </div>
    </article>`;
  }).join("");

  document.querySelectorAll("[data-open-edition]").forEach(link => link.addEventListener("click", () => {
    $("#edition-filter").value = link.dataset.openEdition;
    updateEditionHeading();
    render();
  }));
}

function showView(view) {
  const archives = view === "archives";
  $("#history-view").hidden = archives;
  $("#archives-view").hidden = !archives;
  document.querySelectorAll("[data-view]").forEach(link => {
    const active = link.dataset.view === view;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
}

function articleTemplate(record) {
  const access = record.drivePdf || record.pdf || record.officialUrl;
  const abstract = record.abstract && !/^não encontrado$/i.test(record.abstract) ? record.abstract : "Resumo não disponível.";
  const keywords = (record.keywords || []).filter(keyword => keyword && !/^não encontrad/i.test(keyword));
  return `<article class="record">
    <div class="record-top"><span class="gt">${esc(record.gt)}</span><span>·</span><span>${esc(record.year)}</span></div>
    <h3><a href="${esc(access)}" target="_blank" rel="noopener">${esc(record.title)}</a></h3>
    ${record.authors?.length ? `<div class="authors">${record.authors.map(esc).join("; ")}</div>` : ""}
    <p class="abstract">${esc(abstract)}</p>
    ${keywords.length ? `<div class="keywords" aria-label="Palavras-chave">${keywords.map(keyword => `<span class="keyword">${esc(keyword)}</span>`).join("")}</div>` : ""}
    <div class="record-actions">${record.drivePdf ? `<a class="pdf-link" href="${esc(record.drivePdf)}" target="_blank" rel="noopener">Abrir PDF <span aria-hidden="true">↗</span></a>` : `<span class="unavailable">PDF não disponível</span>`}</div>
  </article>`;
}

function render() {
  const query = norm($("#query").value);
  const gt = $("#gt").value;
  const edition = $("#edition-filter").value;
  const results = data.records.filter(record =>
    (!edition || String(record.edition) === edition) &&
    (!gt || record.gt === gt) &&
    (!query || norm([record.id, record.title, ...(record.authors || []), record.abstract, ...(record.keywords || []), record.gt].join(" ")).includes(query))
  );

  $("#result-label").textContent = `${results.length} trabalho${results.length === 1 ? "" : "s"}`;
  $("#results").innerHTML = results.length
    ? results.map(articleTemplate).join("")
    : `<div class="empty"><strong>Nenhum trabalho encontrado</strong><span>Retire um filtro ou tente outro termo.</span></div>`;
}

function updateEditionHeading() {
  const edition = $("#edition-filter").value;
  const logo = $("#edition-logo");
  const label = $("#edition-label");
  const heading = $("#catalogo-titulo");
  const source = $("#source-link");
  if (edition === "8") {
    logo.hidden = false;
    logo.src = "assets/logo-viii-sipem.webp?v=20260904";
    label.textContent = "VIII SIPEM · On-line · 2021";
    heading.textContent = "Trabalhos do VIII SIPEM";
    source.href = "https://www.even3.com.br/anais/viiisipemvs2021/";
  } else if (edition === "9") {
    logo.hidden = false;
    logo.src = "assets/logo-ix-sipem.png?v=20260904-2";
    label.textContent = "IX SIPEM · Natal · 2024";
    heading.textContent = "Trabalhos do IX SIPEM";
    source.href = "https://www.sbembrasil.org.br/eventos/index.php/sipem/issue/view/39";
  } else {
    logo.hidden = true;
    label.textContent = "VIII e IX SIPEM · 2021–2024";
    heading.textContent = "Acervo de trabalhos do SIPEM";
    source.href = "https://www.sbembrasil.org.br/sipem";
  }
}

["query", "gt", "edition-filter"].forEach(id => {
  $("#" + id).addEventListener(id === "query" ? "input" : "change", render);
});

$("#edition-filter").addEventListener("change", updateEditionHeading);

$("#clear").addEventListener("click", () => {
  $("#query").value = "";
  $("#gt").value = "";
  $("#edition-filter").value = "";
  updateEditionHeading();
  render();
});

updateEditionHeading();
document.querySelectorAll("[data-view]").forEach(link => link.addEventListener("click", () => showView(link.dataset.view)));
window.addEventListener("hashchange", () => showView(location.hash === "#anais" ? "archives" : "history"));
setup();
