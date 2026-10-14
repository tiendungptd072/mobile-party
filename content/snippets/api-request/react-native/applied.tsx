type User = { id: string; displayName: string };
type UserDto = { id: string; display_name: string };
declare const api: {
  getUser(id: string, signal: AbortSignal): Promise<UserDto>;
};
declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
};

// #region show
class UserRepository {
  async getUser(id: string, signal: AbortSignal): Promise<User> {
    const dto = await api.getUser(id, signal);
    return { id: dto.id, displayName: dto.display_name };
  }
}
// #endregion
