// #region show
function openProfile(params: RouteParams) {
  const id = params.userId;
  if (!id) return showInvalidLink();
  navigate("Profile", { id });
}
// #endregion
