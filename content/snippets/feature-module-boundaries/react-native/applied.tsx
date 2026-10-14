declare const ProfileScreen: import("react").ComponentType<{
  reader: import("@app/profile-contract").ProfileReader;
}>;

// #region show
import type { ProfileReader } from "@app/profile-contract";

export function ProfileRoute({ reader }: { reader: ProfileReader }) {
  return <ProfileScreen reader={reader} />;
}
// #endregion
