import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import receiveMessageSound from '../../assets/receive-message.mp3';
import friendOfflineSound from '../../assets/friend-offline.mp3';

const ReceivedMessage = ({ socket }) => {
  let [messagesReceived, setMessagesReceived] = useState([]);
  
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (!data.isSender) {
        playNotificationSound(data.isChatFinished ? friendOfflineSound : receiveMessageSound);
      }
      setMessagesReceived((state) => [
        ...state,
        {
          isSender: data.isSender,
          message: data.message,
          createdTime: data.createdTime,
        }
      ]);
    });

    return () => { socket.off('receive_message'); }
  }, [socket]);

  useEffect(() => {
    socket.on('recent_messages', (messages) => {
      const sortMessages = sortMessagesByDate(JSON.parse(messages));
      setMessagesReceived((state) => [...sortMessages,  ...state]);
    });
    
    return () => socket.off('recent_messages');
  }, [socket]);
  
  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  async function playNotificationSound(audioPath) {
    try {
      const audio = new Audio(audioPath);
      await audio.play();
    } catch (e) {
      console.log(e);
    }
  }

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.createdTime) - parseInt(b.createdTime)
    );
  }

  return (
    <div ref={messagesColumnRef} className={styles.chatContainer}>
      <div className={styles.messagesColumn}>
        {messagesReceived.map((msg, i) => (
          <div className={styles.message + " " + (msg.isSender ? styles.yourMessage : "")} key={i}>
            <p className={styles.msgText}>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedMessage;
