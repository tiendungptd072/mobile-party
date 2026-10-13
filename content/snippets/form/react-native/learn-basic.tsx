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
