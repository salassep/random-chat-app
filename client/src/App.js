import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import io from 'socket.io-client';

const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST || "localhost";
const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT || 4000;

const socket = io.connect(`http://${SOCKET_HOST}:${SOCKET_PORT}`);

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route 
            path='/'
            element={
              <Home 
                socket={socket}
              />
            }
          />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
