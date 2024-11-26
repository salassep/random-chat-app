import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_SOCKET_HOST}`);

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
