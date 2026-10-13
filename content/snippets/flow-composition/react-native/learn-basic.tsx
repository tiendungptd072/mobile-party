// #region show
const posts = useSyncExternalStore(postStore.subscribe, postStore.getSnapshot);
const ids = useSyncExternalStore(favoriteStore.subscribe, favoriteStore.getSnapshot);
const visible = posts.filter((post) => ids.has(post.id));
// #endregion
