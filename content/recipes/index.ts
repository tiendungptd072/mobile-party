export const rawRecipes = [
  {
    slug: "api-request",
    title: "API Request",
    description: "Load remote data with explicit loading and error states.",
    category: "networking",
    keywords: ["fetch", "HTTP", "loading", "error state"],
    flow: ["Start request", "Show loading", "Handle response", "Render result"],
    implementations: {
      "react-native": {
        summary: "Forward the owner's AbortSignal and ignore canceled results.",
        language: "tsx",
        filename: "useProfile.ts",
      },
      kotlin: {
        summary: "Launch work from a ViewModel and expose immutable UI state.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
      },
    },
    architectureNotes: [
      "Keep transport details behind a repository boundary.",
      "Model loading, success, and failure explicitly; preserve coroutine cancellation and show safe user-facing error text.",
      "The owning React effect passes its controller's signal and aborts on cleanup. viewModelScope cancels when its ViewModel is cleared, not on every recomposition or configuration change.",
    ],
  },
  {
    slug: "refresh-token",
    title: "Refresh Token",
    description:
      "Retry an authenticated request after renewing an expired access token.",
    category: "authentication",
    keywords: ["authentication", "401", "access token", "retry"],
    flow: ["Send request", "Receive 401", "Refresh token", "Retry once"],
    implementations: {
      "react-native": {
        summary:
          "Share one refresh across concurrent GET requests and reuse a token already renewed by another request.",
        language: "tsx",
        filename: "authenticatedFetch.ts",
      },
      kotlin: {
        summary:
          "Serialize refresh in one session authenticator, recheck the token under the lock, and retry GET once.",
        language: "kotlin",
        filename: "TokenAuthenticator.kt",
      },
    },
    architectureNotes: [
      "Share one instance per signed-in session. Concurrent 401s share a Promise in React Native or a lock in Kotlin; a late 401 reuses the token already refreshed by another request.",
      "Retry GET at most once. If refresh fails or returns an empty or unchanged token, clear this session's token, notify sign-out once, and return the original 401. Create a new instance for a new session.",
      "The refresh callback uses a separate client without this retry policy, throws on HTTP or transport failure, and returns a fresh access token. OkHttp's authenticator is synchronous: use a blocking refresh call off the main thread with bounded timeouts.",
      "These examples retry GET only. Replaying writes requires an explicit idempotency policy and a replayable request body; the sign-out callback clears stored credentials and publishes thread-safe session state for the UI.",
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Append the next page while keeping existing results stable.",
    category: "lists",
    keywords: ["infinite scroll", "cursor", "load more", "list"],
    flow: ["Render items", "Reach end", "Load next cursor", "Append page"],
    implementations: {
      "react-native": {
        summary: "Guard cursor requests and recover from an append failure.",
        language: "tsx",
        filename: "Feed.tsx",
      },
      kotlin: {
        summary: "Let Paging compose list state and append loading UI.",
        language: "kotlin",
        filename: "FeedScreen.kt",
      },
    },
    architectureNotes: [
      "Use stable cursors rather than changing offsets.",
      "Guard duplicate append requests and keep existing rows visible when append fails so users can retry.",
    ],
  },
  {
    slug: "secure-storage",
    title: "Secure Storage",
    description:
      "Persist sensitive credentials using platform-backed encrypted storage.",
    category: "storage",
    keywords: ["keychain", "keystore", "credentials", "encryption"],
    flow: [
      "Receive credential",
      "Encrypt at rest",
      "Read when needed",
      "Clear on sign-out",
    ],
    implementations: {
      "react-native": {
        summary: "Use a secure-storage adapter rather than AsyncStorage.",
        language: "tsx",
        filename: "credentialStore.ts",
      },
      kotlin: {
        summary:
          "Hide Keystore-backed encryption behind a credential-store interface.",
        language: "kotlin",
        filename: "CredentialStore.kt",
      },
    },
    architectureNotes: [
      "Do not store credentials in ordinary preferences.",
      "Clear credentials from one sign-out boundary.",
    ],
  },
  {
    slug: "biometric-login",
    title: "Biometric Login",
    description: "Gate a locally stored credential with a biometric prompt.",
    category: "authentication",
    keywords: ["Face ID", "fingerprint", "BiometricPrompt", "sign in"],
    flow: [
      "Request biometric check",
      "Verify user",
      "Read credential",
      "Resume session",
    ],
    implementations: {
      "react-native": {
        summary: "Keep biometric prompting separate from session restoration.",
        language: "tsx",
        filename: "resumeSession.ts",
      },
      kotlin: {
        summary: "Continue only from BiometricPrompt's success callback.",
        language: "kotlin",
        filename: "SessionGate.kt",
      },
    },
    architectureNotes: [
      "Biometrics verify local presence, not server identity.",
      "Provide a recovery path for cancellation or unavailable hardware.",
    ],
  },
  {
    slug: "deep-links",
    title: "Deep Links",
    description: "Route an incoming URL to the correct in-app destination.",
    category: "navigation",
    keywords: ["universal links", "app links", "URL", "navigation"],
    flow: ["Receive URL", "Parse route", "Validate data", "Navigate safely"],
    implementations: {
      "react-native": {
        summary:
          "Map URL patterns to navigation screens through one configuration.",
        language: "tsx",
        filename: "linking.ts",
      },
      kotlin: {
        summary: "Declare the URI pattern beside the Navigation Compose route.",
        language: "kotlin",
        filename: "ProfileDestination.kt",
      },
    },
    architectureNotes: [
      "Validate path parameters before loading data.",
      "Keep external and in-app route definitions aligned.",
      "Register supported schemes and hosts in the Android manifest; declare and verify HTTPS App Links separately.",
    ],
  },
] as const;
