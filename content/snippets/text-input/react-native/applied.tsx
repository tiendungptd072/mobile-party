type Props = { value: string; onChange(value: string): void };

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
