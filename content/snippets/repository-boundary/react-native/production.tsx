// #region show
class FakeProfileRepository implements ProfileRepository {
  constructor(private readonly result: Profile) {}
  getProfile(): Promise<Profile> { return Promise.resolve(this.result); }
}
// #endregion
