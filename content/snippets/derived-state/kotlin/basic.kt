package snippets.derived_state.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun CartSummary(items: List<CartItem>) {
    val total = items.sumOf { it.price }
    Text("Total: $total")
}
// #endregion
