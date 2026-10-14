type Props = {
  value: string;
  error: string | null;
  onChange(value: string): void;
};

// #region show
<TextInput value={name} onChangeText={setName} placeholder="Name" />
// #endregion
