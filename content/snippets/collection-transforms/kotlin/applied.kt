package snippets.collection_transforms.applied

import verification.support.*
val responses = emptyList<UserDto>(); fun parseUser(dto: UserDto): User? = null
// #region show
val usersById = responses
    .mapNotNull(::parseUser)
    .associateBy(User::id)
// #endregion
