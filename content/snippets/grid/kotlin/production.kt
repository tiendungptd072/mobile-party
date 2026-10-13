package snippets.grid.production

// #region show
@Composable
fun PhotoTile(photo: Photo) {
    AsyncImage(model = photo.url, contentDescription = photo.description, modifier = Modifier.aspectRatio(1f), contentScale = ContentScale.Crop)
}
// #endregion
