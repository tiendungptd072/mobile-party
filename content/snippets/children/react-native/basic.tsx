// #region show
function Panel({ children }: { children: ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

<Panel><Text>Profile</Text></Panel>
// #endregion
