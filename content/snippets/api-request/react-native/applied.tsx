// #region show
class UserRepository {
  async getUser(id: string, signal: AbortSignal): Promise<User> {
    const dto = await api.getUser(id, signal);
    return { id: dto.id, displayName: dto.display_name };
  }
}
// #endregion
