package snippets.android_resources.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.res.*
import party.mobile.verification.R
// #region show
@Composable
fun Welcome() {
    Text(stringResource(R.string.welcome))
}
// #endregion
