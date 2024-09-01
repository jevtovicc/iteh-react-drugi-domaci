import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBookForm from './components/AddBookForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddBookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
