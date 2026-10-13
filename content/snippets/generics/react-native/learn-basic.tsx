// #region show
type Page<T> = {
  items: readonly T[];
  nextCursor: string | null;
};
// #endregion
