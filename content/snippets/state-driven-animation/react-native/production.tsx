// #region show
const target = expanded ? 1 : 0;
Animated.parallel([
  Animated.timing(opacity, { toValue: target, duration: 180, useNativeDriver: true }),
  Animated.spring(scale, { toValue: expanded ? 1 : 0.96, useNativeDriver: true }),
]).start();
// #endregion
