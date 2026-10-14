package snippets.extension_functions.applied

import verification.support.*
// #region show
fun UserDto.toDomain(): User = User(
    id = id,
    name = name.trim(),
)
// #endregion
