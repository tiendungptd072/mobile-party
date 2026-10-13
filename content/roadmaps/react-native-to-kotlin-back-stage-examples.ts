export const backNavigationStageExamples = {
  "back-navigation": {
    basic: {
      "react-native": {
        name: "Allow default back when no draft exists",
        summary: "The listener consumes back only when there is unsaved work.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        snippet: "back-navigation/react-native/basic.tsx",
      },
      kotlin: {
        name: "Enable only for an unsaved draft",
        summary:
          "The navigation stack handles back unless the handler is enabled.",
        language: "kotlin",
        filename: "EditProfileScreen.kt",
        snippet: "back-navigation/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Confirm before discard",
        summary:
          "The dialog decides whether to continue the normal navigation action.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        snippet: "back-navigation/react-native/applied.tsx",
      },
      kotlin: {
        name: "Confirm before discard",
        summary:
          "The route owns popping the back stack after the user confirms.",
        language: "kotlin",
        filename: "EditProfileRoute.kt",
        snippet: "back-navigation/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep ordinary navigation unblocked",
        summary: "The screen hook exists only for the temporary draft state.",
        language: "tsx",
        filename: "EditProfileScreen.tsx",
        snippet: "back-navigation/react-native/production.tsx",
      },
      kotlin: {
        name: "Keep handler composition stable",
        summary:
          "Call BackHandler consistently and toggle only its enabled state.",
        language: "kotlin",
        filename: "EditProfileScreen.kt",
        snippet: "back-navigation/kotlin/production.kt",
      },
    },
  },
} as const;
