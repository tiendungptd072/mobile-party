// #region show
const loadingRef = useRef(false);

async function loadNextPage() {
  if (loadingRef.current || !nextCursor) return;
  loadingRef.current = true;
  setIsLoading(true);
  setAppendError(null);
  try {
    const page = await fetchPage(nextCursor);
    setItems((current) => [...current, ...page.items]);
    setNextCursor(page.nextCursor);
  } catch {
    setAppendError("Could not load more posts");
  } finally {
    loadingRef.current = false;
    setIsLoading(false);
  }
}
// #endregion
