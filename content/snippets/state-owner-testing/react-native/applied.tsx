type Cache = {
  upsert(posts: Post[]): Promise<void>;
  getById(id: string): Promise<Post | null>;
};
declare const cache: Cache;
declare function openTestCache(): Promise<Cache>;

// #region show
const repository = new FakeFeedRepository([]);
const { result } = await renderHook(() => useFeed(repository));
await act(async () => repository.emit([post]));
expect(result.current.items).toEqual([post]);
// #endregion
