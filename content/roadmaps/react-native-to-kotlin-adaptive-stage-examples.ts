export const adaptiveStageExamples = {
  "adaptive-layouts": {
    basic: {
      "react-native": {
        name: "Choose layout from current width",
        summary: "The hook re-renders when the app window changes size.",
        language: "tsx",
        filename: "SettingsScreen.tsx",
        snippet: "adaptive-layouts/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Choose layout from size class",
        summary:
          "Use the available window class for a high-level layout decision.",
        language: "kotlin",
        filename: "SettingsScreen.kt",
        snippet: "adaptive-layouts/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Select one or two panes",
        summary: "Keep selected mail state outside the layout branch.",
        language: "tsx",
        filename: "MailScreen.tsx",
        snippet: "adaptive-layouts/react-native/applied.tsx",
      },
      kotlin: {
        name: "Select one or two panes",
        summary:
          "Pass selection into either layout instead of creating separate owners.",
        language: "kotlin",
        filename: "MailScreen.kt",
        snippet: "adaptive-layouts/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep navigation state across resize",
        summary:
          "The route owns selection while the visible pane arrangement changes.",
        language: "tsx",
        filename: "MailRoute.tsx",
        snippet: "adaptive-layouts/react-native/production.tsx",
      },
      kotlin: {
        name: "Keep navigation state across resize",
        summary:
          "The ViewModel owns selection while the composable changes its pane arrangement.",
        language: "kotlin",
        filename: "MailRoute.kt",
        snippet: "adaptive-layouts/kotlin/production.kt",
      },
    },
  },
} as const;
