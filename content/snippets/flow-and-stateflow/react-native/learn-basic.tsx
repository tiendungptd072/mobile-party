// #region show
async function* pages() {
  yield await api.loadPage(1);
  yield await api.loadPage(2);
}

async function loadPages() {
  for await (const page of pages()) append(page);
}
// #endregion
