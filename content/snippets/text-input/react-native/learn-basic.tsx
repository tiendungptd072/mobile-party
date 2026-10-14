type Props = {
  value: string;
  error: string | null;
  onChange(value: string): void;
};

// #region show
function NameField() {
  const [name, setName] = useState("");
  return <TextInput value={name} onChangeText={setName} />;
}
// #endregion
