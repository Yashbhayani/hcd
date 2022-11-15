import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeState from './Context/Home/HomeState';
import Navebar from './Header/Navebar';
import Home from './Components/Home.jsx'
import Registration from './Auth/Registration';
import Alert from './AlertHandel/Alert';
import Login from './Auth/Login';
import Profile from './Components/Profile';
import Allamountitems from './Components/Allamountitems';
import Redfeedback from './Components/Redfeedback';
import Nopage from './Components/Nopage';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <HomeState>
      <Router>
        <Navebar />
        <Alert alert={alert} />
        <Routes>
          <Route path="/signup" element={<Registration showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/alldata" element={<Allamountitems showAlert={showAlert} />} />
          <Route path="/profile" element={<Profile showAlert={showAlert} />} />
          <Route path="/readfeedback" element={<Redfeedback showAlert={showAlert} />} />
          <Route path='*' element={<Nopage/>} />
        </Routes>
      </Router>
    </HomeState>
  );
}

export default App;
