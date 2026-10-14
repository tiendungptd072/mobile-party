package snippets.recomposition.applied

import verification.support.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Cart(items: List<Item>) {
    val total = items.sumOf(Item::price)
    TotalLabel(total)
}
// #endregion
