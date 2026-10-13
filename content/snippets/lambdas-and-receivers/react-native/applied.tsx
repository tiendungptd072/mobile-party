// #region show
const request = buildRequest((builder) => {
  builder.header("Accept", "application/json");
  builder.timeout(5_000);
});
// #endregion
