// #region show
const SpacingContext = createContext(8);
function Card() {
  const spacing = useContext(SpacingContext);
  return <View style={{ padding: spacing }}><Text>Profile</Text></View>;
}
function Screen() {
  return <SpacingContext.Provider value={16}><Card /></SpacingContext.Provider>;
}
// #endregion
