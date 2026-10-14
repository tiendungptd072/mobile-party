declare const ProfileScreen: import("react").ComponentType<{
  state?: { kind: "error" };
  onRetry?: () => void;
  onSave?: () => Promise<void>;
}>;

// #region show
const onRetry = jest.fn();
render(<ProfileScreen state={{ kind: "error" }} onRetry={onRetry} />);
fireEvent.press(screen.getByRole("button", { name: "Retry" }));
expect(onRetry).toHaveBeenCalledTimes(1);
// #endregion
