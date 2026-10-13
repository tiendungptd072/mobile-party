// #region show
const repository = new FakeFeedRepository([post]);
const { result } = await renderHook(() => useFeed(repository));
await waitFor(() => expect(result.current.items).toEqual([post]));
// #endregion
