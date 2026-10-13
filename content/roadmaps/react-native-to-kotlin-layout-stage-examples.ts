export const layoutStageExamples = {
  "layout-constraints": {
    basic: {
      "react-native": {
        name: "Fixed-size preview",
        summary: "Give a preview an explicit logical width and height.",
        language: "tsx",
        filename: "Preview.tsx",
        snippet: "layout-constraints/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Preferred size within constraints",
        summary:
          "Request a size while still respecting the parent's constraints.",
        language: "kotlin",
        filename: "Preview.kt",
        snippet: "layout-constraints/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Stretch inside padding",
        summary: "Stretch the card within a padded parent.",
        language: "tsx",
        filename: "Card.tsx",
        snippet: "layout-constraints/react-native/applied.tsx",
      },
      kotlin: {
        name: "Fill remaining width",
        summary:
          "The inner card receives width bounded by the parent's padding.",
        language: "kotlin",
        filename: "Card.kt",
        snippet: "layout-constraints/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Center bounded content",
        summary:
          "Fill a narrow screen but cap the content width on larger screens.",
        language: "tsx",
        filename: "ProfilePage.tsx",
        snippet: "layout-constraints/react-native/production.tsx",
      },
      kotlin: {
        name: "Constrain before filling",
        summary: "Apply max-width bounds before filling the width they allow.",
        language: "kotlin",
        filename: "ProfilePage.kt",
        snippet: "layout-constraints/kotlin/production.kt",
      },
    },
  },
} as const;
