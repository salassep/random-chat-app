import '../../App.css';
import { useState } from 'react';
import styles from './styles.module.css';

const SendMessage = ({socket, channelId}) => {
  const [message, setMessage] = useState();

  const sendMessage = () => {
    if (message) {
      const createdTime = Date.now();
      socket.emit('send_message', { channelId, message, createdTime });
      setMessage('');
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    };
  };

  return (
    <>
      <div className={styles.cautionText}>
        <span>
          *
        </span>
        <p>
          Do not share your confidential information; the website owner is not responsible for user negligence.
        </p>
      </div>
      <div className={styles.sendMessageContainer}>
        <input 
          className={styles.messageInput}
          placeholder='Message...'
          onChange={(e) => setMessage(e.target.value)}
          value={message || ''}
          onKeyDown={onKeyDownHandler}
        />
        <button className='btn btn-primary' onClick={sendMessage}>
          {'>'}
        </button>
      </div>
    </>
  );
};

export default SendMessage;
