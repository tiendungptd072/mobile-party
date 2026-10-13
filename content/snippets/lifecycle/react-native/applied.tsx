// #region show
useEffect(() => {
  const connection = chat.connect(roomId);
  connection.start();
  return () => connection.stop();
}, [chat, roomId]);
// #endregion
