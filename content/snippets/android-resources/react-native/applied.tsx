type Props = {
  name: string;
  t(
    key: "greeting" | "message_count",
    values: { name: string } | { count: number },
  ): string;
};

// #region show
function Greeting({ name, t }: Props) {
  return <Text>{t("greeting", { name })}</Text>;
}
// #endregion
