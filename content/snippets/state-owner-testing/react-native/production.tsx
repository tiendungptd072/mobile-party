// #region show
await cache.upsert([post]);
const reopened = await openTestCache();
expect(await reopened.getById(post.id)).toEqual(post);
// #endregion
