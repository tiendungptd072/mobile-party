declare const ProfileScreen: import("react").ComponentType<{
  state?: { kind: "error" };
  onRetry?: () => void;
  onSave?: () => Promise<void>;
}>;

// #region show
render(<Counter />);
fireEvent.press(screen.getByRole("button", { name: "Add" }));
expect(screen.getByText("Count: 1")).toBeTruthy();
// #endregion
