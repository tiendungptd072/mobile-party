type Props = { selected: Post };

// #region show
function Editor({ selected }: Props) {
  return <DraftEditor key={selected.id} item={selected} />;
}
// #endregion
