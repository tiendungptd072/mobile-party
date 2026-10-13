// #region show
function Cart({ items }: { items: Item[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <TotalLabel total={total} />;
}
// #endregion
