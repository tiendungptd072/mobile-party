// #region show
function SearchDraft({ query, onQueryChange }: Props) {
  return <TextInput value={query} onChangeText={onQueryChange} />;
}
// #endregion
