package snippets.null_safety.production

import verification.support.*
// #region show
fun UserDto.toDomain(): User {
    val validName = name?.trim()?.takeIf(String::isNotEmpty)
        ?: throw InvalidUserException(id)
    return User(id = id, name = validName, avatarUrl = avatarUrl)
}
// #endregion
