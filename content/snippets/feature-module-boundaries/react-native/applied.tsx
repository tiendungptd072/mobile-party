// #region show
import type { ProfileReader } from "@app/profile-contract";

export function ProfileRoute({ reader }: { reader: ProfileReader }) {
  return <ProfileScreen reader={reader} />;
}
// #endregion
