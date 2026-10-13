// #region show
function MessageCount({ count, t }: Props) {
  return <Text>{t("message_count", { count })}</Text>;
}
// #endregion
