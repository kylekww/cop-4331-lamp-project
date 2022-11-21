import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './html/Login';
import Registration from './html/Registration';
import LandingPage from './html/LandingPage';
import Profile from './html/Profile';
import EmailVerify from './html/EmailVerify';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/register" index element={<Registration />} />
          <Route path="/landing" index element={<LandingPage />} />
          <Route path="/profile" index element={<Profile />} />
          <Route path="/verify/:token" index element={<EmailVerify />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
