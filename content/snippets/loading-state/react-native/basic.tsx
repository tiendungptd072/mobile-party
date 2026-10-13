// #region show
type ProfileState =
  | { status: "loading" }
  | { status: "ready"; profile: Profile };

function ProfileScreen({ state }: { state: ProfileState }) {
  if (state.status === "loading") return <ActivityIndicator />;

  return <ProfileCard profile={state.profile} />;
}
// #endregion
