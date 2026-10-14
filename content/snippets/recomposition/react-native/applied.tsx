declare function useProfile(id: string): Profile;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile;
}>;

// #region show
function Cart({ items }: { items: Item[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <TotalLabel total={total} />;
}
// #endregion
