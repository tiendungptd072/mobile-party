type Cache = {
  upsert(posts: Post[]): Promise<void>;
  getById(id: string): Promise<Post | null>;
};
declare const cache: Cache;
declare function openTestCache(): Promise<Cache>;

// #region show
await cache.upsert([post]);
const reopened = await openTestCache();
expect(await reopened.getById(post.id)).toEqual(post);
// #endregion
