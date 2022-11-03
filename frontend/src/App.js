import React from 'react';
import './App.css';

//import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './html/Login';
//import Registration from './html/Registration';

function App() {
  return (
    <Login />
    /*<BrowserRouter>
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/cards" index element={<Registration />} />
    </Routes>
  </BrowserRouter>*/

);
}

export default App;
