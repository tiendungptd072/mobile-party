declare function navigate(name: "Profile", params: { id: string }): void;
type UserDto = { id: string; name: string | null; avatarUrl: string | null };

// #region show
function openProfile(params: RouteParams) {
  const id = params.userId;
  if (!id) return showInvalidLink();
  navigate("Profile", { id });
}
// #endregion
