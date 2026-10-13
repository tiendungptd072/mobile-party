// #region show
export type Profile = { id: string; name: string };
export interface ProfileReader {
  load(id: string): Promise<Profile>;
}
// #endregion
