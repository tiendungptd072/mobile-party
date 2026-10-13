// #region show
function Counter() {
  const [count, setCount] = useState(0);
  return <Button title={String(count)} onPress={() => setCount((n) => n + 1)} />;
}
// #endregion
