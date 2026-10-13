package snippets.android_app_entry.applied

// #region show
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AppTheme { AppRoot() } }
    }
}
// #endregion
