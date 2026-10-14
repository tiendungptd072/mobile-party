type Props = { count: number; onIncrement(): void };

// #region show
function useCounterScreen() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount((value) => value + 1) };
}

function CounterScreen() {
  const state = useCounterScreen();
  return <Counter count={state.count} onIncrement={state.increment} />;
}
// #endregion
