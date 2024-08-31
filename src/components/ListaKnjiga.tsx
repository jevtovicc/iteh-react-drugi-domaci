import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Knjiga } from '../types';
import '../styles.css'
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import DetaljiKnjige from './DetaljiKnjige';
import KnjigaCard from './Knjiga';


const ListaKnjiga: React.FC = () => {
    const [knjige, setKnjige] = useState<Knjiga[]>([]);

    useEffect(() => {
        console.log('Idem po knjige')
        axios.get<Knjiga[]>('http://localhost:8080/api/knjige')
            .then(response => setKnjige(response.data))
            .catch(error => console.error('Greška prilikom preuzimanja knjiga:', error));
    }, []);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">Prodavnica knjiga</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-light">
                            <FaShoppingCart /> Korpa
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    {knjige.map((knjiga) => (
                        <Col key={knjiga.knjigaId} xs={12} sm={4} md={4}>
                            <KnjigaCard nazivKnjige={knjiga.naziv} nazivAutora={knjiga.autor.imePrezime} cena={knjiga.cena} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>

        // <div className="container">
        //     <ul className="book-list">
        //         {knjige.map((knjiga) => (
        //             <li key={knjiga.knjigaId} className="book-item">
        //                 <img src='https://delfi.rs/_img/artikli/2018/11/starac_i_more_vv.jpg' alt={knjiga.naziv} className="book-image" />
        //                 <div className="book-title">{knjiga.naziv}</div>
        //                 <div className="book-author">Autor: {knjiga.autor.imePrezime}</div>
        //                 <div className="book-price">1000</div>
        //                 <Link to={`/knjiga/${knjiga.knjigaId}`} className="book-link">
        //                     Pogledaj detalje
        //                 </Link>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default ListaKnjiga;