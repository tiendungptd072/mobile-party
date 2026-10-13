package snippets.collection_transforms.applied

// #region show
val usersById = responses
    .mapNotNull(::parseUser)
    .associateBy(User::id)
// #endregion
