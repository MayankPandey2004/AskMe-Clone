import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'; 
import SignUpPage from './Pages/SignUpPage';
import RequireAuth from './components/RequireAuth';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route element={<RequireAuth/>}>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='*'/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
