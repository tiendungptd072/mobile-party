package snippets.collection_transforms.production

import verification.support.*
import kotlinx.coroutines.flow.*
fun User.matches(query: String) = name.contains(query)
// #region show
val visibleNames = users.asSequence()
    .filter(User::isActive)
    .filter { matchesQuery(it, query) }
    .map(User::displayName)
    .toList()
// #endregion
