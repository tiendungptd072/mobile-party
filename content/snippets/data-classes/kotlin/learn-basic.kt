package snippets.data_classes.learn_basic

// #region show
data class User(val id: String, val name: String)
val renamed = user.copy(name = "Linh")
// #endregion
