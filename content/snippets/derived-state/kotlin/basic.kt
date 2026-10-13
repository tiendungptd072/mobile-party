package snippets.derived_state.basic

// #region show
@Composable
fun CartSummary(items: List<CartItem>) {
    val total = items.sumOf { it.price }
    Text("Total: $total")
}
// #endregion
