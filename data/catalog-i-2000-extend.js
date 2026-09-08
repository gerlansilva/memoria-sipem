// Integra os registros do I SIPEM ao catálogo geral após a criação de window.MEMORIA_SIPEM.
(() => {
  const catalog = window.MEMORIA_SIPEM;
  const records = window.SIPEM_RECORDS_I_2000 || [];
  if (!catalog || !Array.isArray(catalog.records) || !records.length) return;

  const existingIds = new Set(catalog.records.map(record => record.id));
  const missing = records.filter(record => !existingIds.has(record.id));
  catalog.records = [...missing, ...catalog.records];

  // Mantém o quantitativo histórico informado pela fonte e explicita o corpus preservado.
  const edition = catalog.editions?.find(item => Number(item.id) === 1);
  if (edition) edition.works = "97 (histórico oficial) · 106 registros preservados";
})();
