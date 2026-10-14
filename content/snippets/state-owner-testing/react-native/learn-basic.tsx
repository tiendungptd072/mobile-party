type Cache = {
  upsert(posts: Post[]): Promise<void>;
  getById(id: string): Promise<Post | null>;
};
declare const cache: Cache;
declare function openTestCache(): Promise<Cache>;

// #region show
const repository = new FakeFeedRepository([post]);
const { result } = await renderHook(() => useFeed(repository));
await waitFor(() => expect(result.current.items).toEqual([post]));
// #endregion
