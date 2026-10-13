// #region show
function SignInForm({ state, onEmailChange, onPasswordChange, onSubmit }: Props) {
  return <>
    <EmailField value={state.email} onChange={onEmailChange} />
    <PasswordField value={state.password} onChange={onPasswordChange} />
    <Button title="Sign in" disabled={!state.canSubmit} onPress={onSubmit} />
  </>;
}
// #endregion
