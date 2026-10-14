type Props = {
  value: string;
  error: string | null;
  onChange(value: string): void;
};

// #region show
function EmailField({ value, error, onChange }: Props) {
  return <View>
    <TextInput value={value} onChangeText={onChange} accessibilityLabel="Email" />
    {error ? <Text accessibilityLiveRegion="polite">{error}</Text> : null}
  </View>;
}
// #endregion
