package snippets.android_resources.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.res.*
import party.mobile.verification.R
// #region show
// res/values/strings.xml: <string name="welcome">Welcome</string>
// res/values-vi/strings.xml: <string name="welcome">Chào mừng</string>
@Composable
fun Welcome() {
    Text(stringResource(R.string.welcome))
}
// #endregion
