import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BookFormat, Author } from '../types';
import BookList from '../components/BookList';

const AuthorPage: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const [bookFormats, setBookFormats] = useState<BookFormat[]>([]);
    const [selectedAuthorID, setSelectedAuthorID] = useState<string | null>(authorId || null);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch book formats based on selected author ID
        if (selectedAuthorID) {
            axios.get<BookFormat[]>(`http://localhost:8080/api/book-formats/authors?authorId=${selectedAuthorID}`)
                .then(response => setBookFormats(response.data))
                .catch(e => console.log(e));
        }
    }, [selectedAuthorID]);

    useEffect(() => {
        // Set initial selectedAuthorID when authorId is available
        if (authorId) {
            setSelectedAuthorID(authorId);
        }
    }, [authorId]);

    return (
        <div className='text-center mt-4'>
            {bookFormats.length > 0 && <h4>{bookFormats[0].book.author.fullName}</h4>}
            <BookList bookFormats={bookFormats} />
        </div>
    );
};

export default AuthorPage;