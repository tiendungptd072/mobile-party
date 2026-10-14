type Props = { onSubmit(email?: string): void };
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
function SignInForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return <>
    <TextInput value={email} onChangeText={setEmail} />
    <Button title="Continue" disabled={!isValid} onPress={() => onSubmit(email)} />
  </>;
}
// #endregion
