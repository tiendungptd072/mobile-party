type UserDto = { id: string; name: string };

// #region show
function toDomain(dto: UserDto): User {
  return { id: dto.id, name: dto.name.trim() };
}
// #endregion
