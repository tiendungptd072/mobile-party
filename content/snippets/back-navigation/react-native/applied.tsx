// #region show
<DiscardDialog
  visible={showDiscardDialog}
  onDiscard={() => navigation.goBack()}
  onKeepEditing={() => setShowDiscardDialog(false)}
/>
// #endregion
