export const reactNativeToKotlinRoadmap = {
  source: "react-native",
  target: "kotlin",
  sections: [
    {
      id: "ui-basics",
      title: "UI Basics",
      order: 10,
      lessons: [
        {
          conceptSlug: "component",
          title: "Component",
          order: 10,
          exercise: "Rewrite a React Native profile card as a composable.",
          checklist: ["Can describe inputs", "Can emit events"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render a small component with explicit inputs.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Split visual state from user events.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep composables reusable by passing state and callbacks.",
            },
          ],
        },
        {
          conceptSlug: "props",
          title: "Props and Parameters",
          order: 11,
          exercise:
            "Convert a typed React Native card with value and callback props into a stateless composable.",
          checklist: [
            "Passes immutable state down",
            "Emits user events through callbacks",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Map a props object to named Kotlin parameters and function types.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Keep a reusable composable stateless by receiving its displayed value and event callbacks.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Expose a focused UI contract instead of passing screen dependencies or a ViewModel through the tree.",
            },
          ],
        },
        {
          conceptSlug: "children",
          title: "Children and Content Slots",
          order: 12,
          exercise:
            "Rewrite a React Native panel that accepts children as a Compose container with a content slot.",
          checklist: [
            "Can map children to a content lambda",
            "Uses named slots when a container has several insertion points",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Accept and invoke one @Composable content lambda.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Create separate header, content, and action slots with clear responsibilities.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use scoped slots only when callers need structured capabilities, not as a default abstraction.",
            },
          ],
        },
        {
          conceptSlug: "conditional-ui",
          title: "Conditional UI",
          order: 15,
          exercise:
            "Build a profile screen that shows loading, content, and empty states without leaving stale UI behind.",
          checklist: [
            "Can explain that each UI branch is a description of current state.",
            "Models loading, content, and empty states explicitly.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Choose between two composables with an if expression, just as you choose JSX with a conditional expression.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Render a complete loading, content, or empty branch from one screen state instead of toggling individual views.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use a sealed UI-state model so success, error, loading, and empty states remain exhaustive as the feature grows.",
            },
          ],
        },
        {
          conceptSlug: "layout",
          title: "Layout",
          order: 20,
          exercise:
            "Recreate a React Native profile header with an avatar, title, and action using Row, Column, and Modifier.",
          checklist: [
            "Can map row and column intent to Compose layout composables.",
            "Can explain why Modifier order changes the result.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Place two children in a Row or Column and use alignment and spacing deliberately.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Translate common flexbox layouts while moving child-specific constraints into each child Modifier.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Extract repeated spacing and alignment into focused composables or design tokens rather than copying modifier chains.",
            },
          ],
        },
        {
          conceptSlug: "list",
          title: "List",
          order: 30,
          exercise: "Convert a FlatList row into a LazyColumn item.",
          checklist: ["Uses stable keys", "Handles loading state"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render a small collection.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Handle item interaction and empty state.",
            },
            {
              id: "production",
              title: "Production",
              description: "Use stable identity and pagination boundaries.",
            },
          ],
        },
      ],
    },
    {
      id: "state",
      title: "State",
      order: 20,
      lessons: [
        {
          conceptSlug: "text-input",
          title: "Text Input",
          order: 5,
          exercise:
            "Convert a controlled React Native name field into a state-hoisted Compose TextField with validation owned by its parent.",
          checklist: [
            "Can trace value down and edit events up.",
            "Can identify why a field becomes read-only when state is not updated.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Render a TextField with a value and onValueChange callback, matching the controlled input mental model.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Hoist the field value so a parent can coordinate validation, labels, and submission.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep reusable fields presentation-focused while form validation and submit state live in the screen state owner.",
            },
          ],
        },
        {
          conceptSlug: "local-state",
          title: "Local State",
          order: 10,
          exercise: "Move a counter from useState to remember state.",
          checklist: ["Explains recomposition", "Knows when to hoist state"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Update local UI state.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Hoist state for a reusable child.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Choose ViewModel or saveable state when lifetime changes.",
            },
          ],
        },
        {
          conceptSlug: "derived-state",
          title: "Derived State",
          order: 20,
          exercise:
            "Remove duplicated total state from a cart and derive it from the current item list.",
          checklist: [
            "Keeps one source of truth",
            "Knows when memoization is unnecessary",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Calculate a cheap value directly from current parameters.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Remove synchronized mutable state and derive filtered or aggregated UI data.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use derivedStateOf only when state changes more often than the UI result and profiling supports it.",
            },
          ],
        },
        {
          conceptSlug: "global-state",
          title: "Screen and Shared State",
          order: 30,
          exercise:
            "Move a profile screen from an external React store to ViewModel-owned immutable UI state.",
          checklist: [
            "Chooses the lowest suitable state owner",
            "Collects StateFlow with lifecycle awareness",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Expose immutable screen state and intent methods from a ViewModel.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Collect state in a route composable and pass plain values and callbacks to screen content.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Scope each state holder to the correct destination or navigation graph and preserve only necessary state.",
            },
          ],
        },
      ],
    },
    {
      id: "lifecycle",
      title: "Lifecycle",
      order: 30,
      lessons: [
        {
          conceptSlug: "side-effects",
          title: "Side Effects",
          order: 10,
          exercise:
            "Classify three React effects as composition work, disposable registration, or ViewModel work before translating them.",
          checklist: [
            "Selects an effect API by ownership",
            "Uses effect keys deliberately",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Run a suspend UI task with LaunchedEffect and a meaningful key.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Distinguish LaunchedEffect, DisposableEffect, and work that belongs outside composition.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep effect APIs UI-focused and make cancellation, restart behavior, and ownership explicit.",
            },
          ],
        },
        {
          conceptSlug: "lifecycle",
          title: "Lifecycle and Cleanup",
          order: 20,
          exercise:
            "Translate a React subscription with cleanup into a DisposableEffect that registers and removes one observer.",
          checklist: [
            "Removes every manually registered observer",
            "Does not confuse recomposition with lifecycle entry",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Register a listener and remove it from onDispose.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Restart registration only when the resource owner or another true key changes.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Prefer lifecycle-aware adapters for observable state and reserve manual disposal for external listener APIs.",
            },
          ],
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      order: 25,
      lessons: [
        {
          conceptSlug: "form",
          title: "Form State and Validation",
          order: 10,
          exercise:
            "Build a sign-in form with a controlled email field, derived validation, and an explicit submit state.",
          checklist: [
            "Keeps field state separate from server state",
            "Derives validation instead of synchronizing it",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Own a field value and derive a simple validation result.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Hoist values so a parent coordinates multiple fields and submit events.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Model submitting, error, correction, and success without coupling reusable fields to a ViewModel.",
            },
          ],
        },
      ],
    },
    {
      id: "navigation",
      title: "Navigation",
      order: 35,
      lessons: [
        {
          conceptSlug: "navigation",
          title: "Navigation",
          order: 10,
          exercise:
            "Move a profile navigation action out of a presentational screen and into a route-level callback.",
          checklist: [
            "Keeps NavController at the route boundary",
            "Can explain back stack ownership",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Navigate from one destination to another through the graph.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Pass navigation callbacks into screen content instead of the controller.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Organize graphs by scope and test navigation behavior separately from destination UI.",
            },
          ],
        },
        {
          conceptSlug: "route-parameters",
          title: "Route Parameters",
          order: 20,
          exercise:
            "Replace a full user object navigation param with a user ID and load the current profile at the destination.",
          checklist: [
            "Passes only serializable route data",
            "Validates destination arguments",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Pass a compact identifier through a route.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Decode the identifier at the route boundary and pass it into screen content.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep route schemas stable and resolve authorized, current data outside the navigation payload.",
            },
          ],
        },
        {
          conceptSlug: "deep-link",
          title: "Deep Links",
          order: 30,
          exercise:
            "Configure a profile URL pattern and reject an invalid profile identifier before loading data.",
          checklist: [
            "Treats the URL as untrusted input",
            "Keeps link patterns aligned with routes",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Map one URL pattern to a destination.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Parse and validate route data before rendering the destination.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Coordinate platform link registration, authorization, and in-app navigation behavior.",
            },
          ],
        },
      ],
    },
    {
      id: "async-networking",
      title: "Async & Networking",
      order: 40,
      lessons: [
        {
          conceptSlug: "async",
          title: "Async Work",
          order: 10,
          exercise:
            "Replace an effect-driven request with a lifecycle-aware coroutine.",
          checklist: [
            "Understands cancellation",
            "Avoids work during composition",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Start asynchronous work from a controlled effect.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Restart work when a key changes.",
            },
            {
              id: "production",
              title: "Production",
              description: "Keep long-lived work in a ViewModel.",
            },
          ],
        },
        {
          conceptSlug: "loading-state",
          title: "Loading State",
          order: 15,
          exercise:
            "Render initial loading, refresh, and an empty result as distinct states for one profile list.",
          checklist: [
            "Does not use null to mean every non-ready state",
            "Can explain the refresh policy",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render an explicit in-progress state.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Model loading, ready, and empty results without overlapping meanings.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Preserve useful content during refresh when the product experience calls for it.",
            },
          ],
        },
        {
          conceptSlug: "error-handling",
          title: "Error Handling",
          order: 17,
          exercise:
            "Map an offline request failure to friendly copy and a retry event without exposing the raw exception.",
          checklist: [
            "Separates cancellation from failure",
            "Provides an intentional recovery action",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render one recoverable error state.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Map transport errors to displayable failure models and retry events.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Preserve diagnostics safely while presenting stable, localizable user copy.",
            },
          ],
        },
        {
          conceptSlug: "api-request",
          title: "API Request",
          order: 20,
          exercise:
            "Model loading, success, and failure for a profile request.",
          checklist: ["Models each state", "Keeps transport out of UI"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render loading and success.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Add retry and error UI.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Expose immutable UI state from a repository-backed ViewModel.",
            },
          ],
        },
      ],
    },
    {
      id: "storage",
      title: "Storage",
      order: 45,
      lessons: [
        {
          conceptSlug: "local-storage",
          title: "Local Storage",
          order: 10,
          exercise:
            "Persist a theme preference, load its default safely, and update the screen when the stored value changes.",
          checklist: [
            "Treats persisted data as untrusted input",
            "Keeps storage access out of reusable UI",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Read and write one small preference asynchronously.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Expose stored preferences through a state holder instead of directly from UI components.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Version stored values, recover from bad data, and choose the appropriate store for sensitivity and scale.",
            },
          ],
        },
      ],
    },
  ],
} as const;
