export const flowTestingStageExamples = {
  "flow-composition": {
    basic: {
      "react-native": {
        name: "Derive saved posts from snapshots",
        summary: "Filtering is a pure calculation over current store values.",
        language: "tsx",
        filename: "SavedFeed.tsx",
        snippet: "flow-composition/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Combine local streams",
        summary:
          "Either DAO update recalculates the visible list after both have emitted.",
        language: "kotlin",
        filename: "SavedFeedRepository.kt",
        snippet: "flow-composition/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Classify a refresh failure",
        summary:
          "A failed refresh becomes an explicit state while the cached list remains readable.",
        language: "typescript",
        filename: "feed-repository.ts",
        snippet: "flow-composition/react-native/applied.tsx",
      },
      kotlin: {
        name: "Choose an upstream error policy",
        summary:
          "Transient I/O gets bounded retries; the final error is represented in state.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        snippet: "flow-composition/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Test both source updates",
        summary:
          "A pure selector test covers posts and favorite IDs without a UI renderer.",
        language: "typescript",
        filename: "saved-feed.test.ts",
        snippet: "flow-composition/react-native/production.tsx",
      },
      kotlin: {
        name: "Test combined emissions",
        summary:
          "Controlled StateFlows show that either source can change the result.",
        language: "kotlin",
        filename: "SavedFeedRepositoryTest.kt",
        snippet: "flow-composition/kotlin/production.kt",
      },
    },
  },
  "state-owner-testing": {
    basic: {
      "react-native": {
        name: "Assert a visible state transition",
        summary:
          "Test the result of loading a post, not a private setter call.",
        language: "tsx",
        filename: "use-feed.test.tsx",
        snippet: "state-owner-testing/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Assert a ViewModel state transition",
        summary: "A fake supplies one known result.",
        language: "kotlin",
        filename: "FeedViewModelTest.kt",
        snippet: "state-owner-testing/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Control a later emission",
        summary: "The fake emits a new list after the initial render.",
        language: "tsx",
        filename: "use-feed.test.tsx",
        snippet: "state-owner-testing/react-native/applied.tsx",
      },
      kotlin: {
        name: "Keep a subscriber active",
        summary:
          "WhileSubscribed state starts collecting only with a subscriber.",
        language: "kotlin",
        filename: "FeedViewModelTest.kt",
        snippet: "state-owner-testing/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep storage tests separate",
        summary:
          "A fake proves state transitions; a storage test proves persistence.",
        language: "typescript",
        filename: "feed-cache.test.ts",
        snippet: "state-owner-testing/react-native/production.tsx",
      },
      kotlin: {
        name: "Test Room with a real DAO",
        summary:
          "The integration test verifies a query that a fake cannot check.",
        language: "kotlin",
        filename: "PostDaoTest.kt",
        snippet: "state-owner-testing/kotlin/production.kt",
      },
    },
  },
} as const;
