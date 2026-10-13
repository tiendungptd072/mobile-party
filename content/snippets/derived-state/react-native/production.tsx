// #region show
function Feed({ posts }: Props) {
  const [showTop, setShowTop] = useState(false);

  return <FlatList
    data={posts}
    onScroll={({ nativeEvent }) => {
      const next = nativeEvent.contentOffset.y > 200;
      setShowTop((current) => current === next ? current : next);
    }}
  />;
}
// #endregion
