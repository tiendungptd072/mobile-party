// #region show
type ProfileState =
  | { status: "loading" }
  | { status: "ready"; profile: Profile }
  | { status: "error"; message: string };
// #endregion
