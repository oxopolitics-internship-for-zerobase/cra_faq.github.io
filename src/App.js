import React from 'react';
import Home from './routes/Home';
import Auth from './routes/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
