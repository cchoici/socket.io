import { useCallback, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001', {
  autoConnect: false,
  reconnection: false,
});

const App = () => {
  const onClick = useCallback(() => {
    socket.connect();
    // console.log('click socket:', socket.id);
    socket.emit('send_msg', { msg: new Date() });
  }, []);

  useEffect(() => {
    const onMsg = data => {
      console.log(`get from server:`, socket.id, '  ', data);
    };
    socket.on('send_msg', onMsg);
    return () => {
      socket.off('send_msg', onMsg);
    };
  }, []);
  return (
    <div>
      <input placeholder="Message..." />
      <button onClick={onClick}>Send Mesasge</button>
    </div>
  );
};

export default App;
