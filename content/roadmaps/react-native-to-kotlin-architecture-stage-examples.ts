export const architectureStageExamples = {
  "refresh-bookmark-races": {
    basic: {
      "react-native": {
        name: "Separate remote fields from local intent",
        summary:
          "A refresh can replace posts without replacing bookmark choices.",
        language: "tsx",
        filename: "feed-state.ts",
        snippet: "refresh-bookmark-races/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Separate remote fields from local intent",
        summary: "Fetched posts and local bookmark IDs remain separate values.",
        language: "kotlin",
        filename: "FeedState.kt",
        snippet: "refresh-bookmark-races/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Reduce events from current state",
        summary:
          "The completed refresh changes posts; a bookmark tap changes only local intent.",
        language: "tsx",
        filename: "feed-reducer.ts",
        snippet: "refresh-bookmark-races/react-native/applied.tsx",
      },
      kotlin: {
        name: "Reduce events from current state",
        summary:
          "StateFlow.update preserves whichever field the other event last changed.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        snippet: "refresh-bookmark-races/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Finish refresh after the bookmark tap",
        summary:
          "A controlled promise proves a late network response cannot clear local intent.",
        language: "tsx",
        filename: "feed-reducer.test.ts",
        snippet: "refresh-bookmark-races/react-native/production.tsx",
      },
      kotlin: {
        name: "Finish refresh after the bookmark tap",
        summary:
          "A controlled deferred response proves the same event order in a coroutine test.",
        language: "kotlin",
        filename: "FeedReducerTest.kt",
        snippet: "refresh-bookmark-races/kotlin/production.kt",
      },
    },
  },
  "repository-boundary": {
    basic: {
      "react-native": {
        name: "Hide the HTTP client",
        summary: "The hook asks for profile data through a narrow contract.",
        language: "tsx",
        filename: "use-profile.ts",
        snippet: "repository-boundary/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Hide the data source",
        summary: "The ViewModel requests domain data through a repository.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        snippet: "repository-boundary/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Map a DTO once",
        summary:
          "The repository prevents API field names from leaking into UI state.",
        language: "typescript",
        filename: "profile-repository.ts",
        snippet: "repository-boundary/react-native/applied.tsx",
      },
      kotlin: {
        name: "Map a DTO once",
        summary:
          "The repository converts network data before returning it upward.",
        language: "kotlin",
        filename: "OfflineFirstProfileRepository.kt",
        snippet: "repository-boundary/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Test a state owner with a fake",
        summary: "The fake is deterministic and does not need network mocking.",
        language: "typescript",
        filename: "fake-profile-repository.ts",
        snippet: "repository-boundary/react-native/production.tsx",
      },
      kotlin: {
        name: "Test a ViewModel with a fake",
        summary: "The fake makes data-layer behavior controlled and explicit.",
        language: "kotlin",
        filename: "FakeProfileRepository.kt",
        snippet: "repository-boundary/kotlin/production.kt",
      },
    },
  },
  "feature-module-boundaries": {
    basic: {
      "react-native": {
        name: "Publish a package contract",
        summary: "The feature and data packages share only a narrow API.",
        language: "tsx",
        filename: "packages/profile-contract/src/index.ts",
        snippet: "feature-module-boundaries/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Publish an API module contract",
        summary: "The feature and data modules share one interface.",
        language: "kotlin",
        filename: "core/profile-api/src/main/kotlin/ProfileReader.kt",
        snippet: "feature-module-boundaries/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Depend on the package contract",
        summary:
          "The feature accepts a reader without importing the HTTP implementation.",
        language: "tsx",
        filename: "packages/profile-feature/src/ProfileRoute.tsx",
        snippet: "feature-module-boundaries/react-native/applied.tsx",
      },
      kotlin: {
        name: "Depend on the API module",
        summary: "The feature ViewModel accepts a contract, not a Room DAO.",
        language: "kotlin",
        filename: "feature/profile/src/main/kotlin/ProfileViewModel.kt",
        snippet: "feature-module-boundaries/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Assemble packages at the app root",
        summary:
          "The app chooses the concrete reader; the feature stays independent.",
        language: "tsx",
        filename: "apps/mobile/ProfileEntry.tsx",
        snippet: "feature-module-boundaries/react-native/production.tsx",
      },
      kotlin: {
        name: "Assemble modules at the app boundary",
        summary:
          "The app supplies the data implementation to the feature ViewModel.",
        language: "kotlin",
        filename: "app/src/main/kotlin/ProfileEntry.kt",
        snippet: "feature-module-boundaries/kotlin/production.kt",
      },
    },
  },
  "dependency-injection": {
    basic: {
      "react-native": {
        name: "Wire a dependency at the route",
        summary:
          "The route receives a repository instead of constructing it in a leaf.",
        language: "tsx",
        filename: "ProfileRoute.tsx",
        snippet: "dependency-injection/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Use constructor injection",
        summary: "The ViewModel declares the dependency it needs.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        snippet: "dependency-injection/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Replace a dependency in a test",
        summary:
          "The route can receive a fake contract without module mocking.",
        language: "tsx",
        filename: "ProfileRoute.test.tsx",
        snippet: "dependency-injection/react-native/applied.tsx",
      },
      kotlin: {
        name: "Provide a Hilt binding",
        summary:
          "Hilt constructs the repository implementation for injected consumers.",
        language: "kotlin",
        filename: "RepositoryModule.kt",
        snippet: "dependency-injection/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Keep scopes explicit",
        summary:
          "One app client is shared; screen-specific state stays in the route.",
        language: "tsx",
        filename: "AppDependencies.ts",
        snippet: "dependency-injection/react-native/production.tsx",
      },
      kotlin: {
        name: "Inject a Hilt ViewModel",
        summary: "Hilt creates a screen ViewModel with its constructor graph.",
        language: "kotlin",
        filename: "ProfileRoute.kt",
        snippet: "dependency-injection/kotlin/production.kt",
      },
    },
  },
} as const;
