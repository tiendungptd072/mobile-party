package snippets.text_input.production

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun EmailField(value: String, error: String?, onValueChange: (String) -> Unit) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        isError = error != null,
        supportingText = { error?.let { Text(it) } },
        label = { Text("Email") },
    )
}
// #endregion
