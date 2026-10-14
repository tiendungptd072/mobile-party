type Props = {
  state: { email: string; password: string; canSubmit: boolean };
  onEmailChange(value: string): void;
  onPasswordChange(value: string): void;
  onSubmit(email?: string): void;
};
declare const state: {
  canSubmit: boolean;
  status: "idle" | "submitting";
  email: string;
  password: string;
};
declare const auth: { signIn(email: string, password: string): Promise<void> };
declare function dispatch(
  event:
    | { type: "submitStarted" | "submitSucceeded" }
    | { type: "submitFailed"; message: string },
): void;
declare const EmailField: import("react").ComponentType<{
  value: string;
  error?: string | null;
  onChange(value: string): void;
}>;
declare const PasswordField: import("react").ComponentType<{
  value: string;
  onChange(value: string): void;
}>;
declare function signIn(email: string, password?: string): Promise<void>;

// #region show
async function submit() {
  if (!state.canSubmit || state.status === "submitting") return;
  dispatch({ type: "submitStarted" });
  try {
    await auth.signIn(state.email, state.password);
    dispatch({ type: "submitSucceeded" });
  } catch {
    dispatch({ type: "submitFailed", message: "Unable to sign in" });
  }
}
// #endregion
