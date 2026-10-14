type Props = { profile: Profile; onOpen(): void };
declare function useProfile(): { state: ProfileState; retry(): void };
declare const ProfileScreen: import("react").ComponentType<{
  state: ProfileState;
  onRetry(): void;
}>;

// #region show
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <Text>Hello, {name}</Text>;
}
// #endregion
