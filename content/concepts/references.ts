import type { ContentReference } from "@/types/concept";
import type { Technology } from "@/types/technology";

const VERIFIED_AT = "2026-09-18";
const BRIDGE_VERIFIED_AT = "2026-09-19";

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

function bridgeDocs(
  title: string,
  url: string,
  technology: Technology,
): ContentReference {
  return {
    ...officialDocs(title, url, technology),
    verifiedAt: BRIDGE_VERIFIED_AT,
  };
}

export const conceptReferences = {
  "navigation-testing": [
    bridgeDocs(
      "Testing with React Navigation",
      "https://reactnavigation.org/docs/testing/",
      "react-native",
    ),
    bridgeDocs(
      "Navigation testing",
      "https://developer.android.com/guide/navigation/testing",
      "kotlin",
    ),
    bridgeDocs(
      "Test your app's UI",
      "https://developer.android.com/develop/ui/compose/testing",
      "kotlin",
    ),
  ],
  "background-work-testing": [
    bridgeDocs(
      "Headless JS",
      "https://reactnative.dev/docs/headless-js-android",
      "react-native",
    ),
    bridgeDocs(
      "Test persistent work",
      "https://developer.android.com/develop/background-work/background-tasks/testing/persistent/integration-testing",
      "kotlin",
    ),
    bridgeDocs(
      "WorkManager testing APIs",
      "https://developer.android.com/reference/androidx/work/testing/package-summary",
      "kotlin",
    ),
  ],
  "flow-composition": [
    bridgeDocs(
      "useSyncExternalStore",
      "https://react.dev/reference/react/useSyncExternalStore",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin flows on Android",
      "https://developer.android.com/kotlin/flow",
      "kotlin",
    ),
    bridgeDocs(
      "Testing Kotlin flows",
      "https://developer.android.com/kotlin/flow/test",
      "kotlin",
    ),
  ],
  "state-owner-testing": [
    bridgeDocs(
      "React Native testing overview",
      "https://reactnative.dev/docs/testing-overview",
      "react-native",
    ),
    bridgeDocs(
      "React Native Testing Library renderHook",
      "https://oss.callstack.com/react-native-testing-library/docs/api/misc/render-hook",
      "react-native",
    ),
    bridgeDocs(
      "Testing Kotlin coroutines",
      "https://developer.android.com/kotlin/coroutines/test",
      "kotlin",
    ),
    bridgeDocs(
      "Test and debug Room",
      "https://developer.android.com/training/data-storage/room/testing-db",
      "kotlin",
    ),
  ],
  "durable-background-work": [
    bridgeDocs(
      "Headless JS",
      "https://reactnative.dev/docs/headless-js-android",
      "react-native",
    ),
    bridgeDocs(
      "Getting started with WorkManager",
      "https://developer.android.com/develop/background-work/background-tasks/persistent/getting-started",
      "kotlin",
    ),
    bridgeDocs(
      "Managing work",
      "https://developer.android.com/develop/background-work/background-tasks/persistent/how-to/manage-work",
      "kotlin",
    ),
  ],
  "android-notifications": [
    bridgeDocs(
      "Turbo Native Modules",
      "https://reactnative.dev/docs/turbo-native-modules-introduction",
      "react-native",
    ),
    bridgeDocs(
      "Create a notification",
      "https://developer.android.com/develop/ui/compose/notifications/create-notification",
      "kotlin",
    ),
    bridgeDocs(
      "Notification runtime permission",
      "https://developer.android.com/develop/ui/compose/notifications/notification-permission",
      "kotlin",
    ),
  ],
  "offline-pagination": [
    bridgeDocs(
      "React Context",
      "https://react.dev/learn/passing-data-deeply-with-context",
      "react-native",
    ),
    bridgeDocs(
      "Page from network and database",
      "https://developer.android.com/topic/libraries/architecture/paging/v3-network-db",
      "kotlin",
    ),
    bridgeDocs(
      "Paging library overview",
      "https://developer.android.com/topic/libraries/architecture/paging/v3-overview",
      "kotlin",
    ),
  ],
  "offline-first-data": [
    bridgeDocs(
      "React Context",
      "https://react.dev/learn/passing-data-deeply-with-context",
      "react-native",
    ),
    bridgeDocs(
      "Build an offline-first app",
      "https://developer.android.com/topic/architecture/data-layer/offline-first",
      "kotlin",
    ),
    bridgeDocs(
      "Save data with Room",
      "https://developer.android.com/training/data-storage/room",
      "kotlin",
    ),
  ],
  "repository-boundary": [
    bridgeDocs(
      "React Context",
      "https://react.dev/learn/passing-data-deeply-with-context",
      "react-native",
    ),
    bridgeDocs(
      "Recommendations for Android architecture",
      "https://developer.android.com/topic/architecture/recommendations",
      "kotlin",
    ),
    bridgeDocs(
      "Guide to app architecture",
      "https://developer.android.com/topic/architecture",
      "kotlin",
    ),
  ],
  "dependency-injection": [
    bridgeDocs(
      "React Context",
      "https://react.dev/learn/passing-data-deeply-with-context",
      "react-native",
    ),
    bridgeDocs(
      "Dependency injection with Hilt",
      "https://developer.android.com/training/dependency-injection/hilt-android",
      "kotlin",
    ),
    bridgeDocs(
      "Recommendations for Android architecture",
      "https://developer.android.com/topic/architecture/recommendations",
      "kotlin",
    ),
  ],
  "coroutine-scopes": [
    bridgeDocs(
      "React Native Networking",
      "https://reactnative.dev/docs/network",
      "react-native",
    ),
    bridgeDocs(
      "Best practices for coroutines in Android",
      "https://developer.android.com/kotlin/coroutines/coroutines-best-practices",
      "kotlin",
    ),
    bridgeDocs(
      "Coroutines basics and structured concurrency",
      "https://kotlinlang.org/docs/coroutines-basics.html",
      "kotlin",
    ),
  ],
  "flow-and-stateflow": [
    bridgeDocs(
      "React useSyncExternalStore",
      "https://react.dev/reference/react/useSyncExternalStore",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin Flows",
      "https://kotlinlang.org/docs/coroutines-flow.html",
      "kotlin",
    ),
    bridgeDocs(
      "StateFlow and SharedFlow",
      "https://developer.android.com/kotlin/flow/stateflow-and-sharedflow",
      "kotlin",
    ),
  ],
  "android-build-variants": [
    bridgeDocs(
      "React Native Gradle Plugin",
      "https://reactnative.dev/docs/react-native-gradle-plugin",
      "react-native",
    ),
    bridgeDocs(
      "Configure build variants",
      "https://developer.android.com/build/build-variants",
      "kotlin",
    ),
    bridgeDocs(
      "Manage manifest files",
      "https://developer.android.com/build/manage-manifests",
      "kotlin",
    ),
    bridgeDocs(
      "Verify APK signing with apksigner",
      "https://developer.android.com/tools/apksigner",
      "kotlin",
    ),
  ],
  "android-intents": [
    bridgeDocs(
      "React Native Linking",
      "https://reactnative.dev/docs/linking",
      "react-native",
    ),
    bridgeDocs(
      "React Native Share",
      "https://reactnative.dev/docs/share",
      "react-native",
    ),
    bridgeDocs(
      "Intents and intent filters",
      "https://developer.android.com/guide/components/intents-filters",
      "kotlin",
    ),
  ],
  "android-activity-lifecycle": [
    bridgeDocs(
      "React Native AppState",
      "https://reactnative.dev/docs/appstate",
      "react-native",
    ),
    bridgeDocs(
      "The Activity lifecycle",
      "https://developer.android.com/guide/components/activities/activity-lifecycle",
      "kotlin",
    ),
    bridgeDocs(
      "Lifecycle in Jetpack Compose",
      "https://developer.android.com/topic/libraries/architecture/lifecycle",
      "kotlin",
    ),
    bridgeDocs(
      "collectAsStateWithLifecycle",
      "https://developer.android.com/reference/kotlin/androidx/lifecycle/compose/collectAsStateWithLifecycle.composable",
      "kotlin",
    ),
  ],
  "android-app-entry": [
    bridgeDocs(
      "AppRegistry",
      "https://reactnative.dev/docs/appregistry",
      "react-native",
    ),
    bridgeDocs(
      "Android app manifest overview",
      "https://developer.android.com/guide/topics/manifest/manifest-intro",
      "kotlin",
    ),
    bridgeDocs(
      "Build your first Android app with Compose",
      "https://developer.android.com/develop/ui/compose/tutorial",
      "kotlin",
    ),
    bridgeDocs(
      "Linking",
      "https://reactnative.dev/docs/linking",
      "react-native",
    ),
    bridgeDocs(
      "Manage manifest files and merging",
      "https://developer.android.com/build/manage-manifests",
      "kotlin",
    ),
  ],
  "android-resources": [
    bridgeDocs(
      "React Native I18nManager (RTL, not string translation)",
      "https://reactnative.dev/docs/i18nmanager",
      "react-native",
    ),
    bridgeDocs(
      "Resources in Compose",
      "https://developer.android.com/develop/ui/compose/resources",
      "kotlin",
    ),
    bridgeDocs(
      "Localize your app",
      "https://developer.android.com/guide/topics/resources/localization",
      "kotlin",
    ),
  ],
  "null-safety": [
    bridgeDocs(
      "TypeScript: strictNullChecks",
      "https://www.typescriptlang.org/tsconfig/strictNullChecks.html",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin null safety",
      "https://kotlinlang.org/docs/null-safety.html",
      "kotlin",
    ),
  ],
  "data-classes": [
    bridgeDocs(
      "TypeScript object types",
      "https://www.typescriptlang.org/docs/handbook/2/objects.html",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin data classes",
      "https://kotlinlang.org/docs/data-classes.html",
      "kotlin",
    ),
  ],
  "sealed-types": [
    bridgeDocs(
      "TypeScript discriminated unions",
      "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin sealed classes and interfaces",
      "https://kotlinlang.org/docs/sealed-classes.html",
      "kotlin",
    ),
  ],
  "collection-transforms": [
    bridgeDocs(
      "TypeScript everyday types: arrays",
      "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin collection transformations",
      "https://kotlinlang.org/docs/collection-transformations.html",
      "kotlin",
    ),
  ],
  "lambdas-and-receivers": [
    bridgeDocs(
      "TypeScript functions",
      "https://www.typescriptlang.org/docs/handbook/2/functions.html",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin lambdas",
      "https://kotlinlang.org/docs/lambdas.html",
      "kotlin",
    ),
    bridgeDocs(
      "Kotlin type-safe builders",
      "https://kotlinlang.org/docs/type-safe-builders.html",
      "kotlin",
    ),
  ],
  "extension-functions": [
    bridgeDocs(
      "TypeScript functions",
      "https://www.typescriptlang.org/docs/handbook/2/functions.html",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin extensions",
      "https://kotlinlang.org/docs/extensions.html",
      "kotlin",
    ),
  ],
  generics: [
    bridgeDocs(
      "TypeScript generics",
      "https://www.typescriptlang.org/docs/handbook/2/generics.html",
      "react-native",
    ),
    bridgeDocs(
      "Kotlin generics",
      "https://kotlinlang.org/docs/generics.html",
      "kotlin",
    ),
  ],
  recomposition: [
    bridgeDocs(
      "Render and Commit",
      "https://react.dev/learn/render-and-commit",
      "react-native",
    ),
    bridgeDocs(
      "Lifecycle of composables",
      "https://developer.android.com/develop/ui/compose/lifecycle",
      "kotlin",
    ),
  ],
  "snapshot-state": [
    bridgeDocs(
      "Updating Arrays in State",
      "https://react.dev/learn/updating-arrays-in-state",
      "react-native",
    ),
    bridgeDocs(
      "State and Jetpack Compose",
      "https://developer.android.com/develop/ui/compose/state",
      "kotlin",
    ),
  ],
  "ui-identity": [
    bridgeDocs(
      "Preserving and resetting state",
      "https://react.dev/learn/preserving-and-resetting-state",
      "react-native",
    ),
    bridgeDocs(
      "Lifecycle of composables",
      "https://developer.android.com/develop/ui/compose/lifecycle",
      "kotlin",
    ),
  ],
  "state-restoration": [
    bridgeDocs(
      "Preserving and resetting state",
      "https://react.dev/learn/preserving-and-resetting-state",
      "react-native",
    ),
    bridgeDocs(
      "Save UI state in Compose",
      "https://developer.android.com/develop/ui/compose/state-saving",
      "kotlin",
    ),
    bridgeDocs(
      "Save UI states",
      "https://developer.android.com/topic/libraries/architecture/saving-states",
      "kotlin",
    ),
  ],
  "stability-and-skipping": [
    bridgeDocs(
      "React memo",
      "https://react.dev/reference/react/memo",
      "react-native",
    ),
    bridgeDocs(
      "Stability in Compose",
      "https://developer.android.com/develop/ui/compose/performance/stability",
      "kotlin",
    ),
    bridgeDocs(
      "Strong skipping mode",
      "https://developer.android.com/develop/ui/compose/performance/stability/strongskipping",
      "kotlin",
    ),
  ],
  "modifier-order": [
    bridgeDocs(
      "React Native Style",
      "https://reactnative.dev/docs/style",
      "react-native",
    ),
    bridgeDocs(
      "Compose modifiers",
      "https://developer.android.com/develop/ui/compose/modifiers",
      "kotlin",
    ),
  ],
  "layout-constraints": [
    bridgeDocs(
      "React Native Height and Width",
      "https://reactnative.dev/docs/height-and-width",
      "react-native",
    ),
    bridgeDocs(
      "Compose constraints and modifier order",
      "https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers",
      "kotlin",
    ),
  ],
  "window-insets": [
    bridgeDocs(
      "React Native SafeAreaView",
      "https://reactnative.dev/docs/safeareaview",
      "react-native",
    ),
    bridgeDocs(
      "Set up window insets in Compose",
      "https://developer.android.com/develop/ui/compose/system/insets-ui",
      "kotlin",
    ),
  ],
  "adaptive-layouts": [
    bridgeDocs(
      "React Native useWindowDimensions",
      "https://reactnative.dev/docs/usewindowdimensions",
      "react-native",
    ),
    bridgeDocs(
      "Use Compose window size classes",
      "https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes",
      "kotlin",
    ),
  ],
  "accessibility-semantics": [
    bridgeDocs(
      "React Native Accessibility",
      "https://reactnative.dev/docs/accessibility",
      "react-native",
    ),
    bridgeDocs(
      "Compose semantics",
      "https://developer.android.com/develop/ui/compose/accessibility/semantics",
      "kotlin",
    ),
    bridgeDocs(
      "Test your Compose layout",
      "https://developer.android.com/develop/ui/compose/testing",
      "kotlin",
    ),
  ],
  "state-driven-animation": [
    bridgeDocs(
      "React Native Animations",
      "https://reactnative.dev/docs/animations",
      "react-native",
    ),
    bridgeDocs(
      "Quick guide to Compose animations",
      "https://developer.android.com/develop/ui/compose/animation/quick-guide",
      "kotlin",
    ),
  ],
  "gesture-abstractions": [
    bridgeDocs(
      "React Native Gesture Responder System",
      "https://reactnative.dev/docs/gesture-responder-system",
      "react-native",
    ),
    bridgeDocs(
      "Understand gestures in Compose",
      "https://developer.android.com/develop/ui/compose/touch-input/pointer-input/understand-gestures",
      "kotlin",
    ),
  ],
  "runtime-permissions": [
    bridgeDocs(
      "React Native PermissionsAndroid",
      "https://reactnative.dev/docs/permissionsandroid",
      "react-native",
    ),
    bridgeDocs(
      "Request Android runtime permissions",
      "https://developer.android.com/training/permissions/requesting",
      "kotlin",
    ),
  ],
  "back-navigation": [
    bridgeDocs(
      "React Native BackHandler",
      "https://reactnative.dev/docs/backhandler",
      "react-native",
    ),
    bridgeDocs(
      "Custom back navigation in Compose",
      "https://developer.android.com/guide/navigation/custom-back",
      "kotlin",
    ),
  ],
  "ui-behavior-testing": [
    bridgeDocs(
      "React Native Testing overview",
      "https://reactnative.dev/docs/testing-overview",
      "react-native",
    ),
    bridgeDocs(
      "Test your Compose layout",
      "https://developer.android.com/develop/ui/compose/testing",
      "kotlin",
    ),
  ],
  "composition-local": [
    bridgeDocs(
      "React createContext",
      "https://react.dev/reference/react/createContext",
      "react-native",
    ),
    bridgeDocs(
      "CompositionLocal",
      "https://developer.android.com/develop/ui/compose/compositionlocal",
      "kotlin",
    ),
  ],
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
