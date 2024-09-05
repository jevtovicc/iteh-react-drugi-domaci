import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { Genre } from '../types';
import axios from 'axios';

const NavBar: React.FC = () => {

    const [genres, setGenres] = useState<Genre[]>([])
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    useEffect(() => {
        axios.get<Genre[]>('http://localhost:8080/api/genres')
            .then(response => setGenres(response.data))
            .catch(e => console.log(e))
    }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='py-2 px-4'>
            <Navbar.Brand as={Link} to="/">Shakespeare and Company</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Knjige</Nav.Link>
                    <Nav.Link onClick={() => setShowCategories(prevState => !prevState)}>Kategorije</Nav.Link>
                    {showCategories && (
                        <Nav className="flex-column ms-3">
                            {genres.map(g => (
                                <Nav.Link key={g.genreId} as={Link} to={`books/genres/${g.genreId}`} >{g.name}</Nav.Link>
                            )
                            )}
                        </Nav>
                    )}
                    <Container>
                        <Nav.Link onClick={() => setShowLoginModal(true)} style={{ cursor: 'pointer' }}>
                            Prijavite se
                        </Nav.Link>
                        <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
                        <Nav.Link style={{ cursor: 'pointer' }}>
                            Registrujte se
                        </Nav.Link>
                        <Nav.Link as={Link} to="/shopping-cart">Korpa</Nav.Link>
                    </Container>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;