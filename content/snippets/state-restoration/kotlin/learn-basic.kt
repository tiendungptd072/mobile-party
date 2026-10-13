package snippets.state_restoration.learn_basic

// #region show
@Composable
fun SearchDraft() {
    var query by remember { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}
// #endregion
