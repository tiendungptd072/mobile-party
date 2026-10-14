type Props = {
  count: number;
  t(
    key: "greeting" | "message_count",
    values: { name: string } | { count: number },
  ): string;
};

// #region show
function MessageCount({ count, t }: Props) {
  return <Text>{t("message_count", { count })}</Text>;
}
// #endregion
