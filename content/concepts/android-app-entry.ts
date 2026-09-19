export const androidAppEntryConcept = {
  id: "android-app-entry",
  slug: "android-app-entry",
  title: "Android App Entry and Activity",
  description:
    "Trace app launch from AndroidManifest.xml and Activity to Compose, without confusing it with React Native's JavaScript entry point.",
  category: "build",
  order: 9,
  aliases: ["AndroidManifest.xml", "MainActivity", "AppRegistry", "setContent"],
  keywords: ["launcher", "manifest", "activity", "entry point", "intent"],
  implementations: {
    "react-native": {
      name: "Register the JavaScript root",
      summary:
        "AppRegistry registers the root component; an Android host still launches the native app.",
      language: "tsx",
      filename: "index.tsx",
      code: `import { AppRegistry, Text } from "react-native";

function App() {
  return <Text>Welcome</Text>;
}

AppRegistry.registerComponent("MobileApp", () => App);`,
    },
    kotlin: {
      name: "Launch an Activity and set Compose content",
      summary:
        "Android resolves a declared launcher Activity; ComponentActivity then installs the Compose UI.",
      language: "kotlin",
      filename: "MainActivity.kt",
      code: `// AndroidManifest.xml declares .MainActivity with MAIN/LAUNCHER
// and android:exported="true" for an external launcher.
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { Text("Welcome") }
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "AppRegistry selects the React Native JavaScript root after the native host starts; AndroidManifest.xml and Activity are Android platform entry points, not replacements for a React component.",
    },
  ],
  mentalModel:
    "Follow the launch chain: installed app and manifest → launcher intent → Activity.onCreate → setContent → composables. A React Native app also has an Android host before AppRegistry runs its JavaScript root.",
  differences: [
    'Android must declare launchable activities in AndroidManifest.xml; an Activity with a launcher intent filter needs android:exported="true".',
    "Activity lifecycle callbacks belong to the platform, while composable functions can enter and leave composition independently of Activity recreation.",
    "Build configuration lives in Gradle, not in the JavaScript entry file; the React Native Android project also uses Gradle under android/.",
  ],
  commonMistakes: [
    "Treating AppRegistry.registerComponent as the Android launcher or putting screen navigation and mutable UI state in Activity.onCreate.",
    "Adding an intent filter but forgetting the manifest declaration or android:exported requirement.",
  ],
  productionNotes: [
    "Keep the Activity as a thin host for app-wide platform integration and Compose content. Validate external intent data before mapping it to a destination.",
    "Inspect the merged manifest and the app module's Gradle configuration when launcher behavior differs between build variants; a JavaScript-only review can miss Android packaging errors.",
  ],
} as const;
