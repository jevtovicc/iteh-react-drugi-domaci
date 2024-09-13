import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { Book } from '../types';
import axios from 'axios';
import { Container, Pagination, Form, Row, Col } from 'react-bootstrap';

const CustomerHomePage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState<string>(''); // Empty string for no sorting

    useEffect(() => {
        // Construct the URL based on whether sorting is applied
        const sortQuery = sortOrder ? `&sort=price&order=${sortOrder}` : '';
        axios.get(`http://127.0.0.1:8000/api/books?page=${currentPage}${sortQuery}`)
            .then(response => {
                console.log(response.data['books']);
                setBooks(response.data['books']);
                setTotalPages(response.data['meta']['last_page']);
            })
            .catch(error => console.log('Error fetching books', error));
    }, [currentPage, sortOrder]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortOrder(event.target.value);
    };

    const renderPaginationItems = () => {
        const items = [];
        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <>
            <Container className="mb-3 mt-4">
                <Row>
                    <Col xs={2}>
                        <Form.Group controlId="sortOrder">
                            <Form.Label>Sortiraj po ceni</Form.Label>
                            <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
                                <option value="">Podrazumevani prikaz</option>
                                <option value="asc">Rastuće</option>
                                <option value="desc">Opadajuće</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={10}>
                        <BookList books={books} />
                        <Container className="d-flex justify-content-center mt-3">
                            <Pagination>
                                {currentPage > 1 && (
                                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                                )}
                                {renderPaginationItems()}
                                {currentPage < totalPages && (
                                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                                )}
                            </Pagination>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CustomerHomePage;