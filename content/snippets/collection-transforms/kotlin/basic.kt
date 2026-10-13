package snippets.collection_transforms.basic

// #region show
val names = users
    .filter(User::isActive)
    .map(User::displayName)
// #endregion
