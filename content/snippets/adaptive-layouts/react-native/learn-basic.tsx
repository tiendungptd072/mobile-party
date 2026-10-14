type Props = { selectedId: string | null };

// #region show
function SettingsScreen() {
  const { width } = useWindowDimensions();
  return width >= 600 ? <SettingsGrid /> : <SettingsList />;
}
// #endregion
