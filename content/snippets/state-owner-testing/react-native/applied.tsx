// #region show
const repository = new FakeFeedRepository([]);
const { result } = await renderHook(() => useFeed(repository));
await act(async () => repository.emit([post]));
expect(result.current.items).toEqual([post]);
// #endregion
