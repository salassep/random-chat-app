import ReceivedMessage from './messages';
import SendMessage from './input-message';
import { useEffect, useState } from 'react';

const Home = ({socket}) => {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    socket.on('find_friend', (data) => {
      setFriend(data);
    });

    socket.on('skipped', () => {
      socket.emit("refind_friend");
    });

    return () => {
      socket.off('find_friend');
      socket.off('skipped');
    };
  }, [socket]);

  return (
    <div>
      { friend.isReadyToChat
        ? <div>
            <ReceivedMessage socket={socket} />
            <SendMessage />
          </div> 
        : <div style={
            { 
              height: '100vh', 
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column',
              textAlign: 'center'
            }
          }>
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Looking For Friend ...</span>
          </div>
      }
    </div>
  );
};

export default Home;
