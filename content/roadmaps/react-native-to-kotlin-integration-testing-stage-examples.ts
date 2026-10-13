export const integrationTestingStageExamples = {
  "navigation-testing": {
    basic: {
      "react-native": {
        name: "Open the destination from an action",
        summary:
          "The test checks what the user sees after pressing the action.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        snippet: "navigation-testing/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Open the destination from a semantic action",
        summary: "The real NavHost renders the destination UI after the click.",
        language: "kotlin",
        filename: "AppNavHostTest.kt",
        snippet: "navigation-testing/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Flush navigation timers",
        summary:
          "Fake timers make the test deterministic when navigation schedules animation work.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        snippet: "navigation-testing/react-native/applied.tsx",
      },
      kotlin: {
        name: "Prove the route ID reaches the screen",
        summary:
          "The destination loads by ID rather than receiving a stale object.",
        language: "kotlin",
        filename: "ProfileRouteTest.kt",
        snippet: "navigation-testing/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Exercise an invalid link state",
        summary: "An unknown profile remains a recoverable visible state.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        snippet: "navigation-testing/react-native/production.tsx",
      },
      kotlin: {
        name: "Exercise a restored destination",
        summary: "A restored route still resolves current authorized data.",
        language: "kotlin",
        filename: "ProfileRouteTest.kt",
        snippet: "navigation-testing/kotlin/production.kt",
      },
    },
  },
  "background-work-testing": {
    basic: {
      "react-native": {
        name: "Test unique scheduling with a fake",
        summary: "Two calls still schedule only one named sync operation.",
        language: "typescript",
        filename: "sync-scheduler.test.ts",
        snippet: "background-work-testing/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Test worker logic directly",
        summary: "A worker returns retry for a controlled transient failure.",
        language: "kotlin",
        filename: "SyncWorkerTest.kt",
        snippet: "background-work-testing/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Classify retryable failures",
        summary:
          "The scheduler sees a retry only for a transient transport failure.",
        language: "typescript",
        filename: "sync-policy.test.ts",
        snippet: "background-work-testing/react-native/applied.tsx",
      },
      kotlin: {
        name: "Classify Worker results",
        summary:
          "The worker maps transient and permanent failures to distinct results.",
        language: "kotlin",
        filename: "SyncWorkerTest.kt",
        snippet: "background-work-testing/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep native integration narrow",
        summary:
          "App tests verify the request contract; one device test proves the native bridge registration.",
        language: "typescript",
        filename: "sync-scheduler.test.ts",
        snippet: "background-work-testing/react-native/production.tsx",
      },
      kotlin: {
        name: "Drive a WorkManager constraint",
        summary: "The test driver releases network work without real waiting.",
        language: "kotlin",
        filename: "SyncWorkManagerTest.kt",
        snippet: "background-work-testing/kotlin/production.kt",
      },
    },
  },
} as const;
