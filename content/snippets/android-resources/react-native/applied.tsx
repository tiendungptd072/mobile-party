// #region show
function Greeting({ name, t }: Props) {
  return <Text>{t("greeting", { name })}</Text>;
}
// #endregion
