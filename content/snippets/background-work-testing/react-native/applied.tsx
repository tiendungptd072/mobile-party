// #region show
expect(toSyncOutcome(new NetworkError())).toBe("retry");
expect(toSyncOutcome(new ValidationError())).toBe("failure");
// #endregion
