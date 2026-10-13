// #region show
<View
  onStartShouldSetResponder={() => true}
  onResponderMove={(event) => onDrag(event.nativeEvent.locationY)}
  onResponderRelease={onDrop}
/>
// #endregion
