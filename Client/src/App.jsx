
import Login from './Pages/Login'
import Dashboard from "./Components/Dashboard/Dashboard"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path = "/dashboard" element = {<Dashboard />} />
        </Routes>
      </Router>
      </>
    )
  }


export default App