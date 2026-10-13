export const permissionStageExamples = {
  "runtime-permissions": {
    basic: {
      "react-native": {
        name: "Request after a camera action",
        summary:
          "The user initiates the capability before the OS prompt appears.",
        language: "tsx",
        filename: "CameraButton.tsx",
        snippet: "runtime-permissions/react-native/basic.tsx",
      },
      kotlin: {
        name: "Launch after a camera action",
        summary:
          "The launcher receives the permission result after the user action.",
        language: "kotlin",
        filename: "CameraButton.kt",
        snippet: "runtime-permissions/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Render a denied fallback",
        summary:
          "The screen keeps a usable alternative after permission is denied.",
        language: "tsx",
        filename: "AvatarPicker.tsx",
        snippet: "runtime-permissions/react-native/applied.tsx",
      },
      kotlin: {
        name: "Render a denied fallback",
        summary:
          "Permission result updates UI state; the fallback does not need camera access.",
        language: "kotlin",
        filename: "AvatarPicker.kt",
        snippet: "runtime-permissions/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Explain the feature benefit first",
        summary:
          "App UI explains why the action needs access before requesting it.",
        language: "tsx",
        filename: "CameraEducation.tsx",
        snippet: "runtime-permissions/react-native/production.tsx",
      },
      kotlin: {
        name: "Explain the feature benefit first",
        summary:
          "The rationale is app UI; the platform permission dialog remains system-owned.",
        language: "kotlin",
        filename: "CameraEducation.kt",
        snippet: "runtime-permissions/kotlin/production.kt",
      },
    },
  },
} as const;
