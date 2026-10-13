export const androidPlatformStageExamples = {
  "android-build-variants": {
    basic: {
      "react-native": {
        name: "Build the Android host",
        summary:
          "The React Native repository's Gradle wrapper lives under android/.",
        language: "bash",
        filename: "android/gradlew",
        snippet: "android-build-variants/react-native/basic.sh",
      },
      kotlin: {
        name: "Build the Compose app",
        summary: "The native project's wrapper builds the app module.",
        language: "bash",
        filename: "gradlew",
        snippet: "android-build-variants/kotlin/basic.sh",
      },
    },
    applied: {
      "react-native": {
        name: "Inspect a flavor's source sets",
        summary: "The demo flavor must exist before assembling demoDebug.",
        language: "bash",
        filename: "android/gradlew",
        snippet: "android-build-variants/react-native/applied.sh",
      },
      kotlin: {
        name: "Inspect the same Android variant",
        summary:
          "Gradle combines demo, debug, and main inputs in this variant.",
        language: "bash",
        filename: "gradlew",
        snippet: "android-build-variants/kotlin/applied.sh",
      },
    },
    production: {
      "react-native": {
        name: "Build and inspect a signed release APK",
        summary:
          "Check the expected signing certificate and packaged JavaScript bundle.",
        language: "bash",
        filename: "android/gradlew",
        snippet: "android-build-variants/react-native/production.sh",
      },
      kotlin: {
        name: "Build and inspect a signed release APK",
        summary: "Check the expected signing certificate and merged manifest.",
        language: "bash",
        filename: "gradlew",
        snippet: "android-build-variants/kotlin/production.sh",
      },
    },
  },
  "android-intents": {
    basic: {
      "react-native": {
        name: "Open a help page",
        summary: "Linking requests an external URL handler.",
        language: "tsx",
        filename: "open-help.ts",
        snippet: "android-intents/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Open a help page",
        summary: "ACTION_VIEW lets Android resolve an external handler.",
        language: "kotlin",
        filename: "OpenHelp.kt",
        snippet: "android-intents/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Share text",
        summary: "React Native opens the platform share UI.",
        language: "tsx",
        filename: "share-link.ts",
        snippet: "android-intents/react-native/applied.tsx",
      },
      kotlin: {
        name: "Share text with a chooser",
        summary: "ACTION_SEND declares the MIME type and payload.",
        language: "kotlin",
        filename: "ShareLink.kt",
        snippet: "android-intents/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Route cold and warm links safely",
        summary: "Both entry paths use the same validated destination parser.",
        language: "tsx",
        filename: "external-links.tsx",
        snippet: "android-intents/react-native/production.tsx",
      },
      kotlin: {
        name: "Validate received Intent data",
        summary:
          "A stable app-owned navigator handles validated links; onNewIntent requires Activity reuse.",
        language: "kotlin",
        filename: "MainActivity.kt",
        snippet: "android-intents/kotlin/production.kt",
      },
    },
  },
  "android-activity-lifecycle": {
    basic: {
      "react-native": {
        name: "Track application foreground",
        summary: "An AppState listener runs when the app becomes active.",
        language: "tsx",
        filename: "ForegroundTracker.tsx",
        snippet: "android-activity-lifecycle/react-native/basic.tsx",
      },
      kotlin: {
        name: "Track owner resume",
        summary: "The effect observes the current screen LifecycleOwner.",
        language: "kotlin",
        filename: "ForegroundTracker.kt",
        snippet: "android-activity-lifecycle/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Pause a preview in the background",
        summary:
          "The app-owned camera controller stops on background or unmount.",
        language: "tsx",
        filename: "CameraPreview.tsx",
        snippet: "android-activity-lifecycle/react-native/applied.tsx",
      },
      kotlin: {
        name: "Pause a preview on lifecycle pause",
        summary:
          "Cleanup runs on pause or when the composable leaves the screen.",
        language: "kotlin",
        filename: "CameraPreview.kt",
        snippet: "android-activity-lifecycle/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Observe updates only while active",
        summary:
          "watchItems is an app-owned subscription and must return cleanup.",
        language: "tsx",
        filename: "ItemsScreen.tsx",
        snippet: "android-activity-lifecycle/react-native/production.tsx",
      },
      kotlin: {
        name: "Collect screen state while started",
        summary: "StateFlow collection follows the screen's LifecycleOwner.",
        language: "kotlin",
        filename: "ItemsRoute.kt",
        snippet: "android-activity-lifecycle/kotlin/production.kt",
      },
    },
  },
  "android-app-entry": {
    basic: {
      "react-native": {
        name: "Register the JavaScript root",
        summary:
          "The native host starts first, then runs the registered React root.",
        language: "tsx",
        filename: "index.tsx",
        snippet: "android-app-entry/react-native/basic.tsx",
      },
      kotlin: {
        name: "Start the Compose root",
        summary: "The launcher Activity installs its Compose content.",
        language: "kotlin",
        filename: "MainActivity.kt",
        snippet: "android-app-entry/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Keep entry separate from the screen",
        summary:
          "The registration file chooses a root; AppRoot owns the UI tree.",
        language: "tsx",
        filename: "index.tsx",
        snippet: "android-app-entry/react-native/applied.tsx",
      },
      kotlin: {
        name: "Keep the Activity a thin host",
        summary: "The Activity delegates screen composition to AppRoot.",
        language: "kotlin",
        filename: "MainActivity.kt",
        snippet: "android-app-entry/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Validate an external launch URL",
        summary: "A launch URL is untrusted input, not a screen identifier.",
        language: "tsx",
        filename: "initial-route.ts",
        snippet: "android-app-entry/react-native/production.tsx",
      },
      kotlin: {
        name: "Validate the launch Intent",
        summary:
          "The Activity maps external intent data before passing it to UI.",
        language: "kotlin",
        filename: "MainActivity.kt",
        snippet: "android-app-entry/kotlin/production.kt",
      },
    },
  },
  "android-resources": {
    basic: {
      "react-native": {
        name: "Translate one label",
        summary: "The app supplies t; React Native has no built-in t function.",
        language: "tsx",
        filename: "Welcome.tsx",
        snippet: "android-resources/react-native/basic.tsx",
      },
      kotlin: {
        name: "Use a qualified string resource",
        summary: "Android chooses the default or Vietnamese XML value.",
        language: "kotlin",
        filename: "Welcome.kt",
        snippet: "android-resources/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Format a translated sentence",
        summary: "The translator owns word order and inserts the name.",
        language: "tsx",
        filename: "Greeting.tsx",
        snippet: "android-resources/react-native/applied.tsx",
      },
      kotlin: {
        name: "Format an Android string",
        summary: "A positional placeholder lets each locale place the name.",
        language: "kotlin",
        filename: "Greeting.kt",
        snippet: "android-resources/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Use the app's plural-aware translation",
        summary:
          "The selected locale, not an English count check, determines grammar.",
        language: "tsx",
        filename: "MessageCount.tsx",
        snippet: "android-resources/react-native/production.tsx",
      },
      kotlin: {
        name: "Use quantity resources",
        summary:
          "Android selects a locale-aware quantity and formats the count.",
        language: "kotlin",
        filename: "MessageCount.kt",
        snippet: "android-resources/kotlin/production.kt",
      },
    },
  },
} as const;
