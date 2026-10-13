package snippets.android_app_entry.basic

// #region show
// AndroidManifest.xml declares .MainActivity with MAIN/LAUNCHER
// and android:exported="true" for an external launcher.
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { Text("Welcome") }
    }
}
// #endregion
