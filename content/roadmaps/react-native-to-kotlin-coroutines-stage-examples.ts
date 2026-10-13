export const coroutinesStageExamples = {
  "coroutine-scopes": {
    basic: {
      "react-native": {
        name: "Own a request in an effect",
        summary:
          "Cleanup aborts work and stale results cannot update the screen.",
        language: "tsx",
        filename: "use-user.ts",
        snippet: "coroutine-scopes/react-native/basic.tsx",
      },
      kotlin: {
        name: "Own a request in composition",
        summary:
          "LaunchedEffect cancels its child Job when the key or UI lifetime changes.",
        language: "kotlin",
        filename: "UserRoute.kt",
        snippet: "coroutine-scopes/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Cancel a superseded search",
        summary:
          "A new query aborts the previous request and ignores its late result.",
        language: "tsx",
        filename: "use-search.ts",
        snippet: "coroutine-scopes/react-native/applied.tsx",
      },
      kotlin: {
        name: "Cancel work when the query changes",
        summary:
          "The previous LaunchedEffect child is canceled before new keyed work.",
        language: "kotlin",
        filename: "SearchRoute.kt",
        snippet: "coroutine-scopes/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep latest request ownership in a hook",
        summary:
          "The hook aborts old work and cleans up when its screen leaves.",
        language: "tsx",
        filename: "use-profile.ts",
        snippet: "coroutine-scopes/react-native/production.tsx",
      },
      kotlin: {
        name: "Keep request ownership in a ViewModel",
        summary:
          "A ViewModel Job cancels old work and preserves cancellation semantics.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        snippet: "coroutine-scopes/kotlin/production.kt",
      },
    },
  },
  "flow-and-stateflow": {
    basic: {
      "react-native": {
        name: "Produce a lazy page sequence",
        summary:
          "Calling the async generator starts a fresh sequence for each consumer.",
        language: "typescript",
        filename: "pages.ts",
        snippet: "flow-and-stateflow/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Collect a cold Flow",
        summary: "The flow block executes anew for each collector.",
        language: "kotlin",
        filename: "Pages.kt",
        snippet: "flow-and-stateflow/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Read current store state",
        summary:
          "A store supplies an immutable snapshot and unsubscribe contract.",
        language: "tsx",
        filename: "FeedRoute.tsx",
        snippet: "flow-and-stateflow/react-native/applied.tsx",
      },
      kotlin: {
        name: "Read current StateFlow value",
        summary: "The collection follows the screen LifecycleOwner.",
        language: "kotlin",
        filename: "FeedRoute.kt",
        snippet: "flow-and-stateflow/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Share one upstream subscription",
        summary:
          "The app store starts on first subscriber and stops on last cleanup.",
        language: "typescript",
        filename: "feed-store.ts",
        snippet: "flow-and-stateflow/react-native/production.tsx",
      },
      kotlin: {
        name: "Share one upstream Flow as screen state",
        summary:
          "stateIn owns an initial value and a subscription-aware sharing policy.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        snippet: "flow-and-stateflow/kotlin/production.kt",
      },
    },
  },
} as const;
