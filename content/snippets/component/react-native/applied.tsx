type Props = { profile: Profile; onOpen(): void };
declare function useProfile(): { state: ProfileState; retry(): void };
declare const ProfileScreen: import("react").ComponentType<{
  state: ProfileState;
  onRetry(): void;
}>;

// #region show
function ProfileCard({ profile, onOpen }: Props) {
  return <Pressable onPress={onOpen}><Text>{profile.name}</Text></Pressable>;
}
// #endregion
