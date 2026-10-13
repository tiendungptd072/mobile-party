// #region show
await schedulePendingSync(scheduler);
await schedulePendingSync(scheduler);
expect(scheduler.uniqueWork).toHaveLength(1);
// #endregion
