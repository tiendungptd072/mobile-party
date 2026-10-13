// #region show
function TagScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const add = (tag: string) => setTags((current) => [...current, tag]);
  return <TagEditor tags={tags} onAdd={add} />;
}
// #endregion
