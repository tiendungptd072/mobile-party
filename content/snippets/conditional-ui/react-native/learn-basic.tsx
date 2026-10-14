function VerificationComponent() {
// #region show
return isLoading ? <ActivityIndicator /> : <ProfileCard profile={profile} />;
// #endregion
}
