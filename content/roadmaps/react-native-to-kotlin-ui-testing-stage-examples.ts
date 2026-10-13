export const uiTestingStageExamples = {
  "ui-behavior-testing": {
    basic: {
      "react-native": {
        name: "Press and assert visible text",
        summary: "The test uses a visible button label and visible result.",
        language: "tsx",
        filename: "Counter.test.tsx",
        snippet: "ui-behavior-testing/react-native/basic.tsx",
      },
      kotlin: {
        name: "Click and assert semantic text",
        summary: "The test performs a user action against a semantic node.",
        language: "kotlin",
        filename: "CounterTest.kt",
        snippet: "ui-behavior-testing/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Test a reusable screen contract",
        summary:
          "Plain state and callbacks make a screen behavior test focused.",
        language: "tsx",
        filename: "ProfileScreen.test.tsx",
        snippet: "ui-behavior-testing/react-native/applied.tsx",
      },
      kotlin: {
        name: "Test a reusable screen contract",
        summary:
          "Plain state and callbacks keep the screen content test focused.",
        language: "kotlin",
        filename: "ProfileScreenTest.kt",
        snippet: "ui-behavior-testing/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Control an asynchronous save",
        summary:
          "A controlled promise verifies pending and completed UI states without depending on timers.",
        language: "tsx",
        filename: "ProfileScreen.test.tsx",
        snippet: "ui-behavior-testing/react-native/production.tsx",
      },
      kotlin: {
        name: "Control an asynchronous save",
        summary:
          "A deferred result verifies pending and completed semantics without sleeping.",
        language: "kotlin",
        filename: "ProfileScreenTest.kt",
        snippet: "ui-behavior-testing/kotlin/production.kt",
      },
    },
  },
} as const;
