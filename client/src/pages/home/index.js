import styles from './styles.module.css';
import ReceivedMessage from './messages';
import SendMessage from './input-message';

const Home = () => {
  return (
    <div>
      <ReceivedMessage />
      <SendMessage />
    </div>
  );
};

export default Home;
