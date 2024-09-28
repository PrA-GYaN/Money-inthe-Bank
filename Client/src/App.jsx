
import Login from './Pages/Login.jsx'
import Dashboard from "./Components/Dashboard/Dashboard.jsx"
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
          <Route path = "/dashboard" element = {<Dashboard />} />
        </Routes>
      </Router>
      </>
    )
  }


export default App