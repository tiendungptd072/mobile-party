package snippets.generics.applied

// #region show
interface Identifiable { val id: String }

fun <T : Identifiable> List<T>.indexById(): Map<String, T> {
    return associateBy { it.id }
}
// #endregion
