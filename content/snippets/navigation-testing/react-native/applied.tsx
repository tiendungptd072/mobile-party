declare const user: ReturnType<typeof userEvent.setup>;
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const AppStack = createNativeStackNavigator({
  screens: { Profile: AppNavigator },
});
// #region show
jest.useFakeTimers();
await user.press(screen.getByRole("button", { name: "Open profile" }));
await act(() => jest.runAllTimers());
expect(screen.getByText("Profile: Ada")).toBeVisible();
// #endregion
