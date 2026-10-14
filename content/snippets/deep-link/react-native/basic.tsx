type Props = { route: { params: { userId: unknown } } };

// #region show
export const linking = {
  prefixes: ["mobileparty://", "https://mobile.party"],
  config: { screens: { Profile: "profiles/:userId" } },
};
// #endregion
