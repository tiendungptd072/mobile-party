package snippets.composition_local.basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
val LocalSpacing = compositionLocalOf { 8.dp }

@Composable
fun Card() {
    Box(Modifier.padding(LocalSpacing.current)) { Text("Profile") }
}

@Composable
fun Screen() {
    CompositionLocalProvider(LocalSpacing provides 16.dp) { Card() }
}
// #endregion

}
