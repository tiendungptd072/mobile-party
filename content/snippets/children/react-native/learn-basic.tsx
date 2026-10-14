type Props = {
  header: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  posts: Post[];
  renderPost(post: Post, index: number): import("react").ReactElement;
};

// #region show
function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}
// #endregion
