import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import AddBookToStorePage from './pages/AddBookToStorePage';
import NavBar from './components/NavBar';
import CustomerHomePage from './pages/CustomerHomePage';
import { CartProvider } from './context/CartContext';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminPage from './pages/AdminPage';
import AdminViewBooksPage from './pages/AdminViewBooksPage';
import AdminNavbar from './components/AdminNavbar';
import AdminViewAuthorsPage from './pages/AdminViewAuthorPage';
import AdminViewOrdersPage from './pages/AdminViewOrdersPage';

const App: React.FC = () => {

  const [admin, setAdmin] = useState(true)

  return (
    <Router>
      <CartProvider>
        <div>
          {admin ? <AdminNavbar /> : <NavBar />}
          <Routes>
            {/* <Route path="/books" element={<ViewBooks />} /> */}
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/admin/create-book" element={<CreateBookPage />} />
            <Route path="admin/add-book-to-store" element={<AddBookToStorePage />} />
            <Route path="admin/view-books" element={<AdminViewBooksPage />} />
            <Route path="admin/view-authors" element={<AdminViewAuthorsPage />} />
            <Route path="/admin/orders" element={<AdminViewOrdersPage />} />
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
