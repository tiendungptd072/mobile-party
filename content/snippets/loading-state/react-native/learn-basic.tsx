// #region show
if (state.status === "loading") return <ActivityIndicator />;
return <ProfileView profile={state.profile} />;
// #endregion
