import '../../App.css';
import { useState } from 'react';
import styles from './styles.module.css';

const SendMessage = () => {
  const [message, setMessage] = useState();

  return (
    <div className={styles.sendMessageContainer}>
    <input 
      className={styles.messageInput}
      placeHolder='Message...'
      onChange={(e) => setMessage(e.target.value)}
      value={message}
    />
    <button className='btn btn-primary' onClick={ () => console.log("tes") }>
      Send Message
    </button>
  </div>
  );
};

export default SendMessage;
