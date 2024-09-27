<<<<<<< Updated upstream
import './App.css'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
      </>
    )
  }
=======
import Dashboard from "./Components/Dashboard/Dashboard"
const App = () => {
  return(
    <>
      <Dashboard/>
    </>
  ) 
}
>>>>>>> Stashed changes

export default App