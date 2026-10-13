export const offlineStageExamples = {
  "offline-pagination": {
    basic: {
      "react-native": {
        name: "Keep the cursor with cached rows",
        summary:
          "The local cache is updated atomically after one page arrives.",
        language: "typescript",
        filename: "feed-cache.ts",
        snippet: "offline-pagination/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Read pages from Room",
        summary:
          "The Pager's PagingSource is the only source that supplies rows to UI.",
        language: "kotlin",
        filename: "PostDao.kt",
        snippet: "offline-pagination/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Keep append failure separate",
        summary:
          "Visible content remains while only the failed cursor is retried.",
        language: "typescript",
        filename: "feed-state.ts",
        snippet: "offline-pagination/react-native/applied.tsx",
      },
      kotlin: {
        name: "Write RemoteMediator output to Room",
        summary:
          "Network data is persisted before Room invalidates the PagingSource.",
        language: "kotlin",
        filename: "FeedRemoteMediator.kt",
        snippet: "offline-pagination/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Persist the next page key",
        summary:
          "Restarting the app keeps cursor ownership in the local data boundary.",
        language: "typescript",
        filename: "feed-cache.ts",
        snippet: "offline-pagination/react-native/production.tsx",
      },
      kotlin: {
        name: "Persist remote keys transactionally",
        summary: "Keys and rows change together during refresh or append.",
        language: "kotlin",
        filename: "FeedRemoteMediator.kt",
        snippet: "offline-pagination/kotlin/production.kt",
      },
    },
  },
  "offline-first-data": {
    basic: {
      "react-native": {
        name: "Read the cache first",
        summary:
          "Refresh changes the repository cache rather than screen state directly.",
        language: "typescript",
        filename: "feed-repository.ts",
        snippet: "offline-first-data/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Define a Room entity and DAO",
        summary: "A DAO exposes local rows as a Flow.",
        language: "kotlin",
        filename: "PostDao.kt",
        snippet: "offline-first-data/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Synchronize one cache",
        summary:
          "Network data is mapped before becoming observable application data.",
        language: "typescript",
        filename: "feed-repository.ts",
        snippet: "offline-first-data/react-native/applied.tsx",
      },
      kotlin: {
        name: "Refresh Room, observe Room",
        summary: "The repository never exposes the network DTO to the screen.",
        language: "kotlin",
        filename: "OfflineFirstFeedRepository.kt",
        snippet: "offline-first-data/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Make replay explicit",
        summary:
          "A queued mutation has an idempotency key and a visible pending state.",
        language: "typescript",
        filename: "pending-actions.ts",
        snippet: "offline-first-data/react-native/production.tsx",
      },
      kotlin: {
        name: "Separate durable local work",
        summary:
          "A transaction updates local state before observers see a completed refresh.",
        language: "kotlin",
        filename: "OfflineFirstFeedRepository.kt",
        snippet: "offline-first-data/kotlin/production.kt",
      },
    },
  },
} as const;
