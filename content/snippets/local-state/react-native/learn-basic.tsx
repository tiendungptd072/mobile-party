// #region show
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button title={`Count: ${count}`} onPress={() => setCount(count + 1)} />
  );
}
// #endregion
