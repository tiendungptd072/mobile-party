// #region show
function NameField() {
  const [name, setName] = useState("");
  return <TextInput value={name} onChangeText={setName} />;
}
// #endregion
