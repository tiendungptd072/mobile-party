type Props = { selectedId: string | null };

// #region show
function MailScreen({ selectedId }: Props) {
  const { width } = useWindowDimensions();
  return width >= 600
    ? <TwoPaneMail selectedId={selectedId} />
    : <SinglePaneMail selectedId={selectedId} />;
}
// #endregion
