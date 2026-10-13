// #region show
class HttpProfileRepository implements ProfileRepository {
  async getProfile(id: string): Promise<Profile> {
    const dto = await api.getProfile(id);
    return { id: dto.id, name: dto.display_name };
  }
}
// #endregion
