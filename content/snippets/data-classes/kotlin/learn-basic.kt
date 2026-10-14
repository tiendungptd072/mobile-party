package snippets.data_classes.learn_basic

import verification.support.*
val user = User("ada", "Ada")
// #region show
data class User(val id: String, val name: String)
val renamed = user.copy(name = "Linh")
// #endregion
