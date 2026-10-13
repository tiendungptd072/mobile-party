// #region show
<Pressable
  accessibilityLabel="Favorite article"
  accessibilityRole="togglebutton"
  accessibilityState={{ checked: isFavorite }}
  onPress={onToggle}
>
  <HeartIcon filled={isFavorite} />
</Pressable>
// #endregion
