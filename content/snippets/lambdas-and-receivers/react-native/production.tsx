// #region show
function ActionBar({ renderActions }: {
  renderActions: (context: { disabled: boolean }) => ReactNode;
}) {
  return <View>{renderActions({ disabled: false })}</View>;
}
// #endregion
