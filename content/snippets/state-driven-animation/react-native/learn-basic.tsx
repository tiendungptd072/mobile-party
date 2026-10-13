// #region show
const scale = useRef(new Animated.Value(1)).current;
useEffect(() => {
  Animated.spring(scale, { toValue: isFavorite ? 1.2 : 1, useNativeDriver: true }).start();
}, [isFavorite, scale]);
// #endregion
