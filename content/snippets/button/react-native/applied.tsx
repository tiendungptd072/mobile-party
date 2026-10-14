type Props = { isSaving: boolean; canSave: boolean; onSave(): void };

// #region show
function SaveButton({ isSaving, canSave, onSave }: Props) {
  return <Button
    title={isSaving ? "Saving…" : "Save"}
    disabled={isSaving || !canSave}
    onPress={onSave}
  />;
}
// #endregion
