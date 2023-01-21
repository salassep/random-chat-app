import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route 
            path='/'
            element={
              <Home />
            }
          />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
