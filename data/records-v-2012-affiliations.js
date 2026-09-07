// Aplica ao catálogo do V SIPEM as filiações preservadas conforme aparecem nos PDFs.
(() => {
  const verifiedByFile = window.SIPEM_V2012_AFFILIATIONS || {};
  const records = window.SIPEM_RECORDS_V_2012 || [];
  let matched = 0;
  let authorCount = 0;

  window.SIPEM_RECORDS_V_2012 = records.map(record => {
    const verified = verifiedByFile[record.sourceFileName];
    if (!verified) return record;

    matched += 1;
    authorCount += verified.length;

    const authorNames = verified.map(([name]) => name);
    const institutions = verified.map(([, affiliation]) => affiliation).filter(Boolean);

    return {
      ...record,
      authors: verified.map(([name, affiliation]) => affiliation ? `${name} — ${affiliation}` : name),
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
