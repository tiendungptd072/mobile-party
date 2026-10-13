package snippets.derived_state.applied

// #region show
@Composable
fun ProductList(products: List<Product>, query: String) {
    val visibleProducts = products.filter {
        it.name.contains(query, ignoreCase = true)
    }
    LazyColumn { items(visibleProducts, key = { it.id }) { ProductRow(it) } }
}
// #endregion
