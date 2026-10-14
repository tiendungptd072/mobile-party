type Props = { profile: Profile; onOpen(): void };
declare function useProfile(): { state: ProfileState; retry(): void };
declare const ProfileScreen: import("react").ComponentType<{
  state: ProfileState;
  onRetry(): void;
}>;

// #region show
function Greeting() {
  return <Text>Hello</Text>;
}
// #endregion
