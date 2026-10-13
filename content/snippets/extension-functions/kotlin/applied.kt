package snippets.extension_functions.applied

// #region show
fun UserDto.toDomain(): User = User(
    id = id,
    name = name.trim(),
)
// #endregion
