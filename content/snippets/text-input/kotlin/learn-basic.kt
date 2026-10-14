package snippets.text_input.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
// #region show
@Composable
fun NameField() {
    var name by rememberSaveable { mutableStateOf("") }
    TextField(value = name, onValueChange = { name = it })
}
// #endregion
