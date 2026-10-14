type Props = { products: { name: string }[]; query: string };

// #region show
function ProductList({ products, query }: Props) {
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return <FlatList data={visibleProducts} renderItem={renderProduct} />;
}
// #endregion
