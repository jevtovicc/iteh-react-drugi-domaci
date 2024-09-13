import React, { useEffect, useState } from 'react';
import CreateBookForm from '../components/CreateBookForm';
import Sidebar from '../components/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import EditBookForm from '../components/EditBookForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../types';

const EditBookPage: React.FC = () => {

    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book | null>(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${bookId}`)
            .then(response => {
                console.log(response.data['book'])
                setBook(response.data['book'])
            })
            .catch(e => console.log(e))
    }, [bookId])

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Container
                fluid
                style={{ marginLeft: '250px', padding: '20px' }} // Adjust to match sidebar width
            >
                <Row>
                    <Col>
                        <div className="container mt-4">
                            <h2>Izmeni knjigu</h2>
                            {book && <EditBookForm book={book} />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditBookPage;