package snippets.collection_transforms.basic

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
val names = users
    .filter(User::isActive)
    .map(User::displayName)
// #endregion
