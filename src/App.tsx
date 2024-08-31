import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import StranicaKnjige from './pages/StranicaKnjige';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/knjiga/:id" element={<StranicaKnjige />} />
      </Routes>
    </Router>
  );
};

export default App;
