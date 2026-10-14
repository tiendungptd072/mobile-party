type Props = { header: ReactNode; children: ReactNode; actions: ReactNode };

// #region show
function Panel({ header, children, actions }: Props) {
  return <View>{header}<View>{children}</View>{actions}</View>;
}
// #endregion
