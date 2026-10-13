function pair(
  name: string,
  filenames: readonly [string, string],
  snippets: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `TypeScript implementation for ${name.toLowerCase()}.`,
      language: filenames[0].endsWith(".tsx") ? "tsx" : "typescript",
      filename: filenames[0],
      snippet: snippets[0],
    },
    kotlin: {
      name,
      summary: `Kotlin implementation for ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      snippet: snippets[1],
    },
  } as const;
}

export const kotlinBridgeStageExamples = {
  "null-safety": {
    basic: pair(
      "Explicit nullable value",
      ["avatar-url.ts", "AvatarUrl.kt"],
      [
        "null-safety/react-native/learn-basic.tsx",
        "null-safety/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Validate at the boundary",
      ["open-profile.ts", "OpenProfile.kt"],
      ["null-safety/react-native/applied.tsx", "null-safety/kotlin/applied.kt"],
    ),
    production: pair(
      "Normalize a nullable DTO",
      ["user-mapper.ts", "UserMapper.kt"],
      [
        "null-safety/react-native/production.tsx",
        "null-safety/kotlin/production.kt",
      ],
    ),
  },
  "data-classes": {
    basic: pair(
      "Immutable value update",
      ["user.ts", "User.kt"],
      [
        "data-classes/react-native/learn-basic.tsx",
        "data-classes/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Nested state update",
      ["users-reducer.ts", "UsersState.kt"],
      [
        "data-classes/react-native/applied.tsx",
        "data-classes/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Read-only UI model",
      ["profile-ui-model.ts", "ProfileUiModel.kt"],
      [
        "data-classes/react-native/production.tsx",
        "data-classes/kotlin/production.kt",
      ],
    ),
  },
  "sealed-types": {
    basic: pair(
      "Closed UI state",
      ["profile-state.tsx", "ProfileState.kt"],
      [
        "sealed-types/react-native/learn-basic.tsx",
        "sealed-types/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Variant-specific payload",
      ["submit-state.ts", "SubmitState.kt"],
      [
        "sealed-types/react-native/applied.tsx",
        "sealed-types/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Exhaustive state rendering",
      ["submit-content.tsx", "SubmitContent.kt"],
      [
        "sealed-types/react-native/production.tsx",
        "sealed-types/kotlin/production.kt",
      ],
    ),
  },
  "collection-transforms": {
    basic: pair(
      "Filter and project",
      ["active-users.ts", "ActiveUsers.kt"],
      [
        "collection-transforms/react-native/basic.tsx",
        "collection-transforms/kotlin/basic.kt",
      ],
    ),
    applied: pair(
      "Drop invalid entries",
      ["users-by-id.ts", "UsersById.kt"],
      [
        "collection-transforms/react-native/applied.tsx",
        "collection-transforms/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Avoid unnecessary intermediate work",
      ["visible-users.ts", "VisibleUsers.kt"],
      [
        "collection-transforms/react-native/production.tsx",
        "collection-transforms/kotlin/production.kt",
      ],
    ),
  },
  "lambdas-and-receivers": {
    basic: pair(
      "Typed event callback",
      ["UserRow.tsx", "UserRow.kt"],
      [
        "lambdas-and-receivers/react-native/learn-basic.tsx",
        "lambdas-and-receivers/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Builder callback",
      ["request-builder.ts", "RequestBuilder.kt"],
      [
        "lambdas-and-receivers/react-native/applied.tsx",
        "lambdas-and-receivers/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Capability-scoped UI slot",
      ["ActionBar.tsx", "ActionBar.kt"],
      [
        "lambdas-and-receivers/react-native/production.tsx",
        "lambdas-and-receivers/kotlin/production.kt",
      ],
    ),
  },
  "extension-functions": {
    basic: pair(
      "Focused value helper",
      ["display-name.ts", "DisplayName.kt"],
      [
        "extension-functions/react-native/learn-basic.tsx",
        "extension-functions/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Boundary mapping extension",
      ["user-mapper.ts", "UserMapper.kt"],
      [
        "extension-functions/react-native/applied.tsx",
        "extension-functions/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Explicit dependency for effectful work",
      ["load-avatar.ts", "LoadAvatar.kt"],
      [
        "extension-functions/react-native/production.tsx",
        "extension-functions/kotlin/production.kt",
      ],
    ),
  },
  generics: {
    basic: pair(
      "Generic container",
      ["page.ts", "Page.kt"],
      [
        "generics/react-native/learn-basic.tsx",
        "generics/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Constrained identifier",
      ["index-by-id.ts", "IndexById.kt"],
      ["generics/react-native/applied.tsx", "generics/kotlin/applied.kt"],
    ),
    production: pair(
      "Covariant result contract",
      ["app-result.ts", "AppResult.kt"],
      ["generics/react-native/production.tsx", "generics/kotlin/production.kt"],
    ),
  },
} as const;
