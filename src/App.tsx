import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* <Route path="/books" element={<ViewBooks />} /> */}
          <Route path="/" element={<CreateBookPage />} />
          {/* <Route path="/add-book-to-store" element={<AddBookToStore />} /> */}
          {/* <Route path="/" element> </Route> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
