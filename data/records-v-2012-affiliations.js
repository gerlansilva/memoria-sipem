// Aplica ao catálogo do V SIPEM as filiações preservadas conforme aparecem nos PDFs.
// A filiação original é mantida em authorAffiliations; para exibição, remove-se apenas
// a indicação de país (Brasil) e usa-se o formato Autor (IES).
(() => {
  const verifiedByFile = window.SIPEM_V2012_AFFILIATIONS || {};
  const records = window.SIPEM_RECORDS_V_2012 || [];
  let matched = 0;
  let authorCount = 0;

  const displayAffiliation = value => String(value || "")
    .split(/\n+/)
    .map(line => line
      .trim()
      .replace(/\s*[,;]?\s*[-–—]?\s*Brasil\.?\s*$/i, "")
      .replace(/[;,]\s*$/, "")
      .trim())
    .filter(Boolean)
    .join("; ");

  window.SIPEM_RECORDS_V_2012 = records.map(record => {
    const verified = verifiedByFile[record.sourceFileName];
    if (!verified) return record;

    matched += 1;
    authorCount += verified.length;

    const authorNames = verified.map(([name]) => name);
    const institutions = verified
      .map(([, affiliation]) => displayAffiliation(affiliation))
      .filter(Boolean);

    return {
      ...record,
      authors: verified.map(([name, affiliation]) => {
        const institution = displayAffiliation(affiliation);
        return institution ? `${name} (${institution})` : name;
      }),
      authorNames,
      institutions,
      authorAffiliations: verified.map(([name, affiliation]) => ({name, affiliation})),
      metadataStatus: "autoria, filiação e palavras-chave validadas a partir dos PDFs do V SIPEM"
    };
  });

  if (matched !== 149 || authorCount !== 274) {
    console.warn(`[Memória SIPEM] Validação de filiações do V SIPEM: ${matched}/149 trabalhos e ${authorCount}/274 autores.`);
  }

  delete window.SIPEM_V2012_AFFILIATIONS;
})();
