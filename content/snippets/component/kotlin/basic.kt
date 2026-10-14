package snippets.component.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name")
}
// #endregion
