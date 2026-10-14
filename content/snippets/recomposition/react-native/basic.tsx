declare function useProfile(id: string): Profile;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile;
}>;

// #region show
function Counter() {
  const [count, setCount] = useState(0);
  return <Button title={String(count)} onPress={() => setCount((n) => n + 1)} />;
}
// #endregion
