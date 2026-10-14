type Props = { query: string; onQueryChange(value: string): void };
declare function useProfile(id: string): Profile | null;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile;
}>;

// #region show
function SearchDraft({ query, onQueryChange }: Props) {
  return <TextInput value={query} onChangeText={onQueryChange} />;
}
// #endregion
