type Props = { items: Item[] };

// #region show
function CartSummary({ items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <Text>Total: {total}</Text>;
}
// #endregion
