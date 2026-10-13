// #region show
interface ReminderNotifier {
  show(postId: string, title: string): Promise<void>;
}
await notifier.show(post.id, post.title);
// #endregion
