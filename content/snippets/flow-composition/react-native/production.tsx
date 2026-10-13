// #region show
expect(selectSavedPosts([post], new Set<string>())).toEqual([]);
expect(selectSavedPosts([post], new Set([post.id]))).toEqual([post]);
// #endregion
