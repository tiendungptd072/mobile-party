// #region show
type Post = { id: string; title: string };
type FeedState = {
  posts: Post[];
  bookmarkedIds: ReadonlySet<string>;
};

const initialFeed: FeedState = {
  posts: [],
  bookmarkedIds: new Set(),
};

const visiblePosts = (state: FeedState) => state.posts.map((post) => ({
  ...post,
  bookmarked: state.bookmarkedIds.has(post.id),
}));
// #endregion
