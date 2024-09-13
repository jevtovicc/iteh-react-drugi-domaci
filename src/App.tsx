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
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminNavbar from './components/AdminNavbar';
import SearchResultsPage from './pages/SearchResultsPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorPage from './pages/AuthorPage';
import ViewOrdersPage from './pages/ViewOrdersPage';
import EditBookPage from './pages/EditBookPage';


const AppRoutes: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {

  useEffect(() => {
    console.log('Admin', isAdmin)
  }, [isAdmin])

  const routes = [
    { path: "/admin/create-book", element: isAdmin ? <CreateBookPage /> : <Navigate to='/' /> },
    { path: "/admin/edit-book/:bookId", element: isAdmin ? <EditBookPage /> : <Navigate to='/' /> },
    { path: "/admin/view-books", element: isAdmin ? <AdminViewBooksPage /> : <Navigate to='/' /> },
    { path: "/admin/view-authors", element: isAdmin ? <AdminViewAuthorsPage /> : <Navigate to='/' /> },
    { path: "/admin/view-orders", element: isAdmin ? <AdminViewOrdersPage /> : <Navigate to='/' /> },
    { path: "/admin", element: isAdmin ? <AdminPage /> : <Navigate to="/" /> },
    { path: "/shopping-cart", element: <ShoppingCartPage /> },
    { path: "/books/genres", element: <GenrePage /> },
    { path: "/books/view-book/:bookId", element: <BookDetailsPage /> },
    { path: "/books/search", element: <SearchResultsPage /> },
    { path: "/authors/:authorId/books", element: <AuthorPage /> },
    { path: "/view-orders", element: <ViewOrdersPage /> },
    { path: "/", element: <CustomerHomePage /> },
  ];

  return useRoutes(routes);
};

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();
  const [loadedAuthData, setLoadedAuthData] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const rolesString = localStorage.getItem('roles');
        console.log(rolesString)
        const roles: string[] = rolesString ? JSON.parse(rolesString) : [];
        console.log('Evo me u use effectu')
        setIsAdmin(roles.includes('admin'));
        console.log('Admin?', roles.includes('admin'))
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
        setIsAuthenticated(true);
      }
    } else {
      setIsAdmin(false);
      setIsAuthenticated(false);
    }

    setLoadedAuthData(true)
  }, [setIsAdmin, setIsAuthenticated, isAdmin, isAuthenticated]);

  if (isAdmin === null || isAuthenticated === null) {
    // Show a loading spinner or similar while fetching role
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <CartProvider>
        <div>
          {isAdmin ? <AdminNavbar /> : <NavBar />}
          {loadedAuthData && <AppRoutes isAdmin={isAdmin} />}
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;