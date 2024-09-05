import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { Book, BookFormat, Genre } from '../types';
import BookList from '../components/BookList';

const GenrePage: React.FC = () => {
    const { genreId } = useParams<{ genreId: string }>();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [bookFormats, setBookFormats] = useState<BookFormat[]>([]);
    const [selectedGenreID, setSelectedGenreID] = useState<string | null>(genreId || null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all genres
        axios.get<Genre[]>('http://localhost:8080/api/genres')
            .then(response => setGenres(response.data))
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        // Fetch book formats based on selected genre ID
        if (selectedGenreID) {
            axios.get<BookFormat[]>(`http://localhost:8080/api/book-formats/genres?genreId=${selectedGenreID}`)
                .then(response => {
                    console.log(response.data)
                    setBookFormats(response.data)
                })
                .catch(e => console.log(e));
        }
    }, [selectedGenreID]);

    useEffect(() => {
        // Set initial selectedGenreID when genreID is available
        if (genreId) {
            setSelectedGenreID(genreId);
        }
    }, [genreId]);

    const handleGenreClick = (id: string) => {
        setSelectedGenreID(id);  // Update selectedGenreID state
        navigate(`/books/genres/${id}`);  // Navigate to the new route
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="p-3">
                    <h2 className='mb-4'>Kategorije</h2>
                    <ListGroup>
                        {genres.map((genre) => (
                            <ListGroup.Item
                                key={genre.genreId}
                                action
                                active={genre.genreId.toString() === selectedGenreID}
                                onClick={() => handleGenreClick(genre.genreId.toString())}
                            >
                                {genre.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={9} className="p-3">
                    <h2 className='ml-3'>Knjige</h2>
                    <BookList bookFormats={bookFormats} />
                </Col>
            </Row>
        </Container>
    );
};

export default GenrePage;