import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Home from './components/Home';
import Watchlist from './components/Watchlist';

function App() {
  return (
    <Router>
      <div style={{backgroundColor:'#333'}}>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;