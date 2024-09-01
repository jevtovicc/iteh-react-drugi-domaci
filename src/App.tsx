import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import AddBookToStorePage from './pages/AddBookToStorePage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* <Route path="/books" element={<ViewBooks />} /> */}
          <Route path="/" element={<CreateBookPage />} />
          <Route path="/add-book-to-store" element={<AddBookToStorePage />} />
          {/* <Route path="/" element> </Route> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
