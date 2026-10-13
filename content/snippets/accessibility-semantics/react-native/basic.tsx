// #region show
<Pressable
  accessibilityLabel="Favorite article"
  accessibilityRole="button"
  accessibilityState={{ selected: isFavorite }}
  onPress={onToggle}
>
  <HeartIcon filled={isFavorite} />
</Pressable>
// #endregion
