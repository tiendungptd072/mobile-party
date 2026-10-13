function pair(
  name: string,
  filenames: readonly [string, string],
  snippets: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `React Native implementation for ${name.toLowerCase()}.`,
      language: "tsx",
      filename: filenames[0],
      snippet: snippets[0],
    },
    kotlin: {
      name,
      summary: `Jetpack Compose implementation for ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      snippet: snippets[1],
    },
  } as const;
}

export const progressiveStageExamples = {
  component: {
    basic: pair(
      "Render a UI function",
      ["Greeting.tsx", "Greeting.kt"],
      [
        "component/react-native/learn-basic.tsx",
        "component/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "State and event contract",
      ["ProfileCard.tsx", "ProfileCard.kt"],
      ["component/react-native/applied.tsx", "component/kotlin/applied.kt"],
    ),
    production: pair(
      "Route and content split",
      ["ProfileRoute.tsx", "ProfileRoute.kt"],
      [
        "component/react-native/production.tsx",
        "component/kotlin/production.kt",
      ],
    ),
  },
  props: {
    basic: pair(
      "Immutable input",
      ["UserName.tsx", "UserName.kt"],
      ["props/react-native/learn-basic.tsx", "props/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Values down, events up",
      ["UserRow.tsx", "UserRow.kt"],
      ["props/react-native/applied.tsx", "props/kotlin/applied.kt"],
    ),
    production: pair(
      "Focused UI contract",
      ["ProfileHeader.tsx", "ProfileHeader.kt"],
      ["props/react-native/production.tsx", "props/kotlin/production.kt"],
    ),
  },
  children: {
    basic: pair(
      "Single content slot",
      ["Card.tsx", "Card.kt"],
      [
        "children/react-native/learn-basic.tsx",
        "children/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Named slots",
      ["Panel.tsx", "Panel.kt"],
      ["children/react-native/applied.tsx", "children/kotlin/applied.kt"],
    ),
    production: pair(
      "Scoped slot API",
      ["FeedList.tsx", "FeedList.kt"],
      ["children/react-native/production.tsx", "children/kotlin/production.kt"],
    ),
  },
  "conditional-ui": {
    basic: pair(
      "Two UI branches",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      [
        "conditional-ui/react-native/learn-basic.tsx",
        "conditional-ui/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Exhaustive screen state",
      ["Screen.tsx", "Screen.kt"],
      [
        "conditional-ui/react-native/applied.tsx",
        "conditional-ui/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Stable state machine",
      ["ui-state.ts", "UiState.kt"],
      [
        "conditional-ui/react-native/production.tsx",
        "conditional-ui/kotlin/production.kt",
      ],
    ),
  },
  layout: {
    basic: pair(
      "Row and column",
      ["ProfileHeader.tsx", "ProfileHeader.kt"],
      ["layout/react-native/learn-basic.tsx", "layout/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Flexible child sizing",
      ["ProfileRow.tsx", "ProfileRow.kt"],
      ["layout/react-native/applied.tsx", "layout/kotlin/applied.kt"],
    ),
    production: pair(
      "Reusable spacing tokens",
      ["profile-styles.ts", "ProfileCard.kt"],
      ["layout/react-native/production.tsx", "layout/kotlin/production.kt"],
    ),
  },
  "vertical-layout": {
    basic: pair(
      "Vertical arrangement",
      ["Summary.tsx", "Summary.kt"],
      [
        "vertical-layout/react-native/learn-basic.tsx",
        "vertical-layout/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Aligned profile summary",
      ["ProfileSummary.tsx", "ProfileSummary.kt"],
      [
        "vertical-layout/react-native/applied.tsx",
        "vertical-layout/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Bounded scrolling content",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      [
        "vertical-layout/react-native/production.tsx",
        "vertical-layout/kotlin/production.kt",
      ],
    ),
  },
  "horizontal-layout": {
    basic: pair(
      "Horizontal arrangement",
      ["LabelRow.tsx", "LabelRow.kt"],
      [
        "horizontal-layout/react-native/learn-basic.tsx",
        "horizontal-layout/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Flexible center content",
      ["UserRow.tsx", "UserRow.kt"],
      [
        "horizontal-layout/react-native/applied.tsx",
        "horizontal-layout/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Constrained action row",
      ["ActionRow.tsx", "ActionRow.kt"],
      [
        "horizontal-layout/react-native/production.tsx",
        "horizontal-layout/kotlin/production.kt",
      ],
    ),
  },
  stack: {
    basic: pair(
      "Layer two children",
      ["PhotoBadge.tsx", "PhotoBadge.kt"],
      ["stack/react-native/learn-basic.tsx", "stack/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Anchored avatar badge",
      ["AvatarBadge.tsx", "AvatarBadge.kt"],
      ["stack/react-native/applied.tsx", "stack/kotlin/applied.kt"],
    ),
    production: pair(
      "Accessible overlay action",
      ["VideoCard.tsx", "VideoCard.kt"],
      ["stack/react-native/production.tsx", "stack/kotlin/production.kt"],
    ),
  },
  list: {
    basic: pair(
      "Lazy list",
      ["UserList.tsx", "UserList.kt"],
      ["list/react-native/learn-basic.tsx", "list/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Stable item identity",
      ["UserList.tsx", "UserList.kt"],
      ["list/react-native/applied.tsx", "list/kotlin/applied.kt"],
    ),
    production: pair(
      "Complete collection states",
      ["FeedScreen.tsx", "FeedScreen.kt"],
      ["list/react-native/production.tsx", "list/kotlin/production.kt"],
    ),
  },
  grid: {
    basic: pair(
      "Fixed grid",
      ["PhotoGrid.tsx", "PhotoGrid.kt"],
      ["grid/react-native/learn-basic.tsx", "grid/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Stable adaptive grid",
      ["PhotoGrid.tsx", "PhotoGrid.kt"],
      ["grid/react-native/applied.tsx", "grid/kotlin/applied.kt"],
    ),
    production: pair(
      "Sized image cells",
      ["PhotoTile.tsx", "PhotoTile.kt"],
      ["grid/react-native/production.tsx", "grid/kotlin/production.kt"],
    ),
  },
  async: {
    basic: pair(
      "Await one operation",
      ["load-user.ts", "UserRepository.kt"],
      ["async/react-native/learn-basic.tsx", "async/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "Cancel superseded work",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      ["async/react-native/applied.tsx", "async/kotlin/applied.kt"],
    ),
    production: pair(
      "Owned asynchronous state",
      ["use-profile.ts", "ProfileViewModel.kt"],
      ["async/react-native/production.tsx", "async/kotlin/production.kt"],
    ),
  },
  "loading-state": {
    basic: pair(
      "Explicit loading branch",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      [
        "loading-state/react-native/learn-basic.tsx",
        "loading-state/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Loading, empty, and content",
      ["ProfilesScreen.tsx", "ProfilesScreen.kt"],
      [
        "loading-state/react-native/applied.tsx",
        "loading-state/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Refresh while preserving content",
      ["FeedScreen.tsx", "FeedScreen.kt"],
      [
        "loading-state/react-native/production.tsx",
        "loading-state/kotlin/production.kt",
      ],
    ),
  },
  "error-handling": {
    basic: pair(
      "Recoverable error",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      [
        "error-handling/react-native/learn-basic.tsx",
        "error-handling/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Map technical failures",
      ["profile-error.ts", "ProfileError.kt"],
      [
        "error-handling/react-native/applied.tsx",
        "error-handling/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Retry without swallowing cancellation",
      ["load-profile.ts", "ProfileRepository.kt"],
      [
        "error-handling/react-native/production.tsx",
        "error-handling/kotlin/production.kt",
      ],
    ),
  },
  "api-request": {
    basic: pair(
      "Typed GET request",
      ["user-api.ts", "UserApi.kt"],
      [
        "api-request/react-native/learn-basic.tsx",
        "api-request/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Repository mapping",
      ["user-repository.ts", "UserRepository.kt"],
      ["api-request/react-native/applied.tsx", "api-request/kotlin/applied.kt"],
    ),
    production: pair(
      "Result boundary",
      ["load-user.ts", "LoadUser.kt"],
      [
        "api-request/react-native/production.tsx",
        "api-request/kotlin/production.kt",
      ],
    ),
  },
  pagination: {
    basic: pair(
      "Load the next page",
      ["use-feed.ts", "FeedViewModel.kt"],
      [
        "pagination/react-native/learn-basic.tsx",
        "pagination/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Separate append state",
      ["FeedScreen.tsx", "FeedScreen.kt"],
      ["pagination/react-native/applied.tsx", "pagination/kotlin/applied.kt"],
    ),
    production: pair(
      "Paging library integration",
      ["use-feed.ts", "FeedScreen.kt"],
      [
        "pagination/react-native/production.tsx",
        "pagination/kotlin/production.kt",
      ],
    ),
  },
  "local-storage": {
    basic: pair(
      "Persist one preference",
      ["theme-storage.ts", "ThemePreferences.kt"],
      [
        "local-storage/react-native/learn-basic.tsx",
        "local-storage/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Typed storage adapter",
      ["theme-storage.ts", "ThemePreferences.kt"],
      [
        "local-storage/react-native/applied.tsx",
        "local-storage/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Versioned persisted data",
      ["settings-storage.ts", "SettingsRepository.kt"],
      [
        "local-storage/react-native/production.tsx",
        "local-storage/kotlin/production.kt",
      ],
    ),
  },
  "secure-storage": {
    basic: pair(
      "Credential store boundary",
      ["credential-store.ts", "CredentialStore.kt"],
      [
        "secure-storage/react-native/learn-basic.tsx",
        "secure-storage/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Platform-backed credential storage",
      ["keychain-store.ts", "KeystoreCredentialStore.kt"],
      [
        "secure-storage/react-native/applied.tsx",
        "secure-storage/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Atomic session cleanup",
      ["sign-out.ts", "SessionRepository.kt"],
      [
        "secure-storage/react-native/production.tsx",
        "secure-storage/kotlin/production.kt",
      ],
    ),
  },
  authentication: {
    basic: pair(
      "Root session gate",
      ["AppGate.tsx", "AppGate.kt"],
      [
        "authentication/react-native/learn-basic.tsx",
        "authentication/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Restore a session",
      ["session.ts", "SessionRepository.kt"],
      [
        "authentication/react-native/applied.tsx",
        "authentication/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Single-flight token refresh",
      ["token-refresh.ts", "TokenRepository.kt"],
      [
        "authentication/react-native/production.tsx",
        "authentication/kotlin/production.kt",
      ],
    ),
  },
  theme: {
    basic: pair(
      "Apply a theme",
      ["AppTheme.tsx", "AppTheme.kt"],
      ["theme/react-native/learn-basic.tsx", "theme/kotlin/learn-basic.kt"],
    ),
    applied: pair(
      "System and user preference",
      ["use-theme.ts", "AppTheme.kt"],
      ["theme/react-native/applied.tsx", "theme/kotlin/applied.kt"],
    ),
    production: pair(
      "Semantic design tokens",
      ["theme.ts", "Color.kt"],
      ["theme/react-native/production.tsx", "theme/kotlin/production.kt"],
    ),
  },
} as const;
