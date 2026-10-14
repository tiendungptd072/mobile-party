declare const state: { users: (User & { selected: boolean })[] };

// #region show
type ProfileUiModel = Readonly<{
  id: string;
  displayName: string;
  tags: readonly string[];
}>;

const uiModel = toProfileUiModel(profile);
// #endregion
