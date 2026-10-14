type Props = { route: { params: { userId: unknown } } };

// #region show
export const linking = {
  prefixes: ["https://example.com"],
  config: { screens: { Profile: "users/:userId" } },
};
// #endregion
