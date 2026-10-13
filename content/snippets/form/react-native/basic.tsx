// #region show
function LoginForm() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return <Button title="Continue" disabled={!isValid} onPress={() => signIn(email)} />;
}
// #endregion
