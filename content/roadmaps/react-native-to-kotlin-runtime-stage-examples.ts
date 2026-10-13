function pair(
  name: string,
  filenames: readonly [string, string],
  snippets: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `React Native perspective on ${name.toLowerCase()}.`,
      language: "tsx",
      filename: filenames[0],
      snippet: snippets[0],
    },
    kotlin: {
      name,
      summary: `Compose perspective on ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      snippet: snippets[1],
    },
  } as const;
}

export const composeRuntimeStageExamples = {
  recomposition: {
    basic: pair(
      "UI derived from state",
      ["Counter.tsx", "Counter.kt"],
      ["recomposition/react-native/basic.tsx", "recomposition/kotlin/basic.kt"],
    ),
    applied: pair(
      "Read only the state needed",
      ["Cart.tsx", "Cart.kt"],
      [
        "recomposition/react-native/applied.tsx",
        "recomposition/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Keep rendering pure",
      ["ProfileRoute.tsx", "ProfileRoute.kt"],
      [
        "recomposition/react-native/production.tsx",
        "recomposition/kotlin/production.kt",
      ],
    ),
  },
  "snapshot-state": {
    basic: pair(
      "Update an observable count",
      ["Tags.tsx", "Tags.kt"],
      [
        "snapshot-state/react-native/basic.tsx",
        "snapshot-state/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Edit a visible collection",
      ["Tags.tsx", "Tags.kt"],
      [
        "snapshot-state/react-native/applied.tsx",
        "snapshot-state/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Keep mutation with the owner",
      ["TagScreen.tsx", "TagScreen.kt"],
      [
        "snapshot-state/react-native/production.tsx",
        "snapshot-state/kotlin/production.kt",
      ],
    ),
  },
  "ui-identity": {
    basic: pair(
      "Stable row identity",
      ["Feed.tsx", "Feed.kt"],
      [
        "ui-identity/react-native/basic.tsx",
        "ui-identity/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Preserve a row draft when sorting",
      ["SortedFeed.tsx", "SortedFeed.kt"],
      ["ui-identity/react-native/applied.tsx", "ui-identity/kotlin/applied.kt"],
    ),
    production: pair(
      "Reset draft when its owner changes",
      ["Editor.tsx", "Editor.kt"],
      [
        "ui-identity/react-native/production.tsx",
        "ui-identity/kotlin/production.kt",
      ],
    ),
  },
  "state-restoration": {
    basic: pair(
      "Composition-local draft",
      ["SearchDraft.tsx", "SearchDraft.kt"],
      [
        "state-restoration/react-native/basic.tsx",
        "state-restoration/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Explicit restoration boundary",
      ["SearchDraft.tsx", "SearchDraft.kt"],
      [
        "state-restoration/react-native/applied.tsx",
        "state-restoration/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Restore an ID then reload data",
      ["ProfileRoute.tsx", "ProfileViewModel.kt"],
      [
        "state-restoration/react-native/production.tsx",
        "state-restoration/kotlin/production.kt",
      ],
    ),
  },
  "stability-and-skipping": {
    basic: pair(
      "Avoid unnecessary row work",
      ["UserRow.tsx", "UserRow.kt"],
      [
        "stability-and-skipping/react-native/learn-basic.tsx",
        "stability-and-skipping/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Pass narrow stable values",
      ["Users.tsx", "Users.kt"],
      [
        "stability-and-skipping/react-native/applied.tsx",
        "stability-and-skipping/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Keep correctness independent of memoization",
      ["UserRow.tsx", "UserRow.kt"],
      [
        "stability-and-skipping/react-native/production.tsx",
        "stability-and-skipping/kotlin/production.kt",
      ],
    ),
  },
  "modifier-order": {
    basic: pair(
      "Paint padded surface",
      ["Card.tsx", "Card.kt"],
      [
        "modifier-order/react-native/basic.tsx",
        "modifier-order/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Keep outer spacing unpainted",
      ["InsetCard.tsx", "InsetCard.kt"],
      [
        "modifier-order/react-native/applied.tsx",
        "modifier-order/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Include padding in touch bounds",
      ["OpenProfile.tsx", "OpenProfile.kt"],
      [
        "modifier-order/react-native/production.tsx",
        "modifier-order/kotlin/production.kt",
      ],
    ),
  },
  "composition-local": {
    basic: pair(
      "Provide a spacing token",
      ["Spacing.tsx", "Spacing.kt"],
      [
        "composition-local/react-native/learn-basic.tsx",
        "composition-local/kotlin/learn-basic.kt",
      ],
    ),
    applied: pair(
      "Override one branch",
      ["Spacing.tsx", "Spacing.kt"],
      [
        "composition-local/react-native/applied.tsx",
        "composition-local/kotlin/applied.kt",
      ],
    ),
    production: pair(
      "Keep screen state explicit",
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
      [
        "composition-local/react-native/production.tsx",
        "composition-local/kotlin/production.kt",
      ],
    ),
  },
} as const;
