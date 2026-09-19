export const permissionStageExamples = {
  "runtime-permissions": {
    basic: {
      "react-native": {
        name: "Request after a camera action",
        summary:
          "The user initiates the capability before the OS prompt appears.",
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
        name: "Launch after a camera action",
        summary:
          "The launcher receives the permission result after the user action.",
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
    applied: {
      "react-native": {
        name: "Render a denied fallback",
        summary:
          "The screen keeps a usable alternative after permission is denied.",
        language: "tsx",
        filename: "AvatarPicker.tsx",
        code: `const [cameraGranted, setCameraGranted] = useState(false);

return cameraGranted
  ? <CameraPicker />
  : <Button title="Choose from library" onPress={openLibrary} />;`,
      },
      kotlin: {
        name: "Render a denied fallback",
        summary:
          "Permission result updates UI state; the fallback does not need camera access.",
        language: "kotlin",
        filename: "AvatarPicker.kt",
        code: `var cameraGranted by rememberSaveable { mutableStateOf(false) }

if (cameraGranted) {
    CameraPicker()
} else {
    Button(onClick = openLibrary) { Text("Choose from library") }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Explain the feature benefit first",
        summary:
          "App UI explains why the action needs access before requesting it.",
        language: "tsx",
        filename: "CameraEducation.tsx",
        code: `function CameraEducation() {
  return <Button title="Allow camera to scan a receipt" onPress={requestCamera} />;
}`,
      },
      kotlin: {
        name: "Explain the feature benefit first",
        summary:
          "The rationale is app UI; the platform permission dialog remains system-owned.",
        language: "kotlin",
        filename: "CameraEducation.kt",
        code: `@Composable
fun CameraEducation(onRequest: () -> Unit) {
    Button(onClick = onRequest) { Text("Allow camera to scan a receipt") }
}`,
      },
    },
  },
} as const;
