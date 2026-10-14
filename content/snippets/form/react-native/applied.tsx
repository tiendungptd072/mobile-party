type Props = {
  state: { email: string; password: string; canSubmit: boolean };
  onEmailChange(value: string): void;
  onPasswordChange(value: string): void;
  onSubmit(): void;
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
function SignInForm({ state, onEmailChange, onPasswordChange, onSubmit }: Props) {
  return <>
    <EmailField value={state.email} onChange={onEmailChange} />
    <PasswordField value={state.password} onChange={onPasswordChange} />
    <Button title="Sign in" disabled={!state.canSubmit} onPress={onSubmit} />
  </>;
}
// #endregion
