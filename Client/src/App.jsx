import './App.css'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Landing from './Pages/Landing';

function App() {
  return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
      </>
    )
  }

export default App
