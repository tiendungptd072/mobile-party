declare const repository: {
  getPage(
    cursor: string,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};
declare const api: {
  getFeed(
    cursor: string | null,
    signal: AbortSignal,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};

// #region show
const loadingRef = useRef(false);

async function loadMore() {
  if (loadingRef.current || !nextCursor) return;
  loadingRef.current = true;
  setAppend("loading");
  try {
    const page = await repository.getPage(nextCursor);
    setItems((current) => [...current, ...page.items]);
    setNextCursor(page.nextCursor);
    setAppend("idle");
  } catch {
    setAppend("error");
  } finally {
    loadingRef.current = false;
  }
}
// #endregion
