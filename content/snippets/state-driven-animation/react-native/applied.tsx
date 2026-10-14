function VerificationComponent() {
// #region show
const opacity = useRef(new Animated.Value(0)).current;
useEffect(() => {
  Animated.timing(opacity, { toValue: showFilters ? 1 : 0, duration: 180, useNativeDriver: true }).start();
}, [showFilters, opacity]);

return showFilters ? <Animated.View style={{ opacity }}><Filters /></Animated.View> : null;
// #endregion
}
