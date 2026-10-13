// #region show
function Welcome({ t }: { t: (key: "welcome") => string }) {
  return <Text>{t("welcome")}</Text>;
}
// #endregion
