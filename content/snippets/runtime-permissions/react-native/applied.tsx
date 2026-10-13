// #region show
const [cameraGranted, setCameraGranted] = useState(false);

return cameraGranted
  ? <CameraPicker />
  : <Button title="Choose from library" onPress={openLibrary} />;
// #endregion
