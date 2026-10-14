import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator<{
  Cart: undefined;
  Payment: undefined;
}>();
type ScreenProps = { state: { name: string }; onRename(name: string): void };
declare const initialState: { name: string };
declare function profileReducer(
  state: { name: string },
  event: { type: "rename"; name: string },
): { name: string };
declare function useProfileScreen(): {
  state: { name: string };
  rename(name: string): void;
};
declare const Profile: import("react").ComponentType<{
  user: User | null;
  onSignOut(): void;
}>;

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
