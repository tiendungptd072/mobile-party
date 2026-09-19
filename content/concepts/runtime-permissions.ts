export const runtimePermissionsConcept = {
  id: "runtime-permissions",
  slug: "runtime-permissions",
  title: "Runtime Permissions",
  description:
    "Request sensitive Android capabilities in context while keeping the OS prompt, rationale UI, and feature state separate.",
  category: "architecture",
  order: 45,
  aliases: [
    "PermissionsAndroid",
    "RequestPermission",
    "Activity Result API",
    "permission rationale",
  ],
  keywords: ["permission", "camera", "rationale", "activity result", "privacy"],
  implementations: {
    "react-native": {
      name: "Request an Android permission",
      summary:
        "An interaction requests a dangerous permission and receives a result.",
      language: "tsx",
      filename: "CameraButton.tsx",
      code: `async function requestCamera() {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  if (result === PermissionsAndroid.RESULTS.GRANTED) openCamera();
}`,
    },
    kotlin: {
      name: "Launch an Activity Result contract",
      summary:
        "Compose registers a permission launcher and reacts to its asynchronous result.",
      language: "kotlin",
      filename: "CameraButton.kt",
      code: `val requestCamera = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> if (granted) openCamera() }

Button(onClick = { requestCamera.launch(Manifest.permission.CAMERA) }) {
    Text("Use camera")
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both request dangerous Android permissions in response to user intent, but PermissionsAndroid resolves a JavaScript promise while Compose integrates Android's Activity Result launcher into composition.",
    },
  ],
  mentalModel:
    "A permission is not feature state. Explain the benefit in your own UI, request only after the user starts that feature, then render a granted, denied, or degraded feature outcome from state.",
  differences: [
    "Compose's rememberLauncherForActivityResult registers a platform contract; it does not replace manifest declaration or the Android permission policy.",
    "The system dialog is not customizable. Put rationale and recovery actions in app UI rather than trying to encode them in the request itself.",
  ],
  commonMistakes: [
    "Prompting at app launch or repeatedly requesting a denied permission without an in-context explanation and a usable fallback.",
  ],
  productionNotes: [
    "Check permission at the operation boundary, handle revocation, request the minimum capability, and send users to settings only after explaining why the feature cannot continue.",
  ],
} as const;
