package snippets.lambdas_and_receivers.basic

import verification.support.*
// #region show
fun selectUser(id: String, onSelected: (String) -> Unit) {
    onSelected(id)
}
// #endregion
