type UserDto = { id: string; name: string | null; avatarUrl: string | null };

// #region show
function toUser(dto: UserDto): User {
  const name = dto.name?.trim();
  if (!name) throw new InvalidUserError(dto.id);
  return { id: dto.id, name, avatarUrl: dto.avatarUrl ?? null };
}
// #endregion
