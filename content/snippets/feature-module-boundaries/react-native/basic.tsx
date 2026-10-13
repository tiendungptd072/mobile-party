// #region show
export interface ProfileReader {
  load(id: string): Promise<Profile>;
}
// #endregion
