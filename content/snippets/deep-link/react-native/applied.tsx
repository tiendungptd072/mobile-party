type Props = { route: { params: { userId: unknown } } };

// #region show
function ProfileRoute({ route }: Props) {
  const userId = parseUserId(route.params.userId);
  if (!userId) return <InvalidLinkScreen />;
  return <AuthorizedProfileRoute userId={userId} />;
}
// #endregion
