// #region show
const [feed, setFeed] = useState<FeedState>(initialFeed);

async function refresh() {
  const posts = await api.loadPosts();
  setFeed((current) => ({ ...current, posts }));
}
// #endregion
