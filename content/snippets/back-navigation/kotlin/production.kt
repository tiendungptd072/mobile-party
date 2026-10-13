package snippets.back_navigation.production

// #region show
BackHandler(enabled = hasUnsavedChanges) {
    showDiscardDialog = true
}

EditProfileContent(draft = draft, onChange = onChange)
// #endregion
