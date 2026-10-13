// #region show
function MailScreen() {
  const { width } = useWindowDimensions();
  return width >= 600 ? <TwoPaneMail /> : <SinglePaneMail />;
}
// #endregion
