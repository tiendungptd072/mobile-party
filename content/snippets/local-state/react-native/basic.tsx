type Props = { count: number; onIncrement(): void };

// #region show
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button
      title={`Count: ${count}`}
      onPress={() => setCount((value) => value + 1)}
    />
  );
}
// #endregion
