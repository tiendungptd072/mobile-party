type ProfileState = { kind: "loading" } | { kind: "ready"; profile: Profile };
declare const api: {
  getProfile(id: string): Promise<{ id: string; display_name: string }>;
};

// #region show
class FakeProfileRepository implements ProfileRepository {
  constructor(private readonly result: Profile) {}
  getProfile(): Promise<Profile> { return Promise.resolve(this.result); }
}
// #endregion
