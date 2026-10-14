type Props = {
  name: string;
  count: number;
  t(
    key: "greeting" | "message_count",
    values: { name: string } | { count: number },
  ): string;
};

// #region show
function Welcome({ t }: { t: (key: "welcome") => string }) {
  return <Text>{t("welcome")}</Text>;
}
// #endregion
