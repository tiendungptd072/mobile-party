// #region show
function EmailField({ value, onChange }: Props) {
  return <TextInput
    value={value}
    onChangeText={onChange}
    autoCapitalize="none"
    keyboardType="email-address"
  />;
}
// #endregion
