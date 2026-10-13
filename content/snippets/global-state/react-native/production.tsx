// #region show
function CheckoutNavigator() {
  return (
    <CheckoutProvider>
      <Stack.Navigator>
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </CheckoutProvider>
  );
}
// #endregion
