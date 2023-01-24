import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';

const ReceivedMessage = ({ socket }) => {
  let [messagesReceived, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
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

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.createdTime) - parseInt(b.createdTime)
    );
  }

  return (
    <div ref={messagesColumnRef} style={{ 
      height: '85vh', 
      display: 'grid', 
      gridTemplateRows: '1fr', 
      overflow: 'auto', 
      width: '85%', 
      margin: 'auto',
    }}>
      <div className={styles.messagesColumn}>
        {messagesReceived.map((msg, i) => (
          <div className={styles.message + " " + (msg.isSender ? "" : styles.messageReceived)} key={i}>
            <p className={styles.msgText}>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedMessage;
