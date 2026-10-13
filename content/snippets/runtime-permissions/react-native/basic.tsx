// #region show
async function requestCamera() {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  if (result === PermissionsAndroid.RESULTS.GRANTED) openCamera();
}
// #endregion
