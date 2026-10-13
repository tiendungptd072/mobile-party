package snippets.collection_transforms.production

// #region show
val visibleNames = users.asSequence()
    .filter(User::isActive)
    .filter { matchesQuery(it, query) }
    .map(User::displayName)
    .toList()
// #endregion
