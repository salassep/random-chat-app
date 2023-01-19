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
      message: "tes message",
      username: "tes user",
      __createdTime__: Date.now()
    }
  ]

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{ msg.username }</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdTime__ || msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ReceivedMessage;
