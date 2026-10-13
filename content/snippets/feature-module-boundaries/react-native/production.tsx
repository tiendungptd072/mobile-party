// #region show
import { ProfileRoute } from "@app/profile-feature";
import { HttpProfileReader } from "@app/profile-data";

const reader = new HttpProfileReader(apiClient);
export function ProfileEntry() {
  return <ProfileRoute reader={reader} />;
}
// #endregion
