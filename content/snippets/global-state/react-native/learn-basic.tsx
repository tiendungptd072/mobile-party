// #region show
function useProfileScreen() {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return {
    state,
    rename: (name: string) => dispatch({ type: "rename", name }),
  };
}
// #endregion
