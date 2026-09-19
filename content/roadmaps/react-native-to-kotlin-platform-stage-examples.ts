export const androidPlatformStageExamples = {
  "android-build-variants": {
    basic: {
      "react-native": {
        name: "Build the Android host",
        summary:
          "The React Native repository's Gradle wrapper lives under android/.",
        language: "bash",
        filename: "android/gradlew",
        code: `cd android
./gradlew :app:assembleDebug`,
      },
      kotlin: {
        name: "Build the Compose app",
        summary: "The native project's wrapper builds the app module.",
        language: "bash",
        filename: "gradlew",
        code: `./gradlew :app:assembleDebug`,
      },
    },
    applied: {
      "react-native": {
        name: "Inspect a flavor's source sets",
        summary: "The demo flavor must exist before assembling demoDebug.",
        language: "bash",
        filename: "android/gradlew",
        code: `cd android
./gradlew :app:sourceSets
./gradlew :app:assembleDemoDebug`,
      },
      kotlin: {
        name: "Inspect the same Android variant",
        summary:
          "Gradle combines demo, debug, and main inputs in this variant.",
        language: "bash",
        filename: "gradlew",
        code: `./gradlew :app:sourceSets
./gradlew :app:assembleDemoDebug`,
      },
    },
    production: {
      "react-native": {
        name: "Build and inspect a signed release APK",
        summary:
          "Check the expected signing certificate and packaged JavaScript bundle.",
        language: "bash",
        filename: "android/gradlew",
        code: `cd android
./gradlew :app:assembleRelease
apksigner verify --print-certs app/build/outputs/apk/release/app-release.apk`,
      },
      kotlin: {
        name: "Build and inspect a signed release APK",
        summary: "Check the expected signing certificate and merged manifest.",
        language: "bash",
        filename: "gradlew",
        code: `./gradlew :app:assembleRelease
apksigner verify --print-certs app/build/outputs/apk/release/app-release.apk`,
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
        code: `try {
  await Linking.openURL("https://example.com/help");
} catch {
  showUnavailable();
}`,
      },
      kotlin: {
        name: "Open a help page",
        summary: "ACTION_VIEW lets Android resolve an external handler.",
        language: "kotlin",
        filename: "OpenHelp.kt",
        code: `val uri = Uri.parse("https://example.com/help")
try {
    context.startActivity(Intent(Intent.ACTION_VIEW, uri))
} catch (_: ActivityNotFoundException) {
    showUnavailable()
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Share text",
        summary: "React Native opens the platform share UI.",
        language: "tsx",
        filename: "share-link.ts",
        code: `await Share.share({
  message: "Read this: https://example.com/article",
});`,
      },
      kotlin: {
        name: "Share text with a chooser",
        summary: "ACTION_SEND declares the MIME type and payload.",
        language: "kotlin",
        filename: "ShareLink.kt",
        code: `val send = Intent(Intent.ACTION_SEND).apply {
    type = "text/plain"
    putExtra(Intent.EXTRA_TEXT, "Read this: https://example.com/article")
}
context.startActivity(Intent.createChooser(send, null))`,
      },
    },
    production: {
      "react-native": {
        name: "Route cold and warm links safely",
        summary: "Both entry paths use the same validated destination parser.",
        language: "tsx",
        filename: "external-links.tsx",
        code: `useEffect(() => {
  let mounted = true;
  const open = (url: string) =>
    navigate(parseDestination(url) ?? { kind: "invalid-link" });
  void Linking.getInitialURL().then((url) => {
    if (mounted && url) open(url);
  }).catch(() => { if (mounted) showUnavailable(); });
  const subscription = Linking.addEventListener("url", ({ url }) => open(url));
  return () => { mounted = false; subscription.remove(); };
}, [navigate, showUnavailable]);`,
      },
      kotlin: {
        name: "Validate received Intent data",
        summary:
          "A stable app-owned navigator handles validated links; onNewIntent requires Activity reuse.",
        language: "kotlin",
        filename: "MainActivity.kt",
        code: `private val navigator = AppNavigator()

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent { AppRoot(navigator) }
    openExternalUri(intent.data)
}

override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    openExternalUri(intent.data)
}

private fun openExternalUri(uri: Uri?) {
    if (uri == null) return
    navigator.open(parseDestination(uri) ?: Destination.InvalidLink)
}`,
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
        code: `useEffect(() => {
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") analytics.trackVisible();
  });
  return () => subscription.remove();
}, [analytics]);`,
      },
      kotlin: {
        name: "Track owner resume",
        summary: "The effect observes the current screen LifecycleOwner.",
        language: "kotlin",
        filename: "ForegroundTracker.kt",
        code: `LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
    analytics.trackVisible()
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Pause a preview in the background",
        summary:
          "The app-owned camera controller stops on background or unmount.",
        language: "tsx",
        filename: "CameraPreview.tsx",
        code: `useEffect(() => {
  let running = false;
  const sync = (state: AppStateStatus | null) => {
    const active = state === "active";
    if (active === running) return;
    running = active;
    if (active) camera.startPreview();
    else camera.stopPreview();
  };
  sync(AppState.currentState);
  const subscription = AppState.addEventListener("change", sync);
  return () => { subscription.remove(); if (running) camera.stopPreview(); };
}, [camera]);`,
      },
      kotlin: {
        name: "Pause a preview on lifecycle pause",
        summary:
          "Cleanup runs on pause or when the composable leaves the screen.",
        language: "kotlin",
        filename: "CameraPreview.kt",
        code: `LifecycleResumeEffect(camera) {
    camera.startPreview()
    onPauseOrDispose { camera.stopPreview() }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Observe updates only while active",
        summary:
          "watchItems is an app-owned subscription and must return cleanup.",
        language: "tsx",
        filename: "ItemsScreen.tsx",
        code: `useEffect(() => {
  let stop: (() => void) | undefined;
  const sync = (state: AppStateStatus | null) => {
    const active = state === "active";
    if (active === Boolean(stop)) return;
    if (active) stop = repository.watchItems(setItems);
    else { stop?.(); stop = undefined; }
  };
  sync(AppState.currentState);
  const subscription = AppState.addEventListener("change", sync);
  return () => { subscription.remove(); stop?.(); };
}, [repository]);`,
      },
      kotlin: {
        name: "Collect screen state while started",
        summary: "StateFlow collection follows the screen's LifecycleOwner.",
        language: "kotlin",
        filename: "ItemsRoute.kt",
        code: `@Composable
fun ItemsRoute(viewModel: ItemsViewModel) {
    val items by viewModel.items.collectAsStateWithLifecycle()
    ItemsScreen(items = items)
}`,
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
        code: `import { AppRegistry, Text } from "react-native";

function App() {
  return <Text>Welcome</Text>;
}

AppRegistry.registerComponent("MobileApp", () => App);`,
      },
      kotlin: {
        name: "Start the Compose root",
        summary: "The launcher Activity installs its Compose content.",
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
    applied: {
      "react-native": {
        name: "Keep entry separate from the screen",
        summary:
          "The registration file chooses a root; AppRoot owns the UI tree.",
        language: "tsx",
        filename: "index.tsx",
        code: `import { AppRegistry } from "react-native";
import { AppRoot } from "./AppRoot";

AppRegistry.registerComponent("MobileApp", () => AppRoot);`,
      },
      kotlin: {
        name: "Keep the Activity a thin host",
        summary: "The Activity delegates screen composition to AppRoot.",
        language: "kotlin",
        filename: "MainActivity.kt",
        code: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AppTheme { AppRoot() } }
    }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Validate an external launch URL",
        summary: "A launch URL is untrusted input, not a screen identifier.",
        language: "tsx",
        filename: "initial-route.ts",
        code: `async function initialDestination(): Promise<Destination> {
  const url = await Linking.getInitialURL();
  if (url == null) return { kind: "home" };
  return parseDestination(url) ?? { kind: "invalid-link" };
}`,
      },
      kotlin: {
        name: "Validate the launch Intent",
        summary:
          "The Activity maps external intent data before passing it to UI.",
        language: "kotlin",
        filename: "MainActivity.kt",
        code: `private fun initialDestination(intent: Intent): Destination {
    val uri = intent.data ?: return Destination.Home
    return parseDestination(uri) ?: Destination.InvalidLink
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val initial = initialDestination(intent)
        setContent { AppRoot(initialDestination = initial) }
    }
}`,
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
        code: `function Welcome({ t }: { t: (key: "welcome") => string }) {
  return <Text>{t("welcome")}</Text>;
}`,
      },
      kotlin: {
        name: "Use a qualified string resource",
        summary: "Android chooses the default or Vietnamese XML value.",
        language: "kotlin",
        filename: "Welcome.kt",
        code: `// res/values/strings.xml: <string name="welcome">Welcome</string>
// res/values-vi/strings.xml: <string name="welcome">Chào mừng</string>
@Composable
fun Welcome() {
    Text(stringResource(R.string.welcome))
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Format a translated sentence",
        summary: "The translator owns word order and inserts the name.",
        language: "tsx",
        filename: "Greeting.tsx",
        code: `function Greeting({ name, t }: Props) {
  return <Text>{t("greeting", { name })}</Text>;
}`,
      },
      kotlin: {
        name: "Format an Android string",
        summary: "A positional placeholder lets each locale place the name.",
        language: "kotlin",
        filename: "Greeting.kt",
        code: `// res/values/strings.xml:
// <string name="greeting">Hello, %1$s</string>
// res/values-vi/strings.xml:
// <string name="greeting">Xin chào, %1$s</string>
@Composable
fun Greeting(name: String) {
    Text(stringResource(R.string.greeting, name))
}`,
      },
    },
    production: {
      "react-native": {
        name: "Use the app's plural-aware translation",
        summary:
          "The selected locale, not an English count check, determines grammar.",
        language: "tsx",
        filename: "MessageCount.tsx",
        code: `function MessageCount({ count, t }: Props) {
  return <Text>{t("message_count", { count })}</Text>;
}`,
      },
      kotlin: {
        name: "Use quantity resources",
        summary:
          "Android selects a locale-aware quantity and formats the count.",
        language: "kotlin",
        filename: "MessageCount.kt",
        code: `// res/values/strings.xml:
// <plurals name="message_count">
//   <item quantity="one">%1$d message</item>
//   <item quantity="other">%1$d messages</item>
// </plurals>
// res/values-vi/strings.xml:
// <plurals name="message_count">
//   <item quantity="other">%1$d tin nhắn</item>
// </plurals>
@Composable
fun MessageCount(count: Int) {
    Text(pluralStringResource(R.plurals.message_count, count, count))
}`,
      },
    },
  },
} as const;
