export const backNavigationConcept = {
  id: "back-navigation",
  slug: "back-navigation",
  title: "System Back and Unsaved Changes",
  description:
    "Handle Android back navigation deliberately while letting the navigation stack remain the default owner of ordinary back behavior.",
  category: "navigation",
  order: 45.1,
  aliases: [
    "BackHandler",
    "hardwareBackPress",
    "popBackStack",
    "unsaved changes",
  ],
  keywords: ["back", "navigation", "discard", "confirmation", "Android"],
  implementations: {
    "react-native": {
      name: "Intercept a hardware back press",
      summary:
        "A focused listener consumes back only when the screen has custom behavior.",
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
      name: "Enable a Compose back handler",
      summary:
        "BackHandler consumes system back only while unsaved changes need confirmation.",
      language: "kotlin",
      filename: "EditProfileScreen.kt",
      code: `BackHandler(enabled = hasUnsavedChanges) {
    showDiscardDialog = true
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can intercept Android system back for a focused custom flow, but Compose BackHandler is composition- and lifecycle-aware while ordinary Navigation Compose back should use the navigation stack by default.",
    },
  ],
  mentalModel:
    "Let navigation pop the back stack unless the current screen has a concrete temporary state to resolve, such as a discard confirmation or WebView history. Call BackHandler unconditionally and control it with enabled state.",
  differences: [
    "React Native BackHandler listeners run in reverse registration order; the innermost enabled Compose BackHandler handles the event.",
    "BackHandler is for custom interception, not a replacement for NavController.popBackStack() in normal destination navigation.",
  ],
  commonMistakes: [
    "Installing an always-enabled back handler that blocks navigation or conditionally composing BackHandler and changing handler precedence after recomposition.",
  ],
  productionNotes: [
    "Test system button and gesture back, dialogs, nested handlers, and predictive-back behavior on supported Android versions; preserve draft state until the user explicitly discards it.",
  ],
} as const;
