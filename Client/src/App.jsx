import { AuthProvider } from './Utils/AuthContext';
import Login from './Pages/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import Invite from './Pages/Group/Invite.jsx';
import Group from './Pages/Group/Group.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes />
      </Router>
    </AuthProvider>
  );
}

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/group" element={<Group/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
