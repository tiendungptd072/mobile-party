import type { LearningEntryGuide } from "@/types/learning-entry";

export const reactNativeToKotlinEntry = {
  title: "Find your starting point",
  introduction:
    "Choose 'I can demonstrate it' only if you can complete the stated task without following an example. Your React Native seniority does not set your Android starting point; the milestone is what proves progress.",
  answerYes: "I can demonstrate it",
  answerNo: "I need practice",
  incomplete: "Answer all four questions to see a suggested path.",
  recommendation: "Suggested starting path",
  viewPath: "View this path",
  pathsTitle: "Learning paths and exit criteria",
  lessonsLabel: "Start with these lessons, in order",
  prerequisiteLabel: "Before starting",
  milestoneLabel: "Practice milestone",
  rubricLabel: "Evidence of completion",
  availabilityTitle: "What is available now",
  futureContentNote:
    "The linked lessons are available now. The runnable Android project and advanced platform modules are scheduled for later phases; the milestones below are targets, not certificates awarded by this site.",
  modulesTitle: "Module prerequisites and skip checks",
  moduleCheckLabel: "Check before skipping",
  skipGuidance:
    "If you can complete a module check without examples, you may skim its Basic and Applied stages and focus on Production. Complete the lesson exercise before marking it done.",
  questions: [
    {
      id: "kotlin",
      title: "Kotlin language bridge",
      proof:
        "Convert a nullable API model into a Kotlin data class and sealed UI state without using !!.",
    },
    {
      id: "compose",
      title: "Compose state and lifetime",
      proof:
        "Explain which search draft belongs in remember, rememberSaveable, or a ViewModel after rotation and process recreation.",
    },
    {
      id: "async",
      title: "Async data and cancellation",
      proof:
        "Cancel a superseded request and render loading, failure, retry, and success from a repository-backed state holder.",
    },
    {
      id: "architecture",
      title: "Feature ownership and tests",
      proof:
        "Explain the UI/ViewModel/repository boundary and test a state transition with a fake data source.",
    },
  ],
  paths: [
    {
      level: "junior",
      title: "Android Junior path",
      audience:
        "Start here when Kotlin or Compose state and lifetime still require examples.",
      prerequisite:
        "You can build a React Native screen and understand props, local state, and navigation.",
      lessonSlugs: [
        "null-safety",
        "data-classes",
        "sealed-types",
        "android-build-variants",
        "android-app-entry",
        "android-resources",
        "android-intents",
        "android-activity-lifecycle",
        "component",
        "local-state",
        "state-restoration",
        "text-input",
        "form",
        "navigation",
        "ui-behavior-testing",
      ],
      milestone:
        "Build a two-screen Android feature with a validated input, local state, navigation, and a UI behavior test.",
      rubric: [
        "The same user action produces the same visible result after returning to the screen.",
        "The state owner and restoration choice are explained for rotation and process recreation.",
        "A UI test performs an action and checks the visible result.",
      ],
    },
    {
      level: "middle",
      title: "Android Middle path",
      audience:
        "Start here when Kotlin and Compose basics are comfortable but data flow or testing needs practice.",
      prerequisite:
        "Demonstrate the Kotlin and Compose self-check tasks, or complete the Junior milestone.",
      lessonSlugs: [
        "snapshot-state",
        "global-state",
        "repository-boundary",
        "dependency-injection",
        "offline-first-data",
        "offline-pagination",
        "durable-background-work",
        "android-notifications",
        "async",
        "coroutine-scopes",
        "flow-and-stateflow",
        "flow-composition",
        "state-owner-testing",
        "navigation-testing",
        "background-work-testing",
        "error-handling",
        "api-request",
        "pagination",
        "local-storage",
        "authentication",
      ],
      milestone:
        "Implement a repository-backed list with loading, retry, pagination, local persistence, and tests for state changes.",
      rubric: [
        "Screen state has one clear owner and does not expose transport details to reusable UI.",
        "Cancellation, duplicate requests, and retry preserve correct visible data.",
        "Repository and ViewModel behavior are tested with controlled data sources.",
      ],
    },
    {
      level: "senior",
      title: "Android Senior path",
      audience:
        "Start here when you can already build and test a complete Compose feature independently.",
      prerequisite:
        "Demonstrate all four self-check tasks and review the Middle milestone if its data layer is unfamiliar.",
      lessonSlugs: [
        "state-restoration",
        "stability-and-skipping",
        "adaptive-layouts",
        "deep-link",
        "secure-storage",
        "ui-behavior-testing",
      ],
      milestone:
        "Review and improve a feature across state restoration, data ownership, deep links, security, tests, and measured performance.",
      rubric: [
        "Architecture choices and their trade-offs are documented against real constraints.",
        "Failure, recreation, and navigation scenarios are reproduced and covered by tests.",
        "A performance change includes a before/after measurement, not an unmeasured assumption.",
      ],
    },
  ],
  modules: [
    {
      sectionId: "kotlin-bridge",
      prerequisite: "Working knowledge of TypeScript models and functions.",
      check:
        "Convert a nullable response into a Kotlin data class and sealed state without !!.",
      lessonSlug: "null-safety",
    },
    {
      sectionId: "compose-runtime",
      prerequisite: "Kotlin bridge and a basic Compose screen.",
      check:
        "Choose the correct owner for state across recomposition, rotation, and process recreation.",
      lessonSlug: "state-restoration",
    },
    {
      sectionId: "ui-basics",
      prerequisite: "Kotlin functions, nullability, and composable syntax.",
      check:
        "Build a screen with reusable content, constraints, and a stable list key.",
      lessonSlug: "layout-constraints",
    },
    {
      sectionId: "state",
      prerequisite: "Reusable Compose content and event callbacks.",
      check:
        "Hoist state and explain when a value should be derived instead of stored.",
      lessonSlug: "derived-state",
    },
    {
      sectionId: "lifecycle",
      prerequisite:
        "State ownership and the difference between render and recomposition.",
      check:
        "Subscribe to an external source and remove the subscription when its owner leaves.",
      lessonSlug: "lifecycle",
    },
    {
      sectionId: "forms",
      prerequisite: "State, callbacks, and lifecycle-aware asynchronous work.",
      check:
        "Validate an input and prevent duplicate submit while preserving a recoverable error.",
      lessonSlug: "form",
    },
    {
      sectionId: "navigation",
      prerequisite: "Screen state ownership and a two-screen Compose flow.",
      check:
        "Pass an ID through a route and load current authorized data in the destination.",
      lessonSlug: "route-parameters",
    },
    {
      sectionId: "async-networking",
      prerequisite:
        "Kotlin suspend functions, ViewModel ownership, and screen state.",
      check:
        "Cancel outdated work and show loading, error, retry, and success without stale results.",
      lessonSlug: "async",
    },
    {
      sectionId: "storage",
      prerequisite: "Repositories and explicit loading/error states.",
      check:
        "Persist a small preference and recover from missing or malformed stored data.",
      lessonSlug: "local-storage",
    },
    {
      sectionId: "app-architecture",
      prerequisite: "Navigation, async data, and repository-owned persistence.",
      check:
        "Explain a session gate and test a visible transition with a fake dependency.",
      lessonSlug: "authentication",
    },
  ],
} satisfies LearningEntryGuide;
