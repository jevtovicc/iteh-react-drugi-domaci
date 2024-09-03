import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import AddBookToStorePage from './pages/AddBookToStorePage';
import NavBar from './components/NavBar';
import CustomerHomePage from './pages/CustomerHomePage';
import { CartProvider } from './context/CartContext';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <NavBar />
          <Routes>
            {/* <Route path="/books" element={<ViewBooks />} /> */}
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/admin/create-book" element={<CreateBookPage />} />
            <Route path="admin/add-book-to-store" element={<AddBookToStorePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<CustomerHomePage />} />
            {/* <Route path="/" element> </Route> */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
