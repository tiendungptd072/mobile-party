declare const Profile: import("react").ComponentType<{ user: User }>;
function VerificationComponent(
  state: { status: "loading" } | { status: "ready"; user: User },
) {
// #region show
type State =
  | { status: "loading" }
  | { status: "ready"; user: User };

return state.status === "loading" ? <Spinner /> : <Profile user={state.user} />;
// #endregion
}
