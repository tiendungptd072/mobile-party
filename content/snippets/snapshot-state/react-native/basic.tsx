// #region show
function Tags() {
  const [tags, setTags] = useState<string[]>([]);
  return <Button title={String(tags.length)} onPress={() =>
    setTags((current) => [...current, "new"])
  } />;
}
// #endregion
