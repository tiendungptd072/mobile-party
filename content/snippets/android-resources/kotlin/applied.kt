package snippets.android_resources.applied

// #region show
// res/values/strings.xml:
// <string name="greeting">Hello, %1$s</string>
// res/values-vi/strings.xml:
// <string name="greeting">Xin chào, %1$s</string>
@Composable
fun Greeting(name: String) {
    Text(stringResource(R.string.greeting, name))
}
// #endregion
