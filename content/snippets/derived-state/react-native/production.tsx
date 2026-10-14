type Props = { posts: Post[] };

// #region show
function Feed({ posts }: Props) {
  const [showTop, setShowTop] = useState(false);

  return <FlatList
    data={posts}
    renderItem={({ item }) => <PostRow post={item} />}
    onScroll={({ nativeEvent }) => {
      const next = nativeEvent.contentOffset.y > 200;
      setShowTop((current) => current === next ? current : next);
    }}
  />;
}
// #endregion
