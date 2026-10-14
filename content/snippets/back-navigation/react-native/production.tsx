import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator<{
  Profile: undefined;
  EditProfile: undefined;
}>();
declare const ProfileRoute: import("react").ComponentType;
// #region show
useEffect(() => {
  if (!hasUnsavedChanges) return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", confirmDiscard);
  return () => subscription.remove();
}, [hasUnsavedChanges, confirmDiscard]);
// #endregion
