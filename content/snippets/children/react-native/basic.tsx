type Props = {
  header: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  posts: Post[];
  renderPost(post: Post, index: number): import("react").ReactElement;
};

// #region show
function Panel({ children }: { children: ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

<Panel><Text>Profile</Text></Panel>
// #endregion
