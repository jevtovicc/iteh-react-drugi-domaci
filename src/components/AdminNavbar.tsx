import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const AdminNavbar: React.FC = () => {

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // Implement the search logic here, e.g., filtering data or making API calls
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/" className='text-secondary'>Shakespeare and Company</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <SearchComponent onSearch={handleSearch} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminNavbar;