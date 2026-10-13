package snippets.android_resources.learn_basic

// #region show
// res/values/strings.xml: <string name="welcome">Welcome</string>
// res/values-vi/strings.xml: <string name="welcome">Chào mừng</string>
@Composable
fun Welcome() {
    Text(stringResource(R.string.welcome))
}
// #endregion
