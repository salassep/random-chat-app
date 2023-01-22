import ReceivedMessage from './messages';
import SendMessage from './input-message';
import { useEffect, useState } from 'react';

const Home = ({socket}) => {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    socket.on('find_friend', (data) => {
      setFriend(data);
    });
  }, [socket]);

  return (
    <div>
      { friend.isFriendReady 
        ? <div>
            <ReceivedMessage />
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
