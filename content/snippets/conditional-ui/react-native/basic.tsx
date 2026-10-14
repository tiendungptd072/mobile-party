declare const ProfileCard: import("react").ComponentType<{ user: User }>;
function VerificationComponent() {
// #region show
return isLoading ? <ActivityIndicator /> : <ProfileCard user={user} />;
// #endregion
}
