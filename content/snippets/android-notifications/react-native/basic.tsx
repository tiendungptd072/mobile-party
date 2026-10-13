// #region show
interface ReminderNotifier {
  show(postId: string, title: string): Promise<void>;
}

async function notifySavedPost(notifier: ReminderNotifier, post: Post) {
  await notifier.show(post.id, post.title);
}
// #endregion
