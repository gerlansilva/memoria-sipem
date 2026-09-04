const data = window.MEMORIA_SIPEM;
const $ = selector => document.querySelector(selector);
const norm = value => (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const esc = value => String(value || "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[character]));

function setup() {
  data.editions.forEach(edition => {
    $("#edition").insertAdjacentHTML("beforeend", `<option value="${edition.id}">${edition.roman} SIPEM · ${edition.year}</option>`);
  });
  [...new Set(data.records.map(record => record.gt).filter(Boolean))].sort().forEach(gt => {
    $("#gt").insertAdjacentHTML("beforeend", `<option>${esc(gt)}</option>`);
  });
  [...new Set(data.records.map(record => record.type).filter(Boolean))].sort().forEach(type => {
    $("#type").insertAdjacentHTML("beforeend", `<option>${esc(type)}</option>`);
  });
  render();
}

function articleTemplate(record) {
  const access = record.drivePdf || record.pdf || record.officialUrl;
  const abstract = record.abstract && !/^não encontrado$/i.test(record.abstract) ? record.abstract : "Resumo não disponível.";
  const keywords = (record.keywords || []).filter(keyword => keyword && !/^não encontrad/i.test(keyword));
  return `<article class="record">
    <div class="record-top"><span class="gt">${esc(record.gt)}</span><span>·</span><span>${esc(record.year)}</span><span>·</span><span>${esc(record.id)}</span></div>
    <h3><a href="${esc(access)}" target="_blank" rel="noopener">${esc(record.title)}</a></h3>
    ${record.authors?.length ? `<div class="authors">${record.authors.map(esc).join("; ")}</div>` : ""}
    <p class="abstract">${esc(abstract)}</p>
    ${keywords.length ? `<div class="keywords" aria-label="Palavras-chave">${keywords.map(keyword => `<span class="keyword">${esc(keyword)}</span>`).join("")}</div>` : ""}
    <div class="record-actions">${record.drivePdf ? `<a class="pdf-link" href="${esc(record.drivePdf)}" target="_blank" rel="noopener">Abrir PDF <span aria-hidden="true">↗</span></a>` : `<span class="unavailable">PDF não disponível</span>`}</div>
  </article>`;
}

function render() {
  const query = norm($("#query").value);
  const edition = $("#edition").value;
  const gt = $("#gt").value;
  const type = $("#type").value;
  const results = data.records.filter(record =>
    (!edition || String(record.edition) === edition) &&
    (!gt || record.gt === gt) &&
    (!type || record.type === type) &&
    (!query || norm([record.id, record.title, ...(record.authors || []), record.abstract, ...(record.keywords || []), record.gt].join(" ")).includes(query))
  );

  $("#result-label").textContent = `${results.length} trabalho${results.length === 1 ? "" : "s"}`;
  $("#results").innerHTML = results.length
    ? results.map(articleTemplate).join("")
    : `<div class="empty"><strong>Nenhum trabalho encontrado</strong><span>Retire um filtro ou tente outro termo.</span></div>`;
}

["query", "edition", "gt", "type"].forEach(id => {
  $("#" + id).addEventListener(id === "query" ? "input" : "change", render);
});

$("#clear").addEventListener("click", () => {
  $("#query").value = "";
  $("#edition").value = "";
  $("#gt").value = "";
  $("#type").value = "";
  render();
});

setup();

