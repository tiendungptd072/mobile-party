package snippets.recomposition.applied

// #region show
@Composable
fun Cart(items: List<Item>) {
    val total = items.sumOf(Item::price)
    TotalLabel(total)
}
// #endregion
