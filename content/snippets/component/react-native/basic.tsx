// #region show
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <Text>Hello, {name}</Text>;
}
// #endregion
