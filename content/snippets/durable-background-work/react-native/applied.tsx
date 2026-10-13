// #region show
interface SyncScheduler { enqueue(): Promise<void> }
await scheduler.enqueue();
// #endregion
