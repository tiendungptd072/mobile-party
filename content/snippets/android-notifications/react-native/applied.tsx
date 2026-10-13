// #region show
<Button title="Enable reminders" onPress={async () => {
  const granted = await notifier.requestPermission();
  setRemindersEnabled(granted);
}} />
// #endregion
