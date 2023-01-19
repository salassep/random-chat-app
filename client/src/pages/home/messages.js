import styles from './styles.module.css';
import { useRef, useState } from 'react';

const ReceivedMessage = () => {
  let [messagesReceived, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  messagesReceived = [  
    {
      isReceived: true,
      message: "tes message",
      username: "tes user",
      __createdTime__: Date.now()
    },
    {
      isReceived: false,
      message: "tes message",
      username: "tes user",
      __createdTime__: Date.now()
    },
  ]

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message + " " + (msg.isReceived ? styles.messageReceived : "")} key={i}>
          <p className={styles.msgText}>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ReceivedMessage;
