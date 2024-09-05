import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import NavBar from './components/NavBar';
import CustomerHomePage from './pages/CustomerHomePage';
import { CartProvider } from './context/CartContext';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminPage from './pages/AdminPage';
import AdminViewBooksPage from './pages/AdminViewBooksPage';
import AdminViewAuthorsPage from './pages/AdminViewAuthorPage';
import AdminViewOrdersPage from './pages/AdminViewOrdersPage';
import { jwtDecode } from 'jwt-decode';
import GenrePage from './pages/GenrePage';

interface DecodedToken {
  sub: string[];
  roles: string[];
}

const AppRoutes: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const routes = [
    { path: "/admin/create-book", element: isAdmin ? <CreateBookPage /> : <Navigate to='/' /> },
    { path: "/admin/view-books", element: isAdmin ? <AdminViewBooksPage /> : <Navigate to='/' /> },
    { path: "/admin/view-authors", element: isAdmin ? <AdminViewAuthorsPage /> : <Navigate to='/' /> },
    { path: "/admin/view-orders", element: isAdmin ? <AdminViewOrdersPage /> : <Navigate to='/' /> },
    { path: "/admin", element: isAdmin ? <AdminPage /> : <Navigate to="/" /> },
    { path: "/shopping-cart", element: <ShoppingCartPage /> },
    { path: "/books/genres/:genreId", element: <GenrePage /> },
    { path: "/", element: <CustomerHomePage /> },
  ];

  return useRoutes(routes);
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const roles = decodedToken.roles || [];
        setIsAdmin(roles.includes('ROLE_ADMIN'));
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) {
    // Show a loading spinner or similar while fetching role
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <CartProvider>
        <div>
          <NavBar />
          <AppRoutes isAdmin={isAdmin} />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;