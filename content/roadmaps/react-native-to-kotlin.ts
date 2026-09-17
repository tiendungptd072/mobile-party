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
      ],
    },
    {
      id: "async-networking",
      title: "Async & Networking",
      order: 30,
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
  ],
} as const;
