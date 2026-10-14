type ProfileState = { kind: "loading" } | { kind: "ready"; profile: Profile };
declare const api: {
  getProfile(id: string): Promise<{ id: string; display_name: string }>;
};

// #region show
class HttpProfileRepository implements ProfileRepository {
  async getProfile(id: string): Promise<Profile> {
    const dto = await api.getProfile(id);
    return { id: dto.id, name: dto.display_name };
  }
}
// #endregion
