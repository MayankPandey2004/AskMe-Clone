import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage'; 
import SignUpPage from './Pages/SignUpPage';
import RequireAuth from './components/RequireAuth';
import ProfilePage from './Pages/ProfilePage';
import QuestionPage from './Pages/QuestionPage';
import AnswerPage from './Pages/AnswersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route element={<RequireAuth/>}>
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/question' element={<QuestionPage/>} />
        <Route path='/answer' element={<AnswerPage/>} />
        <Route path='*'/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
