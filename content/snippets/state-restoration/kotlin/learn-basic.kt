package snippets.state_restoration.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun SearchDraft() {
    var query by remember { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}
// #endregion
