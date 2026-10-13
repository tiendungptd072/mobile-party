package snippets.android_app_entry.production

// #region show
private fun initialDestination(intent: Intent): Destination {
    val uri = intent.data ?: return Destination.Home
    return parseDestination(uri) ?: Destination.InvalidLink
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val initial = initialDestination(intent)
        setContent { AppRoot(initialDestination = initial) }
    }
}
// #endregion
