import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './html/Login';
import Registration from './html/Registration';
import LandingPage from './html/LandingPage';

function App() {
  return (
    <html>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/register" index element={<Registration />} />
          <Route path="/landing" index element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </html>
  );
}

export default App;
