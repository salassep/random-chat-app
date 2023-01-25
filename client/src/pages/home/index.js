import styles from './styles.module.css';
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
            <SendMessage 
              socket={socket}
              channelId={friend.channelId}
            />
          </div> 
        : <div className={styles.centerInformation}>
            <span className={styles.textInformation}>Looking For Friend ...</span>
          </div>
      }
    </div>
  );
};

export default Home;
