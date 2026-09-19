export const backNavigationStageExamples = {
  "back-navigation": {
    basic: {
      "react-native": {
        name: "Allow default back when no draft exists",
        summary: "The listener consumes back only when there is unsaved work.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        code: `useEffect(() => {
  const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
    if (!hasUnsavedChanges) return false;
    setShowDiscardDialog(true);
    return true;
  });
  return () => subscription.remove();
}, [hasUnsavedChanges]);`,
      },
      kotlin: {
        name: "Enable only for an unsaved draft",
        summary:
          "The navigation stack handles back unless the handler is enabled.",
        language: "kotlin",
        filename: "EditProfileScreen.kt",
        code: `BackHandler(enabled = hasUnsavedChanges) {
    showDiscardDialog = true
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Confirm before discard",
        summary:
          "The dialog decides whether to continue the normal navigation action.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        code: `<DiscardDialog
  visible={showDiscardDialog}
  onDiscard={() => navigation.goBack()}
  onKeepEditing={() => setShowDiscardDialog(false)}
/>`,
      },
      kotlin: {
        name: "Confirm before discard",
        summary:
          "The route owns popping the back stack after the user confirms.",
        language: "kotlin",
        filename: "EditProfileRoute.kt",
        code: `if (showDiscardDialog) {
    AlertDialog(
        onDismissRequest = { showDiscardDialog = false },
        confirmButton = { TextButton(onClick = navController::popBackStack) { Text("Discard") } },
        dismissButton = { TextButton(onClick = { showDiscardDialog = false }) { Text("Keep editing") },
    )
}`,
      },
    },
    production: {
      "react-native": {
        name: "Keep ordinary navigation unblocked",
        summary: "The screen hook exists only for the temporary draft state.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        code: `useEffect(() => {
  if (!hasUnsavedChanges) return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", confirmDiscard);
  return () => subscription.remove();
}, [hasUnsavedChanges, confirmDiscard]);`,
      },
      kotlin: {
        name: "Keep handler composition stable",
        summary:
          "Call BackHandler consistently and toggle only its enabled state.",
        language: "kotlin",
        filename: "EditProfileScreen.kt",
        code: `BackHandler(enabled = hasUnsavedChanges) {
    showDiscardDialog = true
}

EditProfileContent(draft = draft, onChange = onChange)`,
      },
    },
  },
} as const;
