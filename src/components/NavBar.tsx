import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Genre } from '../types';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import SearchComponent from './SearchComponent';
import ReusableModal from './ReusableModal';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const NavBar: React.FC = () => {

    const { cart } = useCart()
    const [genres, setGenres] = useState<Genre[]>([])
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const [cartItemCount, setCartItemCount] = useState<number>(0);

    // Example: Update cartItemCount from localStorage or API
    useEffect(() => {
        // Simulate fetching the cart item count from localStorage or API
        const items = localStorage.getItem('cartItems');
        if (items) {
            setCartItemCount(JSON.parse(items).length);
        }
    }, []);

    useEffect(() => {
        axios.get<Genre[]>('http://localhost:8080/api/genres')
            .then(response => setGenres(response.data))
            .catch(e => console.log(e))

        setCartItemCount(cart.reduce((acc, item) => acc + item.quantity, 0))
    }, [cart])


    const handleLogout = () => {
        // Clear token from local storage
        localStorage.clear()
        setIsAuthenticated(false)
        navigate('/');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='py-2 px-4'>
            <Container>
                <Navbar.Brand as={Link} to="/">Shakespeare and Company</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Knjige</Nav.Link>

                    <NavDropdown title="Kategorije" id="basic-nav-dropdown" className='mr-4'>
                        {genres.map((genre) => (
                            <NavDropdown.Item key={genre.genreId} as={Link} to={`/books/genres/${genre.genreId}`}>
                                {genre.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    <SearchComponent onSearch={() => console.log('Searching')} />
                </Nav>

                <Nav>
                    {isAuthenticated ?
                        <>
                            <Nav.Link as={Link} to='shopping-cart'>
                                <div style={{ position: 'relative' }}>
                                    <FaShoppingCart size={24} />
                                    {cartItemCount > 0 && (
                                        <Badge
                                            bg="danger"
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                padding: '0 6px',
                                            }}
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </div>
                            </Nav.Link>
                            <NavDropdown title="Moj nalog" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleLogout} >
                                    Odjavi se
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                        :
                        <>
                            <Nav.Link onClick={() => setShowLoginModal(true)} style={{ cursor: 'pointer' }}>
                                Prijavite se
                            </Nav.Link>

                            <ReusableModal
                                show={showLoginModal}
                                handleClose={() => setShowLoginModal(false)}
                                title='Prijava'
                                body={<LoginForm />}
                            />


                            <Nav.Link onClick={() => setShowRegistrationModal(true)} style={{ cursor: 'pointer' }}>
                                Registrujte se
                            </Nav.Link>


                            <ReusableModal
                                show={showRegistrationModal}
                                handleClose={() => setShowRegistrationModal(false)}
                                title='Registracija'
                                body={<RegistrationForm />}
                            />

                            <Nav.Link as={Link} to='shopping-cart'>
                                <div style={{ position: 'relative' }}>
                                    <FaShoppingCart size={24} />
                                    {cartItemCount > 0 && (
                                        <Badge
                                            bg="danger"
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                padding: '0 6px',
                                            }}
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </div>
                            </Nav.Link>
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>

    );
};

export default NavBar;