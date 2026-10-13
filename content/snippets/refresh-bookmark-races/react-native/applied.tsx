// #region show
type FeedEvent =
  | { type: "refreshed"; posts: Post[] }
  | { type: "bookmark-toggled"; id: string };

function reduceFeed(state: FeedState, event: FeedEvent): FeedState {
  if (event.type === "refreshed") return { ...state, posts: event.posts };
  const ids = new Set(state.bookmarkedIds);
  if (ids.has(event.id)) ids.delete(event.id);
  else ids.add(event.id);
  return { ...state, bookmarkedIds: ids };
}

function useFeed() {
  const [feed, setFeed] = useState(initialFeed);
  function dispatch(event: FeedEvent) {
    setFeed((current) => reduceFeed(current, event));
  }
  return { feed, dispatch };
}
// #endregion
