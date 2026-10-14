type Props = { onSave(): void };

// #region show
function SaveButton({ onSave }: Props) {
  return <Button title="Save" onPress={onSave} />;
}
// #endregion
