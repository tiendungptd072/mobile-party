// #region show
const scheduler = new FakeSyncScheduler();
await schedulePendingSync(scheduler);
await schedulePendingSync(scheduler);

expect(scheduler.uniqueWork).toEqual([
  { name: "pending-sync", policy: "keep" },
]);
// #endregion
