// #region show
function SearchDraft() {
  const [query, setQuery] = useState("");
  return <TextInput value={query} onChangeText={setQuery} />;
}
// #endregion
