import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator<{
  Profile: undefined;
  EditProfile: undefined;
}>();
declare const ProfileRoute: import("react").ComponentType;
type Props = {
  navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<{
    Profile: { userId: string };
    EditProfile: undefined;
  }>;
};
type ScreenProps = { onEdit(): void };

// #region show
function ProfileNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileRoute} />
    <Stack.Screen name="EditProfile" component={EditProfileRoute} />
  </Stack.Navigator>;
}
// #endregion
