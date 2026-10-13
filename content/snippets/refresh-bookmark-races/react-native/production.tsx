// #region show
test("bookmark survives either refresh order", async () => {
  let complete!: (posts: Post[]) => void;
  const pending = new Promise<Post[]>((resolve) => { complete = resolve; });
  let state = initialFeed;
  const refresh = pending.then((posts) => {
    state = reduceFeed(state, { type: "refreshed", posts });
  });

  state = reduceFeed(state, { type: "bookmark-toggled", id: "a" });
  complete([{ id: "a", title: "Fresh" }]);
  await refresh;
  expect(state.posts[0].title).toBe("Fresh");
  expect(state.bookmarkedIds.has("a")).toBe(true);

  state = reduceFeed(initialFeed, {
    type: "refreshed", posts: [{ id: "a", title: "Fresh" }],
  });
  state = reduceFeed(state, { type: "bookmark-toggled", id: "a" });
  expect(state.posts[0].title).toBe("Fresh");
  expect(state.bookmarkedIds.has("a")).toBe(true);
});
// #endregion
