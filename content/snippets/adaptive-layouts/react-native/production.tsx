// #region show
function MailRoute() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return <MailScreen selectedId={selectedId} onSelect={setSelectedId} />;
}
// #endregion
