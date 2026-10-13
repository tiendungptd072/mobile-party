// #region show
const target = await notifier.getInitialTarget();
if (target?.postId) navigation.navigate("Post", { id: target.postId });
// #endregion
