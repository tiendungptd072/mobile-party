package snippets.accessibility_semantics.production

// #region show
IconButton(onClick = onSave, modifier = Modifier.testTag("profile-save")) {
    Icon(Icons.Default.Save, contentDescription = "Save profile")
}

composeTestRule.onNodeWithTag("profile-save").performClick()
// #endregion
