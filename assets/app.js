const data = window.MEMORIA_SIPEM;
const $ = selector => document.querySelector(selector);
const norm = value => (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const esc = value => String(value || "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[character]));

function setup() {
  [...new Set(data.records.map(record => record.gt).filter(Boolean))].sort().forEach(gt => {
    $("#gt").insertAdjacentHTML("beforeend", `<option>${esc(gt)}</option>`);
  });
  render();
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
setup();
