// #region show
function Counter({ count, onIncrement }: Props) {
  return <Button title={`Count: ${count}`} onPress={onIncrement} />;
}

function CounterScreen() {
  const [count, setCount] = useState(0);
  return <Counter count={count} onIncrement={() => setCount((n) => n + 1)} />;
}
// #endregion
