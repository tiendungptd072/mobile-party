import type { ContentReference } from "@/types/concept";
import type { Technology } from "@/types/technology";

const VERIFIED_AT = "2026-09-18";

function officialDocs(
  title: string,
  url: string,
  technology: Technology,
  version?: string,
): ContentReference {
  return {
    title,
    url,
    technology,
    kind: "official-docs",
    verifiedAt: VERIFIED_AT,
    ...(version ? { version } : {}),
  };
}

export const conceptReferences = {
  component: [
    officialDocs(
      "Your First Component",
      "https://react.dev/learn/your-first-component",
      "react-native",
    ),
    officialDocs(
      "Thinking in Compose",
      "https://developer.android.com/develop/ui/compose/mental-model",
      "kotlin",
    ),
  ],
  props: [
    officialDocs(
      "Passing Props to a Component",
      "https://react.dev/learn/passing-props-to-a-component",
      "react-native",
    ),
    officialDocs(
      "Compose API Guidelines",
      "https://developer.android.com/develop/ui/compose/api-guidelines",
      "kotlin",
    ),
  ],
  children: [
    officialDocs(
      "Passing JSX as children",
      "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children",
      "react-native",
    ),
    officialDocs(
      "Compose layout basics",
      "https://developer.android.com/develop/ui/compose/layouts/basics",
      "kotlin",
    ),
  ],
  "conditional-ui": [
    officialDocs(
      "Conditional Rendering",
      "https://react.dev/learn/conditional-rendering",
      "react-native",
    ),
    officialDocs(
      "Thinking in Compose",
      "https://developer.android.com/develop/ui/compose/mental-model",
      "kotlin",
    ),
  ],
  "local-state": [
    officialDocs(
      "useState",
      "https://react.dev/reference/react/useState",
      "react-native",
    ),
    officialDocs(
      "State and Jetpack Compose",
      "https://developer.android.com/develop/ui/compose/state",
      "kotlin",
    ),
  ],
  "derived-state": [
    officialDocs(
      "You Might Not Need an Effect",
      "https://react.dev/learn/you-might-not-need-an-effect",
      "react-native",
    ),
    officialDocs(
      "Side-effects in Compose: derivedStateOf",
      "https://developer.android.com/develop/ui/compose/side-effects#derivedstateof",
      "kotlin",
    ),
  ],
  "global-state": [
    officialDocs(
      "Scaling Up with Reducer and Context",
      "https://react.dev/learn/scaling-up-with-reducer-and-context",
      "react-native",
    ),
    officialDocs(
      "UI layer state holders",
      "https://developer.android.com/topic/architecture/ui-layer/stateholders",
      "kotlin",
    ),
  ],
  layout: [
    officialDocs(
      "Layout with Flexbox",
      "https://reactnative.dev/docs/flexbox",
      "react-native",
    ),
    officialDocs(
      "Compose layout basics",
      "https://developer.android.com/develop/ui/compose/layouts/basics",
      "kotlin",
    ),
  ],
  "vertical-layout": [
    officialDocs(
      "Layout with Flexbox",
      "https://reactnative.dev/docs/flexbox",
      "react-native",
    ),
    officialDocs(
      "Compose layout basics",
      "https://developer.android.com/develop/ui/compose/layouts/basics",
      "kotlin",
    ),
  ],
  "horizontal-layout": [
    officialDocs(
      "Layout with Flexbox",
      "https://reactnative.dev/docs/flexbox",
      "react-native",
    ),
    officialDocs(
      "Compose layout basics",
      "https://developer.android.com/develop/ui/compose/layouts/basics",
      "kotlin",
    ),
  ],
  stack: [
    officialDocs("View", "https://reactnative.dev/docs/view", "react-native"),
    officialDocs(
      "Compose layout basics",
      "https://developer.android.com/develop/ui/compose/layouts/basics",
      "kotlin",
    ),
  ],
  list: [
    officialDocs(
      "FlatList",
      "https://reactnative.dev/docs/flatlist",
      "react-native",
    ),
    officialDocs(
      "Lists and grids in Compose",
      "https://developer.android.com/develop/ui/compose/lists",
      "kotlin",
    ),
  ],
  grid: [
    officialDocs(
      "FlatList",
      "https://reactnative.dev/docs/flatlist",
      "react-native",
    ),
    officialDocs(
      "Lazy grids",
      "https://developer.android.com/develop/ui/compose/lists#lazy-grids",
      "kotlin",
    ),
  ],
  pagination: [
    officialDocs(
      "FlatList",
      "https://reactnative.dev/docs/flatlist",
      "react-native",
    ),
    officialDocs(
      "useInfiniteQuery",
      "https://tanstack.com/query/latest/docs/framework/react/reference/functions/useInfiniteQuery",
      "react-native",
      "TanStack Query v5",
    ),
    officialDocs(
      "Paging 3 overview",
      "https://developer.android.com/topic/libraries/architecture/paging/v3-overview",
      "kotlin",
      "Paging 3",
    ),
  ],
  button: [
    officialDocs(
      "Pressable",
      "https://reactnative.dev/docs/pressable",
      "react-native",
    ),
    officialDocs(
      "Button in Compose",
      "https://developer.android.com/develop/ui/compose/components/button",
      "kotlin",
    ),
  ],
  "text-input": [
    officialDocs(
      "TextInput",
      "https://reactnative.dev/docs/textinput",
      "react-native",
    ),
    officialDocs(
      "User input in Compose text fields",
      "https://developer.android.com/develop/ui/compose/text/user-input",
      "kotlin",
    ),
  ],
  form: [
    officialDocs(
      "Sharing State Between Components",
      "https://react.dev/learn/sharing-state-between-components",
      "react-native",
    ),
    officialDocs(
      "State hoisting in Compose",
      "https://developer.android.com/develop/ui/compose/state#state-hoisting",
      "kotlin",
    ),
  ],
  "side-effects": [
    officialDocs(
      "useEffect",
      "https://react.dev/reference/react/useEffect",
      "react-native",
    ),
    officialDocs(
      "Side-effects in Compose",
      "https://developer.android.com/develop/ui/compose/side-effects",
      "kotlin",
    ),
  ],
  lifecycle: [
    officialDocs(
      "Lifecycle of Reactive Effects",
      "https://react.dev/learn/lifecycle-of-reactive-effects",
      "react-native",
    ),
    officialDocs(
      "Lifecycle of composables",
      "https://developer.android.com/develop/ui/compose/lifecycle",
      "kotlin",
    ),
  ],
  async: [
    officialDocs(
      "Networking in React Native",
      "https://reactnative.dev/docs/network",
      "react-native",
    ),
    officialDocs(
      "Coroutines on Android",
      "https://developer.android.com/kotlin/coroutines",
      "kotlin",
    ),
  ],
  "loading-state": [
    officialDocs(
      "Conditional Rendering",
      "https://react.dev/learn/conditional-rendering",
      "react-native",
    ),
    officialDocs(
      "UI layer",
      "https://developer.android.com/topic/architecture/ui-layer",
      "kotlin",
    ),
  ],
  "error-handling": [
    officialDocs(
      "Error boundaries",
      "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
      "react-native",
    ),
    officialDocs(
      "Coroutine exceptions handling",
      "https://kotlinlang.org/docs/exception-handling.html",
      "kotlin",
    ),
  ],
  navigation: [
    officialDocs(
      "React Navigation: Getting started",
      "https://reactnavigation.org/docs/getting-started",
      "react-native",
    ),
    officialDocs(
      "Navigation with Compose",
      "https://developer.android.com/guide/navigation",
      "kotlin",
    ),
  ],
  "route-parameters": [
    officialDocs(
      "React Navigation: Passing parameters to routes",
      "https://reactnavigation.org/docs/params",
      "react-native",
    ),
    officialDocs(
      "Pass data between destinations",
      "https://developer.android.com/guide/navigation/use-graph/pass-data",
      "kotlin",
    ),
  ],
  "deep-link": [
    officialDocs(
      "Linking",
      "https://reactnative.dev/docs/linking",
      "react-native",
    ),
    officialDocs(
      "Deep links in Navigation Compose",
      "https://developer.android.com/training/app-links/deep-linking",
      "kotlin",
    ),
  ],
  "api-request": [
    officialDocs(
      "Networking in React Native",
      "https://reactnative.dev/docs/network",
      "react-native",
    ),
    officialDocs("Retrofit", "https://square.github.io/retrofit/", "kotlin"),
  ],
  "local-storage": [
    officialDocs(
      "Async Storage API",
      "https://react-native-async-storage.github.io/async-storage/docs/api/",
      "react-native",
    ),
    officialDocs(
      "DataStore",
      "https://developer.android.com/topic/libraries/architecture/datastore",
      "kotlin",
    ),
  ],
  "secure-storage": [
    officialDocs(
      "Security in React Native",
      "https://reactnative.dev/docs/security",
      "react-native",
    ),
    officialDocs(
      "Android Keystore system",
      "https://developer.android.com/privacy-and-security/keystore",
      "kotlin",
    ),
  ],
  authentication: [
    officialDocs(
      "Security in React Native",
      "https://reactnative.dev/docs/security",
      "react-native",
    ),
    officialDocs(
      "Credential Manager",
      "https://developer.android.com/identity/credential-manager",
      "kotlin",
    ),
  ],
  theme: [
    officialDocs(
      "Appearance",
      "https://reactnative.dev/docs/appearance",
      "react-native",
    ),
    officialDocs(
      "Material 3 in Compose",
      "https://developer.android.com/develop/ui/compose/designsystems/material3",
      "kotlin",
    ),
  ],
} as const;

export type ReferencedConceptSlug = keyof typeof conceptReferences;

export function getConceptReferences(
  slug: ReferencedConceptSlug,
): readonly ContentReference[] {
  return conceptReferences[slug];
}
