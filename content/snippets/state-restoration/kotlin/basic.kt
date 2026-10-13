package snippets.state_restoration.basic

// #region show
@Composable
fun SearchDraft() {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}
// #endregion
