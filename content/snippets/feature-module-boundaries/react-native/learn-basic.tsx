declare const ProfileScreen: import("react").ComponentType<{
  reader: import("@app/profile-contract").ProfileReader;
}>;

// #region show
export type Profile = { id: string; name: string };
export interface ProfileReader {
  load(id: string): Promise<Profile>;
}
// #endregion
