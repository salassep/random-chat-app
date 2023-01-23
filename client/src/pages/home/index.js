import ReceivedMessage from './messages';
import SendMessage from './input-message';
import { useEffect, useState } from 'react';

const Home = ({socket}) => {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    let isFriendReady;
    socket.on('find_friend', (data) => {
      isFriendReady = data.isFriendReady;
      const check = setInterval(() => {
        if (isFriendReady) {
          clearInterval(check);
        }
        socket.emit("need_friend", data);
      }, 5000);

      setFriend(data);

      return () => {
        socket.off('find_friend');
        socket.off('need_friend');
      };
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
