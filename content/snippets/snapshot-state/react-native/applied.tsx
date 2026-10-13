// #region show
function Tags() {
  const [tags, setTags] = useState(["one", "two"]);
  return <View>{tags.map((tag) =>
    <Button key={tag} title={tag} onPress={() =>
      setTags((current) => current.filter((item) => item !== tag))
    } />
  )}</View>;
}
// #endregion
