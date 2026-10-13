// #region show
interface CredentialStore {
  saveRefreshToken(token: string): Promise<void>;
  readRefreshToken(): Promise<string | null>;
  clear(): Promise<void>;
}
// #endregion
