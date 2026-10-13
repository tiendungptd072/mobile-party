export const accessibilityStageExamples = {
  "accessibility-semantics": {
    basic: {
      "react-native": {
        name: "Label an icon-only action",
        summary:
          "The screen reader receives a meaningful action label and role.",
        language: "tsx",
        filename: "DeleteButton.tsx",
        snippet: "accessibility-semantics/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Label an icon-only action",
        summary:
          "A standard IconButton exposes button semantics and the icon supplies its label.",
        language: "kotlin",
        filename: "DeleteButton.kt",
        snippet: "accessibility-semantics/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Expose a selected toggle",
        summary:
          "A custom control tells assistive technology its selected state.",
        language: "tsx",
        filename: "FavoriteButton.tsx",
        snippet: "accessibility-semantics/react-native/applied.tsx",
      },
      kotlin: {
        name: "Expose a checked toggle",
        summary:
          "IconToggleButton provides toggle semantics and checked state.",
        language: "kotlin",
        filename: "FavoriteButton.kt",
        snippet: "accessibility-semantics/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep test selection separate",
        summary:
          "testID is a stable selector, while accessibility props remain user-facing metadata.",
        language: "tsx",
        filename: "SaveButton.tsx",
        snippet: "accessibility-semantics/react-native/production.tsx",
      },
      kotlin: {
        name: "Keep test selection separate",
        summary:
          "testTag selects a node in tests; contentDescription remains user-facing semantics.",
        language: "kotlin",
        filename: "SaveButtonTest.kt",
        snippet: "accessibility-semantics/kotlin/production.kt",
      },
    },
  },
} as const;
