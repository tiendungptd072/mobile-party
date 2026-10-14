type Props = { saving: boolean; onSave(): void };

// #region show
function SaveButton({ saving, onSave }: Props) {
  return <Pressable disabled={saving} onPress={onSave} accessibilityRole="button">
    <Text>{saving ? "Saving…" : "Save"}</Text>
  </Pressable>;
}
// #endregion
