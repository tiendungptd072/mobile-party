declare const state:
  { status: "loading" } | { status: "ready"; profile: Profile };
function VerificationComponent() {
// #region show
if (state.status === "loading") return <ActivityIndicator />;
return <ProfileView profile={state.profile} />;
// #endregion
}
