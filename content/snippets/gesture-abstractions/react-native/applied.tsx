// #region show
const panResponder = useMemo(() => PanResponder.create({
  onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8,
  onPanResponderMove: (_, gesture) => setOffset(gesture.dx),
  onPanResponderRelease: () => setOffset(0),
}), []);
// #endregion
