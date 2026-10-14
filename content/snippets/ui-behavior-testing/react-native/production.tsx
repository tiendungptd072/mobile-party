declare const ProfileScreen: import("react").ComponentType<{
  state?: { kind: "error" };
  onRetry?: () => void;
  onSave?: () => Promise<void>;
}>;

// #region show
let finishSave!: () => void;
const onSave = jest.fn(() => new Promise<void>((resolve) => {
  finishSave = resolve;
}));
render(<ProfileScreen onSave={onSave} />);
fireEvent.press(screen.getByRole("button", { name: "Save" }));
expect(screen.getByText("Saving…")).toBeTruthy();
await act(async () => { finishSave(); });
expect(await screen.findByText("Saved")).toBeTruthy();
// #endregion
