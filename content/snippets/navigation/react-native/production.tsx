// #region show
function ProfileNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileRoute} />
    <Stack.Screen name="EditProfile" component={EditProfileRoute} />
  </Stack.Navigator>;
}
// #endregion
