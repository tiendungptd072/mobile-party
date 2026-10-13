export const animationStageExamples = {
  "state-driven-animation": {
    basic: {
      "react-native": {
        name: "Animate a favorite scale",
        summary:
          "A retained Animated.Value springs to the target for current state.",
        language: "tsx",
        filename: "FavoriteButton.tsx",
        snippet: "state-driven-animation/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Animate a favorite scale",
        summary: "The animated scale is derived from current favorite state.",
        language: "kotlin",
        filename: "FavoriteButton.kt",
        snippet: "state-driven-animation/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Animate a visible panel",
        summary: "The same explicit opacity value controls panel presence.",
        language: "tsx",
        filename: "Filters.tsx",
        snippet: "state-driven-animation/react-native/applied.tsx",
      },
      kotlin: {
        name: "Animate a visible panel",
        summary:
          "AnimatedVisibility manages entry and exit from the composed UI tree.",
        language: "kotlin",
        filename: "Filters.kt",
        snippet: "state-driven-animation/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Coordinate related visual targets",
        summary:
          "A shared expanded state drives the values that form one visual transition.",
        language: "tsx",
        filename: "ArticleCard.tsx",
        snippet: "state-driven-animation/react-native/production.tsx",
      },
      kotlin: {
        name: "Coordinate related visual targets",
        summary:
          "A transition keeps related animated properties tied to one expanded state.",
        language: "kotlin",
        filename: "ArticleCard.kt",
        snippet: "state-driven-animation/kotlin/production.kt",
      },
    },
  },
} as const;
